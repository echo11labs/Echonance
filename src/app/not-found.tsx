import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <svg
        className={styles.face}
        viewBox="0 0 320 380"
        width="320"
        height="380"
        role="img"
        aria-label="404: Page not found. The digits become a face that looks to the sides and blinks."
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="25"
        >
          <g className={styles.eyes} transform="translate(0, 112.5)">
            <g transform="translate(15, 0)">
              <polyline className={styles.lid} points="37,0 0,120 75,120" />
              <polyline
                className={styles.pupil}
                points="55,120 55,155"
                strokeDasharray="35 35"
              />
            </g>
            <g transform="translate(230, 0)">
              <polyline className={styles.lid} points="37,0 0,120 75,120" />
              <polyline
                className={styles.pupil}
                points="55,120 55,155"
                strokeDasharray="35 35"
              />
            </g>
          </g>
          <rect
            className={styles.nose}
            rx="4"
            ry="4"
            x="132.5"
            y="112.5"
            width="55"
            height="155"
          />
          <g strokeDasharray="102 102" transform="translate(65, 334)">
            <path
              className={styles.mouthLeft}
              d="M 0 30 C 0 30 40 0 95 0"
              strokeDashoffset="-102"
            />
            <path
              className={styles.mouthRight}
              d="M 95 0 C 150 0 190 30 190 30"
              strokeDashoffset="102"
            />
          </g>
        </g>
      </svg>
      <div className={styles.message}>
        <h1>Page not found</h1>
        <p>This page may have moved or the link may be outdated.</p>
        <Link href="/" className={styles.action}>
          Back to CA Ora
        </Link>
      </div>
    </main>
  );
}
