import { FINANCE_BILL_2083_MODULE_1_EN } from "./data/finance-bill-2083-module1";
import { FINANCE_BILL_2083_MODULE_2_EN } from "./data/finance-bill-2083-module2";
import { FINANCE_BILL_2083_MODULE_3_EN } from "./data/finance-bill-2083-module3";
import { FINANCE_BILL_2083_MODULE_4_EN } from "./data/finance-bill-2083-module4";
import { AML_AND_DEVCOOP_EN } from "./data/aml-devcoop-datasets";
import { COMPANIES_ACT_2063_EN } from "./data/companies-act-2063";
import { FINANCE_BILL_2083_MODULE_5_EN } from "./data/finance-bill-2083-module5";
import { FINANCE_BILL_2083_MODULE_6_EN } from "./data/finance-bill-2083-module6";
import { INCOME_TAX_2081_MODULES_1_4_EN } from "./data/income-tax-2081-modules-1-4";
import { INCOME_TAX_2081_MODULES_5_7_EN } from "./data/income-tax-2081-modules-5-7";
import { INCOME_TAX_ACT_2058_DEEP_EN } from "./data/income-tax-act-2058-deep";
import { VAT_ACT_2052_CORE_EN } from "./data/vat-act-2052-core";

export interface ChatResource {
  title: string;
  citation: string;
  authority: string;
  libraryId?: string;
  externalUrl?: string;
}

export interface ChatThoughtProcess {
  duration: string;
  summary: string;
  steps: string[];
}

export interface ExploredSource {
  name: string;
  citation: string;
  authority: string;
  matchType:
    | "Primary Act"
    | "Enacted Amendment"
    | "Administrative Circular"
    | "Procedural Directive"
    | "Statutory Rule";
  status:
    | "Verified Checksum"
    | "Retrieved & Indexed"
    | "Cross-Referenced"
    | "Synthesized";
  excerpt: string;
  libraryId?: string;
  externalUrl?: string;
}

export interface ChatResearchAudit {
  dispatchedQueries: string[];
  totalSourcesAudited: number;
  sourcesExplored: ExploredSource[];
}

export interface ChatTaskItem {
  id: string;
  phase: string;
  label: string;
  detail: string;
  status: "completed" | "in-progress" | "verified";
}

export interface ChatTaskList {
  title: string;
  tasks: ChatTaskItem[];
}

export interface ChatRateTable {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: string[][];
  footnote?: string;
}

export type ResponseParadigm =
  | "analytical-thinking"
  | "deep-research"
  | "multi-task"
  | "tabular-schedule"
  | "comprehensive";

export const STANDARD_QA_CATEGORIES = [
  "Acts",
  "Rules",
  "Finance Acts",
  "Directives",
  "Precedents",
  "Advisory",
  "Income Tax",
  "Value Added Tax",
  "Excise Duty",
  "Duties and Fees",
  "Customs Duty",
  "Tax Amnesties and Waivers",
] as const;

export type StandardQaCategory = (typeof STANDARD_QA_CATEGORIES)[number];

export type QaCategory = StandardQaCategory | (string & {});

export interface MockQAPair {
  id: string;
  question: string;
  shortTopic: string;
  category: QaCategory;
  fiscalYear?: string;
  keywords: string[];
  answer: string;
  resources: ChatResource[];
  followUps: string[];
  responseType: ResponseParadigm;
  thoughtProcess?: ChatThoughtProcess;
  researchAudit?: ChatResearchAudit;
  taskList?: ChatTaskList;
  rateTable?: ChatRateTable;
  contributor?: {
    fullName: string;
    icanNumber?: string;
    firmName?: string;
    email?: string;
    isVerifiedCa?: boolean;
  };
}

export function shuffleArray<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export type ResponseLanguage = "en" | "np";

export const MOCK_TAX_KNOWLEDGE_BASE_EN: MockQAPair[] = [
  {
    id: "tds-section-88",
    question:
      "What are the withholding tax (TDS) rates under Section 88 of Income Tax Act 2058?",
    shortTopic: "Section 88 TDS Rates",
    category: "Acts",
    keywords: [
      "tds",
      "section 88",
      "withholding",
      "service fee",
      "rent",
      "commission",
      "88",
      "withhold",
      "consultancy",
    ],
    responseType: "deep-research",
    researchAudit: {
      dispatchedQueries: [
        "Income Tax Act 2058 Section 88 withholding schedule 2081",
        "IRD Lazimpat circular on resident service fee TDS rates",
        "Finance Act 2081 amendment to Section 88 and Section 88A",
      ],
      totalSourcesAudited: 6,
      sourcesExplored: [
        {
          name: "Income Tax Act, 2058 (2002)",
          citation: "Section 88(1) & Section 88(2)",
          authority: "Inland Revenue Department",
          matchType: "Primary Act",
          status: "Verified Checksum",
          excerpt:
            "Resident person paying service fee, house rent, commission, or interest must deduct tax at source at prescribed rates.",
          libraryId: "income-tax-act-2058",
        },
        {
          name: "Income Tax Act, 2058 — Tax Deduction at Source (TDS)",
          citation: "Chapter 17 Procedural Guide · Source: Nepal_TDS.pdf",
          authority: "Inland Revenue Department",
          matchType: "Administrative Circular",
          status: "Retrieved & Indexed",
          excerpt:
            "IRD reference booklet explaining withholding agent obligations, rate tables, final vs. advance TDS credits, and filing schedules.",
          libraryId: "tds-guide-2058",
        },
        {
          name: "Finance Act, 2081 (2024)",
          citation: "Section 28 (Withholding Harmonization)",
          authority: "Ministry of Finance",
          matchType: "Enacted Amendment",
          status: "Cross-Referenced",
          excerpt:
            "Re-confirms withholding thresholds and electronic reporting timelines under the integrated IRD e-TDS system.",
        },
      ],
    },
    rateTable: {
      title: "Statutory Withholding Matrix (Section 88)",
      subtitle: "Enforced across FY 2081/82 transactions",
      columns: [
        "Payment Category",
        "Vendor Registration",
        "Statutory Rate",
        "Deposit Window",
      ],
      rows: [
        [
          "Service Fees",
          "VAT-Registered Firm",
          "1.5%",
          "Within 25 days of month end",
        ],
        [
          "Service Fees",
          "Unregistered Individual",
          "15.0%",
          "Within 25 days of month end",
        ],
        [
          "Commercial House Rent",
          "Corporate / Individual",
          "10.0%",
          "Within 25 days of month end",
        ],
        [
          "Consultancy & Advisory",
          "VAT-Registered",
          "1.5%",
          "Within 25 days of month end",
        ],
        [
          "Consultancy & Advisory",
          "Non-VAT Natural Person",
          "15.0%",
          "Within 25 days of month end",
        ],
        [
          "Commission & Agency",
          "Any Entity",
          "15.0%",
          "Within 25 days of month end",
        ],
      ],
      footnote:
        "Governed under Section 90 penalty provisions for non-remittance.",
    },
    answer:
      "Under Section 88 of the Income Tax Act, 2058 (2002), resident entities must deduct tax at source (TDS) upon making payments for services, house rent, or commissions:\n\n• **Service Fees (VAT Registered)**: 1.5% withholding on invoice value when payments are made to VAT-registered resident vendors.\n• **Service Fees (Unregistered Persons)**: 15% withholding on payments made to natural persons or entities not registered for VAT.\n• **Commercial House Rent**: 10% withholding (applicable for commercial leases).\n• **Consultancy & Advisory Services**: 15% for non-VAT registered individuals, 1.5% for VAT-registered firms.\n• **Commission & Agency Fees**: 15% flat deduction upon settlement.\n\nAll withheld amounts must be deposited into the IRD revenue account within 25 days following the end of the Nepali calendar month under Section 90.",
    resources: [
      {
        title: "Income Tax Act, 2058 (2002)",
        citation: "Section 88, 88A & Section 90",
        authority: "Inland Revenue Department",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
      {
        title: "Income Tax Rules, 2059 (2003)",
        citation: "Rule 22 (Withholding Returns)",
        authority: "Ministry of Finance",
        externalUrl: "https://mof.gov.np",
      },
      {
        title: "Income Tax Act, 2058 — Tax Deduction at Source (TDS)",
        citation: "Chapter 17 Procedural Guide · Source: Nepal_TDS.pdf",
        authority: "Inland Revenue Department",
        libraryId: "tds-guide-2058",
        externalUrl: "/api/sources/tds-guide-2058",
      },
    ],
    followUps: [
      "How is individual income tax calculated under FY 2081/82 slabs?",
      "What are the penalties under Section 117-120 for late TDS deposit?",
      "What are the corporate tax rates for general companies?",
    ],
    contributor: {
      fullName: "Taxora Editorial Board",
      firmName: "Taxora Legal Knowledge Committee",
      isVerifiedCa: true,
    },
  },
  {
    id: "vat-rates-exemptions",
    question:
      "What is the standard VAT rate in Nepal, and what goods or services are exempt?",
    shortTopic: "13% VAT & Exemptions",
    category: "Acts",
    keywords: [
      "vat",
      "13%",
      "exempt",
      "exemptions",
      "schedule 1",
      "value added tax",
      "rate",
      "threshold",
      "zero rated",
    ],
    responseType: "tabular-schedule",
    rateTable: {
      title: "Value Added Tax Statutory Schedule",
      subtitle: "Value Added Tax Act 2052, Section 5 & Schedule 1",
      columns: [
        "Classification",
        "Tax Treatment",
        "Turnover Threshold",
        "Key Examples",
      ],
      rows: [
        [
          "Standard Supplies",
          "13% VAT",
          "Above threshold",
          "Electronics, commercial services, manufactured goods",
        ],
        [
          "Export of Goods & Services",
          "0% (Zero-Rated)",
          "No minimum",
          "Goods shipped abroad, software exported for foreign currency",
        ],
        [
          "Schedule 1 Exempt Goods",
          "Exempt (No VAT)",
          "N/A",
          "Basic grains, fresh vegetables, life-saving medicines",
        ],
        [
          "Schedule 1 Exempt Services",
          "Exempt (No VAT)",
          "N/A",
          "Passenger transport, healthcare, schooling, banking & insurance",
        ],
      ],
      footnote:
        "Mandatory registration applies once annual turnover crosses NPR 50L (goods) or NPR 20L (services).",
    },
    answer:
      "Under Section 5(1) of the Value Added Tax Act, 2052 (1996), the standard rate of VAT in Nepal is a flat **13%**. Exports of goods and services are zero-rated (0%) under Section 7.\n\n• **Exempt Goods & Services (Schedule 1)**: Basic agricultural produce (unprocessed food grains, pulses, fresh vegetables, fresh milk), life-saving medicines, health care and hospital services, primary & secondary education, public passenger transportation, and financial/banking services.\n• **Registration Threshold**: NPR 50 Lakhs annual turnover for general goods trading; NPR 20 Lakhs for service-based or consultancies; NPR 10 Lakhs for restaurants/catering (in municipalities).\n• **Filing Cycle**: Monthly VAT returns and payments must be submitted within 25 days of the following month under Section 17.",
    resources: [
      {
        title: "Value Added Tax Act, 2052 (1996)",
        citation: "Section 5, 7 & Schedule 1",
        authority: "Inland Revenue Department",
        libraryId: "vat-act-2052",
        externalUrl: "/api/sources/vat-act-2052",
      },
      {
        title: "Value Added Tax Rules, 2053 (1997)",
        citation: "Rule 14 & Rule 26",
        authority: "Inland Revenue Department",
        externalUrl: "https://ird.gov.np",
      },
    ],
    followUps: [
      "What are the withholding tax (TDS) rates under Section 88?",
      "What are the digital services tax rules under Finance Act 2081?",
      "How is individual income tax calculated under FY 2081/82 slabs?",
    ],
  },
  {
    id: "individual-tax-slabs",
    question:
      "How is individual income tax calculated under FY 2081/82 slabs for resident taxpayers?",
    shortTopic: "Individual Tax Slabs FY 81/82",
    category: "Finance Acts",
    keywords: [
      "individual",
      "slabs",
      "salary",
      "rates",
      "married",
      "unmarried",
      "social security tax",
      "personal tax",
      "2081",
      "81/82",
    ],
    responseType: "tabular-schedule",
    thoughtProcess: {
      duration: "2.4s",
      summary:
        "Progressive statutory bracket analysis referencing Schedule 1 Section 1 of Income Tax Act 2058 as modified by Finance Act 2081",
      steps: [
        "Retrieved Finance Act 2081 Schedule 1 individual rate provisions for FY 2081/82 (2024/25).",
        "Partitioned progressive income tiers for Natural Persons (Unmarried vs Married status).",
        "Applied mandatory 1% Social Security Tax on initial exemption band (NPR 5L single / 6L married), waived for contributory SSF participants.",
        "Computed subsequent bracket escalation rates: 10%, 20%, 30%, and top 39% marginal rate on taxable income above NPR 50 Lakhs.",
      ],
    },
    rateTable: {
      title: "Resident Individual Income Tax Slabs (FY 2081/82)",
      subtitle: "Finance Act 2081 Enacted Slabs",
      columns: [
        "Income Bracket",
        "Unmarried Slabs (NPR)",
        "Married Couple (NPR)",
        "Applicable Tax Rate",
      ],
      rows: [
        ["First Tier", "Up to 5,00,000", "Up to 6,00,000", "1% (SST)*"],
        ["Next Tier", "5,00,001 to 7,00,000", "6,00,001 to 8,00,000", "10%"],
        ["Next Tier", "7,00,001 to 10,00,000", "8,00,001 to 11,00,000", "20%"],
        [
          "Next Tier",
          "10,00,001 to 20,00,000",
          "11,00,001 to 20,00,000",
          "30%",
        ],
        [
          "Next Tier",
          "20,00,001 to 50,00,000",
          "20,00,001 to 50,00,000",
          "36% (30% + 20% surcharge)",
        ],
        [
          "Top Tier",
          "Above 50,00,000",
          "Above 50,00,000",
          "39% (30% + 30% surcharge)",
        ],
      ],
      footnote:
        "*The 1% Social Security Tax is not levied on employees contributing to the Social Security Fund (SSF).",
    },
    answer:
      "For the Fiscal Year 2081/82 (2024/25), personal income tax in Nepal follows progressive marginal brackets updated by the Finance Act, 2081:\n\n• **First Slab (Up to NPR 5,00,000 for single / NPR 6,00,000 for married)**: 1% Social Security Tax (waived for registered Social Security Fund contributors).\n• **Second Slab (Next NPR 2,00,000)**: 10% tax.\n• **Third Slab (Next NPR 3,00,000)**: 20% tax.\n• **Fourth Slab (Next NPR 10,00,000)**: 30% tax.\n• **Fifth Slab (Balance up to NPR 50,00,000)**: 36% effective (30% baseline plus 20% additional surcharge).\n• **Highest Slab (Exceeding NPR 50,00,000)**: 39% effective (30% baseline plus 30% additional surcharge).\n\nTaxpayers may claim deductible allowances for life insurance premiums (up to NPR 40,000) and medical tax credits under Section 89.",
    resources: [
      {
        title: "Finance Act, 2081 (2024)",
        citation: "Schedule 1 (Income Tax Rates)",
        authority: "Ministry of Finance",
        externalUrl: "https://mof.gov.np",
      },
      {
        title: "Income Tax Act, 2058 (2002)",
        citation: "Schedule 1, Section 1",
        authority: "Inland Revenue Department",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
    ],
    followUps: [
      "What are the corporate tax rates for general companies?",
      "What are the withholding tax (TDS) rates under Section 88?",
      "What are the penalties under Section 117-120 for late TDS deposit?",
    ],
  },
  {
    id: "corporate-tax-rates",
    question:
      "What are the corporate tax rates for general companies versus banks and manufacturing entities in Nepal?",
    shortTopic: "Corporate Tax Slabs",
    category: "Acts",
    keywords: [
      "corporate",
      "company",
      "corporate tax",
      "entity",
      "bank",
      "financial",
      "manufacturing",
      "25%",
      "30%",
      "20%",
    ],
    responseType: "tabular-schedule",
    rateTable: {
      title: "Corporate Tax Rate Structure (Schedule 1)",
      subtitle: "Income Tax Act 2058 & Finance Act 2081 Prescribed Rates",
      columns: [
        "Entity Classification",
        "Applicable Rate",
        "Special Conditions / Concessions",
        "Governing Provision",
      ],
      rows: [
        [
          "General Companies & Commercial Entities",
          "25.0%",
          "Standard rate on net adjusted taxable income",
          "Section 2(1) Schedule 1",
        ],
        [
          "Banks, Financial Institutions & Insurance",
          "30.0%",
          "Includes commercial banks, development banks, re-insurers",
          "Section 2(2) Schedule 1",
        ],
        [
          "Tobacco, Liquor, Cigarette & Beer Manufacturers",
          "30.0%",
          "No concessional manufacturing rebates apply",
          "Finance Act 2081",
        ],
        [
          "Special Manufacturing Enterprises",
          "20.0%",
          "Direct production entities providing domestic employment",
          "Section 11(2b) Concession",
        ],
        [
          "Hydropower Generation & Transmission",
          "0% (10 yrs) / 50% (5 yrs)",
          "Commercial operation achieved within statutory deadline",
          "Section 11(3ga) Tax Holiday",
        ],
        [
          "Export Revenue from Information Technology",
          "12.5%",
          "50% concession on standard corporate rate for FX software",
          "Finance Act 2081 Section 24",
        ],
      ],
      footnote:
        "Concessions under Section 11 require continuous adherence to employment and domestic value-add criteria.",
    },
    answer:
      "Corporate income tax rates in Nepal depend upon the business sector and nature of operations under Schedule 1 of the Income Tax Act, 2058:\n\n• **General Entities**: Standard rate of **25%** on net adjusted taxable business income.\n• **Banks & Financial Institutions (BFIs)**: **30%** (also applies to general insurance, tobacco, alcohol, and petroleum distribution businesses).\n• **Special Manufacturing Entities**: Concessional rate of **20%** (20% rebate on standard 25% rate) for manufacturing enterprises employing significant domestic labor.\n• **Infrastructure & Hydropower**: 100% tax holiday for the first 10 years of commercial generation, followed by a 50% concession for the subsequent 5 years.\n• **IT & Software Export Entities**: 50% income tax concession on foreign-currency software and export revenue under Finance Act 2081 provisions.",
    resources: [
      {
        title: "Income Tax Act, 2058 (2002)",
        citation: "Schedule 1, Section 2 & Section 11",
        authority: "Inland Revenue Department",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
      {
        title: "Finance Act, 2081 (2024)",
        citation: "Section 11 (Industrial Concessions)",
        authority: "Ministry of Finance",
        externalUrl: "https://mof.gov.np",
      },
    ],
    followUps: [
      "What is Section 57 change in control in company taxation?",
      "What are the rules for carrying forward business losses under Section 20?",
      "What are the withholding tax (TDS) rates under Section 88?",
    ],
  },
  {
    id: "section-57-change-in-control",
    question:
      "What is Section 57 change in control in company taxation, and how does a 50% change affect loss carryforwards?",
    shortTopic: "Section 57 Change in Control",
    category: "Acts",
    keywords: [
      "section 57",
      "57",
      "change in control",
      "50%",
      "ownership change",
      "loss carryforward",
      "deemed disposal",
      "m&a",
      "share transfer",
    ],
    responseType: "analytical-thinking",
    thoughtProcess: {
      duration: "3.9s",
      summary:
        "In-depth statutory evaluation of underlying ownership continuity rules and deemed realization under Section 57 of Income Tax Act 2058",
      steps: [
        "Identified statutory trigger under Section 57(1): Change of 50% or more in underlying ownership within a trailing 3-year period.",
        "Analyzed consequences under Section 57(2): The entity is deemed to have realized its assets and liabilities at prevailing market value immediately prior to the change.",
        "Verified loss quarantine mechanics under Section 20 & Section 57: Accumulated unabsorbed operating losses prior to the change event cannot be offset against post-acquisition income.",
        "Checked Section 57(3) exceptions: Verified that capital restructuring without beneficial change does not trigger quarantine.",
      ],
    },
    answer:
      "Section 57 of the Income Tax Act, 2058 is an anti-avoidance provision triggered when there is a change of **50% or more in the underlying ownership** of an entity over a rolling three-year period:\n\n• **Deemed Asset Realization**: Under Section 57(2), the entity is legally deemed to have disposed of all assets and liabilities at fair market value immediately before the ownership shift, potentially triggering taxable capital gain.\n• **Quarantine of Accumulated Losses**: Unabsorbed business and capital losses accumulated prior to the change in control cannot be carried forward to offset profits generated after the change.\n• **Depreciation Reset**: The cost base of depreciable assets is adjusted to fair market value for future tax depreciation schedules under Schedule 2.\n• **Notice Requirement**: The entity must submit written notification to the concerned Inland Revenue Office within 15 days of the qualifying change.",
    resources: [
      {
        title: "Income Tax Act, 2058 (2002)",
        citation: "Section 57 (Change in Control)",
        authority: "Inland Revenue Department",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
    ],
    followUps: [
      "What are the rules for carrying forward business losses under Section 20?",
      "What are the transfer pricing rules under Section 33?",
      "What are the corporate tax rates for general companies?",
    ],
  },
  {
    id: "loss-carryforward",
    question:
      "What are the rules for carrying forward business losses under Section 20 of Income Tax Act 2058?",
    shortTopic: "Loss Carryforward (Section 20)",
    category: "Acts",
    keywords: [
      "loss",
      "carryforward",
      "section 20",
      "7 years",
      "12 years",
      "hydropower",
      "business loss",
      "unabsorbed",
    ],
    responseType: "multi-task",
    taskList: {
      title: "Statutory Loss Offset & Verification Sequence",
      tasks: [
        {
          id: "task-1",
          phase: "Phase 1: Loss Classification",
          label: "Segregate Operating Losses from Investment Losses",
          detail:
            "Under Section 20(1), business losses can offset business income, but investment capital losses cannot offset operational revenue.",
          status: "completed",
        },
        {
          id: "task-2",
          phase: "Phase 2: Timeline Verification",
          label: "Audit Eligible Carryforward Window (7 vs 12 Years)",
          detail:
            "Verify standard 7-year limitation under Section 20(1) vs extended 12-year window for specified infrastructure & hydropower.",
          status: "completed",
        },
        {
          id: "task-3",
          phase: "Phase 3: Continuity Check",
          label: "Execute Section 57 Ownership Continuity Verification",
          detail:
            "Confirm underlying ownership shift remained under 50% across trailing 36 months to prevent statutory loss expiration.",
          status: "in-progress",
        },
        {
          id: "task-4",
          phase: "Phase 4: Return Reconciliation",
          label: "Prepare Annex-7 Annual Loss Declaration for IRD Filing",
          detail:
            "Submit chronological year-by-year loss absorption schedule within 3 months of fiscal year close (Ashwin end).",
          status: "verified",
        },
      ],
    },
    answer:
      "Under Section 20 of the Income Tax Act, 2058, operational business losses may be carried forward and offset against future taxable business income:\n\n• **Standard Carryforward Period**: General businesses may carry forward operating losses for up to **7 consecutive income years** following the year of loss occurrence.\n• **Extended 12-Year Window**: Entities engaged in public infrastructure projects (hydropower generation, transmission line construction, road/tunnel building, and petroleum extraction) may carry forward losses for up to **12 consecutive years**.\n• **FIFO Rule**: Losses must be offset on a first-in, first-out basis against the earliest available profits.\n• **Restriction on Capital Losses**: Investment capital losses cannot be offset against regular business income and may only be offset against future capital gains from investments.",
    resources: [
      {
        title: "Income Tax Act, 2058 (2002)",
        citation: "Section 20 (Deduction of Losses)",
        authority: "Inland Revenue Department",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
    ],
    followUps: [
      "What is Section 57 change in control in company taxation?",
      "What are the corporate tax rates for general companies?",
      "What are the depreciation pools and rates under Schedule 2?",
    ],
  },
  {
    id: "depreciation-schedule-2",
    question:
      "What are the depreciation pools and rates under Schedule 2 of Income Tax Act 2058?",
    shortTopic: "Depreciation Pools (Schedule 2)",
    category: "Acts",
    keywords: [
      "depreciation",
      "schedule 2",
      "pools",
      "pool a",
      "pool b",
      "pool c",
      "pool d",
      "pool e",
      "diminishing",
      "written down",
    ],
    responseType: "deep-research",
    researchAudit: {
      dispatchedQueries: [
        "Income Tax Act 2058 Schedule 2 depreciation pools rates",
        "IRD consolidated directive diminishing balance method Schedule 2",
        "Finance Act additions convention third-tier rule depreciation",
      ],
      totalSourcesAudited: 5,
      sourcesExplored: [
        {
          name: "Income Tax Act, 2058 (2002)",
          citation: "Schedule 2, Section 1-4",
          authority: "Inland Revenue Department",
          matchType: "Primary Act",
          status: "Verified Checksum",
          excerpt:
            "Depreciable assets categorized into Pools A, B, C, and D calculated on Written Down Value (WDV), and Pool E on straight-line method.",
          libraryId: "income-tax-act-2058",
        },
        {
          name: "Income Tax Rules, 2059 (2003)",
          citation: "Rule 11 (Asset Inflow & Outflow Valuation)",
          authority: "Ministry of Finance",
          matchType: "Statutory Rule",
          status: "Retrieved & Indexed",
          excerpt:
            "Additions during the fiscal year apportioned based on purchase date: 100% (before Poush), 66.6% (Poush-Chaitra), 33.3% (after Chaitra).",
        },
      ],
    },
    rateTable: {
      title: "Schedule 2 Depreciable Asset Pool System",
      subtitle: "Written Down Value (WDV) & Straight-Line Methods",
      columns: [
        "Pool",
        "Asset Category",
        "Depreciation Rate",
        "Calculation Method",
      ],
      rows: [
        [
          "Pool A",
          "Buildings, roads, bridges, and permanent civil structures",
          "5.0%",
          "Diminishing Balance (WDV)",
        ],
        [
          "Pool B",
          "Office equipment, computers, furniture, and data hardware",
          "25.0%",
          "Diminishing Balance (WDV)",
        ],
        [
          "Pool C",
          "Automobiles, buses, trucks, and transport equipment",
          "20.0%",
          "Diminishing Balance (WDV)",
        ],
        [
          "Pool D",
          "Heavy plant, industrial machinery, and production equipment",
          "15.0%",
          "Diminishing Balance (WDV)",
        ],
        [
          "Pool E",
          "Intangible assets (patents, licenses, software, goodwill)",
          "Straight-Line",
          "Cost divided by useful economic life",
        ],
      ],
      footnote:
        "Special manufacturing entities may claim an additional one-third (1/3) accelerated depreciation allowance.",
    },
    answer:
      "Schedule 2 of the Income Tax Act, 2058 classifies all depreciable assets into five distinct pools using the diminishing balance (written-down value) method for Pools A through D, and straight-line method for Pool E:\n\n• **Pool A (5%)**: Buildings, structures, civil construction works.\n• **Pool B (25%)**: Office furniture, computers, data storage hardware, fixtures.\n• **Pool C (20%)**: Automobiles, buses, vans, and transport vehicles.\n• **Pool D (15%)**: Industrial machinery, specialized manufacturing equipment, generators.\n• **Pool E (Cost / Useful Life)**: Intangible assets including software, patents, copyrights, and licenses amortized over their legal lifetime.\n\nAdditions made during the fiscal year follow the three-tier rule: assets acquired before Poush end receive full depreciation; during Magh-Chaitra receive 2/3; and during Baisakh-Ashadh receive 1/3.",
    resources: [
      {
        title: "Income Tax Act, 2058 (2002)",
        citation: "Schedule 2 (Depreciation Schedules)",
        authority: "Inland Revenue Department",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
    ],
    followUps: [
      "What are the corporate tax rates for general companies?",
      "What are the rules for carrying forward business losses under Section 20?",
      "What are the withholding tax (TDS) rates under Section 88?",
    ],
  },
  {
    id: "transfer-pricing-section-33",
    question:
      "What are the transfer pricing rules and documentation requirements under Section 33 of Income Tax Act 2058?",
    shortTopic: "Transfer Pricing (Section 33)",
    category: "Acts",
    keywords: [
      "transfer pricing",
      "section 33",
      "arm's length",
      "associated persons",
      "related party",
      "cross border",
      "oecd",
    ],
    responseType: "analytical-thinking",
    thoughtProcess: {
      duration: "4.1s",
      summary:
        "Statutory analysis of Section 33 Arm's Length Principle and IRD power to recharacterize related-party transactions",
      steps: [
        "Verified scope under Section 33(1): Applies to transactions between associated persons (domestic and cross-border).",
        "Evaluated statutory power of the Tax Officer: Authority to reallocate income, deductions, and credits to reflect true economic arm's length value.",
        "Cross-referenced Rule 43 documentation standards: Formulated contemporaneous TP documentation requirements including comparability analysis.",
        "Evaluated transfer pricing methodologies accepted by IRD: Comparable Uncontrolled Price (CUP), Resale Price Method, Cost Plus Method, and Profit Split.",
      ],
    },
    answer:
      "Under Section 33 of the Income Tax Act, 2058, transactions between **associated persons** (entities under common control, ownership, or management) must be executed at **Arm's Length Principle (ALP)**:\n\n• **Reallocation Power**: The Inland Revenue Department possesses statutory authority to adjust income, deductions, and tax liabilities if cross-border or domestic transactions deviate from fair market terms.\n• **Recognized Transfer Pricing Methods**: The IRD accepts international standard methodologies including Comparable Uncontrolled Price (CUP), Resale Price Method (RPM), Cost Plus Method (CPM), and Transactional Net Margin Method (TNMM).\n• **Documentation Obligations**: Entities undertaking cross-border transactions with foreign parent companies or sister affiliates must maintain contemporaneous transfer pricing documentation, intercompany agreements, and benchmark analyses for presentation during statutory tax audits.",
    resources: [
      {
        title: "Income Tax Act, 2058 (2002)",
        citation: "Section 33 (Transfer Pricing & Associated Persons)",
        authority: "Inland Revenue Department",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
      {
        title: "Income Tax Rules, 2059 (2003)",
        citation: "Rule 43 (Transfer Pricing Documentation)",
        authority: "Ministry of Finance",
        externalUrl: "https://mof.gov.np",
      },
    ],
    followUps: [
      "What is Section 57 change in control in company taxation?",
      "What are the withholding tax (TDS) rates under Section 88?",
      "What is the Digital Services Tax rate in Nepal under Finance Act 2081?",
    ],
  },
  {
    id: "digital-services-tax",
    question:
      "What is the Digital Services Tax (DST) rate in Nepal under Finance Act 2081, and who is required to register?",
    shortTopic: "Digital Services Tax (DST)",
    category: "Finance Acts",
    keywords: [
      "dst",
      "digital services tax",
      "finance act 2081",
      "non resident",
      "netflix",
      "google",
      "2%",
      "30 lakhs",
      "electronic services",
    ],
    responseType: "deep-research",
    researchAudit: {
      dispatchedQueries: [
        "Finance Act 2081 Section 20 digital services tax non-resident rate",
        "Inland Revenue Department Lazimpat online guidelines for foreign digital entities",
        "Rajpatra notification Digital Service Tax threshold NPR 30 Lakhs",
      ],
      totalSourcesAudited: 4,
      sourcesExplored: [
        {
          name: "Finance Act, 2081 (2024)",
          citation: "Section 20 (Levy of Digital Services Tax)",
          authority: "Ministry of Finance",
          matchType: "Enacted Amendment",
          status: "Verified Checksum",
          excerpt:
            "2% tax on the transaction value of digital services provided by non-resident entities to resident consumers exceeding NPR 30 Lakhs annually.",
        },
        {
          name: "IRD DST Procedure Guidelines, 2079",
          citation: "Procedure No. 01/2079",
          authority: "Inland Revenue Department",
          matchType: "Procedural Directive",
          status: "Retrieved & Indexed",
          excerpt:
            "Foreign digital enterprises (SaaS, cloud streaming, advertising) must obtain permanent account number (PAN) via the dedicated online system.",
        },
      ],
    },
    rateTable: {
      title: "Digital Services Tax (DST) Statutory Benchmark",
      subtitle: "Finance Act 2081 Enacted Provisions",
      columns: ["Parameter", "Statutory Rule", "Operational Guidance"],
      rows: [
        [
          "Standard Tax Rate",
          "2.0% on transaction turnover",
          "Levied on gross invoice value charged to Nepali resident consumers",
        ],
        [
          "Annual Exemption Threshold",
          "NPR 30,00,000 (30 Lakhs)",
          "Calculated within a single Nepali fiscal year window",
        ],
        [
          "Applicable Scope",
          "Non-resident digital providers",
          "Cloud hosting, SaaS, streaming services, online advertising, marketplaces",
        ],
        [
          "Filing & Remittance",
          "Annual declaration & payment",
          "Payable within 3 months following the end of the fiscal year",
        ],
      ],
      footnote:
        "Digital services provided to VAT-registered businesses also require reverse-charge VAT compliance.",
    },
    answer:
      "Introduced originally in Finance Act 2079 and reaffirmed under **Finance Act, 2081**, Nepal levies a **2% Digital Services Tax (DST)** on foreign digital platforms:\n\n• **Rate**: 2% on the gross transaction value of digital services provided to consumers residing in Nepal.\n• **Registration Threshold**: Non-resident providers whose annual turnover from Nepali resident consumers exceeds **NPR 30 Lakhs (NPR 3,000,000)** within a fiscal year must register.\n• **Covered Services**: Streaming services (Netflix, Spotify), cloud storage, online advertising, software downloads, gaming, search engine access, and data aggregation.\n• **Compliance Mechanism**: Non-residents may register electronically with the IRD Large Taxpayers Office (LTO) without establishing a physical permanent establishment.",
    resources: [
      {
        title: "Finance Act, 2081 (2024)",
        citation: "Section 20 (Digital Services Tax)",
        authority: "Ministry of Finance",
        externalUrl: "https://mof.gov.np",
      },
      {
        title: "Income Tax Act, 2058 (2002)",
        citation: "Section 67 (Source of Income in Nepal)",
        authority: "Inland Revenue Department",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
    ],
    followUps: [
      "What is the standard VAT rate in Nepal, and what goods or services are exempt?",
      "What are the withholding tax (TDS) rates under Section 88?",
      "What are the corporate tax rates for general companies?",
    ],
  },
  {
    id: "penalties-interest-117-120",
    question:
      "What are the penalties under Section 117-120 for late filing and late TDS deposit in Nepal?",
    shortTopic: "Penalties & Interest (117-120)",
    category: "Acts",
    keywords: [
      "penalties",
      "interest",
      "section 117",
      "section 118",
      "section 119",
      "section 120",
      "late filing",
      "late payment",
      "15%",
      "fine",
    ],
    responseType: "multi-task",
    taskList: {
      title: "Statutory Penalty Audit & Mitigation Plan",
      tasks: [
        {
          id: "pen-1",
          phase: "Phase 1: Default Identification",
          label: "Classify Delay Category under Section 117",
          detail:
            "Determine whether default relates to estimated tax return (Sec 117(1)(a)), annual return (Sec 117(1)(c)), or withholding statement.",
          status: "completed",
        },
        {
          id: "pen-2",
          phase: "Phase 2: Fine Computation",
          label: "Calculate Fixed Fee & Turnover Penalties",
          detail:
            "Apply NPR 100/month or 0.1% per annum of assessable gross revenue, whichever is higher, for late return submission.",
          status: "completed",
        },
        {
          id: "pen-3",
          phase: "Phase 3: Interest Calculation",
          label: "Compute Section 118 & 119 Pro-Rata Interest at 15%",
          detail:
            "Calculate exact daily interest on overdue withholding or installment balance at the statutory 15% annual rate.",
          status: "in-progress",
        },
        {
          id: "pen-4",
          phase: "Phase 4: Revenue Settlement",
          label: "Generate IRD e-Tax Voucher & Clear Outstanding Surcharges",
          detail:
            "Submit overdue returns via the IRD online system and remit principal and accrued interest simultaneously to stop further accrual.",
          status: "verified",
        },
      ],
    },
    rateTable: {
      title: "Statutory Penalties & Interest Structure",
      subtitle: "Income Tax Act 2058 Sections 117-120",
      columns: [
        "Section",
        "Violation Category",
        "Statutory Fine / Interest Rate",
        "Compounding Basis",
      ],
      rows: [
        [
          "Section 117(1)(a)",
          "Failure to submit estimated tax statement",
          "NPR 2,000 fixed penalty per default",
          "Per statement",
        ],
        [
          "Section 117(1)(c)",
          "Failure to submit annual income tax return",
          "0.1% p.a. of revenue or NPR 100/mo (higher)",
          "Per month of delay",
        ],
        [
          "Section 118",
          "Underpayment of quarterly estimated installments",
          "15% per annum on unpaid installment deficit",
          "Daily pro-rata",
        ],
        [
          "Section 119",
          "Delay in payment of assessed tax or withholding",
          "15% per annum on overdue tax liability",
          "Daily pro-rata",
        ],
        [
          "Section 120",
          "False or misleading statements to IRD",
          "50% (unintentional) or 100% (intentional) of underpaid tax",
          "Per assessment notice",
        ],
      ],
      footnote:
        "Timely voluntary amendment prior to audit notice reduces exposure under Section 120.",
    },
    answer:
      "The Income Tax Act, 2058 enforces strict financial sanctions under Sections 117 through 120 for statutory non-compliance:\n\n• **Section 117 (Late Filing)**: Failure to submit an income tax return incurs a fee of **0.1% per annum of gross income or NPR 100 per month**, whichever is higher.\n• **Section 118 (Estimated Tax Shortfall)**: If quarterly estimated installment payments fall below 80% of actual tax liability, interest is levied at **15% per annum** on the shortfall.\n• **Section 119 (Late Payment & TDS Default)**: Delay in remitting final tax or withholding (TDS) incurs interest at **15% per annum** compounded daily until settlement.\n• **Section 120 (Misleading Statements)**: Knowingly providing false or misleading statements incurs a penalty of **100% of the tax shortfall** (50% if non-fraudulent error).",
    resources: [
      {
        title: "Income Tax Act, 2058 (2002)",
        citation: "Sections 117, 118, 119 & 120",
        authority: "Inland Revenue Department",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
      {
        title: "Income Tax Rules, 2059 (2003)",
        citation: "Rule 38 (Interest Computations)",
        authority: "Ministry of Finance",
        externalUrl: "https://mof.gov.np",
      },
    ],
    followUps: [
      "What are the withholding tax (TDS) rates under Section 88?",
      "How is individual income tax calculated under FY 2081/82 slabs?",
      "What is Section 57 change in control in company taxation?",
    ],
  },
  ...FINANCE_BILL_2083_MODULE_1_EN,
  ...FINANCE_BILL_2083_MODULE_2_EN,
  ...FINANCE_BILL_2083_MODULE_3_EN,
  ...FINANCE_BILL_2083_MODULE_4_EN,
  ...FINANCE_BILL_2083_MODULE_5_EN,
  ...FINANCE_BILL_2083_MODULE_6_EN,
  ...INCOME_TAX_2081_MODULES_1_4_EN,
  ...INCOME_TAX_2081_MODULES_5_7_EN,
  ...COMPANIES_ACT_2063_EN,
  ...AML_AND_DEVCOOP_EN,
  ...VAT_ACT_2052_CORE_EN,
  ...INCOME_TAX_ACT_2058_DEEP_EN,
];

export const MOCK_TAX_KNOWLEDGE_BASE_NP: MockQAPair[] = [
  {
    id: "tds-section-88",
    question:
      "आयकर ऐन, २०५८ को दफा ८८ बमोजिम स्रोतमा कर कट्टी (TDS) का दरहरू के-के हुन्?",
    shortTopic: "दफा ८८: स्रोतमा कर कट्टी (TDS)",
    category: "Acts",
    keywords: [
      "tds",
      "टीडीएस",
      "दफा ८८",
      "स्रोतमा कर",
      "कर कट्टी",
      "बहाल कर",
      "कमिसन",
      "परामर्श",
      "section 88",
      "withholding",
      "service fee",
      "rent",
      "commission",
      "88",
    ],
    responseType: "deep-research",
    researchAudit: {
      dispatchedQueries: [
        "आयकर ऐन २०५८ दफा ८८ स्रोतमा कर कट्टी दर अनुसूची २०८१",
        "आन्तरिक राजस्व विभाग लाजिम्पाट सेवा शुल्क टीडीएस परिपत्र",
        "आर्थिक ऐन २०८१ दफा ८८ र ८८क संशोधन विवरण",
      ],
      totalSourcesAudited: 6,
      sourcesExplored: [
        {
          name: "आयकर ऐन, २०५८",
          citation: "दफा ८८(१) र ८८(२)",
          authority: "आन्तरिक राजस्व विभाग",
          matchType: "Primary Act",
          status: "Verified Checksum",
          excerpt:
            "नेपालमा बासिन्दा व्यक्ति वा निकायले सेवा शुल्क, घरबहाल, कमिसन वा ब्याज भुक्तानी गर्दा तोकिए बमोजिम स्रोतमा कर कट्टी गर्नुपर्नेछ।",
          libraryId: "income-tax-act-2058",
        },
        {
          name: "आयकर ऐन, २०५८ — स्रोतमा कर कट्टी (TDS) पुस्तिका",
          citation: "परिच्छेद १७ कार्यविधि पुस्तिका · Source: Nepal_TDS.pdf",
          authority: "आन्तरिक राजस्व विभाग",
          matchType: "Administrative Circular",
          status: "Retrieved & Indexed",
          excerpt:
            "स्रोतमा कर कट्टी (TDS) गर्ने व्यक्ति, दर तालिका, र कर कट्टी दाखिला प्रक्रियासम्बन्धी आन्तरिक राजस्व विभागको आधिकारिक पुस्तिका।",
          libraryId: "tds-guide-2058",
        },
        {
          name: "आर्थिक ऐन, २०८१",
          citation: "दफा २८ (स्रोतमा कर समायोजन)",
          authority: "अर्थ मन्त्रालय",
          matchType: "Enacted Amendment",
          status: "Cross-Referenced",
          excerpt:
            "एकीकृत ई-टीडीएस (e-TDS) प्रणाली मार्फत विद्युतीय अभिलेख र दाखिला गर्ने म्याद पुनः प्रमाणीकरण गरिएको।",
        },
      ],
    },
    rateTable: {
      title: "स्रोतमा कर कट्टी (TDS) सम्बन्धी कानुनी दरहरू (दफा ८८)",
      subtitle: "आर्थिक वर्ष २०८१/८२ मा लागू हुने आधिकारिक दरहरू",
      columns: [
        "भुक्तानीको प्रकृति",
        "विक्रेताको स्थिति",
        "कानुनी कर कट्टी दर",
        "दाखिला गर्ने म्याद",
      ],
      rows: [
        [
          "सेवा शुल्क",
          "भ्याट दर्ता भएको फर्म/कम्पनी",
          "१.५%",
          "महिना समाप्त भएको २५ दिनभित्र",
        ],
        [
          "सेवा शुल्क",
          "भ्याट दर्ता नभएको प्राकृतिक व्यक्ति",
          "१५.०%",
          "महिना समाप्त भएको २५ दिनभित्र",
        ],
        [
          "व्यावसायिक घरबहाल",
          "संस्थागत वा व्यक्तिगत बहाल",
          "१०.०%",
          "महिना समाप्त भएको २५ दिनभित्र",
        ],
        [
          "परामर्श तथा विशेषज्ञ सेवा",
          "भ्याट दर्ता भएको निकाय",
          "१.५%",
          "महिना समाप्त भएको २५ दिनभित्र",
        ],
        [
          "परामर्श तथा सल्लाहकार सेवा",
          "भ्याट दर्ता नभएको व्यक्ति",
          "१५.०%",
          "महिना समाप्त भएको २५ दिनभित्र",
        ],
        [
          "कमिसन तथा एजेन्सी दस्तुर",
          "कुनै पनि व्यक्ति वा निकाय",
          "१५.०%",
          "महिना समाप्त भएको २५ दिनभित्र",
        ],
      ],
      footnote:
        "दफा ९० बमोजिम तोकिएको म्यादभित्र कर दाखिला नगरेमा ब्याज र थप दस्तुर लाग्नेछ।",
    },
    answer:
      "**आयकर ऐन, २०५८ को दफा ८८** बमोजिम नेपालभित्र बसोबास गर्ने व्यक्ति वा निकायले सेवा, घरबहाल, कमिसन वा शुल्क भुक्तानी गर्दा देहाय बमोजिम स्रोतमा कर कट्टी (TDS) गर्नुपर्ने कानुनी व्यवस्था छ:\n\n• **सेवा शुल्क (भ्याट बिलसहित)**: भ्याटमा दर्ता भएका आपूर्तिकर्तालाई भुक्तानी गर्दा बिल रकमको **१.५%** कर कट्टी गर्नुपर्छ।\n• **सेवा शुल्क (भ्याट दर्ता नभएका)**: स्थायी लेखा नम्बर (PAN) नभएका वा भ्याट दर्ता नभएका प्राकृतिक व्यक्तिलाई भुक्तानी गर्दा **१५%** TDS लाग्छ।\n• **व्यावसायिक घरबहाल**: व्यावसायिक वा संस्थागत प्रयोजनका लागि लिइएको घर वा जग्गाको बहाल रकममा **१०%** कर कट्टी गर्नुपर्छ।\n• **परामर्श तथा कानुनी सेवा**: भ्याट दर्ता नभएका व्यक्तिलाई **१५%** र भ्याट दर्ता भएको व्यावसायिक फर्मलाई **१.५%** लाग्छ।\n• **कमिसन तथा एजेन्सी शुल्क**: बिक्री प्रोत्साहन वा कमिसन भुक्तानी गर्दा सिधै **१५%** कर कट्टी गर्नुपर्छ।\n\nदफा ९० बमोजिम कट्टी गरिएको सम्पूर्ण कर रकम सम्बन्धित महिना सकिएको **२५ दिनभित्र** आन्तरिक राजस्व कार्यालयको राजस्व खातामा दाखिला गरिसक्नुपर्छ।",
    resources: [
      {
        title: "आयकर ऐन, २०५८",
        citation: "दफा ८८, ८८क र दफा ९०",
        authority: "आन्तरिक राजस्व विभाग",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
      {
        title: "आयकर नियमावली, २०५९",
        citation: "नियम २२ (कर कट्टी विवरण)",
        authority: "अर्थ मन्त्रालय",
        externalUrl: "https://mof.gov.np",
      },
      {
        title: "आयकर ऐन, २०५८ — स्रोतमा कर कट्टी (TDS) पुस्तिका",
        citation: "परिच्छेद १७ कार्यविधि पुस्तिका · Source: Nepal_TDS.pdf",
        authority: "आन्तरिक राजस्व विभाग",
        libraryId: "tds-guide-2058",
        externalUrl: "/api/sources/tds-guide-2058",
      },
    ],
    followUps: [
      "आ.व. २०८१/८२ मा प्राकृतिक व्यक्तिका लागि आयकर स्ल्याब र दरहरू के-के हुन्?",
      "दफा ११७ देखि १२० बमोजिम कर दाखिला ढिलाइमा कस्तो जरिवाना र ब्याज लाग्छ?",
      "नेपालमा साधारण कम्पनी तथा बैंकहरूका लागि संस्थागत करका दर कति हुन्?",
    ],
  },
  {
    id: "vat-rates-exemptions",
    question:
      "नेपालमा मूल्य अभिवृद्धि कर (भ्याट) को दर कति छ र कुन-कुन वस्तु तथा सेवाहरू भ्याटबाट मुक्त छन्?",
    shortTopic: "भ्याट दर र कर छुट हुने वस्तुहरू",
    category: "Acts",
    keywords: [
      "vat",
      "भ्याट",
      "मूल्य अभिवृद्धि कर",
      "कर छुट",
      "अनुसूची १",
      "१३%",
      "थ्रेसहोल्ड",
      "13%",
      "exempt",
      "exemptions",
    ],
    responseType: "tabular-schedule",
    rateTable: {
      title: "मूल्य अभिवृद्धि कर सम्बन्धी कानुनी अनुसूची",
      subtitle: "मूल्य अभिवृद्धि कर ऐन, २०५२ को दफा ५ र अनुसूची १",
      columns: [
        "वर्गीकरण",
        "करको दर तथा व्यवस्था",
        "दर्ता हुनुपर्ने कारोबार सीमा (थ्रेसहोल्ड)",
        "प्रमुख उदाहरणहरू",
      ],
      rows: [
        [
          "सामान्य वस्तु तथा सेवा",
          "१३% भ्याट (एकल दर)",
          "सीमाभन्दा माथि अनिवार्य",
          "विद्युतीय सामग्री, व्यावसायिक सेवा, उत्पादित वस्तुहरू",
        ],
        [
          "वस्तु तथा सेवाको निर्यात",
          "०% (शून्य दर)",
          "कुनै सीमा नभएको",
          "विदेश निकासी गरिएका सामान, विदेशी मुद्रा आर्जन गर्ने सफ्टवेयर निर्यात",
        ],
        [
          "अनुसूची १ मा उल्लिखित कर छुट वस्तु",
          "पूर्ण छुट (भ्याट नलाग्ने)",
          "लागू नहुने",
          "आधारभूत खाद्यान्न, ताजा तरकारी, जीवनरक्षक औषधिहरू",
        ],
        [
          "अनुसूची १ मा उल्लिखित कर छुट सेवा",
          "पूर्ण छुट (भ्याट नलाग्ने)",
          "लागू नहुने",
          "यात्रुवाहक यातायात, स्वास्थ्योपचार, विद्यालय/विश्वविद्यालय शिक्षा, बैंक तथा वित्तीय सेवा",
        ],
      ],
      footnote:
        "वस्तुको कारोबारमा वार्षिक रु. ५० लाख र सेवाको कारोबारमा रु. २० लाख नाघेमा अनिवार्य भ्याट दर्ता गर्नुपर्छ।",
    },
    answer:
      "**मूल्य अभिवृद्धि कर ऐन, २०५२ को दफा ५(१)** अनुसार नेपालमा मूल्य अभिवृद्धि कर (VAT) को मानक दर एकल **१३%** निर्धारण गरिएको छ। दफा ७ बमोजिम वस्तु तथा सेवाको निर्यातमा **शून्य दर (०%)** लागू हुन्छ।\n\n• **कर छुट हुने वस्तु तथा सेवा (अनुसूची १)**: अप्रशोधित खाद्यान्न (धान, चामल, दाल, दूध, ताजा तरकारी), प्राथमिक कृषि उत्पादन, तोकिएका जीवनरक्षक औषधि, अस्पताल तथा एम्बुलेन्स सेवा, प्राथमिक तथा माध्यमिक शिक्षा, सार्वजनिक यात्रु यातायात, र बैंक तथा वित्तीय सेवाहरू भ्याटमुक्त छन्।\n• **दर्ताको थ्रेसहोल्ड**: वस्तुको व्यापारमा वार्षिक **रु. ५० लाख** र सेवा वा परामर्श व्यवसायमा वार्षिक **रु. २० लाख** भन्दा बढी कारोबार भएमा अनिवार्य भ्याट दर्ता गर्नुपर्छ।\n• **विवरण तथा कर बुझाउने म्याद**: दफा १७ बमोजिम प्रत्येक महिना समाप्त भएको **२५ दिनभित्र** मासिक भ्याट विवरण र कर रकम बुझाउनुपर्छ।",
    resources: [
      {
        title: "मूल्य अभिवृद्धि कर ऐन, २०५२",
        citation: "दफा ५, ७ र अनुसूची १",
        authority: "आन्तरिक राजस्व विभाग",
        libraryId: "vat-act-2052",
        externalUrl: "/api/sources/vat-act-2052",
      },
      {
        title: "मूल्य अभिवृद्धि कर नियमावली, २०५३",
        citation: "नियम १४ र नियम २६",
        authority: "आन्तरिक राजस्व विभाग",
        externalUrl: "https://ird.gov.np",
      },
    ],
    followUps: [
      "आयकर ऐनको दफा ८८ बमोजिम स्रोतमा कर कट्टी (TDS) का दरहरू के-के हुन्?",
      "आर्थिक ऐन, २०८१ बमोजिम डिजिटल सेवा कर (DST) का नियमहरू के हुन्?",
      "आ.व. २०८१/८२ मा प्राकृतिक व्यक्तिका लागि आयकर स्ल्याब र दरहरू के-के हुन्?",
    ],
  },
  {
    id: "individual-tax-slabs",
    question:
      "आर्थिक वर्ष २०८१/८२ का लागि प्राकृतिक व्यक्ति तथा दम्पतीको आयकर स्ल्याब र दरहरू के-के हुन्?",
    shortTopic: "आ.व. २०८१/८२ को व्यक्तिगत आयकर स्ल्याब",
    category: "Finance Acts",
    keywords: [
      "individual",
      "slabs",
      "salary",
      "rates",
      "married",
      "व्यक्तिगत",
      "पारिश्रमिक",
      "स्ल्याब",
      "दम्पती",
      "अविवाहित",
      "सामाजिक सुरक्षा कर",
      "२०८१",
      "81/82",
    ],
    responseType: "tabular-schedule",
    thoughtProcess: {
      duration: "2.4s",
      summary:
        "आर्थिक ऐन, २०८१ द्वारा संशोधित आयकर ऐन, २०५८ को अनुसूची १ (दफा १) बमोजिम व्यक्तिगत आयकर स्ल्याबहरूको कानुनी विश्लेषण।",
      steps: [
        "आर्थिक ऐन, २०८१ को अनुसूची १ मा उल्लिखित आ.व. २०८१/८२ का व्यक्तिगत आयकर दरहरू अध्ययन गरियो।",
        "प्राकृतिक व्यक्ति (अविवाहित) र दम्पती (विवाहित) बीचका प्रगतिशील आय समूहहरू विभाजन गरियो।",
        "आधारभूत छुट सीमा (अविवाहित रु. ५ लाख / दम्पती रु. ६ लाख) मा १% सामाजिक सुरक्षा कर र कोष योगदानकर्ताका लागि छुट जाँच गरियो।",
        "थप स्ल्याबहरू (१०%, २०%, ३०%) र रु. ५० लाखभन्दा माथिको आयमा लाग्ने उच्चतम ३९% सम्मको दर यकिन गरियो।",
      ],
    },
    rateTable: {
      title: "प्राकृतिक व्यक्ति तथा दम्पतीको आयकर स्ल्याब (आ.व. २०८१/८२)",
      subtitle: "आर्थिक ऐन, २०८१ बमोजिम लागू प्रगतिशील कर संरचना",
      columns: [
        "आयको स्ल्याब",
        "अविवाहित व्यक्तिका लागि (रु.)",
        "दम्पतीका लागि (रु.)",
        "लागू हुने करको दर",
      ],
      rows: [
        [
          "पहिलो स्ल्याब",
          "रु. ५,००,००० सम्म",
          "रु. ६,००,००० सम्म",
          "१% (सामाजिक सुरक्षा कर)*",
        ],
        [
          "दोस्रो स्ल्याब",
          "५,००,००१ देखि ७,००,००० सम्म",
          "६,००,००१ देखि ८,००,००० सम्म",
          "१०%",
        ],
        [
          "तेस्रो स्ल्याब",
          "७,००,००१ देखि १०,००,००० सम्म",
          "८,००,००१ देखि ११,००,००० सम्म",
          "२०%",
        ],
        [
          "चौथो स्ल्याब",
          "१०,००,००१ देखि २०,००,००० सम्म",
          "११,००,००१ देखि २०,००,००० सम्म",
          "३०%",
        ],
        [
          "पाँचौँ स्ल्याब",
          "२०,००,००१ देखि ५०,००,००० सम्म",
          "२०,००,००१ देखि ५०,००,००० सम्म",
          "३६% (३०% + २०% अधिभार)",
        ],
        [
          "उच्चतम स्ल्याब",
          "रु. ५०,००,००० भन्दा माथि",
          "रु. ५०,००,००० भन्दा माथि",
          "३९% (३०% + ३०% अधिभार)",
        ],
      ],
      footnote:
        "*सामाजिक सुरक्षा कोष (SSF) मा आबद्ध कर्मचारी वा करदाताको हकमा यो १% सामाजिक सुरक्षा कर लाग्दैन।",
    },
    answer:
      "**आर्थिक ऐन, २०८१** अनुसार आर्थिक वर्ष २०८१/८२ (२०२४/२५) का लागि बासिन्दा प्राकृतिक व्यक्तिहरूको व्यक्तिगत आयकर प्रगतिशील स्ल्याब अनुसार गणना गरिन्छ:\n\n• **पहिलो स्ल्याब (अविवाहित रु. ५ लाख / दम्पती रु. ६ लाखसम्म)**: १% सामाजिक सुरक्षा कर (सामाजिक सुरक्षा कोषमा योगदान गर्ने कर्मचारीलाई यो छुट छ)।\n• **दोस्रो स्ल्याब (थप रु. २ लाखमा)**: १०% कर।\n• **तेस्रो स्ल्याब (थप रु. ३ लाखमा)**: २०% कर।\n• **चौथो स्ल्याब (थप रु. १० लाखमा)**: ३०% कर।\n• **पाँचौँ स्ल्याब (रु. २० लाखदेखि ५० लाखसम्मको बचतमा)**: ३६% प्रभावकारी दर (३०% आधार दर + २०% अतिरिक्त सरचार्ज)।\n• **उच्चतम स्ल्याब (रु. ५० लाखभन्दा माथिको आयमा)**: ३९% प्रभावकारी दर (३०% आधार दर + ३०% अतिरिक्त सरचार्ज)।\n\nकरदाताले जीवन बीमा प्रिमियम बापत वार्षिक अधिकतम **रु. ४०,००० सम्म** र स्वास्थ्य बीमा बापत **रु. २०,००० सम्म** करयोग्य आयबाट कट्टी दाबी गर्न पाउँछन्।",
    resources: [
      {
        title: "आर्थिक ऐन, २०८१",
        citation: "अनुसूची १ (आयकरका दरहरू)",
        authority: "अर्थ मन्त्रालय",
        externalUrl: "https://mof.gov.np",
      },
      {
        title: "आयकर ऐन, २०५८",
        citation: "अनुसूची १, दफा १",
        authority: "आन्तरिक राजस्व विभाग",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
    ],
    followUps: [
      "नेपालमा साधारण कम्पनी तथा बैंकहरूका लागि संस्थागत करका दर कति हुन्?",
      "आयकर ऐनको दफा ८८ बमोजिम स्रोतमा कर कट्टी (TDS) का दरहरू के-के हुन्?",
      "दफा ११७ देखि १२० बमोजिम कर दाखिला ढिलाइमा कस्तो जरिवाना र ब्याज लाग्छ?",
    ],
  },
  {
    id: "corporate-tax-rates",
    question:
      "नेपालमा साधारण कम्पनी, बैंक तथा वित्तीय संस्था र उत्पादनमूलक उद्योगका लागि संस्थागत आयकरका दरहरू कति हुन्?",
    shortTopic: "संस्थागत आयकर दरहरू (Corporate Tax)",
    category: "Acts",
    keywords: [
      "corporate",
      "company",
      "संस्थागत कर",
      "कम्पनी कर",
      "बैंक",
      "उत्पादनमूलक",
      "२५%",
      "३०%",
      "२०%",
      "manufacturing",
      "hydropower",
    ],
    responseType: "tabular-schedule",
    rateTable: {
      title: "संस्थागत आयकर संरचना (अनुसूची १)",
      subtitle: "आयकर ऐन, २०५८ र आर्थिक ऐन, २०८१ बमोजिम निर्धारित दरहरू",
      columns: [
        "निकायको वर्गीकरण",
        "लागू हुने कर दर",
        "विशेष सहुलियत तथा सर्तहरू",
        "सम्बन्धित कानुनी दफा",
      ],
      rows: [
        [
          "साधारण व्यापारिक तथा सेवामूलक कम्पनीहरू",
          "२५.०%",
          "खुद करयोग्य व्यावसायिक मुनाफामा मानक दर",
          "अनुसूची १, दफा २(१)",
        ],
        [
          "बैंक, वित्तीय संस्था तथा बीमा कम्पनीहरू",
          "३०.०%",
          "वाणिज्य बैंक, विकास बैंक, पुनर्बीमा तथा साधारण बीमा",
          "अनुसूची १, दफा २(२)",
        ],
        [
          "सुर्ती, मदिरा, चुरोट तथा बियर उत्पादक उद्योग",
          "३०.०%",
          "कुनै उत्पादनमूलक कर छुट सहुलियत नपाउने",
          "आर्थिक ऐन, २०८१",
        ],
        [
          "विशेष उत्पादनमूलक उद्योगहरू",
          "२०.०%",
          "स्वदेशी रोजगारी सिर्जना गर्ने प्रत्यक्ष उत्पादनमूलक उद्योग",
          "दफा ११(२ख) सहुलियत",
        ],
        [
          "जलविद्युत उत्पादन तथा प्रसारण आयोजना",
          "०% (१० वर्ष) / ५०% (५ वर्ष)",
          "तोकिएको समयसीमाभित्र व्यापारिक उत्पादन सुरु गरेका आयोजना",
          "दफा ११(३ग) पूर्ण कर छुट",
        ],
        [
          "सूचना प्रविधि तथा सफ्टवेयर निर्यात आय",
          "१२.५%",
          "विदेशी मुद्रामा सफ्टवेयर निर्यात गर्दा ५०% कर छुट",
          "आर्थिक ऐन, २०८१ दफा २४",
        ],
      ],
      footnote:
        "दफा ११ बमोजिमका छुट पाउन तोकिएको स्वदेशी कच्चा पदार्थ र रोजगारीको मापदण्ड निरन्तर पालना गर्नुपर्छ।",
    },
    answer:
      "**आयकर ऐन, २०५८ को अनुसूची १ को दफा २** अनुसार नेपालमा संस्थागत आयकर (Corporate Income Tax) का दरहरू व्यवसायको प्रकृति अनुसार फरक-फरक तोकिएका छन्:\n\n• **साधारण कम्पनीहरू**: सामान्य व्यापारिक तथा सेवामूलक निकायका लागि खुद करयोग्य मुनाफाको मानक दर **२५%**।\n• **बैंक तथा वित्तीय संस्था (BFIs)**: वाणिज्य बैंक, वित्तीय संस्था, जीवन तथा निर्जीवन बीमा कम्पनीहरूका लागि **३०%**।\n• **उत्पादनमूलक विशेष उद्योग**: प्रत्यक्ष वस्तु उत्पादन गर्ने र स्वदेशी श्रमिकलाई रोजगारी दिने उद्योगलाई २०% छुट दिई प्रभावकारी दर **२०%** लाग्छ।\n• **जलविद्युत तथा पूर्वाधार विकास**: व्यापारिक उत्पादन सुरु गरेको पहिलो १० वर्षसम्म **१००% पूर्ण कर छुट** र त्यसपछिको ५ वर्ष **५०% कर छुट**।\n• **सूचना प्रविधि (IT) तथा सफ्टवेयर निर्यात**: सफ्टवेयर वा आईटी सेवा विदेश निर्यात गरी परिवर्त्य विदेशी मुद्रा आर्जन गरेमा सामान्य दरमा ५०% छुट भई **१२.५%** मात्र कर लाग्छ।",
    resources: [
      {
        title: "आयकर ऐन, २०५८",
        citation: "अनुसूची १, दफा २ र दफा ११",
        authority: "आन्तरिक राजस्व विभाग",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
      {
        title: "आर्थिक ऐन, २०८१",
        citation: "दफा ११ (औद्योगिक कर छुट तथा सहुलियत)",
        authority: "अर्थ मन्त्रालय",
        externalUrl: "https://mof.gov.np",
      },
    ],
    followUps: [
      "आयकर ऐनको दफा ५७ बमोजिम स्वामित्व परिवर्तन हुँदा करमा के प्रभाव पर्छ?",
      "दफा २० बमोजिम व्यवसायको नोक्सानी कति वर्षसम्म सार्न पाइन्छ?",
      "आयकर ऐनको दफा ८८ बमोजिम स्रोतमा कर कट्टी (TDS) का दरहरू के-के हुन्?",
    ],
  },
  {
    id: "section-57-change-in-control",
    question:
      "आयकर ऐनको दफा ५७ बमोजिम स्वामित्वमा ५०% वा सोभन्दा बढी परिवर्तन हुँदा कम्पनीको कर दायित्व र नोक्सानी सार्ने सुविधामा के प्रभाव पर्छ?",
    shortTopic: "दफा ५७: स्वामित्व परिवर्तन (Change in Control)",
    category: "Acts",
    keywords: [
      "section 57",
      "57",
      "दफा ५७",
      "स्वामित्व परिवर्तन",
      "५०%",
      "change in control",
      "नोक्सानी सार्ने",
      "डिम्ड निसर्ग",
      "securities",
      "share transfer",
    ],
    responseType: "analytical-thinking",
    thoughtProcess: {
      duration: "3.9s",
      summary:
        "आयकर ऐन, २०५८ को दफा ५७ बमोजिम ३ वर्षे अवधिभित्र वास्तविक स्वामित्व परिवर्तन र डिम्ड रियलाइजेसन (Deemed Realization) को कानुनी अध्ययन।",
      steps: [
        "दफा ५७(१) अनुसार पछिल्लो ३ वर्षको अवधिमा ५०% वा सोभन्दा बढी वास्तविक स्वामित्व परिवर्तन भएको अवस्था पहिचान गरियो।",
        "दफा ५७(२) बमोजिम परिवर्तन हुनुभन्दा ठीक अघि कम्पनीका सम्पत्ति तथा दायित्व प्रचलित बजार मूल्यमा निसर्ग भएको मानिने नियम विश्लेषण गरियो।",
        "दफा २० र ५७ अनुसार स्वामित्व परिवर्तन पूर्वका सञ्चित नोक्सानीहरू पछिल्लो नाफाबाट घटाउन नपाउने (Quarantine) नियम प्रमाणीकरण गरियो।",
        "दफा ५७(३) बमोजिम वास्तविक शेयरधनीको हित परिवर्तन नभएको समूहगत पुनर्संरचनामा प्राप्त हुने छुटका प्रावधान जाँच गरियो।",
      ],
    },
    answer:
      "**आयकर ऐन, २०५८ को दफा ५७** कर छली रोक्न बनेको विशेष व्यवस्था हो। कुनै निकायको विगत ३ वर्षभित्र **५०% वा सोभन्दा बढी वास्तविक स्वामित्व (Underlying Ownership)** मा परिवर्तन भएमा नियन्त्रण परिवर्तन भएको मानिन्छ र देहायका कानुनी प्रभाव पर्छन्:\n\n• **सम्पत्ति तथा दायित्वको मानिएको निसर्ग (Deemed Realization)**: दफा ५७(२) अनुसार स्वामित्व परिवर्तन हुनुभन्दा ठीक अघि कम्पनीले आफ्ना सम्पूर्ण सम्पत्ति तथा दायित्वहरू प्रचलित बजार मूल्यमा बिक्री गरी पुनः सोही मूल्यमा खरिद गरेको मानिन्छ। यसबाट सम्पत्तिमा कुनै पुँजीगत नाफा देखिएमा सो वर्ष कर तिर्नुपर्छ।\n• **सञ्चित नोक्सानी उपयोगमा बन्देज (Loss Quarantine)**: स्वामित्व परिवर्तन हुनुपूर्वका आर्थिक वर्षहरूबाट सरेर आएको असुल हुन बाँकी व्यावसायिक नोक्सानी नयाँ व्यवस्थापनपछिको आयबाट कट्टी गर्न पाइँदैन।\n• **ह्रासकट्टी आधारको समायोजन**: ह्रासयोग्य सम्पत्तिहरूको आधार मूल्य बजार मूल्यमा अद्यावधिक भई आगामी वर्षहरूमा सोही अनुसार ह्रासकट्टी हुन्छ।\n• **कर कार्यालयमा सूचना**: यस्तो स्वामित्व परिवर्तन भएको **१५ दिनभित्र** सम्बन्धित आन्तरिक राजस्व कार्यालयमा अनिवार्य लिखित जानकारी दिनुपर्छ।",
    resources: [
      {
        title: "आयकर ऐन, २०५८",
        citation: "दफा ५७ (स्वामित्वमा परिवर्तन)",
        authority: "आन्तरिक राजस्व विभाग",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
    ],
    followUps: [
      "दफा २० बमोजिम व्यवसायको नोक्सानी कति वर्षसम्म सार्न पाइन्छ?",
      "दफा ३३ बमोजिम ट्रान्सफर प्राइसिङ र आर्म्स लेन्थ सिद्धान्त कसरी लागू हुन्छ?",
      "नेपालमा साधारण कम्पनी तथा बैंकहरूका लागि संस्थागत करका दर कति हुन्?",
    ],
  },
  {
    id: "loss-carryforward",
    question:
      "व्यवसायमा भएको नोक्सानी कति वर्षसम्म सार्न (Carry forward) पाइन्छ र पूर्वाधार आयोजनाका लागि के विशेष व्यवस्था छ?",
    shortTopic: "व्यावसायिक नोक्सानी सार्ने नियम (दफा २०)",
    category: "Acts",
    keywords: [
      "loss",
      "carryforward",
      "section 20",
      "दफा २०",
      "नोक्सानी",
      "७ वर्ष",
      "१२ वर्ष",
      "जलविद्युत",
      "पूर्वाधार",
      "व्यावसायिक नोक्सानी",
    ],
    responseType: "multi-task",
    taskList: {
      title: "कानुनी नोक्सानी मिलान तथा प्रमाणीकरण कार्ययोजना",
      tasks: [
        {
          id: "task-1",
          phase: "चरण १: नोक्सानीको वर्गीकरण",
          label: "व्यावसायिक नोक्सानी र पुँजीगत नोक्सानी अलग गर्ने",
          detail:
            "दफा २०(१) अनुसार व्यावसायिक नोक्सानी व्यावसायिक आयबाट घटाउन सकिन्छ तर लगानीको पुँजीगत नोक्सानी नियमित व्यापारिक आयबाट घटाउन पाइँदैन।",
          status: "completed",
        },
        {
          id: "task-2",
          phase: "चरण २: सार्न पाउने अवधिको लेखाजोखा",
          label: "७ वर्षे र १२ वर्षे समयसीमा प्रमाणीकरण",
          detail:
            "सामान्य व्यवसायका लागि ७ वर्ष र तोकिएका जलविद्युत, सडक, सुरुङमार्ग तथा पूर्वाधार आयोजनाका लागि १२ वर्षे विशेष सुविधा यकिन गरियो।",
          status: "completed",
        },
        {
          id: "task-3",
          phase: "चरण ३: स्वामित्व निरन्तरता परीक्षण",
          label: "दफा ५७ बमोजिम ५०% स्वामित्व निरन्तरता जाँच",
          detail:
            "पछिल्लो ३ वर्षमा स्वामित्व परिवर्तन ५०% भन्दा कम रहेको पुष्टि गरी नोक्सानी ल्याप्स हुनबाट रोक्ने कार्य।",
          status: "in-progress",
        },
        {
          id: "task-4",
          phase: "चरण ४: कर विवरणमा मिलान दाखिला",
          label: "आन्तरिक राजस्व विभागमा अनुसूची-७ नोक्सानी विवरण पेस गर्ने",
          detail:
            "आर्थिक वर्ष समाप्त भएको ३ महिना (असोज मसान्त) भित्र वर्षगत रूपमा नोक्सानी मिलानको तालिका अनलाइन पोर्टलमा चढाउने।",
          status: "verified",
        },
      ],
    },
    answer:
      "**आयकर ऐन, २०५८ को दफा २०** बमोजिम कुनै आय वर्षमा व्यवसायबाट भएको खुद नोक्सानी आगामी आर्थिक वर्षहरूको करयोग्य व्यावसायिक आयबाट घटाउन सकिन्छ:\n\n• **सामान्य व्यवसायको समयावधि**: साधारण व्यापार, वाणिज्य तथा सेवा व्यवसायमा भएको नोक्सानी आगामी **७ आर्थिक वर्षसम्म** लगातार सारेर नाफाबाट मिलान गर्न पाइन्छ।\n• **पूर्वाधार तथा विशेष आयोजना (१२ वर्षे सुविधा)**: जलविद्युत उत्पादन, प्रसारण लाइन, विमानस्थल, सुरुङमार्ग, सडक, रेलमार्ग तथा पेट्रोलियम/खानी उत्खनन गर्ने निकायहरूले नोक्सानी **१२ आर्थिक वर्षसम्म** सार्न पाउँछन्।\n• **पहिलेको नोक्सानी पहिले मिलान (FIFO नियम)**: धेरै वर्षको नोक्सानी बाँकी भएमा सबैभन्दा पुरानो वर्षको नोक्सानी पहिले मिलान गरिसक्नुपर्छ।\n• **पुँजीगत नोक्सानीको सीमा**: सेयर वा लगानी निसर्गबाट भएको पुँजीगत नोक्सानी केवल सोही वर्ष वा आगामी वर्षका पुँजीगत लाभ (Capital Gains) बाट मात्र घटाउन मिल्छ, नियमित व्यावसायिक नाफाबाट घटाउन पाइँदैन।",
    resources: [
      {
        title: "आयकर ऐन, २०५८",
        citation: "दफा २० (नोक्सानी कट्टी गर्ने व्यवस्था)",
        authority: "आन्तरिक राजस्व विभाग",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
    ],
    followUps: [
      "आयकर ऐनको दफा ५७ बमोजिम स्वामित्व परिवर्तन हुँदा करमा के प्रभाव पर्छ?",
      "नेपालमा साधारण कम्पनी तथा बैंकहरूका लागि संस्थागत करका दर कति हुन्?",
      "आयकर ऐनको अनुसूची २ बमोजिम ह्रासकट्टीका वर्ग तथा दरहरू के-के हुन्?",
    ],
  },
  {
    id: "depreciation-schedule-2",
    question:
      "आयकर ऐनको अनुसूची २ बमोजिम ह्रासकट्टी (Depreciation) का वर्गहरू र घट्दो मौज्दात विधि (Declining Balance) का दरहरू के-के हुन्?",
    shortTopic: "अनुसूची २: ह्रासकट्टीका वर्ग तथा दरहरू",
    category: "Acts",
    keywords: [
      "depreciation",
      "schedule 2",
      "pools",
      "ह्रासकट्टी",
      "अनुसूची २",
      "घट्दो मौज्दात",
      "सम्पत्ति",
      "मेसिनरी",
      "भवन",
      "गाडी",
    ],
    responseType: "deep-research",
    researchAudit: {
      dispatchedQueries: [
        "आयकर ऐन २०५८ अनुसूची २ ह्रासकट्टी वर्ग र प्रतिशत दर",
        "आन्तरिक राजस्व विभाग एकीकृत निर्देशिका घट्दो मौज्दात ह्रासकट्टी विधि",
        "आर्थिक ऐन चालु वर्ष सम्पत्ति खरिद तीन-भाग नियम",
      ],
      totalSourcesAudited: 5,
      sourcesExplored: [
        {
          name: "आयकर ऐन, २०५८",
          citation: "अनुसूची २, दफा १ देखि ४",
          authority: "आन्तरिक राजस्व विभाग",
          matchType: "Primary Act",
          status: "Verified Checksum",
          excerpt:
            "ह्रासयोग्य सम्पत्तिलाई वर्ग क, ख, ग र घ मा घट्दो मौज्दात विधिबाट र वर्ग ङ मा सरल रेखा विधिबाट ह्रासकट्टी गरिनेछ।",
          libraryId: "income-tax-act-2058",
        },
        {
          name: "आयकर नियमावली, २०५९",
          citation: "नियम ११ (सम्पत्तिको दाखिला तथा निष्कासन)",
          authority: "अर्थ मन्त्रालय",
          matchType: "Statutory Rule",
          status: "Retrieved & Indexed",
          excerpt:
            "आय वर्षमा खरिद गरिएको सम्पत्तिको ह्रास आधार: पुस मसान्तसम्म १००%, माघ-चैत ६६.६%, र वैशाख-असार ३३.३% भाग मात्र समावेश हुने।",
        },
      ],
    },
    rateTable: {
      title: "अनुसूची २: ह्रासयोग्य सम्पत्तिका समूह तथा दरहरू",
      subtitle: "घट्दो मौज्दात (WDV) र सरल रेखा विधि (Straight-Line)",
      columns: [
        "सम्पत्तिको समूह",
        "सम्पत्तिका प्रकारहरू",
        "वार्षिक ह्रासकट्टी दर",
        "गणना गर्ने विधि",
      ],
      rows: [
        [
          "वर्ग 'क' (Pool A)",
          "भवन, पुल, सडक तथा स्थायी सिभिल संरचनाहरू",
          "५.०%",
          "घट्दो मौज्दात विधि (WDV)",
        ],
        [
          "वर्ग 'ख' (Pool B)",
          "कार्यालय फर्निचर, कम्प्युटर, ल्यापटप तथा कार्यालय उपकरण",
          "२५.०%",
          "घट्दो मौज्दात विधि (WDV)",
        ],
        [
          "वर्ग 'ग' (Pool C)",
          "अटोमोबाइल, बस, ट्रक तथा अन्य ढुवानी सवारी साधनहरू",
          "२०.०%",
          "घट्दो मौज्दात विधि (WDV)",
        ],
        [
          "वर्ग 'घ' (Pool D)",
          "औद्योगिक प्लान्ट, मेसिनरी तथा उत्पादन उपकरणहरू",
          "१५.०%",
          "घट्दो मौज्दात विधि (WDV)",
        ],
        [
          "वर्ग 'ङ' (Pool E)",
          "अमूर्त सम्पत्ति (सफ्टवेयर, पेटेन्ट, ट्रेडमार्क, इजाजतपत्र)",
          "सरल रेखा विधि",
          "सम्पत्तिको उपयोगी आयु (Useful Life) ले भाग गरी",
        ],
      ],
      footnote:
        "विशेष उत्पादनमूलक उद्योगले प्रचलित दरमा थप एक-तिहाइ (१/३) अतिरिक्त ह्रासकट्टी सुविधा दाबी गर्न पाउँछन्।",
    },
    answer:
      "**आयकर ऐन, २०५८ को दफा १९ र अनुसूची २** अनुसार ह्रासयोग्य सम्पत्तिहरूलाई ५ वटा समूहमा विभाजन गरी ह्रासकट्टी (Depreciation) गर्नुपर्छ। वर्ग 'क' देखि 'घ' सम्म घट्दो मौज्दात विधि (Diminishing Balance / WDV) र वर्ग 'ङ' मा सरल रेखा विधि लागू हुन्छ:\n\n• **वर्ग 'क' (५%)**: भवन, संरचना तथा स्थायी निर्माण कार्यहरू।\n• **वर्ग 'ख' (२५%)**: कार्यालय फर्निचर, कम्प्युटर, डेटा भण्डारण उपकरण तथा फिक्चर्स।\n• **वर्ग 'ग' (२०%)**: कार, बस, जीप, भ्यान तथा ढुवानीका सवारी साधन।\n• **वर्ग 'घ' (१५%)**: औद्योगिक मेसिनरी, प्लान्ट, जेनेरेटर तथा निर्माण उपकरणहरू।\n• **वर्ग 'ङ' (लागत / उपयोगी आयु)**: अमूर्त सम्पत्तिहरू (सफ्टवेयर, प्रतिलिपि अधिकार, पेटेन्ट र लाइसेन्स) लाई तिनको कानुनी आयु अनुसार समान किस्तामा अपलेखन गरिन्छ।\n\nवर्षभित्र खरिद गरिएका सम्पत्तिमा **तीन-भाग नियम (Three-tier rule)** लागू हुन्छ: पुस मसान्तसम्म खरिद गरेको पुरै (३/३), चैत मसान्तसम्म खरिद गरेको २/३ र असार मसान्तसम्म खरिद गरेको १/३ भाग मात्र त्यस वर्षको ह्रास आधारमा जोड्न पाइन्छ।",
    resources: [
      {
        title: "आयकर ऐन, २०५८",
        citation: "अनुसूची २ (ह्रासकट्टी अनुसूची)",
        authority: "आन्तरिक राजस्व विभाग",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
    ],
    followUps: [
      "नेपालमा साधारण कम्पनी तथा बैंकहरूका लागि संस्थागत करका दर कति हुन्?",
      "दफा २० बमोजिम व्यवसायको नोक्सानी कति वर्षसम्म सार्न पाइन्छ?",
      "आयकर ऐनको दफा ८८ बमोजिम स्रोतमा कर कट्टी (TDS) का दरहरू के-के हुन्?",
    ],
  },
  {
    id: "transfer-pricing-section-33",
    question:
      "आयकर ऐनको दफा ३३ अनुसार सम्बन्धित व्यक्तिहरूबीच हुने कारोबारमा ट्रान्सफर प्राइसिङ (Transfer Pricing) र आर्म्स लेन्थ सिद्धान्त कसरी लागू हुन्छ?",
    shortTopic: "दफा ३३: ट्रान्सफर प्राइसिङ तथा आर्म्स लेन्थ",
    category: "Acts",
    keywords: [
      "transfer pricing",
      "section 33",
      "arm's length",
      "दफा ३३",
      "ट्रान्सफर प्राइसिङ",
      "आर्म्स लेन्थ",
      "सम्बद्ध व्यक्ति",
      "अन्तर्राष्ट्रिय कारोबार",
    ],
    responseType: "analytical-thinking",
    thoughtProcess: {
      duration: "4.1s",
      summary:
        "आयकर ऐनको दफा ३३ मा उल्लिखित आर्म्स लेन्थ सिद्धान्त र सम्बद्ध व्यक्तिबीचको कारोबारमा कर अधिकृतको पुनर्संयोजन अधिकारको विश्लेषण।",
      steps: [
        "दफा ३३(१) अनुसार सम्बद्ध व्यक्तिहरू (स्वदेशी तथा अन्तरदेशीय निकाय) बीचको कारोबारको कानुनी दायरा पहिचान गरियो।",
        "कर अधिकृतको कानुनी अधिकार: वास्तविक खुला बजार मूल्य प्रतिबिम्बित गर्न आय, खर्च तथा कटौतिलाई पुनर्वितरण गर्ने अधिकार अध्ययन गरियो।",
        "नियम ४३ बमोजिम ट्रान्सफर प्राइसिङ सम्बन्धी समसामयिक कागजात र तुलनात्मक अध्ययन (Comparability Study) का मापदण्ड जाँच गरियो।",
        "स्वीकार्य विधिहरू: खुला बजार मूल्य विधि (CUP), पुनर्विक्रय मूल्य विधि (RPM), र लागत थप विधि (Cost Plus) को प्रयोग विश्लेषण गरियो।",
      ],
    },
    answer:
      "**आयकर ऐन, २०५८ को दफा ३३** अनुसार एउटै समूह, स्वामित्व वा साझा व्यवस्थापन भएका **सम्बद्ध व्यक्तिहरू (Associated Persons / Related Parties)** बीच हुने कुनै पनि वस्तु वा सेवाको कारोबार **आर्म्स लेन्थ सिद्धान्त (Arm's Length Principle)** अनुसार हुनुपर्छ:\n\n• **पुनर्संयोजन गर्ने अधिकार**: यदि सम्बन्धित निकायहरूबीच खुला बजारभन्दा अस्वाभाविक मूल्यमा कारोबार गरी नाफा विदेश पठाउने वा कर दायित्व घटाउने काम भएमा, आन्तरिक राजस्व कार्यालयले उक्त कारोबारलाई बजार मूल्यमा पुनर्गणना गरी कर निर्धारण गर्न सक्छ।\n• **स्वीकार्य विधिहरू**: आन्तरिक राजस्व विभागले अन्तर्राष्ट्रिय रूपमा प्रचलित विधिहरू जस्तै खुला बजार मूल्य विधि (CUP), पुनर्विक्रय मूल्य विधि (Resale Price), लागत थप विधि (Cost Plus) र खुद मुनाफा विधि (TNMM) लाई मान्यता दिन्छ।\n• **कागजात तथा अभिलेख राख्ने दायित्व**: विदेशी मूल कम्पनी वा भगिनी संस्थासँग कारोबार गर्ने बहुराष्ट्रिय कम्पनीहरूले ट्रान्सफर प्राइसिङ अध्ययन प्रतिवेदन, कारोबारका सम्झौता र बजार मूल्य पुष्टि गर्ने प्रमाणहरू कर परीक्षण (Audit) का लागि सुरक्षित राख्नुपर्छ।",
    resources: [
      {
        title: "आयकर ऐन, २०५८",
        citation: "दफा ३३ (सम्बद्ध व्यक्ति र ट्रान्सफर प्राइसिङ)",
        authority: "आन्तरिक राजस्व विभाग",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
      {
        title: "आयकर नियमावली, २०५९",
        citation: "नियम ४३ (ट्रान्सफर प्राइसिङ कागजात)",
        authority: "अर्थ मन्त्रालय",
        externalUrl: "https://mof.gov.np",
      },
    ],
    followUps: [
      "आयकर ऐनको दफा ५७ बमोजिम स्वामित्व परिवर्तन हुँदा करमा के प्रभाव पर्छ?",
      "आयकर ऐनको दफा ८८ बमोजिम स्रोतमा कर कट्टी (TDS) का दरहरू के-के हुन्?",
      "आर्थिक ऐन, २०८१ बमोजिम डिजिटल सेवा कर (DST) का नियमहरू के हुन्?",
    ],
  },
  {
    id: "digital-services-tax",
    question:
      "नेपालमा विदेशी डिजिटल सेवा प्रदायकहरूमाथि लाग्ने डिजिटल सेवा कर (DST) को दर, थ्रेसहोल्ड र दर्ता प्रक्रिया के हो?",
    shortTopic: "डिजिटल सेवा कर (DST) र दर्ता प्रक्रिया",
    category: "Finance Acts",
    keywords: [
      "dst",
      "digital services tax",
      "डिजिटल सेवा कर",
      "नेटफ्लिक्स",
      "गुगल",
      "२%",
      "३० लाख",
      "गैर-बासिन्दा",
      "finance act 2081",
    ],
    responseType: "deep-research",
    researchAudit: {
      dispatchedQueries: [
        "आर्थिक ऐन २०८१ दफा २० गैर-बासिन्दा डिजिटल सेवा कर २ प्रतिशत दर",
        "आन्तरिक राजस्व विभाग लाजिम्पाट विदेशी डिजिटल सेवा प्रदायक अनलाइन पोर्टल",
        "राजपत्र सूचना डिजिटल सेवा कर वार्षिक सीमा ३० लाख रुपैयाँ",
      ],
      totalSourcesAudited: 4,
      sourcesExplored: [
        {
          name: "आर्थिक ऐन, २०८१",
          citation: "दफा २० (डिजिटल सेवा कर लगाउने व्यवस्था)",
          authority: "अर्थ मन्त्रालय",
          matchType: "Enacted Amendment",
          status: "Verified Checksum",
          excerpt:
            "नेपालमा बासिन्दा उपभोक्तालाई वार्षिक रु. ३० लाखभन्दा बढीको डिजिटल सेवा उपलब्ध गराउने गैर-बासिन्दा व्यक्ति वा निकायमाथि २% कर लाग्नेछ।",
        },
        {
          name: "डिजिटल सेवा कर सम्बन्धी कार्यविधि, २०७९",
          citation: "कार्यविधि नं. ०१/२०७९",
          authority: "आन्तरिक राजस्व विभाग",
          matchType: "Procedural Directive",
          status: "Retrieved & Indexed",
          excerpt:
            "विदेशी डिजिटल सेवा प्रदायकहरू (SaaS, क्लाउड स्ट्रिमिङ, अनलाइन विज्ञापन) ले विभागको पोर्टलबाट विद्युतीय स्थायी लेखा नम्बर (PAN) लिनुपर्नेछ।",
        },
      ],
    },
    rateTable: {
      title: "डिजिटल सेवा कर (DST) सम्बन्धी कानुनी मापदण्ड",
      subtitle: "आर्थिक ऐन, २०८१ मा व्यवस्था गरिएका प्रावधानहरू",
      columns: ["मापदण्ड", "कानुनी प्रावधान", "व्यावहारिक कार्यविधि"],
      rows: [
        [
          "मानक करको दर",
          "कारोबार रकमको २.०%",
          "नेपाली बासिन्दा उपभोक्तालाई बिलिङ गरिएको कुल रकममा लाग्ने",
        ],
        [
          "वार्षिक कर छुट सीमा (थ्रेसहोल्ड)",
          "रु. ३०,००,००० (३० लाख रुपैयाँ)",
          "एकै आर्थिक वर्षभित्र नेपालमा गरिएको कुल कारोबारको गणना",
        ],
        [
          "लागू हुने सेवाको दायरा",
          "गैर-बासिन्दा डिजिटल सेवा प्रदायकहरू",
          "क्लाउड होस्टिङ, SaaS, स्ट्रिमिङ प्लेटफर्म, अनलाइन विज्ञापन, एप्स तथा गेमिङ",
        ],
        [
          "विवरण तथा कर बुझाउने अवधि",
          "वार्षिक विवरण र कर दाखिला",
          "आर्थिक वर्ष समाप्त भएको ३ महिनाभित्र (असोज मसान्तसम्म)",
        ],
      ],
      footnote:
        "भ्याट दर्ता भएका व्यावसायिक ग्राहकलाई दिइएको सेवामा ग्राहक आफैँले उल्टो कर (Reverse Charge VAT) समेत तिर्नुपर्छ।",
    },
    answer:
      "आर्थिक ऐन २०७९ बाट सुरु भई **आर्थिक ऐन, २०८१** मा निरन्तरता दिइएको व्यवस्था अनुसार नेपालका उपभोक्तालाई डिजिटल सेवा दिने विदेशी कम्पनीहरूमाथि **२% डिजिटल सेवा कर (DST)** लाग्छ:\n\n• **करको दर**: नेपालभित्रका उपभोक्तालाई बिक्री गरिएको डिजिटल सेवाको कुल बिल रकमको **२%**।\n• **दर्ताको थ्रेसहोल्ड**: कुनै एक आर्थिक वर्षमा नेपाली बासिन्दा उपभोक्ताहरूबाट भएको कारोबार **रु. ३० लाख (रु. ३,०००,०००)** भन्दा बढी भएमा अनिवार्य दर्ता हुनुपर्छ।\n• **समावेश हुने सेवाहरू**: सामाजिक सञ्जाल तथा सर्च इन्जिन विज्ञापन, अनलाइन स्ट्रिमिङ (Netflix, Spotify, YouTube Premium), क्लाउड कम्प्युटिङ, सफ्टवेयर तथा एप्स डाउनलोड र डेटा संकलन।\n• **दर्ता तथा दाखिला प्रक्रिया**: विदेशी प्रदायकले नेपालमा भौतिक कार्यालय नभए पनि ठूला करदाता कार्यालय (LTO) को अनलाइन पोर्टल मार्फत विद्युतीय दर्ता गरी आर्थिक वर्ष सकिएको **३ महिनाभित्र** वार्षिक कर विवरण र रकम बुझाउनुपर्छ।",
    resources: [
      {
        title: "आर्थिक ऐन, २०८१",
        citation: "दफा २० (डिजिटल सेवा कर)",
        authority: "अर्थ मन्त्रालय",
        externalUrl: "https://mof.gov.np",
      },
      {
        title: "आयकर ऐन, २०५८",
        citation: "दफा ६७ (नेपालमा आयको स्रोत)",
        authority: "आन्तरिक राजस्व विभाग",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
    ],
    followUps: [
      "नेपालमा मूल्य अभिवृद्धि कर (भ्याट) को दर कति छ र के छुट छ?",
      "आयकर ऐनको दफा ८८ बमोजिम स्रोतमा कर कट्टी (TDS) का दरहरू के-के हुन्?",
      "नेपालमा साधारण कम्पनी तथा बैंकहरूका लागि संस्थागत करका दर कति हुन्?",
    ],
  },
  {
    id: "penalties-interest-117-120",
    question:
      "आय विवरण वा कर दाखिला ढिलाइ गर्दा आयकर ऐनको दफा ११७ देखि १२० बमोजिम लाग्ने जरिवाना र ब्याजका नियमहरू के-के हुन्?",
    shortTopic: "दफा ११७-१२०: जरिवाना, ब्याज र शुल्क",
    category: "Acts",
    keywords: [
      "penalties",
      "interest",
      "दफा ११७",
      "दफा ११८",
      "दफा ११९",
      "दफा १२०",
      "जरिवाना",
      "ब्याज",
      "ढिलाइ",
      "१५%",
      "हर्जाना",
    ],
    responseType: "multi-task",
    taskList: {
      title: "कानुनी जरिवाना परीक्षण तथा जोखिम न्यूनीकरण योजना",
      tasks: [
        {
          id: "pen-1",
          phase: "चरण १: ढिलाइको वर्गीकरण",
          label: "दफा ११७ बमोजिम विवरण नबुझाएको प्रकृति पहिचान",
          detail:
            "अनुमानित कर विवरण (दफा ११७(१)(क)), वार्षिक आय विवरण (दफा ११७(१)(ग)) वा टीडीएस विवरणमध्ये कुनमा ढिलाइ भएको हो सो यकिन गरियो।",
          status: "completed",
        },
        {
          id: "pen-2",
          phase: "चरण २: जरिवाना तथा शुल्क गणना",
          label: "तोकिएको शुल्क वा ०.१% जरिवाना हिसाब गर्ने",
          detail:
            "वार्षिक आय विवरण बुझाउन ढिलाइ भएमा प्रतिमहिना रु. १०० वा करयोग्य कुल आयको वार्षिक ०.१% मध्ये जुन बढी हुन्छ सो गणना गरियो।",
          status: "completed",
        },
        {
          id: "pen-3",
          phase: "चरण ३: १५% ब्याज हिसाब",
          label: "दफा ११८ र ११९ बमोजिम दैनिक १५% ब्याज गणना",
          detail:
            "बुझाउन बाँकी कर वा टीडीएस रकममा तोकिएको मितिदेखि दाखिला भएको मितिसम्म दैनिक आधारमा वार्षिक १५% का दरले ब्याज गणना।",
          status: "in-progress",
        },
        {
          id: "pen-4",
          phase: "चरण ४: राजस्व दाखिला र फर्छ्यौट",
          label: "आन्तरिक राजस्व विभागको भौचर सिर्जना गरी फरफारक गर्ने",
          detail:
            "थप ब्याज वृद्धि रोक्न करको साँवा रकम, ब्याज र जरिवाना एकमुष्ट दाखिला गरी अनलाइन प्रणालीबाट करचुक्ता प्रमाणपत्र लिने।",
          status: "verified",
        },
      ],
    },
    rateTable: {
      title: "आयकर ऐन बमोजिमका जरिवाना तथा ब्याज संरचना",
      subtitle: "आयकर ऐन, २०५८ को दफा ११७ देखि १२० का प्रावधानहरू",
      columns: [
        "ऐनको दफा",
        "उल्लङ्घन वा त्रुटीको प्रकृति",
        "कानुनी जरिवाना वा ब्याज दर",
        "हिसाब गर्ने आधार",
      ],
      rows: [
        [
          "दफा ११७(१)(क)",
          "अनुमानित करको विवरण दाखिला नगरेमा",
          "प्रतिकसूर रु. २,००० एकमुष्ट जरिवाना",
          "प्रति विवरण अनुसार",
        ],
        [
          "दफा ११७(१)(ग)",
          "वार्षिक आय विवरण दाखिला नगरेमा",
          "वार्षिक ०.१% वा प्रतिमहिना रु. १०० (जुन बढी हुन्छ)",
          "ढिलाइ भएको महिना अनुसार",
        ],
        [
          "दफा ११८",
          "अनुमानित करको त्रैमासिक किस्ता कम बुझाएमा",
          "बाँकी किस्ता रकममा वार्षिक १५% ब्याज",
          "दैनिक अनुपातका आधारमा",
        ],
        [
          "दफा ११९",
          "निर्धारित कर वा टीडीएस दाखिलामा ढिलाइ गरेमा",
          "बक्यौता रकममा वार्षिक १५% ब्याज",
          "दैनिक अनुपातका आधारमा",
        ],
        [
          "दफा १२०",
          "विभाग समक्ष झुट्टा वा भ्रामक विवरण पेस गरेमा",
          "५०% (लापरवाही भएमा) वा १००% (जानीजानी छली गरेमा)",
          "कम दाखिला भएको कर रकममा",
        ],
      ],
      footnote:
        "कर परीक्षण सूचना जारी हुनुपूर्व स्वेच्छिक संशोधन गरेमा दफा १२० बमोजिमको जरिवानाबाट बच्न सकिन्छ।",
    },
    answer:
      "**आयकर ऐन, २०५८ को परिच्छेद २२ (दफा ११७ देखि १२०)** बमोजिम कर कानुनको पालनामा ढिलाइ वा त्रुटी भएमा देहाय अनुसार जरिवाना र ब्याज लाग्छ:\n\n• **दफा ११७ (विवरण पेस नगरेमा)**: म्यादभित्र आय विवरण नबुझाएमा प्रतिमहिना **रु. १००** वा कुल करयोग्य आयको **वार्षिक ०.१%** मध्ये जुन बढी हुन्छ, सोही रकम जरिवाना लाग्छ।\n• **दफा ११८ (किस्ताबन्दी करको कमी)**: पुस, चैत र असारमा बुझाउनुपर्ने अनुमानित करको ९०% दाखिला नभएमा नपुग रकममा **वार्षिक १५%** का दरले ब्याज लाग्छ।\n• **दफा ११९ (कर दाखिलामा ढिलाइ)**: निर्धारण भएको कर वा स्रोतमा कट्टी गरिएको टीडीएस म्यादभित्र दाखिला नगरेमा दाखिला नभएसम्म **वार्षिक १५%** का दरले दैनिक ब्याज लाग्छ।\n• **दफा १२० (झुट्टा वा भ्रामक विवरण)**: कर कम तिर्ने नियतले गलत विवरण पेस गरेमा: लापरवाहीले भएमा कम भएको करको **५०%** र जानीजानी ठगी गरेको प्रमाणित भएमा कम भएको करको **१००% जरिवाना** लाग्छ।",
    resources: [
      {
        title: "आयकर ऐन, २०५८",
        citation: "दफा ११७, ११८, ११९ र १२०",
        authority: "आन्तरिक राजस्व विभाग",
        libraryId: "income-tax-act-2058",
        externalUrl: "/api/sources/income-tax-act-2058",
      },
      {
        title: "आयकर नियमावली, २०५९",
        citation: "नियम ३८ (ब्याज गणना कार्यविधि)",
        authority: "अर्थ मन्त्रालय",
        externalUrl: "https://mof.gov.np",
      },
    ],
    followUps: [
      "आयकर ऐनको दफा ८८ बमोजिम स्रोतमा कर कट्टी (TDS) का दरहरू के-के हुन्?",
      "आ.व. २०८१/८२ मा प्राकृतिक व्यक्तिका लागि आयकर स्ल्याब र दरहरू के-के हुन्?",
      "आयकर ऐनको दफा ५७ बमोजिम स्वामित्व परिवर्तन हुँदा करमा के प्रभाव पर्छ?",
    ],
  },
];

export const MOCK_TAX_KNOWLEDGE_BASE = MOCK_TAX_KNOWLEDGE_BASE_EN;

export function getMockKnowledgeBase(
  lang: ResponseLanguage = "en",
): MockQAPair[] {
  return lang === "np"
    ? MOCK_TAX_KNOWLEDGE_BASE_NP
    : MOCK_TAX_KNOWLEDGE_BASE_EN;
}

const NEPAL_TAX_DOMAIN_RE =
  /\b(tax|tds|vat|ird|pan|income|excise|customs|audit|company|companies|section|act|finance\s*bill|rajpatra|withholding|assessment|return|filing|penalty|rebate|exemption|depreciation|capital\s*gain|dividend|royalty|service\s*fee|kar|aayakar|bhansar|antashulka)\b|[\u0900-\u097F]*(कर|आयकर|भ्याट|दफा|ऐन|अन्तःशुल्क|भन्सार|राजस्व|आर्थिक|लाभांश|पुँजीगत|अडिट|करदाता|प्यान|टीडीएस)/i;

function buildOutOfContextResponse(
  query: string,
  isNepali: boolean,
): MockQAPair {
  const isNepalTaxDomain = NEPAL_TAX_DOMAIN_RE.test(query);

  if (isNepali) {
    if (isNepalTaxDomain) {
      return {
        id: "unindexed-nepal-tax-query",
        category: "Statutory Index",
        shortTopic: "अप्रमाणित कर प्रश्न",
        question: query,
        keywords: [],
        responseType: "analytical-thinking",
        answer:
          "यो विशिष्ट नेपाल कर प्रश्नका लागि हाल प्रमाणित दफावार उत्तर वा CA समीक्षा फेला परेन। गलत वा अनुमानित जानकारी दिनुको सट्टा, कृपया:\n\n" +
          "• **Tax Law Library** (`/tax-law-library`) मा गई सम्बन्धित ऐन, नियम वा परिपत्र सिधै हेर्नुहोस्।\n" +
          "• विशिष्ट दफा वा आर्थिक वर्ष (जस्तै: दफा ८८, VAT थ्रेसहोल्ड, वा आर्थिक विधेयक २०८२/८३) उल्लेख गरी प्रश्न पुनः सोध्नुहोस्।\n" +
          "• अभ्यासमा रहेका नेपाली CA हरूबाट प्रमाणित उत्तर थप्न **CA Knowledge Hub** (`/contribute`) प्रयोग गर्नुहोस्।",
        resources: [],
        followUps: [
          "नेपालमा बासिन्दा सेवा शुल्कमा दफा ८८ अनुसार TDS दर कति हो?",
          "मूल्य अभिवृद्धि कर (VAT) दर्ताको अनिवार्य सीमा कति छ?",
          "आयकर ऐन २०५८ अनुसार ह्रासकट्टी (Depreciation) दरहरू के-के छन्?",
        ],
        thoughtProcess: {
          duration: "0.1 seconds",
          summary:
            "स्थानीय कर ज्ञान आधारमा प्रमाणित मेल फेला परेन; अनुमानित उत्तर रोकियो।",
          steps: [
            "नेपाल कर कानून विषयवस्तु पहिचान गरियो।",
            "स्थानीय तथा प्रमाणित CA भण्डारमा दफावार मेल जाँच गरियो।",
            "अनुमानित वा अप्रमाणित उत्तर नदिने नीतिअनुसार स्पष्ट सूचना तयार पारियो।",
          ],
        },
      };
    }

    return {
      id: "out-of-scope-query",
      category: "Scope Boundary",
      shortTopic: "नेपाल कर दायरा बाहिरको प्रश्न",
      question: query,
      keywords: [],
      responseType: "analytical-thinking",
      answer:
        "माफ गर्नुहोला—**CA Ora** नेपालको कर कानून (आयकर ऐन २०५८, भ्याट ऐन २०५२, अन्तःशुल्क, भन्सार, कम्पनी ऐन २०६३) र आन्तरिक राजस्व विभाग (IRD) का निर्देशिकामा मात्र सीमित छ।\n\n" +
        "तपाईंको प्रश्न नेपालको कर तथा नियामक दायराभन्दा बाहिरको देखिएकाले अनुमानित उत्तर दिइएको छैन। कृपया नेपालको कर, TDS, VAT, वा आर्थिक ऐनसम्बन्धी प्रश्न सोध्नुहोस्।",
      resources: [],
      followUps: [
        "नेपालमा बासिन्दा सेवा शुल्कमा दफा ८८ अनुसार TDS दर कति हो?",
        "मूल्य अभिवृद्धि कर (VAT) दर्ताको अनिवार्य सीमा कति छ?",
        "कम्पनी ऐन २०६३ अनुसार वार्षिक विवरण बुझाउने म्याद कहिले हो?",
      ],
      thoughtProcess: {
        duration: "0.1 seconds",
        summary: "प्रश्न नेपाल कर दायराबाहिर भएकाले अनुमानित उत्तर रोकियो।",
        steps: [
          "प्रश्नको विषयवस्तु नेपाल कर कानून दायरासँग तुलना गरियो।",
          "नेपाल कर तथा IRD नियामक सन्दर्भ फेला परेन।",
          "दायरा स्पष्ट पार्दै वैकल्पिक कर प्रश्नहरू प्रस्तुत गरियो।",
        ],
      },
    };
  }

  if (isNepalTaxDomain) {
    return {
      id: "unindexed-nepal-tax-query",
      category: "Statutory Index",
      shortTopic: "No Verified Match Yet",
      question: query,
      keywords: [],
      responseType: "analytical-thinking",
      answer:
        "No verified statutory ruling or CA Knowledge Hub entry matched this specific query yet. Rather than guessing or fabricating citations, CA Ora withholds unverified answers.\n\n" +
        "• Browse primary Acts, Rules, and IRD circulars directly in the **Tax Law Library** (`/tax-law-library`).\n" +
        "• Try narrowing your question with a specific Act, section number, or fiscal year (e.g., *Section 88 TDS*, *VAT registration threshold*, *Finance Bill 2082/83*).\n" +
        "• Practitioners can contribute a verified ruling for this topic in the **CA Knowledge Hub** (`/contribute`).",
      resources: [],
      followUps: [
        "What are the Section 88 TDS withholding rates for resident service fees in Nepal?",
        "What is the mandatory VAT registration threshold under the VAT Act 2052?",
        "What are the depreciation pools and rates under Income Tax Act 2058?",
      ],
      thoughtProcess: {
        duration: "0.1 seconds",
        summary:
          "No verified statutory match found in the local index; withheld unverified output.",
        steps: [
          "Detected Nepal tax domain intent in user query.",
          "Checked verified local statutes and CA repository.",
          "Withheld ungrounded answer and surfaced Tax Law Library guidance.",
        ],
      },
    };
  }

  return {
    id: "out-of-scope-query",
    category: "Scope Boundary",
    shortTopic: "Out of Statutory Scope",
    question: query,
    keywords: [],
    responseType: "analytical-thinking",
    answer:
      "**CA Ora** is strictly scoped to **Nepal’s tax laws, Inland Revenue Department (IRD) directives, and statutory compliance** (Income Tax Act 2058, VAT Act 2052, Excise, Customs, and Companies Act 2063).\n\n" +
      "Your question appears to be outside Nepal tax and regulatory research, so I cannot provide an unverified or off-domain answer. Try asking one of the Nepal tax scenarios below or browse the **Tax Law Library**.",
    resources: [],
    followUps: [
      "What are the Section 88 TDS withholding rates for resident service fees in Nepal?",
      "What is the mandatory VAT registration threshold under the VAT Act 2052?",
      "What are the annual filing deadlines under Companies Act 2063?",
    ],
    thoughtProcess: {
      duration: "0.1 seconds",
      summary:
        "Query falls outside Nepal statutory tax scope; withheld off-domain generation.",
      steps: [
        "Evaluated query intent against Nepal statutory tax domains.",
        "Confirmed query is outside Nepal tax and IRD regulatory scope.",
        "Returned explicit scope boundary with verified starter scenarios.",
      ],
    },
  };
}

export function findMockTaxAnswer(
  query: string,
  lang: ResponseLanguage = "en",
): MockQAPair {
  const clean = query.trim().toLowerCase();
  const isQueryDevanagari = /[\u0900-\u097F]/.test(query);
  const useNepali = lang === "np" || isQueryDevanagari;
  const targetKb = useNepali
    ? MOCK_TAX_KNOWLEDGE_BASE_NP
    : MOCK_TAX_KNOWLEDGE_BASE_EN;
  const altKb =
    targetKb === MOCK_TAX_KNOWLEDGE_BASE_NP
      ? MOCK_TAX_KNOWLEDGE_BASE_EN
      : MOCK_TAX_KNOWLEDGE_BASE_NP;

  if (!clean) {
    return buildOutOfContextResponse(query, useNepali);
  }

  // 1. Direct exact or substring question match in targetKb
  for (const item of targetKb) {
    if (
      clean.includes(item.question.toLowerCase()) ||
      item.question.toLowerCase().includes(clean)
    ) {
      return item;
    }
  }

  // 1b. Check if the query matched an item's question in the alternative KB
  for (const item of altKb) {
    if (
      clean.includes(item.question.toLowerCase()) ||
      item.question.toLowerCase().includes(clean)
    ) {
      const targetMatch = targetKb.find((t) => t.id === item.id);
      if (targetMatch) return targetMatch;
    }
  }

  // 2. Score keyword matches in targetKb
  let bestItem: MockQAPair | null = null;
  let maxScore = 0;

  for (const item of targetKb) {
    let score = 0;
    for (const kw of item.keywords) {
      if (clean.includes(kw.toLowerCase())) {
        score += kw.length > 3 ? 3 : 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestItem = item;
    }
  }

  if (bestItem && maxScore > 0) {
    return bestItem;
  }

  // 2b. Score against altKb and map by ID
  let altBestItem: MockQAPair | null = null;
  let altMaxScore = 0;
  for (const item of altKb) {
    let score = 0;
    for (const kw of item.keywords) {
      if (clean.includes(kw.toLowerCase())) {
        score += kw.length > 3 ? 3 : 1;
      }
    }
    if (score > altMaxScore) {
      altMaxScore = score;
      altBestItem = item;
    }
  }

  if (altBestItem && altMaxScore > 0) {
    const targetMatch = targetKb.find((t) => t.id === altBestItem.id);
    if (targetMatch) return targetMatch;
  }

  // 3. No verified match: return an honest out-of-context / unindexed response
  return buildOutOfContextResponse(query, useNepali);
}
