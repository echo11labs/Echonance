import { type NextRequest, NextResponse } from "next/server";
import { buildContributorThankYouEmail, sendResendEmail } from "@/lib/email";
import { getTaxRepository } from "@/lib/tax-repository";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { status: "error", message: "Request body must be valid JSON." },
        { status: 400 },
      );
    }

    const question = String(body.question || "").trim();
    const shortTopic = String(body.shortTopic || body.topic || "").trim();
    const answer = String(body.answer || "").trim();
    const rawCategory = String(body.category || "Acts").trim();
    const category = rawCategory ? rawCategory.slice(0, 80) : "Acts";
    const fiscalYear = String(body.fiscalYear || "2081/82").trim();
    const language = body.language === "np" ? "np" : "en";
    const isAnonymous = Boolean(body.isAnonymous);
    const keywords = Array.isArray(body.keywords) ? body.keywords : [];
    const citations = Array.isArray(body.citations) ? body.citations : [];
    const reasoningSteps = Array.isArray(body.reasoningSteps)
      ? body.reasoningSteps
      : [];
    const contributor =
      !isAnonymous && body.contributor ? body.contributor : undefined;

    if (!question || !answer || !shortTopic) {
      return NextResponse.json(
        {
          status: "error",
          message: "Question, Topic, and Answer analysis are required fields.",
        },
        { status: 400 },
      );
    }

    const repo = getTaxRepository();
    const saved = await repo.submitQA({
      question,
      shortTopic,
      category,
      fiscalYear,
      language,
      keywords,
      answer,
      citations,
      reasoningSteps,
      rateTable: body.rateTable,
      contributor,
      isAnonymous,
    });

    const contributorEmail =
      typeof contributor?.email === "string" ? contributor.email.trim() : "";
    if (
      !isAnonymous &&
      contributorEmail &&
      EMAIL_PATTERN.test(contributorEmail)
    ) {
      const email = buildContributorThankYouEmail({
        contributorName: contributor.fullName || "Contributor",
        contributorEmail,
        icanNumber: contributor.icanNumber,
        firmName: contributor.firmName,
        submissionType: "qa",
        topicOrTitle: shortTopic,
        question,
        category,
        fiscalYear,
      });
      await sendResendEmail({
        to: contributorEmail,
        subject: email.subject,
        html: email.html,
      });
    }

    return NextResponse.json({
      status: "success",
      message:
        "Q&A submission received and sent to Taxora editorial review queue.",
      entry: saved,
    });
  } catch (err: unknown) {
    console.error("[qa/submit] failed:", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Submission failed. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
