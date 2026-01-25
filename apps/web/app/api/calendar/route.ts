import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error("Missing NEXT_PUBLIC_API_URL");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const remind = searchParams.get("remind") ?? "2";

  const res = await fetch(
    `${API_URL}/subscriptions/calendar?remind=${remind}`,
    {
      headers: { Cookie: cookies().toString() },
      cache: "no-store",
    },
  );

  // forward as file
  return new Response(await res.arrayBuffer(), {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "text/calendar",
      "Content-Disposition":
        res.headers.get("Content-Disposition") ??
        'attachment; filename="subscription-reminders.ics"',
    },
  });
}
