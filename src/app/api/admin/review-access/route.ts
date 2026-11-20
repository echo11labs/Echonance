import { NextResponse } from "next/server";
import { isReviewer } from "@/lib/reviewer-auth";

export async function GET() {
  return NextResponse.json(
    { canReview: await isReviewer() },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
