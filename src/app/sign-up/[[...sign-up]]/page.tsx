import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignUpPage() {
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
            Loading sign up...
          </div>
        }
      >
        <SignUp />
      </Suspense>
    </main>
  );
}
