/**
 * Check whether an authentication key env variable holds a real value
 * rather than being unset or left at an example placeholder (`...`).
 */
export function isConfiguredKey(value: string | undefined): boolean {
  const trimmed = value?.trim();
  return Boolean(trimmed && !trimmed.endsWith("..."));
}

/**
 * Safe to call from both Server and Client Components; uses direct dot
 * property access so Next.js inlines NEXT_PUBLIC_* variables on the client.
 * Automatically enabled whenever a non-placeholder publishable key exists,
 * unless explicitly disabled with NEXT_PUBLIC_ENABLE_CLERK=false.
 */
export function isClerkConfigured(): boolean {
  if (process.env.NEXT_PUBLIC_ENABLE_CLERK === "false") {
    return false;
  }
  return isConfiguredKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}

/**
 * Server-side guard requiring both client enablement and a real secret key.
 */
export function isClerkServerConfigured(): boolean {
  return isClerkConfigured() && isConfiguredKey(process.env.CLERK_SECRET_KEY);
}
