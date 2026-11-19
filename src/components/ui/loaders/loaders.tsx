import type { HTMLAttributes } from "react";
import styles from "./loaders.module.css";

interface LoaderBaseProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
}

/** 1. Orbit Ring Thinking Loader (Compact & sleek for statutory reasoning) */
export function ThinkingLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.orbitSpinner} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** 2. Book Flipping Loader (For Statutory Source & Legal Gazette Ingestion) */
export function BookLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.4 : size === "md" ? 1.15 : 1;
  return (
    <span
      className={`${styles.bookLoader} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    >
      <span className={styles.bookCoverLeft} />
      <span className={styles.bookCoverRight} />
      <span className={styles.bookSpine} />
      <span className={styles.bookPage} />
      <span className={styles.bookPage} />
      <span className={styles.bookPage} />
    </span>
  );
}

/** 3. Data Metrics Ascending Bars with Bouncing Ball (For Tax Computation & Bracket Visualizing) */
export function DataVisualizingLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.3 : size === "md" ? 1.1 : 1;
  return (
    <span
      className={`${styles.dataVisualizer} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    >
      <span className={styles.dataBall} />
      <span className={styles.dataBar} />
      <span className={styles.dataBar} />
      <span className={styles.dataBar} />
      <span className={styles.dataBar} />
      <span className={styles.dataBar} />
    </span>
  );
}

/** 4. Scanning Radar Bar Loader (For Fast Gazette Keyword Crawling) */
export function RadarScanLoader({ className, ...props }: LoaderBaseProps) {
  return (
    <span
      className={`${styles.scanBarLoader} ${className || ""}`}
      aria-hidden="true"
      {...props}
    >
      <span className={styles.scanBarFill} />
    </span>
  );
}

/** 5. DNA Double Helix Oscillating Loader (For Deep Legislative Cross-Referencing) */
export function DnaTraceLoader({ className, ...props }: LoaderBaseProps) {
  return (
    <span
      className={`${styles.dnaLoader} ${className || ""}`}
      aria-hidden="true"
      {...props}
    >
      <span className={styles.dnaDot} />
      <span className={styles.dnaDot} />
      <span className={styles.dnaDot} />
      <span className={styles.dnaDot} />
      <span className={styles.dnaDot} />
      <span className={styles.dnaDot} />
    </span>
  );
}

/** 6. Bookshelf Archive Loader (For Tax Law Library Navigation) */
export function BookshelfLoader({ className, ...props }: LoaderBaseProps) {
  return (
    <span
      className={`${styles.bookshelfLoader} ${className || ""}`}
      aria-hidden="true"
      {...props}
    >
      <span className={styles.bookshelfBook} />
      <span className={styles.bookshelfBook} />
      <span className={styles.bookshelfBook} />
      <span className={styles.bookshelfBook} />
    </span>
  );
}

/** 7. Concentric Multi-Ring Gyroscope Loader (For Deep Engine Processing) */
export function ConcentricRingsLoader({
  className,
  ...props
}: LoaderBaseProps) {
  return (
    <span
      className={`${styles.concentricLoader} ${className || ""}`}
      aria-hidden="true"
      {...props}
    >
      <span className={styles.concentricRing} />
      <span className={styles.concentricRing} />
      <span className={styles.concentricRing} />
    </span>
  );
}

/** 8. Pulsing Triple Dots (Micro Compact) */
export function PulseDotsLoader({ className, ...props }: LoaderBaseProps) {
  return (
    <span
      className={`${styles.pulseDotsLoader} ${className || ""}`}
      aria-hidden="true"
      {...props}
    >
      <span className={styles.pulseDot} />
      <span className={styles.pulseDot} />
      <span className={styles.pulseDot} />
    </span>
  );
}

export type AgentStage =
  "thinking" | "reading" | "visualizing" | "synthesizing";

interface AgentThinkingSectionProps {
  stage?: AgentStage;
  customText?: string;
  subText?: string;
}

/**
 * Small staged thinking section for Taxora Agent responses
 */
export function AgentThinkingSection({
  stage = "thinking",
  customText,
  subText,
}: AgentThinkingSectionProps) {
  let loaderNode = <ThinkingLoader size="sm" />;
  let primaryText = customText || "Analyzing statutory tax query…";
  let defaultSubText = subText || "Resolving legal definitions";

  if (stage === "reading") {
    loaderNode = <BookLoader size="sm" />;
    primaryText = customText || "Reading Income Tax Act & Rajpatra provisions…";
    defaultSubText = subText || "Verifying citations across Nepal Rajpatra";
  } else if (stage === "visualizing") {
    loaderNode = <DataVisualizingLoader size="sm" />;
    primaryText = customText || "Computing statutory schedules & rates…";
    defaultSubText = subText || "Formatting bracket tables";
  } else if (stage === "synthesizing") {
    loaderNode = <DnaTraceLoader />;
    primaryText = customText || "Synthesizing legal intelligence…";
    defaultSubText = subText || "Checking cross-act amendments";
  }

  return (
    <div className={styles.agentStatusBox} role="status" aria-live="polite">
      {loaderNode}
      <div className={styles.agentStatusText}>
        <span className={styles.agentStatusPrimary}>{primaryText}</span>
        <span className={styles.agentStatusSecondary}>{defaultSubText}</span>
      </div>
    </div>
  );
}

/**
 * Visual Gallery for verifying and inspecting the custom Taxora loader collection
 */
export function LoaderGallery() {
  const loaderItems = [
    {
      id: "thinking",
      title: "Statutory Reasoning",
      subtitle: "Thinking & Query Comprehension",
      component: <ThinkingLoader size="md" />,
    },
    {
      id: "reading",
      title: "Source Ingestion",
      subtitle: "Reading Acts, Rules & Rajpatra",
      component: <BookLoader size="md" />,
    },
    {
      id: "visualizing",
      title: "Data & Rates Calculation",
      subtitle: "Computing Schedules & Brackets",
      component: <DataVisualizingLoader size="md" />,
    },
    {
      id: "library",
      title: "Law Library Archives",
      subtitle: "Filing and Section Browsing",
      component: <BookshelfLoader />,
    },
    {
      id: "crossref",
      title: "Legislative Cross-Reference",
      subtitle: "DNA Double Helix Deep Trace",
      component: <DnaTraceLoader />,
    },
    {
      id: "radar",
      title: "Rajpatra Search Radar",
      subtitle: "Real-time Keyword Scanning",
      component: <RadarScanLoader />,
    },
    {
      id: "concentric",
      title: "Engine Synchronization",
      subtitle: "Multi-ring Gyroscope",
      component: <ConcentricRingsLoader />,
    },
    {
      id: "pulse",
      title: "Micro Compact Pulse",
      subtitle: "Inline Action Feedback",
      component: <PulseDotsLoader />,
    },
    {
      id: "dotted-rings",
      title: "Dotted Dual-Rings",
      subtitle: "Custom Thinking Variant 1",
      component: <DottedRingsLoader size="md" />,
    },
    {
      id: "gyroscopic",
      title: "3D Gyroscopic Orbit",
      subtitle: "Custom Thinking Variant 2",
      component: <GyroscopicLoader size="md" />,
    },
    {
      id: "sonar-pulse",
      title: "Sonar Pulse Ripple",
      subtitle: "Custom Thinking Variant 3",
      component: <SonarPulseLoader size="md" />,
    },
    {
      id: "orbit-scale",
      title: "Orbit Scale Circles",
      subtitle: "Custom Thinking Variant 4",
      component: <OrbitScaleLoader size="md" />,
    },
    {
      id: "shadow-pulse",
      title: "Triple Dot Shadow Pulse",
      subtitle: "Custom Thinking Variant 5",
      component: <ShadowPulseLoader size="md" />,
    },
    {
      id: "shuttle-bounce",
      title: "Shuttling Particle",
      subtitle: "Custom Thinking Variant 6",
      component: <ShuttleBounceLoader size="md" />,
    },
    {
      id: "quad-morph",
      title: "Quad Convergent Orbit",
      subtitle: "Custom Thinking Variant 7",
      component: <QuadMorphLoader size="md" />,
    },
    {
      id: "stretching-caterpillar",
      title: "Stretching Caterpillar",
      subtitle: "Custom Thinking Variant 8",
      component: <StretchingCaterpillarLoader size="md" />,
    },
  ];

  return (
    <div className={styles.galleryGrid}>
      {loaderItems.map((item) => (
        <div key={item.id} className={styles.galleryCard}>
          <div className={styles.galleryVisual}>{item.component}</div>
          <div className={styles.galleryMeta}>
            <span className={styles.galleryTitle}>{item.title}</span>
            <span className={styles.gallerySubtitle}>{item.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 3 Custom Loaders for Thinking (Saved & Applied Randomly)
 */

/** Custom Loader 1: Dual Concentric Rotating Dotted Rings */
export function DottedRingsLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderDottedRings} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Custom Loader 2: 3D Gyroscopic Perspective Orbit */
export function GyroscopicLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderGyroscopic} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Custom Loader 3: Sonar Pulse Ripple */
export function SonarPulseLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderSonarPulse} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Custom Loader 4: Rotating Orbiting Scale Circles */
export function OrbitScaleLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderOrbitScale} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Custom Loader 5: Triple Dot Shadow Pulse */
export function ShadowPulseLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderShadowPulse} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Custom Loader 6: Shuttling Bouncing Particle */
export function ShuttleBounceLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderShuttleBounce} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Custom Loader 7: Quad Balls Morphing Convergent Orbit */
export function QuadMorphLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderQuadMorph} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Custom Loader 8: Crawling Stretching Caterpillar Dots */
export function StretchingCaterpillarLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderStretchingCaterpillar} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/* ================================================================
   Computing Loaders (Calculations, Brackets & Schedules)
   ================================================================ */

/** Computing Loader 1: Concentric Rotating Squares */
export function ConcentricSquaresLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderConcentricSquares} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Computing Loader 2: Floating Isometric Layer Plates */
export function FloatingLayersLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderFloatingLayers} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Computing Loader 3: Matrix Grid Shift */
export function MatrixGridShiftLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderMatrixGridShift} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Computing Loader 4: Conveyor Rotating Block */
export function ConveyorBlockLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderConveyorBlock} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/* ================================================================
   Synthesizing Loaders (Cross-Referencing, Slabs & Digest)
   ================================================================ */

/** Synthesizing Loader 1: Vertical Equalizer Bars */
export function VerticalEqualizerLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderVerticalEqualizer} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Synthesizing Loader 2: Horizontal Equalizer Bars */
export function HorizontalEqualizerLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderHorizontalEqualizer} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Synthesizing Loader 3: Matrix Stream Columns */
export function MatrixStreamLoader({
  size = "sm",
  className,
  ...props
}: LoaderBaseProps) {
  const scale = size === "lg" ? 1.5 : size === "md" ? 1.2 : 1;
  return (
    <span
      className={`${styles.loaderMatrixStream} ${className || ""}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

export type StagedThinkingCategory =
  "analyzing" | "reading" | "computing" | "synthesizing";

export interface StagedAgentThinkingSectionProps {
  category?: StagedThinkingCategory;
  variantIndex?: number;
  customText?: string;
  subText?: string;
}

/**
 * Functional Staged Thinking Section:
 * - Analyzing (3 loaders): DottedRings, Gyroscopic, SonarPulse
 * - Reading (4 loaders): OrbitScale, ShadowPulse, ShuttleBounce, QuadMorph
 * - Computing (4 loaders): ConcentricSquares, FloatingLayers, MatrixGridShift, ConveyorBlock
 * - Synthesizing (3 loaders): VerticalEqualizer, HorizontalEqualizer, MatrixStream
 * Completely UNBOXED (no container, no border)
 */
export function StagedAgentThinkingSection({
  category = "analyzing",
  variantIndex = 0,
  customText,
  subText,
}: StagedAgentThinkingSectionProps) {
  let loaderNode = <DottedRingsLoader size="sm" />;
  let primary = customText || "Analyzing statutory tax query…";
  let secondary = subText || "Stage 1: Analyzing Provisions";

  if (category === "analyzing") {
    const v = variantIndex % 3;
    if (v === 0) {
      loaderNode = <DottedRingsLoader size="sm" />;
      secondary = subText || "Dual Concentric Rotating Dotted Rings";
    } else if (v === 1) {
      loaderNode = <GyroscopicLoader size="sm" />;
      secondary = subText || "3D Gyroscopic Perspective Orbit";
    } else {
      loaderNode = <SonarPulseLoader size="sm" />;
      secondary = subText || "Concentric Sonar Pulse Ripple";
    }
  } else if (category === "reading") {
    primary = customText || "Reading Income Tax Act & Rajpatra circulars…";
    const v = variantIndex % 4;
    if (v === 0) {
      loaderNode = <OrbitScaleLoader size="sm" />;
      secondary = subText || "Rotating Orbiting Scale Circles";
    } else if (v === 1) {
      loaderNode = <ShadowPulseLoader size="sm" />;
      secondary = subText || "Triple Dot Chromatic Shadow Pulse";
    } else if (v === 2) {
      loaderNode = <ShuttleBounceLoader size="sm" />;
      secondary = subText || "Quantum Shuttling Particle";
    } else {
      loaderNode = <QuadMorphLoader size="sm" />;
      secondary = subText || "Quad Convergent Morphing Orbit";
    }
  } else if (category === "computing") {
    primary = customText || "Computing tax brackets & statutory schedules…";
    const v = variantIndex % 4;
    if (v === 0) {
      loaderNode = <ConcentricSquaresLoader size="sm" />;
      secondary = subText || "Concentric Rotating Squares";
    } else if (v === 1) {
      loaderNode = <FloatingLayersLoader size="sm" />;
      secondary = subText || "Floating Isometric Layer Plates";
    } else if (v === 2) {
      loaderNode = <MatrixGridShiftLoader size="sm" />;
      secondary = subText || "Matrix Grid Quadrant Shift";
    } else {
      loaderNode = <ConveyorBlockLoader size="sm" />;
      secondary = subText || "Conveyor Step Block Rotation";
    }
  } else if (category === "synthesizing") {
    primary = customText || "Synthesizing legal intelligence…";
    const v = variantIndex % 3;
    if (v === 0) {
      loaderNode = <VerticalEqualizerLoader size="sm" />;
      secondary = subText || "Vertical Dynamic Equalizer Wave";
    } else if (v === 1) {
      loaderNode = <HorizontalEqualizerLoader size="sm" />;
      secondary = subText || "Horizontal Equalizer Pulse";
    } else {
      loaderNode = <MatrixStreamLoader size="sm" />;
      secondary = subText || "Matrix Regulatory Stream Columns";
    }
  }

  return (
    <div
      className={styles.agentThinkingUnboxed}
      role="status"
      aria-live="polite"
    >
      <span className={styles.agentThinkingIconSlot}>{loaderNode}</span>
      <div className={styles.agentThinkingText}>
        <span className={styles.agentThinkingPrimary}>{primary}</span>
        <span className={styles.agentThinkingSecondary}>{secondary}</span>
      </div>
    </div>
  );
}

export type ThinkingLoaderVariant = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface RandomThinkingSectionProps {
  variant?: ThinkingLoaderVariant;
  customText?: string;
  subText?: string;
}

/**
 * Renders one of the 8 custom loaders randomly (or explicitly by variant index)
 * Completely UNBOXED (no container box, no border)
 */
export function RandomThinkingSection({
  variant = 0,
  customText,
  subText,
}: RandomThinkingSectionProps) {
  let loaderNode = <DottedRingsLoader size="sm" />;
  const primary = customText || "Analyzing statutory tax query…";
  let secondary = subText || "Dual Concentric Rotating Dotted Rings";

  switch (variant) {
    case 1:
      loaderNode = <GyroscopicLoader size="sm" />;
      secondary = subText || "3D Gyroscopic Perspective Orbit";
      break;
    case 2:
      loaderNode = <SonarPulseLoader size="sm" />;
      secondary = subText || "Concentric Sonar Pulse Ripple";
      break;
    case 3:
      loaderNode = <OrbitScaleLoader size="sm" />;
      secondary = subText || "Rotating Orbiting Scale Circles";
      break;
    case 4:
      loaderNode = <ShadowPulseLoader size="sm" />;
      secondary = subText || "Triple Dot Chromatic Shadow Pulse";
      break;
    case 5:
      loaderNode = <ShuttleBounceLoader size="sm" />;
      secondary = subText || "Quantum Shuttling Particle";
      break;
    case 6:
      loaderNode = <QuadMorphLoader size="sm" />;
      secondary = subText || "Quad Convergent Morphing Orbit";
      break;
    case 7:
      loaderNode = <StretchingCaterpillarLoader size="sm" />;
      secondary = subText || "Linear Stretching Caterpillar Lattice";
      break;
    default:
      loaderNode = <DottedRingsLoader size="sm" />;
      secondary = subText || "Dual Concentric Rotating Dotted Rings";
      break;
  }

  return (
    <div
      className={styles.agentThinkingUnboxed}
      role="status"
      aria-live="polite"
    >
      <span className={styles.agentThinkingIconSlot}>{loaderNode}</span>
      <div className={styles.agentThinkingText}>
        <span className={styles.agentThinkingPrimary}>{primary}</span>
        <span className={styles.agentThinkingSecondary}>{secondary}</span>
      </div>
    </div>
  );
}
