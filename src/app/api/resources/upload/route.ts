import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { buildContributorThankYouEmail, sendResendEmail } from "@/lib/email";
import {
  getSupabaseServerConfig,
  getTaxRepository,
  type TaxContributor,
} from "@/lib/tax-repository";

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024; // 25 MB, matches the storage bucket setup
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DOCUMENT_TYPES = [
  "Directive",
  "Circular",
  "Act",
  "Rule",
  "Rajpatra",
  "Precedent",
  "Advisory Note",
] as const;
type DocumentType = (typeof DOCUMENT_TYPES)[number];

interface AllowedFileKind {
  mimeType: string;
  matchesSignature: (bytes: Uint8Array) => boolean;
}

const startsWith = (bytes: Uint8Array, signature: number[]) =>
  signature.every((value, index) => bytes[index] === value);

const ALLOWED_FILE_KINDS: Record<string, AllowedFileKind> = {
  pdf: {
    mimeType: "application/pdf",
    // %PDF-
    matchesSignature: (bytes) =>
      startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d]),
  },
  doc: {
    mimeType: "application/msword",
    // OLE2 compound file header
    matchesSignature: (bytes) =>
      startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
  },
  docx: {
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // ZIP container (PK)
    matchesSignature: (bytes) => startsWith(bytes, [0x50, 0x4b, 0x03, 0x04]),
  },
};

function badRequest(message: string, status = 400) {
  return NextResponse.json({ status: "error", message }, { status });
}

function sanitizeFileName(name: string): string {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^A-Za-z0-9._-]+/g, "_")
    .replace(/^[._]+/, "")
    .slice(-120);
  return cleaned || "document";
}

function parseContributor(raw: FormDataEntryValue | null) {
  if (typeof raw !== "string" || !raw) return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return undefined;
    return parsed as TaxContributor;
  } catch {
    return undefined;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData().catch(() => null);
    if (!formData) {
      return badRequest("Upload must be sent as multipart form data.");
    }

    const file = formData.get("file");
    const title = String(formData.get("title") || "")
      .trim()
      .slice(0, 200);

    if (!(file instanceof File)) {
      return badRequest("A document file is required.");
    }
    if (!title) {
      return badRequest("A document title is required.");
    }

    const rawDocumentType = String(formData.get("documentType") || "Directive");
    const normalizedType =
      rawDocumentType === "Gazette" ? "Rajpatra" : rawDocumentType;
    if (!DOCUMENT_TYPES.includes(normalizedType as DocumentType)) {
      return badRequest("Unsupported document type.");
    }
    const documentType = normalizedType as DocumentType;

    if (file.size === 0) {
      return badRequest("The selected file is empty.");
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return badRequest("File exceeds the 25 MB upload limit.", 413);
    }

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    const kind = ALLOWED_FILE_KINDS[extension];
    if (!kind) {
      return badRequest("Only PDF, DOC, and DOCX files are supported.", 415);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!kind.matchesSignature(buffer.subarray(0, 8))) {
      return badRequest(
        `The file content does not look like a valid ${extension.toUpperCase()} document.`,
        415,
      );
    }

    const issuingAuthority =
      String(formData.get("issuingAuthority") || "Inland Revenue Department")
        .trim()
        .slice(0, 160) || "Inland Revenue Department";
    const fiscalYear =
      String(formData.get("fiscalYear") || "2081/82")
        .trim()
        .slice(0, 20) || "2081/82";
    const summary = String(formData.get("summary") || "")
      .trim()
      .slice(0, 2000);
    const isAnonymous = formData.get("isAnonymous") === "true";
    const contributor = isAnonymous
      ? undefined
      : parseContributor(formData.get("contributor"));

    const fileName = sanitizeFileName(file.name);
    const storagePath = `contributed/${Date.now()}-${fileName}`;
    const supabaseConfig = getSupabaseServerConfig();
    if (!supabaseConfig) {
      return badRequest(
        "Document uploads are unavailable because storage is not configured.",
        503,
      );
    }

    const supabase = createClient(supabaseConfig.url, supabaseConfig.key);
    const bucket = supabase.storage.from("tax-documents");
    const { data: uploadData, error: uploadError } = await bucket.upload(
      storagePath,
      buffer,
      { contentType: kind.mimeType, upsert: false },
    );
    if (uploadError) {
      console.error("[resources/upload] storage upload failed:", uploadError);
      return badRequest("Unable to store the file. Please try again.", 502);
    }

    const { data: publicUrlData } = bucket.getPublicUrl(uploadData.path);
    const repo = getTaxRepository();
    let saved: Awaited<ReturnType<typeof repo.submitDocument>>;
    try {
      saved = await repo.submitDocument({
        title,
        documentType,
        issuingAuthority,
        fiscalYear,
        fileUrl: publicUrlData.publicUrl,
        storagePath: uploadData.path,
        fileSizeBytes: file.size,
        fileName,
        mimeType: kind.mimeType,
        summary,
        contributor,
        isAnonymous,
      });
    } catch (insertError) {
      // Do not leave an orphaned file in storage if the record was not saved.
      await bucket.remove([uploadData.path]).catch(() => undefined);
      throw insertError;
    }

    const contributorEmail = contributor?.email?.trim();
    if (
      !isAnonymous &&
      contributorEmail &&
      EMAIL_PATTERN.test(contributorEmail)
    ) {
      const email = buildContributorThankYouEmail({
        contributorName: contributor?.fullName || "Contributor",
        contributorEmail,
        icanNumber: contributor?.icanNumber,
        firmName: contributor?.firmName,
        submissionType: "document",
        topicOrTitle: title,
        category: documentType,
        fiscalYear,
      });
      await sendResendEmail({
        to: contributorEmail,
        subject: email.subject,
        html: email.html,
      });
    }

    return NextResponse.json({
      status: "success",
      message:
        "Document uploaded successfully and queued for Taxora editorial review.",
      document: saved,
    });
  } catch (err: unknown) {
    console.error("[resources/upload] failed:", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Upload failed. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
