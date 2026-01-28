import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Buat axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token otomatis
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor untuk handle response
api.interceptors.response.use(
  (response) => {
    // API response structure: { success, message, data }
    // Return response as is, kita handle di service
    return response;
  },
  (error) => {
    // Handle error dengan pesan yang lebih jelas
    if (error.response?.status === 401) {
      error.message = "Authentication required. Please login again.";
    }
    return Promise.reject(error);
  },
);
