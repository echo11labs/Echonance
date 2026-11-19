import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#060807",
        padding: "24px",
      }}
    >
      <Suspense
        fallback={
          <div style={{ color: "#9da7a3", fontSize: "0.9rem" }}>
            Loading sign in...
          </div>
        }
      >
        <SignIn />
      </Suspense>
    </main>
  );
}
