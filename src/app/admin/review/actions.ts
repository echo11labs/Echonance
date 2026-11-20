"use server";

import { clerkClient } from "@clerk/nextjs/server";
import {
  getReviewerAccess,
  getVerifiedPrimaryEmail,
} from "@/lib/reviewer-auth";

export async function addReviewer(
  _previous: { message: string; success: boolean },
  formData: FormData,
) {
  if ((await getReviewerAccess()) !== "admin") {
    return {
      message: "Only the reviewer administrator can add reviewers.",
      success: false,
    };
  }

  const value = formData.get("email");
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { message: "Enter a valid email address.", success: false };
  }

  try {
    const clerk = await clerkClient();
    const { data: users } = await clerk.users.getUserList({
      emailAddress: [email],
    });
    const reviewer = users.find(
      (user) => getVerifiedPrimaryEmail(user) === email,
    );
    if (!reviewer) {
      return {
        message:
          "Ask the reviewer to sign up and verify this as their primary email first.",
        success: false,
      };
    }

    await clerk.users.updateUserMetadata(reviewer.id, {
      privateMetadata: { taxoraReviewerEmail: email },
    });
    return { message: "Reviewer access granted.", success: true };
  } catch {
    return {
      message: "Could not save reviewer access. Try again.",
      success: false,
    };
  }
}
