"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CONTRIBUTE_COPY,
  type ContributeLocale,
} from "@/components/contribute/contribute-i18n";
import styles from "./tax-reference-view.module.css";

interface TaxReferenceViewProps {
  onBack: () => void;
  locale?: ContributeLocale;
  onLocaleChange?: (locale: ContributeLocale) => void;
}

export function TaxReferenceView({
  onBack,
  locale = "en",
  onLocaleChange,
}: TaxReferenceViewProps) {
  const copy = CONTRIBUTE_COPY[locale];
  const refCopy = copy.referenceView;
  const [selectedId, setSelectedId] = useState(refCopy.samples[0].id);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onBack();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onBack]);

  const activeSample =
    refCopy.samples.find((s) => s.id === selectedId) ?? refCopy.samples[0];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button type="button" className={styles.backBtn} onClick={onBack}>
            <ArrowLeft size={14} />
            <span>{refCopy.backBtn}</span>
          </button>

          {onLocaleChange && (
            <fieldset
              className={styles.localeToggle}
              aria-label={copy.header.localeToggleLabel}
            >
              <button
                type="button"
                className={`${styles.localeBtn} ${locale === "en" ? styles.localeBtnActive : ""}`}
                onClick={() => onLocaleChange("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={`${styles.localeBtn} ${locale === "np" ? styles.localeBtnActive : ""}`}
                onClick={() => onLocaleChange("np")}
              >
                नेपाली
              </button>
            </fieldset>
          )}
        </div>
      </header>

      <div className={styles.workspace}>
        <aside className={styles.rail}>
          <div>
            <h2 className={styles.railGroupTitle}>
              {refCopy.sampleFilingsTitle}
            </h2>
            <nav className={styles.navList} aria-label={refCopy.sampleNavAria}>
              {refCopy.samples.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  className={`${styles.navItem} ${sample.id === activeSample.id ? styles.navItemActive : ""}`}
                  onClick={() => setSelectedId(sample.id)}
                >
                  {sample.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h2 className={styles.railGroupTitle}>
              {refCopy.officialSourcesTitle}
            </h2>
            <div className={styles.sourceList}>
              {refCopy.sources.map((src) => (
                <a
                  key={src.domain}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sourceLink}
                >
                  <span className={styles.sourceName}>
                    <span>{src.name}</span>
                    <ArrowUpRight size={12} />
                  </span>
                  <span className={styles.sourceDomain}>{src.domain}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>

        <main className={styles.reader}>
          <p className={styles.readerIntro}>{refCopy.readerIntro}</p>

          <div className={styles.metaRow}>
            <span>
              {copy.categories[activeSample.category]} &middot;{" "}
              {refCopy.fyPrefix} {activeSample.fiscalYear}
            </span>
            <span>{activeSample.provision}</span>
          </div>

          <div className={styles.topicLabel}>{activeSample.topic}</div>
          <h1 className={styles.question}>{activeSample.question}</h1>

          <hr className={styles.rule} />

          <p className={styles.answer}>{activeSample.answer}</p>

          <footer className={styles.footnote}>
            <span>
              {refCopy.authorityPrefix}: {activeSample.authority}
            </span>
            <span>
              {refCopy.keywordsPrefix}: {activeSample.keywords}
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
