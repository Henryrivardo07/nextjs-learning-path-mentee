export type User = {
  id: string;
  name: string;
  email: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type ApiAuthResponse = {
  success: boolean;
  message: string;
  data: AuthResponse;
};

export type AuthError = {
  message: string;
  errors?: Record<string, string[]>;
};
