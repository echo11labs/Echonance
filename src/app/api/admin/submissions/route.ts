import { type NextRequest, NextResponse } from "next/server";
import { requireReviewer } from "@/lib/reviewer-auth";
import { getTaxRepository } from "@/lib/tax-repository";

export async function GET() {
  const denied = await requireReviewer();
  if (denied) return denied;

  try {
    const repo = getTaxRepository();
    const pending = await repo.listPendingSubmissions();

    return NextResponse.json({
      status: "success",
      count: pending.qaEntries.length + pending.documents.length,
      pending,
    });
  } catch (err: unknown) {
    console.error("[admin/submissions] list failed:", err);
    return NextResponse.json(
      { status: "error", message: "Unable to load the review queue." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireReviewer();
  if (denied) return denied;

  try {
    const body = await req.json().catch(() => null);
    const type = body?.type;
    const id = typeof body?.id === "string" ? body.id.trim() : "";
    const decision = body?.decision === undefined ? "approve" : body.decision;

    if (
      (type !== "qa" && type !== "document") ||
      !id ||
      (decision !== "approve" &&
        decision !== "decline" &&
        decision !== "delete")
    ) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "A valid submission ID, type, and review decision are required.",
        },
        { status: 400 },
      );
    }

    const repo = getTaxRepository();
    const result = await repo.decideSubmission(type, id, decision);
    if (result === "not_pending") {
      return NextResponse.json(
        {
          status: "not_pending",
          message: "This submission is no longer pending.",
        },
        { status: 404 },
      );
    }
    if (result === "file_cleanup_failed") {
      return NextResponse.json({
        status: "success",
        warning:
          "The submission was deleted, but its file could not be removed from storage.",
      });
    }
    return NextResponse.json({ status: "success" });
  } catch (err: unknown) {
    console.error("[admin/submissions] decision failed:", err);
    return NextResponse.json(
      { status: "error", message: "Unable to save the review decision." },
      { status: 500 },
    );
  }
}
