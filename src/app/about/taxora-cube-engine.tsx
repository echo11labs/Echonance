"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";

interface TaxoraCubeEngineProps {
  cx?: number;
  cy?: number;
  outerSize?: number;
  innerSize?: number;
}

type Vec3 = [number, number, number];

const CUBE_VERTICES: readonly Vec3[] = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
];

const CUBE_EDGES: readonly [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

function projectPoint(
  [x, y, z]: Vec3,
  scale: number,
  rx: number,
  ry: number,
  cx: number,
  cy: number,
): { x: number; y: number; depth: number } {
  // Rotate around Y axis
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;

  // Rotate around X axis
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y2 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  // Gentle perspective projection
  const perspective = 3.6 / (3.6 - z2 * 0.45);
  return {
    x: cx + x1 * scale * perspective,
    y: cy + y2 * scale * perspective,
    depth: z2,
  };
}

export function TaxoraCubeEngine({
  cx = 232,
  cy = 180,
  outerSize = 44,
  innerSize = 21,
}: TaxoraCubeEngineProps) {
  const groupRef = useRef<SVGGElement>(null);
  const outerLinesRef = useRef<(SVGLineElement | null)[]>([]);
  const innerLinesRef = useRef<(SVGLineElement | null)[]>([]);
  const strutLinesRef = useRef<(SVGLineElement | null)[]>([]);
  const vertexDotsRef = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const groupEl = groupRef.current;
    if (!groupEl) return;

    const state = { ry: 0.65, rx: 0.52 };
    let rafId = 0;

    function updateGeometry() {
      const outerProjected = CUBE_VERTICES.map((v) =>
        projectPoint(v, outerSize, state.rx, state.ry, cx, cy),
      );
      const innerProjected = CUBE_VERTICES.map((v) =>
        projectPoint(v, innerSize, -state.rx * 0.85, -state.ry * 1.15, cx, cy),
      );

      CUBE_EDGES.forEach(([a, b], idx) => {
        const line = outerLinesRef.current[idx];
        const p1 = outerProjected[a];
        const p2 = outerProjected[b];
        if (line && p1 && p2) {
          line.setAttribute("x1", p1.x.toFixed(2));
          line.setAttribute("y1", p1.y.toFixed(2));
          line.setAttribute("x2", p2.x.toFixed(2));
          line.setAttribute("y2", p2.y.toFixed(2));
          const avgDepth = (p1.depth + p2.depth) * 0.5;
          line.style.strokeOpacity = (0.35 + (avgDepth + 1.4) * 0.24).toFixed(
            2,
          );
        }

        const innerLine = innerLinesRef.current[idx];
        const ip1 = innerProjected[a];
        const ip2 = innerProjected[b];
        if (innerLine && ip1 && ip2) {
          innerLine.setAttribute("x1", ip1.x.toFixed(2));
          innerLine.setAttribute("y1", ip1.y.toFixed(2));
          innerLine.setAttribute("x2", ip2.x.toFixed(2));
          innerLine.setAttribute("y2", ip2.y.toFixed(2));
        }
      });

      CUBE_VERTICES.forEach((_, idx) => {
        const strut = strutLinesRef.current[idx];
        const pOut = outerProjected[idx];
        const pIn = innerProjected[idx];
        if (strut && pOut && pIn) {
          strut.setAttribute("x1", pOut.x.toFixed(2));
          strut.setAttribute("y1", pOut.y.toFixed(2));
          strut.setAttribute("x2", pIn.x.toFixed(2));
          strut.setAttribute("y2", pIn.y.toFixed(2));
        }

        const dot = vertexDotsRef.current[idx];
        if (dot && pOut) {
          dot.setAttribute("cx", pOut.x.toFixed(2));
          dot.setAttribute("cy", pOut.y.toFixed(2));
          dot.style.opacity = (0.45 + (pOut.depth + 1.4) * 0.22).toFixed(2);
        }
      });
    }

    updateGeometry();

    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let pulseAnim: anime.AnimeInstance | null = null;
    if (!prefersReduced) {
      pulseAnim = anime({
        targets: groupEl,
        scale: [0.97, 1.03],
        duration: 3200,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
      });

      const tick = () => {
        state.ry += 0.0085;
        state.rx = 0.48 + Math.sin(state.ry * 0.7) * 0.18;
        updateGeometry();
        rafId = window.requestAnimationFrame(tick);
      };
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      pulseAnim?.pause();
    };
  }, [cx, cy, outerSize, innerSize]);

  return (
    <g ref={groupRef} style={{ transformOrigin: `${cx}px ${cy}px` }}>
      {/* Tesseract diagonal struts connecting outer cube to inner core cube */}
      {CUBE_VERTICES.map((v, idx) => (
        <line
          key={`strut-${v.join(",")}`}
          ref={(el) => {
            strutLinesRef.current[idx] = el;
          }}
          stroke="rgba(52, 211, 153, 0.24)"
          strokeWidth="0.9"
          strokeDasharray="2 3"
        />
      ))}

      {/* Inner rotating core cube */}
      {CUBE_EDGES.map(([a, b], idx) => (
        <line
          key={`inner-${a}-${b}`}
          ref={(el) => {
            innerLinesRef.current[idx] = el;
          }}
          stroke="#6ee7b7"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      ))}

      {/* Outer rotating isometric cube */}
      {CUBE_EDGES.map(([a, b], idx) => (
        <line
          key={`outer-${a}-${b}`}
          ref={(el) => {
            outerLinesRef.current[idx] = el;
          }}
          stroke="#00df81"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      ))}

      {/* Glowing outer vertices */}
      {CUBE_VERTICES.map((v, idx) => (
        <circle
          key={`dot-${v.join(",")}`}
          ref={(el) => {
            vertexDotsRef.current[idx] = el;
          }}
          r="2.4"
          fill="#a7f3d0"
        />
      ))}
    </g>
  );
}
