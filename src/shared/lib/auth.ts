/**
 * Authentication utilities
 * Handle token storage dan retrieval (localStorage + cookies)
 */

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const COOKIE_TOKEN_KEY = "auth_token";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
};

/**
 * Save token to localStorage and cookies
 */
export function saveToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    // Also save to cookies for server-side access
    document.cookie = `${COOKIE_TOKEN_KEY}=${token}; path=/; max-age=604800; SameSite=Lax`; // 7 days
  }
}

/**
 * Get token from localStorage
 */
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

/**
 * Remove token from localStorage and cookies
 */
export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Also remove from cookies
    document.cookie = `${COOKIE_TOKEN_KEY}=; path=/; max-age=0`;
  }
}

/**
 * Get token from cookies (for server-side use)
 * Use this in Server Components
 */
export function getTokenFromCookies(cookieHeader?: string): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return cookies[COOKIE_TOKEN_KEY] || null;
}

/**
 * Save user data to localStorage
 */
export function saveUser(user: StoredUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

/**
 * Get user data from localStorage
 */
export function getUser(): StoredUser | null {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr) as StoredUser;
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getToken() !== null;
}
