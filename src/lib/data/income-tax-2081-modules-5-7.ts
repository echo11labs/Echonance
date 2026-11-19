import type { MockQAPair } from "../mock-tax-chat";
import { buildIncomeTax2081QaEntry } from "./income-tax-2081-helpers";

export const INCOME_TAX_2081_MODULES_5_7_EN: MockQAPair[] = [
  // Module 5: Corporate Restructuring, Statutory Change of Control & Loss Carryforwards
  buildIncomeTax2081QaEntry({
    id: "ita2081-m5-sec-57-change-of-control-disposal",
    question:
      "A resident private limited company undergoes an equity restructuring where 55% of its underlying shareholding shifts to new investors over a 24-month period. What are the deemed asset and liability realization consequences under Section 57(1)?",
    shortTopic: "Section 57 Change of Control & Deemed Disposal",
    category: "Income Tax",
    subTopic: "Corporate Restructuring",
    keywords: [
      "Section 57",
      "Change of Control",
      "50 Percent Rule",
      "3-Year Window",
      "Deemed Disposal",
      "Market Value",
    ],
    answer:
      "Under Section 57(1) of the Income Tax Act, 2058, if the ownership of an entity changes by 50% or more compared to its ownership during the preceding three years, the entity is deemed immediately before the change to have disposed of all properties owned and settled all liabilities borne by it at market value. Consequently, any unrealized gain accrued on corporate assets becomes chargeable to corporate income tax, while Section 57(2) imposes parallel restrictions on carried-forward interest and tax losses.",
    citationTitle: "Income Tax Act, 2058",
    citation: "Section 57(1), Section 57(2), Section 57(3)",
    sourceKind: "ita-2058",
    reasoningSteps: [
      "Track underlying ownership changes over a rolling 3-year period under Section 57(1).",
      "Observe that a 55% shift breaches the statutory 50% change-of-control threshold.",
      "Apply Section 57(1): the entity is deemed to have disposed of all assets owned and liabilities borne at market value immediately prior to the ownership change.",
      "Recognize any resulting net gain from deemed disposal as taxable income and split the pre- and post-change parts of the income year as separate income years under Section 57(3).",
    ],
    rateTable: {
      title: "Section 57 Statutory Consequences",
      columns: ["Legal Element", "Statutory Rule", "Operational Effect"],
      rows: [
        [
          "Threshold Test",
          "≥ 50% ownership change",
          "Evaluated against ownership over preceding 3 years",
        ],
        [
          "Asset & Liability Treatment",
          "Deemed disposed / settled at market value",
          "Unrealized capital gains taxed immediately (Sec 57(1))",
        ],
        [
          "Carried-Forward Interest",
          "Deductibility barred post-change",
          "Section 14(3) interest forfeited (Sec 57(2)(ka))",
        ],
        [
          "Income Year Split",
          "Separate tax periods",
          "Pre-change and post-change treated separately (Sec 57(3))",
        ],
      ],
    },
    followUps: [
      "What happens to pre-change accumulated losses under Section 20 and Section 57(2)?",
      "What relief did Finance Act 2081 Section 30 provide for indirect Section 57 assessments?",
      "Does a Section 57 ownership change disallow carried-forward foreign tax credits?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m5-sec-20-57-loss-forfeiture",
    question:
      "A telecom company carries NPR 45,000,000 in unabsorbed tax losses accumulated over the past four income years. Following a 60% foreign acquisition of its voting equity, can the company offset these accumulated losses against its subsequent operating profits under Section 20?",
    shortTopic: "Loss Forfeiture Upon Ownership Change",
    category: "Income Tax",
    subTopic: "Corporate Restructuring & Tax Losses",
    keywords: [
      "Section 20",
      "Section 57",
      "Loss Carryforward",
      "Loss Lapse",
      "Unabsorbed Loss",
    ],
    answer:
      "No. Under Section 20 and Section 57(2)(b)/(kha) of the Income Tax Act, 2058, when an ownership change of 50% or more occurs under Section 57(1), the entity is barred from deducting pre-change accumulated losses incurred under Section 20. Furthermore, under Section 57(2)(c)/(ga), any tax loss sustained after the change of control cannot be carried back to offset pre-change income years under Section 20(4), Section 59, or Section 60.",
    citationTitle: "Income Tax Act, 2058",
    citation: "Section 20(1), Section 57(2)(kha), Section 57(2)(ga)",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Review general business loss carryforward rules under Section 20(1) (standard 7 years under current law, 4 years in early consolidations; extended periods for infrastructure/hydropower).",
      "Examine the loss deduction bar in Section 57(2)(b)/(kha) triggered by a ≥ 50% ownership change.",
      "Determine that the 60% acquisition triggers Section 57(1) change of control.",
      "Apply Section 57(2)(kha) to forfeit the NPR 45,000,000 pre-change loss, and Section 57(2)(ga) to prohibit carrying back post-change losses.",
    ],
    rateTable: {
      title: "Loss Carryforward Restrictions Under Section 57",
      columns: [
        "Loss Category",
        "Treatment Post-Change of Control",
        "Statutory Provision",
      ],
      rows: [
        [
          "Pre-Change Accumulated Losses",
          "Cannot be deducted post-change (forfeited)",
          "Section 57(2)(b)/(kha)",
        ],
        [
          "Post-Change Operating Losses",
          "Eligible for future carryforward only",
          "Section 20(1)",
        ],
        [
          "Loss Carryback to Pre-Change Years",
          "Strictly prohibited",
          "Section 57(2)(c)/(ga)",
        ],
      ],
    },
    followUps: [
      "What are the deemed asset disposal consequences under Section 57(1)?",
      "What relief applies under Finance Act 2081 Section 30 for indirect upstream Section 57 cases?",
      "Within how many years can the IRD issue an amended assessment under Section 101?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m5-fa2081-sec-30-indirect-ownership-relief",
    question:
      "A resident holding company changes ownership, inadvertently triggering an upstream indirect Section 57 tax assessment on its resident operating subsidiary. What specific waiver and relief did Finance Act 2081 introduce under Section 30 for such cascading assessments?",
    shortTopic: "Finance Act 2081 Relief on Indirect Section 57 Assessments",
    category: "Income Tax",
    subTopic: "Corporate Restructuring & Relief",
    keywords: [
      "Finance Act 2081",
      "Section 30 Relief",
      "Section 57",
      "Indirect Change of Control",
      "Penalty Waiver",
      "Ashad 2082",
    ],
    answer:
      "Under Section 30 of Finance Act 2081, where a resident entity faces Section 57(1) tax liabilities due to an ownership change occurring upstream in another resident entity holding shares in it, interest and penalties are waived under two alternative conditions: (1) if the upstream parent entity has already been assessed and paid Section 57 tax, or (2) if the subsidiary pays the principal tax liability assessed against it on or before Ashad end 2082.",
    citationTitle: "Finance Act 2081",
    citation: "Section 30 (Finance Act 2081); Section 57(1) (ITA 2058)",
    sourceKind: "fa-2081",
    reasoningSteps: [
      "Identify the cascade issue: double taxation or harsh penalties where an indirect ownership change in an upstream resident entity triggers Section 57 on operating subsidiaries.",
      "Examine the special transitional relief enacted under Section 30 of Finance Act 2081.",
      "Identify Condition 1: full waiver if the upstream holding entity has already discharged the Section 57 tax.",
      "Identify Condition 2: if unpaid, the subsidiary receives a 100% waiver of accrued interest and statutory penalties upon settlement of the principal tax amount by Ashad end 2082.",
    ],
    rateTable: {
      title: "Section 30 Indirect Section 57 Relief Conditions",
      columns: [
        "Condition",
        "Taxpayer Action Required",
        "Scope of Relief Granted",
      ],
      rows: [
        [
          "Upstream Tax Discharged",
          "Show proof of Section 57 tax payment by parent",
          "Full waiver of subsidiary tax & penalties",
        ],
        [
          "Upstream Tax Outstanding",
          "Pay principal assessment by Ashad end 2082",
          "Complete waiver of accrued interest & penalties",
        ],
      ],
    },
    followUps: [
      "What are the general amnesty schemes under Sections 24, 25, 26, and 28 of Finance Act 2081?",
      "When does a 50% ownership change trigger deemed disposal under Section 57(1)?",
      "What happens to pre-change accumulated losses after a Section 57 event?",
    ],
  }),

  // Module 6: Digital Economy, Sectoral Concessions & Indirect Tax Alignment
  buildIncomeTax2081QaEntry({
    id: "ita2081-m6-digital-service-tax-dst-scope",
    question:
      "A global cloud-service provider incorporated in Ireland sells streaming, SaaS, and cloud subscriptions to individual consumers in Nepal, generating NPR 12,000,000 in gross annual billing. What is its Digital Service Tax (DST) liability and registration status under Finance Act 2081?",
    shortTopic: "Digital Service Tax (DST) Scope, Threshold & Rate",
    category: "Income Tax",
    subTopic: "Digital Economy Taxation",
    keywords: [
      "Digital Service Tax",
      "DST",
      "2 Percent",
      "NPR 2,000,000 Threshold",
      "Cloud Services",
      "Finance Act 2081",
    ],
    answer:
      "Under Section 20 of Finance Act 2081, non-resident entities providing digital services (such as cloud computing, SaaS, streaming, and advertising) to Nepalese consumers are subject to a 2% Digital Service Tax (DST) on gross annual transaction value. Because the provider's turnover of NPR 12,000,000 exceeds the statutory exemption threshold of NPR 2,000,000, it must register for DST and pay NPR 240,000 (2% of NPR 12,000,000). Furthermore, under Section 16 of Finance Act 2081, non-residents registered for DST and digital VAT are exempt from Digital PE corporate income tax classification.",
    citationTitle: "Finance Act 2081 / Income Tax Act, 2058",
    citation: "Section 16, Section 20 (Finance Act 2081); Section 2(aab)",
    sourceKind: "fa-2081",
    reasoningSteps: [
      "Review the definition of digital services under Finance Act 2081 (cloud, SaaS, software, advertising, streaming).",
      "Check the monetary registration threshold: annual turnover exceeding NPR 2,000,000.",
      "Evaluate turnover: NPR 12,000,000 breaches the threshold.",
      "Calculate 2% DST: 2% × NPR 12,000,000 = NPR 240,000.",
      "Apply the statutory carve-out: DST and digital VAT registration shields the provider from corporate income tax PE attribution.",
    ],
    rateTable: {
      title: "Digital Service Tax (DST) Framework",
      columns: ["Compliance Parameter", "Statutory Rule", "Operational Impact"],
      rows: [
        [
          "Turnover Threshold",
          "NPR 2,000,000 per income year",
          "Turnovers ≤ NPR 2M are fully exempt",
        ],
        [
          "Tax Rate",
          "2% on gross transaction value",
          "Levied on gross billing to Nepali consumers",
        ],
        [
          "Permanent Establishment Carve-out",
          "Section 16 / VAT registration",
          "Prevents attribution to standard corporate tax base",
        ],
        [
          "Non-Compliance Penalty",
          "0.5% fee + 15% p.a. interest + 50% penalty",
          "Applies to unfiled returns and tax evasion",
        ],
      ],
    },
    followUps: [
      "What tax concession applies when an IT export enterprise issues bonus shares?",
      "What is the compulsory VAT registration threshold for digital service providers?",
      "How does a Foreign Permanent Establishment get taxed on profit repatriation?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m6-it-enterprise-bonus-share-exemption",
    question:
      "An IT export firm in Lalitpur capitalizes its accumulated profits of NPR 25,000,000 into bonus shares to expand software engineering operations. What tax concession applies to this bonus share issuance under Finance Act 2081?",
    shortTopic: "IT Enterprise Bonus Share Capitalization Dividend Exemption",
    category: "Income Tax",
    subTopic: "Sectoral Concessions",
    keywords: [
      "Finance Act 2081",
      "IT Sector Incentives",
      "Bonus Shares",
      "Dividend Withholding Exemption",
      "Capitalization",
    ],
    answer:
      "Under specific sectoral concessions enacted in Finance Act 2081, where an Information Technology (IT) enterprise capitalizes its accumulated reserves and profits into bonus shares for the purpose of expanding its business capacity, the bonus share issuance is fully exempt from dividend withholding tax under Section 54 and Section 92.",
    citationTitle: "Finance Act 2081",
    citation: "Section 28 / IT Sector Concession Directives",
    sourceKind: "fa-2081",
    reasoningSteps: [
      "Identify the general rule: under Section 54 and Section 92, distribution of bonus shares capitalized from reserves is treated as a dividend subject to 5% final dividend withholding tax.",
      "Examine the economic incentive introduced in Finance Act 2081 for the Information Technology (IT) sector.",
      "Verify the qualification condition: capitalization must expand operating and service capacity.",
      "Conclude that the bonus share distribution of NPR 25,000,000 is exempt from the standard 5% dividend withholding tax.",
    ],
    rateTable: {
      title: "Bonus Share Dividend Tax Comparison",
      columns: [
        "Sector / Nature of Enterprise",
        "Dividend TDS on Bonus Shares",
        "Statutory Reference",
      ],
      rows: [
        [
          "General Commercial Companies",
          "5% Final Withholding Tax",
          "Section 54 & Section 92",
        ],
        [
          "IT Enterprise (Business Expansion)",
          "0% (Fully Exempt)",
          "Finance Act 2081 Special Directives",
        ],
      ],
    },
    followUps: [
      "What corporate tax concessions apply to special manufacturing industries under Section 11?",
      "What is the Digital Service Tax (DST) threshold for non-resident SaaS providers?",
      "When must a digital design agency register for VAT under Finance Act 2081?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m6-sec-11-special-industry-rebates",
    question:
      "A special manufacturing industry operates year-round and employs 120 Nepalese citizens, 45 of whom are women and members of oppressed communities. How is its corporate tax rate calculated under Section 11?",
    shortTopic:
      "Special Manufacturing Industry Concessional Rate & Employment Rebate",
    category: "Income Tax",
    subTopic: "Corporate Concessions",
    keywords: [
      "Section 11",
      "Special Industry",
      "20 Percent Concessional Rate",
      "Employment Rebate",
      "10 Percent Additional Rebate",
    ],
    answer:
      "Under Section 11(2kha), special manufacturing industries are taxed at a base concessional corporate rate of 20% (reflecting a 20% concession on the standard 25% corporate rate). Furthermore, under Section 11(3)(ga), because the enterprise employs more than 100 Nepalese citizens throughout the year and at least 33% (here, 45 out of 120, or 37.5%) are women, oppressed group members, or persons with disabilities, it receives an additional 10% tax rebate. Its effective corporate tax rate becomes 18% (20% less a 10% rebate on that tax).",
    citationTitle: "Income Tax Act, 2058",
    citation: "Section 11(2kha), Section 11(3)(ga)",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Determine standard corporate tax rate: 25%.",
      "Apply Section 11(2kha) special industry concession: standard rate reduced by 20% to a 20% base corporate rate.",
      "Evaluate employment threshold: 120 Nepalese citizens exceeds the 100-employee minimum.",
      "Evaluate demographic diversity condition: 45 / 120 = 37.5%, exceeding the 33% threshold for women, oppressed groups, or persons with disabilities.",
      "Apply the 10% tax rebate under Section 11(3)(ga): 20% × (1 - 0.10) = 18% effective corporate income tax rate.",
    ],
    rateTable: {
      title: "Special Manufacturing Industry Tax Computation",
      columns: [
        "Tier / Incentive Level",
        "Effective Tax Rate",
        "Statutory Eligibility Requirement",
      ],
      rows: [
        ["Standard Corporate Rate", "25%", "General non-financial companies"],
        [
          "Special Industry Base Rate",
          "20%",
          "Manufacturing entities under Section 11(2kha)",
        ],
        [
          "Inclusive Employment Rebate",
          "18%",
          "≥ 100 employees with ≥ 33% women/oppressed groups",
        ],
      ],
    },
    followUps: [
      "What cap applies to repair and maintenance deductions on manufacturing plant machinery under Section 16?",
      "What tax exemption applies when an IT enterprise capitalizes profits into bonus shares?",
      "What are the advance tax installment percentages under Section 94?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m6-vat-registration-threshold-services",
    question:
      "A digital graphic design agency provides online advertising and creative services. Under Finance Act 2081 amendments to the Value Added Tax Act, 2052, at what annual turnover threshold is it legally compelled to register for VAT?",
    shortTopic: "Compulsory VAT Registration Threshold for Service Providers",
    category: "Value Added Tax",
    subTopic: "Indirect Tax Alignment",
    keywords: [
      "VAT Act 2052",
      "Section 9",
      "Section 10",
      "Section 11(1)(cha)",
      "VAT Registration Threshold",
      "NPR 3,000,000",
      "Finance Act 2081",
    ],
    answer:
      "Under the Value Added Tax Act, 2052 (Sections 9–10 governing small-vendor exemption and registration, aligned with Section 11(1)(cha) de-registration thresholds) as amended by Finance Act 2081, the mandatory VAT registration threshold for entities engaged in the supply of services, or mixed transactions involving both goods and services, increased from NPR 2,000,000 to NPR 3,000,000 of taxable turnover over the preceding 12 months. Pure goods suppliers remain governed by the NPR 5,000,000 threshold.",
    citationTitle: "Value Added Tax Act, 2052 / Finance Act 2081",
    citation: "Section 9, Section 10, Section 11(1)(cha)",
    sourceKind: "vat-2052-fa-2081",
    reasoningSteps: [
      "Identify the taxpayer's business activity: service-oriented digital and advertising agency.",
      "Review the small-vendor exemption and registration regime under Sections 9–10 (alongside Section 11(1)(cha) threshold alignment): previously NPR 2,000,000 for service providers.",
      "Apply the Finance Act 2081 threshold revision: raised to NPR 3,000,000 for service and mixed goods-plus-services businesses.",
      "Contrast with pure goods suppliers: threshold remains NPR 5,000,000.",
      "Conclude that compulsory VAT registration is triggered once 12-month rolling taxable turnover exceeds NPR 3,000,000.",
    ],
    rateTable: {
      title: "Compulsory VAT Registration Thresholds",
      columns: [
        "Business Activity",
        "Historical Threshold",
        "FY 2081/82 Threshold (Finance Act 2081)",
      ],
      rows: [
        ["Supply of Services Only", "NPR 2,000,000", "NPR 3,000,000"],
        ["Mixed Supply (Goods & Services)", "NPR 2,000,000", "NPR 3,000,000"],
        ["Supply of Goods Only", "NPR 5,000,000", "NPR 5,000,000"],
      ],
    },
    followUps: [
      "How does the VAT status of a freight carrier affect Section 88 TDS rates?",
      "What VAT amnesty applied to unregistered vendors under Finance Act 2081?",
      "How does the 2% Digital Service Tax threshold interact with digital VAT?",
    ],
  }),

  // Module 7: Assessments, Advance Tax Installments, Dispute Adjudication & Amnesty Schemes
  buildIncomeTax2081QaEntry({
    id: "ita2081-m7-sec-94-95-advance-installments",
    question:
      "A trading entity projects an annual income tax liability of NPR 1,200,000 for FY 2081/82. What are its statutory payment obligations and cumulative percentage deadlines across the three advance tax installments under Section 94 and Section 95?",
    shortTopic: "Advance Tax Installment Schedule & Thresholds",
    category: "Income Tax",
    subTopic: "Advance Tax & Assessments",
    keywords: [
      "Section 94",
      "Section 95",
      "Advance Tax Installment",
      "40-70-100 Rule",
      "Poush",
      "Chaitra",
      "Ashad",
    ],
    answer:
      "Under Section 94 and Section 95 of the Income Tax Act, 2058, every person deriving assessable income from business or investment above the statutory installment threshold (Section 94(2) excludes small installments—historically NPR 2,000 per installment / NPR 5,000–7,500 annual thresholds across Finance Act updates) must pay tax in three installments: 40% of estimated annual tax by the end of Poush (mid-January), 70% by the end of Chaitra (mid-April), and 100% by the end of Ashad (mid-July). For a projected tax of NPR 1,200,000, cumulative payments must reach NPR 480,000 by Poush end, NPR 840,000 by Chaitra end (+NPR 360,000), and NPR 1,200,000 by Ashad end (+NPR 360,000).",
    citationTitle: "Income Tax Act, 2058",
    citation: "Section 94(1), Section 94(2), Section 95(1)",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Confirm advance installment applicability: estimated tax of NPR 1,200,000 clearly exceeds the statutory minimum under Section 94(2).",
      "Calculate 1st Installment (Due: Poush end): 40% of estimated tax = 0.40 × NPR 1,200,000 = NPR 480,000.",
      "Calculate 2nd Installment (Due: Chaitra end): 70% cumulative = NPR 840,000 (incremental remittance = NPR 360,000).",
      "Calculate 3rd Installment (Due: Ashad end): 100% cumulative = NPR 1,200,000 (incremental remittance = NPR 360,000).",
    ],
    rateTable: {
      title: "Advance Tax Installment Framework (NPR 1.2M Tax Liability)",
      columns: [
        "Installment Tier",
        "Statutory Deadline",
        "Cumulative Percentage",
        "Cumulative Amount Due (NPR)",
      ],
      rows: [
        ["First Installment", "End of Poush (Month 6)", "40%", "480,000"],
        ["Second Installment", "End of Chaitra (Month 9)", "70%", "840,000"],
        ["Third Installment", "End of Ashad (Month 12)", "100%", "1,200,000"],
      ],
    },
    followUps: [
      "Are NBCA capital gains excluded from Section 95 advance tax estimates?",
      "How does Section 118 calculate shortfall interest if payments fall below 90%?",
      "What are the three assessment mechanisms under Chapter 19?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m7-sec-95ka-nbca-capital-gain-exclusion",
    question:
      "An investor derives a significant capital gain from the disposal of a Non-Business Chargeable Asset (NBCA) in Mangsir of FY 2081/82. Must this capital gain be included in the estimated advance tax installment calculations under Section 95, and will an omission trigger interest penalties under Section 118?",
    shortTopic: "NBCA Capital Gain Exclusion from Advance Tax Estimates",
    category: "Income Tax",
    subTopic: "Advance Tax & Penalties",
    keywords: [
      "Section 95ka",
      "Section 118",
      "NBCA",
      "Capital Gains",
      "Advance Tax Exclusion",
      "Finance Act 2081",
    ],
    answer:
      "Under Section 95ka as reinforced by Finance Act 2081, capital gains realized from the disposal of Non-Business Chargeable Assets (NBCA)—such as private land, buildings, or listed securities—are excluded from the estimated advance tax installment calculation required under Section 95. Consequently, omitting NBCA capital gains from advance installment estimates does not create an underestimation shortfall and does not trigger the 15% per annum interest penalty under Section 118; such gains are collected via Section 95ka advance tax withholding or final return settlement.",
    citationTitle: "Income Tax Act, 2058 / Finance Act 2081",
    citation: "Section 95Ka, Section 118(1) Proviso",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Identify the asset class: Non-Business Chargeable Asset (NBCA) governed by Section 2(da) and Section 95Ka.",
      "Examine the advance tax estimation rules under Section 95 and the statutory carve-out in Section 95Ka.",
      "Review Section 118, which charges 15% normal interest on advance installment shortfalls against the 90% safe-harbor benchmark.",
      "Apply the statutory proviso: because NBCA gains are excluded from the Section 95 estimation base, no Section 118 shortfall interest applies to omitted NBCA gains.",
    ],
    rateTable: {
      title: "Income Inclusions in Advance Tax Estimates",
      columns: [
        "Income Stream",
        "Advance Estimate Requirement",
        "Section 118 Interest Applicability",
      ],
      rows: [
        [
          "Operating Business Profits",
          "Mandatory inclusion",
          "Applicable if shortfall < 90% threshold",
        ],
        [
          "Professional & Consultancy Fees",
          "Mandatory inclusion",
          "Applicable if shortfall < 90% threshold",
        ],
        [
          "NBCA Capital Gains (Land/Shares)",
          "Statutorily excluded under Sec 95Ka",
          "Exempt from Sec 118 shortfall interest",
        ],
      ],
    },
    followUps: [
      "How does Section 118 compute underestimation interest against the 90% benchmark?",
      "What are the three Section 94 installment due dates?",
      "What is the time limit for amending an assessment under Section 101?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m7-sec-118-shortfall-interest-90-safe-harbor",
    question:
      "A taxpayer's final assessed corporate tax liability for FY 2081/82 is NPR 2,000,000. During the year, the company paid a total of NPR 1,600,000 across its three advance installments. How is the underestimation interest penalty evaluated under Section 118, and does the statutory 90% safe-harbor rule apply?",
    shortTopic: "Section 118 Shortfall Interest & 90% Safe Harbor",
    category: "Income Tax",
    subTopic: "Interest & Penalties",
    keywords: [
      "Section 118",
      "Interest on Underestimation",
      "90 Percent Safe Harbor",
      "15 Percent Interest",
      "Installment Shortfall",
    ],
    answer:
      "Under Section 118 of the Income Tax Act, 2058, if a taxpayer pays less than 90% of actual annual tax liability across advance installments, interest at the normal rate (15% per annum) is charged for each month and part of a month on the period shortfall from the installment due date until assessment. Here, 90% of NPR 2,000,000 is NPR 1,800,000. Because total advance payments were only NPR 1,600,000 (80% of actual liability), the taxpayer breaches the 90% safe harbor and incurs Section 118 interest at 15% p.a. on each period's deficit.",
    citationTitle: "Income Tax Act, 2058",
    citation: "Section 118(1), Section 118(2), Section 118(3)",
    sourceKind: "ita-2058",
    reasoningSteps: [
      "Determine final assessed tax liability: NPR 2,000,000.",
      "Calculate the 90% safe-harbor minimum under Section 118(1)(b): 90% × NPR 2,000,000 = NPR 1,800,000.",
      "Compare actual total installments paid (NPR 1,600,000, or 80%) against the NPR 1,800,000 safe harbor.",
      "Conclude that the safe harbor is breached, triggering Section 118 interest.",
      "Apply Section 118(2)–(3): charge 15% p.a. interest per month or part of a month on the shortfall relative to 90% of each installment period.",
    ],
    rateTable: {
      title: "Section 118 Safe-Harbor Benchmark",
      columns: [
        "Assessment Parameter",
        "Statutory Benchmark",
        "Case Value (NPR)",
        "Compliance Status",
      ],
      rows: [
        ["Final Assessed Tax", "Actual tax liability", "2,000,000", "Baseline"],
        [
          "90% Safe-Harbor Minimum",
          "90% of final assessed tax",
          "1,800,000",
          "Minimum threshold to avoid fee",
        ],
        [
          "Actual Advance Tax Deposited",
          "Sum of 3 installments",
          "1,600,000",
          "Breaches safe harbor (80%)",
        ],
        [
          "Interest Penalty Rate",
          "Normal rate of interest",
          "15% p.a. on deficits",
          "Triggered under Section 118",
        ],
      ],
    },
    followUps: [
      "What is the 40-70-100 advance tax schedule under Section 94?",
      "Are NBCA capital gains exempt from Section 118 shortfall calculations?",
      "How does Section 119 penalize late tax or TDS remittance?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m7-ch19-assessments-sec-99-101",
    question:
      "What are the three core assessment mechanisms recognized under Chapter 19 of the Income Tax Act, 2058, and what is the statutory statute of limitations for an amended assessment under Section 101?",
    shortTopic: "Assessment Classifications & Section 101 Limitation Period",
    category: "Income Tax",
    subTopic: "Tax Assessments",
    keywords: [
      "Section 99",
      "Section 100",
      "Section 101",
      "Section 102",
      "Self-Assessment",
      "Amended Assessment",
      "4-Year Limitation",
      "Fraud Exception",
    ],
    answer:
      "Chapter 19 (Sections 99–102) recognizes three core assessment mechanisms: (1) Self-Assessment under Section 99, where filing an income return under Section 96 (or non-filing by the due date) operates as a deemed tax assessment; (2) Jeopardy / Part-Year Assessment under Section 100 (for entities leaving Nepal or required to file early under Section 96(5)); and (3) Amended Assessment under Section 101, with written notice issued under Section 102. Under Section 101(3), the Department may issue an amended assessment within four years from the due date for filing the return (or date of a Section 100(2) notice). However, under Section 101(4), where tax was wrongly assessed due to fraud, the Department may amend the assessment at any time within one year of receiving information of the fraud.",
    citationTitle: "Income Tax Act, 2058",
    citation:
      "Section 99, Section 100, Section 101(1), Section 101(3), Section 101(4), Section 102",
    sourceKind: "ita-2058",
    reasoningSteps: [
      "Identify Chapter 19 assessment mechanisms: Section 99 governs self-assessment upon return filing (or deemed assessment on non-filing).",
      "Identify Section 100: governs part-year and jeopardy assessments under Section 96(5) with a 7-day defense notice.",
      "Review Section 101: authorizes the Department to issue amended and re-amended assessments on reasonable grounds, notified under Section 102.",
      "Apply Section 101(3): statutory limitation is 4 years from the return due date or prior assessment date (note: some early English translations contained a typographical 'Four months' rendering of चार वर्ष / 4 years).",
      "Apply Section 101(4): for fraudulent assessments, there is no 4-year bar; amendment may be made at any time within 1 year of learning of the fraud.",
    ],
    rateTable: {
      title: "Chapter 19 Assessment Regimes & Time Bars",
      columns: [
        "Assessment Type",
        "Governing Section",
        "Trigger / Basis",
        "Statutory Time Limitation",
      ],
      rows: [
        [
          "Self-Assessment",
          "Section 99",
          "Filing of return under Section 96",
          "Immediate on filing / due date",
        ],
        [
          "Jeopardy / Part-Year",
          "Section 100",
          "Early / departure return under Section 96(5)",
          "With 7-day defense notice",
        ],
        [
          "Amended Assessment",
          "Section 101(1)–(3)",
          "Audit identifying under-assessed tax",
          "4 years from due date / Sec 100(2) notice",
        ],
        [
          "Fraud Reassessment",
          "Section 101(4)",
          "Wrong assessment due to fraud",
          "Any time (within 1 year of fraud knowledge)",
        ],
      ],
    },
    followUps: [
      "How can a taxpayer challenge an amended assessment via Administrative Review under Section 115?",
      "What are the advance tax installment obligations under Section 94?",
      "How are property liens and auctions enforced under Sections 104–105?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m7-sec-115-116-administrative-review",
    question:
      "A corporate taxpayer receives an adverse amended assessment notice from the Inland Revenue Office determining an additional tax liability of NPR 10,000,000. What statutory prerequisites, deposit rules, and timelines must the taxpayer satisfy to file an Administrative Review under Section 115?",
    shortTopic: "Administrative Review Filing Conditions & Mandatory Deposit",
    category: "Income Tax",
    subTopic: "Dispute Resolution & Appeals",
    keywords: [
      "Section 115",
      "Section 116",
      "Administrative Review",
      "Director General IRD",
      "30-Day Window",
      "100 Percent Undisputed",
      "25 Percent Disputed Deposit",
    ],
    answer:
      "Under Section 115 of the Income Tax Act, 2058, a taxpayer disputing a Section 114 reviewable decision (such as an amended assessment) must apply to the Department / Director General for Administrative Review within 30 days of receiving the decision notice (extendable by up to 30 additional days if applied within 7 days of expiry on reasonable grounds under Section 115(3)). Under amended pre-deposit / stay rules (Section 115(6) and subsequent Finance Act amendments), admissibility/stay requires depositing 100% of undisputed tax plus 25% of disputed tax (updated from 50% in earlier consolidations). Under Section 115(8)–(9), if the Department does not issue a decision notice within 60 days (90 days in earlier consolidations), the taxpayer may register notice treating the review as rejected and appeal to the Revenue Tribunal under Section 116.",
    citationTitle: "Income Tax Act, 2058",
    citation:
      "Section 115(1)–(3), Section 115(6), Section 115(8)–(9), Section 116",
    sourceKind: "ita-2058-fa-2081",
    reasoningSteps: [
      "Identify the first statutory stage of dispute resolution: Administrative Review under Section 115 against a Section 114 decision.",
      "Verify the limitation period under Section 115(1) & (3): 30 days from notice receipt, with a possible 30-day extension if requested within 7 days after expiry.",
      "Apply the financial admissibility / stay condition (Section 115(6) as amended): deposit 100% of undisputed tax plus 25% of disputed tax (earlier consolidations specified 50% for recovery stay).",
      "Evaluate the deemed-rejection window under Section 115(8)–(9): 60 days under current Finance Act amendments (90 days in 2013 consolidation).",
      "Identify the next appellate forum under Section 116: appeal to the Revenue Tribunal within 35 days under the Revenue Tribunal Act, 2031 (registering a copy with the Department within 15 days under Section 116(2)).",
    ],
    rateTable: {
      title: "Tax Dispute Appellate Ladder",
      columns: [
        "Appellate Forum",
        "Governing Law",
        "Filing Timeline",
        "Statutory Pre-Deposit Rule",
      ],
      rows: [
        [
          "Administrative Review",
          "Sec 115, Income Tax Act",
          "30 days from assessment notice (+30d ext.)",
          "100% undisputed + 25% disputed tax (amended)",
        ],
        [
          "Revenue Tribunal",
          "Sec 116 / Revenue Tribunal Act 2031",
          "35 days from decision / deemed rejection",
          "50% disputed tax deposit / bank guarantee",
        ],
        [
          "Supreme Court of Nepal",
          "Constitution / Revenue Tribunal Act",
          "With leave on points of law",
          "Points of law appeal",
        ],
      ],
    },
    followUps: [
      "Within how many years can an amended assessment be issued under Section 101?",
      "What interest accrues under Section 119 while tax remains unpaid?",
      "What transitional tax amnesties applied under Finance Act 2081?",
    ],
  }),
  buildIncomeTax2081QaEntry({
    id: "ita2081-m7-fa2081-amnesty-schemes",
    question:
      "A business failed to file income tax returns or register for VAT for fiscal years prior to FY 2081/82. What specific amnesty relief is provided under Section 24, 25, and 28 of Finance Act 2081 to regularize past non-compliance?",
    shortTopic: "Finance Act 2081 Non-Filer & VAT Amnesty Schemes",
    category: "Tax Amnesties and Waivers",
    subTopic: "Tax Amnesties & Relief",
    keywords: [
      "Finance Act 2081",
      "Section 28 Amnesty",
      "Section 24/25 VAT Relief",
      "Non-Filer Waiver",
      "Poush 2082 Deadline",
      "1 Percent VAT Settlement",
    ],
    answer:
      "Finance Act 2081 establishes targeted amnesty relief programs: (1) Under Section 28, income tax non-filers with unfiled returns for income years prior to FY 2081/82 who submit tax returns and pay assessed taxes for FY 2081/82 and FY 2082/83 by the end of Poush 2082 receive a 100% waiver of prior income tax liabilities, late filing fees, interest, and penalties for pre-2081/82 periods. (2) Under Sections 24 and 25, unregistered VAT defaulters for transactions between 15 Jestha 2076 and 14 Jestha 2078 who voluntarily register under VAT and deposit 1% of gross transaction value by the end of Mangsir 2081 receive a waiver of the remaining VAT, interest, late fees, and penalties.",
    citationTitle: "Finance Act 2081",
    citation: "Section 24, Section 25, Section 26, Section 28",
    sourceKind: "fa-2081",
    reasoningSteps: [
      "Analyze the direct tax amnesty under Section 28 of Finance Act 2081 for historical income tax non-filers.",
      "Verify the compliance condition: submit income returns and pay taxes for FY 2081/82 and FY 2082/83 by Poush end 2082.",
      "Review indirect tax relief under Sections 24 and 25 for unregistered vendors during 15 Jestha 2076 – 14 Jestha 2078.",
      "Confirm indirect tax settlement terms: register for VAT and deposit 1% of transaction value by Mangsir end 2081 for full cancellation of remaining VAT, fines, and interest.",
    ],
    rateTable: {
      title: "Finance Act 2081 Amnesty Program Summary",
      columns: [
        "Relief Scheme",
        "Eligible Taxpayer Group",
        "Action Required by Taxpayer",
        "Relief Granted",
      ],
      rows: [
        [
          "Income Tax Non-Filer Amnesty (Sec 28)",
          "Unfiled returns prior to FY 2081/82",
          "File FY 2081/82 & 2082/83 returns by Poush end 2082",
          "100% waiver of pre-2081/82 tax, interest & penalties",
        ],
        [
          "VAT Defaulter Amnesty (Sec 24/25)",
          "Unregistered vendors (Jestha 2076 – Jestha 2078)",
          "Register for VAT & pay 1% transaction value by Mangsir 2081",
          "Waiver of remaining VAT, late fees & penalties",
        ],
        [
          "Excise Duty Late Relief (Sec 26)",
          "Excise defaulters through Chaitra 2081",
          "Pay principal excise duty by prescribed deadline",
          "50% rebate on late fees and 100% penalty waiver",
        ],
        [
          "Credit Information Bureau Relief (FA 2081)",
          "NRB Act Section 88 Credit Bureaus",
          "Register by Ashad 2081 & pay 50% VAT by Asoj 2081",
          "Waiver of balance 50% VAT, interest & fines",
        ],
      ],
    },
    followUps: [
      "What transitional relief applies to indirect Section 57 assessments under Finance Act 2081 Section 30?",
      "What are the newer FY 2083/84 arrears waivers under Finance Bill 2083 Sections 40–44?",
      "What is the compulsory VAT registration threshold for services under Finance Act 2081?",
    ],
  }),
];
