import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";
import { isClerkConfigured } from "@/lib/clerk-config";

export default function SignInPage() {
  const clerkEnabled = isClerkConfigured();

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#060807",
        color: "#f4f5f4",
        padding: "24px",
      }}
    >
      {clerkEnabled ? (
        <Suspense
          fallback={
            <div style={{ color: "#9da7a3", fontSize: "0.9rem" }}>
              Loading sign in...
            </div>
          }
        >
          <SignIn />
        </Suspense>
      ) : (
        <div
          style={{
            maxWidth: "420px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.25rem" }}>
            Sign-in is currently disabled
          </h1>
          <p style={{ margin: 0, color: "#9da7a3", fontSize: "0.92rem" }}>
            Authentication will be enabled once the production domain is
            configured.
          </p>
          <Link
            href="/"
            style={{
              color: "#00df81",
              textDecoration: "none",
              fontSize: "0.92rem",
              fontWeight: 600,
            }}
          >
            Return to Taxora
          </Link>
        </div>
      )}
    </main>
  );
}
