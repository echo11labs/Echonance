"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import {
  Check,
  Clock,
  Edit2,
  MessageSquare,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  AboutPlatformIcon,
  AmendmentTrackerIcon,
  ContributeIcon,
  DirectivesIcon,
  NewChatIcon,
  PanelCollapseIcon,
  PanelExpandIcon,
  RegulatoryUpdatesIcon,
  TaxAssistantIcon,
  TaxLawLibraryIcon,
} from "@/app/custom-icons";
import {
  type ChatSessionSummary,
  getChatSessionLimit,
  loadActiveSessionId,
  loadStoredSessions,
  MAX_CHAT_SESSIONS,
  saveActiveSessionId,
  saveStoredSessions,
} from "@/lib/chat-sessions";
import { AuthNavControls, useAuthStatus } from "./auth-provider";
import { SessionLimitModal } from "./session-limit-modal";
import { loadStoredWaitlistPass, WaitlistModal } from "./waitlist-modal";
import styles from "./app-sidebar.module.css";

export interface NavLinkItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const WORKSPACE_NAVIGATION: { label: string; links: NavLinkItem[] }[] = [
  {
    label: "Workspace",
    links: [
      {
        id: "tax-assistant",
        name: "CA Ora",
        href: "/",
        icon: TaxAssistantIcon,
      },
    ],
  },
  {
    label: "Research",
    links: [
      {
        id: "tax-law-library",
        name: "Tax Law Library",
        href: "/tax-law-library",
        icon: TaxLawLibraryIcon,
      },
      {
        id: "directives",
        name: "Directives & Circulars",
        href: "/#directives",
        icon: DirectivesIcon,
      },
      {
        id: "amendments",
        name: "Amendment Tracker",
        href: "/#amendments",
        icon: AmendmentTrackerIcon,
      },
      {
        id: "regulatory-updates",
        name: "Regulatory updates",
        href: "/#regulatory-updates",
        icon: RegulatoryUpdatesIcon,
      },
    ],
  },
  {
    label: "Community",
    links: [
      {
        id: "contribute",
        name: "CA Knowledge Hub",
        href: "/contribute",
        icon: ContributeIcon,
      },
    ],
  },
  {
    label: "Platform",
    links: [
      {
        id: "about",
        name: "About Taxora",
        href: "/about",
        icon: AboutPlatformIcon,
      },
    ],
  },
];

export interface AppSidebarProps {
  current?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNewChat?: () => void;
  onNavigate?: (id: string) => void;
  sessions?: ChatSessionSummary[];
  activeSessionId?: string | null;
  onSelectSession?: (sessionId: string) => void;
  onDeleteSession?: (sessionId: string) => void;
  onRenameSession?: (sessionId: string, newTitle: string) => void;
  waitlistOpen?: boolean;
  waitlistReason?: "limit_reached" | "direct";
  waitlistPassCode?: string | null;
  onOpenWaitlist?: (reason?: "limit_reached" | "direct") => void;
  onCloseWaitlist?: () => void;
  guestLimitOpen?: boolean;
  onOpenGuestLimit?: () => void;
  onCloseGuestLimit?: () => void;
  onDeleteAndRestart?: () => void;
}

export function AppSidebar({
  current,
  collapsed = false,
  onToggleCollapse,
  onNewChat,
  onNavigate,
  sessions,
  activeSessionId,
  onSelectSession,
  onDeleteSession,
  onRenameSession,
  waitlistOpen,
  waitlistReason,
  waitlistPassCode,
  onOpenWaitlist,
  onCloseWaitlist,
  guestLimitOpen,
  onOpenGuestLimit,
  onCloseGuestLimit,
  onDeleteAndRestart,
}: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    isLoaded: authLoaded,
    isSignedIn,
    clerkConfigured,
    openSignIn,
  } = useAuthStatus();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [internalWaitlistOpen, setInternalWaitlistOpen] = useState(false);
  const [internalWaitlistReason, setInternalWaitlistReason] = useState<
    "limit_reached" | "direct"
  >("direct");
  const [internalGuestLimitOpen, setInternalGuestLimitOpen] = useState(false);
  const [hasJoinedWaitlist, setHasJoinedWaitlist] = useState(false);
  const [waitlistDismissed, setWaitlistDismissed] = useState(false);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasJoinedWaitlist(Boolean(loadStoredWaitlistPass()));
  }, []);

  const isGuestLimited = clerkConfigured && authLoaded && !isSignedIn;
  const effectiveSessionLimit = getChatSessionLimit(
    !authLoaded ? true : isSignedIn,
    clerkConfigured,
  );

  const isWaitlistModalOpen = waitlistOpen ?? internalWaitlistOpen;
  const activeWaitlistReason = waitlistReason ?? internalWaitlistReason;
  const isGuestLimitModalOpen = guestLimitOpen ?? internalGuestLimitOpen;

  useEffect(() => {
    if (isSignedIn) {
      setInternalGuestLimitOpen(false);
    }
  }, [isSignedIn]);

  function triggerOpenWaitlist(reason: "limit_reached" | "direct" = "direct") {
    setMobileOpen(false);
    if (onOpenWaitlist) {
      onOpenWaitlist(reason);
    } else {
      setInternalWaitlistReason(reason);
      setInternalWaitlistOpen(true);
    }
  }

  function triggerCloseWaitlist() {
    if (onCloseWaitlist) {
      onCloseWaitlist();
    } else {
      setInternalWaitlistOpen(false);
    }
  }

  function triggerOpenGuestLimit() {
    setMobileOpen(false);
    if (onOpenGuestLimit) {
      onOpenGuestLimit();
    } else {
      setInternalGuestLimitOpen(true);
    }
  }

  function triggerCloseGuestLimit() {
    if (onCloseGuestLimit) {
      onCloseGuestLimit();
    } else {
      setInternalGuestLimitOpen(false);
    }
  }

  function handleGuestSignIn() {
    triggerCloseGuestLimit();
    if (clerkConfigured) {
      openSignIn();
    } else {
      router.push("/sign-in");
    }
  }

  function handleGuestDeleteAndRestart() {
    triggerCloseGuestLimit();
    if (onDeleteAndRestart) {
      onDeleteAndRestart();
      return;
    }

    const stored = loadStoredSessions();
    const targetId = activeSessionId ?? loadActiveSessionId() ?? stored[0]?.id;
    const remaining = targetId ? stored.filter((s) => s.id !== targetId) : [];
    saveStoredSessions(remaining);
    const nextActiveId = remaining[0]?.id ?? null;
    saveActiveSessionId(nextActiveId);
    router.push(nextActiveId ? `/?session=${nextActiveId}` : "/");
  }

  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const activeId =
    current ??
    (pathname === "/tax-law-library"
      ? "tax-law-library"
      : pathname === "/about"
        ? "about"
        : pathname === "/contribute"
          ? "contribute"
          : "tax-assistant");

  function handleNavClick(linkId: string) {
    setMobileOpen(false);
    onNavigate?.(linkId);
  }

  function handleSessionLimitReached(): boolean {
    if (!sessions) return false;
    const limit = getChatSessionLimit(isSignedIn, clerkConfigured);
    if (sessions.length < limit) return false;

    if (clerkConfigured && !isSignedIn) {
      triggerOpenGuestLimit();
    } else {
      triggerOpenWaitlist("limit_reached");
    }
    return true;
  }

  function handleNewChatClick() {
    setMobileOpen(false);
    if (handleSessionLimitReached()) {
      return;
    }
    onNewChat?.();
  }

  function handleNewChatLinkClick(e: MouseEvent<HTMLAnchorElement>) {
    if (handleSessionLimitReached()) {
      e.preventDefault();
      return;
    }
    handleNavClick("tax-assistant");
  }

  function handleStartRename(id: string, title: string) {
    setEditingSessionId(id);
    setEditTitle(title);
    setTimeout(() => {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }, 40);
  }

  function handleSaveRename(id: string) {
    if (editTitle.trim()) {
      onRenameSession?.(id, editTitle.trim());
    }
    setEditingSessionId(null);
  }

  const renderSessionsList = (isMobile = false) => {
    if (!sessions || sessions.length === 0) return null;

    return (
      <div
        className={styles.sessionsGroup}
        id={
          isMobile ? "mobile-sidebar-saved-sessions" : "sidebar-saved-sessions"
        }
      >
        <div className={styles.sessionsHeader}>
          <p className={styles.navHeading}>Saved Sessions</p>
          <span
            className={styles.sessionsLimitBadge}
            title={
              isGuestLimited
                ? "1 free guest session (sign in for 2 more)"
                : `Up to ${MAX_CHAT_SESSIONS} saved sessions`
            }
          >
            {sessions.length}/{effectiveSessionLimit}
          </span>
        </div>
        <ul className={styles.sessionsList} aria-label="Saved chat sessions">
          {sessions.map((session) => {
            const isActive = session.id === activeSessionId;
            const isEditing = editingSessionId === session.id;

            if (isEditing) {
              return (
                <li key={session.id} className={styles.sessionItem}>
                  <form
                    className={styles.sessionRenameForm}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveRename(session.id);
                    }}
                  >
                    <input
                      ref={renameInputRef}
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setEditingSessionId(null);
                      }}
                      className={styles.sessionRenameInput}
                      aria-label="Rename session"
                      maxLength={48}
                    />
                    <button
                      type="submit"
                      className={styles.sessionActionBtn}
                      title="Save title"
                      aria-label="Save title"
                    >
                      <Check size={12} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className={styles.sessionActionBtn}
                      onClick={() => setEditingSessionId(null)}
                      title="Cancel rename"
                      aria-label="Cancel rename"
                    >
                      <X size={12} aria-hidden="true" />
                    </button>
                  </form>
                </li>
              );
            }

            return (
              <li
                key={session.id}
                className={styles.sessionItem}
                data-active={isActive ? "true" : undefined}
              >
                {pathname === "/" ? (
                  <button
                    type="button"
                    className={styles.sessionItemButton}
                    onClick={() => {
                      if (isMobile) setMobileOpen(false);
                      onSelectSession?.(session.id);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    title={session.title}
                  >
                    <MessageSquare
                      className={styles.sessionIcon}
                      size={14}
                      aria-hidden="true"
                    />
                    <span className={styles.sessionLabel}>{session.title}</span>
                  </button>
                ) : (
                  <Link
                    href={`/?session=${session.id}`}
                    className={styles.sessionItemButton}
                    onClick={() => {
                      if (isMobile) setMobileOpen(false);
                      onSelectSession?.(session.id);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    title={session.title}
                  >
                    <MessageSquare
                      className={styles.sessionIcon}
                      size={14}
                      aria-hidden="true"
                    />
                    <span className={styles.sessionLabel}>{session.title}</span>
                  </Link>
                )}

                <div className={styles.sessionActions}>
                  {onRenameSession && (
                    <button
                      type="button"
                      className={styles.sessionActionBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleStartRename(session.id, session.title);
                      }}
                      title="Rename session"
                      aria-label={`Rename ${session.title}`}
                    >
                      <Edit2 size={11} aria-hidden="true" />
                    </button>
                  )}
                  {onDeleteSession && (
                    <button
                      type="button"
                      className={styles.sessionActionBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onDeleteSession(session.id);
                      }}
                      title="Delete session"
                      aria-label={`Delete ${session.title}`}
                    >
                      <Trash2 size={11} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        {isGuestLimited && sessions.length >= effectiveSessionLimit ? (
          <button
            type="button"
            className={styles.sessionLimitWaitlistBtn}
            onClick={triggerOpenGuestLimit}
          >
            <Sparkles size={12} aria-hidden="true" />
            <span>1/1 guest limit • Sign in for +2 →</span>
          </button>
        ) : (
          sessions.length >= MAX_CHAT_SESSIONS && (
            <button
              type="button"
              className={styles.sessionLimitWaitlistBtn}
              onClick={() => triggerOpenWaitlist("limit_reached")}
            >
              <Sparkles size={12} aria-hidden="true" />
              <span>3/3 limit • Join Legal-1 Waitlist →</span>
            </button>
          )
        )}
      </div>
    );
  };

  const renderWaitlistCard = (isCollapsed = false) => {
    if (waitlistDismissed) return null;

    if (isCollapsed) {
      return (
        <button
          type="button"
          className={styles.waitlistCollapsedBtn}
          onClick={() => triggerOpenWaitlist("direct")}
          title="Join Taxora Legal-1 Model Waitlist"
          aria-label="Join Taxora Legal-1 Model Waitlist"
        >
          <Sparkles size={15} aria-hidden="true" />
        </button>
      );
    }

    return (
      <div className={styles.waitlistSidebarCard}>
        <div className={styles.waitlistCardTop}>
          <div className={styles.waitlistHeaderLeft}>
            <span className={styles.waitlistCardTitle}>Taxora Legal-1</span>
            <span className={styles.waitlistBetaBadge}>Beta</span>
          </div>
          <button
            type="button"
            className={styles.waitlistDismissBtn}
            aria-label="Dismiss waitlist card"
            onClick={() => setWaitlistDismissed(true)}
          >
            <X size={12} aria-hidden="true" />
          </button>
        </div>
        <p className={styles.waitlistCardSub}>
          {hasJoinedWaitlist
            ? "Your founding cohort pass is reserved."
            : "Get priority access to Nepal's statutory AI & unlimited sessions."}
        </p>
        <button
          type="button"
          className={styles.waitlistEnableBtn}
          onClick={() => triggerOpenWaitlist("direct")}
        >
          {hasJoinedWaitlist ? "View Pass" : "Join Waitlist"}
        </button>
      </div>
    );
  };

  const renderNavLinks = (isMobile = false) => (
    <nav
      className={styles.navigation}
      id={isMobile ? "mobile-sidebar-navigation" : "sidebar-navigation"}
      aria-label="Workspace"
    >
      {WORKSPACE_NAVIGATION.map(({ label, links }) => (
        <div key={label} className={styles.navGroup}>
          <p className={styles.navHeading}>{label}</p>
          {links.map((link) => {
            const Icon = link.icon;
            const isCurrent = activeId === link.id;
            return (
              <Link
                href={link.href}
                key={link.id}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={link.name}
                title={link.name}
                onClick={() => handleNavClick(link.id)}
              >
                <Icon aria-hidden="true" />
                <span className={styles.navLabel}>{link.name}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile Top Navigation Bar (Visible only on mobile devices) */}
      <header className={styles.mobileBar}>
        <button
          className={styles.mobileBarTrigger}
          type="button"
          aria-label="Open navigation sidebar"
          title="Open navigation sidebar"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-drawer"
          onClick={() => setMobileOpen(true)}
        >
          <PanelExpandIcon aria-hidden="true" />
        </button>

        <Link
          href="/"
          className={styles.brand}
          aria-label="Taxora CA Ora"
          onClick={() => handleNavClick("tax-assistant")}
        >
          <span className={styles.brandMark} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className={styles.brandLabel}>Taxora</span>
        </Link>

        {onNewChat ? (
          <button
            className={styles.mobileBarNewChat}
            type="button"
            aria-label="New chat"
            title="New chat"
            onClick={handleNewChatClick}
          >
            <NewChatIcon aria-hidden="true" />
          </button>
        ) : (
          <Link
            href="/"
            className={styles.mobileBarNewChat}
            aria-label="New chat"
            title="New chat"
            onClick={handleNewChatLinkClick}
          >
            <NewChatIcon aria-hidden="true" />
          </Link>
        )}
      </header>

      {/* Desktop Canonical Sidebar */}
      <aside
        className={styles.sidebar}
        data-collapsed={collapsed}
        aria-label="Taxora sidebar"
      >
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.brand} aria-label="Taxora CA Ora">
            <Image
              src="/taxora-logo.png"
              alt=""
              width={28}
              height={28}
              className={styles.brandLogoImg}
              priority
            />
            <span className={styles.brandLabel}>Taxora</span>
          </Link>

          {onToggleCollapse && (
            <button
              className={`${styles.iconButton} ${styles.desktopToggle}`}
              type="button"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-controls="sidebar-navigation"
              aria-expanded={!collapsed}
              onClick={onToggleCollapse}
            >
              {collapsed ? (
                <PanelExpandIcon aria-hidden="true" />
              ) : (
                <PanelCollapseIcon aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        {onNewChat ? (
          <button
            className={styles.newChat}
            type="button"
            onClick={handleNewChatClick}
            aria-label="New chat"
            title="New chat"
          >
            <NewChatIcon aria-hidden="true" />
            <span className={styles.navLabel}>New chat</span>
          </button>
        ) : (
          <Link
            href="/"
            className={styles.newChat}
            aria-label="New chat"
            title="New chat"
            onClick={handleNewChatLinkClick}
          >
            <NewChatIcon aria-hidden="true" />
            <span className={styles.navLabel}>New chat</span>
          </Link>
        )}

        {/* Saved Sessions list in expanded mode */}
        {!collapsed && renderSessionsList(false)}

        {/* Collapsed session button with indicator */}
        {collapsed && sessions && sessions.length > 0 && (
          <div className={styles.collapsedSessionsContainer}>
            <button
              type="button"
              className={styles.collapsedSessionsBtn}
              onClick={onToggleCollapse}
              title={`Saved sessions (${sessions.length})`}
              aria-label={`Saved sessions (${sessions.length})`}
            >
              <Clock size={16} aria-hidden="true" />
              <span className={styles.collapsedBadge}>{sessions.length}</span>
            </button>
          </div>
        )}

        {renderNavLinks(false)}

        <div className={styles.sidebarBottom}>
          {renderWaitlistCard(collapsed)}
          <AuthNavControls collapsed={collapsed} />
        </div>
      </aside>

      {mobileOpen && (
        <>
          <button
            type="button"
            className={styles.mobileBackdrop}
            aria-label="Close navigation sidebar"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            id="mobile-navigation-drawer"
            className={styles.mobileMenu}
            aria-label="Expanded sidebar"
          >
            <div className={styles.sidebarHeader}>
              <Link
                href="/"
                className={styles.brand}
                onClick={() => handleNavClick("tax-assistant")}
              >
                <Image
                  src="/taxora-logo.png"
                  alt=""
                  width={28}
                  height={28}
                  className={styles.brandLogoImg}
                  priority
                />
                <span className={styles.brandLabel}>Taxora</span>
              </Link>
              <button
                className={styles.iconButton}
                type="button"
                aria-label="Close sidebar"
                onClick={() => setMobileOpen(false)}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            {onNewChat ? (
              <button
                className={styles.newChat}
                type="button"
                onClick={handleNewChatClick}
              >
                <NewChatIcon aria-hidden="true" />
                <span className={styles.navLabel}>New chat</span>
              </button>
            ) : (
              <Link
                href="/"
                className={styles.newChat}
                onClick={handleNewChatLinkClick}
              >
                <NewChatIcon aria-hidden="true" />
                <span className={styles.navLabel}>New chat</span>
              </Link>
            )}

            {/* Saved Sessions in Mobile Menu */}
            {renderSessionsList(true)}

            {renderNavLinks(true)}

            <div className={styles.sidebarBottom}>
              {renderWaitlistCard(false)}
              <AuthNavControls />
            </div>
          </aside>
        </>
      )}

      <WaitlistModal
        open={isWaitlistModalOpen}
        reason={activeWaitlistReason}
        initialPassCode={waitlistPassCode}
        onClose={triggerCloseWaitlist}
        onPassUpdated={() => setHasJoinedWaitlist(true)}
      />

      <SessionLimitModal
        open={isGuestLimitModalOpen}
        hasSessions={Boolean(sessions && sessions.length > 0)}
        onClose={triggerCloseGuestLimit}
        onSignIn={handleGuestSignIn}
        onDeleteAndRestart={handleGuestDeleteAndRestart}
      />
    </>
  );
}

export default AppSidebar;
