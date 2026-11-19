"use client";

import { ArrowRight, LogIn, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import styles from "./session-limit-modal.module.css";

interface SessionLimitModalProps {
  open: boolean;
  hasSessions: boolean;
  onClose: () => void;
  onSignIn: () => void;
  onDeleteAndRestart: () => void;
}

export function SessionLimitModal({
  open,
  hasSessions,
  onClose,
  onSignIn,
  onDeleteAndRestart,
}: SessionLimitModalProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <button
        type="button"
        className={styles.backdropDismiss}
        aria-label="Keep continuing current session"
        onClick={onClose}
      />
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="session-limit-modal-title"
      >
        <div className={styles.header}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            <span>1 / 1 Guest Session Used</span>
          </span>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        <h2 id="session-limit-modal-title" className={styles.title}>
          Sign in to unlock 2 more sessions
        </h2>
        <p className={styles.description}>
          Guest mode includes 1 active research session. Sign in to unlock 2
          additional sessions (3 total), delete your current session to start
          over, or keep continuing in this chat.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={onSignIn}
          >
            <LogIn size={15} aria-hidden="true" />
            <span>Sign in for 2 more sessions</span>
          </button>

          {hasSessions && (
            <button
              type="button"
              className={styles.dangerBtn}
              onClick={onDeleteAndRestart}
            >
              <Trash2 size={15} aria-hidden="true" />
              <span>Delete current session &amp; start over</span>
            </button>
          )}

          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={onClose}
          >
            <span>Keep continuing</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
