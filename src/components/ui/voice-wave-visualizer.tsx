"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface VoiceWaveVisualizerProps {
  className?: string;
  voiceLevel?: number;
}

const WAVE_STRANDS = [
  {
    id: "cyan-spark",
    colorStops: [
      { offset: "0%", color: "#00f0ff", opacity: 0 },
      { offset: "30%", color: "#00f0ff", opacity: 0.9 },
      { offset: "70%", color: "#38bdf8", opacity: 0.9 },
      { offset: "100%", color: "#00df81", opacity: 0 },
    ],
    width: 2.2,
    freq1: 0.006,
    freq2: 0.011,
    speed: 0.0031,
    phaseOffset: 0.2,
    baseAmp: 16,
    yOffset: -12,
  },
  {
    id: "ice-mint",
    colorStops: [
      { offset: "0%", color: "#e0f2fe", opacity: 0 },
      { offset: "25%", color: "#ffffff", opacity: 0.95 },
      { offset: "65%", color: "#00df81", opacity: 0.85 },
      { offset: "100%", color: "#2cc295", opacity: 0 },
    ],
    width: 1.8,
    freq1: 0.008,
    freq2: 0.014,
    speed: 0.0024,
    phaseOffset: 1.4,
    baseAmp: 20,
    yOffset: -4,
  },
  {
    id: "cobalt-azure",
    colorStops: [
      { offset: "0%", color: "#2563eb", opacity: 0 },
      { offset: "35%", color: "#3b82f6", opacity: 0.8 },
      { offset: "70%", color: "#00f0ff", opacity: 0.85 },
      { offset: "100%", color: "#00df81", opacity: 0 },
    ],
    width: 2.0,
    freq1: 0.005,
    freq2: 0.009,
    speed: 0.0028,
    phaseOffset: 2.6,
    baseAmp: 24,
    yOffset: 6,
  },
  {
    id: "emerald-mint",
    colorStops: [
      { offset: "0%", color: "#00df81", opacity: 0 },
      { offset: "30%", color: "#00df81", opacity: 0.9 },
      { offset: "68%", color: "#00f5d4", opacity: 0.9 },
      { offset: "100%", color: "#03624c", opacity: 0 },
    ],
    width: 1.5,
    freq1: 0.009,
    freq2: 0.016,
    speed: 0.0036,
    phaseOffset: 3.8,
    baseAmp: 18,
    yOffset: 14,
  },
  {
    id: "deep-aqua",
    colorStops: [
      { offset: "0%", color: "#00f5d4", opacity: 0 },
      { offset: "40%", color: "#38bdf8", opacity: 0.75 },
      { offset: "75%", color: "#00df81", opacity: 0.8 },
      { offset: "100%", color: "#00f0ff", opacity: 0 },
    ],
    width: 1.2,
    freq1: 0.01,
    freq2: 0.018,
    speed: 0.0019,
    phaseOffset: 4.5,
    baseAmp: 14,
    yOffset: -18,
  },
  {
    id: "acoustic-pulse",
    colorStops: [
      { offset: "0%", color: "#38bdf8", opacity: 0 },
      { offset: "30%", color: "#00f0ff", opacity: 0.95 },
      { offset: "65%", color: "#ffffff", opacity: 0.9 },
      { offset: "100%", color: "#3b82f6", opacity: 0 },
    ],
    width: 1.6,
    freq1: 0.007,
    freq2: 0.012,
    speed: 0.0033,
    phaseOffset: 5.2,
    baseAmp: 22,
    yOffset: 2,
  },
  {
    id: "seafoam-shimmer",
    colorStops: [
      { offset: "0%", color: "#a7f3d0", opacity: 0 },
      { offset: "35%", color: "#2cc295", opacity: 0.7 },
      { offset: "70%", color: "#00df81", opacity: 0.75 },
      { offset: "100%", color: "#00f5d4", opacity: 0 },
    ],
    width: 1.1,
    freq1: 0.012,
    freq2: 0.02,
    speed: 0.0022,
    phaseOffset: 0.8,
    baseAmp: 12,
    yOffset: -8,
  },
  {
    id: "indigo-cyan",
    colorStops: [
      { offset: "0%", color: "#6366f1", opacity: 0 },
      { offset: "35%", color: "#2563eb", opacity: 0.7 },
      { offset: "70%", color: "#00f0ff", opacity: 0.8 },
      { offset: "100%", color: "#00df81", opacity: 0 },
    ],
    width: 1.4,
    freq1: 0.0055,
    freq2: 0.01,
    speed: 0.0026,
    phaseOffset: 3.1,
    baseAmp: 16,
    yOffset: 10,
  },
];

export const VoiceWaveVisualizer = React.memo(
  ({ className, voiceLevel = 0 }: VoiceWaveVisualizerProps) => {
    const wavePathRefs = useRef<(SVGPathElement | null)[]>([]);
    const voiceLevelRef = useRef(voiceLevel);
    voiceLevelRef.current = voiceLevel;

    useEffect(() => {
      let animId = 0;
      let smoothedVolume = 0;

      const animateWaves = (time: number) => {
        const targetNorm = Math.min(1, Math.max(0, voiceLevelRef.current / 55));
        smoothedVolume += (targetNorm - smoothedVolume) * 0.2;

        const totalWidth = 1000;
        // Positioned at Y=262 (lower-middle) to flow gracefully in the open space
        // beneath the Taxora wordmark without cutting through the typography.
        const centerY = 262;
        const numPoints = 50;
        const dx = totalWidth / (numPoints - 1);

        WAVE_STRANDS.forEach((strand, idx) => {
          const pathEl = wavePathRefs.current[idx];
          if (!pathEl) return;

          const totalAmp =
            strand.baseAmp * 0.8 +
            smoothedVolume * 45 * (0.8 + (idx % 3) * 0.25);
          const phase = time * strand.speed + strand.phaseOffset;

          let d = "";
          let prevX = 0;
          let prevY = 0;

          for (let p = 0; p < numPoints; p++) {
            const x = p * dx;
            const normX = x / totalWidth;
            const envelope = Math.sin(normX * Math.PI) ** 0.84;

            const waveVal =
              Math.sin(x * strand.freq1 + phase) * 0.68 +
              Math.sin(x * strand.freq2 - phase * 0.85) * 0.32;

            const y = centerY + strand.yOffset + waveVal * totalAmp * envelope;

            if (p === 0) {
              d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
            } else {
              const midX = (prevX + x) / 2;
              const midY = (prevY + y) / 2;
              d += ` Q ${prevX.toFixed(1)} ${prevY.toFixed(1)}, ${midX.toFixed(1)} ${midY.toFixed(1)}`;
            }
            prevX = x;
            prevY = y;
          }
          d += ` L ${prevX.toFixed(1)} ${prevY.toFixed(1)}`;
          pathEl.setAttribute("d", d);
        });

        animId = requestAnimationFrame(animateWaves);
      };

      animId = requestAnimationFrame(animateWaves);
      return () => cancelAnimationFrame(animId);
    }, []);

    return (
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 flex h-full w-full items-center justify-center overflow-hidden",
          className,
        )}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          overflow: "hidden",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Voice Resonance Visualization</title>
          <g>
            {WAVE_STRANDS.map((strand, idx) => (
              <path
                key={strand.id}
                ref={(el) => {
                  wavePathRefs.current[idx] = el;
                }}
                fill="none"
                stroke={`url(#visualizerWaveGrad-${strand.id})`}
                strokeWidth={strand.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: "url(#visualizerBloom)",
                }}
              />
            ))}
          </g>

          <defs>
            {WAVE_STRANDS.map((strand) => (
              <linearGradient
                id={`visualizerWaveGrad-${strand.id}`}
                key={`grad-${strand.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                {strand.colorStops.map((stop) => (
                  <stop
                    key={`${strand.id}-${stop.offset}`}
                    offset={stop.offset}
                    stopColor={stop.color}
                    stopOpacity={stop.opacity}
                  />
                ))}
              </linearGradient>
            ))}

            <filter
              id="visualizerBloom"
              x="-20%"
              y="-40%"
              width="140%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </motion.div>
    );
  },
);

VoiceWaveVisualizer.displayName = "VoiceWaveVisualizer";
