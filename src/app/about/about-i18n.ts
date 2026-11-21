export type AboutLocale = "np" | "en";

export interface PrincipleCopy {
  id: string;
  title: string;
  description: string;
}

export interface LimitationCopy {
  id: string;
  metric: string;
  description: string;
  pill: string;
  topPx: number;
  anchorX: number;
  anchorY: number;
}

export interface AdvantageCopy {
  id: string;
  title: string;
  subtitle: string;
  linkedLimitationId: string;
  topPx: number;
  anchorX: number;
  anchorY: number;
}

export interface ComparisonRowCopy {
  dimension: string;
  otherAi: string;
  taxora: string;
}

export interface AboutCopy {
  heroTitle: string;
  backToAssistant: string;
  whyEyebrow: string;
  whyLeadLine1: string;
  whyLeadLine2: string;
  whyIntro: string;
  principles: readonly PrincipleCopy[];
  exampleEyebrow: string;
  exampleQuote: string;
  exampleCta: string;
  comparisonHeading: string;
  comparisonSubLead: string;
  sphereCaption: string;
  limitations: readonly LimitationCopy[];
  advantages: readonly AdvantageCopy[];
  matrixTitle: string;
  hideMatrix: string;
  showMatrix: string;
  matrixCaption: string;
  colDimension: string;
  colOtherAi: string;
  colOtherAiSub: string;
  colTaxora: string;
  colTaxoraSub: string;
  matrixRows: readonly ComparisonRowCopy[];
  matrixNotePrefix: string;
  matrixNoteLink: string;
  matrixNoteSuffix: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export const ABOUT_COPY: Record<AboutLocale, AboutCopy> = {
  np: {
    heroTitle: "हाम्रो बारेमा",
    backToAssistant: "सीए ओरा",
    whyEyebrow: "ट्याक्सोरा किन खास छ?",
    whyLeadLine1: "नेपालको कर कानुन बुझ्न",
    whyLeadLine2: "सम्बन्धित दफा र मूल स्रोत हेर्नुहोस्।",
    whyIntro:
      "ChatGPT, Gemini र Claude विभिन्न विषयका लागि बनाइएका एआई सहायक हुन्। नेपालको करबारे सोध्दा तिनले गलत दफा उल्लेख गर्न सक्छन्, पछिल्ला संशोधन छुटाउन सक्छन् वा स्रोत नखुलाई उत्तर दिन सक्छन्। ट्याक्सोराले नेपालका ऐन र आन्तरिक राजस्व विभागका निर्देशिकालाई आधार मान्छ। अभ्यासरत चार्टर्ड एकाउन्टेन्टहरूले पनि सामग्रीको समीक्षा गर्छन्।",
    principles: [
      {
        id: "statutory-precision",
        title: "नेपालका ऐनमा आधारित उत्तर",
        description:
          "आयकर ऐन, २०५८, मूल्य अभिवृद्धि कर ऐन, २०५२, कम्पनी ऐन, २०६३ तथा अन्तःशुल्क र भन्सारसम्बन्धी प्रावधान हेर्न सकिन्छ।",
      },
      {
        id: "source-grounding",
        title: "सम्बन्धित दफा र मूल स्रोत",
        description:
          "उत्तरमा उल्लेख गरिएका दफा र अनुसूची कर कानुन पुस्तकालयका आधिकारिक कागजातमा खोल्न सकिन्छ।",
      },
      {
        id: "ca-audited",
        title: "चार्टर्ड एकाउन्टेन्टको समीक्षा",
        description:
          "अभ्यासरत नेपाली चार्टर्ड एकाउन्टेन्टहरूले CA Knowledge Hub मार्फत परिपत्र, कर कट्टीका दर र व्यावहारिक कर व्याख्या समीक्षा गर्छन्।",
      },
    ],
    exampleEyebrow: "व्यावसायिक कर प्रश्नको उदाहरण",
    exampleQuote:
      "“नेपालका बासिन्दा सेवा प्रदायकलाई शुल्क तिर्दा आयकर ऐनको दफा ८८ अनुसार कति कर कट्टी (TDS) गर्नुपर्छ? भ्याट दर्ताको सीमा कति हो र विवरण कहिलेसम्म बुझाउनुपर्छ?”",
    exampleCta: "कर कानुन पुस्तकालय हेर्नुहोस्",
    comparisonHeading: "सामान्य एआई र ट्याक्सोराको तुलना",
    comparisonSubLead:
      "नेपालको करबारे उत्तर खोज्दा कुन कानुन लागू हुन्छ, स्रोत कहाँ छ र सामग्री कसले समीक्षा गरेको छ भन्ने कुरा महत्त्वपूर्ण हुन्छ।",
    sphereCaption: "ट्याक्सोरा कर प्रणाली",
    limitations: [
      {
        id: "statutory-grounding",
        metric: "लागू हुने कानुन",
        description: "नेपालको करसम्बन्धी प्रश्नमा अर्को देशको नियम मिसिन सक्छ।",
        pill: "अनुमानमा आधारित उत्तर",
        topPx: 64,
        anchorX: 105.3,
        anchorY: 64,
      },
      {
        id: "amendment-lag",
        metric: "पछिल्ला संशोधन",
        description: "हालै फेरिएका करका दर वा राजस्व विभागका परिपत्र छुट्न सक्छन्।",
        pill: "पुराना कर दर",
        topPx: 180,
        anchorX: 42,
        anchorY: 180,
      },
      {
        id: "source-audit",
        metric: "मूल स्रोत",
        description:
          "उत्तर सही जस्तो लागे पनि त्यसमा सम्बन्धित दफा वा मूल कागजात नदिइएको हुन सक्छ।",
        pill: "आधिकारिक प्रमाण छैन",
        topPx: 296,
        anchorX: 105.3,
        anchorY: 296,
      },
    ],
    advantages: [
      {
        id: "precision",
        title: "नेपालकै कानूनमा आधारित",
        subtitle: "आयकर, मूल्य अभिवृद्धि कर र कम्पनीसम्बन्धी ऐन",
        linkedLimitationId: "statutory-grounding",
        topPx: 60,
        anchorX: 248.1,
        anchorY: 60,
      },
      {
        id: "citations",
        title: "दफा र आधिकारिक स्रोत",
        subtitle: "ऐन, नियम र राजस्व विभागका मूल कागजात खोल्नुहोस्",
        linkedLimitationId: "source-audit",
        topPx: 140,
        anchorX: 312.1,
        anchorY: 140,
      },
      {
        id: "finance-bill",
        title: "आर्थिक ऐनअनुसार अद्यावधिक",
        subtitle: "कर कट्टीका दर र वार्षिक संशोधन",
        linkedLimitationId: "amendment-lag",
        topPx: 220,
        anchorX: 312.1,
        anchorY: 220,
      },
      {
        id: "ca-audited",
        title: "चार्टर्ड एकाउन्टेन्टले समीक्षा गरेको सामग्री",
        subtitle: "अभ्यासरत नेपाली चार्टर्ड एकाउन्टेन्टहरूको योगदान",
        linkedLimitationId: "source-audit",
        topPx: 300,
        anchorX: 248.1,
        anchorY: 300,
      },
    ],
    matrixTitle: "विषयअनुसार तुलना",
    hideMatrix: "तुलना लुकाउनुहोस्",
    showMatrix: "तुलना हेर्नुहोस्",
    matrixCaption: "नेपालको कर कानुन खोज्दा सामान्य एआई र ट्याक्सोराबाट के फरक पर्छ?",
    colDimension: "विषय",
    colOtherAi: "सामान्य एआई",
    colOtherAiSub: "ChatGPT, Gemini, Claude",
    colTaxora: "ट्याक्सोरा",
    colTaxoraSub: "नेपालको कर कानुनमा केन्द्रित",
    matrixRows: [
      {
        dimension: "कुन देशको कानुन लागू हुन्छ?",
        otherAi: "नेपालको करबारे उत्तर दिँदा अर्को देशको कर नियम मिसिन सक्छ।",
        taxora:
          "नेपालका आयकर, मूल्य अभिवृद्धि कर, अन्तःशुल्क, भन्सार र कम्पनीसम्बन्धी ऐनमा केन्द्रित छ।",
      },
      {
        dimension: "आर्थिक ऐनका संशोधन",
        otherAi: "पुरानो वा अपूरो जानकारी प्रयोग हुँदा नयाँ कर दर छुट्न सक्छन्।",
        taxora:
          "२०८२ र २०८३ का आर्थिक विधेयकका संशोधन, करका सीमा र आन्तरिक राजस्व विभागका निर्देशिका समेट्छ।",
      },
      {
        dimension: "दफा र मूल कागजात",
        otherAi: "उत्तरमा सम्बन्धित दफा वा आधिकारिक कागजातको लिङ्क नहुन सक्छ।",
        taxora: "सम्बन्धित दफा देखाउँछ र मूल कागजात कर कानुन पुस्तकालयमा खोल्न मिल्छ।",
      },
      {
        dimension: "सामग्रीको समीक्षा",
        otherAi: "उत्तरको समीक्षा चार्टर्ड एकाउन्टेन्टले गरेको छ भन्ने निश्चित हुँदैन।",
        taxora:
          "अभ्यासरत नेपाली चार्टर्ड एकाउन्टेन्टहरूले CA Knowledge Hub मार्फत सामग्री थप्छन् र समीक्षा गर्छन्।",
      },
    ],
    matrixNotePrefix: "उत्तरमा दिइएका कानुनी सन्दर्भहरू ",
    matrixNoteLink: "कर कानुन पुस्तकालय",
    matrixNoteSuffix: "मा मूल कागजातसँग मिलाएर हेर्न सकिन्छ।",
    ctaTitle: "ट्याक्सोरा प्रयोग गरेर हेर्नुहोस्",
    ctaDesc:
      "सीए ओरालाई करसम्बन्धी प्रश्न सोध्नुहोस् वा कर कानुन पुस्तकालयमा आधिकारिक ऐनहरू हेर्नुहोस्।",
    ctaPrimary: "सीए ओरा खोल्नुहोस्",
    ctaSecondary: "ऐनहरू हेर्नुहोस्",
  },
  en: {
    heroTitle: "About Us",
    backToAssistant: "CA Ora",
    whyEyebrow: "Why Taxora stands out",
    whyLeadLine1: "General AI summarizes the open web.",
    whyLeadLine2: "Taxora is engineered strictly for Nepal’s tax law.",
    whyIntro:
      "General-purpose assistants like ChatGPT, Gemini, and Claude are built for broad everyday conversation—often misquoting statutory sections, missing annual Finance Bill amendments, or providing unverified summaries. Taxora is purpose-built from the ground up on Nepal’s official Acts, Inland Revenue Department (IRD) directives, and verified Chartered Accountant rulings.",
    principles: [
      {
        id: "statutory-precision",
        title: "100% Nepal Statutory Precision",
        description:
          "Purpose-trained on Income Tax Act 2058, VAT Act 2052, Excise, Customs, and Companies Act 2063—delivering exact compliance answers without generic guesswork.",
      },
      {
        id: "source-grounding",
        title: "Clause-Exact Source Grounding",
        description:
          "Every answer resolves directly to verified sections, schedules, and downloadable official PDFs stored inside the integrated Tax Law Library.",
      },
      {
        id: "ca-audited",
        title: "Audited by Practicing Nepal CAs",
        description:
          "Continuously expanded through our CA Knowledge Hub with real-world withholding schedules, circulars, and practitioner interpretations.",
      },
    ],
    exampleEyebrow: "Built for high-stakes practitioner questions",
    exampleQuote:
      "“What are the exact Section 88 withholding rates, VAT thresholds, and filing deadlines for resident service fees in Nepal?”",
    exampleCta: "Explore the Tax Law Library",
    comparisonHeading: "Other AI vs. Taxora",
    comparisonSubLead:
      "Why general-purpose AI falls short on Nepal tax compliance—and how Taxora bridges the gap from open-web guesswork to clause-exact statutory intelligence.",
    sphereCaption: "Taxora Statutory Engine",
    limitations: [
      {
        id: "statutory-grounding",
        metric: "0%",
        description:
          "General AI models blend global tax concepts without Nepal-specific statutory indexing.",
        pill: "Open-Web Guesswork",
        topPx: 64,
        anchorX: 105.3,
        anchorY: 64,
      },
      {
        id: "amendment-lag",
        metric: "1–2 yrs",
        description:
          "Annual Nepal Finance Bill rate shifts and IRD circulars are routinely missed or outdated.",
        pill: "Stale Rate Tables",
        topPx: 180,
        anchorX: 42,
        anchorY: 180,
      },
      {
        id: "source-audit",
        metric: "0 Links",
        description:
          "Plausible-sounding answers arrive without verifiable clause numbers or primary IRD PDFs.",
        pill: "No Audit Trail",
        topPx: 296,
        anchorX: 105.3,
        anchorY: 296,
      },
    ],
    advantages: [
      {
        id: "precision",
        title: "Nepal Statutory Precision",
        subtitle: "Income Tax 2058, VAT 2052 & Companies Act",
        linkedLimitationId: "statutory-grounding",
        topPx: 60,
        anchorX: 248.1,
        anchorY: 60,
      },
      {
        id: "citations",
        title: "Clause-Exact Citations",
        subtitle: "Direct links to verified Acts & IRD PDFs",
        linkedLimitationId: "source-audit",
        topPx: 140,
        anchorX: 312.1,
        anchorY: 140,
      },
      {
        id: "finance-bill",
        title: "Finance Bill Synced",
        subtitle: "Updated TDS rates & annual amendments",
        linkedLimitationId: "amendment-lag",
        topPx: 220,
        anchorX: 312.1,
        anchorY: 220,
      },
      {
        id: "ca-audited",
        title: "CA-Audited Rulings",
        subtitle: "Reviewed by practicing Nepal CAs",
        linkedLimitationId: "source-audit",
        topPx: 300,
        anchorX: 248.1,
        anchorY: 300,
      },
    ],
    matrixTitle: "Side-by-Side Comparison",
    hideMatrix: "Hide Full Comparison Table",
    showMatrix: "Show Full Comparison Table",
    matrixCaption:
      "Side-by-side comparison of general-purpose AI assistants vs. Taxora for Nepal statutory tax research.",
    colDimension: "Dimension",
    colOtherAi: "Other AI Assistants",
    colOtherAiSub: "ChatGPT, Gemini, Claude",
    colTaxora: "Taxora",
    colTaxoraSub: "Purpose-built for Nepal Tax Law",
    matrixRows: [
      {
        dimension: "Statutory Scope",
        otherAi:
          "Global open-web training; frequently mixes foreign tax concepts into Nepal queries.",
        taxora:
          "Strictly scoped to Nepal’s Income Tax Act 2058, VAT Act 2052, Excise, Customs & Companies Act 2063.",
      },
      {
        dimension: "Finance Bill Currency",
        otherAi:
          "Static cutoff or unverified web snippets; misses yearly Finance Bill rate revisions.",
        taxora:
          "Continuously updated for Finance Bill 2082/2083 amendments, thresholds, and IRD directives.",
      },
      {
        dimension: "Citations & Evidence",
        otherAi:
          "Generic prose summaries with no primary PDFs or verifiable section-by-section audit trail.",
        taxora:
          "Clause-exact citations linked directly to official statutory PDFs in the Tax Law Library.",
      },
      {
        dimension: "Practitioner Verification",
        otherAi:
          "Unreviewed model output with no Chartered Accountant oversight.",
        taxora:
          "Expanded and audited through the CA Knowledge Hub by practicing Nepal Chartered Accountants.",
      },
    ],
    matrixNotePrefix:
      "Every statutory claim in Taxora can be cross-checked directly in the ",
    matrixNoteLink: "Tax Law Library",
    matrixNoteSuffix: ".",
    ctaTitle: "Experience Taxora in Action",
    ctaDesc:
      "Ask complex tax scenarios with CA Ora or explore primary statutes in the Tax Law Library.",
    ctaPrimary: "Launch CA Ora",
    ctaSecondary: "Browse Statutes",
  },
};
