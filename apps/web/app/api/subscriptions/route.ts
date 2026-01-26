import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("Missing NEXT_PUBLIC_API_URL");

export async function GET() {
  const res = await fetch(`${API_URL}/subscriptions`, {
    headers: { Cookie: (await cookies()).toString() },
    cache: "no-store",
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const body = await req.text();

  const res = await fetch(`${API_URL}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
    body,
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
