"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./app-splash.module.css";

const SPLASH_SESSION_KEY = "taxora_splash_seen";

export function AppSplash() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SPLASH_SESSION_KEY)) {
        return;
      }
      sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    } catch {
      // Ignore storage restrictions
    }

    setVisible(true);
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const durationMs = prefersReduced ? 450 : 1750;

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-label="Loading Taxora Beta"
        >
          <div className={styles.centerStack}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/taxora-logo.png"
                alt="Taxora"
                width={156}
                height={156}
                className={styles.logoImage}
                priority
              />
            </motion.div>

            <motion.div
              className={styles.versionBlock}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.38,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.span
                className={styles.brandTitle}
                initial={{ letterSpacing: "0.42em", opacity: 0 }}
                animate={{ letterSpacing: "0.28em", opacity: 1 }}
                transition={{
                  duration: 0.65,
                  delay: 0.38,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                TAXORA
              </motion.span>
              <motion.span
                className={styles.versionLine}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.62,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span>v0.1.0</span>
                <span className={styles.betaTag}>
                  <span className={styles.betaDot} aria-hidden="true" />
                  BETA
                </span>
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
