import type { MockQAPair } from "../mock-tax-chat";
import {
  buildFinanceBillQaEntry,
  type FinanceBillSeedInput,
} from "./finance-bill-2083-helpers";

function buildModule6Entry(
  input: Omit<FinanceBillSeedInput, "category" | "citationTitle" | "libraryId">,
): MockQAPair {
  return buildFinanceBillQaEntry({
    ...input,
    category: "Tax Amnesties and Waivers",
    citationTitle: "Finance Bill, 2083",
  });
}

export const FINANCE_BILL_2083_MODULE_6_EN: MockQAPair[] = [
  buildModule6Entry({
    id: "fb2083-amnesty-sec-30-legacy-tax-writeoff",
    question:
      "What legacy taxes and outstanding assessments are permanently written off under Section 30 of Finance Bill, 2083, and what specific conditions apply to Income Tax Act, 2031 arrears?",
    shortTopic: "Waiver of Legacy Taxes and Income Tax Act 2031 Arrears",
    keywords: [
      "Section 30",
      "Legacy Taxes",
      "Sales Tax",
      "Hotel Tax",
      "Income Tax Act 2031",
      "Arrears Write-Off",
    ],
    answer:
      "Under Section 30(1) of Finance Bill, 2083, all outstanding excise arrears assessed under the old Excise Act, 2015, as well as all remaining arrears of hotel tax, entertainment tax, contract tax, and sales tax (which were repealed and superseded by the Value Added Tax Act, 2052), are completely and unconditionally waived. Under Section 30(2), for outstanding income tax assessed under the repealed Income Tax Act, 2031, the relevant tax office is legally authorized to write off the tax arrears if the liable person holds no PAN and is currently not engaged in any active income-earning business.",
    citation: "Section 30(1) & (2)",
    authority: "Inland Revenue Department (IRD)",
    reasoningSteps: [
      "Identify the statutory purpose: Clear decades-old, uncollectible tax ledger balances dating back to repealed tax laws.",
      "Review legacy indirect taxes: Unconditionally wipes out all arrears under the Excise Act 2015, Hotel Tax, Entertainment Tax, Contract Tax, and Sales Tax.",
      "Review legacy income tax criteria: Income Tax Act 2031 arrears are subject to two negative tests: the debtor must not possess an active Permanent Account Number (PAN), and must not be currently engaged in any income-generating business.",
      "Execute write-off: Once verified, the tax officer writes off the balance, eliminating taxpayer liability.",
    ],
    rateTable: {
      title: "Legacy Tax Arrears Relief under Section 30",
      columns: [
        "Repealed Tax Statute / Levy",
        "Condition for Relief",
        "Relief Mechanism",
        "Legal Basis",
      ],
      rows: [
        [
          "Excise Act, 2015 Arrears",
          "None (Automatic waiver)",
          "100% Write-off of principal, interest, & fines",
          "Section 30(1)",
        ],
        [
          "Hotel, Entertainment, Contract & Sales Taxes",
          "None (Automatic waiver)",
          "100% Write-off of historical balances",
          "Section 30(1)",
        ],
        [
          "Income Tax Act, 2031 Arrears",
          "No PAN and no active income-earning business",
          "Administrative write-off by tax office",
          "Section 30(2)",
        ],
      ],
    },
    followUps: [
      "What universal 1% arrears settlement applies to filed-but-unpaid taxes under Section 44?",
      "What three-tier income tax amnesty applies under Section 40?",
      "What VAT amnesty and paneer arrears waiver apply under Sections 41 and 42?",
    ],
  }),
  buildModule6Entry({
    id: "fb2083-amnesty-sec-34-post-clearance-audit",
    question:
      "What relief is granted under Section 34 of Finance Bill, 2083 for unpaid customs duty, excise, and VAT assessed through post-clearance audits?",
    shortTopic:
      "Waiver of Fines and Interest on Post-Clearance Audit Assessments",
    keywords: [
      "Section 34",
      "Post-Clearance Audit",
      "Customs Act 2082",
      "Poush 2083 Deadline",
      "Waiver of Fines and Interest",
    ],
    answer:
      "Section 34 of Finance Bill, 2083 establishes an amnesty for importers subject to post-clearance audit assessments under the Customs Act, 2064 or Customs Act, 2082 finalized by the end of Baishakh 2083. Where the assessed duty remains unpaid, or where an appeal is pending before the Revenue Tribunal or a competent court of law, if the importer withdraws the pending legal case and deposits the full principal assessed amount of customs duty, excise duty, and value added tax by the end of Poush 2083, all associated administrative fines and all interest accrued up to the date of application are completely waived.",
    citation: "Section 34",
    authority: "Department of Customs / Ministry of Finance",
    reasoningSteps: [
      "Verify assessment cutoff: The post-clearance audit assessment must have been issued on or before the end of Baishakh 2083.",
      "Check dispute status: If challenged in litigation (Revenue Tribunal, High Court, or Supreme Court), the importer must formally file a petition to withdraw the lawsuit.",
      "Determine payment requirement: 100% of the underlying principal customs duty, excise duty, and VAT must be deposited by the end of Poush 2083.",
      "Identify the waived amounts: 100% of accumulated interest and administrative penalties are wiped clean.",
    ],
    rateTable: {
      title: "Section 34 Post-Clearance Audit Settlement Rules",
      columns: [
        "Assessment Component",
        "Requirement to Qualify",
        "Settlement Outcome",
      ],
      rows: [
        [
          "Audit Assessment Date",
          "Issued by end of Baishakh 2083",
          "Eligible for amnesty",
        ],
        [
          "Pending Appeals / Litigation",
          "Must formally withdraw case",
          "Required condition",
        ],
        [
          "Principal Customs, Excise & VAT",
          "Deposit 100% by end of Poush 2083",
          "Mandatory payment",
        ],
        [
          "Accrued Interest and Penalties",
          "Subject to full compliance with above",
          "100% Waived",
        ],
      ],
    },
    followUps: [
      "What container release and demurrage exemption applies under Section 36?",
      "What administrative review right applies under Section 28A of the Customs Duty Act, 2081?",
      "What universal 1% arrears settlement applies under Section 44?",
    ],
  }),
  buildModule6Entry({
    id: "fb2083-amnesty-sec-36-shipping-containers",
    question:
      "What fee exemption and container release mechanism applies to shipping companies under Section 36 of Finance Bill, 2083?",
    shortTopic: "Exemption on Long-Stranded Shipping Containers",
    keywords: [
      "Section 36",
      "Shipping Containers",
      "Demurrage Exemption",
      "Customs Premises",
      "Mangsir 2083 Deadline",
    ],
    answer:
      "Section 36 of Finance Bill, 2083 provides a dedicated release window for domestic and foreign shipping companies whose cargo containers have remained stranded inside customs yards and dry ports for extended periods, regardless of whether the containers have been formally confiscated under prevailing customs laws. If the owning shipping company submits a formal application by the end of Mangsir 2083 to repatriate or take back the containers, the customs administration must permit their unconditional release without charging any customs fee, storage fee, penalty, or demurrage.",
    citation: "Section 36",
    authority: "Department of Customs / Ministry of Finance",
    reasoningSteps: [
      "Identify the eligible property: Freight and shipping containers belonging to domestic or international shipping lines stranded within customs borders.",
      "Check legal status: Applies even if formal confiscation proceedings have taken place.",
      "Determine deadline: The application to take back containers must be filed on or before the final day of Mangsir 2083.",
      "Review financial relief: Complete waiver of all demurrage, port storage charges, administrative fees, and penalties.",
    ],
    rateTable: {
      title: "Section 36 Container Repatriation Facility",
      columns: [
        "Compliance Element",
        "Statutory Rule / Condition",
        "Governing Provision",
      ],
      rows: [
        [
          "Eligible Assets",
          "Stranded domestic/foreign shipping containers",
          "Section 36",
        ],
        [
          "Legal Status of Asset",
          "Valid even if confiscated under customs law",
          "Section 36",
        ],
        ["Statutory Application Deadline", "End of Mangsir 2083", "Section 36"],
        [
          "Fee & Demurrage Waiver",
          "100% exemption on storage/demurrage fees",
          "Section 36",
        ],
      ],
    },
    followUps: [
      "What post-clearance audit relief is available under Section 34?",
      "What vehicle seizure protections apply under Section 59 of the Customs Act, 2082?",
      "What legacy indirect taxes are permanently written off under Section 30?",
    ],
  }),
  buildModule6Entry({
    id: "fb2083-amnesty-sec-37-entity-regularization",
    question:
      "What income tax and filing relief is granted to universities, foreign investors, diplomatic entities, and community schools under Section 37?",
    shortTopic: "Exemption and Filing Relief for Entities Entering the Tax Net",
    keywords: [
      "Section 37",
      "Universities",
      "Diplomatic Bodies",
      "Community Schools",
      "Income Tax Waiver",
    ],
    answer:
      "Section 37 of Finance Bill, 2083 provides that domestic universities, diplomatic bodies, development partners, or non-resident persons investing in Nepal—irrespective of whether they hold a PAN—are exempt from filing income tax returns or paying income tax for periods up to FY 2082/83, except for advance tax (TDS) already withheld at source. Furthermore, for community schools and community health institutions, if they file their FY 2082/83 income return, pay the tax due on that year, and submit an application by the end of Poush 2083, all obligations to file returns for prior years are waived, and all prior taxes, interest, and penalties on that historical income are completely discharged.",
    citation: "Section 37",
    authority: "Inland Revenue Department (IRD)",
    reasoningSteps: [
      "Distinguish international/university tier: Universities, diplomatic entities, and foreign investors are relieved from back-filing returns and back-taxes up to FY 2082/83, preserving only withheld TDS.",
      "Distinguish community tier: Community schools and community health centers must regularize by filing only the FY 2082/83 return and paying tax on that specific year.",
      "Determine deadline: Community entities must complete this filing and apply by the end of Poush 2083.",
      "Confirm prior waiver: Once completed, all returns, taxes, interest, and fines for all years prior to FY 2082/83 are fully waived.",
    ],
    rateTable: {
      title: "Section 37 Regularization Framework",
      columns: [
        "Entity Class",
        "Mandatory Action Required",
        "Filing Deadline",
        "Relief Granted",
      ],
      rows: [
        [
          "Universities & Foreign Investors",
          "None (TDS withheld remains final)",
          "Immediate",
          "No filing needed; historical tax exempt up to FY 82/83",
        ],
        [
          "Diplomatic Bodies & Dev. Partners",
          "None (TDS withheld remains final)",
          "Immediate",
          "No filing needed; historical tax exempt up to FY 82/83",
        ],
        [
          "Community Schools & Health Centers",
          "File FY 2082/83 return & pay tax",
          "End of Poush 2083",
          "All pre-2082/83 taxes, interest, and returns waived",
        ],
      ],
    },
    followUps: [
      "What donation and filing relief applies to non-profits under Section 38?",
      "What exemption do domestic universities receive prospectively under Section 10(jha4)?",
      "What three-tier income tax amnesty applies under Section 40?",
    ],
  }),
  buildModule6Entry({
    id: "fb2083-amnesty-sec-38-nonprofit-donations",
    question:
      "What tax and return filing waiver applies to non-profit organizations registered under the Institutions Registration Act, 2034 under Section 38?",
    shortTopic: "Waiver for Non-Profit Institutions on Donations and Gifts",
    keywords: [
      "Section 38",
      "Institutions Registration Act 2034",
      "Non-Profit NGOs",
      "Donations and Gifts",
      "Poush 2083 Deadline",
    ],
    answer:
      "Section 38 of Finance Bill, 2083 provides relief for not-for-profit institutions registered under the Institutions Registration Act, 2034 whose constitutional charters mandate that remaining assets transfer to the Government of Nepal upon dissolution. Regardless of whether they were formally registered as tax-exempt under Section 2(s) of the Income Tax Act, 2058, if such an institution files its FY 2082/83 return by the end of Poush 2083, all taxes, interest, and fees on income derived from donations, contributions, and gifts received in that year and earlier years are waived. If its sole source of income consisted strictly of such donations, contributions, and gifts, it is fully exempt from filing returns altogether.",
    citation: "Section 38",
    authority: "Inland Revenue Department (IRD)",
    reasoningSteps: [
      "Verify institutional eligibility: Must be registered under the Institutions Registration Act, 2034, with a dissolution clause transferring remaining assets to the Government of Nepal.",
      "Examine tax-exempt status: Applies whether or not the entity obtained an official Section 2(s) tax-exemption certificate.",
      "Determine regular filing condition: If deriving mixed income, filing the FY 2082/83 return by the end of Poush 2083 waives all prior tax/penalties on donation income.",
      "Determine donation-only exception: If the institution received exclusively donations, gifts, and grants, it is granted a complete waiver from filing returns.",
    ],
    rateTable: {
      title: "Section 38 NGO Donation Regularization Rules",
      columns: [
        "Income Composition",
        "Action Required by End of Poush 2083",
        "Tax & Filing Relief Outcome",
      ],
      rows: [
        [
          "Pure Donation / Gift Income",
          "None required",
          "Complete waiver from filing returns; zero tax liability",
        ],
        [
          "Mixed Income (Donations + Other)",
          "File FY 2082/83 return and declare income",
          "Taxes, interest, and fines on all donation income waived",
        ],
      ],
    },
    followUps: [
      "What filing relief applies to universities and community schools under Section 37?",
      "What is the increased charitable donation deduction cap under Section 12(2)?",
      "How does the three-tier PAN and income tax amnesty work under Section 40?",
    ],
  }),
  buildModule6Entry({
    id: "fb2083-amnesty-sec-40-income-tax-pan-amnesty",
    question:
      "What is the three-tier amnesty structure for unregistered earners, non-filing PAN holders, and taxpayers with tax arrears under Section 40 of Finance Bill, 2083?",
    shortTopic: "Three-Tier Income Tax Amnesty and PAN Regularization",
    keywords: [
      "Section 40",
      "Income Tax Amnesty",
      "PAN Deregistration",
      "1% Additional Surcharge",
      "Poush 2083 Deadline",
    ],
    answer:
      "Section 40 of Finance Bill, 2083 creates a comprehensive three-tier income tax amnesty expiring at the end of Poush 2083: (1) Under Section 40(1), a person who earned taxable income without a PAN may obtain a PAN, file returns for FY 2079/80 through FY 2082/83, and pay the underlying tax; all interest and penalties are waived, and all tax liability for years prior to FY 2079/80 is discharged. (2) Under Section 40(2), a dormant PAN-holder with zero income who failed to file for FY 2081/82 or earlier may apply to deregister or resume by filing and paying for FY 2082/83; if no application is made, the PAN is automatically deregistered by the Department. (3) Under Section 40(3), a registered PAN-holder with assessed tax arrears and unfiled returns may pay the outstanding tax plus an additional one percent (1%) surcharge and file by the end of Poush 2083, resulting in the complete waiver of all accrued interest, fines, and statutory fees.",
    citation: "Section 40(1), (2), & (3)",
    authority: "Inland Revenue Department (IRD)",
    reasoningSteps: [
      "Tier 1 (Unregistered Taxpayers): Obtain PAN, submit 4 years of returns (FY 79/80 to 82/83), and pay base tax; interest/fines are waived and pre-2079/80 liabilities are cancelled.",
      "Tier 2 (Dormant PAN Holders): Must file FY 82/83 return to keep PAN active; otherwise, IRD automatically cancels the dormant PAN.",
      "Tier 3 (Arrears with 1% Surcharge): Deposit principal tax arrears plus an additional 1% charge by the end of Poush 2083 to receive a 100% waiver of all accrued interest, penalties, and late fees.",
    ],
    rateTable: {
      title: "Section 40 Income Tax Regularization Tiers",
      columns: [
        "Taxpayer Status",
        "Mandatory Payment / Filing by End of Poush 2083",
        "Statutory Waiver Granted",
      ],
      rows: [
        [
          "Unregistered Earner (No PAN)",
          "Obtain PAN; file FY 79/80–82/83 returns & pay tax",
          "All fees/interest waived; pre-2079/80 liabilities discharged",
        ],
        [
          "Dormant PAN (Zero Income)",
          "File FY 82/83 return and apply to retain/cancel",
          "Prior penalties waived; auto-deregistration if ignored",
        ],
        [
          "PAN Holder with Arrears",
          "Pay outstanding assessed tax + 1% additional charge",
          "100% of accrued interest, fines, and late fees waived",
        ],
      ],
    },
    followUps: [
      "How does the 1% VAT amnesty and paneer arrears waiver work under Sections 41 and 42?",
      "What is the universal 1% arrears settlement under Section 44?",
      "What legacy taxes are written off under Section 30?",
    ],
  }),
  buildModule6Entry({
    id: "fb2083-amnesty-sec-41-42-vat-paneer-amnesty",
    question:
      "What is the VAT amnesty mechanism under Section 41 of Finance Bill, 2083 for uncollected VAT and collected-but-unfiled VAT, and what specific exemption applies to dairy paneer under Section 42?",
    shortTopic: "VAT Amnesty with 1% Surcharge and Paneer Arrears Waiver",
    keywords: [
      "Section 41",
      "Section 42",
      "VAT Amnesty",
      "Paneer VAT Waiver",
      "1% Additional Surcharge",
      "Chaitra 2082",
    ],
    answer:
      "Section 41 of Finance Bill, 2083 provides VAT relief for transactions conducted up to Chaitra 2082: Under Section 41(1), a VAT-registered person who failed to collect or deposit VAT on past taxable transactions may deposit the collectible tax plus an additional one percent (1%) and file returns through Chaitra 2082 by the end of Poush 2083, whereupon all interest, additional charges, and fines are waived. Under Section 41(2), a person who collected VAT but failed to file returns may file through Chaitra 2082 and pay the tax plus one percent (1%) by the same deadline, receiving the same complete waiver of fines and interest. In addition, Section 42 unconditionally waives all past outstanding and uncollected VAT on sales of milk-based paneer (cheese).",
    citation: "Section 41(1), 41(2), & Section 42",
    authority: "Inland Revenue Department (IRD)",
    reasoningSteps: [
      "Identify covered period: Taxable sales and supplies executed up to the end of Chaitra 2082.",
      "Calculate required deposit: Base VAT payable plus a 1% additional surcharge.",
      "Verify filing deadline: Returns and payments must be completed on or before the end of Poush 2083.",
      "Confirm financial waiver: 100% of accumulated late penalties, administrative fines, and interest charges are waived.",
      "Apply paneer exemption: Section 42 wipes out past uncollected VAT disputes on milk paneer.",
    ],
    rateTable: {
      title: "VAT Amnesties under Sections 41 and 42",
      columns: [
        "Taxable Supply / Infraction",
        "Required Settlement Amount",
        "Compliance Deadline",
        "Relief Granted",
      ],
      rows: [
        [
          "Uncollected / Undeposited VAT",
          "Principal VAT + 1% additional charge",
          "End of Poush 2083",
          "All interest, charges, and fines waived",
        ],
        [
          "Collected but Unfiled VAT Returns",
          "Collected VAT + 1% additional charge",
          "End of Poush 2083",
          "All late filing fines and interest waived",
        ],
        [
          "Past VAT on Milk-Based Paneer",
          "Nil (Fully forgiven)",
          "Immediate",
          "Complete waiver of uncollected tax arrears",
        ],
      ],
    },
    followUps: [
      "What excise amnesty and universal 1% arrears settlement apply under Sections 43 and 44?",
      "What jewelry sector VAT amnesty applies under Section 31?",
      "What three-tier income tax amnesty applies under Section 40?",
    ],
  }),
  buildModule6Entry({
    id: "fb2083-amnesty-sec-43-44-excise-universal-1pct",
    question:
      "What is the excise duty relief under Section 43 of Finance Bill, 2083 for undeclared excisable goods and lapsed licenses, and what universal waiver applies to filed-but-unpaid taxes under Section 44?",
    shortTopic: "Excise Duty Amnesty and Universal 1% Arrears Settlement",
    keywords: [
      "Section 43",
      "Section 44",
      "Excise Amnesty",
      "Universal 1% Settlement",
      "License Renewal",
      "15 Jeth 2083",
    ],
    answer:
      "Section 43(1) of Finance Bill, 2083 permits any person who dealt in excisable goods without collecting or depositing excise duty to submit Section 10A production/sales details and pay the duty plus an additional one percent (1%) surcharge by the end of Poush 2083, waiving all late fees and fines. Under Section 43(2), an excise licensee whose license lapsed due to non-renewal may renew it by paying solely the FY 2082/83 renewal fee by the end of Ashwin 2083, with all prior years' renewal fees and fines waived (failure to renew by this deadline results in automatic cancellation). Under Section 44, a universal amnesty applies to any person who filed income tax, VAT, or excise returns but had outstanding tax dues as of 15 Jeth 2083: by depositing the outstanding balance plus an additional one percent (1%) by the end of Poush 2083, all accumulated interest, fees, additional charges, and fines are fully waived.",
    citation: "Section 43(1), 43(2), & Section 44",
    authority: "Inland Revenue Department (IRD)",
    reasoningSteps: [
      "Review undeclared excise goods: Submit Section 10A statements and pay duty + 1% surcharge by the end of Poush 2083 to wipe out penalties.",
      "Review lapsed excise licenses: Regularize by paying only the FY 2082/83 fee by the end of Ashwin 2083, forgiving all prior years' lapsed fees.",
      "Review universal arrears settlement (Section 44): Covers all filed VAT, Income Tax, and Excise returns with unpaid ledger balances as of 15 Jeth 2083.",
      "Apply the 1% settlement formula: Pay the unpaid tax balance + 1% surcharge on or before the end of Poush 2083 to receive a 100% waiver of all accrued interest, fines, and administrative surcharges.",
    ],
    rateTable: {
      title: "Section 43 and Section 44 Arrears Regularization Summary",
      columns: [
        "Tax / Duty Category",
        "Settlement Payment Required",
        "Statutory Deadline",
        "Relief Conferred",
      ],
      rows: [
        [
          "Undeclared Excisable Sales",
          "Assessed Excise + 1% additional charge",
          "End of Poush 2083",
          "Late fees and fines waived",
        ],
        [
          "Lapsed Excise License",
          "Pay FY 2082/83 renewal fee only",
          "End of Ashwin 2083",
          "Prior lapsed fees waived; license restored",
        ],
        [
          "Universal Filed-but-Unpaid Dues",
          "Outstanding tax as of 15 Jeth 2083 + 1%",
          "End of Poush 2083",
          "All interest, penalties, and fines waived",
        ],
      ],
    },
    followUps: [
      "What three-tier income tax amnesty applies under Section 40?",
      "What VAT amnesty applies under Section 41?",
      "What post-clearance audit relief applies under Section 34?",
    ],
  }),
];
