import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createClient } from "@supabase/supabase-js";
import ts from "typescript";

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

const moduleCache = new Map();

function loadTsModule(filePath) {
  const resolved = path.resolve(filePath);
  if (moduleCache.has(resolved)) return moduleCache.get(resolved);

  const source = fs.readFileSync(resolved, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });

  const mod = { exports: {} };
  moduleCache.set(resolved, mod.exports);

  const localRequire = (specifier) => {
    if (specifier.startsWith("./") || specifier.startsWith("../")) {
      const candidate = path.resolve(path.dirname(resolved), `${specifier}.ts`);
      if (fs.existsSync(candidate)) {
        return loadTsModule(candidate);
      }
    }
    return {};
  };

  const script = new vm.Script(transpiled.outputText, { filename: resolved });
  script.runInNewContext({
    module: mod,
    exports: mod.exports,
    require: localRequire,
  });

  moduleCache.set(resolved, mod.exports);
  return mod.exports;
}

function loadFinanceBillEntries() {
  const m1 = loadTsModule("src/lib/data/finance-bill-2083-module1.ts");
  const m2 = loadTsModule("src/lib/data/finance-bill-2083-module2.ts");
  const m3 = loadTsModule("src/lib/data/finance-bill-2083-module3.ts");
  const m4 = loadTsModule("src/lib/data/finance-bill-2083-module4.ts");
  const m5 = loadTsModule("src/lib/data/finance-bill-2083-module5.ts");
  const m6 = loadTsModule("src/lib/data/finance-bill-2083-module6.ts");
  const ita14 = loadTsModule("src/lib/data/income-tax-2081-modules-1-4.ts");
  const ita57 = loadTsModule("src/lib/data/income-tax-2081-modules-5-7.ts");
  const companies = loadTsModule("src/lib/data/companies-act-2063.ts");
  const amlDev = loadTsModule("src/lib/data/aml-devcoop-datasets.ts");
  const vatCore = loadTsModule("src/lib/data/vat-act-2052-core.ts");
  const itaDeep = loadTsModule("src/lib/data/income-tax-act-2058-deep.ts");
  return [
    ...(m1.FINANCE_BILL_2083_MODULE_1_EN ?? []),
    ...(m2.FINANCE_BILL_2083_MODULE_2_EN ?? []),
    ...(m3.FINANCE_BILL_2083_MODULE_3_EN ?? []),
    ...(m4.FINANCE_BILL_2083_MODULE_4_EN ?? []),
    ...(m5.FINANCE_BILL_2083_MODULE_5_EN ?? []),
    ...(m6.FINANCE_BILL_2083_MODULE_6_EN ?? []),
    ...(ita14.INCOME_TAX_2081_MODULES_1_4_EN ?? []),
    ...(ita57.INCOME_TAX_2081_MODULES_5_7_EN ?? []),
    ...(companies.COMPANIES_ACT_2063_EN ?? []),
    ...(amlDev.AML_AND_DEVCOOP_EN ?? []),
    ...(vatCore.VAT_ACT_2052_CORE_EN ?? []),
    ...(itaDeep.INCOME_TAX_ACT_2058_DEEP_EN ?? []),
  ];
}

async function resolveEditorialContributorId(supabase) {
  const payload = {
    full_name: "Taxora Editorial Board",
    firm_name: "Taxora Legal Knowledge Committee",
    email: "editorial@taxora.org",
    is_verified_ca: true,
  };

  const { data: existing, error: findErr } = await supabase
    .from("tax_contributors")
    .select("id")
    .eq("email", payload.email)
    .limit(1)
    .maybeSingle();

  if (findErr) {
    throw new Error(`Failed querying tax_contributors: ${findErr.message}`);
  }

  if (existing?.id) {
    const { error: updErr } = await supabase
      .from("tax_contributors")
      .update(payload)
      .eq("id", existing.id);
    if (updErr) {
      throw new Error(`Failed updating tax_contributors: ${updErr.message}`);
    }
    return existing.id;
  }

  const { data: inserted, error: insErr } = await supabase
    .from("tax_contributors")
    .insert(payload)
    .select("id")
    .single();

  if (insErr || !inserted) {
    throw new Error(`Failed inserting tax_contributors: ${insErr?.message}`);
  }
  return inserted.id;
}

async function main() {
  loadEnvLocal();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    console.error("Missing Supabase URL or secret key in environment.");
    process.exit(1);
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const entries = loadFinanceBillEntries();
  const contributorId = await resolveEditorialContributorId(supabase);

  let inserted = 0;
  let updated = 0;
  const nowIso = new Date().toISOString();

  for (const item of entries) {
    const rowPayload = {
      question: item.question,
      short_topic: item.shortTopic,
      category: item.category,
      fiscal_year: item.fiscalYear ?? "2083/84",
      language: "en",
      keywords: item.keywords,
      answer: item.answer,
      citations: item.resources.map((r) => ({
        title: r.title,
        citation: r.citation,
        authority: r.authority,
        url: r.externalUrl,
        libraryId: r.libraryId,
      })),
      reasoning_steps: item.thoughtProcess?.steps ?? [],
      rate_table: item.rateTable ?? null,
      contributor_id: contributorId,
      is_anonymous: false,
      status: "verified",
      reviewed_by: "Taxora Editorial Board",
      reviewed_at: nowIso,
    };

    const { data: existing, error: findErr } = await supabase
      .from("tax_qa_entries")
      .select("id")
      .eq("question", rowPayload.question)
      .eq("fiscal_year", rowPayload.fiscal_year)
      .eq("language", rowPayload.language)
      .limit(1)
      .maybeSingle();

    if (findErr) {
      throw new Error(`Lookup failed for "${item.id}": ${findErr.message}`);
    }

    if (existing?.id) {
      const { error: updErr } = await supabase
        .from("tax_qa_entries")
        .update(rowPayload)
        .eq("id", existing.id);
      if (updErr) {
        throw new Error(`Update failed for "${item.id}": ${updErr.message}`);
      }
      updated += 1;
    } else {
      const { error: insErr } = await supabase
        .from("tax_qa_entries")
        .insert(rowPayload);
      if (insErr) {
        throw new Error(`Insert failed for "${item.id}": ${insErr.message}`);
      }
      inserted += 1;
    }
  }

  console.log(
    `Curated Q&A seed complete: ${inserted} inserted, ${updated} updated (total ${entries.length}).`,
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
