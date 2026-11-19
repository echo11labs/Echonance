"use client";

import { type DriveStep, type Driver, driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect, useRef } from "react";
import {
  CONTRIBUTE_COPY,
  type ContributeLocale,
  type WalkthroughCopyStep,
} from "@/components/contribute/contribute-i18n";
import "./contributor-walkthrough.css";

export type WalkthroughStep = WalkthroughCopyStep;

interface ContributorWalkthroughProps {
  isOpen: boolean;
  locale?: ContributeLocale;
  onClose: () => void;
  onStepFocus?: (step: WalkthroughStep) => void;
  onOpenSamples?: () => void;
}

export function ContributorWalkthrough({
  isOpen,
  locale = "en",
  onClose,
  onStepFocus,
  onOpenSamples,
}: ContributorWalkthroughProps) {
  const driverRef = useRef<Driver | null>(null);
  const onCloseRef = useRef(onClose);
  const onStepFocusRef = useRef(onStepFocus);
  const onOpenSamplesRef = useRef(onOpenSamples);
  const cleanupFromPropRef = useRef(false);

  onCloseRef.current = onClose;
  onStepFocusRef.current = onStepFocus;
  onOpenSamplesRef.current = onOpenSamples;

  useEffect(() => {
    if (!isOpen) {
      if (driverRef.current?.isActive()) {
        cleanupFromPropRef.current = true;
        driverRef.current.destroy();
      }
      driverRef.current = null;
      return;
    }

    const walkthroughCopy = CONTRIBUTE_COPY[locale].walkthrough;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    cleanupFromPropRef.current = false;

    const steps: DriveStep[] = walkthroughCopy.steps.map((step) => ({
      element: step.targetId ? `#${step.targetId}` : undefined,
      waitForElement: 250,
      onHighlightStarted: (element) => {
        if (isMobile && element instanceof HTMLElement) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        onStepFocusRef.current?.(step);
      },
      popover: {
        title: step.title,
        description: step.description,
        side: isMobile ? (step.targetId ? "bottom" : undefined) : step.side,
        align: isMobile ? "center" : step.align,
        onPopoverRender: (popover, { state, driver: driverInstance }) => {
          const guideHeader = document.createElement("div");
          guideHeader.className = "taxora-ora-guide-header";

          const avatar = document.createElement("img");
          avatar.src = "/images/ca-ora-mascot.jpg";
          avatar.alt = walkthroughCopy.badge;
          avatar.width = 48;
          avatar.height = 48;
          avatar.className = "taxora-ora-avatar";

          const meta = document.createElement("div");
          meta.className = "taxora-ora-meta";

          const badge = document.createElement("span");
          badge.className = "taxora-ora-badge";
          badge.textContent = walkthroughCopy.badge;

          const role = document.createElement("span");
          role.className = "taxora-ora-role";
          role.textContent = walkthroughCopy.role;

          meta.append(badge, role);
          guideHeader.append(avatar, meta);
          popover.wrapper.insertBefore(guideHeader, popover.title);

          const bestBox = document.createElement("div");
          bestBox.className = "taxora-ora-best-box";

          const bestLabel = document.createElement("span");
          bestLabel.className = "taxora-ora-best-label";
          bestLabel.textContent = step.bestPracticeTitle;

          const bestText = document.createElement("p");
          bestText.className = "taxora-ora-best-text";
          bestText.textContent = step.bestPractice;

          bestBox.append(bestLabel, bestText);
          popover.description.appendChild(bestBox);

          const isLastStep =
            state.activeIndex === walkthroughCopy.steps.length - 1;
          if (isLastStep && onOpenSamplesRef.current) {
            const samplesBtn = document.createElement("button");
            samplesBtn.type = "button";
            samplesBtn.className = "taxora-ora-samples-btn";
            samplesBtn.textContent = walkthroughCopy.viewSamplesBtn;
            samplesBtn.addEventListener("click", () => {
              driverInstance.destroy();
              onOpenSamplesRef.current?.();
            });
            popover.footerButtons.prepend(samplesBtn);
          }
        },
      },
    }));

    const tour = driver({
      steps,
      animate: true,
      duration: 280,
      smoothScroll: true,
      allowClose: true,
      allowKeyboardControl: true,
      overlayClickBehavior: "close",
      overlayColor: "#060807",
      overlayOpacity: 0.8,
      stagePadding: isMobile ? 6 : 14,
      stageRadius: 10,
      popoverOffset: isMobile ? 12 : 24,
      popoverClass: "taxora-ora-popover",
      showButtons: ["previous", "next", "close"],
      showProgress: true,
      progressText: walkthroughCopy.progressText,
      prevBtnText: walkthroughCopy.prevBtn,
      nextBtnText: walkthroughCopy.nextBtn,
      doneBtnText: walkthroughCopy.doneBtn,
      closeBtnLabel: walkthroughCopy.closeAria,
      onDestroyed: () => {
        driverRef.current = null;
        if (!cleanupFromPropRef.current) {
          onCloseRef.current();
        }
      },
    });

    driverRef.current = tour;
    tour.drive(0);

    return () => {
      cleanupFromPropRef.current = true;
      if (tour.isActive()) {
        tour.destroy();
      }
      driverRef.current = null;
    };
  }, [isOpen, locale]);

  return null;
}
