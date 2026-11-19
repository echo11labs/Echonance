"use client";

import { useUser } from "@clerk/nextjs";
import { Check, X } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { isClerkConfigured } from "./auth-provider";
import styles from "./waitlist-modal.module.css";

function ClerkEmailSync({
  onResolvedEmail,
}: {
  onResolvedEmail: (email: string) => void;
}) {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    const clerkEmail =
      user.primaryEmailAddress?.emailAddress ??
      user.emailAddresses?.[0]?.emailAddress;
    if (clerkEmail) {
      onResolvedEmail(clerkEmail.trim().toLowerCase());
    }
  }, [isLoaded, isSignedIn, user, onResolvedEmail]);

  return null;
}

function loadFallbackProfileEmail(): string {
  if (typeof window === "undefined") return "";
  try {
    const raw = window.localStorage.getItem("taxora_ca_contributor_profile_v1");
    if (!raw) return "";
    const parsed = JSON.parse(raw) as { email?: string };
    return parsed?.email ? parsed.email.trim().toLowerCase() : "";
  } catch {
    return "";
  }
}

export const WAITLIST_STORAGE_KEY = "taxora_model_waitlist_v1";

export interface StoredWaitlistPass {
  id: string;
  ticketId: string;
  cohort: string;
  fullName: string;
  email: string;
  role: string;
  organization?: string;
  useCases: string[];
  joinedAt: string;
}

export function loadStoredWaitlistPass(): StoredWaitlistPass | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(WAITLIST_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredWaitlistPass;
    if (!parsed?.email || !parsed.ticketId) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveStoredWaitlistPass(pass: StoredWaitlistPass): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(pass));
  } catch {
    // Ignore storage quota errors
  }
}

export interface WaitlistModalProps {
  open: boolean;
  reason?: "limit_reached" | "direct";
  initialPassCode?: string | null;
  onClose: () => void;
  onPassUpdated?: (pass: StoredWaitlistPass) => void;
}

function EditorialAnalystIllustration() {
  return (
    <svg
      className={styles.illustrationSvg}
      viewBox="0 0 360 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Editorial line art of a tax analyst working with statutory intelligence boards"
    >
      <title>Taxora Legal-1 Editorial Illustration</title>

      {/* Top-Left Bar Chart Board */}
      <g>
        <rect
          x="104"
          y="26"
          width="102"
          height="66"
          rx="6"
          fill="#ffffff"
          stroke="#111312"
          strokeWidth="1.7"
        />
        <rect
          x="108"
          y="30"
          width="94"
          height="58"
          rx="4"
          fill="#ffffff"
          stroke="#111312"
          strokeWidth="1.1"
        />
        <line
          x1="120"
          y1="44"
          x2="120"
          y2="78"
          stroke="#111312"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <line
          x1="133"
          y1="58"
          x2="133"
          y2="78"
          stroke="#111312"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <line
          x1="146"
          y1="64"
          x2="146"
          y2="78"
          stroke="#111312"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <line
          x1="160"
          y1="48"
          x2="160"
          y2="78"
          stroke="#111312"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <line
          x1="173"
          y1="67"
          x2="173"
          y2="78"
          stroke="#111312"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <line
          x1="186"
          y1="52"
          x2="186"
          y2="78"
          stroke="#111312"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <line
          x1="115"
          y1="78"
          x2="194"
          y2="78"
          stroke="#111312"
          strokeWidth="1.3"
        />
      </g>

      {/* Top-Right Compact Pill Widget */}
      <g>
        <rect
          x="224"
          y="16"
          width="74"
          height="28"
          rx="5"
          fill="#ffffff"
          stroke="#111312"
          strokeWidth="1.6"
        />
        <circle cx="240" cy="30" r="6.5" stroke="#111312" strokeWidth="1.6" />
        <path d="M240 24.5V30H245.5" stroke="#111312" strokeWidth="1.5" />
        <line
          x1="255"
          y1="26"
          x2="284"
          y2="26"
          stroke="#111312"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="255"
          y1="31"
          x2="280"
          y2="31"
          stroke="#111312"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="255"
          y1="36"
          x2="274"
          y2="36"
          stroke="#111312"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>

      {/* Left Analytics Card */}
      <g>
        <rect
          x="42"
          y="96"
          width="98"
          height="78"
          rx="7"
          fill="#ffffff"
          stroke="#111312"
          strokeWidth="1.7"
        />
        <circle cx="63" cy="117" r="10" fill="#111312" />
        <path
          d="M58.5 113.5L63 118L68.5 111.5"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="56,148 68,136 78,144 92,130 105,135 120,121"
          stroke="#111312"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="56"
          y1="158"
          x2="112"
          y2="158"
          stroke="#111312"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </g>

      {/* Right Statutory Curve Card */}
      <g>
        <rect
          x="236"
          y="74"
          width="86"
          height="76"
          rx="7"
          fill="#ffffff"
          stroke="#111312"
          strokeWidth="1.7"
        />
        <line
          x1="250"
          y1="92"
          x2="250"
          y2="134"
          stroke="#111312"
          strokeWidth="1.4"
        />
        <line
          x1="250"
          y1="134"
          x2="306"
          y2="134"
          stroke="#111312"
          strokeWidth="1.4"
        />
        <path
          d="M253 126C262 126 266 104 275 104C284 104 287 120 295 118C301 116 303 98 307 95"
          stroke="#111312"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </g>

      {/* Botanical Leaf Accent (Bottom-Right) */}
      <g>
        <path
          d="M254 246C258 214 277 186 304 166C298 198 286 226 268 247"
          fill="#ffffff"
          stroke="#111312"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M262 246C276 224 294 206 318 196C308 220 291 237 270 248"
          fill="#ffffff"
          stroke="#111312"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M248 244C244 218 252 192 268 172C267 198 261 223 254 246"
          fill="#ffffff"
          stroke="#111312"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </g>

      {/* Lounge Chair */}
      <path
        d="M150 182C136 184 128 198 131 215C134 233 152 243 184 243C222 243 245 232 249 208C252 190 242 178 226 178"
        fill="#ffffff"
        stroke="#111312"
        strokeWidth="1.7"
      />
      <line
        x1="154"
        y1="241"
        x2="147"
        y2="268"
        stroke="#111312"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="224"
        y1="239"
        x2="232"
        y2="268"
        stroke="#111312"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Seated Analyst Figure */}
      {/* Head & Hair/Headscarf */}
      <path
        d="M180 108C180 96 190 88 201 88C213 88 221 97 221 110C221 122 215 132 204 134L182 132C180 124 180 116 180 108Z"
        fill="#ffffff"
        stroke="#111312"
        strokeWidth="1.7"
      />
      <path
        d="M196 96C190 96 186 101 186 108C186 116 191 121 198 121C204 121 208 116 208 108C208 101 203 96 196 96Z"
        fill="#ffffff"
        stroke="#111312"
        strokeWidth="1.6"
      />
      {/* Face details */}
      <circle cx="192" cy="107" r="1.2" fill="#111312" />
      <circle cx="200" cy="107" r="1.2" fill="#111312" />
      <path
        d="M193 113C195 114.5 198 114.5 200 113"
        stroke="#111312"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* Torso / Jacket */}
      <path
        d="M170 142C174 132 186 128 202 128C220 128 234 138 237 158C239 174 231 192 216 196L172 192C168 176 167 156 170 142Z"
        fill="#ffffff"
        stroke="#111312"
        strokeWidth="1.7"
      />

      {/* Trousers (Solid Deep Ink Contrast like Reference 2) */}
      <path
        d="M196 188C172 188 148 190 134 198L108 242L126 250L154 214C162 226 166 244 168 258H188C188 234 192 212 212 204C224 198 222 188 196 188Z"
        fill="#111312"
      />

      {/* Shoes */}
      <path
        d="M106 244L90 253C88 254 89 258 93 258H116L121 248L106 244Z"
        fill="#ffffff"
        stroke="#111312"
        strokeWidth="1.6"
      />
      <path
        d="M168 258L154 270C152 272 154 275 158 275H182V258H168Z"
        fill="#ffffff"
        stroke="#111312"
        strokeWidth="1.6"
      />

      {/* Laptop on Lap */}
      <path
        d="M132 146H188L198 184H142L132 146Z"
        fill="#ffffff"
        stroke="#111312"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="164" cy="165" r="3.2" stroke="#111312" strokeWidth="1.4" />
      <line
        x1="140"
        y1="184"
        x2="210"
        y2="184"
        stroke="#111312"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArchitecturalBarcode() {
  const bars = [
    2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2,
  ];
  let x = 0;
  return (
    <div className={styles.barcodeBlock} aria-hidden="true">
      <svg
        className={styles.barcodeSvg}
        viewBox="0 0 112 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Model Cohort Serial Barcode</title>
        {bars.map((w, idx) => {
          const barX = x;
          x += w + 1.8;
          return (
            <rect
              // biome-ignore lint/suspicious/noArrayIndexKey: Static decorative barcode bars
              key={`bar-${idx}`}
              x={barX}
              y={0}
              width={w}
              height={18}
              fill="#111312"
            />
          );
        })}
      </svg>
      <span className={styles.barcodeCaption}>TXR-LEGAL-1 • COHORT 01</span>
    </div>
  );
}

export function WaitlistModal({
  open,
  reason = "direct",
  initialPassCode = null,
  onClose,
  onPassUpdated,
}: WaitlistModalProps) {
  const [savedPass, setSavedPass] = useState<StoredWaitlistPass | null>(null);
  const [isEditingPass, setIsEditingPass] = useState(false);
  const [email, setEmail] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) return;
    const existing = loadStoredWaitlistPass();
    setSavedPass(existing);
    setIsEditingPass(false);
    setCopiedCode(false);
    setErrorMsg("");
    if (existing?.email) {
      setEmail(existing.email);
    } else if (authEmail) {
      setEmail(authEmail);
    } else {
      const fallbackEmail = loadFallbackProfileEmail();
      if (fallbackEmail) {
        setEmail(fallbackEmail);
      }
    }
  }, [open, authEmail]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const trimmedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          source: reason === "limit_reached" ? "session_limit" : "sidebar_cta",
        }),
      });

      const data = await response.json();
      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Could not complete registration.");
      }

      const pass: StoredWaitlistPass = data.entry;
      saveStoredWaitlistPass(pass);
      setSavedPass(pass);
      setIsEditingPass(false);
      onPassUpdated?.(pass);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Unable to submit right now. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const activeTicketId = savedPass?.ticketId ?? initialPassCode ?? null;
  const showConfirmedPass = Boolean(activeTicketId && !isEditingPass);
  const clerkEnabled = isClerkConfigured();

  function handleCopyTicket(code: string) {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedCode(true);
        window.setTimeout(() => setCopiedCode(false), 2000);
      })
      .catch(() => {});
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Modal backdrop dismissal on outside click
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape key listener is bound on window
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {clerkEnabled && (
        <ClerkEmailSync
          onResolvedEmail={(resolved) => {
            setAuthEmail(resolved);
            setEmail((prev) => prev || resolved);
          }}
        />
      )}
      <div
        className={styles.frame}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-modal-title"
      >
        <div className={styles.card}>
          {/* Left Editorial Split Panel */}
          <div className={styles.leftPanel}>
            <div className={styles.brandRow}>
              <div className={styles.brand}>
                <span className={styles.brandBadge} aria-hidden="true">
                  <svg viewBox="0 0 18 18" width="14" height="14" fill="none">
                    <title>Taxora Emblem</title>
                    <path
                      d="M4 9.5L7.5 13L14 5.5"
                      stroke="#ffffff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Taxora</span>
              </div>

              <button
                type="button"
                className={`${styles.closeBtn} ${styles.mobileCloseBtn}`}
                onClick={onClose}
                aria-label="Close waitlist modal"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.mainCopy}>
              <span className={styles.pillTag}>
                <span className={styles.pillDot} aria-hidden="true" />
                <span>
                  {reason === "limit_reached"
                    ? "3/3 FREE CHATS REACHED • EARLY ACCESS"
                    : "UPCOMING MODEL • TAXORA LEGAL-1"}
                </span>
              </span>

              <h2 id="waitlist-modal-title" className={styles.headline}>
                Turn Nepal tax law into smart decisions
              </h2>

              <p className={styles.description}>
                {reason === "limit_reached"
                  ? "You’ve used all 3 preview chat sessions. Join the waitlist for our proprietary Nepal tax foundation model and unlock unlimited workspaces."
                  : "Harness our own well-trained Nepal tax foundation model built on Finance Acts, IRD circulars, and ICAN audits to drive exact statutory decisions."}
              </p>

              {showConfirmedPass && activeTicketId ? (
                <div className={styles.confirmedBox}>
                  <div className={styles.confirmedTop}>
                    <span className={styles.confirmedBadge}>
                      <Check size={14} aria-hidden="true" />
                      <span>Early Access Reserved</span>
                    </span>
                    <div className={styles.ticketActionsGroup}>
                      <span className={styles.ticketCode}>
                        {activeTicketId}
                      </span>
                      <button
                        type="button"
                        className={styles.copyCodeBtn}
                        onClick={() => handleCopyTicket(activeTicketId)}
                      >
                        {copiedCode ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <p className={styles.confirmedEmail}>
                    {savedPass?.email ? (
                      <>
                        Priority invite registered for{" "}
                        <strong>{savedPass.email}</strong>.
                      </>
                    ) : (
                      "Your waitlist pass is ready to copy or update below."
                    )}
                  </p>
                  <div className={styles.confirmedActions}>
                    <button
                      type="button"
                      className={styles.changeEmailBtn}
                      onClick={() => setIsEditingPass(true)}
                    >
                      {savedPass?.email
                        ? "Change email"
                        : "Use a different email"}
                    </button>
                    <button
                      type="button"
                      className={styles.continueBtn}
                      onClick={onClose}
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <form
                    className={styles.inlineForm}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className={styles.emailInputWrap}>
                      <input
                        type="email"
                        className={styles.emailInput}
                        placeholder="name@domain.com"
                        aria-label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <button
                      type="submit"
                      className={styles.joinBtn}
                      disabled={submitting}
                    >
                      {submitting ? "Joining…" : "Join now"}
                    </button>
                  </form>

                  {errorMsg && (
                    <p className={styles.errorText} role="alert">
                      {errorMsg}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className={styles.footerMeta}>
              <span>© 2026 Taxora — All rights reserved.</span>
              <span>
                Trained on <strong>Nepal Acts, Rajpatra & ICAN Audits</strong>.
              </span>
            </div>
          </div>

          {/* Right Architectural Grid & Monochrome Line-Art Panel */}
          <div className={styles.rightPanel}>
            <div className={styles.rightTopBar}>
              <ArchitecturalBarcode />

              <button
                type="button"
                className={`${styles.closeBtn} ${styles.desktopCloseBtn}`}
                onClick={onClose}
                aria-label="Close waitlist modal"
                title="Close"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.illustrationWrap}>
              <EditorialAnalystIllustration />
            </div>

            <div className={styles.rightBottomNote}>
              <div>
                <span className={styles.modelSpecLabel}>Taxora Legal-1</span>
                <span> • Sovereign Tax Model</span>
              </div>
              <span className={styles.stars} aria-hidden="true">
                ★★★★
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitlistModal;
