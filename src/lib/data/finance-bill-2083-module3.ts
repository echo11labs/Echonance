import type { MockQAPair } from "../mock-tax-chat";
import {
  buildFinanceBillQaEntry,
  type FinanceBillSeedInput,
} from "./finance-bill-2083-helpers";

function buildModule3Entry(
  input: Omit<FinanceBillSeedInput, "category" | "citationTitle" | "libraryId">,
): MockQAPair {
  return buildFinanceBillQaEntry({
    ...input,
    category: "Excise Duty",
    citationTitle: "Finance Bill, 2083 / Excise Duty Act, 2058",
  });
}

export const FINANCE_BILL_2083_MODULE_3_EN: MockQAPair[] = [
  buildModule3Entry({
    id: "fb2083-excise-sec-2-n1-liquor-definition",
    question:
      "What is the updated legal definition of 'liquor' under Section 2(n1) of the Excise Duty Act, 2058, and what modern beverage categories are explicitly included?",
    shortTopic: "Excise Definition of Liquor and Modern Formulations",
    keywords: [
      "Section 2(n1)",
      "Liquor Definition",
      "Alcohol Content",
      "Spritz",
      "Ready to Drink",
    ],
    answer:
      "Section 56(1)(c) of Finance Bill, 2083 substitutes clause (n1) of Section 2 of the Excise Duty Act, 2058. Under the amended definition, 'liquor' means any substance or liquid containing more than 0.5 percent alcohol prepared by fermentation or distillation using food grains, fruits, or any other starch-bearing base. The definition explicitly includes spritz, shandy, ready-to-drink (RTD) cocktails, and carbonated liquor, bringing these modern beverage categories under the standard excise licensing and regulatory regime.",
    citation: "Section 56(1)(c) (substituting Section 2(n1))",
    reasoningSteps: [
      "Review the general threshold: Any beverage or liquid containing alcohol exceeding 0.5% by volume falls under the definition of liquor.",
      "Check raw material scope: Covers fermentation or distillation of grains, fruits, or any starch-bearing substance.",
      "Examine modern beverage inclusions: Formally includes spritz, shandy, ready-to-drink (RTD) cocktails, and carbonated liquor, removing regulatory ambiguity for canned or pre-mixed formulations.",
    ],
    rateTable: {
      title: "Excise Classification of Alcoholic Beverages",
      columns: [
        "Beverage Category",
        "Alcohol Strength Requirement",
        "Statutory Classification",
        "Governing Section",
      ],
      rows: [
        [
          "Standard Liquor / Spirits",
          "> 0.5% ABV",
          "Exciseable Liquor",
          "Section 2(n1)",
        ],
        [
          "Beer, Wine & Cider",
          "> 0.5% ABV",
          "Exciseable Liquor",
          "Section 2(n1)",
        ],
        [
          "Spritz, Shandy, RTD Cocktails",
          "> 0.5% ABV",
          "Exciseable Liquor",
          "Section 2(n1) as amended",
        ],
        [
          "Carbonated Liquor",
          "> 0.5% ABV",
          "Exciseable Liquor",
          "Section 2(n1) as amended",
        ],
        [
          "Non-Alcoholic Malt / Soft Drinks",
          "≤ 0.5% ABV",
          "Non-Exciseable as Liquor",
          "Section 2(n1)",
        ],
      ],
    },
    followUps: [
      "What is the permissible alcohol tolerance limit under Section 10E and Section 10F?",
      "How do micro-breweries pay advance excise duty under Section 56(6)?",
      "What is the Electronic Track-and-Trace system under Section 10T1?",
    ],
  }),
  buildModule3Entry({
    id: "fb2083-excise-sec-10e-10f-alcohol-tolerance",
    question:
      "What is the permissible alcohol tolerance limit under amended Sections 10E(1)(chha) and 10F, and what are the legal consequences of exceeding it?",
    shortTopic: "Permissible Alcohol Strength Variance and Testing Tolerance",
    keywords: [
      "Section 10E(1)(chha)",
      "Section 10F",
      "Alcohol Strength",
      "Tolerance Limit",
      "±0.5% Deviation",
    ],
    answer:
      "Section 56(8) and 56(9) of Finance Bill, 2083 amend Sections 10E(1)(chha) and 10F of the Excise Duty Act, 2058 by introducing a standardized tolerance limit of ±0.5 percent variation from declared alcohol strength. This applies to raw materials used in liquor production, spirit in intermediate stages, and finished prepared liquor. Any batch that deviates by more than ±0.5 percent from its declared alcohol percentage is treated as non-compliant, subjecting the manufacturer to re-assessment, administrative penalties, or confiscation of the non-compliant lot.",
    citation:
      "Section 56(8) & 56(9) (amending Section 10E(1)(chha) and Section 10F)",
    reasoningSteps: [
      "Identify the affected stages: Raw materials, intermediate distilled spirits, and packaged finished liquor products.",
      "Check the statutory tolerance threshold: A variance of up to ±0.5% from the declared alcohol content is permissible.",
      "Determine non-compliance consequences: Variations exceeding ±0.5% violate quality and excise declarations, triggering penalty provisions under Section 16.",
    ],
    rateTable: {
      title: "Alcohol Strength Testing & Tolerance Standards",
      columns: [
        "Production Stage",
        "Permissible Tolerance Margin",
        "Legal Compliance Baseline",
      ],
      rows: [
        [
          "Raw Materials / Wash",
          "±0.5% of declared benchmark",
          "Section 10E(1)(chha)",
        ],
        [
          "Spirit in Process / Rectified Spirit",
          "±0.5% of declared strength",
          "Section 10E(1)(chha) & 10F",
        ],
        [
          "Finished Bottled Liquor / Beer",
          "±0.5% of label declaration",
          "Section 10F as amended",
        ],
      ],
    },
    followUps: [
      "What penalties apply under amended Section 16 (Section 56(12))?",
      "How does risk-based selective release control work under Section 2(n7a) and Section 4(1)(a)?",
      "What is the Electronic Track-and-Trace system under Section 10T1?",
    ],
  }),
  buildModule3Entry({
    id: "fb2083-excise-sec-56-3-microbrewery-advance",
    question:
      "What advance excise duty payment mechanism applies to micro-breweries under Section 4(1)(a) as replaced by Section 56(3) of Finance Bill, 2083?",
    shortTopic: "Advance Excise Duty on Micro-Breweries",
    keywords: [
      "Micro-Brewery",
      "Advance Excise Duty",
      "Installed Capacity",
      "Section 4(1)(a)",
      "Section 56(3)",
    ],
    answer:
      "Section 56(3) of Finance Bill, 2083 replaces Section 4(1)(a) of the Excise Duty Act, 2058. While goods manufactured by industries under the physical-control and risk-based selective-release control systems generally attract excise duty at the time of removal from the enterprise for sale, the proviso specifically requires micro-breweries to pay monthly excise duty in advance based on the prescribed yield rate applied to their installed production capacity.",
    citation: "Section 56(3) (replacing Section 4(1)(a))",
    reasoningSteps: [
      "Distinguish micro-breweries from standard physical-control industries: General physical-control and selective-release enterprises pay excise upon removal for sale.",
      "Identify micro-brewery rule: Under the Section 4(1)(a) proviso, micro-breweries must compute and pay monthly excise duty in advance.",
      "Verify assessment formula: Liability is calculated using the prescribed yield rate (प्रतिलब्धि दर) applied to installed brewing capacity.",
    ],
    rateTable: {
      title: "Micro-Brewery Advance Excise Rule under Section 4(1)(a)",
      columns: [
        "Enterprise Regime",
        "Point / Timing of Excise Duty",
        "Statutory Reference",
      ],
      rows: [
        [
          "Physical-Control / Selective-Release Industries",
          "At time of removal from enterprise for sale",
          "Section 56(3) / Sec 4(1)(a)",
        ],
        [
          "Micro-Breweries",
          "Monthly advance payment based on prescribed yield rate of installed capacity",
          "Section 56(3) / Sec 4(1)(a) Proviso",
        ],
      ],
    },
    followUps: [
      "How are suspended excise licenses renewed under Section 9B(1) (Section 56(6))?",
      "What is the alcohol tolerance margin under Sections 10E and 10F?",
      "How does selective release control work under Section 2(n7a)?",
    ],
  }),
  buildModule3Entry({
    id: "fb2083-excise-sec-56-1-vapes-tobacco-definition",
    question:
      "How does Finance Bill, 2083 expand the definition of tobacco products to cover electronic cigarettes, vapes, and nicotine pouches?",
    shortTopic: "Expanded Definition of Tobacco Products (Vapes and Pouches)",
    keywords: [
      "Tobacco Products",
      "Electronic Cigarettes",
      "Vapes",
      "Nicotine Pouches",
      "Hookah Flavors",
    ],
    answer:
      "Section 56(1) of Finance Bill, 2083 broadens the statutory definition of tobacco products under Section 2 of the Excise Duty Act, 2058. In addition to conventional cut tobacco, bidi, cigarettes, and cigars, the definition now explicitly includes electronic cigarettes (e-cigarettes), vaping devices, refill liquids/pods (with or without nicotine), nicotine pouches, heated tobacco products (HTPs), and flavored hookah molasses. This subjects all alternative nicotine delivery systems to mandatory excise licensing, physical stamp affixation, and tariff schedules.",
    citation: "Section 56(1)(a) & (b) (amending Section 2)",
    reasoningSteps: [
      "Review the prior definition: Previously focused primarily on conventional dried/processed tobacco leaves, bidi, cigars, and cigarettes.",
      "Identify modern product additions: E-cigarettes, vaporizers, e-liquids, nicotine pouches, and hookah flavors are now explicitly included.",
      "Check regulatory impact: Manufacturers and importers must obtain excise licenses, apply digital/physical excise stamps, and pay applicable excise duties upon import or factory clearance.",
    ],
    rateTable: {
      title: "Excise Net for Traditional and Modern Tobacco Products",
      columns: [
        "Product Category",
        "Regulatory Status under 2083 Amendment",
        "Compliance Requirement",
      ],
      rows: [
        [
          "Cigarettes, Bidi & Cigars",
          "Standard Exciseable Tobacco Product",
          "Excise stamp + specific duty per stick/mille",
        ],
        [
          "E-Cigarettes & Vaping Devices",
          "Explicitly Classified Tobacco Product",
          "Excise stamp + ad valorem/specific duty",
        ],
        [
          "Vape Liquids & Refill Pods",
          "Classified Tobacco/Nicotine Substance",
          "Excise stamp + duty per ml/unit",
        ],
        [
          "Nicotine Pouches & Snus",
          "Classified Tobacco/Nicotine Substance",
          "Excise stamp + duty per kg/pack",
        ],
        [
          "Hookah Molasses / Flavors",
          "Classified Tobacco Formulation",
          "Excise stamp + duty per kg",
        ],
      ],
    },
    followUps: [
      "What is the Electronic Track-and-Trace system under Section 10T1?",
      "What penalties apply under Section 16 for operating without an excise license?",
      "How does amended Section 2(n1) define liquor?",
    ],
  }),
  buildModule3Entry({
    id: "fb2083-excise-sec-10t1-track-and-trace",
    question:
      "What is the Electronic Track-and-Trace system established under Section 10T1 of the Excise Duty Act, 2058?",
    shortTopic: "Electronic Track-and-Trace System and Digital Stamps",
    keywords: [
      "Section 10T1",
      "Track and Trace",
      "Digital Excise Stamp",
      "QR Code",
      "Supply Chain Monitoring",
    ],
    answer:
      "Section 56(11) of Finance Bill, 2083 inserts Section 10T1 into the Excise Duty Act, 2058, establishing a statutory Electronic Track-and-Trace System. The Inland Revenue Department is empowered to require manufacturers and importers of designated exciseable goods (specifically liquor, beer, and tobacco) to implement unique, encrypted digital identification markers (such as secure QR codes or RFID-embedded digital stamps) at the individual package level. This allows real-time monitoring of production lines, warehouse clearances, transit checkpoints, and retail shelves to prevent illicit trade and stamp reuse.",
    citation: "Section 56(11) (inserting Section 10T1)",
    reasoningSteps: [
      "Review the purpose: Mitigate revenue leakage, counterfeit stamping, and unauthorized liquor/tobacco distribution.",
      "Check statutory requirements: Mandates the integration of encrypted digital markers and high-speed online verification systems on packaging lines.",
      "Examine coverage across the supply chain: Tracks products from factory bottling/packaging through transport checkpoints to the point of retail sale.",
      "Verify enforcement powers: Unauthorized sale or possession of items lacking verifiable track-and-trace markers triggers immediate seizure and penalties under Section 16.",
    ],
    rateTable: {
      title: "Track-and-Trace Implementation Framework (Section 10T1)",
      columns: ["Component", "Statutory Requirement", "Responsible Party"],
      rows: [
        [
          "Package Serialization",
          "Unique encrypted serial code / QR code per unit",
          "Manufacturer / Importer",
        ],
        [
          "Production Verification",
          "Real-time automated production-line data feed to IRD",
          "Manufacturer / IRD System",
        ],
        [
          "Transit Tracking",
          "Scanning at checkpoints and border inspection stations",
          "Revenue Officers / Customs",
        ],
        [
          "Retail Verification",
          "Public/officer verification via mobile verification app",
          "Retailers / Consumers / Inspectors",
        ],
      ],
    },
    followUps: [
      "How does amended Section 8 streamline warehouse clearance via risk profiling?",
      "Which tobacco and nicotine products are covered under Finance Bill, 2083?",
      "What are the penalties under Section 16 for unlicensed excise activity?",
    ],
  }),
  buildModule3Entry({
    id: "fb2083-excise-sec-2-n7a-selective-release",
    question:
      "What is the 'risk-based selective release control system' introduced under Section 2(n7a) and Section 4(1)(a) of the Excise Duty Act, 2058?",
    shortTopic: "Risk-Based Selective Release Control System",
    keywords: [
      "Section 2(n7a)",
      "Section 4(1)(a)",
      "Selective Release",
      "Risk Analysis",
      "Excise Duty Act",
    ],
    answer:
      "Section 56(1)(d) of Finance Bill, 2083 inserts clause (n7a) into Section 2 of the Excise Duty Act, 2058 defining a 'risk-based selective release control system' as a system in which establishments operating under the physical control regime are selected through risk analysis so that the production, removal, import, and export of excisable goods occur under limited supervision by the Excise Officer or a designated employee. Concurrently, Section 56(3) updates Section 4(1)(a) so that excise duty on goods produced under this system falls due at the time of removal from the establishment for sale.",
    citation:
      "Section 56(1) (inserting Section 2(n7a)) & Section 56(3) (replacing Section 4(1)(a))",
    reasoningSteps: [
      "Locate the new definition: Section 56(1) adds Section 2(n7a) defining risk-based selective release for physical-control establishments.",
      "Examine supervision shift: Selected establishments undergo limited Excise Officer supervision based on risk analysis rather than constant full physical control.",
      "Verify duty trigger: Under amended Section 4(1)(a), excise duty accrues at the time of removal for sale.",
    ],
    rateTable: {
      title: "Risk-Based Selective Release Mechanism",
      columns: ["Compliance Feature", "Statutory Rule", "Governing Provision"],
      rows: [
        [
          "Selection Basis",
          "Establishments selected via risk analysis from physical control",
          "Section 2(n7a)",
        ],
        [
          "Supervision Level",
          "Limited control by Excise Officer or designated staff",
          "Section 2(n7a)",
        ],
        [
          "Excise Duty Collection Point",
          "At time of removal from establishment for sale",
          "Section 4(1)(a) as amended",
        ],
      ],
    },
    followUps: [
      "What is the Electronic Track-and-Trace system under Section 10T1?",
      "How do micro-breweries pay advance excise duty under Section 56(3)?",
      "How are suspended excise licenses renewed under Section 9B(1)?",
    ],
  }),
  buildModule3Entry({
    id: "fb2083-excise-sec-16-amendment-penalties",
    question:
      "What new penalties, overdue interest, confiscation rules, and innocent-owner vehicle protections are added to Section 16 of the Excise Duty Act, 2058 under Section 56(12)?",
    shortTopic:
      "Track-and-Trace, Duty-Free Diversion, and Section 16 Penalties",
    keywords: [
      "Section 16",
      "Section 56(12)",
      "Track and Trace Penalty",
      "5% Additional Interest",
      "Duty-Free Liquor Confiscation",
    ],
    answer:
      "Section 56(12) of Finance Bill, 2083 introduces targeted enforcement penalties in Section 16 of the Excise Duty Act, 2058: (a) penalties apply for breaching Track-and-Trace terms or unauthorized access to the Track-and-Trace system (Section 16(2)(kha1)) and for ±0.5% alcohol-content deviations (Section 16(4)(ja)); (b) arrears unpaid within the statutory deadline incur an additional 5% per-annum interest (Section 16(4)(dha3)); (c) selling or commercially using duty-free or exemption-purchased liquor triggers confiscation plus a fine equal to the principal amount or NPR 100,000, whichever is higher (Section 16(4)(dha4)); and (d) where an offender used a vehicle without the owner's permission, the vehicle is not confiscated, while the owner is fined NPR 25,000 and the driver faces up to NPR 15,000 fine and/or up to 3 months' imprisonment.",
    citation: "Section 56(12) (amending Section 16)",
    reasoningSteps: [
      "Check new operational violations: Adds Section 16(2)(kha1) for Track-and-Trace non-compliance or unauthorized system access, and expands alcohol deviation liability to raw/in-process/pre-removal stages.",
      "Review arrears & duty-free diversion sanctions: Imposes 5% p.a. additional interest on unpaid excise arrears and confiscation + value/NPR 100,000 fine on commercial diversion of duty-free liquor.",
      "Verify innocent-owner vehicle rule: Under the Section 16(5) proviso, vehicles used without owner consent avoid confiscation, imposing fixed owner (NPR 25,000) and driver penalties.",
    ],
    rateTable: {
      title: "Section 16 Enforcement Sanctions Added by Section 56(12)",
      columns: ["Offense / Trigger", "Statutory Sanction", "Governing Clause"],
      rows: [
        [
          "Overdue Excise Arrears",
          "Additional 5% per-annum interest on unpaid balance",
          "Section 16(4)(dha3)",
        ],
        [
          "Commercial Sale/Use of Duty-Free Liquor",
          "Confiscation + fine of value or NPR 100,000 (higher)",
          "Section 16(4)(dha4)",
        ],
        [
          "Vehicle Used Without Owner's Permission",
          "No confiscation; Owner NPR 25,000 fine; Driver up to NPR 15,000 and/or 3 mos jail",
          "Section 16(5) Proviso",
        ],
        [
          "Track-and-Trace / Unauthorized Access",
          "Statutory excise penalty under Section 16",
          "Section 16(2)(kha1)",
        ],
      ],
    },
    followUps: [
      "How does Track-and-Trace operate under Section 10T1?",
      "What is the ±0.5% alcohol tolerance limit under Sections 10E and 10F?",
      "What relief applies to lapsed excise licenses under Section 43(2)?",
    ],
  }),
  buildModule3Entry({
    id: "fb2083-excise-sec-9b-suspension-and-amnesty-renewal",
    question:
      "What changes govern excise license restrictions and renewal during suspension under Section 56(5)–(6), and how can lapsed licenses be regularized under Section 43(2)?",
    shortTopic: "Excise License Restrictions, Suspension Renewal, and Amnesty",
    keywords: [
      "Section 9(5)",
      "Section 9B(1)",
      "Section 43(2)",
      "License Renewal",
      "Ashwin 2083 Deadline",
    ],
    answer:
      "Finance Bill, 2083 updates excise licensing across Sections 56(5), 56(6), and 43(2). Section 56(5) expands the Section 9(5) proviso to cover production, export, import, sale, and storage of both liquor and tobacco/nicotine products. Section 56(6) adds a proviso to Section 9B(1) clarifying that a license is not barred from renewal merely because its renewal deadline falls during a suspension period. For licensees whose licenses previously lapsed due to non-renewal, Section 43(2) allows one-time regularization by paying only the FY 2082/83 renewal fee by the end of Ashwin 2083—waiving prior years' renewal fees and fines—failing which the license is automatically cancelled.",
    citation: "Section 56(5)–(6) (amending Sec 9(5), 9B(1)) & Section 43(2)",
    reasoningSteps: [
      "Review Section 56(5): Broadens the Section 9(5) proviso from selected tobacco items to the production, export, import, sale, or storage of liquor and tobacco/nicotine products.",
      "Review Section 56(6): Ensures suspension does not block renewal when the renewal deadline falls within the suspension window under Section 9B(1).",
      "Apply Section 43(2) amnesty: Allows lapsed licensees to regularize by paying only the FY 2082/83 renewal fee by the end of Ashwin 2083.",
    ],
    rateTable: {
      title: "Excise Licensing & Renewal Rules (Finance Bill, 2083)",
      columns: ["Provision", "Operative Legal Rule", "Deadline / Scope"],
      rows: [
        [
          "Section 9(5) Proviso",
          "Covers liquor & tobacco/nicotine production, trade & storage",
          "Section 56(5)",
        ],
        [
          "Section 9B(1) Proviso",
          "Renewal permitted even if deadline falls during suspension",
          "Section 56(6)",
        ],
        [
          "Section 43(2) Lapsed Renewal Amnesty",
          "Pay FY 2082/83 renewal fee only; prior years/fines waived",
          "By end of Ashwin 2083 (else auto-cancelled)",
        ],
      ],
    },
    followUps: [
      "What penalties apply under amended Section 16 (Section 56(12))?",
      "How do micro-breweries pay advance excise duty under Section 56(3)?",
      "How does selective release control work under Section 2(n7a)?",
    ],
  }),
];
