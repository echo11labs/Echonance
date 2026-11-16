import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { setTimeout } from "node:timers/promises";

const port = process.env.ECHONANCE_SMOKE_PORT ?? "3100";
const url = new URL(`http://127.0.0.1:${port}/api/health`);
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    port,
  ],
  { stdio: "inherit" },
);
const closed = once(server, "close");

try {
  const deadline = Date.now() + 15_000;
  let response;
  while (!response && Date.now() < deadline) {
    assert.equal(server.exitCode, null, "Next.js exited before responding");
    response = await fetch(url, { signal: AbortSignal.timeout(1_000) }).catch(
      () => undefined,
    );
    if (!response) await setTimeout(200);
  }

  assert.ok(response, "Next.js did not respond within 15 seconds");
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^application\/json\b/,
  );
  assert.deepEqual(await response.json(), { status: "ok" });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.equal(
    response.headers.get("permissions-policy"),
    "camera=(), microphone=(), geolocation=()",
  );
  assert.equal(response.headers.get("x-powered-by"), null);
  console.log("Production health endpoint passed");
} finally {
  server.kill();
  await closed;
}
