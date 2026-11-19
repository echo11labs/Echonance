"use client";

import { ArrowRight, ArrowUpRight, BookOpen, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type {
  ChatRateTable,
  ChatResearchAudit,
  ChatResource,
  ChatTaskList,
  ChatThoughtProcess,
  ResponseParadigm,
} from "@/lib/mock-tax-chat";
import { cn } from "@/lib/utils";
import type { ChatAttachment } from "./chat-attachments";
import {
  RateTableViewer,
  ResearchAuditViewer,
  TaskListViewer,
  ThoughtProcessViewer,
} from "./chat-response-views";
import { TaxAssistantIcon } from "./custom-icons";
import styles from "./dashboard.module.css";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  attachments?: ChatAttachment[];
  resources?: ChatResource[];
  followUps?: string[];
  timestamp?: string;
  responseType?: ResponseParadigm;
  thoughtProcess?: ChatThoughtProcess;
  researchAudit?: ChatResearchAudit;
  taskList?: ChatTaskList;
  rateTable?: ChatRateTable;
  isLiveThinking?: boolean;
  activeStepIndex?: number;
  stepDurations?: number[];
  currentStepElapsed?: number;
  totalElapsed?: number;
  isStreaming?: boolean;
  thoughtCollapsed?: boolean;
  contributor?: {
    fullName: string;
    icanNumber?: string;
    firmName?: string;
    isVerifiedCa?: boolean;
  };
}

export function renderFormattedSpan(str: string) {
  const parts = str.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2);
      return (
        <strong
          // biome-ignore lint/suspicious/noArrayIndexKey: Text fragment tokens from static markdown split
          key={`bold-${index}-${content}`}
          className={styles.boldText}
        >
          {content}
        </strong>
      );
    }
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: Text fragment tokens from static markdown split
      <span key={`text-${index}-${part}`}>{part}</span>
    );
  });
}

export function renderMessageText(text: string, isStreaming = false) {
  if (!text) {
    if (isStreaming) {
      return (
        <p className={styles.messageParagraph}>
          <span className={styles.streamingCursor} aria-hidden="true" />
        </p>
      );
    }
    return null;
  }

  const paragraphs = text.split("\n\n");
  const lastPIdx = paragraphs.length - 1;
  return paragraphs.map((p, pIdx) => {
    const isLastParagraph = pIdx === lastPIdx;
    const lines = p.split("\n");
    const lastLineIdx = lines.length - 1;
    if (
      lines.some((l) => l.trim().startsWith("•") || l.trim().startsWith("-"))
    ) {
      return (
        <ul
          // biome-ignore lint/suspicious/noArrayIndexKey: Paragraph ordering in static message
          key={`ul-${pIdx}-${p.slice(0, 24)}`}
          className={styles.messageList}
        >
          {lines.map((line, lIdx) => {
            const cleanLine = line.replace(/^[•-]\s*/, "");
            const isLastLine = isLastParagraph && lIdx === lastLineIdx;
            return (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: Line ordering in static list
                key={`li-${pIdx}-${lIdx}-${cleanLine.slice(0, 24)}`}
              >
                {renderFormattedSpan(cleanLine)}
                {isStreaming && isLastLine && (
                  <span className={styles.streamingCursor} aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <p
        // biome-ignore lint/suspicious/noArrayIndexKey: Paragraph ordering in static message
        key={`p-${pIdx}-${p.slice(0, 24)}`}
        className={styles.messageParagraph}
      >
        {renderFormattedSpan(p)}
        {isStreaming && isLastParagraph && (
          <span className={styles.streamingCursor} aria-hidden="true" />
        )}
      </p>
    );
  });
}

export interface ChatResponseProps {
  message: ChatMessage;
  onFollowUpClick?: (question: string) => void;
}

/**
 * ChatResponse
 * Standalone component that renders the full multi-part assistant response:
 * - Assistant identification header
 * - Cognitive thought process timeline
 * - Deep research trajectory & audited sources
 * - Multi-level tasking execution plan
 * - Structured statutory rate schedule / matrix
 * - Primary synthesized response with animated typewriter streaming
 * - Cited official statutory resources
 * - Follow-up exploratory query chips
 */
export default function ChatResponse({
  message,
  onFollowUpClick,
}: ChatResponseProps) {
  return (
    <>
      <div className={styles.assistantHeader}>
        <span className={styles.assistantBadge} aria-hidden="true">
          <TaxAssistantIcon />
        </span>
        <div className={styles.assistantInfo}>
          <span className={styles.assistantName}>CA Ora</span>
          <span className={styles.assistantSub}>
            Verified Nepal Legal Intelligence
          </span>
        </div>
      </div>

      {message.contributor && !message.isLiveThinking && (
        <div className={styles.contributorNotice}>
          <ShieldCheck
            size={14}
            className={styles.contributorNoticeIcon}
            aria-hidden="true"
          />
          <span>
            Statutory guidance contributed by{" "}
            <strong>{message.contributor.fullName}</strong>
            {message.contributor.icanNumber
              ? ` (${message.contributor.icanNumber})`
              : ""}
            {message.contributor.firmName
              ? ` • ${message.contributor.firmName}`
              : ""}
          </span>
        </div>
      )}

      {/* 1. Collapsible Cognitive Thought Process */}
      {message.thoughtProcess && (
        <ThoughtProcessViewer
          thoughtProcess={message.thoughtProcess}
          isLive={message.isLiveThinking}
          activeStepIndex={message.activeStepIndex}
          stepDurations={message.stepDurations}
          currentStepElapsed={message.currentStepElapsed}
          totalElapsed={message.totalElapsed}
          thoughtCollapsed={message.thoughtCollapsed}
        />
      )}

      {/* 2. Research Trajectory & Dispatched Queries */}
      {message.researchAudit &&
        !message.isLiveThinking &&
        !message.isStreaming && (
          <div className={styles.fadeWidgetIn}>
            <ResearchAuditViewer audit={message.researchAudit} />
          </div>
        )}

      {/* 3. Multi-Level Tasking Execution Plan */}
      {message.taskList && !message.isLiveThinking && !message.isStreaming && (
        <div className={styles.fadeWidgetIn}>
          <TaskListViewer taskList={message.taskList} />
        </div>
      )}

      {/* 4. Structured Tax Rates Table */}
      {message.rateTable && !message.isLiveThinking && !message.isStreaming && (
        <div className={styles.fadeWidgetIn}>
          <RateTableViewer table={message.rateTable} />
        </div>
      )}

      {/* Primary Synthesized Legal Response */}
      {(message.text || message.isStreaming) && (
        <div className={cn(styles.assistantBody, styles.fadeWidgetIn)}>
          {renderMessageText(message.text, message.isStreaming)}
        </div>
      )}

      {/* Cited Resources */}
      {message.resources &&
        message.resources.length > 0 &&
        !message.isLiveThinking &&
        !message.isStreaming && (
          <div
            className={cn(styles.resourceCitationGroup, styles.fadeWidgetIn)}
          >
            <p className={styles.resourceCitationHeading}>
              <BookOpen size={13} aria-hidden="true" />
              <span>Cited Statutory Resources</span>
            </p>
            <div className={styles.citationCardList}>
              {message.resources.map((res) => (
                <div
                  key={`${res.title}-${res.citation}`}
                  className={styles.citationCard}
                >
                  <div className={styles.citationCardHeader}>
                    <span className={styles.citationTitle}>{res.title}</span>
                    <span className={styles.citationSection}>
                      {res.citation}
                    </span>
                  </div>
                  <div className={styles.citationCardFooter}>
                    <span className={styles.citationAuthority}>
                      {res.authority}
                    </span>
                    {res.externalUrl?.startsWith("/api/sources/") ? (
                      <a
                        href={res.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.citationActionLink}
                      >
                        <span>Source File</span>
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </a>
                    ) : res.libraryId ? (
                      <Link
                        href="/tax-law-library"
                        className={styles.citationActionLink}
                      >
                        <span>Tax Library</span>
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </Link>
                    ) : (
                      <span className={styles.citationBadge}>
                        Official Rajpatra
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Follow-up suggestions */}
      {message.followUps &&
        message.followUps.length > 0 &&
        !message.isLiveThinking &&
        !message.isStreaming && (
          <div className={cn(styles.followUpsGroup, styles.fadeWidgetIn)}>
            <p className={styles.followUpsHeading}>
              Explore Related Legal Topics
            </p>
            <div className={styles.followUpChips}>
              {message.followUps.map((fu) => (
                <button
                  key={fu}
                  type="button"
                  className={styles.followUpChip}
                  onClick={() => onFollowUpClick?.(fu)}
                >
                  <span>{fu}</span>
                  <ArrowRight size={11} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        )}
    </>
  );
}
