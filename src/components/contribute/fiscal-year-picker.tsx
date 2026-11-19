"use client";

import { CalendarRange, Check, ChevronDown, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CONTRIBUTE_COPY,
  type ContributeLocale,
} from "@/components/contribute/contribute-i18n";
import styles from "./fiscal-year-picker.module.css";

interface FiscalYearMeta {
  fy: string;
  bsStart: number;
  adSpan: string;
  decadeKey: string;
  decadeLabel: string;
  tag?: { label: string; isCurrent?: boolean };
}

function getFiscalYearMeta(
  fy: string,
  index: number,
  locale: ContributeLocale,
): FiscalYearMeta {
  const copy = CONTRIBUTE_COPY[locale].fiscalPicker;
  const bsStart = Number.parseInt(fy.split("/")[0] ?? "2083", 10);
  // Nepal's fiscal year begins in Shrawan (mid-July): BS - 57 marks the starting Gregorian year
  const adStart = bsStart - 57;
  const adNextShort = String((adStart + 1) % 100).padStart(2, "0");
  const decadeStart = Math.floor(bsStart / 10) * 10;

  let tag: { label: string; isCurrent?: boolean } | undefined;
  if (index === 0) {
    tag = { label: copy.currentTag, isCurrent: true };
  } else if (fy === "2058/59") {
    tag = { label: copy.itaTag };
  } else if (fy === "2052/53") {
    tag = { label: copy.vatTag };
  }

  return {
    fy,
    bsStart,
    adSpan: `${adStart}/${adNextShort} AD`,
    decadeKey: `${decadeStart}s`,
    decadeLabel: `${decadeStart}s ${copy.decadeSuffix}`,
    tag,
  };
}

interface FiscalYearPickerProps {
  id?: string;
  value: string;
  years: readonly string[];
  onChange: (value: string) => void;
  locale?: ContributeLocale;
  align?: "left" | "right";
  ariaLabel?: string;
}

export function FiscalYearPicker({
  id,
  value,
  years,
  onChange,
  locale = "en",
  align = "left",
  ariaLabel,
}: FiscalYearPickerProps) {
  const copy = CONTRIBUTE_COPY[locale].fiscalPicker;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeDecade, setActiveDecade] = useState<string>("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const allMeta = useMemo(
    () => years.map((fy, idx) => getFiscalYearMeta(fy, idx, locale)),
    [years, locale],
  );

  const decades = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const item of allMeta) {
      if (!seen.has(item.decadeKey)) {
        seen.add(item.decadeKey);
        list.push(item.decadeKey);
      }
    }
    return list;
  }, [allMeta]);

  const filteredMeta = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return allMeta;
    return allMeta.filter(
      (item) =>
        item.fy.toLowerCase().includes(trimmed) ||
        item.adSpan.toLowerCase().includes(trimmed) ||
        item.tag?.label.toLowerCase().includes(trimmed),
    );
  }, [allMeta, query]);

  const groupedMeta = useMemo(() => {
    const groups: {
      decadeKey: string;
      decadeLabel: string;
      items: FiscalYearMeta[];
    }[] = [];
    for (const item of filteredMeta) {
      const existing = groups.find((g) => g.decadeKey === item.decadeKey);
      if (existing) {
        existing.items.push(item);
      } else {
        groups.push({
          decadeKey: item.decadeKey,
          decadeLabel: item.decadeLabel,
          items: [item],
        });
      }
    }
    return groups;
  }, [filteredMeta]);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleGlobalKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const selectedMeta = allMeta.find((m) => m.fy === value) ?? allMeta[0];
    if (selectedMeta) {
      setActiveDecade(selectedMeta.decadeKey);
    }

    const focusTimer = window.setTimeout(() => {
      searchInputRef.current?.focus({ preventScroll: true });
      const selectedEl = scrollRef.current?.querySelector<HTMLElement>(
        `[data-fy="${value}"]`,
      );
      selectedEl?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 60);

    return () => window.clearTimeout(focusTimer);
  }, [isOpen, value, allMeta]);

  function handleScroll() {
    const container = scrollRef.current;
    if (!container) return;

    const containerTop = container.getBoundingClientRect().top;
    let closestDecade = decades[0] ?? "";
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const decade of decades) {
      const groupEl = groupRefs.current[decade];
      if (!groupEl) continue;
      const dist = Math.abs(groupEl.getBoundingClientRect().top - containerTop);
      if (dist < closestDistance) {
        closestDistance = dist;
        closestDecade = decade;
      }
    }

    if (closestDecade && closestDecade !== activeDecade) {
      setActiveDecade(closestDecade);
    }
  }

  function jumpToDecade(decadeKey: string) {
    setQuery("");
    setActiveDecade(decadeKey);
    window.requestAnimationFrame(() => {
      const groupEl = groupRefs.current[decadeKey];
      groupEl?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }

  function handleTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
    }
  }

  const currentFy = years[0] ?? "2083/84";

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className={styles.triggerLeft}>
          <CalendarRange
            size={14}
            className={styles.triggerIcon}
            aria-hidden="true"
          />
          <span className={styles.triggerText}>
            {copy.triggerPrefix} {value}
          </span>
        </span>
        <ChevronDown
          size={14}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.popover} ${
              align === "right" ? styles.alignRight : styles.alignLeft
            }`}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.topControls}>
              <div className={styles.searchWrap}>
                <Search
                  size={12}
                  className={styles.searchIcon}
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder={copy.searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label={copy.searchAria}
                />
                {query && (
                  <button
                    type="button"
                    className={styles.searchClearBtn}
                    onClick={() => setQuery("")}
                    aria-label={copy.clearSearchAria}
                  >
                    <X size={11} />
                  </button>
                )}
              </div>

              <fieldset
                className={styles.decadeRail}
                aria-label={copy.decadeRailAria}
              >
                {decades.map((decade) => (
                  <button
                    key={decade}
                    type="button"
                    className={`${styles.decadePill} ${
                      activeDecade === decade && !query
                        ? styles.decadePillActive
                        : ""
                    }`}
                    onClick={() => jumpToDecade(decade)}
                  >
                    {decade}
                  </button>
                ))}
              </fieldset>
            </div>

            <div
              ref={scrollRef}
              className={styles.timelineScroll}
              role="listbox"
              aria-label={copy.decadeRailAria}
              onScroll={handleScroll}
            >
              {groupedMeta.length === 0 ? (
                <div className={styles.emptyState}>
                  {copy.emptyMatch(query)}
                </div>
              ) : (
                groupedMeta.map((group) => (
                  <div
                    key={group.decadeKey}
                    ref={(el) => {
                      groupRefs.current[group.decadeKey] = el;
                    }}
                    className={styles.decadeGroup}
                  >
                    <div className={styles.decadeHeader}>
                      <span>{group.decadeLabel}</span>
                      <span>
                        {group.items.length} {copy.yearsCountSuffix}
                      </span>
                    </div>

                    <div className={styles.timelineList}>
                      {group.items.map((item) => {
                        const isSelected = item.fy === value;
                        return (
                          <button
                            key={item.fy}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            data-fy={item.fy}
                            className={`${styles.yearRow} ${
                              isSelected ? styles.yearRowSelected : ""
                            }`}
                            onClick={() => {
                              onChange(item.fy);
                              setIsOpen(false);
                            }}
                          >
                            <span
                              className={styles.yearNode}
                              aria-hidden="true"
                            />
                            <span className={styles.yearMain}>
                              <span className={styles.yearBs}>
                                {copy.triggerPrefix} {item.fy}
                              </span>
                              <span className={styles.yearAd}>
                                {item.adSpan}
                              </span>
                            </span>

                            <span className={styles.yearRight}>
                              {item.tag && (
                                <span
                                  className={`${styles.badge} ${
                                    item.tag.isCurrent
                                      ? styles.badgeCurrent
                                      : ""
                                  }`}
                                >
                                  {item.tag.label}
                                </span>
                              )}
                              {isSelected && (
                                <Check
                                  size={13}
                                  className={styles.checkIcon}
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className={styles.footer}>
              <span className={styles.footerCount}>
                {copy.footerCount(filteredMeta.length, years.length)}
              </span>
              {value !== currentFy && (
                <button
                  type="button"
                  className={styles.jumpCurrentBtn}
                  onClick={() => {
                    onChange(currentFy);
                    setIsOpen(false);
                  }}
                >
                  {copy.jumpCurrentBtn(currentFy)}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
