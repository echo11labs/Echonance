import type { MockQAPair } from "../mock-tax-chat";
import { EDITORIAL_BOARD_CONTRIBUTOR } from "./finance-bill-2083-helpers";

const COMPANIES_ACT_SOURCE_FILE = "docs/Files/Nepal_Companies.pdf";
const COMPANIES_ACT_SOURCE_URL = "/api/sources/companies-act-2063";
const COMPANIES_ACT_LIBRARY_ID = "companies-act-2063";

interface CompaniesActSeedInput {
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

function buildCompaniesActEntry(input: CompaniesActSeedInput): MockQAPair {
  return {
    id: input.id,
    question: input.question,
    shortTopic: input.shortTopic,
    category: "Acts",
    fiscalYear: "General",
    keywords: [...input.keywords, "Companies Act 2063"],
    answer: input.answer,
    responseType: "tabular-schedule",
    thoughtProcess: {
      duration: "1.3s",
      summary: `Corporate law analysis verified against ${COMPANIES_ACT_SOURCE_FILE} (${input.citation}).`,
      steps: input.reasoningSteps,
    },
    rateTable: input.rateTable,
    resources: [
      {
        title: "The Companies Act, 2063 (2006)",
        citation: `${input.citation} · Source: ${COMPANIES_ACT_SOURCE_FILE}`,
        authority: "Office of Company Registrar (OCR) / Nepal Law Commission",
        libraryId: COMPANIES_ACT_LIBRARY_ID,
        externalUrl: COMPANIES_ACT_SOURCE_URL,
      },
    ],
    followUps: input.followUps,
    contributor: EDITORIAL_BOARD_CONTRIBUTOR,
  };
}

export const COMPANIES_ACT_2063_EN: MockQAPair[] = [
  buildCompaniesActEntry({
    id: "ca2063-sec-9-12-shareholder-capital-limits",
    question:
      "What are the statutory limits on shareholder count and minimum paid-up capital for private versus public companies under the Companies Act, 2063, and which sectors must incorporate as public companies?",
    shortTopic: "Private vs. Public Company Thresholds & Capital",
    keywords: [
      "Section 9",
      "Section 11",
      "Section 12",
      "50 Shareholders",
      "10 Million Capital",
      "Public Company",
    ],
    answer:
      "Under Section 9 of the Companies Act, 2063, a private company cannot have more than 50 shareholders (excluding employees who purchased shares under an employee share scheme), whereas a public company requires a minimum of 7 shareholders with no maximum ceiling. Under Section 11(1), a public company must maintain a minimum paid-up capital of NPR 10,000,000 unless higher capital is prescribed by law or Gazette notice. Under Section 12, businesses carrying on banking, financial transactions, insurance, stock exchanges, pension funds, or mutual funds must incorporate as public companies.",
    citation: "Section 9, Section 11, Section 12",
    reasoningSteps: [
      "Check shareholder limits under Section 9(1)–(3): private company cap is 50 (employees under employee share schemes excluded); public company floor is 7.",
      "Review minimum capital under Section 11(1): NPR 10,000,000 paid-up capital for public companies.",
      "Verify regulated sector mandates under Section 12: banking, financial, insurance, stock exchange, pension fund, and mutual fund businesses cannot incorporate as private companies.",
    ],
    rateTable: {
      title: "Private vs. Public Company Statutory Benchmarks",
      columns: ["Parameter", "Private Company", "Public Company", "Section"],
      rows: [
        [
          "Shareholder Limit",
          "Maximum 50 (excl. ESOP)",
          "Minimum 7, no maximum",
          "Section 9",
        ],
        [
          "Minimum Paid-Up Capital",
          "As specified in MOA/AOA",
          "NPR 10,000,000",
          "Section 11",
        ],
        [
          "Banking/Insurance/Mutual Fund",
          "Prohibited",
          "Mandatory public form",
          "Section 12",
        ],
      ],
    },
    followUps: [
      "What operating restrictions apply to private and non-profit companies under Section 10?",
      "What quorum and voting thresholds govern public company general meetings?",
      "When must a foreign company register a branch or liaison office under Section 154?",
    ],
  }),
  buildCompaniesActEntry({
    id: "ca2063-sec-10-company-operating-terms",
    question:
      "What mandatory naming suffixes and statutory business restrictions apply to private companies, public companies, and companies not distributing profits under Section 10 of the Companies Act, 2063?",
    shortTopic: "Section 10 Statutory Company Restrictions",
    keywords: [
      "Section 10",
      "Private Limited",
      "Not Distributing Profit",
      "Partnership Ban",
      "Securities Transfer",
    ],
    answer:
      "Under Section 10 of the Companies Act, 2063, every company must conduct all transactions in its own name, append 'private limited' (private) or 'limited' (public) to its name (exempt for companies not distributing profit), and never open a partnership or private firm (Section 10(e)). A private company is prohibited from selling shares or debentures publicly (Section 10(c)) or transferring/pledging title to non-shareholders without following the consensus agreement (Section 10(d)). A company not distributing profits cannot distribute dividends or make direct or indirect payments to members or their close relatives (Section 10(f)).",
    citation: "Section 10(a)–(f)",
    reasoningSteps: [
      "Check naming rules under Section 10(b): 'private limited' vs 'limited', with exemption for non-profit-distributing companies.",
      "Review share-transfer limits under Section 10(c)–(d): private companies cannot offer shares publicly or transfer to outsiders contrary to consensus agreement procedures.",
      "Apply structural prohibitions under Section 10(e)–(f): no company may open a partnership/private firm, and non-profit companies cannot pay dividends or distributions to members or close relatives.",
    ],
    rateTable: {
      title: "Section 10 Mandatory Company Terms",
      columns: ["Restriction / Rule", "Applicability", "Clause"],
      rows: [
        [
          "Naming suffix ('Private Limited' / 'Limited')",
          "All profit-distributing companies",
          "Section 10(b)",
        ],
        [
          "Public sale of shares/debentures barred",
          "Private companies",
          "Section 10(c)",
        ],
        [
          "Ban on opening partnership or private firm",
          "All companies",
          "Section 10(e)",
        ],
        [
          "Ban on dividends/payments to members",
          "Companies not distributing profits",
          "Section 10(f)",
        ],
      ],
    },
    followUps: [
      "Under what conditions may a company buy back its own shares under Section 61?",
      "How many shareholders and how much paid-up capital must a public company have?",
      "What financial statements and directors' reports are required under Section 109?",
    ],
  }),
  buildCompaniesActEntry({
    id: "ca2063-sec-61-share-buyback-conditions",
    question:
      "Under Section 61 of the Companies Act, 2063, when is a company permitted to buy back its own shares, and what financial ratio and percentage ceilings apply?",
    shortTopic: "Section 61 Share Buy-Back Conditions & Caps",
    keywords: [
      "Section 61",
      "Share Buy-Back",
      "Free Reserves",
      "20 Percent Cap",
      "Debt Equity Ratio",
      "Special Resolution",
    ],
    answer:
      "While Section 61(1) generally prohibits a company from buying back its own shares or lending against their security, Section 61(2) permits a buy-back out of free reserves available for dividend distribution (upon notifying the OCR) if all conditions are satisfied: shares are fully paid up; public company shares are listed with the Securities Board; articles authorize buy-back; a special resolution is passed; post-buy-back debt does not exceed twice the capital and general reserve fund (2:1); and the buy-back value does not exceed 20% of total paid-up capital and general reserve fund.",
    citation: "Section 61(1)–(3)",
    reasoningSteps: [
      "Note baseline ban in Section 61(1) on own-share purchase or security lending.",
      "Verify source of funds under Section 61(2): only free reserves available for dividend distribution.",
      "Check corporate prerequisites: fully paid-up shares, AOA authorization, Securities Board listing (for public companies), and general meeting special resolution.",
      "Apply financial ceilings under Section 61(2)(e)–(f): post-buy-back debt ≤ 2× (capital + general reserve), and buy-back value ≤ 20% of (paid-up capital + general reserve).",
    ],
    rateTable: {
      title: "Section 61(2) Share Buy-Back Financial Ceilings",
      columns: ["Condition", "Statutory Benchmark", "Clause"],
      rows: [
        [
          "Funding Source",
          "Free reserves available for dividend",
          "Section 61(2)",
        ],
        [
          "Max Buy-Back Value",
          "≤ 20% of paid-up capital + general reserve",
          "Section 61(2)(f)",
        ],
        [
          "Post-Buy-Back Debt Cap",
          "Debt ≤ 2× (capital + general reserve)",
          "Section 61(2)(e)",
        ],
        [
          "Shareholder Approval",
          "Special resolution (≥ 75% votes present)",
          "Section 61(2)(d)",
        ],
      ],
    },
    followUps: [
      "What voting threshold is needed to pass a special resolution under Section 74?",
      "What statutory conditions govern dividend payouts under Section 182?",
      "What are the shareholder limits and paid-up capital rules for public companies?",
    ],
  }),
  buildCompaniesActEntry({
    id: "ca2063-sec-73-75-quorum-special-resolution",
    question:
      "What are the quorum requirements for a public company's general meeting, how is a special resolution passed, and within how many days must minutes be sent to shareholders under Sections 73–75?",
    shortTopic: "General Meeting Quorum, Special Resolutions & Minutes",
    keywords: [
      "Section 73",
      "Section 74",
      "Section 75",
      "Quorum",
      "Special Resolution",
      "75 Percent",
      "30 Days Minutes",
    ],
    answer:
      "Under Section 73(2), unless the articles specify a higher threshold, a public company general meeting requires at least 3 shareholders representing more than 50% of total allotted shares (in person or by proxy). If adjourned for lack of quorum and re-convened with at least 7 days' notice, Section 73(3) lowers the quorum to at least 3 shareholders representing 25% of total allotted shares. Under Section 74(3), ordinary resolutions pass by simple majority, whereas special resolutions require approval by shareholders representing at least 75% of shares present. Under Section 75(3), signed minutes must be sent to shareholders within 30 days (unless published in a national daily).",
    citation: "Section 73, Section 74, Section 75",
    reasoningSteps: [
      "Apply Section 73(2) primary quorum for public companies: ≥ 3 shareholders representing > 50% of allotted shares.",
      "Apply Section 73(3) adjourned meeting rule: after ≥ 7 days' notice, ≥ 3 shareholders representing 25% of allotted shares suffice.",
      "Check voting threshold under Section 74(3): ordinary majority vs. ≥ 75% of shares present for a special resolution (Chair holds a casting vote on tie under Section 74(4)).",
      "Check Section 75(3): send minutes within 30 days of the meeting or publish in a national daily newspaper.",
    ],
    rateTable: {
      title: "General Meeting Quorum & Voting Matrix",
      columns: ["Requirement", "Statutory Standard", "Provision"],
      rows: [
        [
          "Primary Public Quorum",
          "≥ 3 shareholders (> 50% allotted shares)",
          "Section 73(2)",
        ],
        [
          "Re-convened Quorum (7d notice)",
          "≥ 3 shareholders (≥ 25% allotted shares)",
          "Section 73(3)",
        ],
        [
          "Special Resolution Approval",
          "≥ 75% of shares present in meeting",
          "Section 74(3) Proviso",
        ],
        [
          "Minutes Circulation Deadline",
          "Within 30 days (or national daily notice)",
          "Section 75(3)",
        ],
      ],
    },
    followUps: [
      "Within how many months of fiscal year-end must a public company hold its AGM under Section 76?",
      "What matters must be placed before the AGM and filed with the OCR 21 days in advance?",
      "When is a special resolution required for share buy-backs under Section 61?",
    ],
  }),
  buildCompaniesActEntry({
    id: "ca2063-sec-76-78-agm-timelines-reporting",
    question:
      "Within what statutory deadlines must a public company hold its first and subsequent Annual General Meetings (AGMs), and what 21-day advance disclosures and OCR filings are required under Sections 76–78?",
    shortTopic: "Public Company AGM Deadlines & 21-Day Filings",
    keywords: [
      "Section 76",
      "Section 77",
      "Section 78",
      "AGM Deadline",
      "6 Months",
      "21 Days Notice",
    ],
    answer:
      "Under Section 76(1) of the Companies Act, 2063, a public company must hold its first AGM within 1 year of receiving permission to commence business, and every subsequent AGM within 6 months after the expiry of its financial year. If it defaults even after 3 additional months, the Office of Company Registrar (OCR) may direct it to hold the AGM (Section 76(2)), failing which any shareholder may petition the court (Section 76(3)). At least 21 days before the AGM, the company must enable shareholder inspection of audited financial statements, directors' reports, and auditor's reports (Section 77(3)) and file a board-approved, auditor-certified shareholding/loan report with the OCR (Section 78).",
    citation: "Section 76, Section 77, Section 78",
    reasoningSteps: [
      "Verify AGM deadlines under Section 76(1): 1 year from business commencement permission (first AGM) and 6 months from fiscal year-end (annual AGMs).",
      "Note escalation ladder under Section 76(2)–(4): OCR direction after 3 months' delay, court petition after another 3 months, where attendees form quorum.",
      "Confirm 21-day pre-AGM compliance under Section 77(3) (shareholder access & newspaper notice) and Section 78 (auditor-certified report to OCR).",
    ],
    rateTable: {
      title: "Public Company AGM Compliance Calendar",
      columns: ["Obligation", "Statutory Deadline", "Section"],
      rows: [
        ["First AGM", "Within 1 year of commencement permit", "Section 76(1)"],
        [
          "Subsequent Annual AGMs",
          "Within 6 months of financial year-end",
          "Section 76(1)",
        ],
        [
          "Inspection & Newspaper Notice",
          "At least 21 days prior to AGM",
          "Section 77(3)",
        ],
        [
          "Pre-AGM Report to OCR",
          "At least 21 days prior to AGM",
          "Section 78",
        ],
      ],
    },
    followUps: [
      "What quorum is required at an AGM under Section 73?",
      "When must financial statements be finalized before the AGM under Section 109?",
      "Who appoints the company auditor at the AGM under Section 111?",
    ],
  }),
  buildCompaniesActEntry({
    id: "ca2063-sec-86-89-board-independent-directors",
    question:
      "How many directors and independent directors must a public company board have under Section 86, what is the default share qualification under Section 88, and who is disqualified under Section 89?",
    shortTopic: "Board Composition, Independent Directors & Disqualifications",
    keywords: [
      "Section 86",
      "Section 88",
      "Section 89",
      "Independent Director",
      "Board of Directors",
      "100 Shares",
    ],
    answer:
      "Under Section 86(2), a public company must have a Board of Directors of at least 3 and at most 11 directors (private companies follow their articles). Under Section 86(3), a public board must include at least 1 independent director if it has up to 7 directors, and at least 2 independent directors if it exceeds 7 directors. Under Section 88, unless articles state otherwise, a director must hold at least 100 shares (independent directors and corporate-body nominees are exempt). Under Section 89(1), persons under 21 (public companies), of unsound mind, undischarged insolvents (within 5 years), or convicted of corruption or moral turpitude (3-year cooling-off for private companies) are disqualified.",
    citation: "Section 86, Section 88, Section 89(1)",
    reasoningSteps: [
      "Check board size under Section 86(1)–(2): private companies per articles; public companies 3 to 11 directors.",
      "Apply independent director quotas under Section 86(3): ≥ 1 for ≤ 7 directors; ≥ 2 for 8–11 directors.",
      "Review share qualification under Section 88: minimum 100 shares default, exempting independent directors and corporate-body nominees.",
      "Apply disqualification grounds under Section 89(1)(a)–(d): age < 21 in public companies, unsound mind, 5-year insolvency bar, corruption/moral turpitude conviction.",
    ],
    rateTable: {
      title: "Public Company Board Governance Benchmarks",
      columns: ["Governance Rule", "Statutory Threshold", "Section"],
      rows: [
        ["Board Size (Public)", "3 to 11 directors", "Section 86(2)"],
        [
          "Independent Directors (≤ 7 board)",
          "Minimum 1 independent director",
          "Section 86(3)",
        ],
        [
          "Independent Directors (> 7 board)",
          "Minimum 2 independent directors",
          "Section 86(3)",
        ],
        [
          "Default Share Qualification",
          "100 shares (exempt: independent / corporate)",
          "Section 88",
        ],
      ],
    },
    followUps: [
      "When must the Board prepare annual financial statements and a Directors' Report under Section 109?",
      "Who appoints and rotates auditors under Sections 111–112?",
      "Under what conditions may the Board distribute interim dividends under Section 182(7)?",
    ],
  }),
  buildCompaniesActEntry({
    id: "ca2063-sec-109-financial-statements-board-report",
    question:
      "Within what timeframe must a company prepare its annual financial statements under Section 109, and which private companies are legally required to prepare a separate Report of the Board of Directors?",
    shortTopic: "Annual Financial Statements & Directors' Report Threshold",
    keywords: [
      "Section 109",
      "Financial Statements",
      "Directors Report",
      "NPR 10 Million Threshold",
      "Balance Sheet",
      "Cash Flow",
    ],
    answer:
      "Under Section 109(1) of the Companies Act, 2063, annual financial statements (Balance Sheet, Profit and Loss Account, and Cash Flow statement) must be prepared by the Board of Directors, approved, and audited at least 30 days prior to the AGM for a public company, and within 6 months of the financial year-end for a private company. Under Section 109(4), every public company AND every private company having a paid-up capital of NPR 10,000,000 or more OR an annual turnover of NPR 10,000,000 or more must also prepare a separate Report of the Board of Directors covering transactions, audit remarks, dividend recommendations, and share forfeitures.",
    citation: "Section 109(1)–(4)",
    reasoningSteps: [
      "Identify mandatory financial statement components under Section 109(1)(a)–(c): balance sheet, profit & loss account, and cash flow description.",
      "Verify preparation deadlines under Section 109(1): ≥ 30 days before AGM (public) vs. within 6 months of FY end (private).",
      "Confirm audit and Board approval under Section 109(3).",
      "Check Section 109(4) Directors' Report trigger: all public companies, plus private companies with ≥ NPR 10M paid-up capital or ≥ NPR 10M annual turnover.",
    ],
    rateTable: {
      title: "Section 109 Financial Reporting Requirements",
      columns: [
        "Entity Type",
        "Financial Statement Deadline",
        "Directors' Report Mandatory?",
      ],
      rows: [
        [
          "Public Company",
          "≥ 30 days before AGM",
          "Always mandatory (Sec 109(4))",
        ],
        [
          "Private Company (Cap/Turnover ≥ NPR 10M)",
          "Within 6 months of FY-end",
          "Mandatory (Sec 109(4))",
        ],
        [
          "Private Company (Cap & Turnover < NPR 10M)",
          "Within 6 months of FY-end",
          "Not mandated under Sec 109(4)",
        ],
      ],
    },
    followUps: [
      "What auditor rotation and disqualification rules apply under Sections 111–112?",
      "Within how many days must dividends be distributed once approved under Section 182?",
      "What reports must be submitted to the OCR 21 days before a public AGM?",
    ],
  }),
  buildCompaniesActEntry({
    id: "ca2063-sec-111-112-auditor-appointment-disqualifications",
    question:
      "How long can an auditor serve consecutively for a public company under Section 111, within how many days must OCR be notified of appointment, and which persons are disqualified under Section 112?",
    shortTopic: "Auditor Appointment, 3-Term Rotation & Disqualifications",
    keywords: [
      "Section 111",
      "Section 112",
      "Auditor Rotation",
      "3 Consecutive Terms",
      "15 Days OCR",
      "1 Percent Shareholder",
    ],
    answer:
      "Under Section 111(1)–(2), an auditor is appointed until the next AGM and the company must notify the Office of Company Registrar (OCR) within 15 days of appointment. Under Section 111(3), no auditor (nor their partner, ex-partner, employee, or ex-employee within a 3-year window) may be appointed for more than 3 consecutive terms to audit a public company. Under Section 112(1), disqualified persons include directors, management employees, debtors/overdue payers, substantial shareholders or shareholders holding 1% or more of paid-up capital (and their close relatives), limited-liability corporate bodies, and persons convicted of audit offenses, corruption, or fraud within the past 5 years.",
    citation: "Section 111(1)–(3), Section 112(1)",
    reasoningSteps: [
      "Check Section 111(1) appointment & filing rule: forward auditor's name to OCR within 15 days of appointment.",
      "Apply Section 111(3) public company rotation cap: maximum 3 consecutive terms (extended to partners/employees unless separated for ≥ 3 years).",
      "Review Section 112(1) independence bars: management/directors, debtors/defaulters, ≥ 1% shareholders and close relatives, limited-liability companies, and 5-year conviction bars.",
    ],
    rateTable: {
      title: "Statutory Auditor Rules (Sections 111–112)",
      columns: ["Rule", "Statutory Standard", "Provision"],
      rows: [
        ["OCR Notification", "Within 15 days of appointment", "Section 111(1)"],
        [
          "Public Company Term Cap",
          "Max 3 consecutive terms (3-yr separation)",
          "Section 111(3)",
        ],
        [
          "Shareholding Disqualification",
          "≥ 1% paid-up capital or close relative",
          "Section 112(1)(e)",
        ],
        [
          "Criminal / Audit Offense Bar",
          "5 years from sentence",
          "Section 112(1)(c) & (f)",
        ],
      ],
    },
    followUps: [
      "When must financial statements be audited before a public company AGM?",
      "What pre-audit reserves and depreciation deductions are required before paying dividends?",
      "What restrictions apply to foreign company liaison offices under Section 154?",
    ],
  }),
  buildCompaniesActEntry({
    id: "ca2063-sec-154-foreign-company-branch-liaison",
    question:
      "When must a foreign company register a branch or liaison office in Nepal under Section 154 of the Companies Act, 2063, and what activities are liaison offices and registered branches prohibited from doing?",
    shortTopic: "Foreign Company Branch & Liaison Office Rules",
    keywords: [
      "Section 154",
      "Foreign Company",
      "Branch Office",
      "Liaison Office",
      "30 Days Registration",
      "No Income Earning",
    ],
    answer:
      "Under Section 154(1), no foreign company may carry on business/transactions in Nepal for one month or more (or appoint a regular contact person/avail services) without registering a branch or liaison office with the OCR (mere share/loan investments or management in an existing Nepalese company with competent approval are excluded). The OCR must decide registration within 30 days (Section 154(4)–(5)). Crucially, a liaison office is prohibited from conducting any income-earning activity in Nepal (Section 154(6) proviso), and no foreign company registered under Section 154 may issue shares or debentures within Nepal (Section 154(11)).",
    citation: "Section 154(1)–(11)",
    reasoningSteps: [
      "Apply the 1-month presence / regular contact trigger in Section 154(1) Explanation.",
      "Note the carve-out in Section 154(1) proviso: investing in shares or lending to an existing company with competent body approval does not require branch registration.",
      "Verify OCR processing time under Section 154(4)–(5): 30 days to issue registration certificate or reasoned refusal.",
      "Enforce restrictions: liaison offices cannot conduct income-earning activity (Sec. 154(6) proviso), and registered foreign companies cannot issue shares or debentures in Nepal (Sec. 154(11)).",
    ],
    rateTable: {
      title: "Foreign Company Presence Rules (Section 154)",
      columns: [
        "Entity / Trigger",
        "Permitted Scope & Constraints",
        "Sub-section",
      ],
      rows: [
        [
          "Presence Trigger",
          "≥ 1 month transaction / office / regular contact",
          "Section 154(1) Expl.",
        ],
        [
          "OCR Registration Timeline",
          "Within 30 days of application",
          "Section 154(4)–(5)",
        ],
        [
          "Liaison Office",
          "Strictly barred from income-earning activity",
          "Section 154(6) Proviso",
        ],
        [
          "Branch / Foreign Office",
          "Cannot issue shares or debentures in Nepal",
          "Section 154(11)",
        ],
      ],
    },
    followUps: [
      "How is a registered foreign branch taxed as a Foreign Permanent Establishment (FPE) under Income Tax Act Section 68?",
      "What mandatory board, invoice, and registration number disclosures apply under Section 154(9)?",
      "What are the private vs. public company shareholder limits under Section 9?",
    ],
  }),
  buildCompaniesActEntry({
    id: "ca2063-sec-182-dividend-distribution-unclaimed-fund",
    question:
      "Within how many days must declared dividends be paid under Section 182 of the Companies Act, 2063, what mandatory deductions precede dividend declaration, and when do unclaimed dividends transfer to the Investor Protection Fund?",
    shortTopic: "Dividend Payout Deadlines, Reserves & 5-Year Unclaimed Fund",
    keywords: [
      "Section 182",
      "Dividend Distribution",
      "45 Days",
      "Interim Dividend",
      "Investor Protection Fund",
      "5 Years Unclaimed",
    ],
    answer:
      "Under Section 182(1) and (11), declared dividends must be transferred to a separate bank account and distributed to shareholders within 45 days of the general meeting decision (late payouts attract prescribed interest under Section 182(3)). Under Section 182(6), a company cannot declare dividends without first fully deducting pre-operation expenses, statutory depreciation, legally required reserves, and accumulated losses from prior years. Interim dividends are allowed under Section 182(7) only if authorized by articles and after the prior year's financial statements are audited and board-approved. Unclaimed dividends after 5 years must be transferred to the Investor Protection Fund under Section 183 after publishing a 1-month national newspaper notice (Section 182(9)–(10)).",
    citation: "Section 182(1)–(11), Section 183",
    reasoningSteps: [
      "Verify the 45-day payout and segregated account mandates under Section 182(1) and (11).",
      "Apply Section 182(6) pre-distribution deduction checklist: pre-operation costs, depreciation, statutory reserves, and prior-year accumulated losses.",
      "Review Section 182(7) interim dividend conditions: AOA authorization + prior-year audited & board-approved financial statements.",
      "Apply Section 182(9)–(10): transfer dividends unclaimed for 5 years to the Section 183 Investor Protection Fund after a ≥ 1-month national daily notice.",
    ],
    rateTable: {
      title: "Section 182 Dividend Compliance Rules",
      columns: ["Requirement", "Statutory Benchmark", "Sub-section"],
      rows: [
        [
          "Payment & Separate Account",
          "Within 45 days of AGM approval",
          "Section 182(1) & (11)",
        ],
        [
          "Pre-Declaration Deductions",
          "Pre-op costs, depreciation, losses, reserves",
          "Section 182(6)",
        ],
        [
          "Interim Dividend",
          "AOA clause + prior-year audited statements",
          "Section 182(7)",
        ],
        [
          "Unclaimed Dividend Transfer",
          "After 5 years (+ ≥ 1-month newspaper notice)",
          "Section 182(9)–(10)",
        ],
      ],
    },
    followUps: [
      "Can shareholders at an AGM increase the dividend rate above what the Board recommended under Section 77(6)?",
      "What TDS rate applies to corporate dividend distributions under Income Tax Act Section 88/92?",
      "When may a company buy back shares out of distributable free reserves under Section 61?",
    ],
  }),
];
