export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe JSON-LD payload serialized cleanly with '<' escaped
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
