"use client";

import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/source-sans-3";
import "@fontsource/spectral/latin-600.css";
import { type CSSProperties, type FormEvent, useState } from "react";
import styles from "./design-preview.module.css";

const palettes = [
  {
    id: "forest",
    name: "Forest green",
    colors: {
      Background: "#F7F8F4",
      Text: "#172522",
      Accent: "#145A47",
    },
    muted: "#52615C",
    border: "#D5DED8",
  },
  {
    id: "navy",
    name: "Navy blue",
    colors: {
      Background: "#F5F7FB",
      Text: "#182437",
      Accent: "#20467E",
    },
    muted: "#4D5D75",
    border: "#D6DFEB",
  },
  {
    id: "oxblood",
    name: "Oxblood and parchment",
    colors: {
      Background: "#FAF5EF",
      Text: "#2B211E",
      Accent: "#8A3C32",
    },
    muted: "#6D544B",
    border: "#E7D9D0",
  },
] as const;

const typeStyles = [
  {
    id: "clean",
    name: "Clean and readable",
    families: "Source Sans 3",
  },
  {
    id: "editorial",
    name: "Editorial headings",
    families: "Spectral + Source Sans 3",
  },
  {
    id: "modern",
    name: "Modern and compact",
    families: "Instrument Sans",
  },
] as const;

const heading = "Tax research";
const description = "Find and review Nepal’s tax documents.";

export default function DesignPreview() {
  const [palette, setPalette] = useState<(typeof palettes)[number]>(
    palettes[0],
  );
  const [typeStyle, setTypeStyle] = useState<(typeof typeStyles)[number]>(
    typeStyles[0],
  );
  const [sampleQuery, setSampleQuery] = useState("");

  function submitSample(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = new FormData(event.currentTarget).get("query");
    if (typeof term === "string") {
      setSampleQuery(term.trim());
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.wordmark}>Taxora</span>
          <h1>Colors &amp; typography</h1>
          <p>Choose a palette and a type style to preview them together.</p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.options}>
            <fieldset className={styles.group}>
              <legend>Color palettes</legend>
              <div className={styles.paletteGrid}>
                {palettes.map((option) => (
                  <label className={styles.option} key={option.id}>
                    <input
                      className={styles.radio}
                      type="radio"
                      name="palette"
                      value={option.id}
                      checked={palette.id === option.id}
                      onChange={() => setPalette(option)}
                      aria-label={option.name}
                    />
                    <span className={styles.optionTitle}>{option.name}</span>
                    <span className={styles.swatches}>
                      {Object.entries(option.colors).map(([role, color]) => (
                        <span className={styles.swatch} key={role}>
                          <span
                            aria-hidden="true"
                            className={styles.swatchColor}
                            style={{ backgroundColor: color }}
                          />
                          <span className={styles.swatchRole}>{role}</span>
                          <span className={styles.hex}>{color}</span>
                        </span>
                      ))}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.group}>
              <legend>Type styles</legend>
              <div className={styles.typeGrid}>
                {typeStyles.map((option) => (
                  <label
                    className={styles.option}
                    data-type={option.id}
                    key={option.id}
                  >
                    <input
                      className={styles.radio}
                      type="radio"
                      name="typography"
                      value={option.id}
                      checked={typeStyle.id === option.id}
                      onChange={() => setTypeStyle(option)}
                      aria-label={option.name}
                    />
                    <span className={styles.optionTitle}>{option.name}</span>
                    <span className={styles.families}>{option.families}</span>
                    <span className={styles.typeHeading}>{heading}</span>
                    <span className={styles.typeDescription}>
                      {description}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <section className={styles.preview} aria-labelledby="preview-title">
            <div className={styles.previewHeader}>
              <h2 id="preview-title">Live preview</h2>
              <p>
                {palette.name} · {typeStyle.name}
              </p>
            </div>

            <div
              className={styles.sample}
              data-type={typeStyle.id}
              style={
                {
                  "--sample-background": palette.colors.Background,
                  "--sample-text": palette.colors.Text,
                  "--sample-accent": palette.colors.Accent,
                  "--sample-muted": palette.muted,
                  "--sample-border": palette.border,
                } as CSSProperties
              }
            >
              <h3>{heading}</h3>
              <p className={styles.description}>{description}</p>

              <form className={styles.form} onSubmit={submitSample}>
                <label htmlFor="sample-query">Search documents</label>
                <div className={styles.formRow}>
                  <input
                    id="sample-query"
                    name="query"
                    defaultValue="VAT"
                    required
                    maxLength={80}
                  />
                  <button type="submit">Search</button>
                </div>
                <p className={styles.status} role="status">
                  {sampleQuery ? `Sample search: “${sampleQuery}”` : ""}
                </p>
              </form>

              <table className={styles.table}>
                <caption className={styles.visuallyHidden}>
                  Example document
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Document</th>
                    <th scope="col">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sample circular</td>
                    <td>Example 01</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
