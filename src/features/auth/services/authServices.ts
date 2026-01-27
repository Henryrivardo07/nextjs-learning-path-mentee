import { apiPost } from "@/shared/lib/api";
import {
  ApiAuthResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await apiPost<ApiAuthResponse>("/auth/register", data);
  return response.data;
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiPost<ApiAuthResponse>("/auth/login", data);
  return response.data;
}
