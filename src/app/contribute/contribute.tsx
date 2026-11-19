"use client";

import "@fontsource/spectral/400.css";
import "@fontsource/spectral/600.css";
import {
  ArrowLeft,
  BookOpen,
  Compass,
  FilePlus2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CONTRIBUTE_COPY,
  type ContributeLocale,
  type DocumentTypeKey,
  type QaCategoryKey,
} from "@/components/contribute/contribute-i18n";
import {
  ContributorWalkthrough,
  type WalkthroughStep,
} from "@/components/contribute/contributor-walkthrough";
import { FiscalYearPicker } from "@/components/contribute/fiscal-year-picker";
import { TaxReferenceView } from "@/components/contribute/tax-reference-view";
import { SphereAnimation } from "@/components/sphere-animation";
import { CustomSelect } from "@/components/ui/custom-select";
import styles from "./contribute.module.css";

const STORAGE_CA_PROFILE_KEY = "taxora_ca_contributor_profile_v1";
const STORAGE_WALKTHROUGH_SEEN_KEY = "taxora_contribute_walkthrough_seen_v1";
const STORAGE_LOCALE_KEY = "taxora_contribute_locale_v1";

type QaCategory = QaCategoryKey;
type DocumentType = DocumentTypeKey;

const QA_CATEGORIES: QaCategory[] = [
  "Acts",
  "Rules",
  "Finance Acts",
  "Directives",
  "Precedents",
  "Advisory",
  "Income Tax",
  "Value Added Tax",
  "Excise Duty",
  "Duties and Fees",
  "Customs Duty",
  "Tax Amnesties and Waivers",
];

const CUSTOM_CATEGORY_VALUE = "__custom__" as const;
type QaCategorySelection = QaCategory | typeof CUSTOM_CATEGORY_VALUE;

const DOC_TYPES: DocumentType[] = [
  "Directive",
  "Circular",
  "Rajpatra",
  "Act",
  "Rule",
  "Advisory Note",
];

function buildNepalFiscalYears(startBsYear = 2052): string[] {
  const now = new Date();
  // Nepal's fiscal year starts in Shrawan (mid-July): AD + 57 from July onward, AD + 56 earlier
  const currentBsStart =
    now.getMonth() >= 6 ? now.getFullYear() + 57 : now.getFullYear() + 56;
  const years: string[] = [];
  for (let y = currentBsStart; y >= startBsYear; y -= 1) {
    const nextShort = String((y + 1) % 100).padStart(2, "0");
    years.push(`${y}/${nextShort}`);
  }
  return years;
}

const FISCAL_YEARS = buildNepalFiscalYears(2052);

interface ContributorState {
  fullName: string;
  icanNumber: string;
  firmName: string;
  email: string;
  bio: string;
  linkedinUrl: string;
}

interface UploadFileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  file: File;
}

interface FeedbackState {
  message: string;
  isError?: boolean;
}

function MascotTipTicker({
  tips,
  priorityMessage,
  paused,
  lineClassName,
  cursorClassName,
}: {
  tips: string[];
  priorityMessage: string | null;
  paused: boolean;
  lineClassName: string;
  cursorClassName: string;
}) {
  const [tipIndex, setTipIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const tipsRef = useRef(tips);
  tipsRef.current = tips;

  const activeLine =
    priorityMessage ??
    tipsRef.current[tipIndex % tipsRef.current.length] ??
    tipsRef.current[0] ??
    "";

  useEffect(() => {
    if (paused) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayedText(activeLine);
      if (priorityMessage) return;
      const reducedTimer = window.setTimeout(() => {
        setTipIndex((prev) => prev + 1);
      }, 4500);
      return () => window.clearTimeout(reducedTimer);
    }

    let timeoutId: number | undefined;
    let charCount = 0;
    let deleting = false;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      if (!deleting) {
        if (charCount < activeLine.length) {
          charCount += 1;
          setDisplayedText(activeLine.slice(0, charCount));
          timeoutId = window.setTimeout(step, 26);
          return;
        }
        if (priorityMessage) return;
        deleting = true;
        timeoutId = window.setTimeout(step, 2400);
        return;
      }

      if (charCount > 0) {
        charCount -= 1;
        setDisplayedText(activeLine.slice(0, charCount));
        timeoutId = window.setTimeout(step, 13);
        return;
      }

      timeoutId = window.setTimeout(() => {
        if (!cancelled) {
          setTipIndex((prev) => prev + 1);
        }
      }, 220);
    };

    setDisplayedText("");
    timeoutId = window.setTimeout(step, 60);

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [activeLine, paused, priorityMessage]);

  return (
    <p className={lineClassName} aria-live="polite">
      <span>{displayedText}</span>
      <span className={cursorClassName} aria-hidden="true" />
    </p>
  );
}

export default function Contribute() {
  const [locale, setLocale] = useState<ContributeLocale>("en");
  const copy = CONTRIBUTE_COPY[locale];

  const [showSplash, setShowSplash] = useState(true);
  const [isAssembled, setIsAssembled] = useState(false);
  const [mobileTab, setMobileTab] = useState<"qa" | "upload">("qa");
  const [isUploadExpanded, setIsUploadExpanded] = useState(false);
  const [isAddFilesHovered, setIsAddFilesHovered] = useState(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const shouldAutoStartWalkthroughRef = useRef(false);
  const [pendingAction, setPendingAction] = useState<"qa" | "upload" | null>(
    null,
  );

  // Contributor Identity State
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [profile, setProfile] = useState<ContributorState>({
    fullName: "",
    icanNumber: "",
    firmName: "",
    email: "",
    bio: "",
    linkedinUrl: "",
  });

  // Q&A Form State
  const [qaQuestion, setQaQuestion] = useState("");
  const [qaTopic, setQaTopic] = useState("");
  const [qaCategory, setQaCategory] = useState<QaCategorySelection>("Acts");
  const [qaCustomCategory, setQaCustomCategory] = useState("");
  const [qaFiscalYear, setQaFiscalYear] = useState(
    FISCAL_YEARS[0] ?? "2083/84",
  );
  const [qaLanguage, setQaLanguage] = useState<"en" | "np">("en");
  const [qaProvision, setQaProvision] = useState("");
  const [qaAuthority, setQaAuthority] = useState("Inland Revenue Department");
  const [qaAnswer, setQaAnswer] = useState("");
  const [qaKeywords, setQaKeywords] = useState("");

  // Document Upload State
  const [docType, setDocType] = useState<DocumentType>("Directive");
  const [docAuthority, setDocAuthority] = useState("Inland Revenue Department");
  const [docFiscalYear, setDocFiscalYear] = useState(
    FISCAL_YEARS[0] ?? "2083/84",
  );
  const [stagedFiles, setStagedFiles] = useState<UploadFileItem[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    fileName: string;
    progressText: string;
    progress: number;
    xhr: XMLHttpRequest;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission State
  const [isSubmittingQa, setIsSubmittingQa] = useState(false);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const [qaFeedback, setQaFeedback] = useState<FeedbackState | null>(null);
  const [uploadFeedback, setUploadFeedback] = useState<FeedbackState | null>(
    null,
  );

  function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    if (mb >= 1) return `${mb.toFixed(1)} MB`;
    const kb = bytes / 1024;
    return `${kb.toFixed(0)} KB`;
  }

  function getFileType(fileName: string): string {
    const ext = fileName.split(".").pop()?.toUpperCase() || "PDF";
    if (ext === "PDF") return "PDF";
    if (ext === "DOC" || ext === "DOCX") return "DOC";
    return ext.slice(0, 4);
  }

  const handleSphereAssembled = useCallback(() => {
    setIsAssembled(true);
  }, []);

  const handleCloseWalkthrough = useCallback(() => {
    setIsWalkthroughOpen(false);
    try {
      localStorage.setItem(STORAGE_WALKTHROUGH_SEEN_KEY, "1");
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleWalkthroughStepFocus = useCallback((step: WalkthroughStep) => {
    setIsUploadExpanded(false);
    if (step.id === "preview") {
      setMobileTab("upload");
    } else if (
      step.id === "classification" ||
      step.id === "citation" ||
      step.id === "analysis"
    ) {
      setMobileTab("qa");
    }
  }, []);

  const handleLocaleChange = useCallback(
    (nextLocale: ContributeLocale) => {
      setLocale(nextLocale);
      try {
        localStorage.setItem(STORAGE_LOCALE_KEY, nextLocale);
      } catch {
        // Ignore storage errors
      }
      const nextDefaultAuth =
        CONTRIBUTE_COPY[nextLocale].qaForm.defaultAuthority;
      const prevDefaultAuth = CONTRIBUTE_COPY[locale].qaForm.defaultAuthority;
      if (qaAuthority === prevDefaultAuth) {
        setQaAuthority(nextDefaultAuth);
      }
      if (docAuthority === prevDefaultAuth) {
        setDocAuthority(nextDefaultAuth);
      }
      if (!qaQuestion.trim() && !qaAnswer.trim()) {
        setQaLanguage(nextLocale);
      }
    },
    [locale, qaAuthority, docAuthority, qaQuestion, qaAnswer],
  );

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem(STORAGE_LOCALE_KEY);
      if (savedLocale === "en" || savedLocale === "np") {
        setLocale(savedLocale);
        if (savedLocale === "np") {
          setQaLanguage("np");
          setQaAuthority(CONTRIBUTE_COPY.np.qaForm.defaultAuthority);
          setDocAuthority(CONTRIBUTE_COPY.np.qaForm.defaultAuthority);
        }
      }
      const savedProfile = localStorage.getItem(STORAGE_CA_PROFILE_KEY);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
      const walkthroughSeen = localStorage.getItem(
        STORAGE_WALKTHROUGH_SEEN_KEY,
      );
      if (!walkthroughSeen) {
        shouldAutoStartWalkthroughRef.current = true;
      }
    } catch {
      // Ignore parse/storage errors
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      const roleParam = params.get("role");
      if (tabParam === "document") {
        setMobileTab("upload");
        setIsUploadExpanded(true);
        shouldAutoStartWalkthroughRef.current = false;
      }
      if (roleParam === "anonymous") {
        setIsAnonymous(true);
      }
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsAssembled(true);
    }
  }, []);

  useEffect(() => {
    if (showSplash || !shouldAutoStartWalkthroughRef.current) return;
    shouldAutoStartWalkthroughRef.current = false;
    const timer = window.setTimeout(() => {
      setIsWalkthroughOpen(true);
    }, 320);
    return () => window.clearTimeout(timer);
  }, [showSplash]);

  useEffect(() => {
    if (!pendingAction && !isUploadExpanded) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (pendingAction) {
          setPendingAction(null);
        } else if (isUploadExpanded) {
          setIsUploadExpanded(false);
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pendingAction, isUploadExpanded]);

  function handleProfileChange(field: keyof ContributorState, value: string) {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_CA_PROFILE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  }

  const uploadCancelledRef = useRef(false);

  function stageValidatedFiles(files: File[]) {
    if (files.length === 0) return;

    const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
    const ALLOWED_EXTS = new Set(["pdf", "doc", "docx"]);
    const validItems: UploadFileItem[] = [];
    let firstError: string | null = null;

    for (const file of files) {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ALLOWED_EXTS.has(ext)) {
        firstError ??= copy.uploadDrawer.unsupportedFileError(file.name);
        continue;
      }
      if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) {
        firstError ??= copy.uploadDrawer.fileTooLargeError(file.name);
        continue;
      }
      validItems.push({
        id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        size: formatBytes(file.size),
        type: getFileType(file.name),
        file,
      });
    }

    if (validItems.length > 0) {
      setStagedFiles((prev) => [...validItems, ...prev]);
    }
    if (firstError) {
      setUploadFeedback({ message: firstError, isError: true });
    } else if (validItems.length > 0) {
      setUploadFeedback(null);
    }
  }

  function handleFileDrop(e: DragEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsDragging(false);
    stageValidatedFiles(Array.from(e.dataTransfer.files));
  }

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    stageValidatedFiles(Array.from(e.target.files || []));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleDeleteFile(id: string) {
    setStagedFiles((prev) => prev.filter((item) => item.id !== id));
  }

  function handleCancelInProgress() {
    uploadCancelledRef.current = true;
    if (uploadProgress?.xhr) {
      uploadProgress.xhr.abort();
    }
    setUploadProgress(null);
    setIsUploadingDoc(false);
    setUploadFeedback({ message: copy.uploadDrawer.cancelledNotice });
  }

  function uploadSingleFile(target: UploadFileItem): Promise<void> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", target.file);
      formData.append(
        "title",
        target.name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " "),
      );
      formData.append("documentType", docType);
      formData.append("issuingAuthority", docAuthority);
      formData.append("fiscalYear", docFiscalYear);
      formData.append(
        "summary",
        `Official ${docType.toLowerCase()} uploaded via CA Knowledge Hub: ${target.name}`,
      );
      formData.append("isAnonymous", isAnonymous ? "true" : "false");

      if (!isAnonymous && (profile.fullName || profile.email)) {
        formData.append(
          "contributor",
          JSON.stringify({
            fullName: profile.fullName || "Nepal CA Practitioner",
            icanNumber: profile.icanNumber || undefined,
            firmName: profile.firmName || undefined,
            email: profile.email || undefined,
            isVerifiedCa: Boolean(profile.icanNumber),
          }),
        );
      }

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.min(
            99,
            Math.round((event.loaded / event.total) * 100),
          );
          setUploadProgress({
            fileName: target.name,
            progressText: `${formatBytes(event.loaded)} of ${formatBytes(event.total)} (${percent}%)`,
            progress: percent,
            xhr,
          });
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress((prev) =>
            prev
              ? {
                  ...prev,
                  progress: 100,
                  progressText: copy.uploadDrawer.savedProgressText,
                }
              : null,
          );
          setStagedFiles((prev) =>
            prev.filter((item) => item.id !== target.id),
          );
          resolve();
        } else {
          try {
            const errRes = JSON.parse(xhr.responseText);
            reject(
              new Error(
                `${copy.uploadDrawer.uploadErrorPrefix}: ${errRes.message || copy.uploadDrawer.uploadFallbackError}`,
              ),
            );
          } catch {
            reject(new Error(copy.uploadDrawer.uploadFallbackError));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error(copy.uploadDrawer.networkError));
      };

      xhr.onabort = () => {
        reject(new Error("ABORTED"));
      };

      xhr.open("POST", "/api/resources/upload");
      xhr.send(formData);
    });
  }

  async function executeUpload() {
    if (stagedFiles.length === 0) {
      setUploadFeedback({
        message: copy.uploadDrawer.missingFileError,
        isError: true,
      });
      return;
    }

    const queue = [...stagedFiles];
    uploadCancelledRef.current = false;
    setPendingAction(null);
    setIsUploadingDoc(true);
    setUploadFeedback(null);

    let uploadedCount = 0;
    let lastUploadedName = "";

    try {
      for (const target of queue) {
        if (uploadCancelledRef.current) break;
        await uploadSingleFile(target);
        uploadedCount += 1;
        lastUploadedName = target.name;
      }

      if (!uploadCancelledRef.current && uploadedCount > 0) {
        setTimeout(() => {
          setUploadProgress(null);
          setIsUploadingDoc(false);
          setUploadFeedback({
            message:
              uploadedCount > 1
                ? copy.uploadDrawer.uploadedBatchSuccess(uploadedCount)
                : copy.uploadDrawer.uploadedSuccess(lastUploadedName),
          });
        }, 300);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : copy.uploadDrawer.uploadFallbackError;
      if (msg !== "ABORTED") {
        setIsUploadingDoc(false);
        setUploadProgress(null);
        setUploadFeedback({ message: msg, isError: true });
      }
    }
  }

  const resolvedQaCategory =
    qaCategory === CUSTOM_CATEGORY_VALUE ? qaCustomCategory.trim() : qaCategory;

  function handleQaSubmit(e: FormEvent) {
    e.preventDefault();
    if (!qaQuestion.trim() || !qaAnswer.trim() || !qaTopic.trim()) return;
    if (qaCategory === CUSTOM_CATEGORY_VALUE && !qaCustomCategory.trim()) {
      setQaFeedback({
        message: copy.qaForm.customCategoryRequiredError,
        isError: true,
      });
      return;
    }
    setPendingAction("qa");
  }

  function handleUploadRequest() {
    if (stagedFiles.length === 0) {
      setUploadFeedback({
        message: copy.uploadDrawer.missingFileError,
        isError: true,
      });
      return;
    }
    setPendingAction("upload");
  }

  async function executeQaSubmit() {
    if (!qaQuestion.trim() || !qaAnswer.trim() || !qaTopic.trim()) return;
    if (!resolvedQaCategory) return;

    setPendingAction(null);
    setIsSubmittingQa(true);
    setQaFeedback(null);

    const citations = qaProvision.trim()
      ? [
          {
            title:
              resolvedQaCategory === "Acts" ||
              resolvedQaCategory === "Income Tax"
                ? "Income Tax Act, 2058"
                : resolvedQaCategory === "Value Added Tax"
                  ? "Value Added Tax Act, 2052"
                  : resolvedQaCategory === "Excise Duty"
                    ? "Excise Duty Act, 2058"
                    : resolvedQaCategory === "Duties and Fees"
                      ? "Finance Bill, 2083"
                      : resolvedQaCategory === "Customs Duty"
                        ? "Customs Duty Act, 2081 / Customs Act, 2082"
                        : resolvedQaCategory === "Tax Amnesties and Waivers"
                          ? "Finance Bill, 2083"
                          : `${resolvedQaCategory} Statutory Reference`,
            citation: qaProvision.trim(),
            authority: qaAuthority || copy.qaForm.defaultAuthority,
            libraryId:
              qaFiscalYear === "2083/84" ? "finance-bill-2083-pdf" : undefined,
            url:
              qaFiscalYear === "2083/84"
                ? "/api/sources/finance-bill-2083-pdf"
                : "https://ird.gov.np",
          },
        ]
      : [];

    const keywords = qaKeywords
      ? qaKeywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : [qaTopic.toLowerCase()];

    try {
      const res = await fetch("/api/qa/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: qaQuestion.trim(),
          answer: qaAnswer.trim(),
          shortTopic: qaTopic.trim(),
          category: resolvedQaCategory,
          citations,
          fiscalYear: qaFiscalYear,
          language: qaLanguage,
          keywords,
          contributor: isAnonymous
            ? {
                fullName: "Anonymous CA Practitioner",
                isAnonymous: true,
              }
            : {
                fullName: profile.fullName || "Nepal CA Practitioner",
                icanNumber: profile.icanNumber || undefined,
                firmName: profile.firmName || undefined,
                email: profile.email || undefined,
                bio: profile.bio || undefined,
                linkedinUrl: profile.linkedinUrl || undefined,
                isAnonymous: false,
              },
        }),
      });

      if (res.ok) {
        setQaFeedback({
          message: copy.qaForm.successMessage,
        });
        setQaQuestion("");
        setQaAnswer("");
        setQaProvision("");
        setQaKeywords("");
      } else {
        setQaFeedback({
          message: copy.qaForm.errorMessage,
          isError: true,
        });
      }
    } catch {
      setQaFeedback({
        message: copy.qaForm.networkErrorMessage,
        isError: true,
      });
    } finally {
      setIsSubmittingQa(false);
    }
  }

  const mascotPriorityMessage =
    isSubmittingQa || isUploadingDoc
      ? copy.mascotStates.submitting
      : qaFeedback && !qaFeedback.isError
        ? copy.mascotStates.filed
        : null;

  const mascotTipsPool = [...copy.mascotTips];
  if (qaAnswer.trim().length > 25) {
    mascotTipsPool.splice(1, 0, copy.mascotStates.goodAnswer);
  } else if (qaQuestion.trim().length > 10) {
    mascotTipsPool.splice(1, 0, copy.mascotStates.goodQuestion);
  } else if (qaTopic.trim().length > 0 || qaProvision.trim().length > 0) {
    mascotTipsPool.splice(1, 0, copy.mascotStates.goodTopic);
  }

  if (isReferenceOpen) {
    return (
      <TaxReferenceView
        locale={locale}
        onLocaleChange={handleLocaleChange}
        onBack={() => setIsReferenceOpen(false)}
      />
    );
  }

  return (
    <div className={styles.page}>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className={styles.splashOverlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className={styles.splashLocaleBar}>
              <fieldset
                className={styles.localeToggle}
                aria-label={copy.header.localeToggleLabel}
              >
                <button
                  type="button"
                  className={`${styles.localeBtn} ${locale === "en" ? styles.localeBtnActive : ""}`}
                  onClick={() => handleLocaleChange("en")}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`${styles.localeBtn} ${locale === "np" ? styles.localeBtnActive : ""}`}
                  onClick={() => handleLocaleChange("np")}
                >
                  नेपाली
                </button>
              </fieldset>
            </div>

            <div className={styles.splashInner}>
              <div className={styles.splashSphereGlow}>
                <SphereAnimation
                  size={310}
                  assembleFromExploded
                  showParticles
                  onAssembled={handleSphereAssembled}
                />
              </div>
              <div className={styles.splashWelcomeBlock}>
                <AnimatePresence>
                  {isAssembled && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <h2 className={styles.splashWelcomeTitle}>
                        {copy.splash.welcomeTitle}
                      </h2>
                      <span className={styles.splashCaption}>
                        {copy.splash.caption}
                      </span>
                      <button
                        type="button"
                        className={styles.splashSkipBtn}
                        onClick={() => setShowSplash(false)}
                      >
                        {copy.splash.startBtn}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={14} />
            <span>{copy.header.backToOra}</span>
          </Link>

          <fieldset
            className={styles.localeToggle}
            aria-label={copy.header.localeToggleLabel}
          >
            <button
              type="button"
              className={`${styles.localeBtn} ${locale === "en" ? styles.localeBtnActive : ""}`}
              onClick={() => handleLocaleChange("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`${styles.localeBtn} ${locale === "np" ? styles.localeBtnActive : ""}`}
              onClick={() => handleLocaleChange("np")}
            >
              नेपाली
            </button>
          </fieldset>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.titleBlock}>
          <div id="walkthrough-ora-guide" className={styles.titleLeftGroup}>
            <motion.div
              className={styles.mascotFigure}
              animate={{
                y: [0, -4, 0],
                rotate: [-1.8, 1.8, -1.8],
                scale: [1, 1.025, 1],
              }}
              transition={{
                y: {
                  duration: 2.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 4.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 3.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <Image
                src="/images/ca-ora-mascot.jpg"
                alt={copy.titleBlock.mascotAlt}
                width={78}
                height={78}
                priority
                className={styles.mascotImg}
              />
            </motion.div>

            <div>
              <h1 className={styles.pageTitle}>{copy.titleBlock.title}</h1>
              <p className={styles.pageSubtitle}>{copy.titleBlock.subtitle}</p>
              <div className={styles.mascotStatusRow}>
                <span className={styles.mascotName}>
                  {copy.titleBlock.mascotName}
                </span>
                <MascotTipTicker
                  tips={mascotTipsPool}
                  priorityMessage={mascotPriorityMessage}
                  paused={showSplash}
                  lineClassName={styles.mascotLine}
                  cursorClassName={styles.mascotCursor}
                />
              </div>
            </div>
          </div>

          <div className={styles.titleActions}>
            <button
              type="button"
              className={styles.walkthroughBtn}
              onClick={() => setIsWalkthroughOpen(true)}
            >
              <Compass size={15} />
              <span>{copy.titleBlock.walkthroughBtn}</span>
            </button>

            <button
              type="button"
              className={styles.learnBtn}
              onClick={() => setIsReferenceOpen(true)}
            >
              <BookOpen size={15} />
              <span>{copy.titleBlock.samplesBtn}</span>
            </button>
          </div>
        </div>

        {/* Mobile-only Tab Switcher */}
        <div className={styles.mobileTabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === "qa"}
            className={`${styles.mobileTab} ${mobileTab === "qa" ? styles.mobileTabActive : ""}`}
            onClick={() => setMobileTab("qa")}
          >
            <span>{copy.mobileTabs.qa}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === "upload"}
            className={`${styles.mobileTab} ${mobileTab === "upload" ? styles.mobileTabActive : ""}`}
            onClick={() => setMobileTab("upload")}
          >
            <span>{copy.mobileTabs.preview}</span>
          </button>
        </div>

        {/* Desktop 2-Column Split / Mobile Active Tab */}
        <div className={styles.splitLayout}>
          <section
            className={`${styles.formColumn} ${mobileTab !== "qa" ? styles.mobileHidden : ""}`}
          >
            <div className={styles.paneHeader}>
              <h2 className={styles.paneTitle}>{copy.qaForm.heading}</h2>
              <p className={styles.paneSubtitle}>{copy.qaForm.subtitle}</p>
            </div>

            {qaFeedback && (
              <div
                className={`${styles.notice} ${qaFeedback.isError ? styles.noticeError : ""}`}
              >
                <span>{qaFeedback.message}</span>
                <button
                  type="button"
                  className={styles.noticeClose}
                  onClick={() => setQaFeedback(null)}
                  aria-label={copy.qaForm.dismissNotice}
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <form onSubmit={handleQaSubmit} className={styles.form}>
              <div id="walkthrough-classification" className={styles.section}>
                <h2 className={styles.sectionHeading}>
                  {copy.qaForm.section1}
                </h2>
                <div className={styles.grid3}>
                  <div className={styles.field}>
                    <label htmlFor="qa-category" className={styles.label}>
                      {copy.qaForm.legalCategory}
                    </label>
                    <CustomSelect<QaCategorySelection>
                      id="qa-category"
                      value={qaCategory}
                      options={[
                        ...QA_CATEGORIES.map((cat) => ({
                          value: cat,
                          label: copy.categories[cat],
                        })),
                        {
                          value: CUSTOM_CATEGORY_VALUE,
                          label: copy.qaForm.customCategoryOption,
                        },
                      ]}
                      onChange={setQaCategory}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="qa-fy" className={styles.label}>
                      {copy.qaForm.fiscalYear}
                    </label>
                    <FiscalYearPicker
                      id="qa-fy"
                      value={qaFiscalYear}
                      years={FISCAL_YEARS}
                      locale={locale}
                      onChange={setQaFiscalYear}
                      align="left"
                      ariaLabel={copy.qaForm.fiscalYear}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="qa-lang" className={styles.label}>
                      {copy.qaForm.submissionLanguage}
                    </label>
                    <CustomSelect
                      id="qa-lang"
                      value={qaLanguage}
                      options={[
                        { value: "en", label: "English" },
                        { value: "np", label: "नेपाली (Nepali)" },
                      ]}
                      onChange={setQaLanguage}
                    />
                  </div>
                </div>

                {qaCategory === CUSTOM_CATEGORY_VALUE && (
                  <div className={styles.field}>
                    <label
                      htmlFor="qa-custom-category"
                      className={styles.label}
                    >
                      {copy.qaForm.customCategoryLabel}
                    </label>
                    <input
                      id="qa-custom-category"
                      type="text"
                      className={styles.input}
                      placeholder={copy.qaForm.customCategoryPlaceholder}
                      value={qaCustomCategory}
                      onChange={(e) => setQaCustomCategory(e.target.value)}
                      maxLength={80}
                      required
                    />
                  </div>
                )}
              </div>

              <div id="walkthrough-citation" className={styles.section}>
                <h2 className={styles.sectionHeading}>
                  {copy.qaForm.section2}
                </h2>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <label htmlFor="qa-topic" className={styles.label}>
                      {copy.qaForm.topicLabel}
                    </label>
                    <input
                      id="qa-topic"
                      type="text"
                      className={styles.input}
                      placeholder={copy.qaForm.topicPlaceholder}
                      value={qaTopic}
                      onChange={(e) => setQaTopic(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="qa-provision" className={styles.label}>
                      {copy.qaForm.provisionLabel}
                      <span className={styles.optional}>
                        {copy.qaForm.optionalBadge}
                      </span>
                    </label>
                    <input
                      id="qa-provision"
                      type="text"
                      className={styles.input}
                      placeholder={copy.qaForm.provisionPlaceholder}
                      value={qaProvision}
                      onChange={(e) => setQaProvision(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <label htmlFor="qa-authority" className={styles.label}>
                      {copy.qaForm.authorityLabel}
                    </label>
                    <input
                      id="qa-authority"
                      type="text"
                      className={styles.input}
                      value={qaAuthority}
                      onChange={(e) => setQaAuthority(e.target.value)}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="qa-keywords" className={styles.label}>
                      {copy.qaForm.keywordsLabel}
                      <span className={styles.optional}>
                        {copy.qaForm.commaSeparatedBadge}
                      </span>
                    </label>
                    <input
                      id="qa-keywords"
                      type="text"
                      className={styles.input}
                      placeholder={copy.qaForm.keywordsPlaceholder}
                      value={qaKeywords}
                      onChange={(e) => setQaKeywords(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div id="walkthrough-analysis" className={styles.section}>
                <h2 className={styles.sectionHeading}>
                  {copy.qaForm.section3}
                </h2>
                <div className={styles.field}>
                  <label htmlFor="qa-question" className={styles.label}>
                    {copy.qaForm.questionLabel}
                  </label>
                  <input
                    id="qa-question"
                    type="text"
                    className={styles.input}
                    placeholder={copy.qaForm.questionPlaceholder}
                    value={qaQuestion}
                    onChange={(e) => setQaQuestion(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="qa-answer" className={styles.label}>
                    {copy.qaForm.answerLabel}
                  </label>
                  <textarea
                    id="qa-answer"
                    className={styles.textarea}
                    rows={7}
                    placeholder={copy.qaForm.answerPlaceholder}
                    value={qaAnswer}
                    onChange={(e) => setQaAnswer(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.actionsBar}>
                <button
                  type="submit"
                  disabled={isSubmittingQa}
                  className={styles.submitBtn}
                >
                  {isSubmittingQa
                    ? copy.qaForm.submittingBtn
                    : copy.qaForm.submitBtn}
                </button>
              </div>
            </form>
          </section>

          <section
            id="walkthrough-preview"
            className={`${styles.previewColumn} ${mobileTab !== "upload" ? styles.mobileHidden : ""}`}
          >
            {/* Pure Editorial Document Preview */}
            <article className={styles.documentPreview}>
              <header className={styles.docHeaderRow}>
                <span>
                  {qaCategory === CUSTOM_CATEGORY_VALUE
                    ? qaCustomCategory.trim() || copy.qaForm.customCategoryLabel
                    : copy.categories[qaCategory]}{" "}
                  &middot; {copy.preview.fyPrefix} {qaFiscalYear} &middot;{" "}
                  {qaLanguage === "np" ? "नेपाली" : "English"}
                </span>
                {qaProvision.trim() && <span>{qaProvision.trim()}</span>}
              </header>

              <div className={styles.docSubject}>
                {qaTopic.trim() || copy.preview.defaultSubject}
              </div>

              <h2 className={styles.docHeading}>
                {qaQuestion.trim() ? (
                  qaQuestion.trim()
                ) : (
                  <span className={styles.docPlaceholder}>
                    {copy.preview.questionPlaceholder}
                  </span>
                )}
              </h2>

              <hr className={styles.docRule} />

              <p className={styles.docBody}>
                {qaAnswer.trim() ? (
                  qaAnswer.trim()
                ) : (
                  <span className={styles.docPlaceholder}>
                    {copy.preview.bodyPlaceholder}
                  </span>
                )}
              </p>

              <footer className={styles.docFootnote}>
                <span>
                  {copy.preview.authorityLabel}:{" "}
                  {qaAuthority || copy.qaForm.defaultAuthority}
                </span>
                {qaKeywords.trim() && (
                  <span>
                    {copy.preview.keywordsLabel}:{" "}
                    {qaKeywords
                      .split(",")
                      .map((k) => k.trim())
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                )}
              </footer>
            </article>
          </section>
        </div>
      </main>

      {/* Independent page-level animated floating file button on right edge */}
      <AnimatePresence>
        {!isUploadExpanded && (
          <div
            id="walkthrough-upload-trigger"
            className={styles.floatingPlusAnchor}
          >
            <motion.button
              type="button"
              className={styles.floatingPlusBtn}
              onClick={() => {
                setIsAddFilesHovered(false);
                setIsUploadExpanded(true);
              }}
              onHoverStart={() => setIsAddFilesHovered(true)}
              onHoverEnd={() => setIsAddFilesHovered(false)}
              onFocus={() => setIsAddFilesHovered(true)}
              onBlur={() => setIsAddFilesHovered(false)}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              aria-expanded={false}
              aria-label={copy.uploadDrawer.floatingTrigger}
              title={copy.uploadDrawer.floatingTrigger}
            >
              <motion.span
                className={styles.floatingPlusIconWrap}
                animate={
                  isAddFilesHovered
                    ? { scale: 1.08, rotate: -6 }
                    : { y: [0, -2, 0] }
                }
                transition={
                  isAddFilesHovered
                    ? { type: "spring", stiffness: 450, damping: 24 }
                    : {
                        duration: 2.6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }
                }
              >
                <FilePlus2 size={18} />
              </motion.span>
              <motion.span
                className={styles.floatingPlusLabel}
                initial={false}
                animate={{
                  width: isAddFilesHovered ? "auto" : 0,
                  opacity: isAddFilesHovered ? 1 : 0,
                  marginLeft: isAddFilesHovered ? 8 : 0,
                }}
                transition={{ type: "spring", stiffness: 440, damping: 32 }}
              >
                {copy.uploadDrawer.floatingTrigger}
              </motion.span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Upload Drawer from right edge with blurred page backdrop */}
      <AnimatePresence>
        {isUploadExpanded && (
          <>
            <motion.div
              className={styles.drawerBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <button
                type="button"
                className={styles.drawerBackdropBtn}
                aria-label={copy.uploadDrawer.closeAria}
                onClick={() => setIsUploadExpanded(false)}
              />
            </motion.div>
            <div className={styles.uploadDrawerAnchor}>
              <motion.div
                className={styles.uploadDrawer}
                role="dialog"
                aria-modal="true"
                aria-labelledby="upload-drawer-title"
                initial={{ opacity: 0, x: 48, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 48, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 360, damping: 32 }}
              >
                <div className={styles.drawerHeader}>
                  <div>
                    <h2 id="upload-drawer-title" className={styles.paneTitle}>
                      {copy.uploadDrawer.title}
                    </h2>
                    <p className={styles.paneSubtitle}>
                      {copy.uploadDrawer.subtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={styles.drawerCloseBtn}
                    onClick={() => setIsUploadExpanded(false)}
                    aria-label={copy.uploadDrawer.closeAria}
                    title={copy.uploadDrawer.closeAria}
                  >
                    <X size={15} />
                  </button>
                </div>

                {uploadFeedback && (
                  <div
                    className={`${styles.notice} ${uploadFeedback.isError ? styles.noticeError : ""}`}
                  >
                    <span>{uploadFeedback.message}</span>
                    <button
                      type="button"
                      className={styles.noticeClose}
                      onClick={() => setUploadFeedback(null)}
                      aria-label={copy.qaForm.dismissNotice}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                <div className={styles.form}>
                  <div className={styles.section}>
                    <h2 className={styles.sectionHeading}>
                      {copy.uploadDrawer.sectionMeta}
                    </h2>
                    <div className={styles.grid3}>
                      <div className={styles.field}>
                        <label htmlFor="doc-type" className={styles.label}>
                          {copy.uploadDrawer.docType}
                        </label>
                        <CustomSelect
                          id="doc-type"
                          value={docType}
                          options={DOC_TYPES.map((type) => ({
                            value: type,
                            label: copy.docTypes[type],
                          }))}
                          onChange={setDocType}
                        />
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="doc-authority" className={styles.label}>
                          {copy.uploadDrawer.issuingAuthority}
                        </label>
                        <input
                          id="doc-authority"
                          type="text"
                          className={styles.input}
                          value={docAuthority}
                          onChange={(e) => setDocAuthority(e.target.value)}
                        />
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="doc-fy" className={styles.label}>
                          {copy.uploadDrawer.fiscalYear}
                        </label>
                        <FiscalYearPicker
                          id="doc-fy"
                          value={docFiscalYear}
                          years={FISCAL_YEARS}
                          locale={locale}
                          onChange={setDocFiscalYear}
                          align="right"
                          ariaLabel={copy.uploadDrawer.fiscalYear}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.section}>
                    <h2 className={styles.sectionHeading}>
                      {copy.uploadDrawer.sectionFiles}
                    </h2>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileInputChange}
                      style={{ display: "none" }}
                    />

                    <button
                      type="button"
                      className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ""}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleFileDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={18} />
                      <div className={styles.dropzoneTitle}>
                        {copy.uploadDrawer.dropTitlePrefix}{" "}
                        <span className={styles.dropzoneBrowse}>
                          {copy.uploadDrawer.dropBrowse}
                        </span>
                      </div>
                      <div className={styles.dropzoneHint}>
                        {copy.uploadDrawer.dropHint}
                      </div>
                    </button>

                    {(stagedFiles.length > 0 || uploadProgress) && (
                      <div className={styles.fileList}>
                        {stagedFiles.map((item) => (
                          <div key={item.id} className={styles.fileRow}>
                            <span className={styles.fileType}>{item.type}</span>
                            <div className={styles.fileMeta}>
                              <span className={styles.fileName}>
                                {item.name}
                              </span>
                              <span className={styles.fileSub}>
                                {item.size} • {copy.uploadDrawer.stagedLabel} (
                                {copy.docTypes[docType]})
                              </span>
                            </div>
                            <button
                              type="button"
                              className={styles.iconBtn}
                              onClick={() => handleDeleteFile(item.id)}
                              aria-label={copy.uploadDrawer.removeFileAria(
                                item.name,
                              )}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}

                        {uploadProgress && (
                          <div
                            className={styles.fileRow}
                            style={{
                              flexDirection: "column",
                              alignItems: "stretch",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                              }}
                            >
                              <span className={styles.fileType}>
                                {getFileType(uploadProgress.fileName)}
                              </span>
                              <div className={styles.fileMeta}>
                                <span className={styles.fileName}>
                                  {uploadProgress.fileName}
                                </span>
                                <span className={styles.fileSub}>
                                  {uploadProgress.progressText}
                                </span>
                              </div>
                              <button
                                type="button"
                                className={styles.iconBtn}
                                onClick={handleCancelInProgress}
                                aria-label={copy.uploadDrawer.cancelUploadAria}
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <div className={styles.progressTrack}>
                              <div
                                className={styles.progressFill}
                                style={{ width: `${uploadProgress.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div
                    className={`${styles.actionsBar} ${styles.actionsBarBetween}`}
                  >
                    <div className={styles.attributionSummary}>
                      <span>
                        {stagedFiles.length > 0
                          ? copy.uploadDrawer.readySummary(
                              stagedFiles.length,
                              docAuthority,
                            )
                          : copy.uploadDrawer.emptySummary}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={styles.submitBtn}
                      onClick={handleUploadRequest}
                      disabled={isUploadingDoc || stagedFiles.length === 0}
                    >
                      {isUploadingDoc
                        ? copy.uploadDrawer.uploadingBtn
                        : stagedFiles.length > 0
                          ? copy.uploadDrawer.uploadCountBtn(stagedFiles.length)
                          : copy.uploadDrawer.uploadBtn}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {pendingAction && (
        <div className={styles.modalBackdrop}>
          <button
            type="button"
            className={styles.modalBackdropBtn}
            aria-label={copy.modal.closeAria}
            onClick={() => setPendingAction(null)}
          />
          <div
            className={styles.modalPanel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="attribution-modal-title"
          >
            <div className={styles.modalHeader}>
              <div>
                <h2 id="attribution-modal-title" className={styles.modalTitle}>
                  {copy.modal.title}
                </h2>
                <p className={styles.modalSubtitle}>
                  {pendingAction === "qa"
                    ? copy.modal.subtitleQa
                    : copy.modal.subtitleDoc}
                </p>
              </div>
              <button
                type="button"
                className={styles.noticeClose}
                onClick={() => setPendingAction(null)}
                aria-label={copy.modal.closeAria}
              >
                <X size={16} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <span>{copy.modal.anonymousCheckbox}</span>
              </label>

              {!isAnonymous && (
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <label htmlFor="ca-name" className={styles.label}>
                      {copy.modal.fullNameLabel}
                    </label>
                    <input
                      id="ca-name"
                      type="text"
                      className={styles.input}
                      placeholder={copy.modal.fullNamePlaceholder}
                      value={profile.fullName}
                      onChange={(e) =>
                        handleProfileChange("fullName", e.target.value)
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="ca-ican" className={styles.label}>
                      {copy.modal.icanLabel}
                    </label>
                    <input
                      id="ca-ican"
                      type="text"
                      className={styles.input}
                      placeholder={copy.modal.icanPlaceholder}
                      value={profile.icanNumber}
                      onChange={(e) =>
                        handleProfileChange("icanNumber", e.target.value)
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="ca-firm" className={styles.label}>
                      {copy.modal.firmLabel}
                    </label>
                    <input
                      id="ca-firm"
                      type="text"
                      className={styles.input}
                      placeholder={copy.modal.firmPlaceholder}
                      value={profile.firmName}
                      onChange={(e) =>
                        handleProfileChange("firmName", e.target.value)
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="ca-email" className={styles.label}>
                      {copy.modal.emailLabel}
                    </label>
                    <input
                      id="ca-email"
                      type="email"
                      className={styles.input}
                      placeholder={copy.modal.emailPlaceholder}
                      value={profile.email}
                      onChange={(e) =>
                        handleProfileChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setPendingAction(null)}
              >
                {copy.modal.cancelBtn}
              </button>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={() => {
                  if (pendingAction === "qa") {
                    executeQaSubmit();
                  } else {
                    executeUpload();
                  }
                }}
              >
                {pendingAction === "qa"
                  ? copy.modal.confirmQaBtn
                  : copy.modal.confirmDocBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      <ContributorWalkthrough
        isOpen={isWalkthroughOpen}
        locale={locale}
        onClose={handleCloseWalkthrough}
        onStepFocus={handleWalkthroughStepFocus}
        onOpenSamples={() => setIsReferenceOpen(true)}
      />
    </div>
  );
}
