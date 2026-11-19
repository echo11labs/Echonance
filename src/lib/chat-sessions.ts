import type { ChatAttachment } from "@/app/chat-attachments";
import type { ChatMessage } from "@/app/chat-response";
import { findMockTaxAnswer, type ResponseLanguage } from "./mock-tax-chat";
import { generateId } from "./utils";

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  responseLang: ResponseLanguage;
  messages: ChatMessage[];
  isPinned?: boolean;
}

export interface ChatSessionSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  lastMessageSnippet?: string;
  isPinned?: boolean;
}

interface StoredAttachmentMeta {
  id: string;
  name: string;
  size: number;
  type: string;
  kind: ChatAttachment["kind"];
}

interface StoredChatMessage extends Omit<ChatMessage, "attachments"> {
  attachments?: StoredAttachmentMeta[];
}

interface StoredChatSession extends Omit<ChatSession, "messages"> {
  messages: StoredChatMessage[];
}

export const MAX_CHAT_SESSIONS = 3;
export const SESSIONS_STORAGE_KEY = "taxora_tax_chat_sessions_v2";
export const ACTIVE_SESSION_STORAGE_KEY = "taxora_tax_active_session_id_v2";

/**
 * Enforces the maximum retained session count (3 most recent individual sessions).
 */
export function limitSessions(sessions: ChatSession[]): ChatSession[] {
  return sessions.slice(0, MAX_CHAT_SESSIONS);
}

/**
 * Reconstruct a browser File stub from stored metadata.
 */
function deserializeAttachments(
  metas?: StoredAttachmentMeta[],
): ChatAttachment[] | undefined {
  if (!metas || metas.length === 0) return undefined;
  return metas.map((meta) => {
    let dummyFile: File;
    try {
      dummyFile = new File([""], meta.name, { type: meta.type });
    } catch {
      // Fallback for non-standard environments
      dummyFile = {
        name: meta.name,
        size: meta.size,
        type: meta.type,
      } as unknown as File;
    }
    return {
      id: meta.id,
      file: dummyFile,
      kind: meta.kind,
    };
  });
}

/**
 * Extract serializable metadata from browser File objects.
 */
function serializeAttachments(
  attachments?: ChatAttachment[],
): StoredAttachmentMeta[] | undefined {
  if (!attachments || attachments.length === 0) return undefined;
  return attachments.map((att) => ({
    id: att.id,
    name: att.file?.name || "attachment",
    size: att.file?.size || 0,
    type: att.file?.type || "application/octet-stream",
    kind: att.kind,
  }));
}

/**
 * Load individual stored sessions from localStorage (limited to MAX_CHAT_SESSIONS).
 */
export function loadStoredSessions(): ChatSession[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as StoredChatSession[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [];
    }

    // Hydrate messages and file stubs, capped to MAX_CHAT_SESSIONS
    return limitSessions(
      parsed.map((session) => ({
        ...session,
        messages: (session.messages || []).map((msg) => ({
          ...msg,
          attachments: deserializeAttachments(msg.attachments),
        })),
      })),
    );
  } catch (error) {
    console.warn("Failed to load sessions from localStorage:", error);
    return [];
  }
}

/**
 * Save individual sessions to localStorage safely (capped to MAX_CHAT_SESSIONS).
 */
export function saveStoredSessions(sessions: ChatSession[]): void {
  if (typeof window === "undefined") return;

  try {
    const capped = limitSessions(sessions);
    const serialized: StoredChatSession[] = capped.map((session) => ({
      ...session,
      messages: session.messages.map((msg) => ({
        ...msg,
        // live state should not be serialized
        isLiveThinking: false,
        isStreaming: false,
        attachments: serializeAttachments(msg.attachments),
      })),
    }));

    window.localStorage.setItem(
      SESSIONS_STORAGE_KEY,
      JSON.stringify(serialized),
    );
  } catch (error) {
    console.warn("Failed to save sessions to localStorage:", error);
  }
}

/**
 * Load active session ID from localStorage.
 */
export function loadActiveSessionId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Persist active session ID to localStorage.
 */
export function saveActiveSessionId(id: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (id) {
      window.localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, id);
    } else {
      window.localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
    }
  } catch {
    // Ignore storage quota/permission errors
  }
}

/**
 * Create a brand new blank chat session.
 */
export function createNewSession(
  initialTitle = "New Research Session",
  lang: ResponseLanguage = "en",
): ChatSession {
  const now = new Date().toISOString();
  const id = `session-${generateId()}`;
  return {
    id,
    title: initialTitle,
    createdAt: now,
    updatedAt: now,
    responseLang: lang,
    messages: [],
  };
}

/**
 * Generates a clean, punchy session title from the user's initial prompt.
 */
export function generateSessionTitle(
  prompt: string,
  lang: ResponseLanguage = "en",
): string {
  const cleanPrompt = prompt
    .replace(/@nepali\b/gi, "")
    .replace(/@नेपाली\b/g, "")
    .replace(/@english\b/gi, "")
    .trim();

  if (!cleanPrompt) return "New Research Session";

  // Check if query matches a known tax Q&A topic
  const matched = findMockTaxAnswer(cleanPrompt, lang);
  if (
    matched?.shortTopic &&
    matched.shortTopic !== "General Nepal Tax Advisory"
  ) {
    return matched.shortTopic;
  }

  // Otherwise, produce a clean title from the prompt's first few words
  const words = cleanPrompt.replace(/[^\w\s\u0900-\u097F]/g, "").split(/\s+/);
  const titleWords = words.slice(0, 5);
  let title = titleWords.join(" ");

  if (title.length > 36) {
    title = `${title.slice(0, 33)}...`;
  }

  // Capitalize first character
  return title.charAt(0).toUpperCase() + title.slice(1);
}

/**
 * Convert full session into lightweight summary for sidebar list.
 */
export function summarizeSession(session: ChatSession): ChatSessionSummary {
  const lastMsg = session.messages[session.messages.length - 1];
  let snippet: string | undefined;
  if (lastMsg) {
    snippet = lastMsg.text
      ? lastMsg.text.slice(0, 60)
      : "Research query in progress...";
  }

  return {
    id: session.id,
    title: session.title,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
    messageCount: session.messages.length,
    lastMessageSnippet: snippet,
    isPinned: session.isPinned,
  };
}
