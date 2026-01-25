import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is missing");
}

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies(); // ✅ must await
  const cookieHeader = cookieStore.toString(); // forward all cookies

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });
}

export async function getSubscriptions() {
  const response = await apiFetch("/subscriptions");
  if (!response.ok) {
    throw new Error(`Failed to fetch subscriptions: ${response.status}`);
  }
  return response.json();
}
