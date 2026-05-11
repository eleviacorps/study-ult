import { NextResponse } from "next/server";
import { getVaultIndex } from "@/lib/vault/parser";

export const dynamic = "force-dynamic";

export async function GET() {
  const index = await getVaultIndex();
  return NextResponse.json(index);
}
