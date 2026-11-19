import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Custom Tax Assistant Icon:
 * An acoustic intelligence core featuring a 4-point precision star
 * nested within concentric sonic resonance arcs.
 */
export function TaxAssistantIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>CA Ora</title>
      {/* Central 4-point intelligence star */}
      <path d="M12 3L13.8 9.5L20 12L13.8 14.5L12 21L10.2 14.5L4 12L10.2 9.5Z" />
      {/* Outer acoustic resonance arcs */}
      <path d="M18.5 5.5C20.2 7.2 21.2 9.5 21.5 12" strokeWidth="1.5" />
      <path d="M5.5 18.5C3.8 16.8 2.8 14.5 2.5 12" strokeWidth="1.5" />
      {/* Precision core node */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Custom Tax Law Library Icon:
 * Architectural legal statute codex with book spine, binding tabs,
 * and engraved statute pillar / bookmark ribbon.
 */
export function TaxLawLibraryIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Tax Law Library</title>
      {/* Codex book outline with curved spine */}
      <path d="M4 19.5V4.5C4 3.67 4.67 3 5.5 3H10C11.1 3 12 3.9 12 5V21C11.3 20.4 10.4 20 9.5 20H5.5C4.67 20 4 19.78 4 19.5Z" />
      <path d="M20 19.5V4.5C20 3.67 19.33 3 18.5 3H14C12.9 3 12 3.9 12 5V21C12.7 20.4 13.6 20 14.5 20H18.5C19.33 20 20 19.78 20 19.5Z" />
      {/* Statutory clause lines */}
      <path d="M7 7.5H9.5" />
      <path d="M7 11.5H9.5" />
      <path d="M7 15.5H8.5" />
      {/* Official bookmark ribbon on right page */}
      <path
        d="M14.5 3V9L16.5 7.5L18.5 9V3"
        fill="currentColor"
        fillOpacity="0.18"
      />
    </svg>
  );
}

/**
 * Custom Directives & Circulars Icon:
 * Administrative executive decree parchment with official departmental
 * stamped wax seal and legal clause lines.
 */
export function DirectivesIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Directives & Circulars</title>
      {/* Official document parchment with folded corner */}
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" />
      <path d="M14 2V8H20" />
      {/* Administrative directive text clauses */}
      <path d="M8 10H11" />
      <path d="M8 14H12" />
      {/* Official circular departmental seal at bottom-right */}
      <circle cx="15.5" cy="16.5" r="2.8" strokeWidth="1.5" />
      <path d="M14.2 19L13.5 21L15.5 20L17.5 21L16.8 19" strokeWidth="1.3" />
    </svg>
  );
}

/**
 * Custom Amendment Tracker Icon:
 * Temporal legislative versioning track with chronological progression ring
 * and amendment differential delta (Δ).
 */
export function AmendmentTrackerIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Amendment Tracker</title>
      {/* Temporal progress arc */}
      <path d="M3.5 12C3.5 7.3 7.3 3.5 12 3.5C16.7 3.5 20.5 7.3 20.5 12C20.5 16.7 16.7 20.5 12 20.5C9.2 20.5 6.7 19.1 5.2 17" />
      {/* Chronological forward evolution arrow */}
      <path d="M3 17.5H6.5V14" />
      {/* Legislative amendment delta (Δ) in center */}
      <path
        d="M12 8L15.5 14.5H8.5Z"
        fill="currentColor"
        fillOpacity="0.16"
        strokeWidth="1.5"
      />
      {/* Center anchor pin */}
      <circle cx="12" cy="12.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Custom Regulatory Updates Icon:
 * Gazette broadcast beacon and official alert bell with acoustic
 * radar waves notifying verified legal changes.
 */
export function RegulatoryUpdatesIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Regulatory Updates</title>
      {/* Official legal alert bell */}
      <path d="M18 8.5C18 5.46 15.31 3 12 3C8.69 3 6 5.46 6 8.5C6 14.5 4 16.5 4 16.5H20C20 16.5 18 14.5 18 8.5Z" />
      <path d="M10.2 19.5C10.6 20.4 11.2 21 12 21C12.8 21 13.4 20.4 13.8 19.5" />
      {/* Acoustic regulatory broadcast arcs */}
      <path d="M19.5 4.5C21 6 21.8 7.8 22 9.8" strokeWidth="1.5" />
      <path d="M4.5 4.5C3 6 2.2 7.8 2 9.8" strokeWidth="1.5" />
      {/* Alert status pulse indicator */}
      <circle cx="12" cy="8.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Custom New Chat Icon:
 * Conversation synthesis bubble with centered plus and clean geometry.
 */
export function NewChatIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>New Chat</title>
      {/* Research dialogue speech frame */}
      <path d="M12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C7.03 3 3 7.03 3 12C3 13.85 3.56 15.57 4.52 17L3.5 21L7.75 20.08C9.06 20.67 10.49 21 12 21Z" />
      {/* Synthesis Plus */}
      <path d="M12 8.5V15.5" />
      <path d="M8.5 12H15.5" />
    </svg>
  );
}

/**
 * Custom Panel Collapse / Expand Icon:
 * Architecture dock panel glyph with directional divider.
 */
export function PanelCollapseIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Collapse Sidebar</title>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M9 3V21" />
      <path d="M15 9.5L12.5 12L15 14.5" />
    </svg>
  );
}

export function PanelExpandIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Expand Sidebar</title>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M9 3V21" />
      <path d="M13 9.5L15.5 12L13 14.5" />
    </svg>
  );
}

/**
 * Custom About Platform Icon:
 * Architectural beacon glyph representing legal transparency and authority.
 */
export function AboutPlatformIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>About Taxora</title>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16V11" />
      <circle cx="12" cy="7.75" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Custom Contribute Knowledge Icon:
 * An authoritative quill pen writing onto a statutory decree parchment
 * with an elevated resonance node.
 */
export function ContributeIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Contribute Knowledge</title>
      {/* Statutory decree parchment outline */}
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" />
      <path d="M14 2V8H20" />
      {/* Precision quill / pen nib */}
      <path d="M10.5 12.5L14 9L15 10L11.5 13.5L10 14L10.5 12.5Z" />
      {/* Uplifted contribution spark */}
      <circle cx="15.5" cy="5.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M7 17H13" />
    </svg>
  );
}
