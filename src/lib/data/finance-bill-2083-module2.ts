import type { MockQAPair } from "../mock-tax-chat";
import { buildFinanceBillQaEntry } from "./finance-bill-2083-helpers";

export const FINANCE_BILL_2083_MODULE_2_EN: MockQAPair[] = [
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-7-1a-multiple-rates",
    question:
      "What power does the Government of Nepal derive under newly inserted Section 7(1a) of the Value Added Tax Act, 2052, and how does it alter Nepal's single-rate VAT structure?",
    shortTopic: "Power to Prescribe Multiple Concessional VAT Rates",
    category: "Value Added Tax",
    keywords: [
      "Section 7(1a)",
      "Multiple VAT Rates",
      "Concessional VAT",
      "Nepal Gazette",
      "Tax Rate Reform",
    ],
    answer:
      "Section 55(1)(a) of Finance Bill, 2083 introduces sub-section (1a) to Section 7 of the Value Added Tax Act, 2052, creating a major exception to Nepal's traditional single-rate regime. Notwithstanding the standard rate prescribed under sub-section (1) (13%), the Government of Nepal is empowered to publish a notification in the Nepal Gazette fixing multiple rates not exceeding the standard 13% rate, and specifying the particular goods and services to which these lower or differentiated rates shall apply. Consequential amendments to Section 7(2) integrate these Gazetted rates into the legal assessment framework.",
    citationTitle: "Finance Bill, 2083 / Value Added Tax Act, 2052",
    citation:
      "Section 55(1)(a) & (b) (inserting Section 7(1a) & amending Section 7(2))",
    libraryId: "vat-act-2052",
    reasoningSteps: [
      "Analyze historical statutory framework: Section 7(1) historically mandated a single, uniform standard rate of 13% on all taxable supplies.",
      "Identify the non-obstante power: Sub-section (1a) operates notwithstanding sub-section (1), granting delegated legislative authority to the Executive.",
      "Determine rate limits: Differentiated rates fixed by the Government through Gazette notification cannot exceed the standard 13% rate.",
      "Check administrative implementation: Consequential changes in Section 7(2) substitute 'sub-section (1)' with 'sub-section (1) or (1a)', giving equal statutory validity to the newly gazetted rates.",
    ],
    rateTable: {
      title: "VAT Rate Determination Framework under Section 7",
      columns: [
        "Statutory Sub-section",
        "Authority Level",
        "Permissible VAT Rate Band",
        "Applicability / Notification",
      ],
      rows: [
        [
          "Section 7(1)",
          "Federal Parliament (Statute)",
          "Standard 13%",
          "General taxable supplies of goods and services",
        ],
        [
          "Section 7(1a)",
          "Government of Nepal (Executive)",
          "Multiple rates ≤ 13%",
          "Specified goods/services designated in Nepal Gazette",
        ],
        [
          "Section 7(1b)",
          "Federal Parliament (Statute)",
          "Statutory 5%",
          "Ride-sharing transport/delivery & final-consumer electricity",
        ],
      ],
    },
    followUps: [
      "What VAT rate and collection rule applies to ride-sharing platforms under Section 7(1b) and Section 8(2b)?",
      "What VAT rate applies to retail electricity supplied to final consumers?",
      "What CBMS electronic invoicing mandates are introduced under Section 14a?",
    ],
  }),
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-7-1b-8-2b-ride-sharing",
    question:
      "What is the VAT rate, taxable scope, and collection mechanism for ride-sharing transport and delivery services under Section 7(1b) and Section 8(2b)?",
    shortTopic: "5% Concessional VAT on Ride-Sharing and Delivery Platforms",
    category: "Value Added Tax",
    keywords: [
      "Section 7(1b)",
      "Section 8(2b)",
      "Ride-Sharing",
      "Platform Operator",
      "5% VAT",
    ],
    answer:
      "Section 55(1)(a) and Section 55(2) of Finance Bill, 2083 insert Section 7(1b) and Section 8(2b) into the Value Added Tax Act, 2052. Under Section 7(1b), transport and delivery services provided through a platform operated by a resident ride-sharing operator are subjected to a concessional VAT rate of 5% on their taxable value. Crucially, Section 8(2b) shifts the legal tax collection burden entirely onto the resident platform operator: the platform operator must assess, charge, and collect the 5% VAT directly on the taxable service value, rather than requiring individual drivers or riders providing the underlying service to register and collect the tax.",
    citationTitle: "Finance Bill, 2083 / Value Added Tax Act, 2052",
    citation:
      "Section 55(1)(a) & 55(2) (inserting Section 7(1b) and Section 8(2b))",
    libraryId: "vat-act-2052",
    reasoningSteps: [
      "Identify service scope: Covers both passenger transportation and parcel/goods delivery arranged through electronic platforms.",
      "Identify liable person: Instead of treating drivers/riders as independent taxable suppliers, Section 8(2b) explicitly designates the resident ride-sharing operator as the statutory collector.",
      "Determine tax rate: Fixed at 5% on the taxable value, overriding both standard 13% rate (Sec 7(1)) and Gazetted multiple rates (Sec 7(1a)).",
      "Correlate with direct tax rules: Under Section 57 of the Bill (inserting Section 88(6ch) in the Income Tax Act), the platform operator must also deduct 1% advance tax on payments disbursed to natural person service providers.",
    ],
    rateTable: {
      title: "Tax Obligations of Ride-Sharing Operators (FY 2083/84)",
      columns: [
        "Tax Obligation Type",
        "Statutory Rate",
        "Collecting Entity",
        "Governing Section",
      ],
      rows: [
        [
          "Value Added Tax (VAT)",
          "5% on Taxable Value",
          "Resident Ride-Sharing Operator",
          "VAT Act, Sec 7(1b) & 8(2b)",
        ],
        [
          "Advance Withholding Tax",
          "1% on Gross Service Pay",
          "Resident Ride-Sharing Operator",
          "Income Tax Act, Sec 88(6ch)",
        ],
      ],
    },
    followUps: [
      "What power does Section 7(1a) grant for setting multiple concessional VAT rates?",
      "What VAT rate applies to retail electricity supply under Section 7(1b)?",
      "What are the penalties for CBMS or electronic billing violations under Section 29(1)(chha2)?",
    ],
  }),
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-7-1b-retail-electricity",
    question:
      "What VAT rate applies to the supply of electricity to final consumers under Section 7(1b), and how does this affect energy billing?",
    shortTopic: "5% VAT on Retail Electricity Supply",
    category: "Value Added Tax",
    keywords: [
      "Section 7(1b)",
      "Electricity Supply",
      "Final Consumer",
      "5% VAT",
      "Utility Billing",
    ],
    answer:
      "Pursuant to Section 55(1)(a) of Finance Bill, 2083, which inserts Section 7(1b) into the Value Added Tax Act, 2052, any person providing electricity service to the final consumer is mandated to assess and collect VAT at the rate of 5% on the taxable value of the electricity supplied. This provision establishes a lower rate for domestic and commercial end-users compared to the standard 13% VAT, ensuring that energy retail bills include 5% VAT.",
    citationTitle: "Finance Bill, 2083 / Value Added Tax Act, 2052",
    citation: "Section 55(1)(a) (inserting Section 7(1b))",
    libraryId: "vat-act-2052",
    reasoningSteps: [
      "Review the statutory text of Section 7(1b): '...and a person providing electricity service to the final consumer shall assess and collect tax at five percent on the taxable value.'",
      "Identify consumer class: Specifically targets the retail stage ('final consumer'), such as residential, commercial, and industrial consumers purchasing from the grid.",
      "Establish tax rate: Imposes a 5% tax on the invoice value of the electricity consumed, superseding zero-rate or full exemption claims for final retail supplies.",
    ],
    rateTable: {
      title: "Comparative Tax Rates on Utility & Energy Supplies",
      columns: [
        "Supply Stage",
        "Prescribed VAT Rate",
        "Governing Legal Section",
      ],
      rows: [
        ["Electricity Service to Final Consumer", "5%", "Section 7(1b)"],
        ["General Commercial Goods/Services", "13%", "Section 7(1)"],
        [
          "Designated Exempt Energy Products",
          "0% (Exempt)",
          "Annex 1 (Tax-Exempt Schedule)",
        ],
      ],
    },
    followUps: [
      "How does Section 7(1a) alter Nepal's single-rate 13% VAT system?",
      "How is 5% VAT collected on ride-sharing transport and delivery platforms?",
      "How does amended Section 25(2a) change diplomatic VAT facilities?",
    ],
  }),
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-14a-cbms-electronic-invoice",
    question:
      "What regulatory powers and compliance obligations are established under the substituted Section 14a for Electronic Invoices and the Central Billing Monitoring System (CBMS)?",
    shortTopic: "Electronic Invoicing and CBMS Integration Mandate",
    category: "Value Added Tax",
    keywords: [
      "Section 14a",
      "Electronic Invoice",
      "CBMS",
      "Billing Software",
      "Real-Time Transmission",
    ],
    answer:
      "Section 55(3) of Finance Bill, 2083 entirely substitutes Section 14a of the Value Added Tax Act, 2052. Under Section 14a(1), the Inland Revenue Department (IRD) is authorized to establish standards, specifications, and procedures for issuing invoices electronically. Under Section 14a(2), the Department may publish a notice requiring designated taxpayers to mandatorily issue electronic invoices and connect directly to the Department's Central Billing Monitoring System (CBMS), or to generate invoices using the IRD's proprietary billing system. Section 14a(3) mandates that the Department formulate and enforce procedures governing the security, encryption, and operational reliability of all authorized invoicing software and electronic point-of-sale devices.",
    citationTitle: "Finance Bill, 2083 / Value Added Tax Act, 2052",
    citation: "Section 55(3) (substituting Section 14a)",
    libraryId: "vat-act-2052",
    reasoningSteps: [
      "Review substituted Section 14a(1): IRD issues procedural frameworks and technical requirements for electronic invoicing.",
      "Review Section 14a(2) CBMS integration: Establishes statutory power to mandate real-time API connectivity to CBMS or require the use of IRD billing portals for specified taxpayers.",
      "Review Section 14a(3) software verification: Imposes an obligation on software vendors and taxpayers to ensure the security, integrity, and tamper-resistance of billing systems.",
      "Examine legal enforcement: Integrates directly with enhanced penalty clauses under Section 29(1)(chha2) for data-altering software.",
    ],
    rateTable: {
      title: "Section 14a Electronic Invoicing Framework",
      columns: ["Sub-section", "Enforcement Focus", "Compliance Requirement"],
      rows: [
        [
          "Section 14a(1)",
          "Technical Standards & Procedures",
          "Compliance with IRD electronic invoice rules",
        ],
        [
          "Section 14a(2)",
          "Mandatory CBMS Connection",
          "Real-time API sync with IRD CBMS or IRD billing system",
        ],
        [
          "Section 14a(3)",
          "Software Integrity & Security",
          "Prohibition of tamper mechanisms; adherence to security protocols",
        ],
      ],
    },
    followUps: [
      "What penalties apply under Section 29(1)(chha2) for tampering with billing software?",
      "What penalty applies under Section 29(1)(da) for VCTS violations?",
      "Within how many days can a timely-filed VAT return be amended under Section 18(4)?",
    ],
  }),
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-29-1-chha2-billing-tampering-penalty",
    question:
      "What severe financial penalties apply under amended Section 29(1)(chha2) for using software that permits data deletion or alteration, or for violating Section 14a?",
    shortTopic: "Penalties for Tampering with Electronic Billing Software",
    category: "Value Added Tax",
    keywords: [
      "Section 29(1)(chha2)",
      "Billing Tampering",
      "Data Deletion",
      "NPR 500,000 Fine",
      "CBMS Violation",
    ],
    answer:
      "Section 55(8)(a) of Finance Bill, 2083 substitutes clause (chha2) of Section 29(1) of the Value Added Tax Act, 2052. Under the amended provision, if any taxpayer issuing electronic invoices under Section 14a(1) or (2) is found utilizing billing software or electronic cash registers capable of deleting, altering, or suppressing sales/invoice data, an administrative fine of NPR 500,000 applies. Furthermore, for any other non-compliance with the rules, procedures, or directives issued under Section 14a, an administrative fine of NPR 100,000 is imposed.",
    citationTitle: "Finance Bill, 2083 / Value Added Tax Act, 2052",
    citation: "Section 55(8)(a) (substituting Section 29(1)(chha2))",
    libraryId: "vat-act-2052",
    reasoningSteps: [
      "Identify the violation class: Use of billing software with functionality to delete, modify, or falsify historical electronic invoice records.",
      "Distinguish between severe vs. procedural infractions: Active deployment of data-altering software incurs a fine of NPR 500,000.",
      "Review general non-compliance fine: Failing to link to CBMS or violating technical formatting requirements incurs a fine of NPR 100,000.",
      "Confirm liability: Applies to any registered taxpayer operating electronic invoicing systems under Section 14a.",
    ],
    rateTable: {
      title: "Electronic Billing Fines under Section 29(1)(chha2)",
      columns: [
        "Nature of Non-Compliance",
        "Statutory Fine Amount (NPR)",
        "Legal Authority",
      ],
      rows: [
        [
          "Software capable of deleting or altering billing data",
          "NPR 500,000",
          "Section 29(1)(chha2)",
        ],
        [
          "Other non-compliance with Section 14a rules/directives",
          "NPR 100,000",
          "Section 29(1)(chha2)",
        ],
      ],
    },
    followUps: [
      "What are the CBMS electronic invoicing mandates under Section 14a?",
      "What fine applies for violating VCTS internal goods movement directives?",
      "Are administrative interpretations under Section 31b(4) binding?",
    ],
  }),
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-16b-natural-disaster-stock-loss",
    question:
      "What amendment has been made to Section 16b regarding stock deductions and write-offs for destroyed or damaged inventory?",
    shortTopic: "Inclusion of Natural Disasters for Inventory Loss Deduction",
    category: "Value Added Tax",
    keywords: [
      "Section 16b",
      "Stock Deduction",
      "Natural Disaster",
      "Input Tax Credit",
      "Inventory Loss",
    ],
    answer:
      "Section 55(4) of Finance Bill, 2083 amends Section 16b of the Value Added Tax Act, 2052 by replacing the single term 'breakage' with the phrase 'breakage, natural disaster'. This statutory amendment permits taxpayers whose registered taxable inventory is lost, ruined, or destroyed due to earthquakes, floods, landslides, or other natural disasters to claim relief and write off the inventory input tax without triggering automatic disallowance or recovery of input VAT credits.",
    citationTitle: "Finance Bill, 2083 / Value Added Tax Act, 2052",
    citation: "Section 55(4) (amending Section 16b)",
    libraryId: "vat-act-2052",
    reasoningSteps: [
      "Review previous statutory limitation: Section 16b previously restricted statutory loss allowances largely to 'breakage' and standard transit wear.",
      "Identify the statutory expansion: The insertion of 'natural disaster' broadens relief to force majeure events (floods, earthquakes, landslides).",
      "Determine procedural impact: Allows taxpayers to substantiate casualty losses through local administrative deeds (muchulkas) and preserve their input tax adjustments under Section 16b.",
    ],
    rateTable: {
      title: "Scope of Section 16b Permissible Stock Adjustments",
      columns: [
        "Inventory Loss Event",
        "Status Prior to 2083 Amendment",
        "Status under Finance Bill, 2083",
      ],
      rows: [
        [
          "Breakage / Physical Ruin",
          "Permitted under prescribed limits",
          "Permitted under Section 16b",
        ],
        [
          "Natural Disaster (Flood, Quake, Landslide)",
          "Administrative ambiguity / disputed",
          "Formally recognized under Section 16b",
        ],
        [
          "Theft / Unexplained Shortage",
          "Not allowable without specific proof",
          "Standard investigation required",
        ],
      ],
    },
    followUps: [
      "How can a timely VAT return be amended within 7 days under Section 18(4)?",
      "How do taxpayers file VAT returns in districts without an Inland Revenue Office?",
      "What jewelry sector VAT amnesties apply under Section 31 of Finance Bill, 2083?",
    ],
  }),
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-18-1a-non-iro-district-filing",
    question:
      "What is the return submission and tax payment procedure under amended Section 18(1a) for taxpayers in districts lacking an Inland Revenue Office (IRO)?",
    shortTopic: "VAT Filing in Districts Without an IRO",
    category: "Value Added Tax",
    keywords: [
      "Section 18(1a)",
      "Local Level",
      "DTCO",
      "15th Day Filing",
      "Return Forwarding",
    ],
    answer:
      "Section 55(5)(a) of Finance Bill, 2083 substitutes sub-section (1a) of Section 18 of the Value Added Tax Act, 2052. Taxpayers operating in a district where no Inland Revenue Office (IRO) or Taxpayer Service Office (TSO) exists may submit their tax return and pay the tax due to the relevant Local Level (Municipality/Rural Municipality) or the District Treasury and Accounts Controller Office (DTCO / Kosh Tatha Lekha Niyantrak Karyalaya) by the 15th day of the month in which the return falls due. The receiving Local Level or DTCO is then required to forward the return and tax deposit details to the competent Inland Revenue Office within seven days.",
    citationTitle: "Finance Bill, 2083 / Value Added Tax Act, 2052",
    citation: "Section 55(5)(a) (substituting Section 18(1a))",
    libraryId: "vat-act-2052",
    reasoningSteps: [
      "Identify the jurisdictional challenge: Many remote districts lack dedicated IROs or TSOs, making timely compliance difficult.",
      "Identify receiving offices: The taxpayer may submit returns and payments to either the local municipal government or the DTCO.",
      "Note the filing deadline: The taxpayer must complete submission by the 15th of the due month (earlier than the standard 25th deadline under Section 18(1)).",
      "Determine inter-agency forwarding timeline: The DTCO or Local Level must transfer the documentation to the relevant IRO within 7 days.",
    ],
    rateTable: {
      title: "VAT Return Filing Channels under Section 18",
      columns: [
        "Filing Location",
        "Receiving Authority",
        "Taxpayer Due Date",
        "Inter-Office Forwarding",
      ],
      rows: [
        [
          "Districts with IRO / TSO",
          "Direct to IRO / TSO (Online Portal)",
          "25th of subsequent month",
          "N/A (Direct)",
        ],
        [
          "Districts without IRO",
          "Local Level or DTCO",
          "15th of due month",
          "Within 7 days to competent IRO",
        ],
      ],
    },
    followUps: [
      "What is the new 7-day window for amending VAT returns under Section 18(4)?",
      "What is the penalty for violating VCTS directives under Section 29(1)(da)?",
      "What is the status of DG administrative interpretations under Section 31b(4)?",
    ],
  }),
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-18-4-return-amendment-window",
    question:
      "What is the new procedural right to amend timely filed VAT returns under Section 18(4) of the Value Added Tax Act, 2052?",
    shortTopic: "Statutory Window for Amending VAT Returns",
    category: "Value Added Tax",
    keywords: [
      "Section 18(4)",
      "Return Amendment",
      "7-Day Window",
      "Clerical Correction",
      "Filing Revision",
    ],
    answer:
      "Section 55(5)(b) of Finance Bill, 2083 adds sub-section (4) to Section 18 of the Value Added Tax Act, 2052. Under this new provision, if a taxpayer who has submitted a VAT return within the statutory deadline discovers an error and wishes to amend it, the Department may permit the return to be amended within seven days of its initial filing, in accordance with the prescribed procedure. This establishes an administrative window to rectify clerical and calculation errors before assessments become final.",
    citationTitle: "Finance Bill, 2083 / Value Added Tax Act, 2052",
    citation: "Section 55(5)(b) (adding Section 18(4))",
    libraryId: "vat-act-2052",
    reasoningSteps: [
      "Review previous limitation: Historically, the VAT Act lacked a clear administrative revision mechanism, requiring lengthy formal reassessments.",
      "Check prerequisite: The original VAT return must have been submitted within the statutory deadline.",
      "Determine revision window: The taxpayer must initiate and the Department must approve the amendment within 7 days of the filing date.",
      "Identify procedural standard: Corrections must adhere to the Department's electronic amendment guidelines.",
    ],
    rateTable: {
      title: "VAT Return Amendment Rules (Section 18(4))",
      columns: [
        "Compliance Element",
        "Statutory Rule / Condition",
        "Governing Section",
      ],
      rows: [
        [
          "Prerequisite Status",
          "Original return must be filed within deadline",
          "Section 18(4)",
        ],
        [
          "Allowable Revision Period",
          "Within 7 days of initial filing",
          "Section 18(4)",
        ],
        [
          "Approval Authority",
          "Inland Revenue Department / Competent Tax Officer",
          "Section 18(4)",
        ],
      ],
    },
    followUps: [
      "How do taxpayers file VAT returns in districts without an IRO under Section 18(1a)?",
      "How does Section 16b treat inventory destroyed by natural disasters?",
      "What penalties apply under Section 29(1)(chha2) for billing software violations?",
    ],
  }),
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-29-1-da-vcts-penalty",
    question:
      "What is the penalty under Section 29(1)(da) for violating IRD directives on the internal movement of commercial goods (VCTS)?",
    shortTopic: "Penalty for Violating Internal Goods Movement Directives",
    category: "Value Added Tax",
    keywords: [
      "Section 29(1)(da)",
      "Vehicle and Consignment Tracking",
      "VCTS",
      "NPR 50,000 Fine",
      "Internal Movement",
    ],
    answer:
      "Section 55(8)(c) of Finance Bill, 2083 inserts clause (da) into Section 29(1) of the Value Added Tax Act, 2052. Under this clause, any person who violates the directives, orders, or standard operating procedures issued by the Inland Revenue Department concerning the internal movement and tracking of commercial goods (such as the Vehicle and Consignment Tracking System - VCTS) is subject to an administrative fine of NPR 50,000 per violation.",
    citationTitle: "Finance Bill, 2083 / Value Added Tax Act, 2052",
    citation: "Section 55(8)(c) (inserting Section 29(1)(da))",
    libraryId: "vat-act-2052",
    reasoningSteps: [
      "Review the purpose of the tracking system: VCTS and related directives ensure goods in transit match reported billing and tax records.",
      "Identify the statutory addition: Clause (da) provides a dedicated monetary penalty for transport and logistics non-compliance under the VAT Act.",
      "Determine penalty calculation: The fine is set at NPR 50,000 per instance, assessed against the consignor, carrier, or non-compliant party.",
    ],
    rateTable: {
      title: "General & Commercial Transit Fines under Section 29(1)",
      columns: [
        "Infraction",
        "Previous Fine",
        "Amended Fine (Finance Bill, 2083)",
      ],
      rows: [
        [
          "Violation of Internal Goods Movement Directives (VCTS)",
          "General penalty / undefined",
          "NPR 50,000 per instance (Clause da)",
        ],
        [
          "Minor Procedural Non-compliance (Clause ta)",
          "NPR 1,000",
          "NPR 10,000 (Section 55(8)(b))",
        ],
        [
          "Use of Data Deleting/Altering Software (Clause chha2)",
          "Prior ceiling",
          "NPR 500,000 (Section 55(8)(a))",
        ],
      ],
    },
    followUps: [
      "What are the electronic billing tampering fines under Section 29(1)(chha2)?",
      "What are the CBMS integration requirements under Section 14a?",
      "Are Director General interpretations final under Section 31b(4)?",
    ],
  }),
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-31b-4-interpretation-finality",
    question:
      "What is the legal status of administrative interpretations issued by the Director General under newly added Section 31b(4)?",
    shortTopic: "Finality of Administrative Interpretations under Section 31b",
    category: "Value Added Tax",
    keywords: [
      "Section 31b(4)",
      "Administrative Interpretation",
      "Director General",
      "Public Ruling",
      "Finality",
    ],
    answer:
      "Section 55(9) of Finance Bill, 2083 adds sub-section (4) to Section 31b of the Value Added Tax Act, 2052. It specifies that any official statutory interpretation or public circular issued by the Department (Director General) under Section 31b(1) regarding the implementation and application of the Act shall be legally final and binding upon all revenue officers and taxpayers, except where a competent court of law interprets otherwise.",
    citationTitle: "Finance Bill, 2083 / Value Added Tax Act, 2052",
    citation: "Section 55(9) (adding Section 31b(4))",
    libraryId: "vat-act-2052",
    reasoningSteps: [
      "Review Section 31b(1): Empowers the Director General to issue formal interpretations and circulars on ambiguous VAT provisions.",
      "Analyze sub-section (4): Establishes administrative finality across all tax offices, ending conflicting assessments among different field offices.",
      "Note the judicial safeguard: Explicitly maintains judicial oversight—the administrative interpretation remains final unless overturned by a court of law.",
    ],
    rateTable: {
      title: "Legal Hierarchy of Statutory VAT Interpretations",
      columns: [
        "Issuing Body / Authority",
        "Legal Standing under Section 31b(4)",
        "Jurisdictional Effect",
      ],
      rows: [
        [
          "Inland Revenue Department (DG)",
          "Final and legally binding administratively",
          "Binds all tax officers and taxpayers unless overturned",
        ],
        [
          "Supreme Court / Revenue Tribunal",
          "Superior Judicial Authority",
          "Can overturn or modify DG interpretations",
        ],
      ],
    },
    followUps: [
      "How does Section 7(1a) let the Government set multiple concessional VAT rates?",
      "How does Section 25(2a) change VAT exemptions for diplomatic agencies?",
      "What tax amnesty applies to gold and silver ornaments under Section 31?",
    ],
  }),
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-31-jewelry-amnesty",
    question:
      "What amnesty is provided under Section 31 of Finance Bill, 2083 for uncollected VAT on gold and silver ornaments, vessels, and idols?",
    shortTopic: "Waiver of Arrears on Gold/Silver Ornaments and Jewelry",
    category: "Value Added Tax",
    keywords: [
      "Section 31",
      "Gold Ornaments",
      "Silver Vessels",
      "VAT Waiver",
      "Tax Arrears Amnesties",
    ],
    answer:
      "Section 31(2) of Finance Bill, 2083 introduces a special amnesty for jewelry manufacturers and artisans. For Fiscal Year 2082/83 or earlier income years, where an artisan or business did not collect VAT due on the manufacture, crafting, or repair of gold and silver ornaments, utensils, vessels, or religious idols, the uncollected tax amount—along with all accrued interest, additional charges, and fines—is completely waived, and taxpayers are not required to submit past returns for these activities. Furthermore, under Section 31(1), uncollected luxury fees on gold ornaments and VAT on diamonds, gems, and precious stones prior to 2 Bhadra 2082 are also waived.",
    citationTitle: "Finance Bill, 2083",
    citation: "Section 31(1) & (2)",
    authority: "Ministry of Finance / IRD",
    reasoningSteps: [
      "Identify the sector: Manufacturers, repairers, and traders of gold/silver jewelry, ornaments, vessels, and idols.",
      "Check time period: Covers FY 2082/83 and prior fiscal years.",
      "Verify the scope of relief: Waives principal VAT, accrued interest, statutory surcharges, and failure-to-file penalties.",
      "Examine procedural exemptions: Taxpayers are exempt from filing back returns for these historical transactions.",
    ],
    rateTable: {
      title: "Jewelry Sector Amnesties under Section 31",
      columns: [
        "Transaction / Commodity",
        "Applicable Period",
        "Relief Granted",
        "Statutory Clause",
      ],
      rows: [
        [
          "Luxury fee on gold/gold ornaments",
          "Prior to 2 Bhadra 2082",
          "Fully waived, no filing needed",
          "Section 31(1)",
        ],
        [
          "VAT on diamonds, gems, and stones",
          "Prior to 2 Bhadra 2082",
          "Fully waived, no filing needed",
          "Section 31(1)",
        ],
        [
          "VAT on making/repairing gold/silver items",
          "FY 2082/83 and prior years",
          "Principal, interest, and fines waived",
          "Section 31(2)",
        ],
      ],
    },
    followUps: [
      "How does amended Section 25(2a) streamline VAT exemptions for diplomatic agencies?",
      "What natural disaster inventory write-off relief is added in Section 16b?",
      "What are the multiple concessional VAT rate powers under Section 7(1a)?",
    ],
  }),
  buildFinanceBillQaEntry({
    id: "fb2083-vat-sec-25-2a-diplomatic-exemption",
    question:
      "What is the legal effect of the amendment to Section 25(2a) regarding VAT refunds for diplomatic missions and international agencies?",
    shortTopic: "Immediate Exemption vs. Refund Mechanism under Section 25(2a)",
    category: "Value Added Tax",
    keywords: [
      "Section 25(2a)",
      "Diplomatic Exemption",
      "VAT Refund",
      "Point of Sale",
      "Section 55(6)",
    ],
    answer:
      "Section 55(6) of Finance Bill, 2083 amends Section 25(2a) of the Value Added Tax Act, 2052 by replacing the phrase 'shall be refunded immediately' with 'shall be exempted immediately'. This statutory change transitions eligible diplomatic missions, international non-governmental agencies, and privileged entities from a post-purchase tax refund mechanism to an immediate point-of-sale tax exemption, removing the administrative burden of filing for cash refunds. Concurrently, Section 55(7) repeals Section 25c1 to streamline exemption operations.",
    citationTitle: "Finance Bill, 2083 / Value Added Tax Act, 2052",
    citation:
      "Section 55(6) & 55(7) (amending Section 25(2a) & repealing Section 25c1)",
    libraryId: "vat-act-2052",
    reasoningSteps: [
      "Review previous procedure: Privileged entities paid VAT upfront and applied for reimbursement under Section 25(2a).",
      "Identify statutory text shift: Replacing 'refunded immediately' with 'exempted immediately' creates a point-of-sale exemption.",
      "Review structural cleanup: Section 25c1 is repealed to align with the point-of-sale exemption system.",
    ],
    rateTable: {
      title: "Procedural Evolution of Diplomatic Tax Facilities",
      columns: [
        "Mechanism Element",
        "Previous Treatment",
        "Amended Treatment (Finance Bill, 2083)",
      ],
      rows: [
        [
          "Tax Assessment at Point of Sale",
          "Charged at 13% with subsequent refund claim",
          "Immediate point-of-sale exemption applied",
        ],
        [
          "Administrative Cash Flow",
          "Funds tied up pending IRD refund review",
          "Direct tax-free billing for eligible buyers",
        ],
        [
          "Governing Provision",
          "Section 25(2a) & Section 25c1",
          "Section 25(2a) as amended (Sec 25c1 repealed)",
        ],
      ],
    },
    followUps: [
      "What amnesty applies to uncollected VAT on jewelry under Section 31?",
      "What VAT rate applies to retail electricity supply under Section 7(1b)?",
      "What are the CBMS electronic invoicing mandates under Section 14a?",
    ],
  }),
];
