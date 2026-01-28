/**
 * Server-side authentication utilities
 * Untuk digunakan di Server Components
 */

import { cookies } from "next/headers";

const COOKIE_TOKEN_KEY = "auth_token";

/**
 * Get token from cookies (server-side)
 */
export async function getServerToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_TOKEN_KEY);
  return token?.value || null;
}
