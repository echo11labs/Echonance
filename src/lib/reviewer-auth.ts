import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Reviewer access is deny-by-default. A signed-in Clerk user is treated as a
 * reviewer only when their verified primary email appears in REVIEWER_EMAILS
 * (comma-separated). If the variable is unset, nobody is a reviewer.
 */
function getReviewerAllowlist(): Set<string> {
  return new Set(
    (process.env.REVIEWER_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export async function requireReviewer(): Promise<NextResponse | null> {
  const user = await currentUser().catch(() => null);
  if (!user) {
    return NextResponse.json(
      { status: "error", message: "Sign in to access the review queue." },
      { status: 401 },
    );
  }

  const primary = user.emailAddresses.find(
    (address) => address.id === user.primaryEmailAddressId,
  );
  const email = primary?.emailAddress.trim().toLowerCase();
  const isVerified = primary?.verification?.status === "verified";

  if (!email || !isVerified || !getReviewerAllowlist().has(email)) {
    return NextResponse.json(
      { status: "error", message: "You do not have reviewer access." },
      { status: 403 },
    );
  }

  return null;
}

export async function isReviewer(): Promise<boolean> {
  return (await requireReviewer()) === null;
}
