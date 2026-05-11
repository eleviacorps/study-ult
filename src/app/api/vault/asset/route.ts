import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const VAULT_ROOT = path.join(process.cwd(), "MasterVault");

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const assetPath = searchParams.get("path");

  if (!assetPath) {
    return NextResponse.json({ error: "Missing asset path" }, { status: 400 });
  }

  const fullPath = path.resolve(VAULT_ROOT, assetPath);
  if (!fullPath.startsWith(VAULT_ROOT)) {
    return NextResponse.json({ error: "Invalid asset path" }, { status: 400 });
  }

  try {
    const file = await fs.readFile(fullPath);
    const extension = path.extname(fullPath).toLowerCase();
    return new NextResponse(file, {
      headers: {
        "Content-Type": contentTypes[extension] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }
}
