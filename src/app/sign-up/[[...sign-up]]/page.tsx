import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";
import { isClerkConfigured } from "@/lib/clerk-config";

export default function SignUpPage() {
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
              Loading sign up...
            </div>
          }
        >
          <SignUp />
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
            Sign-up is currently disabled
          </h1>
          <p style={{ margin: 0, color: "#9da7a3", fontSize: "0.92rem" }}>
            Registration will be enabled once the production domain is
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
