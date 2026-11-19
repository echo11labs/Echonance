import { type NextRequest, NextResponse } from "next/server";
import { getTaxRepository } from "@/lib/tax-repository";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const query = String(body.query || "");
    const lang = body.lang === "np" ? "np" : "en";
    const category = body.category ? String(body.category) : undefined;

    const repo = getTaxRepository();
    const results = await repo.searchQA(query, lang, category);

    return NextResponse.json({
      status: "success",
      query,
      count: results.length,
      results,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Search error";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
