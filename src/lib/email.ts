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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildWaitlistWelcomeEmail(data: WaitlistEmailData): {
  subject: string;
  html: string;
} {
  const name = escapeHtml(data.fullName);
  const ticket = escapeHtml(data.ticketId);
  const cohort = escapeHtml(data.cohort);
  const role = escapeHtml(data.role);
  const org = data.organization ? escapeHtml(data.organization) : "";
  const useCasesHtml = data.useCases
    .slice(0, 4)
    .map(
      (item) =>
        `<li style="margin:0 0 6px;color:#c7d3cd;font-size:14px;line-height:1.5;">${escapeHtml(item)}</li>`,
    )
    .join("");

  const subject = `You're on the Taxora Legal-1 Waitlist · ${data.ticketId}`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${subject}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#060807;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f4f5f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#060807;padding:36px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#0d1210;border:1px solid #1f2b25;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px 20px;border-bottom:1px solid #19241e;background:linear-gradient(135deg,#0d1511 0%,#0b100e 100%);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <span style="font-size:15px;font-weight:700;letter-spacing:0.22em;color:#f4f5f4;">TAXORA</span>
                    </td>
                    <td align="right">
                      <span style="display:inline-block;padding:3px 10px;border-radius:999px;background-color:rgba(0,223,129,0.12);border:1px solid rgba(0,223,129,0.35);color:#6ee7b7;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">BETA ACCESS</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#00df81;">
                  Waitlist Confirmed
                </p>
                <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;font-weight:600;color:#f4f5f4;">
                  Thank you for joining, ${name}.
                </h1>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#b8c4be;">
                  Your spot for <strong style="color:#f4f5f4;">Taxora Legal-1</strong>—Nepal’s statutory tax intelligence workspace—is reserved. We’re onboarding practitioners in waves and will notify you as soon as your access unlocks.
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;background-color:#080c0a;border:1px solid #1f3328;border-radius:12px;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#7d8d85;">
                            Priority Pass
                          </td>
                          <td align="right" style="font-size:11px;color:#6ee7b7;font-weight:600;">
                            ${cohort}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding-top:8px;font-size:20px;font-weight:700;letter-spacing:0.08em;color:#00df81;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">
                            ${ticket}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding-top:10px;font-size:13px;color:#9aa7a0;">
                            Role: <strong style="color:#e1e8e4;">${role}</strong>${org ? ` · ${org}` : ""}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 10px;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#8ea097;">
                  Reserved Access Highlights
                </p>
                <ul style="margin:0 0 24px;padding-left:18px;">
                  ${useCasesHtml}
                </ul>

                <p style="margin:0;font-size:13px;line-height:1.6;color:#8a9790;">
                  In the meantime, you can explore Nepal’s primary Acts, IRD circulars, and Finance Bill updates inside the Taxora Tax Law Library.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px;border-top:1px solid #19241e;background-color:#090d0b;">
                <p style="margin:0;font-size:12px;line-height:1.5;color:#6f7d76;">
                  Taxora · Nepal Tax Intelligence<br />
                  Automated confirmation for ${escapeHtml(data.email)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html };
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

export function buildContributorThankYouEmail(
  data: ContributorThankYouEmailData,
): {
  subject: string;
  html: string;
} {
  const name = escapeHtml(data.contributorName || "Contributor");
  const title = escapeHtml(data.topicOrTitle);
  const question = data.question ? escapeHtml(data.question) : "";
  const category = escapeHtml(data.category);
  const fiscalYear = escapeHtml(data.fiscalYear);
  const ican = data.icanNumber ? escapeHtml(data.icanNumber) : "";
  const firm = data.firmName ? escapeHtml(data.firmName) : "";
  const typeLabel =
    data.submissionType === "qa" ? "Tax Q&A Submission" : "Statutory Document";

  const attributionParts = [name];
  if (ican) attributionParts.push(`ICAN ${ican}`);
  if (firm) attributionParts.push(firm);
  const attributionLine = attributionParts.join(" · ");

  const subject = `Thank you for contributing to Taxora · ${data.topicOrTitle}`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#060807;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f4f5f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#060807;padding:36px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#0d1210;border:1px solid #1f2b25;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px 20px;border-bottom:1px solid #19241e;background:linear-gradient(135deg,#0d1511 0%,#0b100e 100%);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <span style="font-size:15px;font-weight:700;letter-spacing:0.22em;color:#f4f5f4;">TAXORA</span>
                    </td>
                    <td align="right">
                      <span style="display:inline-block;padding:3px 10px;border-radius:999px;background-color:rgba(0,223,129,0.12);border:1px solid rgba(0,223,129,0.35);color:#6ee7b7;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">CA KNOWLEDGE HUB</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#00df81;">
                  ${typeLabel} Received
                </p>
                <h1 style="margin:0 0 16px;font-size:23px;line-height:1.3;font-weight:600;color:#f4f5f4;">
                  Thank you for your contribution, ${name}.
                </h1>
                <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:#b8c4be;">
                  We have received your submission for the Taxora Knowledge Hub. Our editorial team will <strong style="color:#f4f5f4;">verify</strong> the statutory citations and <strong style="color:#f4f5f4;">recite &amp; credit</strong> this entry with your contributor information once published.
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 22px;background-color:#080c0a;border:1px solid #1f3328;border-radius:12px;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#7d8d85;">
                        ${category} · FY ${fiscalYear}
                      </p>
                      <p style="margin:0;font-size:17px;line-height:1.4;font-weight:600;color:#f4f5f4;">
                        ${title}
                      </p>
                      ${
                        question
                          ? `<p style="margin:12px 0 0;padding-top:12px;border-top:1px solid #19241e;font-size:13.5px;line-height:1.55;color:#c7d3cd;"><strong style="color:#8ee1b8;">Question:</strong> ${question}</p>`
                          : ""
                      }
                    </td>
                  </tr>
                </table>

                <p style="margin:0;font-size:13px;line-height:1.6;color:#9aa7a0;">
                  <strong style="color:#e1e8e4;">Attribution on file:</strong> ${attributionLine}
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px;border-top:1px solid #19241e;background-color:#090d0b;">
                <p style="margin:0;font-size:12px;line-height:1.5;color:#6f7d76;">
                  Taxora · Nepal Tax Intelligence<br />
                  Sent to ${escapeHtml(data.contributorEmail)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html };
}

export async function sendResendEmail({
  to,
  subject,
  html,
  from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
}: SendEmailInput): Promise<{ ok: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[resend] RESEND_API_KEY is not configured.");
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
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
