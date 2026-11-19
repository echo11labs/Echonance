export interface LawDocument {
  id: string;
  title: string;
  shortTitle: string;
  monogram: string;
  category: "Acts" | "Rules" | "Finance Acts" | "Directives" | "Policies";
  tag: string;
  authority: string;
  authorityDomain: string;
  sourceUrl: string;
  description: string;
  sectionsCount: string;
  chaptersCount: string;
  enactmentDate: string;
  variant: number; // 0: Coral/Peach Silk, 1: Mint Silk, 2: Cyan Silk, 3: Amethyst Silk
}

export const TAX_LIBRARY_DOCUMENTS: LawDocument[] = [
  {
    id: "finance-bill-2083-pdf",
    title: "Finance Bill, 2083 (Original Official Scan)",
    shortTitle: "Finance Bill 2083 PDF",
    monogram: "PDF",
    category: "Finance Acts",
    tag: "Official Gazetted PDF",
    authority: "Federal Parliament Secretariat",
    authorityDomain: "finance-bill-2083-84-original.pdf",
    sourceUrl: "/api/sources/finance-bill-2083-pdf",
    description:
      "Original 461-page official PDF publication of Finance Bill, 2083 containing complete statutory schedules, tariff tables, and annexes.",
    sectionsCount: "461 Pages",
    chaptersCount: "FY 2083/84",
    enactmentDate: "2083 B.S. (FY 2083/84)",
    variant: 0,
  },
  {
    id: "income-tax-act-2058",
    title: "Income Tax Act, 2058 (2002)",
    shortTitle: "Income Tax Act",
    monogram: "ITA",
    category: "Acts",
    tag: "Primary Statute",
    authority: "Nepal Law Commission / IRD",
    authorityDomain: "Nepal_inctax.pdf",
    sourceUrl: "/api/sources/income-tax-act-2058",
    description:
      "Consolidated English legislation governing corporate and individual income taxation, withholding obligations, capital gains, assessments, and appeals.",
    sectionsCount: "143 Sections",
    chaptersCount: "176 Pages",
    enactmentDate: "2058 B.S. (2002)",
    variant: 0,
  },
  {
    id: "vat-act-2052",
    title: "Value Added Tax Act, 2052 (1996)",
    shortTitle: "VAT Act",
    monogram: "VAT",
    category: "Acts",
    tag: "Consumption Tax",
    authority: "Nepal Law Commission / IRD",
    authorityDomain: "Nepal_Value.pdf",
    sourceUrl: "/api/sources/vat-act-2052",
    description:
      "Consolidated legislation establishing 13% standard VAT rates, small-vendor thresholds, registration, de-registration, and zero/exempt schedules.",
    sectionsCount: "42 Pages",
    chaptersCount: "Schedules 1–2",
    enactmentDate: "2052 B.S. (1996)",
    variant: 1,
  },
  {
    id: "companies-act-2063",
    title: "The Companies Act, 2063 (2006)",
    shortTitle: "Companies Act",
    monogram: "CA",
    category: "Acts",
    tag: "Corporate Law",
    authority: "Nepal Law Commission / OCR",
    authorityDomain: "Nepal_Companies.pdf",
    sourceUrl: "/api/sources/companies-act-2063",
    description:
      "Primary corporate legislation governing incorporation, share capital, governance, audits, financial reporting, mergers, and liquidation in Nepal.",
    sectionsCount: "198 Pages",
    chaptersCount: "21 Chapters",
    enactmentDate: "2063 B.S. (2006)",
    variant: 2,
  },
  {
    id: "tds-guide-2058",
    title: "Income Tax Act, 2058 — Tax Deduction at Source (TDS)",
    shortTitle: "TDS Procedural Guide",
    monogram: "TDS",
    category: "Directives",
    tag: "IRD Guidance",
    authority: "Inland Revenue Department",
    authorityDomain: "Nepal_TDS.pdf",
    sourceUrl: "/api/sources/tds-guide-2058",
    description:
      "Official IRD reference guide explaining withholding agent obligations, rate tables, final vs. advance TDS credits, and filing schedules.",
    sectionsCount: "15 Pages",
    chaptersCount: "Chapter 17",
    enactmentDate: "Income Tax Act, 2058",
    variant: 3,
  },
  {
    id: "aml-rules-2009",
    title: "Asset (Money) Laundering Prevention Rules, 2009",
    shortTitle: "AML Prevention Rules",
    monogram: "AML",
    category: "Rules",
    tag: "Regulatory Rules",
    authority: "Government of Nepal",
    authorityDomain: "Nepal_AML_Rules_2009_English.pdf",
    sourceUrl: "/api/sources/aml-rules-2009",
    description:
      "Subordinate rules under the Asset (Money) Laundering Prevention Act, 2008 governing customer identification, FIU reporting, and compliance.",
    sectionsCount: "13 Pages",
    chaptersCount: "Rules 2066",
    enactmentDate: "2009 (2066 B.S.)",
    variant: 2,
  },
  {
    id: "development-cooperation-policy-2014",
    title: "Development Cooperation Policy, 2014",
    shortTitle: "Development Policy",
    monogram: "DCP",
    category: "Policies",
    tag: "Ministry of Finance",
    authority: "Ministry of Finance",
    authorityDomain: "Nepal_DevelcoopNepal.pdf",
    sourceUrl: "/api/sources/development-cooperation-policy-2014",
    description:
      "Unofficial English translation of the Ministry of Finance Development Cooperation Policy governing aid coordination, grants, and tax-exempt frameworks.",
    sectionsCount: "27 Pages",
    chaptersCount: "MoF Policy",
    enactmentDate: "2014 A.D.",
    variant: 1,
  },
];
