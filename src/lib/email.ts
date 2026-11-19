interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export interface WaitlistEmailData {
  fullName: string;
  email: string;
  role: string;
  organization?: string;
  ticketId: string;
  cohort: string;
  useCases: string[];
}

export interface ContributorThankYouEmailData {
  contributorName: string;
  contributorEmail: string;
  icanNumber?: string;
  firmName?: string;
  submissionType: "qa" | "document";
  topicOrTitle: string;
  question?: string;
  category: string;
  fiscalYear: string;
}

const DEFAULT_SITE_ORIGIN = "https://taxora.echo11.tech";

function resolveSiteOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (!raw) return DEFAULT_SITE_ORIGIN;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface EmailShellOptions {
  subject: string;
  heroTag: string;
  headline: string;
  introHtml: string;
  highlightHtml: string;
  ctaLabel: string;
  ctaHref: string;
  footerNoteHtml: string;
}

function renderTaxoraEmailShell({
  subject,
  heroTag,
  headline,
  introHtml,
  highlightHtml,
  ctaLabel,
  ctaHref,
  footerNoteHtml,
}: EmailShellOptions): string {
  const origin = resolveSiteOrigin();
  const displayDomain = origin.replace(/^https?:\/\//, "");
  const logoUrl = `${origin}/taxora-logo.png`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0c1410;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f6f4;padding:36px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background-color:#ffffff;border:1px solid #e3ebe6;border-radius:12px;overflow:hidden;box-shadow:0 8px 28px rgba(6,8,7,0.06);">
            <tr>
              <td align="center" style="padding:42px 28px 38px;background-color:#060807;background-image:linear-gradient(158deg,#050807 0%,#07140e 56%,#093d27 84%,#00df81 100%);border-bottom:3px solid #00df81;">
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 14px;">
                  <tr>
                    <td align="center" style="width:48px;height:48px;border-radius:12px;background-color:#0b1510;border:1px solid rgba(0,223,129,0.42);padding:8px;">
                      <img src="${escapeHtml(logoUrl)}" width="32" height="32" alt="Taxora" style="display:block;width:32px;height:32px;border:0;outline:none;text-decoration:none;border-radius:6px;" />
                    </td>
                  </tr>
                </table>
                <div style="font-size:29px;line-height:1.15;font-weight:700;letter-spacing:-0.025em;color:#ffffff;">
                  Taxora<sup style="font-size:12px;font-weight:600;color:#00df81;letter-spacing:0.04em;margin-left:3px;vertical-align:super;">${escapeHtml(heroTag)}</sup>
                </div>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:38px 34px 36px;background-color:#ffffff;">
                <h1 style="margin:0 0 12px;font-size:21px;line-height:1.3;font-weight:700;letter-spacing:-0.02em;color:#0c1410;">
                  ${headline}
                </h1>
                <p style="margin:0 auto 24px;max-width:390px;font-size:14.5px;line-height:1.6;color:#5a6962;">
                  ${introHtml}
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:340px;margin:0 auto 24px;background-color:#f4faf7;border:1px solid #d5ece0;border-radius:6px;">
                  <tr>
                    <td align="center" style="padding:10px 14px;font-size:12.5px;line-height:1.5;color:#1b382b;">
                      ${highlightHtml}
                    </td>
                  </tr>
                </table>

                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto;">
                  <tr>
                    <td align="center" style="border-radius:7px;background-color:#00df81;background-image:linear-gradient(180deg,#00e888 0%,#00c471 100%);box-shadow:0 3px 12px rgba(0,223,129,0.28);">
                      <a href="${escapeHtml(ctaHref)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:13px 38px;font-size:14.5px;font-weight:700;line-height:1;letter-spacing:-0.01em;color:#04150d;text-decoration:none;border-radius:7px;">
                        ${escapeHtml(ctaLabel)}
                      </a>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:32px 0 24px;">
                  <tr>
                    <td style="border-top:1px dashed #dde5e0;font-size:1px;line-height:1px;">&nbsp;</td>
                  </tr>
                </table>

                <p style="margin:0 0 18px;font-size:12.5px;line-height:1.55;color:#6c7a73;">
                  ${footerNoteHtml}
                </p>
                <p style="margin:0;font-size:13px;line-height:1.4;">
                  <a href="${escapeHtml(origin)}" target="_blank" rel="noopener noreferrer" style="color:#5a6962;text-decoration:underline;">${escapeHtml(displayDomain)}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildWaitlistWelcomeEmail(data: WaitlistEmailData): {
  subject: string;
  html: string;
} {
  const origin = resolveSiteOrigin();
  const name = escapeHtml(data.fullName);
  const ticket = escapeHtml(data.ticketId);
  const cohort = escapeHtml(data.cohort);
  const email = escapeHtml(data.email);

  const subject = `You're on the Taxora Legal-1 Waitlist · ${data.ticketId}`;
  const html = renderTaxoraEmailShell({
    subject,
    heroTag: "Legal-1",
    headline: "You’re on the waitlist",
    introHtml: `Thank you for joining, <strong style="color:#0c1410;">${name}</strong>. Your early access pass for <strong style="color:#0c1410;">Taxora Legal-1</strong> — Nepal’s statutory tax intelligence workspace — is reserved.`,
    highlightHtml: `<span style="color:#5a6962;">Priority Pass:</span> <strong style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:#057a49;letter-spacing:0.05em;">${ticket}</strong><br /><span style="font-size:11.5px;color:#5a6962;">${cohort}</span>`,
    ctaLabel: "Explore Taxora",
    ctaHref: origin,
    footerNoteHtml: `Automated waitlist confirmation for <strong style="color:#45534c;">${email}</strong>.<br />Browse primary Nepal Acts &amp; IRD circulars anytime in our library.`,
  });

  return { subject, html };
}

export function buildContributorThankYouEmail(
  data: ContributorThankYouEmailData,
): {
  subject: string;
  html: string;
} {
  const origin = resolveSiteOrigin();
  const name = escapeHtml(data.contributorName || "Contributor");
  const title = escapeHtml(data.topicOrTitle);
  const category = escapeHtml(data.category);
  const fiscalYear = escapeHtml(data.fiscalYear);
  const ican = data.icanNumber ? escapeHtml(data.icanNumber) : "";
  const firm = data.firmName ? escapeHtml(data.firmName) : "";
  const email = escapeHtml(data.contributorEmail);
  const typeLabel =
    data.submissionType === "qa"
      ? "Tax Q&amp;A submission"
      : "statutory document";

  const attributionParts = [name];
  if (ican) attributionParts.push(`ICAN ${ican}`);
  if (firm) attributionParts.push(firm);
  const attributionLine = attributionParts.join(" · ");

  const subject = `Thank you for contributing to Taxora · ${data.topicOrTitle}`;
  const html = renderTaxoraEmailShell({
    subject,
    heroTag: "CA Hub",
    headline: "Contribution received",
    introHtml: `Thank you, <strong style="color:#0c1410;">${name}</strong>. We received your ${typeLabel} and will verify citations before crediting <strong style="color:#0c1410;">${attributionLine}</strong>.`,
    highlightHtml: `<strong style="color:#0c1410;">${title}</strong><br /><span style="font-size:11.5px;color:#5a6962;">${category} · FY ${fiscalYear}</span>`,
    ctaLabel: "Open CA Knowledge Hub",
    ctaHref: `${origin}/contribute`,
    footerNoteHtml: `Editorial confirmation sent to <strong style="color:#45534c;">${email}</strong>.`,
  });

  return { subject, html };
}

export async function sendResendEmail({
  to,
  subject,
  html,
  from,
}: SendEmailInput): Promise<{ ok: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[resend] RESEND_API_KEY is not configured.");
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const resolvedFrom =
    from?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "onboarding@resend.dev";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resolvedFrom,
        to,
        subject,
        html,
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
    };

    if (!res.ok) {
      const error = data.message || `Resend API error (${res.status})`;
      console.error(
        `[resend] Failed to send "${subject}" (status ${res.status}): ${error}`,
      );
      return { ok: false, error };
    }

    return { ok: true, id: data.id };
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : "Failed to send email.";
    console.error(`[resend] Request error for "${subject}": ${error}`);
    return { ok: false, error };
  }
}
