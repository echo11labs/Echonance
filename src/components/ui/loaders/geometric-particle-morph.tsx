"use client";

import { motion, type Transition } from "motion/react";
import type { HTMLAttributes } from "react";
import styles from "./geometric-particle-morph.module.css";

export type GeometricShape = "circle" | "cube" | "wave" | "diamond";
export type MorphAgentStage =
  "thinking" | "reading" | "visualizing" | "synthesizing";

interface ParticleCoordinate {
  x: number;
  y: number;
  borderRadius: string;
  rotate: number;
  scale: number;
  scaleY?: number;
  opacity: number;
  color: string;
}

// 12 persistent geometric particles that continuously morph between shapes
const PARTICLE_IDS = [
  "geom-0",
  "geom-1",
  "geom-2",
  "geom-3",
  "geom-4",
  "geom-5",
  "geom-6",
  "geom-7",
  "geom-8",
  "geom-9",
  "geom-10",
  "geom-11",
] as const;

// Shape 1: Circle / Orbital Ring (Cognitive Equilibrium)
function getCircleCoords(index: number): ParticleCoordinate {
  const angle = (index * (2 * Math.PI)) / 12;
  const radius = 11.5;
  const x = Math.round(Math.cos(angle) * radius * 10) / 10;
  const y = Math.round(Math.sin(angle) * radius * 10) / 10;

  return {
    x,
    y,
    borderRadius: "50%",
    rotate: 0,
    scale: 1,
    scaleY: 1,
    opacity: 0.95,
    color: "#00df81",
  };
}

// Shape 2: Isometric 3D Cube / Hexagonal Structure (Statutory Reading & Structure)
function getCubeCoords(index: number): ParticleCoordinate {
  const cubePoints = [
    { x: 0, y: -12 }, // 0: Top apex
    { x: 5.5, y: -8.8 }, // 1: Top-right upper edge
    { x: 11, y: -5.5 }, // 2: Top-right vertex
    { x: 11, y: 0.5 }, // 3: Right vertical edge
    { x: 11, y: 6.5 }, // 4: Bottom-right vertex
    { x: 5.5, y: 9.8 }, // 5: Bottom-right lower edge
    { x: 0, y: 13 }, // 6: Bottom apex vertex
    { x: -5.5, y: 9.8 }, // 7: Bottom-left lower edge
    { x: -11, y: 6.5 }, // 8: Bottom-left vertex
    { x: -11, y: 0.5 }, // 9: Left vertical edge
    { x: -11, y: -5.5 }, // 10: Top-left vertex
    { x: 0, y: 0.5 }, // 11: Center junction
  ];

  const pt = cubePoints[index] || { x: 0, y: 0 };
  const isCenter = index === 11;

  return {
    x: pt.x,
    y: pt.y,
    borderRadius: "1.5px", // Micro cubic facet
    rotate: isCenter ? 45 : 30, // Isometric orientation
    scale: isCenter ? 1.3 : 1.15,
    scaleY: 1,
    opacity: isCenter ? 1 : 0.9,
    color: isCenter ? "#ffffff" : "#00df81",
  };
}

// Shape 3: Sine Wave / Frequency Spectrum (Data & Rate Calculation)
function getWaveCoords(index: number): ParticleCoordinate {
  const x = -13.2 + index * 2.4;
  const y = Math.round(Math.sin(index * 1.05) * 8.5 * 10) / 10;

  return {
    x,
    y,
    borderRadius: "3.5px", // Elongated data bar pill
    rotate: 0,
    scale: 1,
    scaleY: 1.5,
    opacity: 0.92,
    color: index % 2 === 0 ? "#00df81" : "#50e3a5",
  };
}

// Shape 4: Tesseract / Convergent Diamond Lattice (Synthesis & Cross-Referencing)
function getDiamondCoords(index: number): ParticleCoordinate {
  const diamondPoints = [
    // Outer diamond (4 particles)
    { x: 0, y: -12.5 },
    { x: 12.5, y: 0 },
    { x: 0, y: 12.5 },
    { x: -12.5, y: 0 },
    // Inner rotated diamond (4 particles)
    { x: 0, y: -6 },
    { x: 6, y: 0 },
    { x: 0, y: 6 },
    { x: -6, y: 0 },
    // Center dense crystal core (4 particles)
    { x: -2.5, y: -2.5 },
    { x: 2.5, y: -2.5 },
    { x: 2.5, y: 2.5 },
    { x: -2.5, y: 2.5 },
  ];

  const pt = diamondPoints[index] || { x: 0, y: 0 };
  const isCore = index >= 8;

  return {
    x: pt.x,
    y: pt.y,
    borderRadius: "2px",
    rotate: 45,
    scale: isCore ? 1.25 : 1,
    scaleY: 1,
    opacity: isCore ? 1 : 0.85,
    color: isCore ? "#ffffff" : "#00df81",
  };
}

function getCoordsForShape(
  shape: GeometricShape,
  index: number,
): ParticleCoordinate {
  switch (shape) {
    case "cube":
      return getCubeCoords(index);
    case "wave":
      return getWaveCoords(index);
    case "diamond":
      return getDiamondCoords(index);
    default:
      return getCircleCoords(index);
  }
}

export interface GeometricParticleMorphProps extends HTMLAttributes<HTMLSpanElement> {
  shape?: GeometricShape;
  stage?: MorphAgentStage;
  size?: "sm" | "md" | "lg";
}

/**
 * GeometricParticleMorph
 * 12 identical primitive particles that smoothly rearrange and morph
 * into mathematical shapes (Circle -> Isometric Cube -> Frequency Wave -> Diamond Core)
 */
export function GeometricParticleMorph({
  shape,
  stage = "thinking",
  size = "sm",
  className,
  ...props
}: GeometricParticleMorphProps) {
  // Map agent stage to geometric shape if shape is not explicitly provided
  let activeShape: GeometricShape = shape || "circle";
  if (!shape) {
    if (stage === "reading") activeShape = "cube";
    else if (stage === "visualizing") activeShape = "wave";
    else if (stage === "synthesizing") activeShape = "diamond";
    else activeShape = "circle";
  }

  const scale = size === "lg" ? 1.4 : size === "md" ? 1.15 : 1;

  // Ambient rotation for the circle and gentle breathing for the cube
  const containerAnimation =
    activeShape === "circle"
      ? { rotate: 360 }
      : activeShape === "cube"
        ? { rotate: [0, 2, -2, 0], scale: [1, 1.03, 0.98, 1] }
        : activeShape === "diamond"
          ? { scale: [1, 1.05, 0.97, 1] }
          : { rotate: 0, scale: 1 };

  const containerTransition: Transition =
    activeShape === "circle"
      ? { repeat: Number.POSITIVE_INFINITY, duration: 14, ease: "linear" }
      : activeShape === "cube"
        ? { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }
        : activeShape === "diamond"
          ? {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.4,
              ease: "easeInOut",
            }
          : { duration: 0.4 };

  return (
    <span
      className={`${styles.container} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    >
      <motion.span
        className={styles.particleCanvas}
        animate={containerAnimation}
        transition={containerTransition}
      >
        {PARTICLE_IDS.map((id, index) => {
          const coords = getCoordsForShape(activeShape, index);
          return (
            <motion.span
              key={id}
              className={styles.primitiveParticle}
              animate={{
                x: coords.x,
                y: coords.y,
                borderRadius: coords.borderRadius,
                rotate: coords.rotate,
                scale: coords.scale,
                scaleY: coords.scaleY ?? coords.scale,
                opacity: coords.opacity,
                backgroundColor: coords.color,
              }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 15,
                mass: 0.75,
              }}
            />
          );
        })}
      </motion.span>
    </span>
  );
}

export interface AgentParticleStatusSectionProps {
  stage?: MorphAgentStage;
  customText?: string;
  subText?: string;
}

/**
 * Chat thinking status section powered by the Geometric Particle Morphing Engine
 */
export function AgentParticleStatusSection({
  stage = "thinking",
  customText,
  subText,
}: AgentParticleStatusSectionProps) {
  let primaryText = customText || "Analyzing statutory tax query…";
  let defaultSubText = subText || "Orbiting Cognitive Equilibrium";

  if (stage === "reading") {
    primaryText = customText || "Reading Income Tax Act & Rajpatra provisions…";
    defaultSubText = subText || "Isometric Codex Structure Matrix";
  } else if (stage === "visualizing") {
    primaryText = customText || "Computing statutory schedules & rates…";
    defaultSubText = subText || "Harmonic Data Spectrum Wave";
  } else if (stage === "synthesizing") {
    primaryText = customText || "Cross-referencing Nepal Rajpatra…";
    defaultSubText = subText || "Convergent Crystalline Diamond Core";
  }

  return (
    <div className={styles.agentStatusBox} role="status" aria-live="polite">
      <GeometricParticleMorph stage={stage} size="sm" />
      <div className={styles.agentStatusText}>
        <span className={styles.agentStatusPrimary}>{primaryText}</span>
        <span className={styles.agentStatusSecondary}>{defaultSubText}</span>
      </div>
    </div>
  );
}
