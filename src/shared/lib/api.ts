/**
 * API Client - Centralized fetch wrapper
 * Menangani authentication headers, error handling, dan type safety
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type RequestOptions = RequestInit & {
  token?: string | null;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown,
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiError";
  }
}

/**
 * Fetch wrapper dengan error handling dan authentication
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Add authentication token if provided
  // Only add if token is a non-empty string
  if (token && typeof token === "string" && token.trim() !== "") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let data: T;
    if (isJson) {
      data = await response.json();
    } else {
      data = (await response.text()) as unknown as T;
    }

    if (!response.ok) {
      // Provide more detailed error message
      let errorMessage = response.statusText;
      if (data && typeof data === "object" && "message" in data) {
        errorMessage = String(data.message);
      } else if (data && typeof data === "string") {
        errorMessage = data;
      }

      // Special handling for 401
      if (response.status === 401) {
        errorMessage = "Authentication failed. Please login again.";
      }

      throw new ApiError(response.status, errorMessage, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * GET request helper
 */
export function apiGet<T>(endpoint: string, token?: string | null): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "GET",
    token,
  });
}

/**
 * POST request helper
 */
export function apiPost<T>(
  endpoint: string,
  body: unknown,
  token?: string | null,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    token,
  });
}

/**
 * PUT request helper
 */
export function apiPut<T>(
  endpoint: string,
  body: unknown,
  token?: string | null,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
    token,
  });
}

/**
 * DELETE request helper
 */
export function apiDelete<T>(
  endpoint: string,
  token?: string | null,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "DELETE",
    token,
  });
}
