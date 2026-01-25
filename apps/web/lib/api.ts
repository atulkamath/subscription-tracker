import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function apiFetch(endpoint: string, options?: RequestInit) {
  const cookieStore = await cookies();
  const uid = cookieStore.get("uid");

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      Cookie: `uid=${uid?.value}`,
    },
    cache: "no-store",
  });
}

export async function getSubscriptions() {
  const response = await apiFetch("/subscriptions");
  return response.json();
}
