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
    whyLeadLine1: "सामान्य AI ले इन्टरनेटका छरिएका जानकारी मात्र समेट्छ।",
    whyLeadLine2: "ट्याक्सोरा भने नेपालकै कर कानूनका लागि बनाइएको हो।",
    whyIntro:
      "ChatGPT, Gemini र Claude जस्ता सामान्य AI हरू सबै किसिमका कुराकानीका लागि बनाइएका हुन्छन्। त्यसैले यिनले नेपालका करका दफा गलत भन्न सक्छन्, आर्थिक ऐनका नयाँ फेरबदल छुटाउन सक्छन् वा भर पर्न नसकिने उत्तर दिन सक्छन्। ट्याक्सोरा भने नेपालका आधिकारिक ऐन, आन्तरिक राजस्व विभागका निर्देशिका र अनुभवी चार्टर्ड एकाउन्टेन्टहरूको समीक्षामा आधारित छ।",
    principles: [
      {
        id: "statutory-precision",
        title: "नेपालको कर कानूनमा स्पष्ट सटीकता",
        description:
          "आयकर ऐन २०५८, भ्याट ऐन २०५२, अन्तःशुल्क, भन्सार र कम्पनी ऐन २०६३ का प्रावधानअनुसार अनुमानबिनाको भरपर्दो उत्तर।",
      },
      {
        id: "source-grounding",
        title: "दफा र ऐनको सिधा सन्दर्भ",
        description:
          "हरेक उत्तरसँगै सम्बन्धित दफा, अनुसूची र कर कानून पुस्तकालयमा रहेको आधिकारिक PDF तुरुन्तै हेर्न सकिन्छ।",
      },
      {
        id: "ca-audited",
        title: "नेपाली CA बाट प्रमाणित",
        description:
          "CA Knowledge Hub मार्फत अभ्यासमा रहेका नेपाली चार्टर्ड एकाउन्टेन्टहरूले अद्यावधिक गरेका TDS दर, परिपत्र र व्यावहारिक व्याख्या।",
      },
    ],
    exampleEyebrow: "व्यावसायिक कर प्रश्नको उदाहरण",
    exampleQuote:
      "“नेपालमा बासिन्दा सेवा शुल्क भुक्तानी गर्दा दफा ८८ अनुसार कति TDS काट्नुपर्छ, VAT को सीमा के हो र विवरण बुझाउने म्याद कहिलेसम्म हुन्छ?”",
    exampleCta: "कर कानून पुस्तकालय हेर्नुहोस्",
    comparisonHeading: "सामान्य AI र ट्याक्सोरा बीचको फरक",
    comparisonSubLead:
      "नेपालको करसम्बन्धी काममा सामान्य AI किन भरपर्दो हुँदैन, र ट्याक्सोराले कसरी आधिकारिक र प्रमाणित उत्तर दिन्छ।",
    sphereCaption: "ट्याक्सोरा कर प्रणाली",
    limitations: [
      {
        id: "statutory-grounding",
        metric: "०%",
        description:
          "सामान्य AI ले नेपालको कर कानून नछुट्याई विश्वभरका नियम आपसमा मिसाइदिन्छन्।",
        pill: "अनुमानमा आधारित उत्तर",
        topPx: 64,
        anchorX: 105.3,
        anchorY: 64,
      },
      {
        id: "amendment-lag",
        metric: "१–२ वर्ष",
        description:
          "हरेक वर्षको आर्थिक ऐनले बदल्ने कर दर र आन्तरिक राजस्व विभागका परिपत्र छुट्छन्।",
        pill: "पुराना कर दर",
        topPx: 180,
        anchorX: 42,
        anchorY: 180,
      },
      {
        id: "source-audit",
        metric: "० लिङ्क",
        description:
          "उत्तर सुन्दा ठीक लागे पनि कुन दफा वा आधिकारिक PDF बाट आएको हो भन्ने प्रमाण हुँदैन।",
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
        subtitle: "आयकर २०५८, भ्याट २०५२ र कम्पनी ऐन",
        linkedLimitationId: "statutory-grounding",
        topPx: 60,
        anchorX: 248.1,
        anchorY: 60,
      },
      {
        id: "citations",
        title: "दफासहितको आधिकारिक लिङ्क",
        subtitle: "ऐन, नियम र IRD का PDF सिधै हेर्नुहोस्",
        linkedLimitationId: "source-audit",
        topPx: 140,
        anchorX: 312.1,
        anchorY: 140,
      },
      {
        id: "finance-bill",
        title: "आर्थिक ऐनअनुसार अद्यावधिक",
        subtitle: "नयाँ TDS दर र वार्षिक संशोधन सहित",
        linkedLimitationId: "amendment-lag",
        topPx: 220,
        anchorX: 312.1,
        anchorY: 220,
      },
      {
        id: "ca-audited",
        title: "CA बाट जाँचिएको सामग्री",
        subtitle: "नेपाली चार्टर्ड एकाउन्टेन्टको समीक्षा",
        linkedLimitationId: "source-audit",
        topPx: 300,
        anchorX: 248.1,
        anchorY: 300,
      },
    ],
    matrixTitle: "प्रत्यक्ष तुलना",
    hideMatrix: "तुलना तालिका लुकाउनुहोस्",
    showMatrix: "पूरा तुलना तालिका हेर्नुहोस्",
    matrixCaption:
      "नेपालको कर कानून खोज्न सामान्य AI र ट्याक्सोरा बीचको प्रत्यक्ष तुलना।",
    colDimension: "विषय",
    colOtherAi: "अन्य AI",
    colOtherAiSub: "ChatGPT, Gemini, Claude",
    colTaxora: "ट्याक्सोरा",
    colTaxoraSub: "नेपालको कर कानूनका लागि विशेष",
    matrixRows: [
      {
        dimension: "कानूनी दायरा",
        otherAi:
          "खुला इन्टरनेटको जानकारी; नेपालको प्रश्नमा विदेशी कर नियम मिसाउने समस्या।",
        taxora:
          "नेपालको आयकर ऐन २०५८, भ्याट ऐन २०५२, अन्तःशुल्क, भन्सार र कम्पनी ऐन २०६३ मै केन्द्रित।",
      },
      {
        dimension: "आर्थिक ऐन अद्यावधिक",
        otherAi: "पुरानो डाटा वा अपूर्ण वेब नतिजा; वार्षिक आर्थिक ऐनका नयाँ दर छुट्ने।",
        taxora:
          "आर्थिक विधेयक २०८२/२०८३ का संशोधन, सीमा र IRD निर्देशिकाअनुसार अद्यावधिक।",
      },
      {
        dimension: "उद्धरण र प्रमाण",
        otherAi: "आधिकारिक PDF वा दफाको स्पष्ट प्रमाणबिनाको सामान्य सारांश मात्र।",
        taxora:
          "Tax Law Library मा रहेका आधिकारिक कानूनी PDF सँग सिधै जोडिएको दफा-सटीक सन्दर्भ।",
      },
      {
        dimension: "व्यावसायिक समीक्षा",
        otherAi: "चार्टर्ड एकाउन्टेन्टको जाँचबिनाको अप्रमाणित उत्तर।",
        taxora:
          "CA Knowledge Hub मार्फत अभ्यासमा रहेका नेपाली CA हरूद्वारा जाँचिएको र अद्यावधिक।",
      },
    ],
    matrixNotePrefix: "ट्याक्सोरामा देखिने हरेक कानूनी सन्दर्भलाई सिधै ",
    matrixNoteLink: "कर कानून पुस्तकालय (Tax Law Library)",
    matrixNoteSuffix: " मा गएर जाँच्न सकिन्छ।",
    ctaTitle: "ट्याक्सोरा प्रयोग गरेर हेर्नुहोस्",
    ctaDesc:
      "सीए ओरासँग करसम्बन्धी जटिल प्रश्न सोध्नुहोस् वा कर कानून पुस्तकालयमा आधिकारिक ऐनहरू हेर्नुहोस्।",
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
