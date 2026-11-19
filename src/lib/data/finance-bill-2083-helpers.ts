import type { ChatResource, MockQAPair, QaCategory } from "../mock-tax-chat";

export const FINANCE_BILL_2083_SOURCE_FILE =
  "docs/Files/finance-bill-2083-84-original.pdf";
export const FINANCE_BILL_2083_SOURCE_URL =
  "/api/sources/finance-bill-2083-pdf";
export const FINANCE_BILL_2083_LIBRARY_ID = "finance-bill-2083-pdf";

export interface FinanceBillSeedInput {
  id: string;
  question: string;
  shortTopic: string;
  category: QaCategory;
  fiscalYear?: string;
  keywords: string[];
  answer: string;
  citationTitle: string;
  citation: string;
  authority?: string;
  libraryId?: string;
  externalUrl?: string;
  reasoningSteps: string[];
  rateTable: NonNullable<MockQAPair["rateTable"]>;
  followUps: string[];
}

export const EDITORIAL_BOARD_CONTRIBUTOR: NonNullable<
  MockQAPair["contributor"]
> = {
  fullName: "Taxora Editorial Board",
  firmName: "Taxora Legal Knowledge Committee",
  email: "editorial@taxora.org",
  isVerifiedCa: true,
};

export function buildFinanceBillQaEntry(
  input: FinanceBillSeedInput,
): MockQAPair {
  const sourceCitation = `${input.citation} · Source: ${FINANCE_BILL_2083_SOURCE_FILE}`;
  const primaryResource: ChatResource = {
    title: input.citationTitle,
    citation: sourceCitation,
    authority:
      input.authority ??
      "Federal Parliament Secretariat / Ministry of Finance (Finance Bill, 2083)",
    libraryId: FINANCE_BILL_2083_LIBRARY_ID,
    externalUrl: input.externalUrl ?? FINANCE_BILL_2083_SOURCE_URL,
  };

  const resources: ChatResource[] = [primaryResource];
  if (input.libraryId && input.libraryId !== FINANCE_BILL_2083_LIBRARY_ID) {
    resources.push({
      title: input.citationTitle,
      citation: input.citation,
      authority: input.authority ?? "Inland Revenue Department (IRD)",
      libraryId: input.libraryId,
      externalUrl: FINANCE_BILL_2083_SOURCE_URL,
    });
  }

  return {
    id: input.id,
    question: input.question,
    shortTopic: input.shortTopic,
    category: input.category,
    fiscalYear: input.fiscalYear ?? "2083/84",
    keywords: input.keywords,
    answer: input.answer,
    responseType: "tabular-schedule",
    thoughtProcess: {
      duration: "1.4s",
      summary: `Statutory analysis for ${input.shortTopic} verified against ${FINANCE_BILL_2083_SOURCE_FILE} (${input.citation}).`,
      steps: input.reasoningSteps,
    },
    rateTable: input.rateTable,
    resources,
    followUps: input.followUps,
    contributor: EDITORIAL_BOARD_CONTRIBUTOR,
  };
}
