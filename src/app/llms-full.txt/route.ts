import { NextResponse } from "next/server";
import { ABOUT_COPY } from "@/app/about/about-i18n";
import { MOCK_TAX_KNOWLEDGE_BASE_EN } from "@/lib/mock-tax-chat";
import {
  getSiteOrigin,
  LAST_UPDATED_ISO,
  ORGANIZATION_NAME,
  SITE_NAME,
} from "@/lib/seo";
import { TAX_LIBRARY_DOCUMENTS } from "@/lib/tax-law-catalog";

export const dynamic = "force-static";

function digestAnswer(raw: string, maxChars = 750): string {
  const collapsed = raw
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (collapsed.length <= maxChars) return collapsed;

  const slice = collapsed.slice(0, maxChars);
  const lastBoundary = Math.max(
    slice.lastIndexOf("\n\n"),
    slice.lastIndexOf(". "),
  );
  const cut = lastBoundary > 240 ? slice.slice(0, lastBoundary + 1) : slice;
  return `${cut.trim()}\n\n[Full provision table and analysis available in Taxora workspace.]`;
}

export function GET() {
  const origin = getSiteOrigin();
  const about = ABOUT_COPY.en;

  const qaSections = MOCK_TAX_KNOWLEDGE_BASE_EN.map((entry) => {
    const citations = entry.resources
      .map((r) => `${r.title} (${r.citation}, ${r.authority})`)
      .join("; ");
    const lines = [
      `### ${entry.shortTopic}`,
      `- **Category:** ${entry.category}${entry.fiscalYear ? ` · **Fiscal Year:** ${entry.fiscalYear}` : ""}`,
      `- **Question:** ${entry.question}`,
      ...(citations ? [`- **Primary Citations:** ${citations}`] : []),
      "",
      digestAnswer(entry.answer),
    ];
    return lines.join("\n");
  });

  const sections: string[] = [
    `# ${SITE_NAME} — Extended Statutory & Legal Knowledge Digest`,
    "",
    `> Built by ${ORGANIZATION_NAME}. Canonical URL: ${origin}/ · Last Updated: ${LAST_UPDATED_ISO}`,
    "",
    about.whyIntro,
    "",
    "## Core Principles",
    ...about.principles.map((p) => `- **${p.title}:** ${p.description}`),
    "",
    "## General-Purpose AI vs. Taxora Comparison",
    ...about.matrixRows.map(
      (row) =>
        `- **${row.dimension}:** ${row.taxora} (vs. general AI: ${row.otherAi})`,
    ),
    "",
    "## Verified Statutory Documents (Tax Law Library)",
    ...TAX_LIBRARY_DOCUMENTS.map(
      (doc) =>
        `### ${doc.title}\n- **Category:** ${doc.category} (${doc.tag})\n- **Issuing Authority:** ${doc.authority}\n- **Period / Size:** ${doc.enactmentDate} · ${doc.sectionsCount} (${doc.chaptersCount})\n- **Summary:** ${doc.description}\n- **Library:** ${origin}/tax-law-library`,
    ),
    "",
    `## Verified Nepal Tax Q&A Reference (${MOCK_TAX_KNOWLEDGE_BASE_EN.length} Indexed Topics)`,
    ...qaSections,
  ];

  return new NextResponse(sections.join("\n\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
