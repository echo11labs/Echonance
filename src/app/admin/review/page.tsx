import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getReviewerAccess } from "@/lib/reviewer-auth";
import { getTaxRepository } from "@/lib/tax-repository";
import { ReviewWorkspace } from "./review-workspace";
import styles from "./review.module.css";

export const metadata: Metadata = {
  title: "Taxora Review Queue",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const access = await getReviewerAccess();
  if (access === "signed-out") {
    redirect("/sign-in?redirect_url=%2Fadmin%2Freview");
  }

  const submissions =
    access === "denied"
      ? null
      : await getTaxRepository()
          .listPendingSubmissions()
          .catch(() => null);

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/contribute">
          <ArrowLeft size={16} aria-hidden="true" />
          Contributor Filing
        </Link>
        <span>Taxora Editorial</span>
      </header>
      {submissions ? (
        <ReviewWorkspace
          {...submissions}
          canManageReviewers={access === "admin"}
        />
      ) : (
        <div className={styles.unavailable}>
          <h1>
            {access === "denied"
              ? "Reviewer access required"
              : "Review queue unavailable"}
          </h1>
          <p>
            {access === "denied"
              ? "Sign in with an authorized reviewer account."
              : "Reload the page to try again."}
          </p>
        </div>
      )}
    </main>
  );
}
