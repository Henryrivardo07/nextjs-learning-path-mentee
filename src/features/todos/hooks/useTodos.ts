"use client"; // Client Component karena pakai hooks

import { useState, useEffect, useCallback } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoServices";
import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoFilters,
} from "../types/todo";

type UseTodosReturn = {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  filters: TodoFilters;
  setFilters: (filters: TodoFilters) => void;
  refetch: () => Promise<void>;
  addTodo: (data: CreateTodoRequest) => Promise<boolean>;
  updateTodoItem: (id: string, data: UpdateTodoRequest) => Promise<boolean>;
  removeTodo: (id: string) => Promise<boolean>;
};

export function useTodos(initialFilters?: TodoFilters): UseTodosReturn {
  // State management - simpan data todos, loading state, error, dan filters
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TodoFilters>({
    page: 1,
    limit: 10,
    order: "asc",
    ...initialFilters, // Merge dengan initial filters jika ada
  });

  // useCallback: Prevent function recreation pada setiap render
  // Hanya recreate jika filters berubah (dependency array)
  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    setIsLoading(true);
    setError(null);

    try {
      // Dynamic import: Load auth module hanya saat diperlukan (code splitting)
      const { getToken } = await import("@/shared/lib/auth");
      const token = getToken();

      // Guard clause: Check authentication sebelum fetch
      if (!token) {
        throw new Error("Authentication required. Please login again.");
      }

      // Fetch todos dari API dengan filters
      const todosList = await getTodos(filters);
      setTodos(Array.isArray(todosList) ? todosList : []);
    } catch (err) {
      // Error handling: Set error message dan clear todos
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch todos";
      setError(errorMessage);
      setTodos([]);

      // Auto logout jika token invalid (401)
      if (
        errorMessage.includes("Authentication") ||
        errorMessage.includes("401")
      ) {
        const { removeToken } = await import("@/shared/lib/auth");
        removeToken(); // Clear invalid token
        // Redirect akan di-handle oleh dashboard page
      }
    } finally {
      setIsLoading(false); // Always set loading to false
    }
  }, [filters]); // Dependency: Re-fetch jika filters berubah

  // useEffect: Auto fetch saat component mount atau filters berubah
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); // Dependency: fetchTodos function

  // CRUD Operations dengan optimistic updates

  // Create: Add todo baru ke awal list (optimistic update)
  const addTodo = useCallback(
    async (data: CreateTodoRequest): Promise<boolean> => {
      try {
        const newTodo = await createTodo(data);
        // Functional update: Update state berdasarkan previous state
        setTodos((prev) => [newTodo, ...prev]); // Add ke awal array
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create todo");
        return false;
      }
    },
    [],
  ); // No dependencies - function tidak berubah

  // Update: Replace todo dengan id yang sama
  const updateTodoItem = useCallback(
    async (id: string, data: UpdateTodoRequest): Promise<boolean> => {
      try {
        const updated = await updateTodo(id, data);
        // Map: Replace todo dengan id yang sama, keep yang lain
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updated : todo)),
        );
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update todo");
        return false;
      }
    },
    [], // No dependencies
  );

  // Delete: Remove todo dari list
  const removeTodo = useCallback(async (id: string): Promise<boolean> => {
    try {
      await deleteTodo(id);
      // Filter: Keep semua todo kecuali yang dihapus
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
      return false;
    }
  }, []); // No dependencies

  return {
    todos,
    isLoading,
    error,
    filters,
    setFilters,
    refetch: fetchTodos,
    addTodo,
    updateTodoItem,
    removeTodo,
  };
}
