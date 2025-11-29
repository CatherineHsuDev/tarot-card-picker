// app/api/quantum/route.ts
import { NextResponse } from "next/server";

const ANU_API_URL = process.env.ANU_API_URL!;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lengthParam = searchParams.get("length");
  const length = Math.min(Math.max(Number(lengthParam) || 64, 1), 1024);

  try {
    const res = await fetch(`${ANU_API_URL}?length=${length}&type=uint8`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("ANU API error");

    const data = await res.json();

    if (!data.success || !Array.isArray(data.data)) {
      throw new Error("Malformed response");
    }

    return NextResponse.json({
      source: "anu",
      bytes: data.data,
    });
  } catch (err) {
    console.error("Quantum API failed, fallback to crypto:", err);
    const arr = new Uint8Array(length);
    crypto.getRandomValues(arr);

    return NextResponse.json({
      source: "crypto-fallback",
      bytes: Array.from(arr),
    });
  }
}
