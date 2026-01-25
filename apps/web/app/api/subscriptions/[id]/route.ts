import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("Missing NEXT_PUBLIC_API_URL");

export async function PATCH(req: Request, ctx: { params: { id: string } }) {
  const body = await req.text();

  const res = await fetch(`${API_URL}/subscriptions/${ctx.params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body,
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(_: Request, ctx: { params: { id: string } }) {
  const res = await fetch(`${API_URL}/subscriptions/${ctx.params.id}`, {
    method: "DELETE",
    headers: { Cookie: cookies().toString() },
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
