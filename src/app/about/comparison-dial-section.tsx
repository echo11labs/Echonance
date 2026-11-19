"use client";

import {
  BookOpenCheck,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { SphereAnimation } from "@/components/sphere-animation";
import type { AboutCopy } from "./about-i18n";
import aboutStyles from "./about.module.css";
import styles from "./comparison-dial.module.css";

const ADVANTAGE_ICONS: Record<string, typeof ShieldCheck> = {
  precision: ShieldCheck,
  citations: FileCheck2,
  "finance-bill": RefreshCw,
  "ca-audited": BookOpenCheck,
};

export function ComparisonDialSection({ copy }: { copy: AboutCopy }) {
  const [showFullMatrix, setShowFullMatrix] = useState(true);

  return (
    <section
      className={styles.comparisonSection}
      aria-labelledby="comparison-dial-heading"
    >
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.titleGroup}>
          <span className={styles.stepNumber}>02</span>
          <h2 id="comparison-dial-heading" className={styles.sectionHeading}>
            {copy.comparisonHeading}
          </h2>
        </div>

        <svg
          className={styles.ringIndicator}
          viewBox="0 0 36 36"
          aria-hidden="true"
        >
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="3.5"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="#00df81"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="88"
            initial={{ strokeDashoffset: 68 }}
            animate={{ strokeDashoffset: [68, 22, 68] }}
            transition={{
              duration: 5.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            transform="rotate(-90 18 18)"
          />
        </svg>
      </div>

      <p className={styles.subLead}>{copy.comparisonSubLead}</p>

      {/* 3-Column Stage with Centered Contributor Sphere */}
      <div className={styles.stageContainer}>
        {/* Left Column: Other AI Limitations */}
        <div className={styles.leftColumn}>
          <span className={styles.columnGroupLabelOther}>
            {copy.colOtherAi}
          </span>
          {copy.limitations.map((item) => (
            <div key={item.id} className={styles.calloutLeft}>
              <div className={styles.calloutLeftBody}>
                <span className={styles.calloutMetric}>{item.metric}</span>
                <p className={styles.calloutDesc}>{item.description}</p>
                <span className={styles.calloutTag}>{item.pill}</span>
              </div>
              <span className={styles.connectorLeft} aria-hidden="true">
                <span className={styles.connectorLineLeft} />
                <span className={styles.connectorDotLeft} />
              </span>
            </div>
          ))}
        </div>

        {/* Centerpiece: Contributor Sphere Animation */}
        <div className={styles.centerCubeWrap} aria-hidden="true">
          <div className={styles.sphereFrame}>
            <div className={styles.cubeAmbientGlow} />
            <div className={styles.sphereStageCenter}>
              <SphereAnimation size={220} showParticles />
            </div>
          </div>
          <span className={styles.cubeCaption}>{copy.sphereCaption}</span>
        </div>

        {/* Right Column: Taxora Advantages */}
        <div className={styles.rightColumn}>
          <span className={styles.columnGroupLabelTaxora}>
            {copy.colTaxora}
          </span>
          {copy.advantages.map((card) => {
            const Icon = ADVANTAGE_ICONS[card.id] ?? ShieldCheck;
            return (
              <div key={card.id} className={styles.calloutRight}>
                <span className={styles.connectorRight} aria-hidden="true">
                  <span className={styles.connectorDotRight} />
                  <span className={styles.connectorLineRight} />
                </span>
                <span className={styles.calloutIconNode} aria-hidden="true">
                  <Icon size={15} strokeWidth={2.2} />
                </span>
                <div className={styles.calloutRightText}>
                  <span className={styles.calloutRightTitle}>{card.title}</span>
                  <span className={styles.calloutRightSub}>
                    {card.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Side-by-Side Comparison Matrix */}
      <div className={styles.matrixCard}>
        <div className={styles.matrixHeader}>
          <h3 className={styles.matrixTitle}>{copy.matrixTitle}</h3>
          <button
            type="button"
            className={styles.matrixToggleBtn}
            onClick={() => setShowFullMatrix((prev) => !prev)}
            aria-expanded={showFullMatrix}
          >
            <span>{showFullMatrix ? copy.hideMatrix : copy.showMatrix}</span>
            {showFullMatrix ? (
              <ChevronUp size={14} aria-hidden="true" />
            ) : (
              <ChevronDown size={14} aria-hidden="true" />
            )}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showFullMatrix && (
            <motion.div
              className={aboutStyles.comparisonTableWrap}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <table className={aboutStyles.comparisonTable}>
                <caption className={aboutStyles.comparisonCaption}>
                  {copy.matrixCaption}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">{copy.colDimension}</th>
                    <th scope="col">
                      {copy.colOtherAi}
                      <span>{copy.colOtherAiSub}</span>
                    </th>
                    <th scope="col">
                      {copy.colTaxora}
                      <span>{copy.colTaxoraSub}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {copy.matrixRows.map((row) => (
                    <tr key={row.dimension}>
                      <th scope="row">{row.dimension}</th>
                      <td>{row.otherAi}</td>
                      <td>{row.taxora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={aboutStyles.comparisonNote}>
                {copy.matrixNotePrefix}
                <Link href="/tax-law-library">{copy.matrixNoteLink}</Link>
                {copy.matrixNoteSuffix}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ComparisonDialSection;
