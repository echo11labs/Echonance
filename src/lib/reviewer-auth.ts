import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isClerkServerConfigured } from "@/lib/clerk-config";

type ClerkUser = NonNullable<Awaited<ReturnType<typeof currentUser>>>;

export function getVerifiedPrimaryEmail(user: ClerkUser): string | undefined {
  const primary = user.emailAddresses.find(
    (address) => address.id === user.primaryEmailAddressId,
  );
  return primary?.verification?.status === "verified"
    ? primary.emailAddress.trim().toLowerCase()
    : undefined;
}

export async function getReviewerAccess() {
  const user = isClerkServerConfigured()
    ? await currentUser().catch(() => null)
    : null;
  if (!user) return "signed-out";

  const email = getVerifiedPrimaryEmail(user);
  if (!email) return "denied";

  if (email === process.env.REVIEWER_ADMIN_EMAIL?.trim().toLowerCase()) {
    return "admin";
  }

  const allowlist = (process.env.REVIEWER_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase());
  if (
    allowlist.includes(email) ||
    user.privateMetadata.taxoraReviewerEmail === email
  ) {
    return "reviewer";
  }

  return "denied";
}

export async function requireReviewer(): Promise<NextResponse | null> {
  const access = await getReviewerAccess();
  if (access === "signed-out") {
    return NextResponse.json(
      { status: "error", message: "Sign in to access the review queue." },
      { status: 401 },
    );
  }
  if (access === "denied") {
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
