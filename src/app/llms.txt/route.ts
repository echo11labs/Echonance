import { NextResponse } from "next/server";
import { getSiteOrigin, ORGANIZATION_NAME, SITE_NAME } from "@/lib/seo";
import { TAX_LIBRARY_DOCUMENTS } from "@/lib/tax-law-catalog";

export const dynamic = "force-static";

export function GET() {
  const origin = getSiteOrigin();

  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_NAME} is a Nepal statutory tax intelligence and legal research platform built by ${ORGANIZATION_NAME}. It provides bilingual (English and Nepali) statutory research grounded in Nepal's official Acts, Finance Bill updates, Inland Revenue Department (IRD) directives, and practicing Chartered Accountant reviews.`,
    "",
    "## Primary Sections",
    `- [CA Ora — Tax AI Workspace](${origin}/): Bilingual (English and Nepali via @nepali) Nepal tax research assistant with statutory citations, rate schedules, and verifiable primary source references.`,
    `- [Tax Law Library](${origin}/tax-law-library): Browse verified primary statutes, Finance Bills, IRD directives, rules, and policies in Nepal.`,
    `- [About Taxora](${origin}/about): Overview of Taxora's statutory precision architecture, practicing CA verification workflow, and comparison against general-purpose AI models.`,
    `- [CA Knowledge & Resource Hub](${origin}/contribute): Contribution portal for Nepal Chartered Accountants, auditors, and tax practitioners to submit verified Q&As and reference PDFs.`,
    "",
    "## Extended Machine-Readable Index",
    `- [Full Statutory Reference](${origin}/llms-full.txt): Expanded Markdown digest of Nepal tax laws, statutory Q&As, rate schedules, and authoritative citations.`,
    `- [XML Sitemap](${origin}/sitemap.xml): Canonical indexable URLs.`,
    "",
    "## Primary Statutory Corpus",
    ...TAX_LIBRARY_DOCUMENTS.map(
      (doc) =>
        `- **${doc.title}** (${doc.category} · ${doc.enactmentDate} · ${doc.authority}): ${doc.description}`,
    ),
    "",
    "## Scope & Evidence Policy",
    "- Strictly scoped to Nepal taxation, corporate, customs, excise, VAT, and related regulatory law.",
    "- Distinguishes verified statutory provisions from commentary and abstains when supporting legal authority is unavailable.",
    "- Intended as decision-support for practitioners, auditors, students, and finance teams; does not substitute for formal legal or tax advice on specific client facts.",
  ];

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
