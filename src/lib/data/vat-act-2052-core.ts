import type { MockQAPair } from "../mock-tax-chat";
import { EDITORIAL_BOARD_CONTRIBUTOR } from "./finance-bill-2083-helpers";

const VAT_ACT_SOURCE_FILE = "docs/Files/Nepal_Value.pdf";
const VAT_ACT_SOURCE_URL = "/api/sources/vat-act-2052";
const VAT_ACT_LIBRARY_ID = "vat-act-2052";

interface VatActSeedInput {
  id: string;
  question: string;
  shortTopic: string;
  keywords: string[];
  answer: string;
  citation: string;
  reasoningSteps: string[];
  rateTable: NonNullable<MockQAPair["rateTable"]>;
  followUps: string[];
}

function buildVatActEntry(input: VatActSeedInput): MockQAPair {
  return {
    id: input.id,
    question: input.question,
    shortTopic: input.shortTopic,
    category: "Value Added Tax",
    fiscalYear: "General",
    keywords: [...input.keywords, "Value Added Tax Act 2052"],
    answer: input.answer,
    responseType: "tabular-schedule",
    thoughtProcess: {
      duration: "1.3s",
      summary: `VAT statutory analysis verified against ${VAT_ACT_SOURCE_FILE} (${input.citation}).`,
      steps: input.reasoningSteps,
    },
    rateTable: input.rateTable,
    resources: [
      {
        title: "Value Added Tax Act, 2052 (1996)",
        citation: `${input.citation} · Source: ${VAT_ACT_SOURCE_FILE}`,
        authority: "Inland Revenue Department (IRD) / Nepal Law Commission",
        libraryId: VAT_ACT_LIBRARY_ID,
        externalUrl: VAT_ACT_SOURCE_URL,
      },
    ],
    followUps: input.followUps,
    contributor: EDITORIAL_BOARD_CONTRIBUTOR,
  };
}

export const VAT_ACT_2052_CORE_EN: MockQAPair[] = [
  buildVatActEntry({
    id: "vat2052-sec-8-reverse-charge-services-construction",
    question:
      "When does reverse charge VAT apply in Nepal to imported services from non-residents and commercial building construction under Section 8(2) and Section 8(3) of the Value Added Tax Act, 2052?",
    shortTopic: "Reverse Charge VAT on Foreign Services & Construction",
    keywords: [
      "Section 8(2)",
      "Section 8(3)",
      "Reverse Charge VAT",
      "Foreign Services",
      "NPR 5 Million Construction",
    ],
    answer:
      "Under Section 8(2) of the Value Added Tax Act, 2052, any person in Nepal—whether VAT-registered or not—who receives services from an unregistered person located outside Nepal must self-assess and collect VAT on the taxable value. Additionally, under Section 8(3), where a business building, apartment, shopping complex, or specified structure valued at more than NPR 5,000,000 is constructed through an unregistered contractor, the owner must assess and pay VAT as if the construction were procured from a registered person.",
    citation: "Section 8(2), Section 8(3)",
    reasoningSteps: [
      "Check Section 8(2) imported service rule: applies to any Nepalese recipient (registered or unregistered) receiving services from an unregistered supplier outside Nepal.",
      "Check Section 8(3) commercial construction rule: triggers if business structure value exceeds NPR 5,000,000 and construction is procured from an unregistered person.",
      "Note input tax credit interaction: under Section 17(5b), VAT paid under Section 8(2) is eligible for input tax deduction by registered taxpayers.",
    ],
    rateTable: {
      title: "Section 8 Reverse Charge VAT Triggers",
      columns: ["Transaction Type", "Threshold / Condition", "Liable Person"],
      rows: [
        [
          "Services from Unregistered Foreign Person",
          "Any taxable value",
          "Service recipient in Nepal (Sec 8(2))",
        ],
        [
          "Commercial Structure Construction",
          "Value > NPR 5,000,000 via unregistered builder",
          "Structure owner (Sec 8(3))",
        ],
      ],
    },
    followUps: [
      "Can VAT paid under Section 8(2) reverse charge be claimed as input tax credit under Section 17?",
      "When can export-oriented industries import raw materials against a bank guarantee under Section 8A?",
      "What VAT penalties apply for failing to register under Section 29?",
    ],
  }),
  buildVatActEntry({
    id: "vat2052-sec-8a-export-bank-guarantee-import",
    question:
      "Under Section 8A of the Value Added Tax Act, 2052, which exporters qualify to import raw materials against a bank guarantee instead of paying upfront VAT, and what value-addition and refund restrictions apply?",
    shortTopic: "Section 8A Export Bank Guarantee Import Facility",
    keywords: [
      "Section 8A",
      "Bank Guarantee",
      "60 Percent Export",
      "10 Percent Value Addition",
      "Bonded Warehouse",
    ],
    answer:
      "Under Section 8A(1) of the Value Added Tax Act, 2052, an industry that exports more than 60% of its total sales over the preceding 12 months (as well as duty-free shops importing via bonded warehouses) may import required raw materials against a bank guarantee lodged with the Tax Office in lieu of paying import VAT. Except for duty-free bonded warehouse imports, exporters must produce finished goods achieving at least 10% value addition. Furthermore, under Section 8A(5), a person utilizing this bank guarantee facility cannot claim monthly lump-sum export refunds under Section 24(4).",
    citation: "Section 8A(1)–(5)",
    reasoningSteps: [
      "Verify export share threshold under Section 8A(1): > 60% of total sales in the last 12 months.",
      "Verify manufacturing condition under Section 8A(1) proviso: convert raw materials into finished goods with ≥ 10% value addition.",
      "Check bonded-warehouse liquor/cigarette restriction under Section 8A(2): sales limited to MoFA-recommended diplomatic/tariff-privileged bodies.",
      "Apply exclusivity rule under Section 8A(5): bank-guarantee users are excluded from Section 24(4) monthly VAT refund claims.",
    ],
    rateTable: {
      title: "Section 8A Bank Guarantee Import Conditions",
      columns: ["Requirement", "Statutory Benchmark", "Clause"],
      rows: [
        [
          "Export Ratio Requirement",
          "> 60% of sales in last 12 months",
          "Section 8A(1)",
        ],
        [
          "Minimum Value Addition",
          "10% value addition on finished goods",
          "Section 8A(1) Proviso",
        ],
        [
          "Section 24(4) Export Refund",
          "Not available concurrently",
          "Section 8A(5)",
        ],
      ],
    },
    followUps: [
      "How does the Section 24(4) monthly export VAT refund work for exporters at ≥ 40%?",
      "When is VAT refunded on re-exported goods under Section 25B?",
      "What VAT exemption applies to raw cotton yarn and industrial machinery?",
    ],
  }),
  buildVatActEntry({
    id: "vat2052-sec-10a-11-provisional-deregistration-stock",
    question:
      "When is temporary VAT registration required for exhibitions under Section 10A, and what audit timeline and deemed stock-supply rule apply when cancelling VAT registration under Section 11?",
    shortTopic: "Temporary Exhibition Registration & Deregistration Stock Rule",
    keywords: [
      "Section 10A",
      "Section 11",
      "Temporary Registration",
      "Deregistration Audit",
      "Deemed Supply of Stock",
    ],
    answer:
      "Under Section 10A(1), organizers and unregistered entrepreneurs conducting taxable transactions at temporary exhibitions or fairs must obtain temporary VAT registration. When cancelling VAT registration under Section 11(1b), the taxpayer must submit documents for audit within 15 days of filing the cancellation return, and the Tax Officer must audit and cancel (or refuse) within 3 months—failing which the taxpayer is relieved from filing subsequent returns. Under Section 11(3), any remaining stock and capital goods on which input tax credit was already claimed are deemed supplied at market price at cancellation and taxed accordingly.",
    citation: "Section 10A, Section 11(1b), Section 11(3)",
    reasoningSteps: [
      "Check Section 10A(1): temporary VAT registration applies to organizers and unregistered vendors at fairs/exhibitions.",
      "Check Section 11(1)(c)/(d1) cancellation triggers: firm dissolution/partner death or consecutive 1-year zero/non-filing.",
      "Apply Section 11(1b) audit clock: submit audit documents within 15 days; Tax Officer has 3 months to decide or return-filing stops.",
      "Apply Section 11(3): credit-availed closing stock and capital goods are deemed supplied at market value on cancellation.",
    ],
    rateTable: {
      title: "Temporary Registration & Deregistration Timelines",
      columns: ["Rule / Event", "Statutory Requirement", "Section"],
      rows: [
        [
          "Exhibitions / Fairs",
          "Mandatory temporary VAT registration",
          "Section 10A(1)",
        ],
        [
          "Deregistration Audit Docs",
          "Submit within 15 days of final return",
          "Section 11(1b)",
        ],
        [
          "Tax Officer Decision Window",
          "Cancel or notify within 3 months",
          "Section 11(1b)",
        ],
        [
          "Closing Stock & Capital Goods",
          "Deemed supplied at market price",
          "Section 11(3)",
        ],
      ],
    },
    followUps: [
      "What penalties apply under Section 29 if an unregistered person collects VAT?",
      "What happens if a VAT taxpayer fails to file returns for 6 consecutive months under Section 17(8)?",
      "What is the compulsory VAT registration threshold for services?",
    ],
  }),
  buildVatActEntry({
    id: "vat2052-sec-17-itc-lease-reverse-charge-nonfiler",
    question:
      "Can a VAT-registered business claim input tax credit on capital goods acquired under a financial lease or reverse-charge services, and what sanctions apply under Section 17(8) for 6 months of non-filing?",
    shortTopic:
      "Input Tax Credit on Leases, Reverse Charge & 6-Month Non-Filers",
    keywords: [
      "Section 17",
      "Input Tax Credit",
      "Financial Lease",
      "Section 17(8)",
      "Registration Suspension",
    ],
    answer:
      "Under Section 17(5a) of the Value Added Tax Act, 2052, taxpayers may deduct VAT paid on capital goods imported or purchased under a financial-lease loan agreement (subject to Section 17(2) dual personal/business-use restrictions). Under Section 17(5b), VAT paid under Section 8(2) reverse charge, Section 12A, and Section 15(3) is also deductible. Conversely, under Section 17(8), if a taxpayer fails to submit VAT returns for 6 consecutive months, their name is made public, pending input tax deductions may be withheld, and their VAT registration may be suspended.",
    citation: "Section 17(2), Section 17(5a), Section 17(5b), Section 17(8)",
    reasoningSteps: [
      "Review Section 17(2): personal or mixed personal/business goods face no deduction or partial deduction limits.",
      "Apply Section 17(5a): allow input tax deduction on capital goods acquired via financial lease agreements.",
      "Apply Section 17(5b): allow credit for reverse charge tax paid under Section 8(2), Section 12A, and Section 15(3).",
      "Apply Section 17(8): 6 consecutive months of unfiled VAT returns triggers public naming, credit suspension, and registration suspension.",
    ],
    rateTable: {
      title: "Section 17 Input Tax Credit & Non-Filer Sanctions",
      columns: ["Provision", "Legal Treatment", "Sub-section"],
      rows: [
        [
          "Dual Business/Personal Goods",
          "No credit or prescribed partial credit",
          "Section 17(2)",
        ],
        [
          "Financial-Lease Capital Goods",
          "Full ITC permitted (subject to Sec 17(2))",
          "Section 17(5a)",
        ],
        [
          "Reverse Charge Tax (Sec 8(2))",
          "Creditable input tax once paid",
          "Section 17(5b)",
        ],
        [
          "6 Consecutive Unfiled Returns",
          "Name published; ITC & registration suspended",
          "Section 17(8)",
        ],
      ],
    },
    followUps: [
      "When is an exporter eligible for a lump-sum refund of excess Section 17 credit under Section 24?",
      "What 10% extra charge applies to overdue VAT under Section 19(2)?",
      "What fine applies for using data-deleting billing software under Section 29?",
    ],
  }),
  buildVatActEntry({
    id: "vat2052-sec-18-19-20-return-surcharge-assessment",
    question:
      "How can VAT returns be filed in districts lacking an Inland Revenue Office under Section 18(1a), what surcharge applies to late VAT payments under Section 19(2), and when can a Tax Officer assess VAT under Section 20?",
    shortTopic:
      "District VAT Filing, 10% Late Charge & Group Under-Invoicing Assessment",
    keywords: [
      "Section 18(1a)",
      "Section 19(2)",
      "Section 20",
      "10 Percent Charge",
      "Under-Invoicing",
      "Tax Assessment",
    ],
    answer:
      "Under Section 18(1a), taxpayers in districts without an Inland Revenue Office may submit VAT returns and tax payments to the district Office of Funds and Accounts Controller by the 15th day of the due month, which forwards them to the IRO within 7 days. Under Section 19(2), unpaid VAT past the deadline attracts an extra charge of 10% per annum. Under Section 20(1), a Tax Officer may assess VAT not only for unfiled/incomplete/false returns, but also where goods are supplied to a group company through under-invoicing (Section 20(1)(f)) or where an entity required to register operates without registration (Section 20(1)(g)).",
    citation: "Section 18(1a), Section 19(2), Section 20(1)(f)–(g)",
    reasoningSteps: [
      "Verify district filing accommodation under Section 18(1a): file by the 15th day at the Office of Funds and Accounts Controller (7-day forwarding to IRO).",
      "Apply Section 19(2) late-payment surcharge: 10% per annum on outstanding VAT.",
      "Review Section 20(1) expanded assessment powers: explicitly covers under-invoiced supplies to group companies (Clause (f)) and unregistered taxable operators (Clause (g)).",
    ],
    rateTable: {
      title: "VAT Filing, Late Charge & Officer Assessment Rules",
      columns: ["Provision", "Rule / Threshold", "Section"],
      rows: [
        [
          "Districts without IRO",
          "File at DTCO by 15th; forwarded in 7 days",
          "Section 18(1a)",
        ],
        [
          "Late VAT Payment Surcharge",
          "10% per annum extra charge",
          "Section 19(2)",
        ],
        [
          "Group Under-Invoicing Assessment",
          "Tax Officer reassessment power",
          "Section 20(1)(f)",
        ],
      ],
    },
    followUps: [
      "What are the 30-day and 60-day VAT refund deadlines under Section 24(5)?",
      "What fines and imprisonment apply for false VAT accounts or under-reporting under Section 29?",
      "How does the multi-rate VAT amendment in Finance Bill, 2083 modify Section 7?",
    ],
  }),
  buildVatActEntry({
    id: "vat2052-sec-24-24a-export-refunds-3yr-limit",
    question:
      "What export sales percentage triggers a monthly lump-sum VAT refund under Section 24(4), within how many days must refunds be paid without Government interest, and what time bar applies under Section 24A?",
    shortTopic:
      "40% Monthly Export VAT Refunds, Interest Clocks & 3-Year Limit",
    keywords: [
      "Section 24(4)",
      "Section 24(5)",
      "Section 24A",
      "Export VAT Refund",
      "40 Percent Export",
      "3 Years Limit",
    ],
    answer:
      "Under Section 24(4) of the Value Added Tax Act, 2052, any registered taxpayer whose export sales in a month account for 40% or more of total monthly sales may apply for a lump-sum refund of remaining excess Section 17 input tax credit after offsetting outstanding dues. Under Section 24(5), the Tax Officer must refund valid claims within 30 days for continuous 4-month domestic credit applications under Section 24(3) and within 60 days for export refund claims under Section 24(4), failing which the Government must pay prescribed interest. Under Section 24A, no VAT refund is granted if the claim application is not filed within 3 years from the expiry of the relevant tax period.",
    citation: "Section 24(4), Section 24(5), Section 24A",
    reasoningSteps: [
      "Check Section 24(4) monthly exporter qualification: export sales ≥ 40% of total sales in that month (unless using Section 8A bank guarantee).",
      "Check Section 24(5) statutory refund deadlines: 30 days (Section 24(3) credit refund) and 60 days (Section 24(4) exporter refund), with mandatory Government interest thereafter.",
      "Apply Section 24A prescription period: claims expire 3 years after the end of the relevant tax period.",
    ],
    rateTable: {
      title: "VAT Refund Thresholds & Time Limits (Sections 24–24A)",
      columns: ["Refund Category", "Threshold / Deadline", "Section"],
      rows: [
        [
          "Monthly Exporter Refund",
          "Export sales ≥ 40% of monthly total sales",
          "Section 24(4)",
        ],
        [
          "Credit Carryforward Refund Window",
          "30 days from application (interest if late)",
          "Section 24(3) & (5)",
        ],
        [
          "Exporter Refund Window",
          "60 days from application (interest if late)",
          "Section 24(4) & (5)",
        ],
        [
          "Refund Claim Expiry",
          "Within 3 years of tax period expiry",
          "Section 24A",
        ],
      ],
    },
    followUps: [
      "Can exporters using the Section 8A bank guarantee facility also claim Section 24(4) refunds?",
      "What VAT refunds are available to foreign diplomats and air-departing tourists under Sections 25–25A?",
      "How does the 2-year income tax refund deadline in Section 113 compare?",
    ],
  }),
  buildVatActEntry({
    id: "vat2052-sec-25-25a-25b-diplomatic-tourist-reexport",
    question:
      "What minimum purchase thresholds apply to diplomatic and foreign-tourist VAT refunds under Sections 25 and 25A, and how are VAT deposits handled on re-exported goods under Section 25B?",
    shortTopic: "Diplomatic, Foreign Tourist & Re-Export VAT Refunds",
    keywords: [
      "Section 25",
      "Section 25A",
      "Section 25B",
      "Diplomatic Refund",
      "Tourist VAT Refund",
      "NPR 15,000",
      "NPR 1,500",
    ],
    answer:
      "Under Section 25(1) and (1a), diplomatic missions and diplomats recognized by the Ministry of Foreign Affairs enjoy VAT refunds on a reciprocal basis, provided each single purchase of taxable goods or services is at least NPR 1,500 (claims below NPR 1,500 at one time are not refunded). Under Section 25A, a foreign tourist visiting Nepal and departing by air who purchases and carries out taxable goods exceeding NPR 15,000 is entitled to a VAT refund as prescribed by the IRD. Under Section 25B, when goods imported on deposit are re-exported, the Customs Office refunds the VAT deposit upon evidence of re-export.",
    citation: "Section 25(1)–(1a), Section 25A, Section 25B",
    reasoningSteps: [
      "Verify diplomatic reciprocity and minimum invoice threshold under Section 25(1)–(1a): purchase must be ≥ NPR 1,500 per transaction.",
      "Verify tourist refund rule under Section 25A: foreign tourist departing by air with taxable goods purchased > NPR 15,000.",
      "Check re-export customs refund under Section 25B: Customs Office refunds deposited VAT based on re-export evidence.",
    ],
    rateTable: {
      title: "Special VAT Refund Regimes (Sections 25–25B)",
      columns: ["Beneficiary", "Minimum Purchase / Condition", "Section"],
      rows: [
        [
          "Diplomatic Missions & Diplomats",
          "Reciprocity + ≥ NPR 1,500 single purchase",
          "Section 25(1)–(1a)",
        ],
        [
          "Air-Departing Foreign Tourists",
          "Taxable goods > NPR 15,000 taken abroad",
          "Section 25A",
        ],
        [
          "Re-Exported Imports",
          "Customs VAT deposit refunded on re-export proof",
          "Section 25B",
        ],
      ],
    },
    followUps: [
      "How are exports taxed and refunded under Section 24(4)?",
      "What rules govern VAT exemption on donor-funded local purchases under Development Policy Part IV?",
      "What penalties apply under Section 29 if VAT is collected without registration?",
    ],
  }),
  buildVatActEntry({
    id: "vat2052-sec-29-29a-penalties-software-abettor",
    question:
      "What monetary fines and criminal penalties apply under Section 29 of the VAT Act, 2052 for non-registration, billing software manipulation, tax fraud, and abetting tax evasion?",
    shortTopic: "Section 29 VAT Fines, Software Tampering & Fraud Penalties",
    keywords: [
      "Section 29",
      "Section 29A",
      "VAT Penalties",
      "NPR 500,000 Software Fine",
      "100 Percent Fraud Penalty",
      "50 Percent Abettor",
    ],
    answer:
      "Section 29 of the Value Added Tax Act, 2052 imposes tiered penalties: (1) NPR 10,000 per tax period for failing to register under Section 10(1)–(2); (2) NPR 2,000/week for missing tax boards (Section 29(1)(b1)); (3) NPR 5,000 per instance for failing to issue required Section 14 invoices; (4) NPR 500,000 for taxpayers using data-deleting/editing software in computerized billing (Section 29(1)(l)); (5) up to 25% of tax under Section 29(1a) for improper tax reduction; (6) 100% of tax and/or up to 6 months' imprisonment under Section 29(2) for false accounts, fraud, or unregistered VAT collection; and (7) a 50% fine on knowing/negligent abettors and advisors under Section 29(3).",
    citation: "Section 29(1)–(3), Section 29A",
    reasoningSteps: [
      "Map administrative fines under Section 29(1): NPR 10k/period (Sec. 10), NPR 5k/instance (Sec. 14), NPR 500k (data-deleting billing software).",
      "Check Section 29(1a) & (2): up to 25% for rule non-compliance; 100% fine and/or up to 6 months' prison for fraud or false accounts.",
      "Check Section 29(3) accomplice liability: 50% of unpaid/underpaid tax for knowing or negligent abettors/advisors.",
      "Note Section 29A: written confession prior to proceedings allows the Department to impose a fine order up to the statutory cap.",
    ],
    rateTable: {
      title: "Section 29 VAT Offense & Penalty Matrix",
      columns: ["Violation", "Statutory Penalty", "Clause"],
      rows: [
        [
          "Non-registration (Sec 10)",
          "NPR 10,000 per tax period",
          "Section 29(1)(a)",
        ],
        [
          "Tax invoice failure (Sec 14(1)/(4))",
          "NPR 5,000 per instance",
          "Section 29(1)(c)",
        ],
        ["Data-deleting billing software", "NPR 500,000", "Section 29(1)(l)"],
        [
          "False accounts / Fraud / Unregistered VAT",
          "100% tax fine and/or ≤ 6 months prison",
          "Section 29(2)",
        ],
        [
          "Knowing/negligent abettor or advisor",
          "50% of unpaid/underpaid tax",
          "Section 29(3)",
        ],
      ],
    },
    followUps: [
      "What extra annual charge applies to overdue VAT payments under Section 19(2)?",
      "Compare Section 29 VAT accomplice fines with Income Tax Act Section 127.",
      "How does the 10%–25% VAT assessment appeal process work under Section 32?",
    ],
  }),
];
