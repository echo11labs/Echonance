import { type NextRequest, NextResponse } from "next/server";
import { isReviewer } from "@/lib/reviewer-auth";
import { getTaxRepository } from "@/lib/tax-repository";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const documentType = searchParams.get("type") || undefined;
    const fiscalYear = searchParams.get("year") || undefined;
    const requestedStatus = searchParams.get("status") || undefined;

    // The public library only ever lists verified documents. Other statuses
    // (pending_review, rejected, all) are reserved for reviewers.
    const status =
      requestedStatus && requestedStatus !== "verified"
        ? (await isReviewer())
          ? requestedStatus
          : undefined
        : undefined;

    const repo = getTaxRepository();
    const listedDocuments = await repo.listDocuments({
      documentType,
      fiscalYear,
      status,
    });

    // Retire derived copies even if an older repository record still exists.
    const documents = listedDocuments.filter(
      (document) =>
        !/^finance-bill-2083-84-(english|nepali)\.(md|pdf)$/.test(
          document.fileName,
        ) &&
        !/^\/api\/sources\/finance-bill-2083(?:-np)?(?:[?#]|$)/.test(
          document.fileUrl,
        ),
    );

    return NextResponse.json({
      status: "success",
      count: documents.length,
      documents,
    });
  } catch (err: unknown) {
    console.error("[resources] list failed:", err);
    return NextResponse.json(
      { status: "error", message: "Unable to load documents." },
      { status: 500 },
    );
  }
}
