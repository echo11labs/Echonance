import { clerkMiddleware } from "@clerk/nextjs/server";
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import { isClerkServerConfigured } from "@/lib/clerk-config";

const clerkHandler = clerkMiddleware();

export default async function proxy(req: NextRequest, event: NextFetchEvent) {
  if (req.nextUrl.pathname === "/api/health" || !isClerkServerConfigured()) {
    return NextResponse.next();
  }

  const response = await clerkHandler(req, event);
  if (!response) {
    return NextResponse.next();
  }

  // Next.js normalizes 127.0.0.1 / [::1] to localhost in NextRequest.url, so Clerk's
  // pass-through x-middleware-rewrite to http://localhost:<port> causes Next.js to
  // self-proxy in a loop when the server is bound to 127.0.0.1 or [::1]. Converting
  // that same-path self-rewrite back to x-middleware-next keeps Clerk's auth headers.
  const rewrite = response.headers.get("x-middleware-rewrite");
  const incomingHost = req.headers.get("host");
  if (rewrite && incomingHost && !response.headers.has("location")) {
    try {
      const rewriteUrl = new URL(rewrite);
      const incomingUrl = new URL(`http://${incomingHost}`);
      if (
        rewriteUrl.hostname === "localhost" &&
        (incomingUrl.hostname === "127.0.0.1" ||
          incomingUrl.hostname === "[::1]") &&
        rewriteUrl.pathname === req.nextUrl.pathname &&
        rewriteUrl.search === req.nextUrl.search
      ) {
        response.headers.delete("x-middleware-rewrite");
        response.headers.set("x-middleware-next", "1");
      }
    } catch {
      // Preserve original header when host or rewrite URL is malformed
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
