import { NextResponse } from "next/server";
import { answerWithStudyContext } from "@/lib/ai/providers";
import { getVaultIndex } from "@/lib/vault/parser";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const vault = await getVaultIndex();
  const answer = await answerWithStudyContext({
    provider: body.provider,
    prompt: String(body.prompt ?? ""),
    vault,
  });

  return NextResponse.json(answer);
}
