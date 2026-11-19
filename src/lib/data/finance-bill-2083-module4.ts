import type { MockQAPair } from "../mock-tax-chat";
import {
  buildFinanceBillQaEntry,
  type FinanceBillSeedInput,
} from "./finance-bill-2083-helpers";

function buildModule4Entry(
  input: Omit<FinanceBillSeedInput, "category" | "citationTitle" | "libraryId">,
): MockQAPair {
  return buildFinanceBillQaEntry({
    ...input,
    category: "Duties and Fees",
    citationTitle: "Finance Bill, 2083",
  });
}

export const FINANCE_BILL_2083_MODULE_4_EN: MockQAPair[] = [
  buildModule4Entry({
    id: "fb2083-fees-sec-5-foreign-employment-service-fee",
    question:
      "What is the Foreign Employment Service Fee rate, its designated expenditure purpose, deposit timeline, and failure-to-deposit penalty under Section 5 of Finance Bill, 2083?",
    shortTopic: "Foreign Employment Service Fee Mechanics",
    keywords: [
      "Section 5",
      "Foreign Employment Fee",
      "1% Levy",
      "Department of Foreign Employment",
      "15% Interest",
    ],
    answer:
      "Under Section 5(1) of Finance Bill, 2083, any person licensed under federal law to operate a foreign-employment agency must deposit a Foreign Employment Service Fee at the rate of one percent (1%) of the total amount collected from individuals departing for foreign employment. This fee is legally earmarked to be spent exclusively on the welfare of persons going for foreign employment. Under Section 5(2), the licensed entity must deposit the collected amount into the designated government revenue account by the 25th day of the following month and transmit collection details to the Department of Foreign Employment. Under Section 5(3), failure to deposit within this window triggers recovery with interest at fifteen percent (15%) per annum.",
    citation: "Section 5(1)–(4)",
    authority: "Department of Foreign Employment / Ministry of Finance",
    reasoningSteps: [
      "Identify the collecting agent: Entities licensed under prevailing federal law to operate foreign employment businesses.",
      "Calculate the fee liability: 1% assessed on the gross amount collected from each worker.",
      "Verify statutory earmark: Funds are statutorily restricted to worker welfare programs.",
      "Determine deposit and reporting timeline: Must be credited to the revenue account by the 25th day of the following month, with documentation submitted to the Department of Foreign Employment.",
      "Apply default interest: Default in payment triggers interest at 15% per annum.",
    ],
    rateTable: {
      title: "Section 5 Foreign Employment Service Fee Structure",
      columns: ["Component", "Statutory Rate / Deadline", "Legal Basis"],
      rows: [
        [
          "Fee Rate",
          "1% of gross amount collected from worker",
          "Section 5(1)",
        ],
        [
          "Deposit Deadline",
          "25th day of the subsequent month",
          "Section 5(2)",
        ],
        ["Late Payment Interest", "15% per annum", "Section 5(3)"],
        [
          "Statutory Purpose",
          "Welfare of persons going for foreign employment",
          "Section 5(1)",
        ],
        [
          "Administering Authority",
          "Department of Foreign Employment",
          "Section 5(4)",
        ],
      ],
    },
    followUps: [
      "What is the Education Service Fee rate and refund rule under Section 15?",
      "What is the Pollution Control Fee per liter on petrol and diesel under Section 6?",
      "How are Telecommunications Service Charge and broadband exemptions structured under Section 8?",
    ],
  }),
  buildModule4Entry({
    id: "fb2083-fees-sec-6-pollution-control-fee",
    question:
      "What is the rate, collection point, deposit deadline, and late penalty for the Pollution Control Fee on fossil fuels under Section 6 of Finance Bill, 2083?",
    shortTopic: "Pollution Control Fee on Petrol and Diesel",
    keywords: [
      "Section 6",
      "Pollution Control Fee",
      "Petrol and Diesel",
      "NPR 1.50 per Liter",
      "IRD",
    ],
    answer:
      "Section 6(1) of Finance Bill, 2083 imposes a Pollution Control Fee of one rupee and fifty paisa (NPR 1.50) per liter on petrol and diesel sold and distributed within Nepal. Under Section 6(2), the fee is collected directly from the fuel importer (e.g., Nepal Oil Corporation) and must be deposited into the government revenue account by the 25th day of the following month. Under Section 6(3), any failure to deposit within this statutory timeframe results in recovery with interest at fifteen percent (15%) per annum, administered under the authority of the Inland Revenue Department.",
    citation: "Section 6(1)–(4)",
    authority: "Inland Revenue Department (IRD)",
    reasoningSteps: [
      "Identify the taxable products: Motor spirit (petrol) and high-speed diesel sold and distributed in Nepal.",
      "Determine specific rate: Fixed at NPR 1.50 per liter.",
      "Identify liable collecting party: Importer of petroleum products.",
      "Establish deposit schedule and penalties: Due by the 25th of the following month; late remittance incurs 15% annual interest.",
    ],
    rateTable: {
      title: "Section 6 Pollution Control Fee Schedule",
      columns: [
        "Fuel Type",
        "Levy Rate per Liter",
        "Deposit Due Date",
        "Default Interest",
      ],
      rows: [
        [
          "Petrol (Motor Spirit)",
          "NPR 1.50 / Liter",
          "25th of subsequent month",
          "15% per annum",
        ],
        [
          "Diesel (High Speed)",
          "NPR 1.50 / Liter",
          "25th of subsequent month",
          "15% per annum",
        ],
      ],
    },
    followUps: [
      "How is the Clean Infrastructure Investment Fee collected on electric vehicles under Section 11?",
      "What is the Health Risk Tax assessment and appeal timeline under Annex 10?",
      "What is the Foreign Employment Service Fee rate under Section 5?",
    ],
  }),
  buildModule4Entry({
    id: "fb2083-fees-sec-7-telephone-ownership-fee",
    question:
      "How is the Telephone Ownership Fee structured between fixed-line installations and mobile SIM/recharges under Section 7 of Finance Bill, 2083?",
    shortTopic: "Telephone Ownership Fee on Fixed Lines and Mobile SIMs",
    keywords: [
      "Section 7",
      "Telephone Ownership Fee",
      "NPR 500 Installation",
      "2% Mobile SIM",
      "NTA",
    ],
    answer:
      "Section 7(1) of Finance Bill, 2083 imposes a flat Telephone Ownership Fee of five hundred rupees (NPR 500) on customers installing a fixed-line telephone, as well as on any person acquiring ownership when telephone ownership is transferred. However, the proviso to Section 7(1) differentiates mobile telecommunications by levying a proportional fee of two percent (2%) on the value of each SIM card and mobile recharge card/top-up. Under Section 7(2)–(3), the telecommunications service provider must collect the fee, remit it to the revenue account by the 25th of the following month, or face recovery with interest at fifteen percent (15%) per annum under the oversight of the Nepal Telecommunications Authority (NTA).",
    citation: "Section 7(1)–(4)",
    authority: "Nepal Telecommunications Authority (NTA)",
    reasoningSteps: [
      "Distinguish fixed-line vs mobile regimes: Fixed-line installations and transfers incur a flat fee of NPR 500.",
      "Analyze mobile telecom provisions: Mobile recharge and SIM purchases attract a 2% ad valorem ownership fee.",
      "Identify the statutory collecting agent: Licensed telecommunications service providers.",
      "Review treasury deposit rules: Due by the 25th of the following month; default incurs 15% interest per annum.",
    ],
    rateTable: {
      title: "Section 7 Telephone Ownership Fee Rates",
      columns: [
        "Telecommunication Service",
        "Ownership Fee Rate",
        "Collection Point",
        "Governing Section",
      ],
      rows: [
        [
          "Fixed-Line Telephone Installation",
          "NPR 500 flat",
          "At installation / transfer",
          "Section 7(1)",
        ],
        [
          "Fixed-Line Ownership Transfer",
          "NPR 500 flat",
          "At time of title change",
          "Section 7(1)",
        ],
        [
          "Mobile SIM Card Issuance",
          "2% of value",
          "Point of sale / activation",
          "Section 7(1) Proviso",
        ],
        [
          "Mobile Recharge / Top-Up",
          "2% of recharge amount",
          "Upon voucher/electronic top-up",
          "Section 7(1) Proviso",
        ],
      ],
    },
    followUps: [
      "What is the Telecommunications Service Charge rate and broadband exemption under Section 8?",
      "What unique monthly default penalty applies under Section 8(4) compared to Section 7?",
      "What is the Clean Infrastructure Investment Fee collection split under Section 11?",
    ],
  }),
  buildModule4Entry({
    id: "fb2083-fees-sec-8-telecom-service-charge",
    question:
      "What is the Telecommunications Service Charge rate under Section 8 of Finance Bill, 2083, what specific exemptions exist for broadband maintenance and interconnection, and what unique penalty applies?",
    shortTopic:
      "Telecommunications Service Charge and Interconnection Exemptions",
    keywords: [
      "Section 8",
      "Telecommunications Service Charge",
      "10% TSC",
      "Broadband Maintenance",
      "5% Per Month Penalty",
    ],
    answer:
      "Section 8(1) of Finance Bill, 2083 levies a Telecommunications Service Charge (TSC) of ten percent (10%) on the total fees billed to customers for telephone, mobile, and internet services. Under Section 8(2), statutory exemptions are provided for: (a) interconnection charges payable between licensed telecommunications providers for network transit/usage; and (b) up to fifty percent (50%) of the maintenance charge billed within fixed-broadband service packages. The charge must be collected by the licensed provider and deposited into the revenue account by the 25th day of the following month. Uniquely, under Section 8(4), failure to deposit on time incurs interest at five percent (5%) per month (60% annualized), which is significantly higher than the standard 15% annual rate on other fees.",
    citation: "Section 8(1)–(6)",
    authority: "Nepal Telecommunications Authority (NTA)",
    reasoningSteps: [
      "Determine base rate: 10% on customer billing for phone, mobile, and internet.",
      "Evaluate statutory carve-outs: Carrier-to-carrier interconnection charges are 100% exempt. Fixed-broadband maintenance charges receive a 50% exemption.",
      "Identify deposit deadline: 25th day of the following month.",
      "Note the punitive default rate: Section 8(4) imposes a penalty of 5% per month, compounding rapidly compared to standard annual rates.",
    ],
    rateTable: {
      title: "Section 8 Telecommunications Service Charge Framework",
      columns: [
        "Service Component",
        "Statutory TSC Rate",
        "Applicable Concession / Exemption",
        "Default Penalty",
      ],
      rows: [
        [
          "General Phone, Mobile & Internet",
          "10%",
          "None (Standard rate)",
          "5% per month",
        ],
        [
          "Interconnection Charges Between Telcos",
          "0%",
          "Fully exempt under Section 8(2)",
          "N/A",
        ],
        [
          "Fixed-Broadband Maintenance Charge",
          "5% effective",
          "50% of maintenance fee exempt under Section 8(2)",
          "5% per month",
        ],
      ],
    },
    followUps: [
      "How does the Telephone Ownership Fee differ across fixed-line and mobile SIMs under Section 7?",
      "What is the Education Service Fee under Section 15?",
      "What are the three casino royalty installment deadlines under Section 22?",
    ],
  }),
  buildModule4Entry({
    id: "fb2083-fees-sec-11-clean-infrastructure-ev-fee",
    question:
      "What is the Clean Infrastructure Investment Fee under Section 11 of Finance Bill, 2083, and how are collection points split between imported and domestically assembled electric vehicles?",
    shortTopic: "Clean Infrastructure Investment Fee on Electric Vehicles",
    keywords: [
      "Section 11",
      "Clean Infrastructure Fee",
      "Annex 3",
      "Electric Vehicles",
      "Customs vs Transport Office",
    ],
    answer:
      "Section 11(1) of Finance Bill, 2083 establishes a Clean Infrastructure Investment Fee, levied as per Annex 3 on electric vehicles (EVs) and transport equipment imported into or produced within Nepal. Under Section 11(2), collection is divided by operational stage: for EVs imported after the Act comes into force, the customs office collects the fee at the customs border point; for vehicles imported prior to commencement but pending registration, and for EVs manufactured or assembled domestically, the vehicle-registering transport office collects the fee from the producer at cost price at the time of registration. Under Section 11(3), all proceeds must be deposited into the Federal Consolidated Fund.",
    citation: "Section 11(1)–(4)",
    authority: "Ministry of Finance / Department of Transport Management",
    reasoningSteps: [
      "Review legislative intent: Creates a dedicated infrastructure fund financed by the growing EV sector.",
      "Identify the collection point for new imports: Customs border office at the point of clearance.",
      "Identify the collection point for domestic/unregistered units: Transport Management Office (Yatayat Karyalaya) at initial registration.",
      "Determine valuation basis for domestic units: Assessed on cost price at the time of registration.",
      "Confirm fund destination: Credited to the Federal Consolidated Fund.",
    ],
    rateTable: {
      title: "Section 11 Clean Infrastructure Fee Collection Mechanism",
      columns: [
        "Vehicle Source / Status",
        "Statutory Collecting Body",
        "Collection Timing",
        "Fund Allocation",
      ],
      rows: [
        [
          "Directly Imported EV Consignments",
          "Customs Office",
          "At customs clearance point",
          "Federal Consolidated Fund",
        ],
        [
          "Domestically Produced / Assembled EVs",
          "Transport Registration Office",
          "At initial registration (cost price)",
          "Federal Consolidated Fund",
        ],
        [
          "Pre-Act Imports Pending Registration",
          "Transport Registration Office",
          "At time of formal registration",
          "Federal Consolidated Fund",
        ],
      ],
    },
    followUps: [
      "What is the Pollution Control Fee per liter on petrol and diesel under Section 6?",
      "What presumptive vehicle tax rates apply to commercial EVs under Schedule 1?",
      "How does Section 57(26) tax commercial ICE and electric vehicles?",
    ],
  }),
  buildModule4Entry({
    id: "fb2083-fees-sec-15-education-service-fee",
    question:
      "What is the Education Service Fee rate under Section 15 of Finance Bill, 2083, what is the collection mechanism for foreign tuition exchange, and under what conditions can a student claim a refund?",
    shortTopic: "Education Service Fee on Foreign Tuition Exchange",
    keywords: [
      "Section 15",
      "Education Service Fee",
      "3% Foreign Exchange",
      "Tuition Fee",
      "Student Refund",
    ],
    answer:
      "Section 15(1) of Finance Bill, 2083 levies an Education Service Fee of three percent (3%) on foreign currency exchange provided for tuition fees to students traveling abroad for studies. Under Section 15(2), commercial banks or financial institutions providing the foreign exchange must collect the 3% fee and deposit it into the government revenue account by the 25th of the following month, reporting collection details to the relevant revenue office. Under Section 15(3), late deposits attract interest at fifteen percent (15%) per annum. Under Section 15(4), if a student who paid the fee does not travel abroad and surrenders the foreign currency back to the bank, the fee is fully refunded through the bank in accordance with IRD procedures.",
    citation: "Section 15(1)–(5)",
    authority: "Inland Revenue Department (IRD)",
    reasoningSteps: [
      "Check rate and taxable base: 3% on the foreign currency exchange amount issued for tuition payments.",
      "Identify the withholding agent: Class 'A' commercial banks and licensed BFIs issuing the foreign exchange facility.",
      "Review compliance deadlines: Remittance to the revenue account is due by the 25th day of the following month; default incurs 15% annual interest.",
      "Examine refund mechanics: If the student cancels studies and returns the foreign currency to the banking channel, the 3% fee is refunded under IRD guidelines.",
    ],
    rateTable: {
      title: "Section 15 Education Service Fee Compliance & Refund Rules",
      columns: [
        "Compliance Parameter",
        "Prescribed Legal Rule",
        "Statutory Clause",
      ],
      rows: [
        [
          "Fee Rate",
          "3% of foreign currency exchange for tuition",
          "Section 15(1)",
        ],
        [
          "Collecting Intermediary",
          "Banks and Financial Institutions (BFIs)",
          "Section 15(2)",
        ],
        [
          "Deposit Due Date",
          "25th day of the following month",
          "Section 15(2)",
        ],
        ["Late Payment Interest", "15% per annum", "Section 15(3)"],
        [
          "Refund Eligibility",
          "Permitted upon return of unused currency if travel is cancelled",
          "Section 15(4)",
        ],
      ],
    },
    followUps: [
      "How does the Education Equity Fee work for private schools and colleges under Section 16 and Annex 7?",
      "What is the Foreign Employment Service Fee rate under Section 5?",
      "What are the casino royalty installment deadlines under Section 22?",
    ],
  }),
  buildModule4Entry({
    id: "fb2083-fees-sec-16-annex-7-education-equity-fee",
    question:
      "What are the compliance procedures, quadrimestrial deposit deadlines, and non-compliance penalties for the Education Equity Fee on private educational institutions under Section 16 and Annex 7?",
    shortTopic: "Education Equity Fee on Private Schools and Colleges",
    keywords: [
      "Section 16",
      "Annex 7",
      "Education Equity Fee",
      "Quadrimestrial Filing",
      "NPR 1,000 Fine",
    ],
    answer:
      "Section 16 and Annex 7 of Finance Bill, 2083 levy an Education Equity Fee on all student fees charged by privately operated educational institutions, earmarked for educational infrastructure and quality access. Privately operated institutions must collect this fee by issuing tax invoices. The collected amount and its corresponding statement must be submitted quadrimestrially (every four months / chaumasik) within twenty-five (25) days following the end of each period to the relevant Inland Revenue Office. Failure to deposit within the deadline incurs interest at fifteen percent (15%) per annum, and failure to submit the statement attracts an administrative fine of NPR 1,000 per statement.",
    citation: "Section 16 & Annex 7 (Clauses 1, 3, & 4)",
    authority: "Inland Revenue Department (IRD)",
    reasoningSteps: [
      "Identify affected taxpayers: All privately operated schools, colleges, and training academies.",
      "Review invoicing mandates: Must issue formal invoices showing the equity fee.",
      "Identify the filing cycle: Quadrimestrial (every 4 months), due within 25 days following the period end.",
      "Calculate penalties: 15% annual interest on delayed fee remittances, plus a flat fine of NPR 1,000 per missing statement.",
    ],
    rateTable: {
      title: "Annex 7 Education Equity Fee Compliance Timeline",
      columns: [
        "Quadrimestrial Period (Chaumasik)",
        "Filing & Deposit Deadline",
        "Interest on Late Deposit",
        "Filing Failure Fine",
      ],
      rows: [
        [
          "First (Shrawan – Kartik)",
          "25th of Mangsir",
          "15% per annum",
          "NPR 1,000 per return",
        ],
        [
          "Second (Mangsir – Falgun)",
          "25th of Chaitra",
          "15% per annum",
          "NPR 1,000 per return",
        ],
        [
          "Third (Chaitra – Ashadh)",
          "25th of Shrawan",
          "15% per annum",
          "NPR 1,000 per return",
        ],
      ],
    },
    followUps: [
      "What is the 3% Education Service Fee on foreign tuition exchange under Section 15?",
      "What tax exemption applies to domestic universities under amended Section 10(jha4)?",
      "What penalties apply under Annex 10 for Health Risk Tax defaults?",
    ],
  }),
  buildModule4Entry({
    id: "fb2083-fees-sec-22-casino-royalty",
    question:
      "What is the annual casino royalty schedule under Section 22 of Finance Bill, 2083, what is the three-stage installment calendar, and what late surcharges apply?",
    shortTopic: "Casino Royalty Tariffs and Staged Installments",
    keywords: [
      "Section 22",
      "Casino Royalty",
      "NPR 55 Million",
      "NPR 30 Million Machine",
      "Department of Tourism",
    ],
    answer:
      "Section 22(1) of Finance Bill, 2083 sets the annual casino royalty at NPR 55 million for standard casinos, and NPR 30 million for operations conducted solely through modern gaming machines/equipment. Under Section 22(2), a single license is valid for only one operating venue. Section 22(3) establishes a three-stage installment schedule payable to the Department of Tourism: 40% by the end of Poush, 70% cumulative by the end of Chaitra, and the remaining 30% balance by the end of Ashadh. Under Section 22(4), default in payment incurs an additional fee of 15% of the due amount for delays up to three months, and an ongoing annual fee of 30% thereafter on the outstanding royalty.",
    citation: "Section 22(1)–(5)",
    authority:
      "Department of Tourism / Ministry of Culture, Tourism and Civil Aviation",
    reasoningSteps: [
      "Determine license classification: Standard casino (table games + machines) is assessed at NPR 55M; machine-only operations are assessed at NPR 30M.",
      "Review location restrictions: Each license permits operations at a single venue only.",
      "Calculate installment schedule: 40% by end of Poush, 30% by end of Chaitra (bringing total to 70%), and 30% by end of Ashadh (reaching 100%).",
      "Apply late fees: 15% surcharge for delays up to three months; 30% per annum on balances delayed beyond three months.",
    ],
    rateTable: {
      title: "Section 22 Casino Royalty Payment Schedule",
      columns: [
        "Installment Phase",
        "Statutory Deadline",
        "Cumulative Share",
        "Late Surcharge",
      ],
      rows: [
        [
          "First Tranche",
          "End of Poush",
          "40% of Annual Royalty",
          "15% for ≤3 months; 30% p.a. thereafter",
        ],
        [
          "Second Tranche",
          "End of Chaitra",
          "70% of Annual Royalty",
          "15% for ≤3 months; 30% p.a. thereafter",
        ],
        [
          "Final Tranche",
          "End of Ashadh",
          "100% of Annual Royalty",
          "15% for ≤3 months; 30% p.a. thereafter",
        ],
      ],
    },
    followUps: [
      "What are the penalties and appeal timelines for Health Risk Tax under Annex 10?",
      "What is the Telecommunications Service Charge late penalty under Section 8(4)?",
      "What is the Clean Infrastructure Investment Fee collection split under Section 11?",
    ],
  }),
  buildModule4Entry({
    id: "fb2083-fees-sec-20-annex-10-health-risk-tax",
    question:
      "What is the assessment timeline, daily delay fee, penalty rate, and administrative review deadline for the Health Risk Tax under Annex 10?",
    shortTopic: "Health Risk Tax Assessment and Penalties",
    keywords: [
      "Annex 10",
      "Health Risk Tax",
      "0.05% Daily Delay Fee",
      "100% Penalty",
      "Administrative Review",
    ],
    answer:
      "Under Section 20 and Annex 10 of Finance Bill, 2083, the Health Risk Tax is levied on designated domestic and imported health-sensitive goods. Where tax evasion is detected, the Excise Officer is empowered to issue a formal tax assessment order, granting the taxpayer fifteen (15) days to submit a defense. Under Clause 6 of Annex 10, failure to deposit or under-depositing the tax incurs a daily delay fee of 0.05% on the unpaid balance, and total failure to deposit incurs a penalty of one hundred percent (100%) of the tax amount. Any taxpayer aggrieved by an assessment may file for administrative review before the Director General of the IRD within thirty (30) days of receiving the order.",
    citation: "Section 20 & Annex 10 (Clauses 4, 6, & 7)",
    authority: "Inland Revenue Department (IRD)",
    reasoningSteps: [
      "Identify the taxing scope: Levied on domestic production and imports of health-sensitive goods per Annex 10.",
      "Review the assessment process: Taxpayers are given a 15-day notice window to submit a defense before assessment orders are finalized.",
      "Apply delay fees: A daily delay fee of 0.05% (18.25% annualized) applies to unpaid balances.",
      "Apply evasion penalties: Total failure to deposit results in a 100% penalty on the assessed amount.",
      "Determine administrative review timeline: Appeals must be lodged with the Director General within 30 days.",
    ],
    rateTable: {
      title: "Annex 10 Health Risk Tax Penalties & Appeals",
      columns: [
        "Legal Event / Action",
        "Prescribed Statutory Period / Rate",
        "Governing Clause",
      ],
      rows: [
        [
          "Defense Notice Window",
          "15 days from receipt of notice",
          "Annex 10, Clause 5",
        ],
        [
          "Daily Delay Fee",
          "0.05% per day on unpaid tax",
          "Annex 10, Clause 6",
        ],
        [
          "Non-Payment Penalty",
          "100% of outstanding tax amount",
          "Annex 10, Clause 6",
        ],
        [
          "Administrative Review Window",
          "30 days from receipt of assessment order",
          "Annex 10, Clause 7",
        ],
      ],
    },
    followUps: [
      "How does Finance Bill, 2083 expand tobacco product rules for vapes and pouches?",
      "What are the three installment dates and surcharges for casino royalties under Section 22?",
      "What is the Pollution Control Fee per liter under Section 6?",
    ],
  }),
];
