import type { MockQAPair } from "../mock-tax-chat";
import { buildIncomeTax2081QaEntry } from "./income-tax-2081-helpers";

export const INCOME_TAX_2081_MODULES_1_4_EN: MockQAPair[] = [
  // Module 1: Statutory Architecture, Jurisdiction & Tax Residency
  buildIncomeTax2081QaEntry({
    id: "ita2081-m1-residency-183-day",
    question:
      "A foreign IT consultant resides in Kathmandu for 120 days in FY 2080/81 and 75 days in the first quarter of FY 2081/82. Does the individual qualify as a resident natural person in Nepal for tax purposes, and what is the scope of their taxable income?",
    shortTopic: "183-Day Physical Presence Residency Test",
    category: "Income Tax",
    subTopic: "Tax Residency",
    keywords: [
      "Residency",
      "Section 2(ao)",
      "183 Days",
      "Continuous 365 Days",
      "Worldwide Income",
    ],
    answer:
      "Yes, the individual qualifies as a resident natural person under Section 2(ao)(1) of the Income Tax Act, 2058. The statutory test evaluates physical presence for 183 days or more during a continuous period of 365 days across fiscal year boundaries. Having stayed 195 days (120 + 75) within a continuous 365-day window, the consultant becomes a resident taxpayer and is subject to Nepalese direct tax on worldwide assessable income under Section 4.",
    citationTitle: "Income Tax Act, 2058",
    citation: "Section 2(ao)(1), Section 4",
    sourceKind: "ita-2058",
    reasoningSteps: [
      "Identify the statutory definition of a resident natural person under Section 2(ao)(1).",
      "Check whether the 183-day test applies across year boundaries: it evaluates 183 days or more during a continuous period of 365 days.",
      "Sum cumulative days of presence across consecutive fiscal years: 120 days + 75 days = 195 days within a continuous 365-day window.",
      "Apply Section 4: conclude that worldwide income derived from employment, business, or investment becomes assessable in Nepal once resident status is triggered.",
    ],
    rateTable: {
      title: "Natural Person Residency Criteria",
      columns: ["Criterion", "Statutory Benchmark", "Legal Basis"],
      rows: [
        [
          "Physical Presence",
          "≥ 183 days in a continuous 365-day period",
          "Section 2(ao)(1)(b)",
        ],
        [
          "Normal Abode",
          "Habitual or permanent place of abode situated in Nepal",
          "Section 2(ao)(1)(a)",
        ],
        [
          "Foreign Deputation",
          "Employee of Government of Nepal posted abroad",
          "Section 2(ao)(1)(c)",
        ],
      ],
    },
    followUps: [
      "How is a Foreign Permanent Establishment taxed on profit repatriation under Section 68?",
      "What are the four statutory heads of income under Section 5?",
      "How are individual tax slabs computed for FY 2081/82 with SSF contributions?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m1-fpe-repatriation-tax",
    question:
      "A multinational firm incorporated in Singapore operates a branch office in Birgunj. How is the branch classified under the Income Tax Act, and what special tax applies when it remits profits to its foreign head office?",
    shortTopic: "Foreign Permanent Establishment & Repatriation Tax",
    category: "Income Tax",
    subTopic: "Corporate Governance & International Tax",
    keywords: [
      "Foreign Permanent Establishment",
      "FPE",
      "Section 2(ay)",
      "Section 68",
      "Profit Repatriation",
      "Branch Tax",
    ],
    answer:
      "Under Section 2(ay) (read with Section 2(x)(4)) and Section 3(b) of the Income Tax Act, 2058, a Nepalese permanent establishment of a non-resident person is classified as a Foreign Permanent Establishment (FPE) and taxed on its Nepal-sourced income at the standard corporate rate of 25%. In addition, under Section 68(3)–(4) and Schedule 1 Section 2(6), when the FPE sends income abroad to its foreign head office, it is subject to a 5% branch profit repatriation tax (amended from 10% in earlier consolidations), which constitutes a final withholding tax under Section 92.",
    citationTitle: "Income Tax Act, 2058",
    citation:
      "Section 2(ay), Section 3(b), Section 68, Schedule 1 Section 2(6), Section 92",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Classify the entity as a Foreign Permanent Establishment under Section 2(ay) and Section 2(x)(4) due to maintaining a permanent establishment (Section 2(aab)) in Nepal.",
      "Determine corporate income tax liability under Section 3(b) restricted to Nepal-sourced income.",
      "Apply Section 68(3)–(4) and Schedule 1 Section 2(6) on income sent abroad by the FPE at the 5% repatriation rate.",
      "Confirm characterization under Section 92 as a final withholding tax settlement.",
    ],
    rateTable: {
      title: "FPE Tax Treatment Matrix",
      columns: ["Taxable Event", "Applicable Rate", "Statutory Provision"],
      rows: [
        [
          "Net Nepal-Sourced Business Income",
          "25%",
          "Section 3(b) & Schedule 1 Sec 2(1)",
        ],
        [
          "Foreign Remittance of Repatriated Profit",
          "5%",
          "Section 68, Schedule 1 Sec 2(6) & Sec 92",
        ],
      ],
    },
    followUps: [
      "What happens when a resident entity undergoes a 50% ownership change under Section 57?",
      "How does the Digital Service Tax (DST) interact with Digital PE rules?",
      "What withholding rate applies when BFIs pay interest on foreign currency loans?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m1-statutory-heads-of-income",
    question:
      "How are the four statutory heads of assessable income distinguished under Section 5, and which heads permit statutory deductions for approved retirement contributions under Section 63?",
    shortTopic: "Statutory Heads of Income & Deductions",
    category: "Income Tax",
    subTopic: "Statutory Architecture",
    keywords: [
      "Section 5",
      "Section 7",
      "Section 8",
      "Section 9",
      "Assessable Income",
      "Section 63",
      "Retirement Contribution",
      "Taxable Income",
    ],
    answer:
      "Section 5 categorizes income into four heads: Business Income (Section 7), Employment Income (Section 8), Investment Income (Section 9), and Windfall Gains. Under Section 63, allowable deductions for contributions to an approved retirement fund (EPF, CIT, SSF, or the Pension Fund under the Pension Fund Act, 2075) are subtracted from aggregate assessable income across business, employment, and investment heads, capped at the lowest of actual contributions, one-third of total assessable income, or NPR 500,000. Windfall gains are subjected to final withholding under Section 88A and Section 92 and excluded from assessable income.",
    citationTitle: "Income Tax Act, 2058",
    citation: "Section 5, Section 7, Section 8, Section 9, Section 63",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Identify the four statutory income categories under Section 5: Business (Section 7), Employment (Section 8), Investment (Section 9), and Windfall Gains.",
      "Exclude Windfall Gains from assessable income because they are taxed via final withholding under Section 88A and Section 92.",
      "Aggregate assessable income from business, employment, and investment.",
      "Apply the statutory three-way cap under Section 63 to derive taxable income after allowable retirement contributions.",
    ],
    rateTable: {
      title: "Statutory Heads of Income",
      columns: ["Statutory Head", "Governing Section", "Tax Base Interaction"],
      rows: [
        ["Business Income", "Section 7", "Aggregated for taxable income"],
        ["Employment Income", "Section 8", "Aggregated for taxable income"],
        ["Investment Income", "Section 9", "Aggregated for taxable income"],
        [
          "Windfall Gains",
          "Section 88A / Section 92",
          "Final withholding; excluded from assessable base",
        ],
      ],
    },
    followUps: [
      "What retirement funds qualify as 'approved' under amended Section 63?",
      "How does the 183-day physical presence residency rule apply across fiscal years?",
      "How are windfall gains on literary or cultural awards taxed under Section 88A?",
    ],
  }),

  // Module 2: Business Income Computation, Deductibility & Thin Capitalization
  buildIncomeTax2081QaEntry({
    id: "ita2081-m2-sec-16-repair-maintenance-cap",
    question:
      "A manufacturing company incurs NPR 2,500,000 in repair and maintenance expenses on Pool D plant machinery having a written-down value (WDV) of NPR 20,000,000 at the start of FY 2081/82. What amount can be expensed under Section 16, and how is the excess treated?",
    shortTopic: "Section 16 Repair & Maintenance Statutory Cap",
    category: "Income Tax",
    subTopic: "Deductions & Depreciation",
    keywords: [
      "Section 16",
      "Repair and Maintenance",
      "7 Percent Cap",
      "Capitalization",
      "Pool D",
    ],
    answer:
      "Under Section 16(2) (reflecting the 7% ceiling enacted via Finance Act amendments; historical 2013 consolidations stated 5%), the deduction for repair and maintenance expenses for a depreciable asset pool is capped at 7% of the depreciation base amount of that pool at the end of the income year. For Pool D with a base of NPR 20,000,000, the maximum deductible repair expense is NPR 1,400,000 (7% of NPR 20,000,000). Under Section 16(3), the unabsorbed excess of NPR 1,100,000 (NPR 2,500,000 - NPR 1,400,000) cannot be expensed immediately and is added to the depreciation base of Pool D under Schedule 2 Section 2(5) for future depreciation.",
    citationTitle: "Income Tax Act, 2058",
    citation: "Section 16(2), Section 16(3), Schedule 2 Section 2(5)",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Determine the depreciation base amount for Pool D: NPR 20,000,000.",
      "Calculate the statutory allowable repair ceiling: 7% × NPR 20,000,000 = NPR 1,400,000.",
      "Compare actual expenditure (NPR 2,500,000) against the statutory cap (NPR 1,400,000).",
      "Allow NPR 1,400,000 as a current-year expense under Section 16(2).",
      "Capitalize the excess NPR 1,100,000 into Pool D's depreciation base under Section 16(3) and Schedule 2 Section 2(5).",
    ],
    rateTable: {
      title: "Section 16 Repair Expense Breakdown",
      columns: ["Component", "Amount (NPR)", "Accounting / Tax Treatment"],
      rows: [
        ["Pool D Depreciation Base", "20,000,000", "Baseline for 7% threshold"],
        ["Total Actual Repairs", "2,500,000", "Total incurred in income year"],
        [
          "Statutory Deduction Allowed",
          "1,400,000",
          "Expensed under Section 16(2)",
        ],
        [
          "Capitalized Excess Balance",
          "1,100,000",
          "Added to Pool D base under Sec 16(3)",
        ],
      ],
    },
    followUps: [
      "How is a terminal Pool B WDV below NPR 2,000 treated under Schedule 2?",
      "How does thin capitalization under Section 14(2) limit interest deductions?",
      "What corporate tax concessions apply to special manufacturing industries under Section 11?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m2-sec-14-thin-capitalization",
    question:
      "A resident entity controlled by a foreign parent earns interest income of NPR 500,000 and calculates an Adjusted Taxable Income (ATI) of NPR 6,000,000 in FY 2081/82. If it pays NPR 4,200,000 in interest on loans from its foreign parent, how much interest is deductible, and what happens to the balance?",
    shortTopic: "Thin Capitalization & Section 14(2) Interest Limitation",
    category: "Income Tax",
    subTopic: "Thin Capitalization",
    keywords: [
      "Section 14(2)",
      "Thin Capitalization",
      "Adjusted Taxable Income",
      "ATI",
      "Interest Carryforward",
    ],
    answer:
      "Under Section 14(2) of the Income Tax Act, 2058, the interest deduction of a resident entity controlled (25% or more ownership/control) by tax-exempt entities or non-resident persons is capped at all interest income included in taxable income plus 50% of taxable income computed without interest income or interest deductions (Adjusted Taxable Income). The deductible cap is NPR 3,500,000 (NPR 500,000 + 0.50 × NPR 6,000,000). Out of NPR 4,200,000 paid, NPR 3,500,000 is allowed, while the excess NPR 700,000 is disallowed in FY 2081/82 and carried forward under Section 14(3).",
    citationTitle: "Income Tax Act, 2058",
    citation: "Section 14(2), Section 14(3), Section 2(ka na 1)",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Verify Section 14(2) applicability: payer is a resident entity subject to 25% or more control by a non-resident associated person.",
      "Apply the statutory limitation: Deductible Cap = Interest Income + (50% × ATI).",
      "Compute: NPR 500,000 + (0.50 × NPR 6,000,000) = NPR 500,000 + NPR 3,000,000 = NPR 3,500,000.",
      "Identify excess interest: NPR 4,200,000 - NPR 3,500,000 = NPR 700,000.",
      "Disallow NPR 700,000 in FY 2081/82 and carry it forward to subsequent income years under Section 14(3).",
    ],
    rateTable: {
      title: "Section 14(2) Thin Capitalization Computation",
      columns: ["Calculation Step", "Formula / Amount", "Statutory Reference"],
      rows: [
        ["Interest Income", "NPR 500,000", "Section 14(2)(a)"],
        [
          "50% of ATI",
          "0.50 × NPR 6,000,000 = NPR 3,000,000",
          "Section 14(2)(b)",
        ],
        [
          "Maximum Deductible Interest",
          "NPR 3,500,000",
          "Section 14(2) Ceiling",
        ],
        [
          "Disallowed & Carried Forward",
          "NPR 700,000",
          "Section 14(3) Carryforward",
        ],
      ],
    },
    followUps: [
      "Are carried-forward Section 14(3) interest balances lost upon a 50% change of control under Section 57?",
      "What TDS rate applies when BFIs pay interest on foreign currency loans?",
      "How does Section 21 treat cash salary payments above NPR 25,000?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m2-sec-21-banking-channel-salary",
    question:
      "A trading firm pays its general manager NPR 60,000 per month in cash as salary without routing it through a commercial bank. Can the employer claim this NPR 720,000 annual remuneration as a deductible business expense under Finance Act 2081?",
    shortTopic: "Mandatory Banking Channel Salary Disallowance",
    category: "Income Tax",
    subTopic: "Deductions & Disallowances",
    keywords: [
      "Section 21",
      "Salary Disallowance",
      "Banking Channel",
      "NPR 25,000 Threshold",
      "Finance Act 2081",
    ],
    answer:
      "No, the entire remuneration of NPR 720,000 is disallowed as a deductible expense. Under Section 21 of the Income Tax Act, 2058 as amended through Finance Act 2081 (alongside the general NPR 50,000 cash expense bar in Section 21(2)), any employee remuneration exceeding NPR 25,000 per month per individual paid in cash rather than through formal banking channels is disallowed as a deductible business expense.",
    citationTitle: "Income Tax Act, 2058 / Finance Act 2081",
    citation: "Section 21, Finance Act 2081 Remuneration Provision",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Review general expense deductibility criteria under Section 13.",
      "Examine statutory disallowances under Section 21 and Finance Act 2081 amendments.",
      "Check the monthly remuneration threshold: individual monthly pay exceeds NPR 25,000 (here, NPR 60,000).",
      "Identify the payment mode: cash disbursement bypassing banking channels.",
      "Conclude full disallowance of the salary expense under Section 21.",
    ],
    rateTable: {
      title: "Salary Payment Deductibility Rules",
      columns: [
        "Monthly Salary Level",
        "Payment Method",
        "Deductibility Status",
      ],
      rows: [
        ["Up to NPR 25,000", "Cash or Banking Channel", "Fully Deductible"],
        [
          "Exceeding NPR 25,000",
          "Banking Channel (Cheque/Transfer)",
          "Fully Deductible",
        ],
        ["Exceeding NPR 25,000", "Cash Payment", "Completely Disallowed"],
      ],
    },
    followUps: [
      "What are the 2081/82 individual income tax slabs for employees registered with SSF?",
      "How does Section 63 cap deductions for approved retirement fund contributions?",
      "What penalties apply under Chapter 22 for failing to remit TDS within 25 days?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m2-sch2-de-minimis-wdv-writeoff",
    question:
      "At the end of FY 2081/82, a company's Pool B depreciable asset balance has a remaining Written-Down Value of NPR 1,850 after subtracting standard depreciation. What is the tax accounting treatment under Schedule 2?",
    shortTopic: "Pool Asset De Minimis WDV Terminal Write-Off",
    category: "Income Tax",
    subTopic: "Depreciation Mechanics",
    keywords: [
      "Schedule 2",
      "Schedule 2 Section 2(6)",
      "Pool B",
      "NPR 2,000 Rule",
      "Terminal Depreciation",
      "Asset Write-Off",
    ],
    answer:
      "Under Schedule 2, Section 2(6) of the Income Tax Act, 2058, if after deducting standard depreciation computed under Section 2(2) the remaining depreciation base of any Pool A, B, C, or D depreciable asset class is less than NPR 2,000, the entire remaining balance is treated as additional depreciation cost for that income year, reducing the closing pool balance to zero.",
    citationTitle: "Income Tax Act, 2058",
    citation: "Schedule 2, Section 2(6)",
    sourceKind: "ita-2058",
    reasoningSteps: [
      "Determine the residual depreciation base of Pool B at year-end after standard depreciation: NPR 1,850.",
      "Apply Schedule 2, Section 2(6): if the remaining balance of Pool A, B, C, or D is less than NPR 2,000, the remainder is claimed as additional depreciation.",
      "Verify that NPR 1,850 is less than NPR 2,000.",
      "Deduct the full NPR 1,850 as additional depreciation, bringing the closing Pool B balance to zero.",
    ],
    rateTable: {
      title: "Depreciation Pool Classes & Rates (Schedule 2)",
      columns: [
        "Pool",
        "Asset Category",
        "Standard Rate",
        "De Minimis Write-off",
      ],
      rows: [
        [
          "Pool A",
          "Buildings, structures",
          "5%",
          "Balance < NPR 2,000 (Sec 2(6))",
        ],
        [
          "Pool B",
          "Office equipment, computers",
          "25%",
          "Balance < NPR 2,000 (Sec 2(6))",
        ],
        [
          "Pool C",
          "Automobiles, buses",
          "20%",
          "Balance < NPR 2,000 (Sec 2(6))",
        ],
        [
          "Pool D",
          "Heavy plant, machinery",
          "15%",
          "Balance < NPR 2,000 (Sec 2(6))",
        ],
        [
          "Pool E",
          "Intangibles",
          "Cost ÷ useful life (nearest 0.5 yr)",
          "Amortized to zero",
        ],
      ],
    },
    followUps: [
      "How are excess repair expenses added to the asset pool under Section 16(3)?",
      "What happens to asset depreciation bases upon a 50% change of control under Section 57?",
      "Which entities receive an extra one-third depreciation rate under Schedule 2 Section 3(2)?",
    ],
  }),

  // Module 3: Rate Architecture, Personal Taxation & Presumptive Regimes
  buildIncomeTax2081QaEntry({
    id: "ita2081-m3-personal-slabs-39-percent-ssf",
    question:
      "A resident individual employee registered with the Contribution-Based Social Security Fund (SSF) earns a taxable employment income of NPR 6,500,000 in FY 2081/82. How is their total income tax liability computed across each marginal tax slab, including the top super-tax tier?",
    shortTopic: "Personal Income Tax Slabs & 39% Top Marginal Rate",
    category: "Income Tax",
    subTopic: "Personal Income Tax",
    keywords: [
      "Individual Tax Slabs",
      "Social Security Tax",
      "SSF Exemption",
      "39 Percent Surcharge",
      "Schedule 1",
    ],
    answer:
      "Because the employee contributes to the Contribution-Based Social Security Fund (SSF), the initial NPR 500,000 slab is exempt from the 1% Social Security Tax (SST). The remaining income is taxed progressively: next NPR 200,000 @ 10% (NPR 20,000), next NPR 300,000 @ 20% (NPR 60,000), next NPR 1,000,000 @ 30% (NPR 300,000), next NPR 3,000,000 @ 36% (NPR 1,080,000), and the balance of NPR 1,500,000 exceeding NPR 5,000,000 @ 39% (30% base + 30% surcharge on base, equaling NPR 585,000). Total tax liability is NPR 2,045,000.",
    citationTitle: "Income Tax Act, 2058 / Finance Act 2081",
    citation: "Schedule 1, Section 1(1) & Section 1(2)",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Check SSF contribution status under Schedule 1: the 1% SST on the first NPR 500,000 is waived for SSF contributors, resulting in NPR 0 tax on Band 1.",
      "Apply Band 2 (NPR 500,001 – 700,000): NPR 200,000 × 10% = NPR 20,000.",
      "Apply Band 3 (NPR 700,001 – 1,000,000): NPR 300,000 × 20% = NPR 60,000.",
      "Apply Band 4 (NPR 1,000,001 – 2,000,000): NPR 1,000,000 × 30% = NPR 300,000.",
      "Apply Band 5 (NPR 2,000,001 – 5,000,000): NPR 3,000,000 × 36% = NPR 1,080,000.",
      "Apply Band 6 (> NPR 5,000,000): NPR 1,500,000 is taxed at the top marginal rate of 39% (effective 30% + 30% surcharge on tax): NPR 1,500,000 × 39% = NPR 585,000.",
      "Sum the slab liabilities: NPR 0 + NPR 20,000 + NPR 60,000 + NPR 300,000 + NPR 1,080,000 + NPR 585,000 = NPR 2,045,000.",
    ],
    rateTable: {
      title: "Individual Tax Calculation (NPR 6.5M Taxable Income with SSF)",
      columns: [
        "Income Slab (NPR)",
        "Taxable Amount",
        "Tax Rate",
        "Tax Liability (NPR)",
      ],
      rows: [
        ["First 500,000", "500,000", "0% (SST Waived due to SSF)", "0"],
        ["500,001 – 700,000", "200,000", "10%", "20,000"],
        ["700,001 – 1,000,000", "300,000", "20%", "60,000"],
        ["1,000,001 – 2,000,000", "1,000,000", "30%", "300,000"],
        ["2,000,001 – 5,000,000", "3,000,000", "36%", "1,080,000"],
        ["Above 5,000,000", "1,500,000", "39%", "585,000"],
        ["Total", "6,500,000", "Progressive / Surcharge", "2,045,000"],
      ],
    },
    followUps: [
      "How does the 10% female employee tax rebate apply under Schedule 1?",
      "What are the three-way contribution ceilings under Section 63?",
      "Which professionals are barred from presumptive taxation under Section 4(4B)?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m3-female-employee-10-percent-rebate",
    question:
      "A resident female professional earns NPR 1,800,000 exclusively from employment remuneration in Nepal with no other sources of business or investment income. How does the statutory female tax rebate apply to her calculated tax liability for FY 2081/82?",
    shortTopic: "Female Employee Direct Tax Rebate",
    category: "Income Tax",
    subTopic: "Tax Credits & Concessions",
    keywords: [
      "Female Tax Rebate",
      "10 Percent Credit",
      "Sole Employment Income",
      "Schedule 1",
      "Section 50",
    ],
    answer:
      "Under Schedule 1, Clause 1(11), a resident female natural person whose assessable income is derived solely from employment in Nepal is entitled to a 10% tax rebate credited directly against her final calculated tax liability. Her gross tax liability before rebate on NPR 1,800,000 is NPR 325,000 (assuming normal 1% SST). Applying the 10% statutory female rebate reduces her tax liability by NPR 32,500, resulting in a net payable tax of NPR 292,500.",
    citationTitle: "Income Tax Act, 2058",
    citation: "Schedule 1, Section 1(11)",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Verify qualification conditions: taxpayer is a resident female natural person deriving assessable income solely from employment in Nepal.",
      "Compute gross individual tax across brackets: First NPR 500,000 @ 1% = NPR 5,000; next NPR 200,000 @ 10% = NPR 20,000; next NPR 300,000 @ 20% = NPR 60,000; next NPR 800,000 @ 30% = NPR 240,000. Total gross tax = NPR 325,000.",
      "Calculate 10% tax rebate: NPR 325,000 × 10% = NPR 32,500.",
      "Subtract rebate from gross tax: NPR 325,000 - NPR 32,500 = NPR 292,500.",
    ],
    rateTable: {
      title: "Female Employee Tax Rebate Breakdown",
      columns: ["Component", "Calculation Base", "Rate", "Amount (NPR)"],
      rows: [
        [
          "Gross Tax Liability",
          "NPR 1,800,000 Taxable Income",
          "Progressive Slabs",
          "325,000",
        ],
        ["Female Tax Rebate", "Gross Tax Liability", "10%", "-32,500"],
        [
          "Net Payable Tax",
          "Gross Tax less Rebate",
          "Effective 16.25%",
          "292,500",
        ],
      ],
    },
    followUps: [
      "How does SSF participation alter the first NPR 500,000 SST slab?",
      "Are cash salaries exceeding NPR 25,000 per month deductible for employers?",
      "What are the statutory contribution caps under Section 63?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m3-presumptive-tax-professional-exclusion",
    question:
      "Can a certified chartered accountant or medical doctor operating a private practice in Lalitpur with an annual turnover of NPR 2,400,000 and profit of NPR 250,000 opt for presumptive taxation under Section 4(4)?",
    shortTopic: "Exclusion of Professional Experts from Presumptive Regimes",
    category: "Income Tax",
    subTopic: "Presumptive Taxation",
    keywords: [
      "Section 4(4)",
      "Section 4(4B)",
      "Presumptive Tax",
      "Professional Services",
      "Consultancy Exclusion",
    ],
    answer:
      "No. Under Section 4(4B) of the Income Tax Act, 2058, natural persons providing specialized professional, consultancy, or expert services—specifically including doctors, engineers, auditors, lawyers, consultants, players, and artists—are strictly prohibited from opting into the presumptive tax regime under Section 4(4) or the turnover tax regime under Section 4(4A). They must maintain regular books of account and compute net taxable business income under general statutory rules.",
    citationTitle: "Income Tax Act, 2058 / Finance Act 2081",
    citation: "Section 4(4), Section 4(4A), Section 4(4B)",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Check turnover and profit against Section 4(4) general ceilings: turnover is below NPR 3,000,000 and profit is below NPR 300,000.",
      "Review the statutory occupational restrictions under Section 4(4B) and the Section 4(4A) proviso.",
      "Identify the taxpayer's activity as an audit, legal, medical, or consultancy professional service.",
      "Determine that Section 4(4B) bars designated professional service providers from presumptive tax schemes regardless of low turnover.",
      "Conclude that the practitioner must file full financial returns under normal accounting standards.",
    ],
    rateTable: {
      title: "Presumptive Taxation Eligibility Matrix",
      columns: [
        "Taxpayer Category",
        "Turnover / Profit Limits",
        "Eligibility Status",
        "Statutory Rule",
      ],
      rows: [
        [
          "Small Retailers / Traders",
          "Turnover ≤ NPR 3M; Profit ≤ NPR 300k",
          "Eligible (NPR 2,500 – 7,500 fixed)",
          "Section 4(4)",
        ],
        [
          "Medium Traders",
          "Turnover NPR 3M – 10M; Profit ≤ NPR 1M",
          "Eligible (Turnover %)",
          "Section 4(4A)",
        ],
        [
          "Professionals (Doctors, CAs, Lawyers)",
          "Any turnover / profit level",
          "Ineligible (Mandatory Net Income)",
          "Section 4(4B)",
        ],
      ],
    },
    followUps: [
      "What are the three advance tax installment deadlines under Section 94?",
      "What is the VAT registration threshold for service providers under Finance Act 2081?",
      "How is Section 118 shortfall interest evaluated against the 90% safe harbor?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m3-sec-63-approved-retirement-fund",
    question:
      "What are the statutory contribution limits for approved retirement funds under Section 63, and which specific retirement funds qualify as 'approved' under the amended Act?",
    shortTopic: "Approved Retirement Fund Statutory Caps & Qualification",
    category: "Income Tax",
    subTopic: "Deductions & Allowances",
    keywords: [
      "Section 63",
      "Approved Retirement Fund",
      "EPF",
      "CIT",
      "SSF",
      "NPR 500,000 Limit",
    ],
    answer:
      "Under Section 63(2) as amended, approved retirement funds are statutorily restricted to four specific entities: the Employee Provident Fund (EPF), the Citizen Investment Trust (CIT), the Contribution-Based Social Security Fund (SSF), and the Pension Fund established under the Pension Fund Act, 2075. Under Section 63(3) / Rule 21, the allowable deduction from assessable income is capped at the lowest of: (a) actual contribution made during the year, (b) one-third (33.33%) of total assessable income, or (c) NPR 500,000.",
    citationTitle: "Income Tax Act, 2058 / Finance Act 2081",
    citation: "Section 63(1), Section 63(2) Clarification, Section 63(3)",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Review the statutory scope of approved retirement funds under Section 63(2).",
      "Identify the 4 qualifying institutional funds: EPF Act 2019, CIT Act 2047, SSF Act 2074, and Pension Fund Act 2075.",
      "Evaluate the three-way statutory limitation formula under Section 63.",
      "Apply the upper ceiling of NPR 500,000 as the maximum monetary cap deductible against aggregate assessable income.",
    ],
    rateTable: {
      title: "Retirement Fund Deduction Benchmark",
      columns: ["Criterion", "Statutory Threshold", "Governing Provision"],
      rows: [
        [
          "Actual Outlay",
          "Actual amount contributed during income year",
          "Section 63 / Rule 21",
        ],
        [
          "Income Proportion",
          "One-third (33.33%) of assessable income",
          "Section 63 / Rule 21",
        ],
        ["Monetary Cap", "NPR 500,000 per income year", "Section 63 / Rule 21"],
      ],
    },
    followUps: [
      "Which heads of income under Section 5 can be offset by Section 63 deductions?",
      "How is lump-sum retirement payment taxed under Section 65?",
      "Does SSF registration waive the 1% Social Security Tax on the first slab?",
    ],
  }),

  // Module 4: Withholding Tax (TDS), Advance vs. Final Withholding & Compliance
  buildIncomeTax2081QaEntry({
    id: "ita2081-m4-sec-88-freight-carriage-tds",
    question:
      "A commercial enterprise hires a transport operator to deliver commercial inventory. The transport operator charges NPR 200,000. How does the TDS withholding rate differ if the operator issues a VAT invoice versus a non-VAT bill under Section 88?",
    shortTopic: "TDS on Freight & Carriage Services",
    category: "Income Tax",
    subTopic: "Withholding Tax (TDS)",
    keywords: [
      "Section 88(1)",
      "Freight TDS",
      "Carriage Services",
      "VAT Invoice",
      "2.5 Percent",
      "1.5 Percent",
    ],
    answer:
      "Under Section 88(1) (Clause 8 / freight proviso) of the Income Tax Act, 2058, if the freight service provider or carriage vehicle rental operator is registered under VAT and issues a VAT invoice, the payer must deduct TDS at the reduced rate of 1.5% on the taxable amount excluding VAT. If the transport provider is not registered under VAT and issues a non-VAT bill, the payer must deduct TDS at 2.5% on the gross payment amount.",
    citationTitle: "Income Tax Act, 2058",
    citation: "Section 88(1) (Freight & Carriage Clause)",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Classify the payment nature: freight and transportation service / carriage rental under Section 88(1).",
      "Evaluate VAT registration status of the payee: a VAT-registered invoice triggers the 1.5% concessional withholding rate on the net taxable base.",
      "Evaluate non-VAT status: non-registered service providers trigger the standard 2.5% withholding rate.",
      "Note withholding classification: both rates represent advance withholding taxes creditable against final tax liability.",
    ],
    rateTable: {
      title: "Freight & Carriage Service TDS Comparison",
      columns: [
        "Invoice Type",
        "TDS Rate",
        "Taxable Base",
        "TDS on NPR 200,000",
      ],
      rows: [
        ["VAT Tax Invoice", "1.5%", "Taxable amount (excl. VAT)", "NPR 3,000"],
        ["Non-VAT General Bill", "2.5%", "Gross invoice amount", "NPR 5,000"],
      ],
    },
    followUps: [
      "How does the 10-day aggregation rule work for Section 89 contract TDS?",
      "What are the deadlines and penalties for e-TDS filings under Section 90 and Chapter 22?",
      "What TDS rate applies to foreign currency borrowings by BFIs under Finance Act 2081?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m4-sec-88-foreign-currency-loan-tds",
    question:
      "A resident 'A' class commercial bank pays interest on a USD-denominated borrowing obtained from an international commercial bank to finance domestic priority sector infrastructure. What is the applicable TDS rate under Finance Act 2081?",
    shortTopic: "TDS Reduction on Foreign Currency Borrowings",
    category: "Income Tax",
    subTopic: "Withholding Tax (TDS)",
    keywords: [
      "Section 88(1)(9)",
      "Foreign Currency Loan",
      "BFI Borrowing",
      "5 Percent Withholding",
      "Finance Act 2081",
    ],
    answer:
      "Under Section 88(1)(9) as amended by Finance Act 2081, interest paid by resident banks and financial institutions on foreign currency loans obtained from foreign banks or financial institutions to invest in sectors prescribed by Nepal Rastra Bank attracts a reduced withholding tax rate of 5% (reduced from the previous rate of 10%).",
    citationTitle: "Income Tax Act, 2058 / Finance Act 2081",
    citation: "Section 88(1)(9)",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Identify the payer as a resident BFI licensed by Nepal Rastra Bank.",
      "Identify the loan structure: foreign currency facility provided by a foreign bank or financial institution.",
      "Verify the investment condition: proceeds deployed into sectors prescribed by Nepal Rastra Bank.",
      "Apply the statutory rate reduction under Finance Act 2081: reduced from 10% to 5%.",
    ],
    rateTable: {
      title: "Foreign Loan Interest Withholding Rates",
      columns: [
        "Loan Arrangement",
        "Rate in FY 2080/81",
        "Rate in FY 2081/82",
        "Legal Authority",
      ],
      rows: [
        [
          "BFI Foreign Currency Borrowing for NRB Sectors",
          "10%",
          "5%",
          "Section 88(1)(9)",
        ],
        [
          "Hydropower (> 200 MW) Foreign Currency Loan",
          "5%",
          "5%",
          "Section 88(1) Proviso",
        ],
        [
          "Standard Foreign Debt (General)",
          "15%",
          "15%",
          "Section 88(1) General",
        ],
      ],
    },
    followUps: [
      "How is interest paid by a controlled entity capped under Section 14(2) thin capitalization?",
      "Is TDS withheld on interest paid to a non-resident treated as a final withholding under Section 92?",
      "What are the remittance timelines under Section 90?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m4-sec-88a-windfall-gains-500k",
    question:
      "A literary author receives a national award of NPR 800,000 in recognition of lifetime contributions to literature and art. What amount of windfall gain tax must be withheld under Section 88A as amended by Finance Act 2081?",
    shortTopic: "Windfall Gains & NPR 500k Cultural Award Exemption",
    category: "Income Tax",
    subTopic: "Withholding Tax (TDS)",
    keywords: [
      "Section 88A",
      "Windfall Gains",
      "Section 92",
      "25 Percent",
      "NPR 500,000 Exemption",
      "Finance Act 2081",
    ],
    answer:
      "Under Section 88A(2) of the Income Tax Act, 2058 as amended by Finance Act 2081, national and international prizes up to NPR 500,000 awarded for contributions to literature, art, culture, sports, journalism, science, technology, and public administration are fully exempt from windfall gains tax. When an award exceeds NPR 500,000, 25% final withholding tax applies only to the excess amount. The taxable excess is NPR 300,000 (NPR 800,000 - NPR 500,000), resulting in a final tax deduction of NPR 75,000 (25% of NPR 300,000).",
    citationTitle: "Income Tax Act, 2058 / Finance Act 2081",
    citation: "Section 88A(1), Section 88A(2), Section 92",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Categorize the receipt as a windfall gain award under Section 88A.",
      "Verify the field of recognition: literature and art qualify under Section 88A(2) statutory fields.",
      "Apply the statutory threshold exemption: the first NPR 500,000 is exempt.",
      "Compute the taxable excess: NPR 800,000 - NPR 500,000 = NPR 300,000.",
      "Calculate final withholding tax under Section 92: 25% × NPR 300,000 = NPR 75,000.",
    ],
    rateTable: {
      title: "Cultural Award Windfall Gain Taxation",
      columns: ["Component", "Statutory Rule", "Amount (NPR)"],
      rows: [
        ["Total Award Amount", "National literature prize", "800,000"],
        ["Statutory Exemption", "Section 88A(2) threshold limit", "-500,000"],
        ["Taxable Excess", "Subject to 25% rate", "300,000"],
        ["Final Tax Deducted", "25% of taxable excess", "75,000"],
      ],
    },
    followUps: [
      "Why are windfall gains excluded from Section 5 assessable income aggregation?",
      "What payments constitute final withholding under Section 92?",
      "What penalties apply if a withholding agent fails to deposit deducted TDS?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m4-sec-89-contract-10-day-aggregation",
    question:
      "A construction company enters into a supply contract with a vendor. It makes three payments within an eight-day window: NPR 20,000 on Day 1, NPR 25,000 on Day 4, and NPR 15,000 on Day 8. Does the NPR 50,000 contract withholding threshold under Section 89 trigger TDS?",
    shortTopic: "Contract Payment 10-Day Aggregation Rule",
    category: "Income Tax",
    subTopic: "Withholding Tax (TDS)",
    keywords: [
      "Section 89",
      "Contract TDS",
      "NPR 50,000 Threshold",
      "10-Day Aggregation",
      "1.5 Percent",
    ],
    answer:
      "Yes, TDS is triggered. Under Section 89(2) of the Income Tax Act, 2058, to determine whether contract payments exceed the statutory threshold of NPR 50,000, any other payments made under the same contract by the payer or associated persons within the past 10 days must be aggregated. The cumulative payments total NPR 60,000 (NPR 20,000 + NPR 25,000 + NPR 15,000) within 8 days, breaching the NPR 50,000 threshold and requiring 1.5% advance tax withholding under Section 89(1).",
    citationTitle: "Income Tax Act, 2058",
    citation: "Section 89(1), Section 89(2)",
    sourceKind: "ita-2058",
    reasoningSteps: [
      "Review the general threshold for contract and supply withholding under Section 89(1): exceeding NPR 50,000.",
      "Apply the statutory aggregation rule under Section 89(2): add any payments made under the same contract within the past 10 days.",
      "Sum the three payments: NPR 20,000 + NPR 25,000 + NPR 15,000 = NPR 60,000.",
      "Conclude that because the 10-day aggregate exceeds NPR 50,000, 1.5% withholding under Section 89(1) applies.",
    ],
    rateTable: {
      title: "Section 89 Contract Aggregation Analysis",
      columns: [
        "Transaction Day",
        "Disbursement (NPR)",
        "Cumulative 10-Day Total",
        "TDS Status",
      ],
      rows: [
        ["Day 1", "20,000", "20,000", "Under threshold"],
        ["Day 4", "25,000", "45,000", "Under threshold"],
        ["Day 8", "15,000", "60,000", "Threshold breached; 1.5% TDS mandatory"],
      ],
    },
    followUps: [
      "What TDS rate applies to freight services with or without a VAT invoice?",
      "Within how many days must withheld TDS be remitted under Section 90?",
      "When is a withholding agent jointly and severally liable under Section 90(5)?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m4-sec-90-tds-remittance-penalties",
    question:
      "What statutory deadlines govern monthly TDS deposits and e-TDS return filings, and what penalties are imposed under Chapter 22 if an agent fails to submit the return or deposits late?",
    shortTopic: "TDS Remittance Timelines & Chapter 22 Penalties",
    category: "Income Tax",
    subTopic: "Compliance & Penalties",
    keywords: [
      "Section 90",
      "e-TDS",
      "Section 117",
      "Section 119",
      "15 Percent Interest",
      "2.5 Percent Fee",
    ],
    answer:
      "Withheld taxes must be deposited and corresponding e-TDS statements submitted to the Inland Revenue Department within 25 days after the end of each Nepalese calendar month under Section 90 (extended from 15 days in earlier consolidations). Under Chapter 22, late deposits incur interest at the normal rate of 15% per annum for each month and part of a month under Section 119. For late or unfiled Section 90 TDS returns, Section 117(3) imposes a fee of 2.5% per annum (1.5% in earlier consolidations) on the amount of tax required to be withheld until the return is submitted, alongside joint and several liability under Section 90(5).",
    citationTitle: "Income Tax Act, 2058",
    citation:
      "Section 90(1), Section 90(2), Section 90(5), Section 117(3), Section 119",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Establish the statutory deposit and e-TDS filing deadline under Section 90(1)–(2): within 25 days of month-end (15 days in earlier 2013 consolidation).",
      "Apply Section 119(1) for interest: 15% p.a. calculated monthly or for any part of a month on late deposits (non-recoverable from payee under Section 119(3)).",
      "Apply Section 117(3) for non-submission of Section 90 TDS returns: 2.5% p.a. levied on the withholding tax amount.",
      "Note joint and several liability under Section 90(5) between withholding agent and payee when tax is neither withheld nor paid.",
    ],
    rateTable: {
      title: "TDS Statutory Compliance Timetable & Penalties",
      columns: [
        "Compliance Obligation",
        "Statutory Due Date",
        "Penalty for Default",
        "Legal Provision",
      ],
      rows: [
        [
          "Tax Deposit",
          "Within 25 days of month-end",
          "15% p.a. interest",
          "Section 90(2) & Sec 119",
        ],
        [
          "e-TDS Return Submission",
          "Within 25 days of month-end",
          "2.5% p.a. of TDS amount",
          "Section 90(1) & Sec 117(3)",
        ],
        [
          "Unwithheld Tax Liability",
          "At payment time",
          "Joint and several liability",
          "Section 90(5)",
        ],
      ],
    },
    followUps: [
      "How does Section 118 calculate shortfall interest on advance tax installments?",
      "What pre-deposit is required to file an Administrative Review under Section 115?",
      "What contract payments trigger 1.5% TDS under Section 89?",
    ],
  }),
];
