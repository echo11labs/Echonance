"use client";

import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/noto-sans-devanagari";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  type ChatSessionSummary,
  loadStoredSessions,
  summarizeSession,
} from "@/lib/chat-sessions";
import { ABOUT_COPY, type AboutLocale } from "./about-i18n";
import styles from "./about.module.css";
import { ComparisonDialSection } from "./comparison-dial-section";
import { InteractivePrincipleCards } from "./interactive-principle-cards";

export default function About() {
  const [collapsed, setCollapsed] = useState(false);
  const [savedSessions, setSavedSessions] = useState<ChatSessionSummary[]>([]);
  const [locale, setLocale] = useState<AboutLocale>("np");

  useEffect(() => {
    setSavedSessions(loadStoredSessions().map(summarizeSession));
  }, []);

  const copy = ABOUT_COPY[locale];

  return (
    <div className={styles.shell} data-collapsed={collapsed} lang={locale}>
      {/* Shared Canonical App Sidebar */}
      <AppSidebar
        current="about"
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        sessions={savedSessions}
      />

      <main className={styles.main} id="main-content">
        <div className={styles.contentWrapper}>
          {/* ========================================================
             1. HERO CARD (NURA STYLE)
             ======================================================== */}
          <section className={styles.heroCard} aria-label={copy.heroTitle}>
            <div className={styles.heroCardBackdrop} aria-hidden="true">
              <Image
                src="/images/about-hero-studio.jpg"
                alt=""
                fill
                className={styles.heroCardImage}
                priority
              />
              <div className={styles.heroCardOverlay} />
            </div>

            <div className={styles.heroCardContent}>
              <div className={styles.heroCardTopBar}>
                <div className={styles.brandMark}>TAXORA</div>
                <div className={styles.heroTopActions}>
                  <button
                    type="button"
                    className={styles.langToggleBtn}
                    onClick={() =>
                      setLocale((prev) => (prev === "np" ? "en" : "np"))
                    }
                    aria-label={
                      locale === "np" ? "Switch to English" : "नेपालीमा हेर्नुहोस्"
                    }
                  >
                    {locale === "np" ? "English" : "नेपाली"}
                  </button>
                  <Link
                    href="/"
                    className={styles.heroReturnBtn}
                    title={copy.backToAssistant}
                    aria-label={copy.backToAssistant}
                  >
                    <ArrowLeft size={14} aria-hidden="true" />
                    <span className={styles.heroReturnText}>
                      {copy.backToAssistant}
                    </span>
                  </Link>
                </div>
              </div>

              <h1 className={styles.heroDisplayTitle}>{copy.heroTitle}</h1>

              <div className={styles.heroCardBottomSpacer} aria-hidden="true" />
            </div>
          </section>

          {/* Product differentiation */}
          <section
            className={styles.principlesContainer}
            aria-labelledby="why-taxora"
          >
            <div className={styles.principlesHeader}>
              <span className={styles.comparisonEyebrow}>
                {copy.whyEyebrow}
              </span>
              <h2 id="why-taxora" className={styles.principlesLead}>
                {copy.whyLeadLine1}
                <br />
                {copy.whyLeadLine2}
              </h2>
              <p className={styles.comparisonIntro}>{copy.whyIntro}</p>
            </div>

            <InteractivePrincipleCards items={copy.principles} />

            <div className={styles.comparisonExample}>
              <div>
                <span className={styles.comparisonEyebrow}>
                  {copy.exampleEyebrow}
                </span>
                <p>{copy.exampleQuote}</p>
              </div>
              <Link href="/tax-law-library" className={styles.secondaryCtaBtn}>
                {copy.exampleCta}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </section>

          {/* Animated Contributor-Sphere Comparison: Other AI vs. Taxora */}
          <ComparisonDialSection copy={copy} />

          {/* ========================================================
             3. BOTTOM CALL TO ACTION
             ======================================================== */}
          <footer className={styles.ctaSection}>
            <div className={styles.ctaTextGroup}>
              <h3 className={styles.ctaTitle}>{copy.ctaTitle}</h3>
              <p className={styles.ctaDesc}>{copy.ctaDesc}</p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/" className={styles.primaryCtaBtn}>
                <span>{copy.ctaPrimary}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/tax-law-library" className={styles.secondaryCtaBtn}>
                <span>{copy.ctaSecondary}</span>
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
