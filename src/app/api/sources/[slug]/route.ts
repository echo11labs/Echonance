import fs from "node:fs/promises";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";

const SOURCE_FILE_REGISTRY: Record<
  string,
  { fileName: string; contentType: string }
> = {
  "finance-bill-2083-pdf": {
    fileName: "finance-bill-2083-84-original.pdf",
    contentType: "application/pdf",
  },
  "income-tax-act-2058": {
    fileName: "Nepal_inctax.pdf",
    contentType: "application/pdf",
  },
  "vat-act-2052": {
    fileName: "Nepal_Value.pdf",
    contentType: "application/pdf",
  },
  "companies-act-2063": {
    fileName: "Nepal_Companies.pdf",
    contentType: "application/pdf",
  },
  "tds-guide-2058": {
    fileName: "Nepal_TDS.pdf",
    contentType: "application/pdf",
  },
  "aml-rules-2009": {
    fileName: "Nepal_AML_Rules_2009_English.pdf",
    contentType: "application/pdf",
  },
  "development-cooperation-policy-2014": {
    fileName: "Nepal_DevelcoopNepal.pdf",
    contentType: "application/pdf",
  },
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  // Keep saved citations working after retiring the derived source documents.
  if (slug === "finance-bill-2083" || slug === "finance-bill-2083-np") {
    const destination = new URL(req.url);
    destination.pathname = "/api/sources/finance-bill-2083-pdf";
    return NextResponse.redirect(destination, 308);
  }
  const entry = SOURCE_FILE_REGISTRY[slug];

  if (!entry) {
    return NextResponse.json(
      { status: "error", message: "Unknown statutory source identifier." },
      { status: 404 },
    );
  }

  const absolutePath = path.join(
    process.cwd(),
    "docs",
    "Files",
    entry.fileName,
  );
  try {
    const fileBuffer = await fs.readFile(absolutePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": entry.contentType,
        "Content-Disposition": `inline; filename="${entry.fileName}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Statutory source file not found on disk." },
      { status: 404 },
    );
  }
}
