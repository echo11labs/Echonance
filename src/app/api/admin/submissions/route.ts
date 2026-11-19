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
    const id = String(body?.id || "");

    if ((type !== "qa" && type !== "document") || !id) {
      return NextResponse.json(
        {
          status: "error",
          message: "A valid type (qa or document) and id are required.",
        },
        { status: 400 },
      );
    }

    const repo = getTaxRepository();
    const approved = await repo.approveSubmission(type, id);

    return NextResponse.json(
      {
        status: approved ? "success" : "not_found",
        message: approved
          ? `Submission ${id} approved and published to verified knowledge base.`
          : "Submission not found.",
      },
      { status: approved ? 200 : 404 },
    );
  } catch (err: unknown) {
    console.error("[admin/submissions] approval failed:", err);
    return NextResponse.json(
      { status: "error", message: "Unable to approve this submission." },
      { status: 500 },
    );
  }
}
