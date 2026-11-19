import type { MockQAPair } from "../mock-tax-chat";
import {
  buildFinanceBillQaEntry,
  type FinanceBillSeedInput,
} from "./finance-bill-2083-helpers";

function buildModule5Entry(
  input: Omit<
    FinanceBillSeedInput,
    "category" | "authority" | "externalUrl" | "libraryId"
  >,
): MockQAPair {
  return buildFinanceBillQaEntry({
    ...input,
    category: "Customs Duty",
    authority: "Department of Customs / Ministry of Finance",
  });
}

export const FINANCE_BILL_2083_MODULE_5_EN: MockQAPair[] = [
  buildModule5Entry({
    id: "fb2083-customs-sec-28a-admin-review",
    question:
      "What is the new statutory mechanism for administrative review and appeal under Section 28A of the Customs Duty Act, 2081 as inserted by Section 58(3) of Finance Bill, 2083?",
    shortTopic: "Administrative Review and Appeals under Section 28A",
    keywords: [
      "Section 28A",
      "Customs Duty Act 2081",
      "Administrative Review",
      "Customs Officer Decision",
      "Appeal",
    ],
    answer:
      "Section 58(3) of Finance Bill, 2083 inserts Section 28A into the Customs Duty Act, 2081. Under this new section, any person dissatisfied with an assessment, valuation, classification, or decision made by a customs officer under the Act is granted the statutory right to apply for administrative review and subsequently file an appeal in accordance with prevailing customs legislation.",
    citationTitle: "Finance Bill, 2083 / Customs Duty Act, 2081",
    citation: "Section 58(3) (inserting Section 28A)",
    reasoningSteps: [
      "Identify the statutory addition: Section 58(3) introduces Section 28A into the Customs Duty Act, 2081.",
      "Recognize the procedural right: Resolves a legislative gap by granting taxpayers a direct statutory avenue to challenge a customs officer's tariff classification, valuation, or penalty decision.",
      "Trace the appellate path: The aggrieved party applies for administrative review before the Director General and can subsequently appeal to the Revenue Tribunal under prevailing customs law.",
    ],
    rateTable: {
      title:
        "Appellate Structure under Section 28A of the Customs Duty Act, 2081",
      columns: ["Dispute Stage", "Adjudicating Forum", "Governing Provision"],
      rows: [
        [
          "Initial Tariff / Valuation Order",
          "Customs Officer at Border / Dry Port",
          "Customs Duty Act, 2081",
        ],
        [
          "Administrative Review",
          "Director General, Department of Customs",
          "Section 28A as inserted",
        ],
        [
          "Judicial Appeal",
          "Revenue Tribunal",
          "Prevailing Customs Law / Revenue Tribunal Act",
        ],
      ],
    },
    followUps: [
      "How does Section 58(2) broaden industrial concessions for packing materials?",
      "What procedural amendments and vehicle seizure protections are made under Section 59?",
      "What customs duty exemption and Green Tax apply to petroleum fuels under Section 35?",
    ],
  }),
  buildModule5Entry({
    id: "fb2083-customs-sec-58-2-packing-materials",
    question:
      "How does Section 58(2) of Finance Bill, 2083 broaden industrial concessions for raw materials under Sections 14, 15, and 16 of the Customs Duty Act, 2081?",
    shortTopic: "Concession Scope: Packing Materials Not Produced in Nepal",
    keywords: [
      "Section 58(2)",
      "Customs Duty Act 2081",
      "Raw Materials",
      "Auxiliary Raw Materials",
      "Packing Materials",
    ],
    answer:
      "Section 58(2) of Finance Bill, 2083 amends Sections 14, 15, and 16 of the Customs Duty Act, 2081 by substituting the term 'raw material' with the phrase 'raw material or auxiliary raw material, including packing material not produced in Nepal'. This expands the scope of concessional import duty rates to auxiliary inputs and industrial packaging materials that lack domestic manufacturing equivalents.",
    citationTitle: "Finance Bill, 2083 / Customs Duty Act, 2081",
    citation: "Section 58(2) (amending Sections 14, 15, and 16)",
    reasoningSteps: [
      "Review prior wording: Sections 14, 15, and 16 previously restricted concessional duties strictly to primary 'raw material'.",
      "Examine the expansion: The amendment explicitly incorporates 'auxiliary raw materials' and 'packing materials not produced in Nepal'.",
      "Determine industrial impact: Domestic industries relying on imported specialized containers, blister foils, or technical packaging can access statutory concessions previously limited to primary ingredients.",
    ],
    rateTable: {
      title: "Industrial Concession Coverage under Sections 14, 15, and 16",
      columns: [
        "Material Category",
        "Pre-amendment Treatment",
        "Amended Treatment (Finance Bill, 2083)",
      ],
      rows: [
        [
          "Primary Raw Materials",
          "Eligible for industrial concession",
          "Eligible for industrial concession",
        ],
        [
          "Auxiliary Raw Materials",
          "Disputed / Standard duty",
          "Formally eligible for concession",
        ],
        [
          "Packing Materials Not Produced in Nepal",
          "Standard commercial duty applied",
          "Formally eligible for industrial concession",
        ],
      ],
    },
    followUps: [
      "What administrative review right is introduced under Section 28A?",
      "What baggage allowances apply to gold and gold ornaments under Annex 4?",
      "What procedural changes to declarations and fines appear in Section 59?",
    ],
  }),
  buildModule5Entry({
    id: "fb2083-customs-annex-4-gold-baggage",
    question:
      "What limits, duties, and additional percentage surcharges apply to gold and gold ornaments brought by returning passengers under Annex 4 of Finance Bill, 2083?",
    shortTopic: "Baggage Allowances and Duties on Gold and Gold Ornaments",
    keywords: [
      "Annex 4",
      "Baggage Rules",
      "Gold Allowance",
      "25g / 50g Exemption",
      "3% Additional Duty",
      "Confiscation",
    ],
    answer:
      "Under Annex 4 Clause 1 of Finance Bill, 2083, returning passengers face strict limits on gold imports. For bullion/raw gold: the first 50 grams attract duty at the prevailing rate, while an additional quantity up to 50 grams attracts the prevailing duty plus an extra 3% duty. For gold ornaments: returning men are exempt up to 25 grams, and returning women are exempt up to 50 grams. An additional 50 grams above the exempt limit attracts duty at the prevailing rate, and a further 50 grams beyond that attracts prevailing duty plus an extra 3% duty. Any quantity imported in excess of these maximum limits is subject to mandatory confiscation.",
    citationTitle: "Finance Bill, 2083 (Customs Tariff / Baggage Provisions)",
    citation:
      "Customs Baggage Schedule (Annex 4), Clause 1(1)(ka), (kha), & 1(2)",
    reasoningSteps: [
      "Distinguish raw gold from crafted ornaments: Raw gold carries no duty-free allowance, whereas ornaments receive a basic gender-differentiated exemption (25g for men, 50g for women).",
      "Calculate slab duties: After the exempt allowance, the next 50g of ornaments attract prevailing customs duty.",
      "Apply the surcharge slab: A further 50g of ornaments incurs prevailing duty plus an additional 3% ad valorem surcharge.",
      "Enforce the confiscation threshold: Any excess beyond these permitted tiers is confiscated under Annex 4 Clause 1(2).",
    ],
    rateTable: {
      title: "Annex 4 Passenger Gold Baggage Tariff & Quantity Slabs",
      columns: [
        "Item Category",
        "Quantity Tier",
        "Duty Rate",
        "Legal Consequence on Excess",
      ],
      rows: [
        [
          "Raw Gold (Bullion)",
          "First 50 grams",
          "Prevailing statutory duty",
          "Excess > 100g total: Confiscation",
        ],
        [
          "Raw Gold (Bullion)",
          "Next 50 grams (51g–100g)",
          "Prevailing duty + additional 3%",
          "Excess > 100g total: Confiscation",
        ],
        [
          "Gold Ornaments (Male)",
          "Up to 25 grams",
          "0% (Fully exempt)",
          "Permitted baggage",
        ],
        [
          "Gold Ornaments (Female)",
          "Up to 50 grams",
          "0% (Fully exempt)",
          "Permitted baggage",
        ],
        [
          "Gold Ornaments (Both)",
          "Next 50 grams above exempt cap",
          "Prevailing statutory duty",
          "Permitted baggage",
        ],
        [
          "Gold Ornaments (Both)",
          "Next 50 grams beyond that",
          "Prevailing duty + additional 3%",
          "Excess > permitted tier: Confiscation",
        ],
      ],
    },
    followUps: [
      "What baggage rules apply to silver and tourist jewelry under Annex 4?",
      "What amnesty applies to gold and silver ornaments under Section 31?",
      "What vehicle seizure protections apply under Section 59?",
    ],
  }),
  buildModule5Entry({
    id: "fb2083-customs-annex-4-silver-tourist-baggage",
    question:
      "What baggage rules apply to silver and silver ornaments under Annex 4 of Finance Bill, 2083, and what deposit conditions govern foreign tourists and transit passengers?",
    shortTopic: "Silver Baggage Allowances and Tourist Deposit Facilities",
    keywords: [
      "Annex 4",
      "Silver Ornaments",
      "500g Allowance",
      "Tourist Deposit Facility",
      "20% Deposit",
    ],
    answer:
      "Under Annex 4 Clause 1(1)(ga)–(gha) of Finance Bill, 2083, raw silver up to 500 grams attracts duty at the prevailing rate. For silver ornaments, the first 500 grams are completely duty-free, while an additional 500 grams attract duty at the prevailing rate; any silver imported beyond these limits is confiscated. For foreign tourists entering with personal gold/silver ornaments exceeding standard limits, Clause 1(4) allows entry upon declaration and payment of a 20% refundable cash deposit, provided the items are re-exported upon departure. Alternatively, non-resident Nepalis (NRNs) or foreign travelers in transit may deposit excess jewelry with customs for safekeeping and retrieve it upon exiting Nepal.",
    citationTitle: "Finance Bill, 2083 (Customs Tariff / Baggage Provisions)",
    citation:
      "Customs Baggage Schedule (Annex 4), Clause 1(1)(ga)–(gha), 1(4), & 1(5)",
    reasoningSteps: [
      "Review silver allowances: Silver ornaments are duty-free up to 500g; the next 500g attract standard duty; excess is confiscated.",
      "Examine tourist re-export facility: Foreign tourists can enter with personal jewelry exceeding limits by paying a 20% refundable deposit and declaring the items for re-export.",
      "Review the transit custody mechanism: NRNs and foreign transit passengers can place excess ornaments in customs transit custody and retrieve them upon departure.",
    ],
    rateTable: {
      title: "Silver Baggage and Tourist Jewelry Import Rules",
      columns: [
        "Category",
        "Permissible Quantity",
        "Duty / Deposit Requirement",
        "Outcome on Departure",
      ],
      rows: [
        [
          "Silver Ornaments",
          "Up to 500 grams",
          "0% (Fully exempt)",
          "Retained by passenger",
        ],
        [
          "Silver Ornaments",
          "501 to 1,000 grams",
          "Prevailing customs duty",
          "Retained by passenger",
        ],
        [
          "Raw Silver",
          "Up to 500 grams",
          "Prevailing customs duty",
          "Retained by passenger",
        ],
        [
          "Excess Tourist Ornaments",
          "Declared personal jewelry",
          "20% refundable cash deposit",
          "Full deposit refund upon re-export",
        ],
        [
          "Transit Passenger Ornaments",
          "Declared transit jewelry",
          "Stored in customs custody",
          "Handed back upon departure",
        ],
      ],
    },
    followUps: [
      "What limits and duties apply to gold and gold ornaments under Annex 4?",
      "What administrative review right applies under Section 28A?",
      "What fines apply to small conveyance smuggling under Section 70(4)(g)?",
    ],
  }),
  buildModule5Entry({
    id: "fb2083-customs-sec-35-petroleum-green-tax",
    question:
      "What customs duty exemption and Green Tax apply to imported petroleum fuels under Section 35 of Finance Bill, 2083?",
    shortTopic: "Customs Duty Concession and Green Tax on Petroleum Fuels",
    keywords: [
      "Section 35",
      "Green Tax",
      "10% Green Tax",
      "50% Duty Exemption",
      "Petrol and Diesel",
    ],
    answer:
      "Under Section 35(1) of Finance Bill, 2083, a fifty percent (50%) customs duty exemption is granted on imports of motor spirit/petrol (customs sub-heading 2710.12.10), kerosene (2710.19.10), and high-speed diesel (2710.19.30). However, Section 35(2) simultaneously levies a ten percent (10%) Green Tax on the import of petrol and diesel. Under Section 35(3), the Government of Nepal retains the executive authority to alter or withdraw these provisions via notification in the Nepal Gazette.",
    citationTitle: "Finance Bill, 2083",
    citation: "Section 35(1)–(3)",
    reasoningSteps: [
      "Identify the 50% duty exemption: Reduces standard customs duties by half on petrol, kerosene, and high-speed diesel.",
      "Apply the Green Tax: A 10% Green Tax is imposed on petrol and diesel imports alongside the duty exemption.",
      "Verify executive authority: The Government can adjust or withdraw both the concession and the Green Tax through a Gazette notification.",
    ],
    rateTable: {
      title: "Section 35 Petroleum Tariff and Green Tax Schedule",
      columns: [
        "Petroleum Product",
        "Customs Sub-heading",
        "Customs Duty Exemption",
        "Green Tax Rate",
      ],
      rows: [
        [
          "Motor Spirit (Petrol)",
          "2710.12.10",
          "50% rate exemption",
          "10% on import value",
        ],
        [
          "High-Speed Diesel",
          "2710.19.30",
          "50% rate exemption",
          "10% on import value",
        ],
        [
          "Kerosene",
          "2710.19.10",
          "50% rate exemption",
          "Nil (Green Tax applies to petrol/diesel)",
        ],
      ],
    },
    followUps: [
      "What Pollution Control Fee applies per liter on petrol and diesel under Section 6?",
      "What Clean Infrastructure Investment Fee applies to EVs under Section 11?",
      "How does Section 58(2) expand industrial raw material concessions?",
    ],
  }),
  buildModule5Entry({
    id: "fb2083-customs-sec-59-customs-act-2082",
    question:
      "What procedural changes to declaration amendments, transport conveyance confiscations, and fines are introduced under Section 59 of Finance Bill, 2083 amending the Customs Act, 2082?",
    shortTopic:
      "Customs Act 2082 Procedural Amendments and Vehicle Seizure Rules",
    keywords: [
      "Section 59",
      "Customs Act 2082",
      "Declaration Amendment",
      "Vehicle Confiscation",
      "Conveyance Fines",
    ],
    answer:
      "Section 59 of Finance Bill, 2083 introduces several key amendments to the Customs Act, 2082. Under amended Section 20(10)–(11), customs officers are directly empowered to amend declarations. Section 53 is substituted so that while smuggled goods and their packing containers remain subject to confiscation, the transport vehicle carrying them is generally protected from confiscation unless its owner cannot be identified following public notice. Section 70(4)(g) introduces specific conveyance fines: up to NPR 10,000 for carts, rickshaws, or bicycles, and up to NPR 20,000 for motorcycles or scooters used in smuggling. In Section 71, the penalty surcharge for document-related infractions is reduced from fifty percent to twenty-five percent and requires proof of deliberate intent.",
    citationTitle: "Finance Bill, 2083 / Customs Act, 2082",
    citation: "Section 59(2), (3), (5), & (6)",
    reasoningSteps: [
      "Review declaration corrections: Section 20 allows direct administrative amendments to customs entries.",
      "Analyze vehicle seizure protections: Section 53 protects commercial carriers from automatic vehicle forfeiture when carrying illicit cargo, unless ownership cannot be verified.",
      "Check conveyance fines: Small-scale transport vehicles face tiered fines (up to NPR 10,000 for non-motorized; up to NPR 20,000 for two-wheelers).",
      "Review general penalty relief: Section 71 lowers the administrative fine from 50% to 25% and adds 'deliberately' as a required element of the offense.",
    ],
    rateTable: {
      title: "Section 59 Procedural Changes under the Customs Act, 2082",
      columns: [
        "Subject Area",
        "Pre-amendment Provision",
        "Amended Provision (Finance Bill, 2083)",
      ],
      rows: [
        [
          "Declaration Correction",
          "Officer 'may permit amendment'",
          "Officer 'may amend the declaration' directly",
        ],
        [
          "Carrying Vehicle Confiscation",
          "Frequent vehicle forfeiture",
          "Vehicle protected; only goods confiscated (unless owner untraceable)",
        ],
        [
          "Small Conveyance Fines (Bicycles/Carts)",
          "Standard general penalties",
          "Fine up to NPR 10,000",
        ],
        [
          "Motorcycle / Scooter Smuggling Fine",
          "Standard general penalties",
          "Fine up to NPR 20,000",
        ],
        [
          "Section 71 Document Penalty",
          "50% penalty",
          "Reduced to 25%; requires proof of deliberate intent",
        ],
      ],
    },
    followUps: [
      "What administrative review and appeal right is inserted under Section 28A?",
      "What rules apply to gold and silver passenger baggage under Annex 4?",
      "What industrial raw material and packing concessions apply under Section 58(2)?",
    ],
  }),
];
