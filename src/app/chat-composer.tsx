"use client";

import { ArrowUp, Mic, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MOCK_TAX_KNOWLEDGE_BASE, shuffleArray } from "@/lib/mock-tax-chat";
import { cn } from "@/lib/utils";
import ChatAttachments, { type ChatAttachment } from "./chat-attachments";
import styles from "./dashboard.module.css";

function resizeInput(textarea: HTMLTextAreaElement) {
  const scrollTop = textarea.scrollTop;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
  textarea.scrollTop = scrollTop;
}

const dynamicPrompts = MOCK_TAX_KNOWLEDGE_BASE.map((item) => item.question);

export default function ChatComposer({
  value,
  textareaRef,
  attachments,
  hasMessages = false,
  onChange,
  onRemove,
  onSubmit,
  onVoiceChange,
}: {
  value: string;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  attachments: ChatAttachment[];
  hasMessages?: boolean;
  onChange: (text: string) => void;
  onAdd: (attachments: ChatAttachment[]) => void;
  onRemove: (id: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onVoiceChange?: (
    isActive: boolean,
    audioLevel: number,
    audioBlob?: Blob,
  ) => void;
}) {
  const addButton = useRef<HTMLButtonElement>(null);
  const [shuffledPrompts, setShuffledPrompts] = useState<string[]>(() =>
    shuffleArray(dynamicPrompts),
  );
  const [promptIndex, setPromptIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const currentPrompt =
    shuffledPrompts[promptIndex] ??
    shuffledPrompts[0] ??
    dynamicPrompts[0] ??
    "";

  const onVoiceChangeRef = useRef(onVoiceChange);
  onVoiceChangeRef.current = onVoiceChange;
  const [voicePreviewOpen, setVoicePreviewOpen] = useState(false);
  const [attachNoticeOpen, setAttachNoticeOpen] = useState(false);
  const [atHintOpen, setAtHintOpen] = useState(false);

  useEffect(() => {
    if (hasMessages) return;
    const showTimer = setTimeout(() => setAtHintOpen(true), 600);
    const hideTimer = setTimeout(() => setAtHintOpen(false), 4800);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [hasMessages]);

  function toggleVoicePreview() {
    setAttachNoticeOpen(false);
    setVoicePreviewOpen((prev) => {
      const next = !prev;
      onVoiceChangeRef.current?.(next, next ? 0.55 : 0);
      return next;
    });
  }

  function toggleAttachNotice() {
    if (voicePreviewOpen) {
      setVoicePreviewOpen(false);
      onVoiceChangeRef.current?.(false, 0);
    }
    setAttachNoticeOpen((prev) => !prev);
  }

  useEffect(() => {
    if (hasMessages || value.trim() || voicePreviewOpen) return;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentPrompt.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPrompt.slice(0, displayText.length + 1));
        }, 34);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPrompt.slice(0, displayText.length - 1));
        }, 16);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPromptIndex((prev) => {
            const next = prev + 1;
            if (next >= shuffledPrompts.length) {
              setShuffledPrompts(shuffleArray(dynamicPrompts));
              return 0;
            }
            return next;
          });
        }, 320);
      }
    }

    return () => clearTimeout(timer);
  }, [
    hasMessages,
    value,
    voicePreviewOpen,
    displayText,
    isDeleting,
    currentPrompt,
    shuffledPrompts.length,
  ]);

  useLayoutEffect(() => {
    if (textareaRef.current) resizeInput(textareaRef.current);
  });

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    let width = textarea.clientWidth;
    const observer = new ResizeObserver(() => {
      if (textarea.clientWidth === width) return;
      width = textarea.clientWidth;
      resizeInput(textarea);
    });
    observer.observe(textarea);
    return () => observer.disconnect();
  }, [textareaRef]);

  const hasNepaliTag = /@nepali\b/i.test(value) || /@नेपाली\b/.test(value);
  const atMatch = /(?:^|\s)@([a-zA-Z0-9_-]*)$/.exec(value);
  const isAtOpen = Boolean(atMatch && !hasNepaliTag);

  function insertNepaliTag() {
    if (hasNepaliTag) return;
    let nextValue: string;
    if (atMatch) {
      const atIndex = atMatch.index + (atMatch[0].startsWith(" ") ? 1 : 0);
      const prefix = value.slice(0, atIndex);
      nextValue = `${prefix}@nepali `;
    } else {
      nextValue = value.trim() ? `@nepali ${value}` : `@nepali `;
    }
    onChange(nextValue);
    if (textareaRef.current) {
      textareaRef.current.value = nextValue;
      textareaRef.current.focus();
      resizeInput(textareaRef.current);
    }
  }

  function toggleNepaliTag() {
    if (hasNepaliTag) {
      const nextValue = value
        .replace(/@nepali\s*/gi, "")
        .replace(/@नेपाली\s*/g, "");
      onChange(nextValue);
      if (textareaRef.current) {
        textareaRef.current.value = nextValue;
        textareaRef.current.focus();
        resizeInput(textareaRef.current);
      }
    } else {
      insertNepaliTag();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      isAtOpen &&
      (event.key === "Tab" || event.key === "Enter") &&
      !event.shiftKey
    ) {
      event.preventDefault();
      insertNepaliTag();
      return;
    }

    if (
      !hasMessages &&
      event.key === "Tab" &&
      !event.shiftKey &&
      !value.trim() &&
      currentPrompt
    ) {
      event.preventDefault();
      onChange(currentPrompt);
      if (textareaRef.current) {
        textareaRef.current.value = currentPrompt;
        resizeInput(textareaRef.current);
      }
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (value.trim()) {
        const form = event.currentTarget.form;
        if (form) form.requestSubmit();
      }
    }
  }

  const micLabel = voicePreviewOpen
    ? "Close voice mode notice"
    : "Voice mode (coming soon)";
  const statusMessage = voicePreviewOpen
    ? "Our model is under development — voice mode will be available soon."
    : attachNoticeOpen
      ? "File attachment analysis is under development — available soon."
      : "";

  return (
    <div className={styles.composerWrapper}>
      <AnimatePresence>
        {(voicePreviewOpen || attachNoticeOpen) && (
          <motion.div
            className={styles.voiceStatusWrapper}
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
          >
            <div className={styles.voiceStatusPill}>
              <span className={styles.voiceStatusDot} aria-hidden="true" />
              <span>{statusMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        className={styles.composer}
        onSubmit={(event) => {
          if (voicePreviewOpen) {
            setVoicePreviewOpen(false);
            onVoiceChangeRef.current?.(false, 0);
          }
          if (attachNoticeOpen) {
            setAttachNoticeOpen(false);
          }
          onSubmit(event);
        }}
      >
        <label className={styles.hidden} htmlFor="question">
          Ask a tax question
        </label>

        <div className={styles.composerBody}>
          <div className={styles.textareaWrapper}>
            {isAtOpen && (
              <div
                className={styles.atMenu}
                role="menu"
                aria-label="Mention options"
              >
                <button
                  type="button"
                  role="menuitem"
                  className={styles.atMenuItem}
                  onClick={insertNepaliTag}
                >
                  <span className={styles.atMenuItemTag}>@nepali</span>
                  <span className={styles.atMenuItemDesc}>नेपाली (Nepali)</span>
                </button>
              </div>
            )}
            {!value && !hasMessages && (
              <div className={styles.typewriterOverlay} aria-hidden="true">
                <span className={styles.typewriterText}>{displayText}</span>
                <span className={styles.typewriterCursor}>|</span>
                {displayText.length > 10 && (
                  <span className={styles.tabHint}>
                    <kbd>Tab</kbd> to complete
                  </span>
                )}
              </div>
            )}
            <textarea
              id="question"
              ref={textareaRef}
              placeholder={
                hasMessages
                  ? "Ask a follow-up or research question… (type @nepali for Nepali)"
                  : ""
              }
              rows={1}
              maxLength={2000}
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <ChatAttachments
            attachments={attachments}
            onRemove={(id) => {
              onRemove(id);
              addButton.current?.focus();
            }}
          />

          <div className={styles.composerFooter}>
            <div className={styles.attachWrapper}>
              <button
                className={styles.composerTool}
                type="button"
                aria-label="File attachments (under development)"
                aria-pressed={attachNoticeOpen}
                ref={addButton}
                title="File attachments (coming soon)"
                onClick={toggleAttachNotice}
              >
                <Plus aria-hidden="true" />
              </button>
            </div>

            <div className={styles.atMentionWrapper}>
              <AnimatePresence>
                {atHintOpen && (
                  <motion.div
                    className={styles.atTooltipPopup}
                    initial={{ opacity: 0, y: 6, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    role="tooltip"
                  >
                    {hasNepaliTag
                      ? "Nepali mode active (@nepali)"
                      : "Switch to Nepali (@nepali)"}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                className={cn(
                  styles.composerTool,
                  styles.atMentionTool,
                  hasNepaliTag && styles.atMentionToolActive,
                )}
                onClick={toggleNepaliTag}
                onMouseEnter={() => setAtHintOpen(true)}
                onMouseLeave={() => setAtHintOpen(false)}
                onFocus={() => setAtHintOpen(true)}
                onBlur={() => setAtHintOpen(false)}
                aria-label="Set generation language to Nepali (@nepali)"
                title={
                  hasNepaliTag
                    ? "Language set to Nepali (Click to remove @nepali)"
                    : "Type @ or click to set language to Nepali (@nepali)"
                }
              >
                @
              </button>
            </div>

            <div
              className={styles.recordingStatus}
              role="status"
              aria-live="polite"
              data-error={false}
              data-hearing={voicePreviewOpen}
            >
              <span>{statusMessage}</span>
            </div>

            <div className={styles.composerActions}>
              <button
                className={`${styles.composerTool} ${styles.micTool}`}
                type="button"
                aria-label={micLabel}
                aria-pressed={voicePreviewOpen}
                title={micLabel}
                onClick={toggleVoicePreview}
              >
                <Mic aria-hidden="true" />
              </button>
              <button
                className={styles.sendButton}
                type="submit"
                aria-label="Send question"
                disabled={!value.trim()}
              >
                <ArrowUp aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
