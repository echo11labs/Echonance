import type { ChatResource, MockQAPair, QaCategory } from "../mock-tax-chat";
import { EDITORIAL_BOARD_CONTRIBUTOR } from "./finance-bill-2083-helpers";

export const INCOME_TAX_ACT_2058_SOURCE_FILE = "docs/Files/Nepal_inctax.pdf";
export const INCOME_TAX_ACT_2058_SOURCE_URL =
  "/api/sources/income-tax-act-2058";
export const INCOME_TAX_ACT_2058_LIBRARY_ID = "income-tax-act-2058";

export const VAT_ACT_2052_SOURCE_FILE = "docs/Files/Nepal_Value.pdf";
export const VAT_ACT_2052_SOURCE_URL = "/api/sources/vat-act-2052";
export const VAT_ACT_2052_LIBRARY_ID = "vat-act-2052";

export type IncomeTax2081SourceKind =
  "ita-2058" | "ita-2058-fa-2081" | "fa-2081" | "vat-2052-fa-2081";

export interface IncomeTax2081SeedInput {
  id: string;
  question: string;
  shortTopic: string;
  category: QaCategory;
  subTopic: string;
  fiscalYear?: string;
  keywords: string[];
  answer: string;
  citationTitle: string;
  citation: string;
  authority?: string;
  sourceKind: IncomeTax2081SourceKind;
  reasoningSteps: string[];
  rateTable: NonNullable<MockQAPair["rateTable"]>;
  followUps: string[];
}

function buildResources(input: IncomeTax2081SeedInput): ChatResource[] {
  const authority = input.authority ?? "Inland Revenue Department (IRD)";

  if (input.sourceKind === "ita-2058") {
    return [
      {
        title: input.citationTitle,
        citation: `${input.citation} · Consolidation: ${INCOME_TAX_ACT_2058_SOURCE_FILE}`,
        authority,
        libraryId: INCOME_TAX_ACT_2058_LIBRARY_ID,
        externalUrl: INCOME_TAX_ACT_2058_SOURCE_URL,
      },
    ];
  }

  if (input.sourceKind === "ita-2058-fa-2081") {
    return [
      {
        title: input.citationTitle,
        citation: `${input.citation} (as amended through Finance Act, 2081)`,
        authority,
        libraryId: INCOME_TAX_ACT_2058_LIBRARY_ID,
        externalUrl: INCOME_TAX_ACT_2058_SOURCE_URL,
      },
      {
        title: "Finance Act, 2081 (FY 2081/82)",
        citation: input.citation,
        authority,
      },
    ];
  }

  if (input.sourceKind === "vat-2052-fa-2081") {
    return [
      {
        title: input.citationTitle,
        citation: `${input.citation} · Consolidation: ${VAT_ACT_2052_SOURCE_FILE}`,
        authority,
        libraryId: VAT_ACT_2052_LIBRARY_ID,
        externalUrl: VAT_ACT_2052_SOURCE_URL,
      },
      {
        title: "Finance Act, 2081 (FY 2081/82)",
        citation: input.citation,
        authority,
      },
    ];
  }

  return [
    {
      title: input.citationTitle,
      citation: input.citation,
      authority,
    },
  ];
}

export function buildIncomeTax2081QaEntry(
  input: IncomeTax2081SeedInput,
): MockQAPair {
  const keywords = input.keywords.includes(input.subTopic)
    ? input.keywords
    : [...input.keywords, input.subTopic];

  return {
    id: input.id,
    question: input.question,
    shortTopic: input.shortTopic,
    category: input.category,
    fiscalYear: input.fiscalYear ?? "2081/82",
    keywords,
    answer: input.answer,
    responseType: "tabular-schedule",
    thoughtProcess: {
      duration: "1.4s",
      summary: `Statutory analysis for ${input.shortTopic} (${input.citation}).`,
      steps: input.reasoningSteps,
    },
    rateTable: input.rateTable,
    resources: buildResources(input),
    followUps: input.followUps,
    contributor: EDITORIAL_BOARD_CONTRIBUTOR,
  };
}
