"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  FileText,
  ListChecks,
  MessageSquareText,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PendingReviewSubmissions } from "@/lib/tax-repository";
import { AddReviewerDialog, SubmissionDecisions } from "./review-controls";
import styles from "./review.module.css";

type ReviewTask =
  | {
      type: "qa";
      entry: PendingReviewSubmissions["qaEntries"][number];
      title: string;
      classification: string;
    }
  | {
      type: "document";
      entry: PendingReviewSubmissions["documents"][number];
      title: string;
      classification: string;
    };

const filters = [
  { id: "all", label: "All tasks" },
  { id: "qa", label: "Q&A" },
  { id: "document", label: "Documents" },
] as const;

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string) {
  return value && !Number.isNaN(Date.parse(value))
    ? dateFormatter.format(new Date(value))
    : "Date unavailable";
}

function sourceHref(url?: string) {
  return typeof url === "string" &&
    (/^https?:\/\//i.test(url) ||
      /^\/api\/sources\/[\w-]+(?:[?#].*)?$/.test(url))
    ? url
    : undefined;
}

function ReviewDetail({ task }: { task: ReviewTask }) {
  const { entry } = task;
  const citations =
    task.type === "qa"
      ? task.entry.citations.filter(
          (citation) =>
            typeof citation?.title === "string" &&
            typeof citation.citation === "string",
        )
      : [];
  const attribution = entry.isAnonymous
    ? "Anonymous"
    : entry.contributor?.fullName || "Unattributed";

  return (
    <article className={styles.detail}>
      <header className={styles.detailHeader}>
        <p className={styles.classification}>
          {task.type === "qa" ? "Q&A" : "Document"} / {task.classification}
        </p>
        <h2>{task.title}</h2>
        <dl className={styles.metadata}>
          <div>
            <dt>Fiscal year</dt>
            <dd>{entry.fiscalYear}</dd>
          </div>
          <div>
            <dt>Submitted</dt>
            <dd>{formatDate(entry.createdAt)}</dd>
          </div>
          <div>
            <dt>Contributor</dt>
            <dd>{attribution}</dd>
          </div>
          {task.type === "qa" && (
            <div>
              <dt>Language</dt>
              <dd>{task.entry.language === "np" ? "Nepali" : "English"}</dd>
            </div>
          )}
        </dl>
      </header>

      {task.type === "qa" ? (
        <>
          <section>
            <h3>Question</h3>
            <p className={styles.prose}>{task.entry.question}</p>
          </section>
          <section>
            <h3>Submitted answer</h3>
            <p className={styles.prose}>{task.entry.answer}</p>
          </section>
          <section>
            <h3>Source citations</h3>
            {citations.length ? (
              <ul className={styles.sources}>
                {citations.map((citation) => {
                  const href = sourceHref(citation.url);
                  return (
                    <li
                      key={`${citation.title}-${citation.citation}-${citation.url}`}
                    >
                      <div>
                        <strong>{citation.title}</strong>
                        <p>
                          {citation.citation}
                          {typeof citation.authority === "string" &&
                            citation.authority &&
                            ` · ${citation.authority}`}
                        </p>
                      </div>
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open source{" "}
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className={styles.muted}>No citations were submitted.</p>
            )}
          </section>
          {task.entry.rateTable &&
            Array.isArray(task.entry.rateTable.columns) &&
            task.entry.rateTable.columns.every(
              (value) => typeof value === "string",
            ) &&
            Array.isArray(task.entry.rateTable.rows) &&
            task.entry.rateTable.rows.every(
              (row) =>
                Array.isArray(row) &&
                row.every((value) => typeof value === "string"),
            ) && (
              <section>
                <h3>
                  {typeof task.entry.rateTable.title === "string"
                    ? task.entry.rateTable.title || "Rate table"
                    : "Rate table"}
                </h3>
                {typeof task.entry.rateTable.subtitle === "string" &&
                  task.entry.rateTable.subtitle && (
                    <p className={styles.muted}>
                      {task.entry.rateTable.subtitle}
                    </p>
                  )}
                <div className={styles.tableScroll}>
                  <table>
                    <thead>
                      <tr>
                        {task.entry.rateTable.columns.map((column) => (
                          <th key={column} scope="col">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {task.entry.rateTable.rows.map((row) => (
                        <tr key={JSON.stringify(row)}>
                          {row.map((value, index) => (
                            <td
                              key={`${task.entry.rateTable?.columns[index]}-${value}`}
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {typeof task.entry.rateTable.footnote === "string" &&
                  task.entry.rateTable.footnote && (
                    <p className={styles.muted}>
                      {task.entry.rateTable.footnote}
                    </p>
                  )}
              </section>
            )}
          {task.entry.reasoningSteps.length > 0 && (
            <section>
              <h3>Reasoning</h3>
              <ol className={styles.reasoning}>
                {task.entry.reasoningSteps
                  .filter((step) => typeof step === "string")
                  .map((step) => (
                    <li key={step}>{step}</li>
                  ))}
              </ol>
            </section>
          )}
          {task.entry.keywords.length > 0 && (
            <section>
              <h3>Keywords</h3>
              <p className={styles.muted}>{task.entry.keywords.join(" · ")}</p>
            </section>
          )}
        </>
      ) : (
        <section>
          <h3>Submitted file</h3>
          <p className={styles.prose}>{task.entry.issuingAuthority}</p>
          {task.entry.summary &&
            !/^Official .+ uploaded via CA Knowledge Hub:/i.test(
              task.entry.summary,
            ) && <p className={styles.prose}>{task.entry.summary}</p>}
          <div className={styles.fileRow}>
            <FileText size={20} aria-hidden="true" />
            <div>
              <strong>
                {task.entry.mimeType === "application/pdf"
                  ? "PDF document"
                  : "Document attachment"}
              </strong>
              {task.entry.fileSizeBytes > 0 && (
                <p>
                  {Math.max(
                    1,
                    Math.round(task.entry.fileSizeBytes / 1024),
                  ).toLocaleString("en")}{" "}
                  KB
                </p>
              )}
            </div>
            {sourceHref(task.entry.fileUrl) && (
              <a
                href={task.entry.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open file <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </section>
      )}

      <footer className={styles.decision}>
        <SubmissionDecisions id={entry.id} type={task.type} />
      </footer>
    </article>
  );
}

export function ReviewWorkspace({
  qaEntries,
  documents,
  canManageReviewers,
}: PendingReviewSubmissions & { canManageReviewers: boolean }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileDetail, setMobileDetail] = useState(false);
  const detailRef = useRef<HTMLElement>(null);
  const selectedButton = useRef<HTMLButtonElement>(null);

  const tasks: ReviewTask[] = [
    ...qaEntries.map((entry): ReviewTask => ({
      type: "qa",
      entry,
      title: entry.shortTopic,
      classification: entry.category,
    })),
    ...documents.map((entry): ReviewTask => ({
      type: "document",
      entry,
      title: entry.title,
      classification: entry.documentType,
    })),
  ];
  tasks.sort((a, b) =>
    (a.entry.createdAt || "").localeCompare(b.entry.createdAt || ""),
  );
  const term = query.trim().toLowerCase();
  const visibleTasks = tasks.filter(
    (task) =>
      (filter === "all" || task.type === filter) &&
      [task.title, task.classification, task.entry.fiscalYear].some((value) =>
        value.toLowerCase().includes(term),
      ),
  );
  const selected = visibleTasks.find((task) => task.entry.id === selectedId);

  useEffect(() => {
    if (mobileDetail) {
      detailRef.current?.focus({
        preventScroll: !window.matchMedia("(max-width: 760px)").matches,
      });
    }
  }, [mobileDetail]);

  return (
    <div className={styles.content}>
      <header className={styles.heading}>
        <div>
          <h1>Review queue</h1>
          <p>
            {tasks.length} pending {tasks.length === 1 ? "task" : "tasks"} ·
            Oldest first
          </p>
        </div>
        {canManageReviewers && <AddReviewerDialog />}
      </header>

      <div
        className={styles.workspace}
        data-detail={Boolean(mobileDetail && selected)}
      >
        <section className={styles.queue} aria-label="Review tasks">
          <fieldset className={styles.filters} aria-label="Filter review tasks">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => {
                  setFilter(id);
                  setMobileDetail(false);
                }}
              >
                {label}
              </button>
            ))}
          </fieldset>
          <label className={styles.search}>
            <Search size={17} aria-hidden="true" />
            <input
              type="search"
              aria-label="Search review tasks"
              placeholder="Search title, category, or year"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setMobileDetail(false);
              }}
            />
          </label>
          {visibleTasks.length ? (
            <ul className={styles.tasks}>
              {visibleTasks.map((task) => (
                <li key={task.entry.id}>
                  <button
                    ref={
                      selected?.entry.id === task.entry.id
                        ? selectedButton
                        : undefined
                    }
                    type="button"
                    className={styles.task}
                    aria-pressed={selected?.entry.id === task.entry.id}
                    onClick={() => {
                      setSelectedId(task.entry.id);
                      setMobileDetail(true);
                    }}
                  >
                    <span className={styles.taskIcon}>
                      {task.type === "qa" ? (
                        <MessageSquareText size={18} aria-hidden="true" />
                      ) : (
                        <FileText size={18} aria-hidden="true" />
                      )}
                    </span>
                    <span className={styles.taskCopy}>
                      <strong>{task.title}</strong>
                      <span>
                        {task.type === "qa" ? "Q&A" : task.classification} · FY{" "}
                        {task.entry.fiscalYear} ·{" "}
                        {formatDate(task.entry.createdAt)}
                      </span>
                    </span>
                    <ChevronRight
                      className={styles.chevron}
                      size={17}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.queueEmpty}>
              {tasks.length
                ? "No tasks match your filters."
                : "No submissions are pending."}
            </p>
          )}
        </section>

        <section
          className={styles.reader}
          ref={detailRef}
          tabIndex={-1}
          aria-label="Submission detail"
        >
          {selected ? (
            <>
              <button
                className={styles.backToTasks}
                type="button"
                onClick={() => {
                  setMobileDetail(false);
                  requestAnimationFrame(() => selectedButton.current?.focus());
                }}
              >
                <ArrowLeft size={16} aria-hidden="true" /> All review tasks
              </button>
              <ReviewDetail key={selected.entry.id} task={selected} />
            </>
          ) : (
            <div className={styles.readerEmpty}>
              <ListChecks size={30} strokeWidth={1.4} aria-hidden="true" />
              <h2>{tasks.length ? "Select a task" : "Queue is clear"}</h2>
              <p>
                {tasks.length
                  ? "Open a submission to read its evidence and decide whether to publish it."
                  : "New contributions will appear here for review."}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
