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
 */
export function isClerkConfigured(): boolean {
  return (
    process.env.NEXT_PUBLIC_ENABLE_CLERK === "true" &&
    isConfiguredKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
  );
}

/**
 * Server-side guard requiring both client enablement and a real secret key.
 */
export function isClerkServerConfigured(): boolean {
  return isClerkConfigured() && isConfiguredKey(process.env.CLERK_SECRET_KEY);
}
