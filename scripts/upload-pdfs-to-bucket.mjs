import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const key = match[1];
    const value = match[2].replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function main() {
  loadEnvLocal();

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    console.error(
      "Missing SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY / SUPABASE_SECRET_KEY in environment.",
    );
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const bucketName = "tax-documents";
  const { data: buckets, error: listError } =
    await supabase.storage.listBuckets();
  if (listError) {
    console.error("Failed to list buckets:", listError.message);
    process.exit(1);
  }

  const exists = buckets?.some((b) => b.name === bucketName);
  if (!exists) {
    const { error: createErr } = await supabase.storage.createBucket(
      bucketName,
      { public: true },
    );
    if (createErr) {
      console.error("Failed to create bucket:", createErr.message);
      process.exit(1);
    }
    console.log(`Created bucket "${bucketName}".`);
  }

  const filesDir = path.resolve(process.cwd(), "docs", "Files");
  const pdfFiles = fs
    .readdirSync(filesDir)
    .filter((f) => f.toLowerCase().endsWith(".pdf"))
    .sort();

  for (const fileName of pdfFiles) {
    const filePath = path.join(filesDir, fileName);
    const buffer = fs.readFileSync(filePath);
    const storagePath = `sources/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(storagePath, buffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.error(`FAILED ${fileName}: ${uploadError.message}`);
    } else {
      console.log(`UPLOADED ${storagePath} (${buffer.length} bytes)`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
