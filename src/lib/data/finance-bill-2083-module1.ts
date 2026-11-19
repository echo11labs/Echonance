import type { MockQAPair } from "../mock-tax-chat";
import {
  buildFinanceBillQaEntry,
  type FinanceBillSeedInput,
} from "./finance-bill-2083-helpers";

function buildModule1Entry(
  input: Omit<FinanceBillSeedInput, "category" | "citationTitle" | "libraryId">,
): MockQAPair {
  return buildFinanceBillQaEntry({
    ...input,
    category: "Income Tax",
    citationTitle: "Finance Bill, 2083 / Income Tax Act, 2058",
    libraryId: "income-tax-act-2058",
  });
}

export const FINANCE_BILL_2083_MODULE_1_EN: MockQAPair[] = [
  buildModule1Entry({
    id: "fb2083-sec-2-kha1-international-transaction",
    question:
      "What constitutes an 'international transaction' under Section 2(kha1) as amended by Section 57(1) of Finance Bill, 2083, and what are its exact legal thresholds and scope?",
    shortTopic: "Definition of International Transaction",
    keywords: [
      "Section 2(kha1)",
      "International Transaction",
      "Non-resident",
      "Cross-border",
      "Transfer Pricing",
    ],
    answer:
      "Section 57(1)(a) of Finance Bill, 2083 inserts clause (kha1) into Section 2 of the Income Tax Act, 2058, defining an 'international transaction' as any transaction of goods, services, finance, or intangible property undertaken by any person with at least one non-resident person. The definition explicitly encompasses any other cross-border arrangement or transaction that affects or has a direct bearing on the income, expenditure, assets, or liabilities of the parties involved.",
    citation: "Section 57(1)(a) (inserting Section 2(kha1))",
    reasoningSteps: [
      "Identify the statutory addition: Section 57(1)(a) formally introduces clause (kha1) into Section 2.",
      "Check residency conditions: The transaction must occur between any person and at least one non-resident person.",
      "Analyze subject matter coverage: It covers physical goods, services, financing arrangements, and intangible property/IP.",
      "Verify balance sheet/P&L impact: The catch-all clause captures any transaction that impacts the income, expenses, assets, or liabilities of either party.",
    ],
    rateTable: {
      title: "Scope of International Transactions under Section 2(kha1)",
      columns: [
        "Transaction Class",
        "Statutory Scope",
        "Residency Requirement",
      ],
      rows: [
        [
          "Goods & Commodities",
          "Cross-border supply, purchase, or exchange",
          "At least one non-resident party",
        ],
        [
          "Services",
          "Technical, managerial, IT, or consultancy services",
          "At least one non-resident party",
        ],
        [
          "Finance & Treasury",
          "Cross-border loans, guarantees, or advances",
          "At least one non-resident party",
        ],
        [
          "Intangibles & IP",
          "Licensing, software rights, patents, or know-how",
          "At least one non-resident party",
        ],
        [
          "Other Arrangements",
          "Any arrangement affecting income, costs, assets, or liabilities",
          "At least one non-resident party",
        ],
      ],
    },
    followUps: [
      "What criteria define a controlled or associated entity under Section 2(ka-na)(4)?",
      "What are the pricing benchmarks for the Safe Harbour regime under Section 33A?",
      "What transfer pricing documentation is required under Section 33B?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-2-kana4-controlled-entity",
    question:
      "What statutory criteria define an associated or controlled entity for the transfer pricing provisions of Sections 33, 33A, and 33B pursuant to Section 57(1)(b) of Finance Bill, 2083?",
    shortTopic: "Definition of Controlled/Associated Entity",
    keywords: [
      "Controlled Entity",
      "Section 2(ka-na)(4)",
      "Transfer Pricing",
      "Voting Power",
      "Supply Dependency",
    ],
    answer:
      "Section 57(1)(b) of Finance Bill, 2083 amends Section 2(ka-na) of the Income Tax Act, 2058 by adding sub-clause (4) specifically for Sections 33, 33A, and 33B. An entity is classified as a controlled or associated entity if: (a) it alone, or jointly with relatives or associates, controls or benefits from 30% or more of another entity's income, capital, or voting rights; (b) it finances 50% or more of another entity's total asset value through debt/loans; (c) another entity substantially depends on its intellectual property, know-how, or commercial rights for business operations; or (d) it supplies 90% or more of the raw materials or consumables required by another entity.",
    citation: "Section 57(1)(b) (inserting Section 2(ka-na)(4))",
    reasoningSteps: [
      "Review the purpose: Sub-clause (4) is inserted specifically for transfer pricing regulation under Sections 33, 33A, and 33B.",
      "Check equity/voting threshold: Direct, indirect, or joint control of ≥30% of income, capital, or voting rights creates associate status.",
      "Check debt financing threshold: Providing debt capital that finances ≥50% of the entity's total asset base establishes de facto control.",
      "Examine operational/IP dependency: Operational reliance on proprietary patents, trade secrets, or commercial rights establishes a controlled relationship.",
      "Check supply dependency: Supplying ≥90% of the raw materials or consumable inputs satisfies the definition.",
    ],
    rateTable: {
      title:
        "Thresholds for Controlled / Associated Entities (Sec 2(ka-na)(4))",
      columns: [
        "Criterion Type",
        "Statutory Threshold",
        "Impact on Relationship",
      ],
      rows: [
        [
          "Capital / Voting / Income Control",
          "≥ 30% direct or indirect holding",
          "Deemed Associated Entity",
        ],
        [
          "Asset Debt Financing",
          "≥ 50% of total assets funded via loan",
          "Deemed Associated Entity",
        ],
        [
          "Technology / IP Dependency",
          "Substantial operational reliance on IP/know-how",
          "Deemed Associated Entity",
        ],
        [
          "Raw Material / Supply Monopoly",
          "≥ 90% of required raw materials or consumables supplied",
          "Deemed Associated Entity",
        ],
      ],
    },
    followUps: [
      "What constitutes an 'international transaction' under Section 2(kha1)?",
      "What is the statutory definition of the 'Safe Harbour Rule' under Section 2(ka-bha1)?",
      "What transfer pricing documentation is required under Section 33B?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-2-kabha1-safe-harbour-definition",
    question:
      "What is the statutory definition of the 'Safe Harbour Rule' added under Section 2(ka-bha1) of the Income Tax Act, 2058?",
    shortTopic: "Safe Harbour Rule Statutory Definition",
    keywords: [
      "Section 2(ka-bha1)",
      "Safe Harbour Rule",
      "Arm's Length Price",
      "Transfer Pricing",
      "Section 33A",
    ],
    answer:
      "Section 57(1)(d) of Finance Bill, 2083 inserts clause (ka-bha1) into Section 2 of the Income Tax Act, 2058, defining 'Safe Harbour Rule' as the statutory circumstance and procedure set forth in Section 33A under which the tax authority formally accepts the transfer price declared by a taxpayer for controlled transactions as equivalent to the arm's length price without requiring a full transfer pricing audit.",
    citation: "Section 57(1)(d) (inserting Section 2(ka-bha1))",
    reasoningSteps: [
      "Locate the statutory addition: Section 57(1)(d) formally integrates 'Safe Harbour Rule' into the interpretation section.",
      "Understand the legal presumption: Where Section 33A conditions are met, the taxpayer's declared transfer price is presumed to be at arm's length.",
      "Identify the administrative effect: It relieves qualifying taxpayers from discretionary transfer pricing adjustments by the Department.",
    ],
    rateTable: {
      title: "Safe Harbour Statutory Legal Mechanics",
      columns: ["Element", "Statutory Rule", "Governing Section"],
      rows: [
        [
          "Legal Concept",
          "Presumption of arm's length valuation",
          "Section 2(ka-bha1)",
        ],
        [
          "Operational Framework",
          "Turnover ≤ NPR 1B with pre-set profit margins",
          "Section 33A",
        ],
        [
          "Audit Impact",
          "Exempt from discretionary transfer pricing reassessment",
          "Section 33A(1)",
        ],
      ],
    },
    followUps: [
      "What are the operating requirements and pricing benchmarks under Section 33A?",
      "How do Advance Pricing Agreements (APAs) operate under Section 33B?",
      "How are controlled or associated entities defined under Section 2(ka-na)(4)?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-8-3-e-sweat-equity-it",
    question:
      "How does the 'sweat-equity' exclusion under Section 8(3)(e) operate for employees in the Information Technology sector?",
    shortTopic: "Sweat Equity Tax Exemption in IT Sector",
    keywords: [
      "Section 8(3)(e)",
      "Sweat Equity",
      "IT Industry",
      "Employment Income",
      "Remuneration in Shares",
    ],
    answer:
      "Section 57(3) of Finance Bill, 2083 introduces clause (e) to Section 8(3) of the Income Tax Act, 2058. Under this provision, the fair market value of shares received as remuneration for employment in an IT industry is statutorily excluded from the employee's gross employment income, exempting sweat equity from payroll taxation at the time of grant or allotment.",
    citation: "Section 57(3) (adding Section 8(3)(e))",
    reasoningSteps: [
      "Analyze general rule: Section 8(1) and 8(2) require all forms of non-cash benefits, perks, and stock grants to be valued and added to employment income.",
      "Check statutory exception: Section 8(3)(e) creates a carve-out specifically for the IT industry.",
      "Determine taxable timing: No employment tax or payroll TDS arises upon receipt of the shares; capital gains tax principles apply only upon eventual disposal.",
    ],
    rateTable: {
      title: "Tax Treatment of Employee Shares by Sector",
      columns: [
        "Sector",
        "Taxation at Grant / Allotment",
        "Statutory Authority",
      ],
      rows: [
        [
          "Information Technology (IT) Industry",
          "Exempt (Excluded from Employment Income)",
          "Section 8(3)(e)",
        ],
        [
          "Banking, Financial & Insurance",
          "Taxable at Fair Market Value as perk",
          "Section 8(2)",
        ],
        [
          "General Manufacturing & Services",
          "Taxable at Fair Market Value as perk",
          "Section 8(2)",
        ],
      ],
    },
    followUps: [
      "What is the Safe Harbour operating margin benchmark for IT-service exports under Section 33A?",
      "What is the VC/PE exemption from deemed disposal under Section 57?",
      "What are the unified personal income tax slabs under Finance Bill, 2083?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-10-jha1-gratuitous-land-transfer",
    question:
      "Under what conditions is income resulting from the transfer of land or buildings to the government exempt from tax under Section 10?",
    shortTopic: "Exemption on Gratuitous Property Transfer to Government",
    keywords: [
      "Section 10(jha1)",
      "Section 95Ka(5ka)",
      "Capital Gains",
      "Land Transfer",
      "Local Level",
    ],
    answer:
      "Section 57(4)(a) of Finance Bill, 2083 inserts clause (jha1) into Section 10 of the Income Tax Act, 2058, exempting income derived by a natural person from the gratuitous transfer (free of cost) of their land or private building to the Government of Nepal, a Provincial Government, or a Local Level. Concurrently, Section 57(21)(c) adds a sub-section after Section 95Ka(5), specifying that advance capital gains tax shall not be collected on such gratuitous transfers.",
    citation:
      "Section 57(4)(a) (Section 10(jha1)) & Section 57(21)(c) (Section 95Ka)",
    reasoningSteps: [
      "Identify eligible transferor: Must be a natural person disposing of personal land or private buildings.",
      "Verify eligible transferees: The Government of Nepal, Provincial Governments, or Local Levels.",
      "Confirm consideration: The transfer must be completely free of cost (gratuitous).",
      "Establish tax effect: Section 10(jha1) treats the deemed gain as exempt income, and Section 57(21)(c) amending Section 95Ka bars collection of advance capital gains tax.",
    ],
    rateTable: {
      title: "Tax Treatment of Land/Building Disposals to State Entities",
      columns: [
        "Disposal Type",
        "Consideration Received",
        "Income Tax Treatment",
        "Advance Capital Gains Tax",
      ],
      rows: [
        [
          "Donation/Free Transfer to Federal/Provincial/Local Govt",
          "Nil (Free of Cost)",
          "Exempt under Section 10(jha1)",
          "Nil (Section 57(21)(c) / Sec 95Ka)",
        ],
        [
          "Involuntary Land Acquisition by Government",
          "Statutory Compensation",
          "Concessional CGT rate applied",
          "2.5% CGT (Section 57(21)(b)(2))",
        ],
        [
          "Commercial Sale to Private Parties",
          "Fair Market Value / Deed Value",
          "Taxable Business / Capital Gain",
          "7.5% or 10% CGT under amended Sec 95Ka",
        ],
      ],
    },
    followUps: [
      "What institutional entities receive exemptions under Section 10(jha3) and Section 10(tha1)?",
      "What is the revised philanthropic donation deduction cap under Section 12(2)?",
      "What is the tax status of interest earned by foreign sovereign non-profit lenders?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-10-jha2-foreign-govt-loan-interest",
    question:
      "What is the tax status of interest income earned by foreign-government-owned non-profit financial institutions on loans deployed in Nepal?",
    shortTopic: "Exemption on Foreign Government Financial Institution Loans",
    keywords: [
      "Section 10(jha2)",
      "Foreign Government",
      "Interest Exemption",
      "Loan Investment",
      "Non-profit",
    ],
    answer:
      "Pursuant to Section 57(4)(a) of Finance Bill, 2083 inserting Section 10(jha2) into the Income Tax Act, 2058, interest income earned by a wholly foreign-government-owned, non-profit financial institution from debt capital invested in Nepal is fully exempt from income tax.",
    citation: "Section 57(4)(a) (inserting Section 10(jha2))",
    reasoningSteps: [
      "Check ownership structure: The lender must be 100% owned by a foreign sovereign government.",
      "Check institutional objective: The foreign financial entity must operate on a non-profit basis.",
      "Verify investment type: The income must represent interest arising from debt or loan capital deployed in Nepal.",
      "Determine tax consequence: The interest is exempt from both withholding tax (TDS) under Section 88 and corporate income tax under Section 10.",
    ],
    rateTable: {
      title: "Cross-Border Loan Interest Tax Treatment",
      columns: [
        "Lender Category",
        "Ownership & Profit Status",
        "TDS / Corporate Tax Rate",
        "Legal Basis",
      ],
      rows: [
        [
          "Foreign Sovereign Institution",
          "100% Foreign Govt-owned & Non-profit",
          "0% (Exempt)",
          "Section 10(jha2)",
        ],
        [
          "Foreign Commercial Bank / DFI",
          "Commercial / For-profit",
          "15% TDS (or DTAA rate)",
          "Section 88 / Section 90",
        ],
        [
          "Resident Financial Institution",
          "Domestic Commercial Bank",
          "Taxable under standard CIT",
          "Section 7",
        ],
      ],
    },
    followUps: [
      "What are the Safe Harbour pricing rules for foreign currency intra-group loans?",
      "What institutional entities receive Section 10 exemptions under Finance Bill, 2083?",
      "What is the new interest income threshold under Section 11?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-10-jha3-jha4-institutional-exemptions",
    question:
      "What institutional entities receive explicit income tax exemptions under the amendments to Section 10 made by Finance Bill, 2083?",
    shortTopic: "Institutional Exemptions (Water User Groups & Universities)",
    keywords: [
      "Section 10(jha3)",
      "Section 10(tha1)",
      "Water Users Association",
      "Universities",
      "Exempt Income",
    ],
    answer:
      "Section 57(4)(a) of Finance Bill, 2083 adds clause (jha3) to Section 10 of the Income Tax Act, 2058, exempting all income earned by drinking-water and sanitation user associations registered under the Water Resources Act, 2049, provided the income is earned in accordance with their statutory objectives. Concurrently, Section 57(4)(b) adds clause (tha1) to Section 10, exempting income earned by any university established and operating in Nepal in accordance with its institutional objectives.",
    citation:
      "Section 57(4)(a) (Section 10(jha3)) & Section 57(4)(b) (Section 10(tha1))",
    reasoningSteps: [
      "Review additions to Section 10: Clause (jha3) under Section 57(4)(a) and clause (tha1) under Section 57(4)(b) establish institutional income exemptions.",
      "Check qualifying activities for water user associations: Must be registered under the Water Resources Act, 2049, and earn income in line with chartered drinking water and sanitation goals.",
      "Check qualifying activities for universities: Must be established and operating within Nepal, deriving income within their institutional objectives.",
    ],
    rateTable: {
      title: "Section 10 Institutional Exemptions Added by Finance Bill, 2083",
      columns: [
        "Entity Type",
        "Governing Legal Charter",
        "Scope of Income Exemption",
        "Statutory Clause",
      ],
      rows: [
        [
          "Water & Sanitation User Groups",
          "Water Resources Act, 2049",
          "Income derived per organizational objectives",
          "Section 10(jha3)",
        ],
        [
          "Domestic Universities",
          "Acts of Parliament / Operating Charter",
          "Income derived per institutional objectives",
          "Section 10(tha1)",
        ],
      ],
    },
    followUps: [
      "How are gratuitous land transfers to government entities treated under Section 10(jha1)?",
      "What is the revised limit for philanthropic donations under Section 12(2)?",
      "What is the CSR expenditure deduction limit under Section 12D?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-11-interest-agriculture",
    question:
      "What is the new interest income taxation threshold under Section 11 and how has 'agriculture business' been redefined?",
    shortTopic: "Interest Taxation Threshold and Agricultural Business Scope",
    keywords: [
      "Section 11 Proviso",
      "Agriculture Business",
      "Interest Income",
      "NPR 25,000 Threshold",
      "Concessions",
    ],
    answer:
      "Section 57(5) of Finance Bill, 2083 amends Section 11 of the Income Tax Act, 2058 by inserting a proviso that makes interest income exceeding NPR 25,000 fully taxable. It also updates the statutory definition of an 'agriculture business' to encompass crop cultivation, horticulture/fruit farming, sericulture/beekeeping, animal husbandry, poultry farming, and aquaculture/fisheries.",
    citation: "Section 57(5) (amending Section 11)",
    reasoningSteps: [
      "Examine the interest proviso: Interest income up to NPR 25,000 remains subject to standard concession/exemption regimes, but amounts exceeding NPR 25,000 are brought under the tax net.",
      "Review the agricultural scope: Consolidates crop cultivation, horticulture, beekeeping, livestock, poultry, and aquaculture under a single statutory umbrella.",
      "Verify business concessions: Agricultural businesses meeting this expanded definition qualify for sector-specific concessions under Section 11.",
    ],
    rateTable: {
      title: "Section 11 Agricultural Activities and Interest Threshold",
      columns: [
        "Subject Area",
        "Prescribed Legal Rule / Definition",
        "Statutory Reference",
      ],
      rows: [
        [
          "Interest Income Threshold",
          "Interest income exceeding NPR 25,000 is taxable",
          "Section 11 Proviso",
        ],
        [
          "Agricultural Crop & Fruit",
          "Cultivation of food grains, cash crops, and horticulture",
          "Section 57(5) Definition",
        ],
        [
          "Animal & Allied Farming",
          "Livestock, poultry farming, beekeeping, and fisheries",
          "Section 57(5) Definition",
        ],
      ],
    },
    followUps: [
      "What are the unified personal income tax slabs for FY 2083/84?",
      "What cash transaction limit applies under amended Section 21(2)?",
      "What is the CSR deduction cap under Section 12D?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-12-2-donation-limit",
    question:
      "What is the revised allowable limit for philanthropic donation deductions under Section 12(2) of the Income Tax Act, 2058?",
    shortTopic: "Philanthropic Donation Deduction Limit Increase",
    keywords: [
      "Section 12(2)",
      "Donations",
      "Exempt Organizations",
      "NPR 300,000 Limit",
      "Deductions",
    ],
    answer:
      "Section 57(6) of Finance Bill, 2083 amends Section 12(2) of the Income Tax Act, 2058 by increasing the monetary cap on allowable deductions for donations to tax-exempt entities from NPR 100,000 (one lakh rupees) to NPR 300,000 (three lakh rupees). The deduction remains subject to the formula limit of 5% of adjusted taxable income or NPR 300,000, whichever is lower.",
    citation: "Section 57(6) (amending Section 12(2))",
    reasoningSteps: [
      "Review existing statutory rule: Section 12(2) previously capped donations to approved tax-exempt bodies at the lower of 5% of adjusted taxable income or NPR 100,000.",
      "Identify the statutory amendment: Section 57(6) replaces 'one lakh rupees' with 'three lakh rupees'.",
      "Calculate allowable deduction: Compare actual donation, 5% of adjusted taxable income, and NPR 300,000; the lowest figure is deductible.",
    ],
    rateTable: {
      title: "Section 12(2) Donation Deduction Parameter Comparison",
      columns: [
        "Deduction Test Component",
        "Pre-amendment Rule",
        "Amended Rule (Finance Bill, 2083)",
      ],
      rows: [
        [
          "Percentage Ceiling",
          "5% of Adjusted Taxable Income",
          "5% of Adjusted Taxable Income",
        ],
        [
          "Absolute Monetary Cap",
          "NPR 100,000 (One Lakh)",
          "NPR 300,000 (Three Lakhs)",
        ],
        [
          "Recipient Eligibility",
          "Entities with Section 2(s) exempt status",
          "Entities with Section 2(s) exempt status",
        ],
      ],
    },
    followUps: [
      "What are the CSR expenditure deduction rules under Section 12D?",
      "What institutions qualify under amended Section 10 exemptions?",
      "How does Section 21 restrict cash expenses above NPR 25,000?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-12d-csr-expenditure",
    question:
      "What are the deduction rules and statutory caps for Corporate Social Responsibility (CSR) expenditure under the newly inserted Section 12D?",
    shortTopic:
      "Deductibility of Corporate Social Responsibility (CSR) Expenditure",
    keywords: [
      "Section 12D",
      "CSR Expenditure",
      "Corporate Tax",
      "1% Cap",
      "Taxable Income",
    ],
    answer:
      "Section 57(7) of Finance Bill, 2083 introduces Section 12D to the Income Tax Act, 2058, permitting a person to deduct mandatory CSR expenses incurred under prevailing commercial laws when computing taxable income. The allowable deduction is capped at a maximum of 1% of the total taxable income of that income year. Consequential amendments to Section 5 and Section 2(ka-na) integrate Section 12D into the core taxable income computation.",
    citation: "Section 57(2), 57(1)(c), & 57(7) (inserting Section 12D)",
    reasoningSteps: [
      "Review previous treatment: CSR expenditures required under the Industrial Enterprises Act or BFIs Act were often disallowed as non-business expenses.",
      "Identify the statutory right: Section 12D allows CSR expenses incurred under prevailing law to be deducted.",
      "Calculate the statutory limit: The allowable deduction is capped at 1% of the total taxable income for the relevant year.",
      "Examine cross-references: Sections 2(ka-na) and 5 are updated to include Section 12D alongside Sections 12, 12A, 12B, and 12C.",
    ],
    rateTable: {
      title: "Section 12D CSR Deduction Framework",
      columns: ["Parameter", "Legal Rule / Formula", "Statutory Reference"],
      rows: [
        [
          "Eligibility Condition",
          "Incurred pursuant to prevailing CSR laws",
          "Section 12D",
        ],
        [
          "Maximum Deduction Cap",
          "Up to 1% of Total Taxable Income",
          "Section 12D Proviso",
        ],
        [
          "P&L Integration",
          "Deductible after Section 12–12C deductions",
          "Section 5 as amended",
        ],
      ],
    },
    followUps: [
      "What is the revised limit on philanthropic donations under Section 12(2)?",
      "How does amended Section 21 treat cash payments and share issuance costs?",
      "How does Section 57 treat VC/PE investments under change-in-control rules?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-21-cash-limit-share-issuance",
    question:
      "What structural changes were made to Section 21(2) regarding cash transaction limits, and how does Section 21(3) treat share and debenture issuance costs?",
    shortTopic: "Cash Expense Disallowance and Share Issuance Expenses",
    keywords: [
      "Section 21(2)",
      "Section 21(3)",
      "Cash Payment Cap",
      "Share Issuance Costs",
      "Disallowed Expenses",
    ],
    answer:
      "Section 57(8)(a) of Finance Bill, 2083 amends Section 21(2) by removing the NPR 2,000,000 turnover threshold and reducing the maximum allowable single-transaction cash payment from NPR 50,000 to NPR 25,000, applying the rule universally to all persons. Furthermore, Section 57(8)(b) amends Section 21(3)(d) to exclude expenses incurred during the issuance of shares or debentures from standard deduction clauses, requiring them to be capitalized or treated under capital financing rules.",
    citation: "Section 57(8)(a) & (b) (amending Section 21)",
    reasoningSteps: [
      "Analyze turnover changes: The turnover requirement (>NPR 2 million) is removed, making the restriction apply to all taxpayers.",
      "Examine payment thresholds: The per-transaction cash payment cap is lowered from NPR 50,000 to NPR 25,000; cash payments exceeding this limit are disallowed.",
      "Review capital market costs: Share and debenture issuance costs are carved out from ordinary revenue deduction provisions under Section 21(3)(d).",
    ],
    rateTable: {
      title: "Amendments to Deductible Expenses under Section 21",
      columns: [
        "Subject Matter",
        "Pre-amendment Provision",
        "Amended Provision (Finance Bill, 2083)",
      ],
      rows: [
        [
          "Cash Payment Restriction Scope",
          "Turnover > NPR 2,000,000",
          "Universal (Applies to any person)",
        ],
        [
          "Cash Disallowance Ceiling",
          "Exceeding NPR 50,000 per transaction",
          "Exceeding NPR 25,000 per transaction",
        ],
        [
          "Share/Debenture Issuing Costs",
          "Ambiguous revenue deduction treatment",
          "Explicitly excluded from standard deductions",
        ],
      ],
    },
    followUps: [
      "What is the CSR deduction cap under Section 12D?",
      "What is the Safe Harbour turnover ceiling under Section 33A?",
      "What is the revised donation deduction cap under Section 12(2)?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-33a-safe-harbour-benchmarks",
    question:
      "What are the operating requirements and pricing benchmarks for the Safe Harbour regime under Section 33A?",
    shortTopic: "Safe Harbour Rule Operational Requirements",
    keywords: [
      "Section 33A",
      "Safe Harbour",
      "Operating Margin",
      "Intra-group Loans",
      "Low-value Services",
    ],
    answer:
      "Under Section 33A of the Income Tax Act, 2058 (inserted by Section 57(9) of Finance Bill, 2083), taxpayers with annual turnover up to NPR 1 billion may elect the safe harbour regime for controlled transactions. The declared transfer price is accepted as arm's length if: (a) for IT-service exports, the operating profit margin is at least 15% of operating costs; (b) for intra-group foreign-currency loans, interest is priced at the prevailing benchmark/reference rate plus 200 to 400 basis points; and (c) for low-value-adding intra-group services, pricing is set at cost plus a markup of up to 5%. The election remains binding for five consecutive income years.",
    citation: "Section 57(9) (inserting Section 33A)",
    reasoningSteps: [
      "Check turnover limit: Total annual turnover cannot exceed NPR 1 billion.",
      "Apply category pricing rules: IT exports require an operating margin ≥15%; foreign currency loans require reference rate + 200–400 bps; low-value services require cost + up to 5% markup.",
      "Review the election commitment: Once chosen, the safe harbour applies for five consecutive income years unless business circumstances change materially.",
    ],
    rateTable: {
      title: "Section 33A Safe Harbour Benchmarks",
      columns: [
        "Transaction Type",
        "Mandatory Transfer Price Benchmark",
        "Turnover Ceiling",
        "Election Period",
      ],
      rows: [
        [
          "IT-Service Exports",
          "≥ 15% Operating Profit Margin on Cost",
          "≤ NPR 1 Billion",
          "5 Consecutive Years",
        ],
        [
          "Foreign Currency Intra-group Loans",
          "Reference Rate + 200 to 400 basis points",
          "≤ NPR 1 Billion",
          "5 Consecutive Years",
        ],
        [
          "Low-Value Adding Services",
          "Cost + markup up to 5%",
          "≤ NPR 1 Billion",
          "5 Consecutive Years",
        ],
      ],
    },
    followUps: [
      "How do Advance Pricing Agreements (APAs) work under Section 33B if Safe Harbour is not elected?",
      "What constitutes an associated or controlled entity under Section 2(ka-na)(4)?",
      "How is sweat equity taxed for IT employees under Section 8(3)(e)?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-33b-advance-pricing-agreement",
    question:
      "How do Advance Pricing Agreements (APAs), bilateral DTAA coordination, and four-year rollbacks operate under the newly inserted Section 33B?",
    shortTopic: "Advance Pricing Agreements (APA) and Rollback Rules",
    keywords: [
      "Section 33B",
      "Advance Pricing Agreement",
      "APA",
      "Rollback",
      "Mutual Agreement Procedure",
      "Arm's Length Price",
    ],
    answer:
      "Section 57(9) of Finance Bill, 2083 inserts Section 33B into the Income Tax Act, 2058, empowering the Inland Revenue Department (IRD) to enter into Advance Pricing Agreements (APAs) establishing the basis and methodology for determining the arm's length price of international transactions between associated persons. Under Section 33B(2), Nepal's competent authority may also conclude bilateral or multilateral APAs under the Mutual Agreement Procedure (MAP) of Double Taxation Avoidance Agreements (Section 73). An APA applies for up to five consecutive income years and may, by mutual consent under Section 33B(5), include a rollback covering up to four immediately preceding income years. While binding on both parties, the Department may revoke an APA ab initio if obtained through fraud, factual misrepresentation, or false statements.",
    citation: "Section 57(9) (inserting Section 33B)",
    reasoningSteps: [
      "Review APA scope under Section 33B(1)–(2): Supports unilateral agreements with IRD and bilateral/multilateral agreements coordinated with treaty partners under Section 73 DTAA MAP.",
      "Check agreement duration and rollback: Covers a prospective term not exceeding five consecutive income years, plus an optional rollback of up to four preceding income years under Section 33B(5).",
      "Examine binding effect and revocation: Prices determined under the APA method count as arm's length price and bind both sides unless statutory rules/conditions materially change or fraud is proven under Section 33B(7).",
    ],
    rateTable: {
      title: "Advance Pricing Agreement (APA) Framework under Section 33B",
      columns: ["APA Feature", "Statutory Rule / Limit", "Governing Clause"],
      rows: [
        [
          "Agreement Scope",
          "Unilateral (IRD) or Bilateral/Multilateral via Sec 73 DTAA MAP",
          "Section 33B(1)–(2)",
        ],
        [
          "Maximum Prospective Term",
          "Up to 5 consecutive income years",
          "Section 33B(4)",
        ],
        [
          "Rollback Period",
          "Up to 4 immediately preceding income years by mutual agreement",
          "Section 33B(5)",
        ],
        [
          "Revocation / Cancellation",
          "Void ab initio if obtained by fraud, altered facts, or false filings",
          "Section 33B(7)",
        ],
      ],
    },
    followUps: [
      "What are the Safe Harbour benchmarks under Section 33A?",
      "What constitutes an international transaction under Section 2(kha1)?",
      "How are controlled entities defined under Section 2(ka-na)(4)?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-schedule-1-unified-tax-slabs",
    question:
      "What is the unified personal income tax bracket structure for resident individuals and couples under amended Schedule 1 of the Income Tax Act, 2058?",
    shortTopic: "Unified Personal Tax Slabs and Rates",
    keywords: [
      "Schedule 1",
      "Unified Slab",
      "Social Security Tax",
      "Tax Slabs",
      "Surcharge",
    ],
    answer:
      "Section 57(26) of Finance Bill, 2083 amends Schedule 1 of the Income Tax Act, 2058 by removing the separate couple bracket and creating a unified base threshold of NPR 1,000,000 for both resident individuals and couples. Taxable income is taxed progressively: 1% Social Security Tax on the first NPR 1,000,000 (with exemptions for SSF contributors, sole proprietors, and pension income); 10% on NPR 1,000,001–1,500,000; 20% on NPR 1,500,001–2,500,000; 27% on NPR 2,500,001–4,000,000; and 29% (27% base + 2% surcharge) on taxable income exceeding NPR 4,000,000.",
    citation: "Section 57(26)(a)–(e) (amending Schedule 1)",
    reasoningSteps: [
      "Review the structural consolidation: The separate basic exemption for couples is eliminated, unifying the first threshold at NPR 1,000,000.",
      "Apply the 1% SST: The base band is subject to 1% SST, exempting SSF contributors, sole proprietors, and pensioners.",
      "Calculate middle tax bands: Tax is assessed at 10% on the next NPR 500,000; 20% on the subsequent NPR 1,000,000; and 27% on the next NPR 1,500,000.",
      "Apply the top rate: Any taxable income above NPR 4,000,000 is taxed at 29% (27% base rate + 2% surcharge).",
    ],
    rateTable: {
      title:
        "Unified Tax Slabs for Resident Individuals and Couples (FY 2083/84)",
      columns: [
        "Taxable Income Slab (NPR)",
        "Tax Rate",
        "Tax Amount on Slab (NPR)",
        "Cumulative Tax (NPR)",
      ],
      rows: [
        ["First 1,000,000", "1% (SST)", "10,000 (or Nil if exempt)", "10,000"],
        ["Next 500,000 (1,000,001 – 1,500,000)", "10%", "50,000", "60,000"],
        ["Next 1,000,000 (1,500,001 – 2,500,000)", "20%", "200,000", "260,000"],
        ["Next 1,500,000 (2,500,001 – 4,000,000)", "27%", "405,000", "665,000"],
        [
          "Above 4,000,000",
          "29% (27% + 2% surcharge)",
          "29% on excess",
          "665,000 + 29% on balance",
        ],
      ],
    },
    followUps: [
      "What deductions apply to pension income and persons with disabilities under Schedule 1?",
      "What are the revised remote-area tax exemption percentages?",
      "How is sweat equity taxed for IT sector employees under Section 8(3)(e)?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-schedule-1-pension-disability-relief",
    question:
      "What revised deductions and relief apply to pension income and persons with disabilities under amended Schedule 1?",
    shortTopic: "Pension Deductions and Disability Relief",
    keywords: [
      "Schedule 1",
      "Pension Deduction",
      "Disability Exemption",
      "Sub-section (10)",
      "Tax Relief",
    ],
    answer:
      "Under Schedule 1 Section 1 as amended by Section 57(26) of Finance Bill, 2083, individuals with pension income are entitled to an additional deduction equal to 25% of the base band amount (up to NPR 250,000) from their taxable income. For resident individuals or couples with disabilities, sub-section (10) provides an additional deduction equal to 50% of the first-band threshold (an additional NPR 500,000), increasing their zero-tax/base exemption limit to NPR 1,500,000.",
    citation: "Section 57(26)(e) & (f) (amending Schedule 1)",
    reasoningSteps: [
      "Examine pension relief: Section 57(26)(e) (Schedule 1 Section 1(9ka)) provides a 25% deduction on the first-band amount (25% of NPR 1,000,000 = NPR 250,000) for pension recipients.",
      "Examine disability relief: Sub-section (10) adds a deduction of 50% of the base band (50% of NPR 1,000,000 = NPR 500,000) for individuals with certified disabilities.",
      "Calculate combined effect: These deductions reduce taxable income before applying progressive tax brackets.",
    ],
    rateTable: {
      title: "Special Statutory Allowances under Schedule 1",
      columns: [
        "Taxpayer Category",
        "Calculation Formula",
        "Additional Deduction",
        "Effective Exemption Base",
      ],
      rows: [
        [
          "Pension Income Earner",
          "25% of Base Band (NPR 1,000,000)",
          "NPR 250,000",
          "NPR 1,250,000",
        ],
        [
          "Person with Certified Disability",
          "50% of Base Band (NPR 1,000,000)",
          "NPR 500,000",
          "NPR 1,500,000",
        ],
        ["Standard Individual / Couple", "Base Band", "Nil", "NPR 1,000,000"],
      ],
    },
    followUps: [
      "What are the unified personal income tax slabs for FY 2083/84?",
      "What are the revised remote-area tax exemption percentages?",
      "What is the tax exemption on gratuitous land transfers to the government?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-schedule-1-remote-area-allowance",
    question:
      "What are the revised remote-area tax exemption percentages across geographical classifications under amended Schedule 1?",
    shortTopic: "Remote Area Allowance Percentage Increases",
    keywords: [
      "Remote Area Allowance",
      "Schedule 1 Sec 1(4)",
      "Class A to E",
      "Tax Rebate",
      "Geographical Relief",
    ],
    answer:
      "Section 57(26)(d)(2) of Finance Bill, 2083 amends the proviso to Section 1(4)(b) of Schedule 1 by increasing the remote-area tax deduction percentages. Deductions previously set at 5% are raised to 7.5%, and deductions previously set at 7.5% are raised to 10%, providing enhanced tax relief for employees and businesses located in designated remote regions.",
    citation: "Section 57(26)(d)(2) (amending Schedule 1)",
    reasoningSteps: [
      "Review remote-area allowances: Schedule 1 provides deductions based on regional hardship classifications.",
      "Identify the statutory increases: Prior 5% rates are increased to 7.5%, and prior 7.5% rates are increased to 10%.",
      "Apply the deduction: The adjusted percentage is deducted directly from assessable income before calculating final tax liability.",
    ],
    rateTable: {
      title: "Remote Area Allowance Adjustments",
      columns: [
        "Hardship Classification",
        "Previous Rate",
        "Amended Rate (Finance Bill, 2083)",
      ],
      rows: [
        ["Designated Moderate Hardship Regions", "5.0%", "7.5%"],
        ["Designated Severe Hardship Regions", "7.5%", "10.0%"],
        [
          "Designated Extreme Hardship Regions",
          "Prescribed ceiling",
          "Up to statutory maximum",
        ],
      ],
    },
    followUps: [
      "What are the unified personal income tax slabs for FY 2083/84?",
      "What pension and disability deductions apply under Schedule 1?",
      "What are the presumptive vehicle tax rates under Schedule 1?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-schedule-1-presumptive-vehicle-tax",
    question:
      "What are the revised annual presumptive tax rates for commercial rental, public, and cargo vehicles under amended Schedule 1?",
    shortTopic: "Presumptive Vehicle Tax Rates",
    keywords: [
      "Schedule 1 Section 1(13)",
      "Vehicle Tax",
      "Commercial Vehicles",
      "Electric Vehicles",
      "Presumptive Tax",
    ],
    answer:
      "Section 57(26) of Finance Bill, 2083 updates the annual presumptive tax schedule on commercial vehicles under Schedule 1. For cars, jeeps, vans, and microbuses, rates range from NPR 6,500 (≤1300 cc) to NPR 11,000 (>4000 cc). Mini-trucks and mini-buses are assessed at NPR 9,500; trucks and large buses at NPR 12,500; heavy equipment (bulldozers, excavators, loaders, cranes) at NPR 17,500; tractors at NPR 3,500; power tillers at NPR 3,000; auto-rickshaws and tempos at NPR 3,500; and two-wheelers at NPR 3,000. Commercial electric vehicles are taxed from NPR 4,000 (≤50 kW) to NPR 9,500 (>200 kW), with e-rickshaws at NPR 3,400.",
    citation: "Section 57(26) (amending Schedule 1)",
    reasoningSteps: [
      "Review the presumptive vehicle tax regime: Owners of commercial rental, cargo, or transport vehicles pay an annual flat tax under Schedule 1.",
      "Identify ICE vehicle bands: Engine capacity (cc) and vehicle class determine rates between NPR 3,000 and NPR 17,500.",
      "Identify EV bands: Motor power rating (kW) determines rates between NPR 3,400 and NPR 9,500.",
      "Verify filing role: This annual payment satisfies the presumptive income tax requirement for qualifying transport operators.",
    ],
    rateTable: {
      title: "Annual Presumptive Vehicle Income Tax Rates (FY 2083/84)",
      columns: [
        "Vehicle Classification",
        "Capacity / Specification",
        "Annual Presumptive Tax (NPR)",
      ],
      rows: [
        ["Cars / Jeeps / Vans / Microbuses", "Up to 1300 cc", "6,500"],
        ["Cars / Jeeps / Vans / Microbuses", "Above 4000 cc", "11,000"],
        ["Mini-Truck / Mini-Bus", "Standard Commercial Capacity", "9,500"],
        ["Truck / Large Bus", "Standard Heavy Commercial", "12,500"],
        [
          "Heavy Machinery (Excavator/Crane/Dozer)",
          "Industrial / Earthmoving",
          "17,500",
        ],
        ["Tractor / Power Tiller", "Agricultural / Cargo", "3,500 / 3,000"],
        [
          "Auto-Rickshaw / Three-Wheeler Tempo",
          "Commercial Passenger",
          "3,500",
        ],
        ["Electric Commercial Vehicles", "Up to 50 kW", "4,000"],
        ["Electric Commercial Vehicles", "Above 200 kW", "9,500"],
        ["Electric Rickshaw (E-rickshaw)", "Standard Urban Transit", "3,400"],
        [
          "Two-Wheelers (Commercial / Rental)",
          "All Engine Capacities",
          "3,000",
        ],
      ],
    },
    followUps: [
      "What are the unified personal income tax slabs for FY 2083/84?",
      "What cash transaction limits apply under Section 21(2)?",
      "What is the CSR expenditure deduction limit under Section 12D?",
    ],
  }),
  buildModule1Entry({
    id: "fb2083-sec-57-vc-pe-share-transfer",
    question:
      "What is the capital gains tax treatment for ownership transfers involving venture capital and private equity funds under the newly inserted proviso to Section 57?",
    shortTopic: "Venture Capital and Private Equity Share Transfer Exemption",
    keywords: [
      "Section 57",
      "Venture Capital",
      "Private Equity",
      "Change in Control",
      "Startups",
    ],
    answer:
      "Section 57(11) of Finance Bill, 2083 substitutes the proviso to Section 57(1) of the Income Tax Act, 2058. It excludes three situations from triggering deemed disposal under the 50% change-in-ownership rule: (a) capital increases in a startup, venture capital, or private equity fund where existing shareholders' or partners' share count and paid-up capital remain unchanged and new shareholders or partners are added; (b) involuntary transfers of interest to legal heirs upon the death of a beneficiary; and (c) downstream ownership changes in another resident entity solely resulting from an ownership change in a qualifying upstream resident entity.",
    citation: "Section 57(11) (amending proviso to Section 57(1))",
    reasoningSteps: [
      "Review Section 57 mechanics: An entity undergoing a 50% or greater ownership change within three years is generally deemed to have disposed of its assets and liabilities.",
      "Identify startup, VC, and PE relief: Adding new shareholders or partners to increase capital in a startup, venture capital, or private equity fund does not trigger Section 57 provided existing holders' share count and capital stay intact.",
      "Check additional statutory carve-outs: Involuntary transfers to legal heirs on a beneficiary's death and consequential ownership shifts in downstream resident entities are also excluded.",
    ],
    rateTable: {
      title: "Section 57(1) Proviso Exclusions under Finance Bill, 2083",
      columns: [
        "Transaction Context",
        "Required Condition",
        "Section 57 Deemed Disposal Impact",
      ],
      rows: [
        [
          "General Commercial Entity",
          "Cumulative ≥ 50% ownership change in 3 years",
          "Deemed disposal triggered under Section 57",
        ],
        [
          "Startup, VC, or PE Capital Increase",
          "New investors join while existing share count & capital remain unchanged",
          "Excluded under amended Section 57(1) Proviso",
        ],
        [
          "Beneficiary Death / Legal Heir Transfer",
          "Involuntary disposal passing interest to legal heirs",
          "Excluded under amended Section 57(1) Proviso",
        ],
      ],
    },
    followUps: [
      "How does Section 8(3)(e) treat sweat equity for IT industry employees?",
      "What are the Safe Harbour benchmarks for IT exports under Section 33A?",
      "How are share and debenture issuance costs treated under Section 21(3)?",
    ],
  }),
];
