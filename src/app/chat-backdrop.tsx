"use client";

import { useEffect, useRef } from "react";
import styles from "./dashboard.module.css";

const wordmark = "Taxora";
const hoverRadius = 132;

type Particle = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  seed: number;
  size: number;
  highlight: number;
};

interface ChatBackdropProps {
  isVoiceActive?: boolean;
  voiceLevel?: number;
}

export default function ChatBackdrop({
  isVoiceActive = false,
  voiceLevel = 0,
}: ChatBackdropProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const isVoiceActiveRef = useRef(isVoiceActive);
  isVoiceActiveRef.current = isVoiceActive;
  const voiceLevelRef = useRef(voiceLevel);
  voiceLevelRef.current = voiceLevel;
  const requestDrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const anchor = canvas?.parentElement;
    const surface = canvas?.closest("main");
    const context = canvas?.getContext("2d");
    const sample = document.createElement("canvas").getContext("2d", {
      willReadFrequently: true,
    });
    if (!canvas || !anchor || !surface || !context || !sample) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const palette = getComputedStyle(canvas);
    const meadow = palette.getPropertyValue("--meadow").trim() || "#2cc295";
    const mint = palette.getPropertyValue("--accent").trim() || "#00df81";
    let particles: Particle[] = [];
    let wordBounds: {
      left: number;
      right: number;
      top: number;
      bottom: number;
      originX: number;
      originY: number;
      font: string;
    };
    let pointer: { x: number; y: number } | undefined;
    let frame = 0;
    let lastDraw = 0;
    let settling = false;
    let width = 0;
    let height = 0;
    let mounted = true;
    let initialized = false;
    let smoothedLevel = 0;
    let voiceColorBlend = 0;

    const draw = (time?: number) => {
      const { left, top, right, bottom } = wordBounds;
      context.clearRect(0, 0, width, height);

      let primaryFill: string | CanvasGradient = mint;
      let secondaryFill: string | CanvasGradient = meadow;

      if (voiceColorBlend > 0.04 && time !== undefined) {
        // High-end Harmonic Acoustic Spectrum:
        // Electric Cyan -> Vivid Cerulean -> Royal Acoustic Cobalt -> Luminous Emerald Mint
        const angle = time * 0.0008;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const cx = (left + right) / 2;
        const cy = (top + bottom) / 2;
        const len = (right - left) * 0.65;

        const gx0 = cx - cos * len;
        const gy0 = cy - sin * len;
        const gx1 = cx + cos * len;
        const gy1 = cy + sin * len;

        const voiceGrad = context.createLinearGradient(gx0, gy0, gx1, gy1);
        voiceGrad.addColorStop(0.0, "#00f0ff"); // Electric Cyan
        voiceGrad.addColorStop(0.28, "#38bdf8"); // Vivid Sky Cerulean
        voiceGrad.addColorStop(0.55, "#2563eb"); // Royal Acoustic Cobalt
        voiceGrad.addColorStop(0.78, "#00df81"); // Vibrant Taxora Mint
        voiceGrad.addColorStop(1.0, "#00f0ff"); // Seamless loop to Cyan

        const highlightGrad = context.createLinearGradient(gx0, gy0, gx1, gy1);
        highlightGrad.addColorStop(0.0, "#ffffff"); // Pure Diamond White
        highlightGrad.addColorStop(0.3, "#e0f2fe"); // Luminous Ice
        highlightGrad.addColorStop(0.7, "#a7f3d0"); // Seafoam Sparkle
        highlightGrad.addColorStop(1.0, "#ffffff"); // Pure Diamond White

        primaryFill = highlightGrad;
        secondaryFill = voiceGrad;
      }

      // Sleek, luminous outline for Taxora typography
      if (wordBounds.font) {
        context.save();
        context.font = wordBounds.font;
        context.textAlign = "left";
        context.textBaseline = "alphabetic";
        context.lineJoin = "round";
        context.lineCap = "round";
        context.lineWidth = 1.35;

        const strokeGrad = context.createLinearGradient(
          left,
          top,
          right,
          bottom,
        );

        if (voiceColorBlend > 0.04) {
          strokeGrad.addColorStop(0, "rgba(0, 240, 255, 0.5)");
          strokeGrad.addColorStop(0.35, "rgba(56, 189, 248, 0.42)");
          strokeGrad.addColorStop(0.7, "rgba(37, 99, 235, 0.38)");
          strokeGrad.addColorStop(1, "rgba(0, 223, 129, 0.5)");
          context.shadowColor = "rgba(0, 240, 255, 0.4)";
          context.shadowBlur = 8;
        } else {
          strokeGrad.addColorStop(0, "rgba(0, 223, 129, 0.4)");
          strokeGrad.addColorStop(0.5, "rgba(44, 194, 149, 0.3)");
          strokeGrad.addColorStop(1, "rgba(0, 245, 212, 0.45)");
          context.shadowColor = "rgba(0, 223, 129, 0.35)";
          context.shadowBlur = 7;
        }

        context.strokeStyle = strokeGrad;
        context.strokeText(wordmark, wordBounds.originX, wordBounds.originY);
        context.restore();
      }

      for (const particle of particles) {
        const wave =
          time === undefined
            ? 0.68
            : 0.5 +
              0.5 *
                Math.sin(
                  (particle.homeX - left) * 0.021 +
                    (particle.homeY - top) * 0.047 -
                    time * 0.0022 +
                    particle.seed * 0.9,
                );
        const density =
          particle.seed < 0.64
            ? 0.78 + wave * 0.22
            : Math.min(
                1,
                Math.max(0, (wave - 0.32 - particle.seed * 0.17) * 2.6),
              );
        const brightness = Math.max(density, particle.highlight);
        if (brightness < 0.07) continue;

        const size =
          particle.size + (particle.highlight > 0.38 || wave > 0.83 ? 1 : 0);
        context.fillStyle =
          particle.highlight > 0.22 || particle.seed > 0.81
            ? primaryFill
            : secondaryFill;
        const voiceAlphaBoost = voiceColorBlend * 0.24;
        context.globalAlpha = Math.min(
          0.96,
          (0.38 + particle.seed * 0.42 + voiceAlphaBoost) * brightness +
            particle.highlight * 0.24,
        );
        context.fillRect(
          Math.round(particle.x),
          Math.round(particle.y),
          size,
          size,
        );
      }
      context.globalAlpha = 1;
    };

    const moveParticles = (time?: number) => {
      let moving = false;

      // Smooth tracking of voice activity & volume
      const voiceActive = isVoiceActiveRef.current;
      const rawLevel = voiceLevelRef.current;
      const targetNorm = voiceActive
        ? Math.min(1, Math.max(0.08, rawLevel / 60))
        : 0;
      smoothedLevel += (targetNorm - smoothedLevel) * 0.18;

      const targetBlend = voiceActive ? 1 : 0;
      voiceColorBlend += (targetBlend - voiceColorBlend) * 0.12;

      if (smoothedLevel > 0.005 || voiceColorBlend > 0.005) {
        moving = true;
      }

      const radius = width < 540 ? 78 : hoverRadius;
      const { left } = wordBounds;
      const currentTime = time ?? 0;

      for (const particle of particles) {
        let targetX = particle.homeX;
        let targetY = particle.homeY;
        let highlight = 0;

        // Pointer hover physics
        if (pointer) {
          const dx = targetX - pointer.x;
          const dy = targetY - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < radius) {
            highlight = (1 - distance / radius) ** 1.25;
            const force = highlight ** 1.45 * (width < 540 ? 61 : 109);
            targetX += ((dx - dy * 0.53) / distance) * force;
            targetY += ((dy + dx * 0.53) / distance) * force * 0.76;
          }
        }

        // Voice-reactive vibration & acoustic oscillation
        if (smoothedLevel > 0.01) {
          // 1. Gentle traveling acoustic wave through the wordmark (preserves crisp letterforms)
          const wavePhase =
            (particle.homeX - left) * 0.026 - currentTime * 0.007;
          const waveDispX =
            Math.sin(wavePhase + particle.seed * 6.28) * smoothedLevel * 3.2;
          const waveDispY =
            Math.cos(wavePhase * 1.25 + particle.seed * 6.28) *
            smoothedLevel *
            3.8;

          // 2. High-frequency acoustic micro-resonance
          const jitterX =
            Math.sin(currentTime * 0.04 + particle.seed * 31) *
            smoothedLevel *
            1.4;
          const jitterY =
            Math.cos(currentTime * 0.05 + particle.seed * 41) *
            smoothedLevel *
            1.4;

          targetX += waveDispX + jitterX;
          targetY += waveDispY + jitterY;

          // Crisp brightness flare on voice decibels
          const voiceHighlight = smoothedLevel * (0.65 + particle.seed * 0.35);
          highlight = Math.max(highlight, voiceHighlight);
        }

        particle.highlight += (highlight - particle.highlight) * 0.2;
        particle.speedX =
          (particle.speedX + (targetX - particle.x) * 0.16) * 0.74;
        particle.speedY =
          (particle.speedY + (targetY - particle.y) * 0.16) * 0.74;
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (
          Math.abs(particle.speedX) + Math.abs(particle.speedY) > 0.09 ||
          Math.abs(targetX - particle.x) + Math.abs(targetY - particle.y) >
            0.2 ||
          Math.abs(highlight - particle.highlight) > 0.003
        ) {
          moving = true;
        } else {
          particle.x = targetX;
          particle.y = targetY;
          particle.speedX = 0;
          particle.speedY = 0;
          particle.highlight = highlight;
        }
      }
      return moving;
    };

    const animate = (time: number) => {
      frame = 0;
      if (motion.matches || document.hidden) return;

      const isVoiceActiveNow =
        isVoiceActiveRef.current ||
        voiceLevelRef.current > 0 ||
        smoothedLevel > 0.005 ||
        voiceColorBlend > 0.005;

      const interval = pointer || settling || isVoiceActiveNow ? 15 : 32;

      if (time - lastDraw >= interval) {
        if (pointer || settling || isVoiceActiveNow) {
          settling = moveParticles(time);
        }
        draw(time);
        lastDraw = time;
      }
      frame = requestAnimationFrame(animate);
    };

    const requestDraw = () => {
      if (frame === 0 && initialized && !motion.matches && !document.hidden)
        frame = requestAnimationFrame(animate);
    };

    const arrangeWordmark = () => {
      if (!mounted) return;
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (width === 0 || height === 0) return;

      const scale = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.ceil(width * scale);
      canvas.height = Math.ceil(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);

      const space = anchor.getBoundingClientRect();
      const fontSize = Math.min(space.width * 0.167, space.height * 0.67, 106);
      const font = `650 ${fontSize}px "Instrument Sans Variable", sans-serif`;
      sample.font = font;
      const ink = sample.measureText(wordmark);
      const sampleWidth =
        Math.ceil(ink.actualBoundingBoxLeft + ink.actualBoundingBoxRight) + 8;
      const sampleHeight =
        Math.ceil(ink.actualBoundingBoxAscent + ink.actualBoundingBoxDescent) +
        8;
      sample.canvas.width = sampleWidth;
      sample.canvas.height = sampleHeight;
      sample.font = font;
      sample.fillStyle = "#fff";
      sample.textAlign = "left";
      sample.textBaseline = "alphabetic";
      sample.fillText(
        wordmark,
        ink.actualBoundingBoxLeft + 4,
        ink.actualBoundingBoxAscent + 4,
      );

      const image = sample.getImageData(0, 0, sampleWidth, sampleHeight);
      const left = space.left - bounds.left + (space.width - sampleWidth) / 2;
      const top = space.top - bounds.top + (space.height - sampleHeight) / 2;
      canvas.style.setProperty("--wordmark-x", `${left + sampleWidth / 2}px`);
      canvas.style.setProperty("--wordmark-y", `${top + sampleHeight / 2}px`);
      wordBounds = {
        left,
        top,
        right: left + sampleWidth,
        bottom: top + sampleHeight,
        originX: left + ink.actualBoundingBoxLeft + 4,
        originY: top + ink.actualBoundingBoxAscent + 4,
        font,
      };
      const step = width < 540 ? 3 : 4;
      const scatter = initialized || motion.matches ? 0 : 36;
      const next: Particle[] = [];

      for (let y = 0; y < sampleHeight; y += step) {
        for (let x = 0; x < sampleWidth; x += step) {
          if (image.data[(y * sampleWidth + x) * 4 + 3] < 160) continue;

          const seed = ((x * 31 + y * 17 + x * y * 3) % 37) / 36;
          const homeX = left + x;
          const homeY = top + y;
          next.push({
            homeX,
            homeY,
            x: homeX + Math.cos(seed * 69) * scatter * seed,
            y: homeY + Math.sin(seed * 81) * scatter * seed,
            speedX: 0,
            speedY: 0,
            seed,
            size: seed > 0.6 ? step - 1 : step - 2,
            highlight: 0,
          });
        }
      }

      particles = next;
      initialized = true;
      pointer = undefined;
      settling = scatter > 0;
      draw();
      requestDraw();
    };

    const clearPointer = () => {
      if (!pointer) return;
      pointer = undefined;
      settling = true;
      requestDraw();
    };

    const handlePointer = (event: PointerEvent) => {
      if (motion.matches || !wordBounds || event.pointerType === "touch")
        return;

      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const margin = width < 540 ? 78 : hoverRadius;
      if (
        x < wordBounds.left - margin ||
        x > wordBounds.right + margin ||
        y < wordBounds.top - margin ||
        y > wordBounds.bottom + margin
      ) {
        clearPointer();
        return;
      }

      pointer = { x, y };
      requestDraw();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        pointer = undefined;
        settling = true;
      } else {
        requestDraw();
      }
    };

    const resetMotion = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      pointer = undefined;
      arrangeWordmark();
    };

    const resize = new ResizeObserver(() => {
      if (initialized) arrangeWordmark();
    });
    resize.observe(canvas);
    resize.observe(anchor);
    if (anchor.parentElement) resize.observe(anchor.parentElement);
    document.fonts
      .load('650 32px "Instrument Sans Variable"')
      .then(arrangeWordmark, arrangeWordmark);
    surface.addEventListener("pointermove", handlePointer, { passive: true });
    surface.addEventListener("pointerleave", clearPointer);
    motion.addEventListener("change", resetMotion);
    document.addEventListener("visibilitychange", handleVisibility);
    requestDrawRef.current = requestDraw;

    return () => {
      mounted = false;
      requestDrawRef.current = null;
      cancelAnimationFrame(frame);
      resize.disconnect();
      surface.removeEventListener("pointermove", handlePointer);
      surface.removeEventListener("pointerleave", clearPointer);
      motion.removeEventListener("change", resetMotion);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Request redraw whenever voice state changes
  useEffect(() => {
    isVoiceActiveRef.current = isVoiceActive;
    voiceLevelRef.current = voiceLevel;
    if (isVoiceActive || voiceLevel > 0) {
      requestDrawRef.current?.();
    }
  }, [isVoiceActive, voiceLevel]);

  return (
    <canvas
      className={styles.chatBackdrop}
      ref={ref}
      data-voice={isVoiceActive ? "true" : undefined}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
