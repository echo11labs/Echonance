import type { MockQAPair } from "../mock-tax-chat";
import { EDITORIAL_BOARD_CONTRIBUTOR } from "./finance-bill-2083-helpers";

const ITA_SOURCE_FILE = "docs/Files/Nepal_inctax.pdf";
const ITA_SOURCE_URL = "/api/sources/income-tax-act-2058";
const ITA_LIBRARY_ID = "income-tax-act-2058";

const TDS_GUIDE_FILE = "docs/Files/Nepal_TDS.pdf";
const TDS_GUIDE_URL = "/api/sources/tds-guide-2058";
const TDS_GUIDE_ID = "tds-guide-2058";

interface ItaDeepSeedInput {
  id: string;
  question: string;
  shortTopic: string;
  category: "Income Tax" | "Acts";
  keywords: string[];
  answer: string;
  citation: string;
  includeTdsGuide?: boolean;
  reasoningSteps: string[];
  rateTable: NonNullable<MockQAPair["rateTable"]>;
  followUps: string[];
}

function buildItaDeepEntry(input: ItaDeepSeedInput): MockQAPair {
  const resources: MockQAPair["resources"] = [
    {
      title: "Income Tax Act, 2058 (2002)",
      citation: `${input.citation} · Consolidation: ${ITA_SOURCE_FILE}`,
      authority: "Inland Revenue Department (IRD) / Nepal Law Commission",
      libraryId: ITA_LIBRARY_ID,
      externalUrl: ITA_SOURCE_URL,
    },
  ];

  if (input.includeTdsGuide) {
    resources.push({
      title: "Income Tax Act, 2058 — Tax Deduction at Source (TDS)",
      citation: `Chapter 17 Guidance · Source: ${TDS_GUIDE_FILE}`,
      authority: "Inland Revenue Department (IRD)",
      libraryId: TDS_GUIDE_ID,
      externalUrl: TDS_GUIDE_URL,
    });
  }

  return {
    id: input.id,
    question: input.question,
    shortTopic: input.shortTopic,
    category: input.category,
    fiscalYear: "General",
    keywords: [...input.keywords, "Income Tax Act 2058"],
    answer: input.answer,
    responseType: "tabular-schedule",
    thoughtProcess: {
      duration: "1.4s",
      summary: `Statutory analysis verified against ${ITA_SOURCE_FILE} (${input.citation}).`,
      steps: input.reasoningSteps,
    },
    rateTable: input.rateTable,
    resources,
    followUps: input.followUps,
    contributor: EDITORIAL_BOARD_CONTRIBUTOR,
  };
}

export const INCOME_TAX_ACT_2058_DEEP_EN: MockQAPair[] = [
  buildItaDeepEntry({
    id: "ita2058-sec-46-involuntary-disposal-rollover",
    question:
      "When business or investment property is involuntarily destroyed or expropriated, how does Section 46 of the Income Tax Act, 2058 defer capital gains upon acquiring replacement property within one year?",
    shortTopic: "Section 46 Involuntary Disposal & 1-Year Replacement Rollover",
    category: "Income Tax",
    keywords: [
      "Section 46",
      "Involuntary Disposal",
      "Replacement Rollover",
      "1-Year Window",
      "Cost Base",
    ],
    answer:
      "Under Section 46(1) of the Income Tax Act, 2058, if a person involuntarily disposes of property (such as via destruction, theft, or expropriation under Section 40(1)), acquires ownership of replacement property of a similar type within 1 year, and applies in writing, immediate gain recognition is deferred: the deemed disposal proceeds equal the property's pre-disposal net cost plus only the excess (if any) of compensation received over the replacement property's cost. Correspondingly, the replacement asset's tax cost base equals the old asset's pre-disposal net cost plus any excess cost paid above the disposal proceeds.",
    citation: "Section 46(1)–(2)",
    reasoningSteps: [
      "Check Section 46(1) conditions: involuntary disposal (Sec 40(1)) + acquisition of similar-type replacement asset within 1 year + written election.",
      "Compute deemed disposal incomings under Sec 46(1)(a): old net expenses + max(0, compensation received - replacement cost).",
      "Compute replacement asset cost base under Sec 46(1)(b): old net expenses + max(0, replacement cost - compensation received).",
    ],
    rateTable: {
      title: "Section 46 Replacement Rollover Formulas",
      columns: [
        "Rollover Scenario",
        "Immediate Taxable Gain",
        "New Asset Cost Base",
      ],
      rows: [
        [
          "Replacement Cost ≥ Proceeds",
          "Nil (full deferral)",
          "Old Net Cost + (New Cost - Proceeds)",
        ],
        [
          "Replacement Cost < Proceeds",
          "Proceeds - Replacement Cost",
          "Old Net Cost (excess taxed now)",
        ],
      ],
    },
    followUps: [
      "How does Section 57 treat assets upon a 50% change in control?",
      "How are depreciable asset disposals calculated under Schedule 2 Section 4?",
      "What are the advance tax installment exclusions for NBCA capital gains under Section 95Ka?",
    ],
  }),
  buildItaDeepEntry({
    id: "ita2058-sec-59-60-banking-carryback-insurance",
    question:
      "How does Section 59 of the Income Tax Act, 2058 require banking businesses to isolate income and permit a 5-year loss carryback, and how does Section 60 segregate general insurance computation?",
    shortTopic:
      "Banking 5-Year Loss Carryback & Insurance Isolation (Secs. 59–60)",
    category: "Acts",
    keywords: [
      "Section 59",
      "Section 60",
      "Banking Business",
      "5-Year Loss Carryback",
      "General Insurance",
    ],
    answer:
      "Under Section 59(1) of the Income Tax Act, 2058, income or loss from a banking business must be computed separately as a distinct business from any other business carried on by that person. Uniquely, Section 59(2)–(3) permits a banking business that suffers a loss to carry that loss backward and deduct it from banking business income of the past 5 income years (capped at each prior year's banking income and reducing any Section 20 carryforward). Similarly, Section 60(1) mandates isolated business-by-business computation for general insurance operations.",
    citation: "Section 59(1)–(3), Section 60(1)",
    reasoningSteps: [
      "Apply Section 59(1): isolate banking business income/loss from non-banking activities.",
      "Apply Section 59(2)–(3): banking losses may be carried back up to 5 prior income years (subject to prior-year banking income limits and Section 20 coordination).",
      "Compare Section 60(1): general insurance income/loss must likewise be computed separately from other businesses.",
    ],
    rateTable: {
      title: "Banking vs. General Business Loss Offset Rules",
      columns: [
        "Business Category",
        "Loss Direction / Window",
        "Governing Section",
      ],
      rows: [
        [
          "General Business",
          "Carryforward only (unless Sec 20(4) long-term contract)",
          "Section 20(1) & (4)",
        ],
        [
          "Banking Business (BFIs)",
          "Carryback up to 5 prior income years",
          "Section 59(2)–(3)",
        ],
        [
          "General Insurance",
          "Computed as separate distinct business",
          "Section 60(1)",
        ],
      ],
    },
    followUps: [
      "Can post-change-of-control losses be carried back under Section 59 after a 50% ownership shift under Section 57?",
      "What corporate tax rate applies to banks and general insurers under Schedule 1 Section 2(2)?",
      "What TDS rate applies to BFIs borrowing foreign currency from abroad?",
    ],
  }),
  buildItaDeepEntry({
    id: "ita2058-sec-67-nepal-source-income-rules",
    question:
      "How does Section 67 of the Income Tax Act, 2058 determine whether income, loss, or asset-disposal gains have a 'source in Nepal'?",
    shortTopic: "Section 67 Nepal-Source Income & Loss Rules",
    category: "Income Tax",
    keywords: [
      "Section 67",
      "Source in Nepal",
      "Nepal-Sourced Income",
      "Non-Resident Taxation",
      "Asset Situs",
    ],
    answer:
      "Under Section 67(1)–(2) of the Income Tax Act, 2058, net income or net loss from an employment, business, or investment has a source in Nepal to the extent Nepal-sourced inclusions exceed Nepal-sourced deductions (or vice versa for losses). Under Section 67(3)–(4), Nepal-sourced amounts include net gains from disposing of property situated in Nepal or liabilities to be borne in Nepal, other Section 7/9 disposal/balancing inclusions tied to Nepal situs property/liabilities, and received payments having a source in Nepal.",
    citation: "Section 67(1)–(4)",
    reasoningSteps: [
      "Apply Section 67(1)–(2) netting test: compare Nepal-sourced inclusions vs. Nepal-sourced deductions for each employment, business, or investment.",
      "Apply Section 67(3)–(4) situs rules: gains or losses from disposing of property situated in Nepal or liabilities to be borne in Nepal always have a Nepal source.",
      "Tie to Section 3(b)/(c): non-residents are taxed strictly on income having a source in Nepal.",
    ],
    rateTable: {
      title: "Section 67 Source-of-Income Framework",
      columns: ["Income / Gain Element", "Nepal-Source Test", "Sub-section"],
      rows: [
        [
          "Net Business/Investment Income",
          "Nepal-sourced inclusions > deductions",
          "Section 67(1)",
        ],
        [
          "Net Business/Investment Loss",
          "Nepal-sourced deductions > inclusions",
          "Section 67(2)",
        ],
        [
          "Property / Liability Disposal Gain",
          "Property situated or liability borne in Nepal",
          "Section 67(4)",
        ],
      ],
    },
    followUps: [
      "How are non-resident airlines and telecom operators taxed on Nepal-source receipts under Section 70?",
      "How are Controlled Foreign Entities (CFCs) taxed under Section 69?",
      "How does the Foreign Tax Credit cap work under Section 71?",
    ],
  }),
  buildItaDeepEntry({
    id: "ita2058-sec-69-controlled-foreign-entities",
    question:
      "How does Section 69 of the Income Tax Act, 2058 tax Controlled Foreign Entities (CFCs), and how do resident beneficiaries claim credit for foreign taxes paid by the CFC?",
    shortTopic: "Section 69 Controlled Foreign Entities (CFC) Attribution",
    category: "Income Tax",
    keywords: [
      "Section 69",
      "Controlled Foreign Entity",
      "CFC",
      "Associated Income",
      "Foreign Tax Credit",
    ],
    answer:
      "Under Section 69(1)–(3) of the Income Tax Act, 2058, if a Controlled Foreign Entity is treated as having 'associated income' (computed as if it were a resident entity) at year-end, it is deemed to have distributed that associated income as dividends proportionately to its beneficiaries according to their income rights, retaining the original income type and source. Under Section 69(4)–(5), any Nepalese or foreign income tax paid by the CFC on that attributed income is allocated to the beneficiary and treated as paid by the beneficiary, qualifying for Foreign Tax Credit under Section 71.",
    citation: "Section 69(1)–(8)",
    reasoningSteps: [
      "Compute the CFC's 'associated income' as if it were a Nepalese resident entity (Section 69 Explanation (a)).",
      "Deem proportionate year-end distribution to beneficiaries under Section 69(1) & (3), preserving character and source.",
      "Allocate underlying taxes paid by the CFC under Section 69(4)–(5) so resident beneficiaries avoid double taxation via Section 71 tax credit.",
    ],
    rateTable: {
      title: "Section 69 CFC Attribution Mechanics",
      columns: ["CFC Element", "Statutory Treatment", "Sub-section"],
      rows: [
        [
          "Associated Income",
          "Computed as if CFC were a resident entity",
          "Section 69 Expl. (a)",
        ],
        [
          "Deemed Distribution",
          "Allocated proportionately to beneficiaries",
          "Section 69(1) & (3)",
        ],
        [
          "Underlying Tax Paid by CFC",
          "Set aside for beneficiary -> Sec 71 credit",
          "Section 69(4)–(5)",
        ],
      ],
    },
    followUps: [
      "How does Section 71 cap Foreign Tax Credits using Nepal's average tax rate?",
      "How is a Foreign Permanent Establishment taxed under Section 68?",
      "What determines whether income has a source in Nepal under Section 67?",
    ],
  }),
  buildItaDeepEntry({
    id: "ita2058-sec-70-shipping-air-telecom-nonresident",
    question:
      "Which receipts of non-resident water transport, air transport, and cable/satellite telecommunications operators are taxable in Nepal under Section 70, and at what flat rate under Schedule 1?",
    shortTopic: "Non-Resident Aviation, Charter & Telecom Tax (Section 70)",
    category: "Income Tax",
    keywords: [
      "Section 70",
      "Schedule 1 Section 2(7)",
      "Air Transport",
      "Telecommunications",
      "5 Percent Presumptive",
    ],
    answer:
      "Under Section 70(1) of the Income Tax Act, 2058, a non-resident operating water travel, charter service, or air transport is taxed on gross receipts from carrying passengers departing from Nepal or mail, animals, and goods dispatched from Nepal (excluding transshipment). Under Section 70(2), a non-resident operating cable, radio, optical fiber, or satellite communications is taxed on amounts derived from dispatching news or information through any device established in Nepal, regardless of origin. Under Section 70(3) and Schedule 1 Section 2(7), a flat 5% tax applies with no expense deductions and no tax adjustments.",
    citation: "Section 70(1)–(3), Schedule 1 Section 2(7)",
    reasoningSteps: [
      "Determine covered transport receipts under Section 70(1): outgoing passengers, mail, animals, or goods from Nepal (transshipment excluded).",
      "Determine covered telecom receipts under Section 70(2): dispatch via devices established in Nepal.",
      "Apply Schedule 1 Section 2(7) rate: 5% on gross Section 70 amounts; Section 70(3) proviso forbids expense deductions or tax credit adjustments.",
    ],
    rateTable: {
      title: "Section 70 Non-Resident Transport & Telecom Tax",
      columns: ["Sector", "Taxable Receipts", "Rate & Deductions"],
      rows: [
        [
          "Non-Resident Air/Water/Charter",
          "Passengers/mail/goods departing Nepal (excl. transshipment)",
          "5% gross (no deductions)",
        ],
        [
          "Non-Resident Telecom/Satellite",
          "Dispatches via device installed in Nepal",
          "5% gross (no deductions)",
        ],
      ],
    },
    followUps: [
      "How does Section 68 tax a Foreign Permanent Establishment branch in Nepal?",
      "How does the 2% Digital Service Tax differ from Section 70?",
      "When does a foreign company have to register a branch under Companies Act Section 154?",
    ],
  }),
  buildItaDeepEntry({
    id: "ita2058-sec-71-foreign-tax-credit-per-country",
    question:
      "How does Section 71 of the Income Tax Act, 2058 limit Foreign Tax Credits across countries, and what happens to excess foreign tax that cannot be credited in the current year?",
    shortTopic: "Section 71 Foreign Tax Credit Cap & Carryforward",
    category: "Income Tax",
    keywords: [
      "Section 71",
      "Foreign Tax Credit",
      "Average Rate of Tax",
      "Per-Country Limitation",
      "Credit Carryforward",
    ],
    answer:
      "Under Section 71(1)–(2) of the Income Tax Act, 2058, a resident person may claim a tax credit for foreign income tax paid on assessable foreign income, computed separately for each source country. For each country's computation, the credit cannot exceed the person's 'average rate of tax of Nepal' applied to that foreign income. Under Section 71(3), any excess foreign tax disallowed by the average-rate ceiling may be carried forward to future years and credited exclusively against future assessable foreign income from the same country. Alternatively, under Section 71(4), a taxpayer may waive the credit and deduct foreign income tax as an expense.",
    citation: "Section 71(1)–(4)",
    reasoningSteps: [
      "Segregate assessable foreign income and foreign taxes paid on a strict country-by-country basis (Section 71(2)(a)).",
      "Compute Nepal's average tax rate (Section 71 Explanation (b)) and cap each country's credit at (Average Nepal Tax Rate × Country's Assessable Foreign Income).",
      "Carry forward excess credits to future years exclusively for income sourced in the same country (Section 71(3)), or elect expense deduction under Section 71(4).",
    ],
    rateTable: {
      title: "Section 71 Foreign Tax Credit Rules",
      columns: ["Rule Element", "Statutory Mechanism", "Sub-section"],
      rows: [
        ["Basket Method", "Strict per-country computation", "Section 71(2)(a)"],
        [
          "Credit Ceiling",
          "Capped at Nepal average tax rate × foreign income",
          "Section 71(2)(b)",
        ],
        [
          "Excess Foreign Tax",
          "Carried forward per-country; never refunded (Sec 113(7))",
          "Section 71(3)",
        ],
        [
          "Alternative Election",
          "Forego credit to deduct foreign tax expense",
          "Section 71(4)",
        ],
      ],
    },
    followUps: [
      "Are carried-forward foreign tax credits forfeited after a 50% ownership change under Section 57(2)(h)?",
      "Can unused Section 71 foreign tax credits ever be refunded in cash under Section 113?",
      "How does Section 69 pass CFC taxes into Section 71 credits?",
    ],
  }),
  buildItaDeepEntry({
    id: "ita2058-sec-91-tds-certificate-15-days",
    question:
      "Within how many days must a withholding agent issue a Tax Withholding Certificate under Section 91 of the Income Tax Act, 2058, and how do advance vs. final TDS adjustments differ under Sections 92–93?",
    shortTopic: "Section 91 TDS Certificate Mandate & Credit Rules",
    category: "Income Tax",
    keywords: [
      "Section 91",
      "Section 92",
      "Section 93",
      "TDS Certificate",
      "15 Days",
      "Advance vs Final TDS",
    ],
    includeTdsGuide: true,
    answer:
      "Under Section 91(1)–(2) of the Income Tax Act, 2058, every withholding agent who deducts tax under Sections 87, 88, or 89 must furnish a certified Tax Withholding Certificate—setting out the gross payments and withheld amounts—to the payee within 15 days after the expiry of the month in which tax was withheld. Under Section 92, payments subject to final withholding (such as resident company dividends, non-business land/building rent to individuals, personal deposit interest, and non-resident payments) fully extinguish tax liability, whereas non-final TDS under Section 93 is credited strictly against the payee's tax payable for that income year.",
    citation: "Section 91(1)–(2), Section 92, Section 93",
    reasoningSteps: [
      "Check Section 91(1)–(2) obligation: certify withheld tax and paid amounts and deliver the certificate within 15 days of month-end.",
      "Distinguish Section 92 final withholding: taxpayer has fulfilled tax liability and does not claim credits or include the receipt in return computation.",
      "Apply Section 93 advance credit rule: non-final TDS (e.g., business service fees or Sec. 89 contracts) is treated as tax paid and adjusted in that income year.",
    ],
    rateTable: {
      title: "TDS Certificates & Credit Classification (Secs. 91–93)",
      columns: ["Requirement / Type", "Statutory Rule", "Section"],
      rows: [
        [
          "TDS Certificate Delivery",
          "Within 15 days from month-end",
          "Section 91(2)",
        ],
        [
          "Final Withholding (e.g., Dividend, NR TDS)",
          "Tax obligation extinguished; no credit",
          "Section 92(1)–(2)",
        ],
        [
          "Advance Withholding (e.g., Sec 89 Contract)",
          "Creditable against year's tax payable",
          "Section 93(2)–(3)",
        ],
      ],
    },
    followUps: [
      "Within how many days must withheld TDS and e-TDS statements be deposited under Section 90?",
      "Can a withholding agent recover Chapter 22 late-deposit interest from the payee under Section 119(3)?",
      "How does the 10-day contract aggregation rule trigger Section 89 TDS?",
    ],
  }),
  buildItaDeepEntry({
    id: "ita2058-sec-103-109-110-tax-recovery-garnishment",
    question:
      "What priority lien applies to withheld taxes if an agent goes bankrupt under Section 103, and how can the IRD recover tax arrears from third-party debtors or non-resident agents under Sections 109–110?",
    shortTopic:
      "Withheld Tax Priority Lien & Third-Party Recovery (Secs. 103, 109–110)",
    category: "Acts",
    keywords: [
      "Section 103",
      "Section 109",
      "Section 110",
      "Priority Lien",
      "Bankruptcy",
      "Garnishment",
    ],
    answer:
      "Under Section 103(1)–(2) of the Income Tax Act, 2058, taxes withheld under Chapter 17 are deemed held in trust for the Government of Nepal, take precedence over court orders or other laws, cannot be attached for the agent's debts, and give the IRD first lien even if the withholding agent goes bankrupt or dissolves. For overdue tax arrears, Section 109 empowers the Department to issue written garnishment notices ordering third parties who owe or hold money for the tax defaulter to remit the owed funds directly to the IRD (discharging their debt to the taxpayer). For non-resident defaulters, Section 110 authorizes recovery up to the market value of Nepal property held by any agent/possessor.",
    citation: "Section 103(1)–(2), Section 109(1)–(4), Section 110(1)–(3)",
    reasoningSteps: [
      "Apply Section 103 trust/first-lien protection: Chapter 17 withheld taxes stay outside a bankrupt estate and rank first for the IRD.",
      "Apply Section 109 third-party garnishment: IRD can collect directly from payers/banks holding money for a delinquent taxpayer, shielding the payer from taxpayer claims.",
      "Apply Section 110 non-resident recovery: IRD can collect from anyone holding property of a delinquent non-resident up to the property's market value.",
    ],
    rateTable: {
      title: "Income Tax Priority & Third-Party Recovery Powers",
      columns: ["Enforcement Tool", "Target / Scope", "Section"],
      rows: [
        [
          "First Lien on Withheld Tax",
          "Excluded from bankruptcy assets; ranks first",
          "Section 103(2)(c)",
        ],
        [
          "Third-Party Debt Garnishment",
          "Direct payment from debtors/money-holders",
          "Section 109(1)",
        ],
        [
          "Non-Resident Property Agent",
          "Up to market value of property in possession",
          "Section 110(1)",
        ],
      ],
    },
    followUps: [
      "How does the IRD enforce property liens and auction sales under Sections 104–105?",
      "When must excess tax payments be refunded with interest under Section 113?",
      "What are the criminal penalties for non-payment of tax under Section 123?",
    ],
  }),
  buildItaDeepEntry({
    id: "ita2058-sec-113-tax-refund-2yr-limit-interest",
    question:
      "Within what limitation period must a taxpayer claim an excess tax refund under Section 113 of the Income Tax Act, 2058, when does the IRD owe interest, and can unused Section 51/71 credits be refunded?",
    shortTopic: "Section 113 Tax Refund 2-Year Limit & Interest Entitlement",
    category: "Income Tax",
    keywords: [
      "Section 113",
      "Tax Refund",
      "2-Year Limitation",
      "Refund Interest",
      "Medical Credit",
      "Foreign Tax Credit",
    ],
    answer:
      "Under Section 113(1)–(4) of the Income Tax Act, 2058, excess tax paid (along with any Section 119 interest on tax not due) is credited or refunded upon application filed within 2 years from the latest of: (a) the end of the income year, (b) the date of excess payment, or (c) the date the relevant case was decided—claims filed later are barred. Under Section 113(6), when refunding tax (including by court order), the Department must pay normal-rate interest from the Section 96 return due date (for Sections 93/94/100 excess) or from the payment date. Under Section 113(7), unused medical credits (Section 51) and foreign tax credits (Section 71) cannot be refunded in cash.",
    citation: "Section 113(1)–(7)",
    reasoningSteps: [
      "Verify 2-year claim bar under Section 113(4): measured from latest of income year-end, payment date, or case decision date.",
      "Apply Section 113(6) interest obligation: normal-rate interest paid by IRD on court-ordered or Section 93/94/100 excess refunds.",
      "Apply Section 113(7) non-refundability: unutilized Section 51 medical tax credits and Section 71 foreign tax credits cannot be refunded.",
    ],
    rateTable: {
      title: "Section 113 Tax Refund Rules",
      columns: ["Refund Parameter", "Statutory Rule", "Sub-section"],
      rows: [
        [
          "Claim Filing Deadline",
          "Within 2 years of latest trigger date",
          "Section 113(4)",
        ],
        [
          "Refund Interest by IRD",
          "Normal rate of interest on eligible refunds",
          "Section 113(6)",
        ],
        [
          "Sec 51 & Sec 71 Excess Credits",
          "Not refundable in cash",
          "Section 113(7)",
        ],
      ],
    },
    followUps: [
      "Compare Section 113's 2-year income tax refund limit with VAT Act Section 24A's 3-year limit.",
      "What are the deposit requirements to appeal an assessment under Sections 115–116?",
      "How are unused Section 71 foreign tax credits carried forward?",
    ],
  }),
  buildItaDeepEntry({
    id: "ita2058-sec-123-127-criminal-offenses-fines",
    question:
      "What criminal fines and imprisonment sentences apply under Chapter 23 (Sections 123–127) of the Income Tax Act, 2058 for non-payment, reckless false returns, obstructing officers, and aiding offenses?",
    shortTopic:
      "Chapter 23 Criminal Tax Offenses, Prison & Accomplice Liability",
    category: "Acts",
    keywords: [
      "Section 123",
      "Section 124",
      "Section 125",
      "Section 126",
      "Section 127",
      "Tax Offenses",
      "Imprisonment",
    ],
    answer:
      "Chapter 23 of the Income Tax Act, 2058 prescribes criminal penalties alongside administrative fees: (1) Section 123: failure to pay tax without reasonable ground carries NPR 5,000–30,000 fine and/or 1–3 months' imprisonment; (2) Section 124: intentional or reckless false/misleading statements carry NPR 40,000–160,000 fine and/or 6 months to 2 years' imprisonment; (3) Section 125: obstructing tax officers or ignoring Section 83 notices carries NPR 5,000–20,000 fine and/or 1–3 months' prison (half for attempt); (4) Section 126(2): unauthorized collection of tax carries NPR 80,000–200,000 fine and/or 1–3 years' prison; and (5) Section 127: intentional accomplices or advisors receive half the principal offender's punishment.",
    citation: "Section 123, Section 124, Section 125, Section 126, Section 127",
    reasoningSteps: [
      "Distinguish Chapter 22 administrative fees/interest (Secs. 117–120) from Chapter 23 criminal prosecutions (Secs. 123–127).",
      "Check exact statutory fine and imprisonment bands under Sections 123, 124, 125, and 126.",
      "Apply Section 127 accomplice rule: half punishment for intentional aiders/advisors (noting enhanced accountability if the accomplice is a government employee).",
    ],
    rateTable: {
      title: "Chapter 23 Criminal Tax Offense Sentences",
      columns: ["Offense", "Fine Range (NPR)", "Imprisonment", "Section"],
      rows: [
        [
          "Non-payment without reasonable ground",
          "5,000 – 30,000",
          "1 – 3 months",
          "Section 123",
        ],
        [
          "Intentional/reckless false statement",
          "40,000 – 160,000",
          "6 months – 2 years",
          "Section 124",
        ],
        [
          "Obstructing officer / Sec 83 default",
          "5,000 – 20,000",
          "1 – 3 months (½ attempt)",
          "Section 125",
        ],
        [
          "Unauthorized collection of tax",
          "80,000 – 200,000",
          "1 – 3 years",
          "Section 126(2)",
        ],
        [
          "Intentional aider / abettor / advisor",
          "50% of offender penalty",
          "50% of offender term",
          "Section 127",
        ],
      ],
    },
    followUps: [
      "How do Chapter 23 criminal penalties compare with VAT Act Section 29 fraud and abettor penalties?",
      "What administrative fees apply under Section 117 and Section 120 for non-fraudulent errors?",
      "Within how many years can the IRD amend a fraudulent tax assessment under Section 101(4)?",
    ],
  }),
];
