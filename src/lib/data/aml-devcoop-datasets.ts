import type { MockQAPair } from "../mock-tax-chat";
import { EDITORIAL_BOARD_CONTRIBUTOR } from "./finance-bill-2083-helpers";

const AML_RULES_SOURCE_FILE = "docs/Files/Nepal_AML_Rules_2009_English.pdf";
const AML_RULES_SOURCE_URL = "/api/sources/aml-rules-2009";
const AML_RULES_LIBRARY_ID = "aml-rules-2009";

const DEVCOOP_SOURCE_FILE = "docs/Files/Nepal_DevelcoopNepal.pdf";
const DEVCOOP_SOURCE_URL = "/api/sources/development-cooperation-policy-2014";
const DEVCOOP_LIBRARY_ID = "development-cooperation-policy-2014";

interface SupplementarySeedInput {
  id: string;
  question: string;
  shortTopic: string;
  category: "Rules" | "Advisory";
  fiscalYear: string;
  keywords: string[];
  answer: string;
  title: string;
  citation: string;
  authority: string;
  sourceFile: string;
  sourceUrl: string;
  libraryId: string;
  reasoningSteps: string[];
  rateTable: NonNullable<MockQAPair["rateTable"]>;
  followUps: string[];
}

function buildSupplementaryEntry(input: SupplementarySeedInput): MockQAPair {
  return {
    id: input.id,
    question: input.question,
    shortTopic: input.shortTopic,
    category: input.category,
    fiscalYear: input.fiscalYear,
    keywords: input.keywords,
    answer: input.answer,
    responseType: "tabular-schedule",
    thoughtProcess: {
      duration: "1.2s",
      summary: `Regulatory analysis verified against ${input.sourceFile} (${input.citation}).`,
      steps: input.reasoningSteps,
    },
    rateTable: input.rateTable,
    resources: [
      {
        title: input.title,
        citation: `${input.citation} · Source: ${input.sourceFile}`,
        authority: input.authority,
        libraryId: input.libraryId,
        externalUrl: input.sourceUrl,
      },
    ],
    followUps: input.followUps,
    contributor: EDITORIAL_BOARD_CONTRIBUTOR,
  };
}

export const AML_AND_DEVCOOP_EN: MockQAPair[] = [
  // Asset (Money) Laundering Prevention Rules, 2009 (6 entries)
  buildSupplementaryEntry({
    id: "aml2009-rules-3-5-threshold-committees",
    question:
      "Who prescribes cash/transaction reporting thresholds under Rule 3 of the Asset (Money) Laundering Prevention Rules, 2009, and what is the institutional composition of the Technical Committee under Rule 5?",
    shortTopic: "AML Threshold Transactions & Technical Committee",
    category: "Rules",
    fiscalYear: "2009",
    keywords: [
      "AML Rules 2009",
      "Rule 3",
      "Rule 5",
      "Threshold Transaction",
      "Financial Information Unit",
      "Nepal Rastra Bank",
    ],
    answer:
      "Under Rule 3(1)–(3) of the Asset (Money) Laundering Prevention Rules, 2009, Nepal Rastra Bank prescribes transaction thresholds for Section 6(1) of the Act—in consultation with the relevant regulatory body—tailored to the area, subject matter, and nature of transactions, and must publish a public notice thereof. Under Rule 5(1), the Technical Committee assisting the Financial Information Unit (FIU) is coordinated by the FIU Chief and includes representatives from the Department of Money Laundering Investigation, NRB (Foreign Exchange and Regulation Departments), Nepal Police, SEBON, and the Insurance Board, with the FIU Deputy Director as Member Secretary.",
    title: "Asset (Money) Laundering Prevention Rules, 2009",
    citation: "Rule 3, Rule 4, Rule 5",
    authority: "Government of Nepal / Financial Information Unit (NRB)",
    sourceFile: AML_RULES_SOURCE_FILE,
    sourceUrl: AML_RULES_SOURCE_URL,
    libraryId: AML_RULES_LIBRARY_ID,
    reasoningSteps: [
      "Review Rule 3: NRB sets sector/area-specific transaction thresholds after consulting regulatory bodies and issues public notice.",
      "Review Rule 4: the Coordination Committee recommends national prevention policies and international memberships to the Government.",
      "Verify Technical Committee membership under Rule 5(1): FIU Chief (Coordinator), Investigation Department, 2 NRB departments, Nepal Police, SEBON, Insurance Board, and FIU Deputy Director.",
    ],
    rateTable: {
      title: "AML Governance Bodies (Rules 3–5)",
      columns: ["Body / Authority", "Core Statutory Mandate", "Rule"],
      rows: [
        [
          "Nepal Rastra Bank",
          "Prescribes & notifies transaction thresholds",
          "Rule 3",
        ],
        [
          "Coordination Committee",
          "Policy recommendations to Government/OPMCM",
          "Rule 4",
        ],
        [
          "Technical Committee",
          "Multi-agency technical assistance to FIU",
          "Rule 5",
        ],
      ],
    },
    followUps: [
      "For how many days can the FIU direct an emergency property freeze under Rule 6?",
      "What compliance officer obligations apply to reporting institutions under Rules 10–11?",
      "How does Rule 37 regulate administrative fines and the 7-day defense window?",
    ],
  }),
  buildSupplementaryEntry({
    id: "aml2009-rule-6-7-fiu-powers-freeze-directives",
    question:
      "What emergency property freeze authority, directive-issuing powers, and annual reporting deadlines govern the Financial Information Unit (FIU) under Rules 6 and 7 of the AML Rules, 2009?",
    shortTopic: "FIU 30-Day Freeze Power & Binding Directives",
    category: "Rules",
    fiscalYear: "2009",
    keywords: [
      "AML Rules 2009",
      "Rule 6",
      "Rule 7",
      "FIU",
      "30-Day Freeze",
      "Suspicious Transaction",
    ],
    answer:
      "Under Rule 6(b) of the AML Rules, 2009, if analysis of a suspicious transaction report indicates reasonable grounds that property may be immediately transferred, sold, or transformed, the FIU may write to the concerned organization to freeze the property for a maximum of 30 days. Under Rule 6(k), the FIU must submit its annual performance report to the Coordination Committee and NRB within 3 months after fiscal year-end. Under Rule 7(1)–(2), the FIU issues binding directives on Customer Identification (KYC), suspicious transaction identification/reporting, and record security that all institutional employees and officials must follow.",
    title: "Asset (Money) Laundering Prevention Rules, 2009",
    citation: "Rule 6(a)–(k), Rule 7(1)–(2)",
    authority: "Financial Information Unit (FIU) / Nepal Rastra Bank",
    sourceFile: AML_RULES_SOURCE_FILE,
    sourceUrl: AML_RULES_SOURCE_URL,
    libraryId: AML_RULES_LIBRARY_ID,
    reasoningSteps: [
      "Inspect Rule 6(b): FIU can order an interim freeze of up to 30 days to prevent dissipation of suspicious assets.",
      "Inspect Rule 6(f) & (k): FIU executes foreign MOUs and submits annual performance reports within 3 months of fiscal year-end.",
      "Inspect Rule 7(1)–(2): FIU issues binding KYC, STR, and record-keeping directives mandatory for all reporting-institution staff.",
    ],
    rateTable: {
      title: "FIU Powers & Deadlines (Rules 6–7)",
      columns: ["FIU Function", "Statutory Limit / Scope", "Rule"],
      rows: [
        [
          "Interim Property Freeze",
          "Maximum 30 days via written order",
          "Rule 6(b)",
        ],
        [
          "Annual Performance Report",
          "Within 3 months of FY completion",
          "Rule 6(k)",
        ],
        [
          "Binding Directives",
          "KYC, STR modes, record security, internal audit",
          "Rule 7(1)–(2)",
        ],
      ],
    },
    followUps: [
      "What duties must a Compliance Officer perform under Rules 10 and 11?",
      "Within how many days must frozen assets be returned if no prosecution occurs under Rule 31?",
      "Are FIU records protected from public disclosure under Rule 39?",
    ],
  }),
  buildSupplementaryEntry({
    id: "aml2009-rules-10-11-reporting-compliance-officer",
    question:
      "What institutional record-keeping duties and managerial Compliance Officer obligations are imposed on banks and reporting institutions under Rules 10 and 11 of the AML Rules, 2009?",
    shortTopic: "Reporting Institution & Compliance Officer Duties",
    category: "Rules",
    fiscalYear: "2009",
    keywords: [
      "AML Rules 2009",
      "Rule 10",
      "Rule 11",
      "Compliance Officer",
      "Reporting Institution",
      "Confidential Record",
    ],
    answer:
      "Under Rule 10 of the AML Rules, 2009, every reporting institution must maintain transaction records as prescribed by the FIU, update customer profiles within the statutory rollout period, maintain a separate confidential record of suspicious transactions signed by both the concerned officer and the office chief (Rule 10(c)), and designate a high-ranking managerial-level official as Compliance Officer while notifying the FIU of their name, address, and contact details (Rule 10(d)). Under Rule 11, the Compliance Officer acts as the FIU focal point, secures transaction records, transmits STRs electronically or by letter, and regularly reports branch-office transactions.",
    title: "Asset (Money) Laundering Prevention Rules, 2009",
    citation: "Rule 10, Rule 11, Rule 12",
    authority: "Government of Nepal / Regulatory Bodies",
    sourceFile: AML_RULES_SOURCE_FILE,
    sourceUrl: AML_RULES_SOURCE_URL,
    libraryId: AML_RULES_LIBRARY_ID,
    reasoningSteps: [
      "Review Rule 10(a)–(c): transaction records, customer profile updates, and dual-signed confidential STR logs.",
      "Verify Compliance Officer seniority under Rule 10(d): must be a high-ranking managerial-level official (or office chief/designate in government offices).",
      "Review Rule 11(a)–(d): focal-point coordination, electronic STR transmission, and regular branch reporting.",
    ],
    rateTable: {
      title: "Reporting Institution & Compliance Officer Mandate",
      columns: ["Obligation", "Responsible Party", "Rule"],
      rows: [
        [
          "Dual-signed confidential STR ledger",
          "Concerned officer & Office Chief",
          "Rule 10(c)",
        ],
        [
          "Designate managerial Compliance Officer",
          "Reporting institution + notify FIU",
          "Rule 10(d)",
        ],
        [
          "Electronic STR & branch reporting",
          "Compliance Officer",
          "Rule 11(c)–(d)",
        ],
      ],
    },
    followUps: [
      "What fine procedure and defense period apply to reporting institutions under Rule 37?",
      "How long can an investigation officer extend an inquiry under Rule 17?",
      "How do Rules 6 and 7 empower the FIU over reporting institutions?",
    ],
  }),
  buildSupplementaryEntry({
    id: "aml2009-rules-13-17-complaints-investigation-timeline",
    question:
      "Can money-laundering complaints be lodged electronically or anonymously under the AML Rules, 2009, and what maximum investigation extension period is permitted under Rule 17?",
    shortTopic: "AML Electronic Complaints & Investigation Time Limits",
    category: "Rules",
    fiscalYear: "2009",
    keywords: [
      "AML Rules 2009",
      "Rule 13",
      "Rule 14",
      "Rule 17",
      "Anonymous Complaint",
      "120 Days Investigation",
    ],
    answer:
      "Under Rules 13 and 14 of the AML Rules, 2009, any person may lodge a complaint electronically (via fax or email) under Section 13 of the Act and may request anonymity so that their name and address are not disclosed. Under Rule 17(2)–(4), the Department sets an initial inquiry period when appointing an Investigation Officer; if additional time is needed, the Department may grant extensions of up to 35 days at a time, subject to an absolute maximum extension cap of 120 days.",
    title: "Asset (Money) Laundering Prevention Rules, 2009",
    citation: "Rule 13, Rule 14, Rule 17(1)–(4)",
    authority: "Department of Money Laundering Investigation",
    sourceFile: AML_RULES_SOURCE_FILE,
    sourceUrl: AML_RULES_SOURCE_URL,
    libraryId: AML_RULES_LIBRARY_ID,
    reasoningSteps: [
      "Check complaint filing channels under Rule 13: fax, email, and other electronic communication.",
      "Verify whistleblower identity protection under Rule 14: anonymity prevents disclosure of name and address.",
      "Examine investigation timelines under Rule 17(4): extensions are capped at 35 days per grant up to 120 days total.",
    ],
    rateTable: {
      title: "Complaint & Investigation Procedural Limits",
      columns: ["Procedural Element", "Statutory Rule / Ceiling", "Rule"],
      rows: [
        ["Electronic Complaint", "Permitted via fax or email", "Rule 13"],
        [
          "Anonymous Complainant",
          "Identity & address withheld on request",
          "Rule 14",
        ],
        [
          "Investigation Time Extensions",
          "≤ 35 days per extension; max 120 days total",
          "Rule 17(4)",
        ],
      ],
    },
    followUps: [
      "When must frozen property, bank accounts, or passports be unfrozen under Rule 31?",
      "What formal seizure and acknowledgement rules apply during searches under Rule 21?",
      "Who hears fine defenses from reporting institutions under Rule 37?",
    ],
  }),
  buildSupplementaryEntry({
    id: "aml2009-rules-25-31-asset-freeze-unfreezing",
    question:
      "How does the Investigation Department freeze assets and accounts under Rule 25 of the AML Rules, 2009, and within how many days must frozen property be released under Rule 31?",
    shortTopic: "AML Asset Freezing & Mandatory 30-Day Unfreezing",
    category: "Rules",
    fiscalYear: "2009",
    keywords: [
      "AML Rules 2009",
      "Rule 25",
      "Rule 30",
      "Rule 31",
      "Asset Freeze",
      "30 Days Release",
    ],
    answer:
      "Under Rule 25(1)–(2), the Department freezes or takes control of a suspect's property, bank account, or transaction (along with any claims, liens, or rights thereon) by issuing a Schedule-13 order and logging complete freeze/release records under Rule 30. Under Rule 31(1)–(2), frozen assets, accounts, passports, and guarantees must be unfrozen and returned within 30 days of a decision not to prosecute the person, or by the court within 30 days after expiry of the appeal limitation following an acquittal where no appeal is filed.",
    title: "Asset (Money) Laundering Prevention Rules, 2009",
    citation: "Rule 25, Rule 30, Rule 31(1)–(2)",
    authority: "Department of Money Laundering Investigation",
    sourceFile: AML_RULES_SOURCE_FILE,
    sourceUrl: AML_RULES_SOURCE_URL,
    libraryId: AML_RULES_LIBRARY_ID,
    reasoningSteps: [
      "Identify freezing order mechanism under Rule 25: Schedule-13 order freezing property, accounts, transactions, and underlying liens/claims.",
      "Check Rule 30 ledger obligations: log complaint number, suspect identity, freeze order date, and implementing office.",
      "Apply mandatory release timelines under Rule 31: 30 days from non-prosecution decision (Rule 31(1)) or 30 days after appeal limitation expiry on unappealed acquittal (Rule 31(2)).",
    ],
    rateTable: {
      title: "AML Freeze & Release Timelines (Rules 25–31)",
      columns: ["Action", "Timeline / Form", "Rule"],
      rows: [
        [
          "Issue Property/Account Freeze",
          "Written order in Schedule-13 format",
          "Rule 25(1)",
        ],
        [
          "Release on Decision Not to Sue",
          "Within 30 days of non-prosecution decision",
          "Rule 31(1)",
        ],
        [
          "Release After Acquittal (No Appeal)",
          "Within 30 days of appeal window expiry",
          "Rule 31(2)",
        ],
      ],
    },
    followUps: [
      "How does the FIU's 30-day emergency freeze under Rule 6 differ from Rule 25?",
      "Can the Department seek foreign financial records via the FIU under Rule 29?",
      "What confidentiality protections apply to FIU information under Rule 39?",
    ],
  }),
  buildSupplementaryEntry({
    id: "aml2009-rules-37-39-fines-defense-confidentiality",
    question:
      "What natural-justice defense period must be granted before levying AML fines under Rule 37, and who may access confidential FIU and Department records under Rule 39?",
    shortTopic: "AML Fine Defense Procedure & Information Confidentiality",
    category: "Rules",
    fiscalYear: "2009",
    keywords: [
      "AML Rules 2009",
      "Rule 37",
      "Rule 39",
      "7-Day Defense Notice",
      "FIU Confidentiality",
      "Right to Information Act",
    ],
    answer:
      "Under Rule 37(1)–(3) of the AML Rules, 2009, before the FIU fines a bank, financial institution, or non-financial institution under Section 31 of the Act—or the Department fines a person under Sections 12(2) or 18(3)—the authority must issue written notice stating the grounds and proposed penalty and grant 7 days to submit a defense. Only if no defense is filed or the explanation is unsatisfactory may the fine be imposed. Under Rule 39(1)–(3), FIU information remains confidential under Section 3 of the Right to Information Act, 2008 and may only be shared with the Department, Investigation Officer, or the court.",
    title: "Asset (Money) Laundering Prevention Rules, 2009",
    citation: "Rule 37(1)–(3), Rule 38, Rule 39(1)–(3)",
    authority: "FIU / Department of Money Laundering Investigation",
    sourceFile: AML_RULES_SOURCE_FILE,
    sourceUrl: AML_RULES_SOURCE_URL,
    libraryId: AML_RULES_LIBRARY_ID,
    reasoningSteps: [
      "Verify administrative fine procedure under Rule 37(1)–(2): prior written notice specifying activities, grounds, and proposed fine amount + 7 days to defend.",
      "Note fine imposition standard under Rule 37(3): failure to respond within 7 days or unsatisfactory defense.",
      "Review Rule 39 confidentiality shield: FIU records are exempt under Right to Information Act Section 3 and restricted solely to the Department, Investigation Officer, or court.",
    ],
    rateTable: {
      title: "AML Fine Procedure & Record Access (Rules 37–39)",
      columns: ["Protection / Procedure", "Statutory Rule", "Rule"],
      rows: [
        [
          "Show-Cause Notice for Fines",
          "Written grounds + 7-day defense window",
          "Rule 37(1)–(2)",
        ],
        [
          "FIU Record Disclosure",
          "Restricted to Department, IO & Court only",
          "Rule 39(1)–(2)",
        ],
        [
          "Good-Faith Immunity",
          "Officials shielded for good-faith acts",
          "Rule 38",
        ],
      ],
    },
    followUps: [
      "What duties must a Compliance Officer fulfill under Rules 10 and 11?",
      "How long can investigations be extended under Rule 17?",
      "What transaction thresholds are set under Rule 3?",
    ],
  }),

  // Development Cooperation Policy, 2014 (6 entries)
  buildSupplementaryEntry({
    id: "devcoop2014-part4-tax-exemption-vat-refund",
    question:
      "Under Part IV of Nepal's Development Cooperation Policy, 2014, can foreign development aid funds be used to pay Nepalese taxes, and how are VAT and income tax treated for donor-funded projects?",
    shortTopic: "Development Aid Tax Exemptions, VAT Refunds & Income Tax",
    category: "Advisory",
    fiscalYear: "2014",
    keywords: [
      "Development Cooperation Policy 2014",
      "Part IV",
      "Tax Exemption",
      "VAT Refund",
      "Income Tax on Aid",
      "Donor Projects",
    ],
    answer:
      "Under Part IV Clauses 1–4 of the Development Cooperation Policy, 2014: (1) funds received from development cooperation cannot be used for paying taxes; (2) where a project agreement provides tax exemption, the required tax amount is managed by the Government of Nepal through internal resources; (3) if internal resources cannot cover agreed exemptions, exemptions follow prevailing laws, and Value Added Tax (VAT) paid on local purchases is relieved strictly via the VAT refund mechanism under the prevailing Value Added Tax Act; and (4) tax levied on income and profit is not treated as part of development cooperation, so prevailing Nepalese income tax laws apply normally.",
    title: "Development Cooperation Policy, 2014",
    citation: "Part IV, Clauses 1–4",
    authority: "Ministry of Finance, Government of Nepal",
    sourceFile: DEVCOOP_SOURCE_FILE,
    sourceUrl: DEVCOOP_SOURCE_URL,
    libraryId: DEVCOOP_LIBRARY_ID,
    reasoningSteps: [
      "Apply Part IV Clause 1: donor/aid funds cannot be spent directly on tax payments.",
      "Apply Clauses 2–3: agreed exemptions are funded from GoN internal sources or prevailing tax laws, with local-purchase VAT relieved only via VAT refund procedures.",
      "Apply Clause 4: income and profit taxes fall outside development cooperation exemptions and remain governed by prevailing Nepalese tax statutes.",
    ],
    rateTable: {
      title: "Tax Treatment of Development Cooperation Projects (Part IV)",
      columns: ["Tax / Fund Type", "Policy Rule", "Clause"],
      rows: [
        ["Aid Funds for Tax Payment", "Prohibited", "Part IV, Clause 1"],
        [
          "Agreed Project Tax Exemptions",
          "Managed via GoN internal sources / prevailing law",
          "Part IV, Clauses 2–3",
        ],
        [
          "VAT on Local Project Purchases",
          "Relieved via VAT Act refund procedure",
          "Part IV, Clause 3",
        ],
        [
          "Income & Profit Taxes",
          "Prevailing income tax laws apply normally",
          "Part IV, Clause 4",
        ],
      ],
    },
    followUps: [
      "What visa facilities apply to foreign project workers and volunteers under Part IV?",
      "What minimum dollar thresholds apply to Grants and Concessional Loans?",
      "How does Value Added Tax Act Section 25 handle VAT refunds?",
    ],
  }),
  buildSupplementaryEntry({
    id: "devcoop2014-part4-gratis-visa-workers-volunteers",
    question:
      "What immigration and visa privileges apply to expatriate personnel, dependents, and foreign volunteers working on development cooperation projects under Part IV of the Development Cooperation Policy, 2014?",
    shortTopic: "Gratis Non-Tourist Visas for Aid Personnel & Volunteers",
    category: "Advisory",
    fiscalYear: "2014",
    keywords: [
      "Development Cooperation Policy 2014",
      "Part IV",
      "Gratis Visa",
      "Non-Tourist Visa",
      "Foreign Volunteers",
    ],
    answer:
      "Under Part IV Clauses 5 and 6 of the Development Cooperation Policy, 2014, foreign workers, employees, and their dependents working in development cooperation projects—as well as foreign volunteers serving in Nepal under separate agreements—are granted gratis (fee-exempt) non-tourist visas.",
    title: "Development Cooperation Policy, 2014",
    citation: "Part IV, Clauses 5–6",
    authority: "Ministry of Finance, Government of Nepal",
    sourceFile: DEVCOOP_SOURCE_FILE,
    sourceUrl: DEVCOOP_SOURCE_URL,
    libraryId: DEVCOOP_LIBRARY_ID,
    reasoningSteps: [
      "Check Part IV Clause 5: covers foreign workers, employees, and their dependents assigned to qualifying development cooperation projects.",
      "Check Part IV Clause 6: covers foreign volunteers working in Nepal under a separate agreement.",
      "Verify visa category: gratis (fee-free) non-tourist visa.",
    ],
    rateTable: {
      title: "Gratis Visa Eligibility Under Development Policy",
      columns: ["Eligible Category", "Visa Privilege", "Clause"],
      rows: [
        [
          "Foreign project workers & employees",
          "Gratis non-tourist visa",
          "Part IV, Clause 5",
        ],
        [
          "Dependents of project personnel",
          "Gratis non-tourist visa",
          "Part IV, Clause 5",
        ],
        [
          "Foreign volunteers under separate agreement",
          "Gratis non-tourist visa",
          "Part IV, Clause 6",
        ],
      ],
    },
    followUps: [
      "Are expatriate project workers still subject to Nepalese income tax laws under Part IV Clause 4?",
      "What minimum US$ threshold applies to foreign grant assistance under Section 2.3?",
      "How does the 183-day residency test apply to foreign consultants in Nepal?",
    ],
  }),
  buildSupplementaryEntry({
    id: "devcoop2014-sec-2-3-grant-minimum-threshold",
    question:
      "What minimum dollar threshold and priority sectors govern foreign grant assistance under Section 2.3 of Nepal's Development Cooperation Policy, 2014, and which grants are exempt from that floor?",
    shortTopic: "Foreign Grant US$ 5M Floor & Sector Priorities",
    category: "Advisory",
    fiscalYear: "2014",
    keywords: [
      "Development Cooperation Policy 2014",
      "Section 2.3",
      "Grant Assistance",
      "US$ 5 Million",
      "SWAp",
      "Pool Fund",
    ],
    answer:
      "Under Section 2.3 of the Development Cooperation Policy, 2014, Nepal prioritizes grant assistance for rural infrastructure, health, education, drinking water, sanitation, human development, and agriculture. To avoid aid fragmentation, grant assistance below US$ 5 million is generally not accepted, except for Sector Wide Approach (SWAp) programs, Pool Funds, climate change initiatives, sustainable development grants, small community or rural infrastructure grants, co-financing arrangements, humanitarian assistance, technical assistance, and capacity development.",
    title: "Development Cooperation Policy, 2014",
    citation: "Section 2.3",
    authority: "Ministry of Finance, Government of Nepal",
    sourceFile: DEVCOOP_SOURCE_FILE,
    sourceUrl: DEVCOOP_SOURCE_URL,
    libraryId: DEVCOOP_LIBRARY_ID,
    reasoningSteps: [
      "Identify priority grant sectors under Section 2.3: rural infrastructure, health, education, WASH, human development, and agriculture.",
      "Note the baseline anti-fragmentation floor: grant assistance < US$ 5 million will not be utilized.",
      "List statutory policy carve-outs: SWAp, Pool Funds, climate change, community/rural small grants, co-financing, humanitarian aid, and technical/capacity assistance.",
    ],
    rateTable: {
      title: "Minimum Foreign Aid Size Thresholds (2014 Policy)",
      columns: [
        "Assistance Modality",
        "Minimum Threshold",
        "Key Exceptions / Section",
      ],
      rows: [
        [
          "Grants",
          "US$ 5 million",
          "SWAp, Pool Funds, climate, humanitarian, TA (Sec 2.3)",
        ],
        [
          "Concessional Loans",
          "US$ 10 million / project",
          "High-tech transfer, SWAp, Pool Funds (Sec 2.4.3)",
        ],
        [
          "Other / Non-Concessional Loans",
          "US$ 20 million / project",
          "No carve-out stated (Sec 2.5.2)",
        ],
      ],
    },
    followUps: [
      "What restrictions apply to concessional loans and tied procurement under Section 2.4?",
      "Can the Government guarantee private or NGO foreign loans under Section 2.5?",
      "How are aid disbursements audited under Section 2.2.9?",
    ],
  }),
  buildSupplementaryEntry({
    id: "devcoop2014-sec-2-4-concessional-loan-terms",
    question:
      "What project size thresholds, procurement restrictions, and currency rules govern concessional loans under Section 2.4 of Nepal's Development Cooperation Policy, 2014?",
    shortTopic: "Concessional Loan US$ 10M Threshold & Procurement Bans",
    category: "Advisory",
    fiscalYear: "2014",
    keywords: [
      "Development Cooperation Policy 2014",
      "Section 2.4",
      "Concessional Loan",
      "US$ 10 Million",
      "Suppliers Credit",
      "Tied Aid",
    ],
    answer:
      "Under Section 2.4 of the Development Cooperation Policy, 2014, concessional loans are directed toward high-growth infrastructure (hydropower, roads, bridges, irrigation, airports, railways, dry ports), agriculture, tourism, and export/foreign-currency sectors. Concessional loans under US$ 10 million per stand-alone project are not mobilized unless accompanied by high knowledge and technology or structured under SWAp, Pool Fund, or co-financing (Section 2.4.3). Fixed-supplier tied procurement is discouraged (2.4.6), suppliers' credit is prohibited (2.4.7), and international consultancy, foreign trips, and vehicle purchases are strictly vetted (2.4.5).",
    title: "Development Cooperation Policy, 2014",
    citation: "Section 2.4.1–2.4.7",
    authority: "Ministry of Finance, Government of Nepal",
    sourceFile: DEVCOOP_SOURCE_FILE,
    sourceUrl: DEVCOOP_SOURCE_URL,
    libraryId: DEVCOOP_LIBRARY_ID,
    reasoningSteps: [
      "Review permitted sectors under Section 2.4.2: infrastructure, agriculture, tourism, employment, and FX-generating sectors.",
      "Apply Section 2.4.3 threshold: US$ 10 million per stand-alone project (with tech-transfer, SWAp, Pool Fund, and co-financing carve-outs).",
      "Apply debt/procurement safeguards under Section 2.4.4–2.4.7: prefer local-currency debt service, tightly review foreign trips/consultants/vehicles, discourage tied loans, and ban suppliers' credit.",
    ],
    rateTable: {
      title: "Concessional Loan Policy Safeguards (Section 2.4)",
      columns: ["Policy Control", "Rule", "Clause"],
      rows: [
        [
          "Stand-Alone Project Floor",
          "US$ 10 million minimum",
          "Section 2.4.3",
        ],
        ["Tied Supplier Procurement", "Discouraged", "Section 2.4.6"],
        ["Suppliers' Credit", "Strictly not utilized", "Section 2.4.7"],
        [
          "Consultancy, Trips & Vehicles",
          "Approved only if strictly necessary",
          "Section 2.4.5",
        ],
      ],
    },
    followUps: [
      "When can Nepal utilize non-concessional or EXIM Bank loans under Section 2.5?",
      "Can loan assistance be used for technical assistance under Section 2.6.5?",
      "How does Part IV treat taxes on donor-funded projects?",
    ],
  }),
  buildSupplementaryEntry({
    id: "devcoop2014-sec-2-5-other-loans-sovereign-guarantee",
    question:
      "Under Section 2.5 of the Development Cooperation Policy, 2014, in which sectors may Nepal accept non-concessional loans, and is the Government permitted to accept commercial loans or guarantee private/NGO foreign borrowing?",
    shortTopic: "Other Loans, Commercial Debt Ban & Guarantee Prohibition",
    category: "Advisory",
    fiscalYear: "2014",
    keywords: [
      "Development Cooperation Policy 2014",
      "Section 2.5",
      "US$ 20 Million",
      "Commercial Loan Ban",
      "Sovereign Guarantee",
      "EXIM Bank",
    ],
    answer:
      "Under Section 2.5.1–2.5.3 of the Development Cooperation Policy, 2014, Nepal may utilize non-concessional additional windows of multilateral banks or bilateral EXIM Banks only for large projects of at least US$ 20 million in designated infrastructure areas: hydropower/transmission lines, highways/bridges, railways, airports, dry ports, large-scale irrigation, or other GoN-approved priority areas. However, Section 2.5.4 strictly prohibits accepting commercial loans, and Section 2.5.5 prohibits the Government of Nepal from providing sovereign guarantees for private or non-governmental sector foreign loans.",
    title: "Development Cooperation Policy, 2014",
    citation: "Section 2.5.1–2.5.5",
    authority: "Ministry of Finance, Government of Nepal",
    sourceFile: DEVCOOP_SOURCE_FILE,
    sourceUrl: DEVCOOP_SOURCE_URL,
    libraryId: DEVCOOP_LIBRARY_ID,
    reasoningSteps: [
      "Check Section 2.5.1–2.5.2: Additional multilateral windows and EXIM Bank loans require ≥ US$ 20 million per project/programme.",
      "Confirm eligible infrastructure list in Section 2.5.3(a)–(g).",
      "Apply absolute prohibitions in Section 2.5.4–2.5.5: no commercial loans and no sovereign guarantees for private or NGO foreign borrowing.",
    ],
    rateTable: {
      title: "Non-Concessional Borrowing Guardrails (Section 2.5)",
      columns: ["Loan / Guarantee Type", "Policy Status", "Clause"],
      rows: [
        [
          "EXIM / Multilateral Additional Window",
          "Allowed ≥ US$ 20M in mega-infrastructure",
          "Section 2.5.1–2.5.3",
        ],
        ["Commercial Loans", "Prohibited", "Section 2.5.4"],
        [
          "Sovereign Guarantee for Private/NGO Loans",
          "Prohibited",
          "Section 2.5.5",
        ],
      ],
    },
    followUps: [
      "What rules apply to Technical Assistance pooling and loans under Section 2.6?",
      "What is the Government's preferred aid modality hierarchy under Section 2.2?",
      "How does Part IV restrict using aid funds to pay taxes?",
    ],
  }),
  buildSupplementaryEntry({
    id: "devcoop2014-sec-2-2-budgetary-support-audit",
    question:
      "What is Nepal's preferred hierarchy of aid modalities under Section 2.2 of the Development Cooperation Policy, 2014, and which authority conducts statutory audits of mobilized funds?",
    shortTopic: "Aid Modality Hierarchy, Budget System & OAG Audit",
    category: "Advisory",
    fiscalYear: "2014",
    keywords: [
      "Development Cooperation Policy 2014",
      "Section 2.2",
      "Budgetary Support",
      "Office of the Auditor General",
      "Country Budgetary System",
    ],
    answer:
      "Under Section 2.2.1–2.2.2 of the Development Cooperation Policy, 2014, General Budgetary Support is the Government's first-choice modality and Sector Budget Support is second, followed by Sector Wide Approaches (SWAp) and stand-alone projects only where sustainability and innovation are ensured. Under Section 2.2.9, all development cooperation must be mobilized through the Country Budgetary System, and the Office of the Auditor General (OAG) conducts the statutory audit of such resources. Under Section 2.2.11, the Ministry of Finance coordinates development-partner negotiations.",
    title: "Development Cooperation Policy, 2014",
    citation: "Section 2.2.1–2.2.11",
    authority: "Ministry of Finance, Government of Nepal",
    sourceFile: DEVCOOP_SOURCE_FILE,
    sourceUrl: DEVCOOP_SOURCE_URL,
    libraryId: DEVCOOP_LIBRARY_ID,
    reasoningSteps: [
      "Rank aid modalities under Section 2.2.1–2.2.2: (1) General Budgetary Support, (2) Sector Budget Support, (3) SWAp / screened stand-alone projects.",
      "Verify fiscal routing & audit under Section 2.2.9: funds flow through the Country Budgetary System and are audited by the Office of the Auditor General.",
      "Confirm negotiation lead under Section 2.2.11: Ministry of Finance prepares Terms of Reference and leads partner negotiations.",
    ],
    rateTable: {
      title: "Development Aid Modality & Audit Framework (Section 2.2)",
      columns: ["Governance Feature", "Policy Mandate", "Clause"],
      rows: [
        [
          "#1 Preferred Aid Modality",
          "General Budgetary Support",
          "Section 2.2.1",
        ],
        ["#2 Preferred Aid Modality", "Sector Budget Support", "Section 2.2.2"],
        [
          "Budget Routing & Statutory Audit",
          "Country Budgetary System + OAG Audit",
          "Section 2.2.9",
        ],
        ["Lead Negotiator", "Ministry of Finance", "Section 2.2.11"],
      ],
    },
    followUps: [
      "Can aid funds from budgetary or project support be used to pay Nepalese taxes under Part IV?",
      "What minimum dollar floors apply to Grants vs. Concessional Loans?",
      "What tax & visa privileges apply to foreign project workers?",
    ],
  }),
];
