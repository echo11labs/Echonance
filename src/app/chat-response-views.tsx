"use client";

import {
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  ListChecks,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import type {
  ChatRateTable,
  ChatResearchAudit,
  ChatTaskList,
  ChatThoughtProcess,
} from "@/lib/mock-tax-chat";
import { cn } from "@/lib/utils";
import styles from "./dashboard.module.css";

export interface ThoughtProcessViewerProps {
  thoughtProcess: ChatThoughtProcess;
  isLive?: boolean;
  activeStepIndex?: number;
  stepDurations?: number[];
  currentStepElapsed?: number;
  totalElapsed?: number;
  thoughtCollapsed?: boolean;
}

function ThoughtSpinnerCircle() {
  return (
    <span className={styles.thoughtSpinnerWrapper} aria-hidden="true">
      <svg
        className={styles.thoughtSpinnerSvg}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Thinking spinner"
      >
        <title>Thinking spinner</title>
        <circle className={styles.thoughtSpinnerTrack} cx="12" cy="12" r="9" />
        <circle className={styles.thoughtSpinnerArc} cx="12" cy="12" r="9" />
      </svg>
      <span className={styles.thoughtSpinnerGlow} />
    </span>
  );
}

/**
 * 1. Collapsible Thought Process Viewer
 * Allows users to inspect the agent's internal multi-step cognitive legal reasoning.
 * Supports live step-by-step progressive reveal with per-step timers, and auto-collapses
 * when response generation starts.
 */
export function ThoughtProcessViewer({
  thoughtProcess,
  isLive = false,
  activeStepIndex = 0,
  stepDurations = [],
  currentStepElapsed = 0,
  totalElapsed = 0,
  thoughtCollapsed = true,
}: ThoughtProcessViewerProps) {
  const [userToggledOpen, setUserToggledOpen] = useState<boolean | null>(null);

  useEffect(() => {
    if (isLive) {
      setUserToggledOpen(null);
    }
  }, [isLive]);

  // When live, it is strictly expanded so user sees steps executing once timeline starts.
  // When finished, it defaults to collapsed unless manually toggled by user.
  const isOpen = isLive ? true : (userToggledOpen ?? !thoughtCollapsed);
  const hasStartedTimeline = !isLive || activeStepIndex >= 0;

  return (
    <div className={styles.thoughtContainer}>
      <button
        type="button"
        className={styles.thoughtHeader}
        onClick={() => {
          if (!isLive) {
            setUserToggledOpen((prev) => {
              const currentlyOpen = prev ?? !thoughtCollapsed;
              return !currentlyOpen;
            });
          }
        }}
        aria-expanded={isOpen && hasStartedTimeline}
      >
        <span className={styles.thoughtHeaderLeft}>
          {isLive ? (
            <ThoughtSpinnerCircle />
          ) : (
            <Sparkles
              size={13}
              className={styles.thoughtIcon}
              aria-hidden="true"
            />
          )}
          <span>
            {isLive
              ? `Thinking... • ${totalElapsed.toFixed(1)}s`
              : `Thought for ${thoughtProcess.duration}`}
          </span>
        </span>
        {!isLive && (
          <ChevronDown
            size={13}
            className={styles.thoughtChevron}
            data-open={isOpen}
            aria-hidden="true"
          />
        )}
      </button>

      {isOpen && hasStartedTimeline && (
        <div className={styles.thoughtContent}>
          {thoughtProcess.summary && (
            <p className={styles.thoughtSummary}>"{thoughtProcess.summary}"</p>
          )}
          <ol className={styles.thoughtSteps}>
            {thoughtProcess.steps.map((step, idx) => {
              // During live thinking, show steps progressively one by one
              if (isLive && idx > activeStepIndex) {
                return null;
              }

              const isStepActive = isLive && idx === activeStepIndex;
              const isStepDone = !isLive || idx < activeStepIndex;
              const recordedDuration = stepDurations[idx];
              const displayTime = isStepActive
                ? currentStepElapsed.toFixed(1)
                : recordedDuration !== undefined
                  ? recordedDuration > 0 && recordedDuration < 0.1
                    ? "<0.1"
                    : recordedDuration.toFixed(1)
                  : null;

              return (
                <li
                  key={`step-${step.slice(0, 32)}`}
                  className={cn(
                    styles.thoughtStepItem,
                    isStepActive && styles.thoughtStepActive,
                  )}
                >
                  <span className={styles.thoughtStepLeft}>
                    {isStepActive ? (
                      <span
                        className={styles.stepActiveDot}
                        aria-hidden="true"
                      />
                    ) : isStepDone ? (
                      <Check
                        size={11}
                        className={styles.stepCheckIcon}
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        className={styles.stepPendingDot}
                        aria-hidden="true"
                      />
                    )}
                    <span className={styles.thoughtStepText}>{step}</span>
                  </span>
                  {displayTime && (
                    <span
                      className={cn(
                        styles.stepTimerBadge,
                        isStepActive && styles.stepTimerActive,
                      )}
                    >
                      {displayTime}s
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}

/**
 * 2. Research Audit & Trajectory Viewer
 * Displays dispatched search queries and explored legal gazettes / statutes
 */
export function ResearchAuditViewer({ audit }: { audit: ChatResearchAudit }) {
  return (
    <section
      className={styles.researchAuditContainer}
      aria-label="Research Trajectory"
    >
      <div className={styles.researchAuditHeader}>
        <span className={styles.researchAuditTitle}>
          <Compass size={13} aria-hidden="true" />
          <span>Research Trajectory & Sources Explored</span>
        </span>
        <span className={styles.researchAuditBadge}>
          {audit.totalSourcesAudited} sources audited
        </span>
      </div>

      {audit.dispatchedQueries.length > 0 && (
        <div className={styles.dispatchedQueriesList}>
          {audit.dispatchedQueries.map((query) => (
            <span key={query} className={styles.dispatchedQueryChip}>
              <Search size={11} aria-hidden="true" />
              <span>{query}</span>
            </span>
          ))}
        </div>
      )}

      <div className={styles.exploredSourcesGrid}>
        {audit.sourcesExplored.map((source) => (
          <div
            key={`${source.name}-${source.citation}`}
            className={styles.exploredSourceItem}
          >
            <div className={styles.exploredSourceTop}>
              <span className={styles.exploredSourceName}>{source.name}</span>
              <span className={styles.exploredSourceStatus}>
                {source.status}
              </span>
            </div>
            <div className={styles.exploredSourceMeta}>
              <span>{source.citation}</span>
              <span>•</span>
              <span>{source.authority}</span>
              <span>•</span>
              <span>{source.matchType}</span>
            </div>
            {source.excerpt && (
              <p className={styles.exploredSourceExcerpt}>"{source.excerpt}"</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * 3. Multi-Level Tasking Execution Plan Viewer
 * Displays multi-phase compliance workflows with live progress tracking
 */
export function TaskListViewer({ taskList }: { taskList: ChatTaskList }) {
  const completedCount = taskList.tasks.filter(
    (t) => t.status === "completed" || t.status === "verified",
  ).length;

  return (
    <section
      className={styles.taskListContainer}
      aria-label="Statutory Execution Plan"
    >
      <div className={styles.taskListHeader}>
        <div className={styles.taskListTitleGroup}>
          <ListChecks size={15} color="var(--accent)" aria-hidden="true" />
          <span className={styles.taskListTitle}>{taskList.title}</span>
        </div>
        <span className={styles.taskListProgressPill}>
          {completedCount} of {taskList.tasks.length} phases verified
        </span>
      </div>

      <div className={styles.tasksWrapper}>
        {taskList.tasks.map((task) => (
          <div key={task.id} className={styles.taskItemCard}>
            <div className={styles.taskStatusIconSlot}>
              {task.status === "completed" && (
                <CheckCircle2
                  size={16}
                  color="var(--accent)"
                  aria-label="Completed"
                />
              )}
              {task.status === "in-progress" && (
                <Clock size={16} color="#e5a93c" aria-label="In Progress" />
              )}
              {task.status === "verified" && (
                <ShieldCheck
                  size={16}
                  color="#00df81"
                  aria-label="Statutory Verified"
                />
              )}
            </div>
            <div className={styles.taskContentCol}>
              <span className={styles.taskPhaseTag}>{task.phase}</span>
              <span className={styles.taskItemLabel}>{task.label}</span>
              {task.detail && (
                <p className={styles.taskItemDetail}>{task.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * 4. Structured Statutory Rate Table Viewer
 * Renders cleanly formatted tabular schedules and matrices
 */
export function RateTableViewer({ table }: { table: ChatRateTable }) {
  return (
    <div className={styles.rateTableContainer}>
      <div className={styles.rateTableTitleBar}>
        <span className={styles.rateTableTitle}>{table.title}</span>
        {table.subtitle && (
          <span className={styles.rateTableSubtitle}>{table.subtitle}</span>
        )}
      </div>

      <div className={styles.rateTableScroll}>
        <table className={styles.rateTableElement}>
          <thead>
            <tr>
              {table.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => {
              const rowKey = row.join("~");
              return (
                <tr key={rowKey}>
                  {row.map((cell, cIdx) => (
                    <td key={`${rowKey}-${table.columns[cIdx] ?? cIdx}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {table.footnote && (
        <p className={styles.rateTableFootnote}>{table.footnote}</p>
      )}
    </div>
  );
}
