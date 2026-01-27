/**
 * Auth Feature - Hook
 * Custom hook untuk manage authentication state
 */

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  login as loginService,
  register as registerService,
} from "../services/authServices";
import {
  saveToken,
  saveUser,
  removeToken,
  getToken,
  getUser,
  isAuthenticated,
} from "@/shared/lib/auth";
import type { LoginRequest, RegisterRequest, User } from "../types/auth";

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export function useAuth() {
  const router = useRouter();

  // Initialize state from localStorage using lazy initialization
  const [state, setState] = useState<AuthState>(() => {
    // This runs only once on mount
    if (typeof window !== "undefined") {
      const token = getToken();
      const user = getUser();
      return {
        user,
        token,
        isLoading: false,
        isAuthenticated: isAuthenticated(),
      };
    }
    return {
      user: null,
      token: null,
      isLoading: true,
      isAuthenticated: false,
    };
  });

  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        const response = await loginService(credentials);
        saveToken(response.token);
        saveUser(response.user);

        setState({
          user: response.user,
          token: response.token,
          isLoading: false,
          isAuthenticated: true,
        });

        router.push("/dashboard");
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Login failed",
        };
      }
    },
    [router],
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      try {
        const response = await registerService(data);
        saveToken(response.token);
        saveUser(response.user);

        setState({
          user: response.user,
          token: response.token,
          isLoading: false,
          isAuthenticated: true,
        });

        router.push("/dashboard");
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Registration failed",
        };
      }
    },
    [router],
  );

  const logout = useCallback(() => {
    removeToken();
    setState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
    router.push("/login");
  }, [router]);

  return {
    ...state,
    login,
    register,
    logout,
  };
}
