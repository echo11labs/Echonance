"use client";

import { BookOpenCheck, Scale, ShieldCheck } from "lucide-react";
import type { MouseEvent } from "react";
import type { PrincipleCopy } from "./about-i18n";
import styles from "./about.module.css";

const PRINCIPLE_ICONS: Record<string, typeof ShieldCheck> = {
  "statutory-precision": ShieldCheck,
  "source-grounding": BookOpenCheck,
  "ca-audited": Scale,
};

function handleGlassMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
}

export function InteractivePrincipleCards({
  items,
}: {
  items: readonly PrincipleCopy[];
}) {
  return (
    <div className={styles.glassGridStage}>
      <div className={styles.glassAmbientOrbLeft} aria-hidden="true" />
      <div className={styles.glassAmbientOrbRight} aria-hidden="true" />

      <div className={styles.principlesGrid}>
        {items.map((item) => {
          const Icon = PRINCIPLE_ICONS[item.id] ?? ShieldCheck;
          return (
            <article
              key={item.id}
              className={styles.principleCard}
              onMouseMove={handleGlassMove}
            >
              <div className={styles.glassSpecularRim} aria-hidden="true" />
              <div className={styles.glassIconCapsule} aria-hidden="true">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <div className={styles.cardBodyContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default InteractivePrincipleCards;
