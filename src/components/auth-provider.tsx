"use client";

import {
  ClerkProvider,
  Show,
  SignInButton,
  UserButton,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { createContext, type ReactNode, Suspense, useContext } from "react";
import { isClerkConfigured } from "@/lib/clerk-config";

export { isClerkConfigured };

export interface AuthStatusValue {
  isLoaded: boolean;
  isSignedIn: boolean;
  clerkConfigured: boolean;
  openSignIn: () => void;
}

const DEFAULT_AUTH_STATUS: AuthStatusValue = {
  isLoaded: true,
  isSignedIn: false,
  clerkConfigured: false,
  openSignIn: () => {},
};

const AuthStatusContext = createContext<AuthStatusValue>(DEFAULT_AUTH_STATUS);

export function useAuthStatus(): AuthStatusValue {
  return useContext(AuthStatusContext);
}

function ClerkAuthBridge({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();

  return (
    <AuthStatusContext.Provider
      value={{
        isLoaded,
        isSignedIn: Boolean(isSignedIn),
        clerkConfigured: true,
        openSignIn: () => clerk.openSignIn(),
      }}
    >
      {children}
    </AuthStatusContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isClerkConfigured();
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (configured && publishableKey) {
    return (
      <ClerkProvider
        publishableKey={publishableKey}
        appearance={{
          variables: {
            colorPrimary: "#00df81",
            colorBackground: "#0d1310",
          },
        }}
      >
        <ClerkAuthBridge>{children}</ClerkAuthBridge>
      </ClerkProvider>
    );
  }

  return (
    <AuthStatusContext.Provider value={DEFAULT_AUTH_STATUS}>
      {children}
    </AuthStatusContext.Provider>
  );
}

export function AuthNavControls({ collapsed }: { collapsed?: boolean }) {
  if (!isClerkConfigured()) {
    return null;
  }

  return (
    <div
      style={{
        padding: collapsed ? "8px 0" : "4px 2px",
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        width: "100%",
        marginTop: 0,
      }}
    >
      <Suspense fallback={null}>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button
              type="button"
              style={{
                padding: "7px 12px",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#060807",
                background: "#00df81",
                border: "none",
                cursor: "pointer",
                width: collapsed ? "36px" : "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {collapsed ? "In" : "Sign In"}
            </button>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              width: "100%",
            }}
          >
            <UserButton
              showName={!collapsed}
              appearance={{
                elements: {
                  rootBox: { width: "100%" },
                  userButtonTrigger: {
                    width: "100%",
                    padding: collapsed ? "4px" : "6px 8px",
                    borderRadius: "8px",
                  },
                  userButtonBox: {
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: collapsed ? "center" : "flex-start",
                    gap: "10px",
                  },
                  userButtonOuterIdentifier: {
                    paddingLeft: 0,
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "#e4eae7",
                  },
                  avatarBox: {
                    width: "28px",
                    height: "28px",
                  },
                },
              }}
            />
          </div>
        </Show>
      </Suspense>
    </div>
  );
}
