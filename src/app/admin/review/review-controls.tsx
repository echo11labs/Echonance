"use client";

import { Mail, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState } from "react";
import type { ReviewDecision } from "@/lib/tax-repository";
import { addReviewer } from "./actions";
import styles from "./review.module.css";

export function AddReviewerDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formVersion, setFormVersion] = useState(0);

  return (
    <>
      <button
        className={styles.addReviewer}
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          dialogRef.current?.showModal();
          dialogRef.current
            ?.querySelector<HTMLInputElement>('input[type="email"]')
            ?.focus();
        }}
      >
        <UserPlus size={17} aria-hidden="true" />
        Add reviewer
      </button>
      <dialog
        ref={dialogRef}
        className={styles.reviewerDialog}
        aria-labelledby="reviewer-dialog-title"
        aria-describedby="reviewer-dialog-description"
        onClose={() => setFormVersion((version) => version + 1)}
      >
        <AddReviewerForm
          key={formVersion}
          onClose={() => dialogRef.current?.close()}
        />
      </dialog>
    </>
  );
}

function AddReviewerForm({ onClose }: { onClose: () => void }) {
  const [state, action, pending] = useActionState(addReviewer, {
    message: "",
    success: false,
  });
  const [email, setEmail] = useState("");

  return (
    <form className={styles.reviewerForm} action={action}>
      <header className={styles.reviewerDialogHeader}>
        <span className={styles.reviewerIcon}>
          <UserPlus size={22} aria-hidden="true" />
        </span>
        <button
          className={styles.closeReviewerDialog}
          type="button"
          aria-label="Close add reviewer"
          onClick={onClose}
        >
          <X size={19} aria-hidden="true" />
        </button>
        <h2 id="reviewer-dialog-title">Add reviewer</h2>
        <p id="reviewer-dialog-description">
          Reviewers can open the editorial queue and approve submissions for
          publication.
        </p>
      </header>
      {!state.success && (
        <div className={styles.reviewerField}>
          <label htmlFor="reviewer-email">Taxora account email</label>
          <div className={styles.reviewerInput}>
            <Mail size={18} aria-hidden="true" />
            <input
              id="reviewer-email"
              name="email"
              type="email"
              autoComplete="off"
              placeholder="name@example.com"
              aria-describedby="reviewer-email-help"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <p id="reviewer-email-help">
            Use the account’s verified primary email.
          </p>
        </div>
      )}
      {state.message && (
        <p
          className={styles.reviewerFeedback}
          data-success={state.success}
          role={state.success ? "status" : "alert"}
        >
          {state.message}
        </p>
      )}
      <div className={styles.reviewerActions}>
        {state.success ? (
          <button className={styles.primary} type="button" onClick={onClose}>
            Done
          </button>
        ) : (
          <>
            <button
              className={styles.secondary}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className={styles.primary} type="submit" disabled={pending}>
              {pending ? "Granting access…" : "Grant reviewer access"}
            </button>
          </>
        )}
      </div>
    </form>
  );
}

const decisions = {
  approve: {
    label: "Approve & publish",
    description: "This submission will enter Taxora’s verified knowledge base.",
    confirm: "Confirm publication",
  },
  decline: {
    label: "Decline",
    description:
      "This submission will leave the pending queue and be kept as a declined record.",
    confirm: "Confirm decline",
  },
  delete: {
    label: "Delete",
    description:
      "This permanently deletes the submission and any file uploaded with it.",
    confirm: "Delete permanently",
  },
} as const;

export function SubmissionDecisions({
  id,
  type,
}: {
  id: string;
  type: "qa" | "document";
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [decision, setDecision] = useState<ReviewDecision | null>(null);

  async function save() {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/admin/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, decision }),
      });
      const result = await response.json();
      if (response.status === 404) {
        router.refresh();
        return;
      }
      if (!response.ok) throw new Error();
      if (result.warning) {
        setWarning(result.warning);
        return;
      }
      router.refresh();
    } catch {
      setError("Could not save the review decision. Try again.");
      setPending(false);
    }
  }

  return (
    <div className={styles.publish}>
      {warning ? (
        <>
          <p role="alert">{warning}</p>
          <button
            className={styles.secondary}
            type="button"
            onClick={() => router.refresh()}
          >
            Return to queue
          </button>
        </>
      ) : decision ? (
        <>
          <p>{decisions[decision].description}</p>
          <button
            className={decision === "delete" ? styles.danger : styles.primary}
            type="button"
            onClick={save}
            disabled={pending}
          >
            {pending ? "Saving…" : decisions[decision].confirm}
          </button>
          <button
            className={styles.secondary}
            type="button"
            disabled={pending}
            onClick={() => {
              setDecision(null);
              setError("");
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            className={styles.primary}
            type="button"
            onClick={() => setDecision("approve")}
          >
            {decisions.approve.label}
          </button>
          <button
            className={styles.secondary}
            type="button"
            onClick={() => setDecision("decline")}
          >
            {decisions.decline.label}
          </button>
          <button
            className={styles.danger}
            type="button"
            onClick={() => setDecision("delete")}
          >
            {decisions.delete.label}
          </button>
        </>
      )}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
