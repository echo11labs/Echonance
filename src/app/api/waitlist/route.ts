import { type NextRequest, NextResponse } from "next/server";
import {
  buildWaitlistWelcomeEmail,
  escapeHtml,
  sendResendEmail,
} from "@/lib/email";
import { generateId } from "@/lib/utils";

export interface WaitlistSubmissionRecord {
  id: string;
  ticketId: string;
  cohort: string;
  fullName: string;
  email: string;
  role: string;
  organization?: string;
  useCases: string[];
  source: "session_limit" | "sidebar_cta";
  joinedAt: string;
}

const waitlistStore: WaitlistSubmissionRecord[] = [];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildTicketCode(email: string): string {
  let hash = 2166136261;
  const normalized = email.toLowerCase().trim();
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const code = Math.abs(hash)
    .toString(36)
    .toUpperCase()
    .slice(0, 5)
    .padEnd(5, "7");
  return `TXR-L1-${code}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase()
      .slice(0, 160);

    if (!email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    const derivedName = email
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const fullName =
      String(body.fullName || "")
        .trim()
        .slice(0, 120) || derivedName;
    const role = String(body.role || "Tax Practitioner")
      .trim()
      .slice(0, 80);
    const organization = String(body.organization || "")
      .trim()
      .slice(0, 140);
    const useCases = Array.isArray(body.useCases)
      ? body.useCases
          .map((item: unknown) => String(item || "").trim())
          .filter(Boolean)
          .slice(0, 6)
      : ["Unlimited Chat Sessions", "Taxora Legal-1 Model"];
    const source =
      body.source === "session_limit" ? "session_limit" : "sidebar_cta";

    const existingIndex = waitlistStore.findIndex(
      (item) => item.email === email,
    );
    const record: WaitlistSubmissionRecord = {
      id:
        existingIndex >= 0
          ? waitlistStore[existingIndex].id
          : `wl-${generateId()}`,
      ticketId: buildTicketCode(email),
      cohort: "Founding Cohort • Wave 1",
      fullName,
      email,
      role,
      organization: organization || undefined,
      useCases,
      source,
      joinedAt:
        existingIndex >= 0
          ? waitlistStore[existingIndex].joinedAt
          : new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      waitlistStore[existingIndex] = record;
    } else {
      waitlistStore.unshift(record);
    }

    const notifyTo =
      process.env.WAITLIST_NOTIFY_EMAIL?.trim() || "taxora8@gmail.com";
    const welcome = buildWaitlistWelcomeEmail(record);

    await Promise.all([
      sendResendEmail({
        to: record.email,
        subject: welcome.subject,
        html: welcome.html,
      }),
      sendResendEmail({
        to: notifyTo,
        subject: `Taxora Legal-1 Waitlist: ${record.fullName} (${record.ticketId})`,
        html: `<p><strong>New Taxora Legal-1 Waitlist Signup</strong></p>
          <ul>
            <li><strong>Name:</strong> ${escapeHtml(record.fullName)}</li>
            <li><strong>Email:</strong> ${escapeHtml(record.email)}</li>
            <li><strong>Role:</strong> ${escapeHtml(record.role)}</li>
            <li><strong>Ticket:</strong> ${escapeHtml(record.ticketId)}</li>
            <li><strong>Source:</strong> ${escapeHtml(record.source)}</li>
          </ul>`,
      }),
    ]);

    return NextResponse.json({
      status: "success",
      message: "You are on the early access waitlist for Taxora Legal-1.",
      entry: record,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Unable to process waitlist request.";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
