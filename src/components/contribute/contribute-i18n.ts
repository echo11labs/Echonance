export type ContributeLocale = "en" | "np";

export type QaCategoryKey =
  | "Acts"
  | "Rules"
  | "Finance Acts"
  | "Directives"
  | "Precedents"
  | "Advisory"
  | "Income Tax"
  | "Value Added Tax"
  | "Excise Duty"
  | "Duties and Fees"
  | "Customs Duty"
  | "Tax Amnesties and Waivers";

export type DocumentTypeKey =
  "Directive" | "Circular" | "Rajpatra" | "Act" | "Rule" | "Advisory Note";

export interface WalkthroughCopyStep {
  id: string;
  targetId: string | null;
  title: string;
  description: string;
  bestPracticeTitle: string;
  bestPractice: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export interface TaxReferenceSampleItem {
  id: string;
  label: string;
  category: QaCategoryKey;
  fiscalYear: string;
  language: "en" | "np";
  topic: string;
  provision: string;
  authority: string;
  keywords: string;
  question: string;
  answer: string;
}

export interface OfficialSourceItem {
  name: string;
  domain: string;
  url: string;
}

export interface ContributeCopy {
  header: {
    backToOra: string;
    localeToggleLabel: string;
  };
  splash: {
    welcomeTitle: string;
    caption: string;
    startBtn: string;
  };
  titleBlock: {
    title: string;
    subtitle: string;
    walkthroughBtn: string;
    samplesBtn: string;
    mascotName: string;
    mascotAlt: string;
  };
  mascotTips: string[];
  mascotStates: {
    submitting: string;
    filed: string;
    goodAnswer: string;
    goodQuestion: string;
    goodTopic: string;
  };
  mobileTabs: {
    qa: string;
    preview: string;
  };
  qaForm: {
    heading: string;
    subtitle: string;
    section1: string;
    legalCategory: string;
    customCategoryOption: string;
    customCategoryLabel: string;
    customCategoryPlaceholder: string;
    customCategoryRequiredError: string;
    fiscalYear: string;
    submissionLanguage: string;
    section2: string;
    topicLabel: string;
    topicPlaceholder: string;
    provisionLabel: string;
    optionalBadge: string;
    provisionPlaceholder: string;
    authorityLabel: string;
    defaultAuthority: string;
    keywordsLabel: string;
    commaSeparatedBadge: string;
    keywordsPlaceholder: string;
    section3: string;
    questionLabel: string;
    questionPlaceholder: string;
    answerLabel: string;
    answerPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    dismissNotice: string;
    successMessage: string;
    errorMessage: string;
    networkErrorMessage: string;
  };
  categories: Record<QaCategoryKey, string>;
  docTypes: Record<DocumentTypeKey, string>;
  preview: {
    fyPrefix: string;
    defaultSubject: string;
    questionPlaceholder: string;
    bodyPlaceholder: string;
    authorityLabel: string;
    keywordsLabel: string;
  };
  uploadDrawer: {
    floatingTrigger: string;
    title: string;
    subtitle: string;
    closeAria: string;
    sectionMeta: string;
    docType: string;
    issuingAuthority: string;
    fiscalYear: string;
    sectionFiles: string;
    dropTitlePrefix: string;
    dropBrowse: string;
    dropHint: string;
    stagedLabel: string;
    removeFileAria: (name: string) => string;
    cancelUploadAria: string;
    readySummary: (count: number, authority: string) => string;
    emptySummary: string;
    uploadingBtn: string;
    uploadCountBtn: (count: number) => string;
    uploadBtn: string;
    missingFileError: string;
    cancelledNotice: string;
    savedProgressText: string;
    uploadedSuccess: (name: string) => string;
    uploadedBatchSuccess: (count: number) => string;
    unsupportedFileError: (name: string) => string;
    fileTooLargeError: (name: string) => string;
    uploadErrorPrefix: string;
    uploadFallbackError: string;
    networkError: string;
  };
  modal: {
    title: string;
    subtitleQa: string;
    subtitleDoc: string;
    closeAria: string;
    anonymousCheckbox: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    icanLabel: string;
    icanPlaceholder: string;
    firmLabel: string;
    firmPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    cancelBtn: string;
    confirmQaBtn: string;
    confirmDocBtn: string;
  };
  fiscalPicker: {
    triggerPrefix: string;
    searchPlaceholder: string;
    searchAria: string;
    clearSearchAria: string;
    decadeRailAria: string;
    decadeSuffix: string;
    yearsCountSuffix: string;
    currentTag: string;
    itaTag: string;
    vatTag: string;
    emptyMatch: (query: string) => string;
    footerCount: (shown: number, total: number) => string;
    jumpCurrentBtn: (fy: string) => string;
  };
  walkthrough: {
    badge: string;
    role: string;
    progressText: string;
    prevBtn: string;
    nextBtn: string;
    doneBtn: string;
    closeAria: string;
    viewSamplesBtn: string;
    steps: WalkthroughCopyStep[];
  };
  referenceView: {
    backBtn: string;
    sampleFilingsTitle: string;
    sampleNavAria: string;
    officialSourcesTitle: string;
    readerIntro: string;
    fyPrefix: string;
    authorityPrefix: string;
    keywordsPrefix: string;
    sources: OfficialSourceItem[];
    samples: TaxReferenceSampleItem[];
  };
}

export const CONTRIBUTE_COPY: Record<ContributeLocale, ContributeCopy> = {
  en: {
    header: {
      backToOra: "Back to CA Ora",
      localeToggleLabel: "Switch language",
    },
    splash: {
      welcomeTitle: "Welcome, Contributor",
      caption: "Taxora · CA Knowledge Hub",
      startBtn: "Let's Begin",
    },
    titleBlock: {
      title: "Contributor Filing",
      subtitle:
        "Submit tax Q&A interpretations or upload official directives and Nepal Rajpatra documents for CA Ora.",
      walkthroughBtn: "Walkthrough",
      samplesBtn: "Sample & Learn Here",
      mascotName: "CA Ora",
      mascotAlt: "CA Ora scholar owl mascot",
    },
    mascotTips: [
      "Cite the exact Finance Act year when mentioning threshold slabs.",
      "Distinguish VAT-registered vs. non-VAT rates under Sec 88(1).",
      "Keep client names and PAN numbers anonymized in your scenarios.",
      "Reverse charge under Sec 8(2) applies to imported B2B services.",
      "Include exact section citations so practitioners can verify fast.",
      "Use Nepal Rajpatra references for recent statutory rate amendments.",
    ],
    mascotStates: {
      submitting: "Indexing your contribution for peer review...",
      filed: "Filed cleanly. Ready whenever you want to add another.",
      goodAnswer:
        "Clear statutory reasoning — practitioners will find this super helpful.",
      goodQuestion:
        "Good scenario. Add applicable rates and section citations below.",
      goodTopic: "Solid topic setup. Describe the client scenario next.",
    },
    mobileTabs: {
      qa: "Submit Tax Q&A",
      preview: "Document Preview",
    },
    qaForm: {
      heading: "Submit Tax Q&A",
      subtitle: "Record a client scenario with statutory citations.",
      section1: "1. Classification",
      legalCategory: "Legal Category",
      customCategoryOption: "+ Add Custom Category...",
      customCategoryLabel: "Custom Category Name",
      customCategoryPlaceholder: "e.g. VAT, Customs, Excise, Transfer Pricing",
      customCategoryRequiredError:
        "Please enter a custom legal category name or select a standard category.",
      fiscalYear: "Fiscal Year",
      submissionLanguage: "Language",
      section2: "2. Citation & Topic",
      topicLabel: "Topic Label",
      topicPlaceholder: "e.g. TDS on Service Fees (VAT-Registered vs. Non-VAT)",
      provisionLabel: "Section / Provision",
      optionalBadge: "Optional",
      provisionPlaceholder: "e.g. Section 88(1) Proviso, Income Tax Act, 2058",
      authorityLabel: "Issuing Authority",
      defaultAuthority: "Inland Revenue Department",
      keywordsLabel: "Keywords",
      commaSeparatedBadge: "Comma-separated",
      keywordsPlaceholder: "tds, withholding, section 88",
      section3: "3. Scenario & Analysis",
      questionLabel: "Client Scenario or Tax Question",
      questionPlaceholder:
        "Describe the transaction, entity type, or compliance question...",
      answerLabel: "Authoritative Tax Solution & Reasoning",
      answerPlaceholder:
        "Provide the statutory analysis, applicable rates, exemptions, and supporting circular or precedent...",
      submitBtn: "Submit Entry",
      submittingBtn: "Submitting...",
      dismissNotice: "Dismiss message",
      successMessage:
        "Tax scenario submitted. Peer review pending before CA Ora indexing.",
      errorMessage: "Failed to record entry. Please try again.",
      networkErrorMessage: "Connection failed. Please check network.",
    },
    categories: {
      Acts: "Acts",
      Rules: "Rules",
      "Finance Acts": "Finance Acts",
      Directives: "Directives",
      Precedents: "Precedents",
      Advisory: "Advisory",
      "Income Tax": "Income Tax",
      "Value Added Tax": "Value Added Tax",
      "Excise Duty": "Excise Duty",
      "Duties and Fees": "Duties and Fees",
      "Customs Duty": "Customs Duty",
      "Tax Amnesties and Waivers": "Tax Amnesties and Waivers",
    },
    docTypes: {
      Directive: "Directive",
      Circular: "Circular",
      Rajpatra: "Rajpatra",
      Act: "Act",
      Rule: "Rule",
      "Advisory Note": "Advisory Note",
    },
    preview: {
      fyPrefix: "FY",
      defaultSubject: "Subject: Tax Compliance & Statutory Guidance",
      questionPlaceholder:
        "Enter a client scenario or tax question on the left to preview the document filing.",
      bodyPlaceholder:
        "Your statutory analysis, applicable rates, exemptions, and Nepal Rajpatra or IRD circular citations will render here in document format.",
      authorityLabel: "Authority",
      keywordsLabel: "Keywords",
    },
    uploadDrawer: {
      floatingTrigger: "Add files",
      title: "Upload Directives & Rajpatra",
      subtitle: "Add official circulars, directives, or Nepal Rajpatra PDFs.",
      closeAria: "Close file upload drawer",
      sectionMeta: "1. Document Metadata",
      docType: "Document Type",
      issuingAuthority: "Issuing Authority",
      fiscalYear: "Fiscal Year",
      sectionFiles: "2. File Selection",
      dropTitlePrefix: "Drop PDF or DOC files here or",
      dropBrowse: "browse",
      dropHint: "Max 25 MB per file • Stored directly in Taxora repository",
      stagedLabel: "Staged",
      removeFileAria: (name) => `Remove ${name}`,
      cancelUploadAria: "Cancel upload",
      readySummary: (count, authority) =>
        `${count} file(s) ready for ${authority}`,
      emptySummary: "Select a document to upload",
      uploadingBtn: "Uploading...",
      uploadCountBtn: (count) => `Upload Document (${count})`,
      uploadBtn: "Upload Document",
      missingFileError: "Please drop or browse files to upload.",
      cancelledNotice: "Upload cancelled.",
      savedProgressText: "Saved to database • 100%",
      uploadedSuccess: (name) => `"${name}" uploaded and saved to Taxora.`,
      uploadedBatchSuccess: (count) =>
        `${count} documents uploaded and queued for editorial review.`,
      unsupportedFileError: (name) =>
        `"${name}" was skipped. Only PDF, DOC, and DOCX files are supported.`,
      fileTooLargeError: (name) =>
        `"${name}" was skipped. Files must be 25 MB or smaller.`,
      uploadErrorPrefix: "Upload error",
      uploadFallbackError: "Failed to save document to database.",
      networkError: "Network transmission failed. Please retry.",
    },
    modal: {
      title: "Practitioner Attribution",
      subtitleQa:
        "Choose how this tax Q&A should be credited before submitting.",
      subtitleDoc:
        "Choose how this document should be credited before submitting.",
      closeAria: "Close attribution modal",
      anonymousCheckbox: "Contribute anonymously without public attribution",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "CA Rajesh Shrestha",
      icanLabel: "ICAN / COP No.",
      icanPlaceholder: "e.g. 4821",
      firmLabel: "Firm / Practice",
      firmPlaceholder: "Firm or Advisory Name",
      emailLabel: "Professional Email",
      emailPlaceholder: "name@firm.com.np",
      cancelBtn: "Cancel",
      confirmQaBtn: "Confirm & Submit",
      confirmDocBtn: "Confirm & Upload",
    },
    fiscalPicker: {
      triggerPrefix: "FY",
      searchPlaceholder: "Jump by B.S. or A.D. year (e.g. 2081)...",
      searchAria: "Filter Nepal fiscal years",
      clearSearchAria: "Clear fiscal year filter",
      decadeRailAria: "Jump by decade",
      decadeSuffix: "B.S.",
      yearsCountSuffix: "yrs",
      currentTag: "Current",
      itaTag: "ITA 2058",
      vatTag: "VAT 2052",
      emptyMatch: (query) => `No fiscal year matches "${query}"`,
      footerCount: (shown, total) => `${shown} of ${total} fiscal years`,
      jumpCurrentBtn: (fy) => `Use FY ${fy}`,
    },
    walkthrough: {
      badge: "CA Ora · Filing Guide",
      role: "Interactive Contributor Walkthrough",
      progressText: "Step {{current}} of {{total}}",
      prevBtn: "Back",
      nextBtn: "Next",
      doneBtn: "Start Filing",
      closeAria: "Close CA Ora walkthrough",
      viewSamplesBtn: "View samples",
      steps: [
        {
          id: "overview",
          targetId: "walkthrough-ora-guide",
          title: "Meet CA Ora — Your Filing Guide",
          description:
            "You can contribute to Taxora in two ways: draft structured Nepal Tax Q&A scenarios on the left, or upload official IRD directives and Nepal Rajpatra PDFs from the right-edge drawer.",
          bestPracticeTitle: "Before You Begin",
          bestPractice:
            "Use Sample & Learn Here in the top bar anytime to inspect verified citation depth, formatting, and official Nepal tax portals.",
          side: "bottom",
          align: "start",
        },
        {
          id: "classification",
          targetId: "walkthrough-classification",
          title: "1. Classify Category, Fiscal Year & Language",
          description:
            "Select the governing Legal Category, exact Nepal Fiscal Year (B.S.), and submission language before drafting. Tax thresholds shift across Finance Acts, so year precision is essential.",
          bestPracticeTitle: "CA Ora Best Submission Tip",
          bestPractice:
            "Match the Fiscal Year to the amendment being interpreted (e.g., FY 2081/82 vs. FY 2083/84) rather than leaving a default year selected.",
          side: "right",
          align: "start",
        },
        {
          id: "citation",
          targetId: "walkthrough-citation",
          title: "2. Anchor Topic, Exact Section & Keywords",
          description:
            "Write a descriptive Topic Label, pinpoint the statutory Section or Proviso, confirm the Issuing Authority, and add practitioner keywords.",
          bestPracticeTitle: "CA Ora Best Submission Tip",
          bestPractice:
            "Format citations cleanly (e.g. 'Section 88(1) Proviso, Income Tax Act, 2058') and add 4-6 search keywords covering rates, sections, and acronyms.",
          side: "right",
          align: "start",
        },
        {
          id: "analysis",
          targetId: "walkthrough-analysis",
          title: "3. Draft a High-Value Scenario & Reasoning",
          description:
            "Describe a realistic client scenario with clear transaction facts, then provide authoritative statutory reasoning covering rates, exemptions, and filing timelines.",
          bestPracticeTitle: "CA Ora Best Submission Tip",
          bestPractice:
            "Use concrete NPR/USD amounts while anonymizing client names and PANs. Structure the answer in steps: Governing Rule -> Rate/Threshold -> Exception -> Filing Duty.",
          side: "right",
          align: "start",
        },
        {
          id: "preview",
          targetId: "walkthrough-preview",
          title: "4. Verify Live Document Preview & Submit",
          description:
            "As you write, this pane renders your entry into an editorial brief so you can double-check readability and citation accuracy before clicking Submit Entry.",
          bestPracticeTitle: "Attribution Choice",
          bestPractice:
            "When you click Submit Entry, choose whether to publish under your CA/practitioner credentials (saved locally for future filings) or submit anonymously.",
          side: "left",
          align: "start",
        },
        {
          id: "upload",
          targetId: "walkthrough-upload-trigger",
          title: "5. Attach Directives, Circulars & Rajpatra PDFs",
          description:
            "Indexing a primary legal release instead of a Q&A? Click Add files along the right edge to slide open the upload drawer and attach official PDFs or DOC files.",
          bestPracticeTitle: "CA Ora Best Submission Tip",
          bestPractice:
            "Upload legible official documents and verify Document Type (Directive, Circular, Rajpatra, Act, Rule) and Fiscal Year before uploading.",
          side: "left",
          align: "center",
        },
      ],
    },
    referenceView: {
      backBtn: "Back to Contributor Filing",
      sampleFilingsTitle: "Sample Filings",
      sampleNavAria: "Sample Tax Scenarios",
      officialSourcesTitle: "Official Nepal Sources",
      readerIntro:
        "Reference examples showing the expected level of statutory citation, practical client context, and structured legal reasoning for CA Ora contributions.",
      fyPrefix: "FY",
      authorityPrefix: "Issuing Authority",
      keywordsPrefix: "Keywords",
      sources: [
        {
          name: "Finance Bill, 2083 (FY 2083/84 Source)",
          domain: "finance-bill-2083-84-original.pdf",
          url: "/api/sources/finance-bill-2083-pdf",
        },
        {
          name: "Inland Revenue Department",
          domain: "ird.gov.np",
          url: "https://www.ird.gov.np",
        },
        {
          name: "Nepal Law Commission",
          domain: "lawcommission.gov.np",
          url: "https://www.lawcommission.gov.np",
        },
        {
          name: "Nepal Rajpatra",
          domain: "rajpatra.dop.gov.np",
          url: "https://rajpatra.dop.gov.np",
        },
        {
          name: "Ministry of Finance",
          domain: "mof.gov.np",
          url: "https://www.mof.gov.np",
        },
        {
          name: "ICAN Nepal",
          domain: "ican.org.np",
          url: "https://www.ican.org.np",
        },
      ],
      samples: [
        {
          id: "tds-service-fee",
          label: "TDS on Service Fees",
          category: "Acts",
          fiscalYear: "2081/82",
          language: "en",
          topic: "TDS on Service Fees (VAT-Registered vs. Non-VAT)",
          provision: "Section 88(1) Proviso, Income Tax Act, 2058",
          authority: "Inland Revenue Department",
          keywords: "tds, service fee, section 88, vat invoice, withholding",
          question:
            "A resident private limited company in Kathmandu hires an independent IT consultancy firm for a system audit and receives an invoice for NPR 500,000 plus 13% VAT (total NPR 565,000). What TDS rate applies at the time of payment, and how would the rate change if the service provider were not VAT-registered?",
          answer:
            "Under Section 88(1) of the Income Tax Act, 2058, a resident person making a service fee payment with a source in Nepal must withhold tax at source at the time of payment or credit, whichever is earlier.\n\n1. VAT-Registered Service Provider: Pursuant to the proviso to Section 88(1), where a service fee is paid to a resident person registered for VAT who issues a valid tax invoice, 1.5% TDS applies on the taxable value excluding VAT (i.e., 1.5% of NPR 500,000 = NPR 7,500).\n\n2. Non-VAT Registered Service Provider: If the service provider is not registered for VAT, the general 15% TDS rate applies on the gross service fee.\n\n3. Deposit & Filing: The withholding agent must deposit the deducted TDS into the government revenue account within 25 days after the end of the Nepali month and file the monthly e-TDS return via the IRD online system.",
        },
        {
          id: "dst-reverse-charge",
          label: "DST & Reverse Charge VAT",
          category: "Finance Acts",
          fiscalYear: "2081/82",
          language: "en",
          topic: "DST & Reverse Charge VAT on Foreign SaaS",
          provision: "Finance Act, 2081 (DST); Section 8(2), VAT Act, 2052",
          authority: "Inland Revenue Department",
          keywords:
            "dst, digital service tax, reverse charge, vat, saas, section 8(2)",
          question:
            "A Nepalese fintech company pays USD 1,200/month to a non-resident US cloud hosting provider (not registered in Nepal) for production server infrastructure. Does the Nepalese company need to deduct 2% Digital Service Tax (DST), or does VAT reverse charge and Section 88 TDS apply?",
          answer:
            "1. Digital Service Tax (DST) Does Not Apply (B2B): Under the Finance Act, 2081 and the IRD Digital Service Tax Procedure, 2081, the 2% DST (applicable where non-resident digital turnover in Nepal exceeds NPR 3 million) applies strictly to B2C transactions. Business enterprise purchases are excluded from DST.\n\n2. VAT Reverse Charge (Section 8(2), VAT Act, 2052): Because the Nepalese company is importing a service from outside Nepal for business use, it must self-assess and deposit 13% VAT under the Reverse Charge mechanism (Section 8(2)) and may claim input tax credit if making taxable supplies.\n\n3. Withholding Tax (TDS): The resident payer must also evaluate 15% TDS on payments to non-residents under Section 88 unless an applicable Double Taxation Avoidance Agreement (DTAA) provides relief.",
        },
        {
          id: "it-export-1-percent",
          label: "Foreign Currency IT Exports",
          category: "Finance Acts",
          fiscalYear: "2081/82",
          language: "en",
          topic: "1% Withholding on Foreign Currency IT Exports",
          provision: "Section 95Ka / Finance Act, 2081",
          authority: "Inland Revenue Department",
          keywords:
            "software export, foreign currency, 1% tax, freelance, it services",
          question:
            "A Nepalese software firm provides remote software development services to a client in Germany and receives USD 10,000 through a Nepalese commercial bank. How is tax collected on this remittance?",
          answer:
            "Under the Income Tax Act, 2058 as amended by the Finance Act, 2081, when a resident person receives payment in foreign currency for providing software or similar electronic/IT services outside Nepal, the receiving bank, financial institution, or money transfer agent is required to collect 1% advance tax at the time of crediting or disbursing the foreign currency amount.\n\nThe 1% collected by the bank functions as an advance tax / withholding mechanism that must be reconciled in the taxpayer's annual income tax return unless explicitly designated as final under the prevailing Finance Act.",
        },
        {
          id: "cash-salary-limit",
          label: "Cash Salary Threshold",
          category: "Acts",
          fiscalYear: "2081/82",
          language: "en",
          topic: "Disallowance of Cash Salary Above NPR 25,000",
          provision: "Section 21 / Finance Act, 2081",
          authority: "Inland Revenue Department",
          keywords:
            "cash salary, disallowance, 25000, banking channel, section 21",
          question:
            "During a statutory tax audit for FY 2081/82, the auditor finds that a manufacturing company paid monthly salaries of NPR 40,000 each in cash to three factory supervisors. Can the company claim these salary expenses as deductible business expenses?",
          answer:
            "Under the Income Tax Act, 2058 (as reinforced by the Finance Act, 2081), remuneration or salary payments exceeding NPR 25,000 must be disbursed through banking channels (account-payee cheque or electronic bank transfer).\n\nBecause the NPR 40,000 monthly salaries exceed the NPR 25,000 threshold and were settled in cash, the expense is disallowed as a deduction when computing taxable business income under Section 21, regardless of whether salary TDS was deducted.",
        },
      ],
    },
  },
  np: {
    header: {
      backToOra: "CA Ora मा फर्कनुहोस्",
      localeToggleLabel: "भाषा छान्नुहोस्",
    },
    splash: {
      welcomeTitle: "योगदानकर्ताज्यू, स्वागत छ",
      caption: "Taxora · CA ज्ञान केन्द्र",
      startBtn: "सुरु गरौँ",
    },
    titleBlock: {
      title: "योगदानकर्ता फाइलिङ",
      subtitle:
        "CA Ora का लागि करसम्बन्धी प्रश्नोत्तर व्याख्या वा आधिकारिक निर्देशिका तथा नेपाल राजपत्रका कागजात पेश गर्नुहोस्।",
      walkthroughBtn: "मार्गदर्शन",
      samplesBtn: "नमूना र सिकाइ",
      mascotName: "CA Ora",
      mascotAlt: "CA Ora कर सल्लाहकार शुभंकर",
    },
    mascotTips: [
      "कर सीमा वा दर उल्लेख गर्दा सम्बन्धित आर्थिक ऐनको वर्ष स्पष्ट लेख्नुहोस्।",
      "दफा ८८(१) अन्तर्गत VAT दर्ता भएका र नभएका प्रदायकको TDS दर छुट्ट्याउनुहोस्।",
      "सेवाग्राहीको नाम र PAN नम्बर गोप्य राखी काल्पनिक विवरण प्रयोग गर्नुहोस्।",
      "विदेशबाट आयातित B2B सेवामा दफा ८(२) बमोजिम Reverse Charge VAT लागु हुन्छ।",
      "दफा र उपदफाको स्पष्ट उद्धरण राख्दा अन्य पेशेवरलाई प्रमाणित गर्न सहज हुन्छ।",
      "नयाँ दर र संशोधनका लागि नेपाल राजपत्र वा IRD परिपत्रको सन्दर्भ जोड्नुहोस्।",
    ],
    mascotStates: {
      submitting: "समीक्षाका लागि तपाईंको योगदान अभिलेख हुँदैछ...",
      filed: "सफलतापूर्वक पेश भयो। अर्को प्रविष्टि थप्न तयार छ।",
      goodAnswer:
        "स्पष्ट कानुनी तर्क — यो व्याख्या कर अभ्यासकर्ताका लागि निकै उपयोगी हुनेछ।",
      goodQuestion: "राम्रो व्यावहारिक अवस्था। अब तल लागू हुने दर र दफा उल्लेख गर्नुहोस्।",
      goodTopic: "विषय स्पष्ट भयो। अब सेवाग्राहीको प्रश्न र अवस्था लेख्नुहोस्।",
    },
    mobileTabs: {
      qa: "कर प्रश्नोत्तर",
      preview: "कागजात पूर्वावलोकन",
    },
    qaForm: {
      heading: "कर प्रश्नोत्तर पेश गर्नुहोस्",
      subtitle: "कानुनी दफा र सन्दर्भसहित करसम्बन्धी व्यावहारिक प्रश्नोत्तर लेख्नुहोस्।",
      section1: "१. वर्गीकरण",
      legalCategory: "कानुनी वर्ग",
      customCategoryOption: "+ नयाँ वर्ग थप्नुहोस्...",
      customCategoryLabel: "आफ्नै वर्गको नाम",
      customCategoryPlaceholder: "जस्तै: मूल्य अभिवृद्धि कर, भन्सार, अन्तःशुल्क",
      customCategoryRequiredError:
        "कृपया आफ्नै कानुनी वर्गको नाम लेख्नुहोस् वा सूचीबाट छान्नुहोस्।",
      fiscalYear: "आर्थिक वर्ष",
      submissionLanguage: "पेश गर्ने भाषा",
      section2: "२. सन्दर्भ र विषय",
      topicLabel: "विषय शीर्षक",
      topicPlaceholder: "जस्तै: सेवा शुल्कमा TDS (VAT दर्ता र गैर-VAT)",
      provisionLabel: "दफा / प्रावधान",
      optionalBadge: "ऐच्छिक",
      provisionPlaceholder:
        "जस्तै: आयकर ऐन, २०५८ को दफा ८८(१) को प्रतिबन्धात्मक वाक्यांश",
      authorityLabel: "जारी गर्ने निकाय",
      defaultAuthority: "आन्तरिक राजस्व विभाग",
      keywordsLabel: "खोज शब्दहरू",
      commaSeparatedBadge: "अल्पविराम (,) ले छुट्ट्याउनुहोस्",
      keywordsPlaceholder: "tds, withholding, section 88, vat invoice",
      section3: "३. व्यावहारिक अवस्था र विश्लेषण",
      questionLabel: "सेवाग्राहीको अवस्था वा कर प्रश्न",
      questionPlaceholder:
        "कारोबारको प्रकृति, संस्थाको प्रकार र मुख्य कर प्रश्न स्पष्ट रूपमा लेख्नुहोस्...",
      answerLabel: "आधिकारिक कर समाधान र कानुनी तर्क",
      answerPlaceholder:
        "सम्बन्धित दफा, लागू कर दर, छुट वा अपवाद, र आवश्यक परिपत्र वा नजिरसहित चरणबद्ध उत्तर लेख्नुहोस्...",
      submitBtn: "प्रविष्टि पेश गर्नुहोस्",
      submittingBtn: "पेश हुँदैछ...",
      dismissNotice: "सन्देश बन्द गर्नुहोस्",
      successMessage:
        "कर प्रश्नोत्तर पेश भयो। CA Ora मा सूचीकृत हुनुअघि विशेषज्ञ समीक्षामा पठाइएको छ।",
      errorMessage: "प्रविष्टि सुरक्षित गर्न सकिएन। कृपया पुनः प्रयास गर्नुहोस्।",
      networkErrorMessage: "सम्पर्क विच्छेद भयो। कृपया इन्टरनेट जाँच गर्नुहोस्।",
    },
    categories: {
      Acts: "ऐन",
      Rules: "नियमावली",
      "Finance Acts": "आर्थिक ऐन",
      Directives: "निर्देशिका",
      Precedents: "नजिर",
      Advisory: "परामर्श",
      "Income Tax": "आयकर",
      "Value Added Tax": "मूल्य अभिवृद्धि कर (VAT)",
      "Excise Duty": "अन्तःशुल्क",
      "Duties and Fees": "शुल्क तथा दस्तुर",
      "Customs Duty": "भन्सार महसुल",
      "Tax Amnesties and Waivers": "कर माफी तथा बक्यौता मिनाहा",
    },
    docTypes: {
      Directive: "निर्देशिका",
      Circular: "परिपत्र",
      Rajpatra: "नेपाल राजपत्र",
      Act: "ऐन",
      Rule: "नियमावली",
      "Advisory Note": "परामर्श टिप्पणी",
    },
    preview: {
      fyPrefix: "आ.व.",
      defaultSubject: "विषय: कर अनुपालन तथा कानुनी मार्गदर्शन",
      questionPlaceholder:
        "बायाँपट्टि सेवाग्राहीको अवस्था वा कर प्रश्न लेख्नुहोस् — कागजातको स्वरूप यहाँ प्रत्यक्ष देखिनेछ।",
      bodyPlaceholder:
        "तपाईंको कानुनी विश्लेषण, लागू कर दर, छुट तथा नेपाल राजपत्र वा आन्तरिक राजस्व विभागका सन्दर्भहरू यहाँ सफा कागजात स्वरूपमा देखिनेछन्।",
      authorityLabel: "निकाय",
      keywordsLabel: "खोज शब्द",
    },
    uploadDrawer: {
      floatingTrigger: "फाइल थप्नुहोस्",
      title: "निर्देशिका र राजपत्र अपलोड",
      subtitle: "आधिकारिक परिपत्र, निर्देशिका वा नेपाल राजपत्रका PDF फाइल जोड्नुहोस्।",
      closeAria: "फाइल अपलोड प्यानल बन्द गर्नुहोस्",
      sectionMeta: "१. कागजात विवरण",
      docType: "कागजातको प्रकार",
      issuingAuthority: "जारी गर्ने निकाय",
      fiscalYear: "आर्थिक वर्ष",
      sectionFiles: "२. फाइल छनोट",
      dropTitlePrefix: "PDF वा DOC फाइल यहाँ राख्नुहोस् वा",
      dropBrowse: "छान्नुहोस्",
      dropHint: "प्रति फाइल अधिकतम 25 MB • Taxora भण्डारमा सुरक्षित हुनेछ",
      stagedLabel: "तयार",
      removeFileAria: (name) => `${name} हटाउनुहोस्`,
      cancelUploadAria: "अपलोड रद्द गर्नुहोस्",
      readySummary: (count, authority) =>
        `${authority} का लागि ${count} फाइल तयार छ`,
      emptySummary: "अपलोड गर्न कम्तीमा एक कागजात छान्नुहोस्",
      uploadingBtn: "अपलोड हुँदैछ...",
      uploadCountBtn: (count) => `कागजात अपलोड (${count})`,
      uploadBtn: "कागजात अपलोड गर्नुहोस्",
      missingFileError: "कृपया अपलोड गर्न फाइल राख्नुहोस् वा छान्नुहोस्।",
      cancelledNotice: "अपलोड रद्द गरियो।",
      savedProgressText: "डाटाबेसमा सुरक्षित भयो • 100%",
      uploadedSuccess: (name) => `"${name}" सफलतापूर्वक Taxora मा सुरक्षित भयो।`,
      uploadedBatchSuccess: (count) =>
        `${count} कागजात अपलोड भए र सम्पादकीय समीक्षाको लागि राखिए।`,
      unsupportedFileError: (name) =>
        `"${name}" छोडियो। केवल PDF, DOC र DOCX फाइल मात्र स्वीकार गरिन्छ।`,
      fileTooLargeError: (name) =>
        `"${name}" छोडियो। फाइल 25 MB वा सोभन्दा सानो हुनुपर्छ।`,
      uploadErrorPrefix: "अपलोड त्रुटि",
      uploadFallbackError: "कागजात डाटाबेसमा सुरक्षित गर्न सकिएन।",
      networkError: "नेटवर्क समस्या देखियो। कृपया पुनः प्रयास गर्नुहोस्।",
    },
    modal: {
      title: "पेशेवर पहिचान पुष्टि",
      subtitleQa: "पेश गर्नुअघि यो कर प्रश्नोत्तरमा कसरी नाम उल्लेख गर्ने छान्नुहोस्।",
      subtitleDoc: "पेश गर्नुअघि यो कागजातमा कसरी नाम उल्लेख गर्ने छान्नुहोस्।",
      closeAria: "पहिचान प्यानल बन्द गर्नुहोस्",
      anonymousCheckbox: "सार्वजनिक नाम नखुलाई गोप्य रूपमा योगदान गर्नुहोस्",
      fullNameLabel: "पूरा नाम",
      fullNamePlaceholder: "CA राजेश श्रेष्ठ",
      icanLabel: "ICAN / COP नम्बर",
      icanPlaceholder: "जस्तै: 4821",
      firmLabel: "फर्म / संस्था",
      firmPlaceholder: "चार्टर्ड एकाउन्टेन्सी वा परामर्श फर्म",
      emailLabel: "पेशेवर इमेल",
      emailPlaceholder: "name@firm.com.np",
      cancelBtn: "रद्द गर्नुहोस्",
      confirmQaBtn: "पुष्टि गरी पेश गर्नुहोस्",
      confirmDocBtn: "पुष्टि गरी अपलोड गर्नुहोस्",
    },
    fiscalPicker: {
      triggerPrefix: "आ.व.",
      searchPlaceholder: "B.S. वा A.D. वर्ष खोज्नुहोस् (जस्तै: 2081)...",
      searchAria: "नेपालको आर्थिक वर्ष खोज्नुहोस्",
      clearSearchAria: "खोज हटाउनुहोस्",
      decadeRailAria: "दशक छान्नुहोस्",
      decadeSuffix: "B.S.",
      yearsCountSuffix: "वर्ष",
      currentTag: "हालको",
      itaTag: "आयकर ऐन २०५८",
      vatTag: "VAT ऐन २०५२",
      emptyMatch: (query) => `"${query}" सँग मिल्ने आर्थिक वर्ष भेटिएन`,
      footerCount: (shown, total) => `जम्मा ${total} मध्ये ${shown} आर्थिक वर्ष`,
      jumpCurrentBtn: (fy) => `आ.व. ${fy} छान्नुहोस्`,
    },
    walkthrough: {
      badge: "CA Ora · फाइलिङ मार्गदर्शन",
      role: "योगदानकर्ता अन्तरक्रियात्मक मार्गदर्शक",
      progressText: "चरण {{current}} / {{total}}",
      prevBtn: "पछाडि",
      nextBtn: "अर्को",
      doneBtn: "सुरु गर्नुहोस्",
      closeAria: "CA Ora मार्गदर्शन बन्द गर्नुहोस्",
      viewSamplesBtn: "नमूना हेर्नुहोस्",
      steps: [
        {
          id: "overview",
          targetId: "walkthrough-ora-guide",
          title: "CA Ora सँग फाइलिङ परिचय",
          description:
            "तपाईं Taxora मा दुई तरिकाले योगदान गर्न सक्नुहुन्छ: बायाँतर्फ संरचित नेपाल कर प्रश्नोत्तर लेख्नुहोस्, वा दायाँ छेउको प्यानलबाट आधिकारिक निर्देशिका र नेपाल राजपत्र PDF अपलोड गर्नुहोस्।",
          bestPracticeTitle: "सुरु गर्नुअघि",
          bestPractice:
            "कुनै पनि बेला माथि रहेको 'नमूना र सिकाइ' बटनबाट प्रमाणित उदाहरण र आधिकारिक सरकारी पोर्टलहरू हेर्न सक्नुहुन्छ।",
          side: "bottom",
          align: "start",
        },
        {
          id: "classification",
          targetId: "walkthrough-classification",
          title: "१. कानुनी वर्ग, आर्थिक वर्ष र भाषा छान्नुहोस्",
          description:
            "लेख्न सुरु गर्नुअघि सम्बन्धित कानुनी वर्ग, सटीक आर्थिक वर्ष (B.S.) र पेश गर्ने भाषा छान्नुहोस्। प्रत्येक आर्थिक ऐनसँगै कर सीमा र दर फेरिने भएकाले वर्ष मिल्नु अनिवार्य हुन्छ।",
          bestPracticeTitle: "उत्कृष्ट योगदान सुझाव",
          bestPractice:
            "सधैँ पुरानै वर्ष नछोडी व्याख्या गरिरहेको संशोधनसँग मिल्ने आर्थिक वर्ष (जस्तै: आ.व. 2081/82 वा 2083/84) छान्नुहोस्।",
          side: "right",
          align: "start",
        },
        {
          id: "citation",
          targetId: "walkthrough-citation",
          title: "२. विषय, सटीक दफा र खोज शब्द राख्नुहोस्",
          description:
            "खोज्न सहज हुने विषय शीर्षक, कानुनको दफा वा प्रतिबन्धात्मक वाक्यांश, जारी गर्ने निकाय र प्रमुख खोज शब्दहरू भर्नुहोस्।",
          bestPracticeTitle: "उत्कृष्ट योगदान सुझाव",
          bestPractice:
            "उद्धरण स्पष्ट राख्नुहोस् (जस्तै: 'Section 88(1) Proviso, Income Tax Act, 2058') र दर, दफा तथा विषय समेट्ने ४–६ खोज शब्द लेख्नुहोस्।",
          side: "right",
          align: "start",
        },
        {
          id: "analysis",
          targetId: "walkthrough-analysis",
          title: "३. व्यावहारिक अवस्था र चरणबद्ध कानुनी तर्क लेख्नुहोस्",
          description:
            "स्पष्ट कारोबार तथ्यसहित सेवाग्राहीको अवस्था उल्लेख गर्नुहोस् र कर दर, छुट तथा दाखिला म्याद समेट्ने आधिकारिक विश्लेषण लेख्नुहोस्।",
          bestPracticeTitle: "उत्कृष्ट योगदान सुझाव",
          bestPractice:
            "ग्राहकको नाम र PAN गोप्य राखी वास्तविक देखिने NPR/USD रकम प्रयोग गर्नुहोस्। उत्तरलाई नियम -> कर दर/सीमा -> अपवाद -> दाखिला प्रक्रियाका रूपमा लेख्नुहोस्।",
          side: "right",
          align: "start",
        },
        {
          id: "preview",
          targetId: "walkthrough-preview",
          title: "४. प्रत्यक्ष कागजात पूर्वावलोकन जाँच गरी पेश गर्नुहोस्",
          description:
            "तपाईंले टाइप गर्दा दायाँतर्फ सफा कागजात स्वरूपमा पूर्वावलोकन देखिन्छ। भाषा, दफा र संरचना जाँच गरेपछि 'प्रविष्टि पेश गर्नुहोस्' थिच्नुहोस्।",
          bestPracticeTitle: "पहिचान छनोट",
          bestPractice:
            "पेश गर्ने बेला तपाईं आफ्नो CA/पेशेवर विवरणसहित प्रकाशित गर्ने वा गोप्य रूपमा योगदान गर्ने छान्न सक्नुहुन्छ।",
          side: "left",
          align: "start",
        },
        {
          id: "upload",
          targetId: "walkthrough-upload-trigger",
          title: "५. निर्देशिका, परिपत्र र राजपत्र PDF अपलोड गर्नुहोस्",
          description:
            "यदि प्रश्नोत्तरको सट्टा मूल कानुनी कागजात थप्नु छ भने दायाँ छेउको 'फाइल थप्नुहोस्' बटनमा क्लिक गरी PDF वा DOC फाइल अपलोड गर्नुहोस्।",
          bestPracticeTitle: "उत्कृष्ट योगदान सुझाव",
          bestPractice:
            "स्पष्ट पढिने आधिकारिक फाइल अपलोड गर्नुहोस् र अपलोडअघि कागजातको प्रकार तथा आर्थिक वर्ष सही रहेको सुनिश्चित गर्नुहोस्।",
          side: "left",
          align: "center",
        },
      ],
    },
    referenceView: {
      backBtn: "योगदानकर्ता फाइलिङमा फर्कनुहोस्",
      sampleFilingsTitle: "नमूना दाखिलाहरू",
      sampleNavAria: "कर प्रश्नोत्तर नमूनाहरू",
      officialSourcesTitle: "आधिकारिक नेपाली स्रोतहरू",
      readerIntro:
        "CA Ora योगदानका लागि अपेक्षित कानुनी दफा उद्धरण, व्यावहारिक सेवाग्राही सन्दर्भ र संरचित तर्क देखाउने प्रमाणित नमूनाहरू।",
      fyPrefix: "आ.व.",
      authorityPrefix: "जारी गर्ने निकाय",
      keywordsPrefix: "खोज शब्द",
      sources: [
        {
          name: "आर्थिक विधेयक, २०८३ (आ.व. २०८३/८४ स्रोत)",
          domain: "finance-bill-2083-84-original.pdf",
          url: "/api/sources/finance-bill-2083-pdf",
        },
        {
          name: "आन्तरिक राजस्व विभाग",
          domain: "ird.gov.np",
          url: "https://www.ird.gov.np",
        },
        {
          name: "नेपाल कानुन आयोग",
          domain: "lawcommission.gov.np",
          url: "https://www.lawcommission.gov.np",
        },
        {
          name: "नेपाल राजपत्र",
          domain: "rajpatra.dop.gov.np",
          url: "https://rajpatra.dop.gov.np",
        },
        {
          name: "अर्थ मन्त्रालय",
          domain: "mof.gov.np",
          url: "https://www.mof.gov.np",
        },
        {
          name: "नेपाल चार्टर्ड एकाउन्टेन्ट्स संस्था (ICAN)",
          domain: "ican.org.np",
          url: "https://www.ican.org.np",
        },
      ],
      samples: [
        {
          id: "tds-service-fee",
          label: "सेवा शुल्कमा TDS",
          category: "Acts",
          fiscalYear: "2081/82",
          language: "np",
          topic: "सेवा शुल्कमा TDS (VAT दर्ता र गैर-VAT प्रदायक)",
          provision: "दफा ८८(१) प्रतिबन्धात्मक वाक्यांश, आयकर ऐन, २०५८",
          authority: "आन्तरिक राजस्व विभाग",
          keywords: "tds, service fee, section 88, vat invoice, withholding",
          question:
            "काठमाडौंस्थित एक निवासी प्राइभेट लिमिटेड कम्पनीले स्वतन्त्र IT परामर्श फर्मसँग प्रणाली लेखापरीक्षण (System Audit) गराई रु. ५,००,००० र १३% VAT सहित जम्मा रु. ५,६५,००० को बीजक प्राप्त गर्‍यो। भुक्तानी गर्दा कति प्रतिशत TDS कट्टा गर्नुपर्छ, र यदि सेवा प्रदायक VAT मा दर्ता नभएको भए दर कसरी फरक पर्थ्यो?",
          answer:
            "आयकर ऐन, २०५८ को दफा ८८(१) अनुसार नेपालमा स्रोत भएको सेवा शुल्क भुक्तानी गर्ने निवासी व्यक्तिले भुक्तानी वा खर्च लेखांकन (Credit) जुन पहिले हुन्छ, सोही समयमा अग्रिम कर (TDS) कट्टा गर्नुपर्छ।\n\n१. VAT दर्ता भएको सेवा प्रदायक: दफा ८८(१) को प्रतिबन्धात्मक वाक्यांशबमोजिम VAT मा दर्ता भई वैध कर बीजक जारी गर्ने निवासी सेवा प्रदायकलाई सेवा शुल्क भुक्तानी गर्दा VAT बाहेकको करयोग्य रकममा १.५% TDS (अर्थात् रु. ५,००,००० को १.५% = रु. ७,५००) मात्र लाग्छ।\n\n२. VAT दर्ता नभएको सेवा प्रदायक: सेवा प्रदायक VAT मा दर्ता नभएको खण्डमा कुल सेवा शुल्कमा सामान्य १५% दरले TDS कट्टा गर्नुपर्छ।\n\n३. दाखिला र विवरण: कट्टा गरिएको TDS रकम नेपाली महिना समाप्त भएको २५ दिनभित्र राजस्व खातामा दाखिला गरी IRD को अनलाइन प्रणालीमार्फत मासिक e-TDS विवरण पेश गर्नुपर्छ।",
        },
        {
          id: "dst-reverse-charge",
          label: "DST र Reverse Charge VAT",
          category: "Finance Acts",
          fiscalYear: "2081/82",
          language: "np",
          topic: "विदेशी SaaS सेवामा DST तथा Reverse Charge VAT",
          provision: "आर्थिक ऐन, २०८१ (DST); दफा ८(२), मू.अ.कर ऐन, २०५२",
          authority: "आन्तरिक राजस्व विभाग",
          keywords:
            "dst, digital service tax, reverse charge, vat, saas, section 8(2)",
          question:
            "नेपालको एक फिनटेक कम्पनीले नेपालमा दर्ता नभएको अमेरिकी क्लाउड होस्टिङ प्रदायकलाई मासिक USD १,२०० भुक्तानी गर्छ। के उक्त कम्पनीले २% Digital Service Tax (DST) कट्टा गर्नुपर्छ, वा Reverse Charge VAT र दफा ८८ को TDS लागु हुन्छ?",
          answer:
            "१. B2B कारोबारमा DST लागु हुँदैन: आर्थिक ऐन, २०८१ र डिजिटल सेवा कर कार्यविधि, २०८१ अनुसार गैर-बासिन्दा डिजिटल प्रदायकको नेपालमा वार्षिक कारोबार रु. ३० लाख नाघ्दा लाग्ने २% DST केवल B2C (अन्तिम उपभोक्ता) कारोबारमा मात्र लागु हुन्छ। व्यावसायिक संस्था (B2B) को खरिदमा DST लाग्दैन।\n\n२. Reverse Charge VAT (दफा ८(२), मूल्य अभिवृद्धि कर ऐन, २०५२): व्यवसायको प्रयोगका लागि नेपालबाहिरबाट सेवा आयात गरिएकाले नेपाली कम्पनीले स्वयं १३% VAT गणना गरी Reverse Charge अन्तर्गत दाखिला गर्नुपर्छ र करयोग्य आपूर्ति गर्ने भए सो कर कट्टी (Input Credit) दाबी गर्न पाउँछ।\n\n३. अग्रिम कर (TDS): गैर-बासिन्दालाई गरिने सेवा भुक्तानीमा दफा ८८ अनुसार १५% TDS लाग्ने वा दोहोरो कर मुक्ति सम्झौता (DTAA) ले सहुलियत दिने विषयसमेत यकिन गर्नुपर्छ।",
        },
        {
          id: "it-export-1-percent",
          label: "विदेशी मुद्रामा IT निर्यात",
          category: "Finance Acts",
          fiscalYear: "2081/82",
          language: "np",
          topic: "विदेशी मुद्रामा प्राप्त सफ्टवेयर/IT निर्यात आयमा १% कर",
          provision: "दफा ९५क / आर्थिक ऐन, २०८१",
          authority: "आन्तरिक राजस्व विभाग",
          keywords:
            "software export, foreign currency, 1% tax, freelance, it services",
          question:
            "नेपालको एक सफ्टवेयर कम्पनीले जर्मनीको ग्राहकलाई रिमोट सफ्टवेयर विकास सेवा उपलब्ध गराई नेपालको वाणिज्य बैंकमार्फत USD १०,००० प्राप्त गर्छ। उक्त रेमिट्यान्समा बैंकले कसरी कर असुल गर्छ?",
          answer:
            "आर्थिक ऐन, २०८१ द्वारा संशोधित आयकर ऐन, २०५८ अनुसार नेपालबाहिर सफ्टवेयर वा त्यस्तै विद्युतीय/IT सेवा उपलब्ध गराएबापत विदेशी मुद्रामा भुक्तानी प्राप्त गर्दा सम्बन्धित बैंक, वित्तीय संस्था वा मनी ट्रान्सफर एजेन्टले रकम खातामा जम्मा वा भुक्तानी गर्ने समयमै १% अग्रिम कर असुल गर्नुपर्छ।\n\nबैंकले कट्टा गरेको यो १% कर अग्रिम कर / विदहोल्डिङ करका रूपमा मानिने हुँदा प्रचलित आर्थिक ऐनले अन्तिम कर (Final Withholding) भनी स्पष्ट तोकेको अवस्थाबाहेक वार्षिक आयकर विवरणमा मिलान गर्नुपर्छ।",
        },
        {
          id: "cash-salary-limit",
          label: "नगद पारिश्रमिक सीमा",
          category: "Acts",
          fiscalYear: "2081/82",
          language: "np",
          topic: "रु. २५,००० भन्दा बढी नगद तलब खर्च अमान्य हुने व्यवस्था",
          provision: "दफा २१ / आर्थिक ऐन, २०८१",
          authority: "आन्तरिक राजस्व विभाग",
          keywords:
            "cash salary, disallowance, 25000, banking channel, section 21",
          question:
            "आ.व. २०८१/८२ को कर लेखापरीक्षणका क्रममा एक उत्पादनमूलक कम्पनीले तीन जना सुपरभाइजरलाई मासिक रु. ४०,००० दरले नगदमै तलब भुक्तानी गरेको पाइयो। के कम्पनीले उक्त तलब खर्च करयोग्य आय गणना गर्दा कट्टी दाबी गर्न पाउँछ?",
          answer:
            "आयकर ऐन, २०५८ (आर्थिक ऐन, २०८१ ले सुदृढ गरेबमोजिम) अनुसार रु. २५,००० भन्दा बढीको पारिश्रमिक वा तलब भुक्तानी अनिवार्य रूपमा बैंकिङ माध्यम (Account-payee चेक वा विद्युतीय बैंक ट्रान्सफर) बाट गर्नुपर्छ।\n\nउक्त मासिक रु. ४०,००० तलब रु. २५,००० को सीमाभन्दा बढी भई नगदमा भुक्तानी गरिएकाले पारिश्रमिक TDS कट्टा गरिएको भए तापनि दफा २१ अन्तर्गत व्यवसायको खर्च कट्टीका रूपमा अमान्य (Disallowed) हुन्छ।",
        },
      ],
    },
  },
};
