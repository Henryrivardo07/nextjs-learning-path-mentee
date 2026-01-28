"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { TodoForm } from "@/features/todos/components/TodoForm";
import { useTodos } from "@/features/todos/hooks/useTodos";
import { CreateTodoRequest } from "@/features/todos/types/todo";
import { Button } from "@/shared/components/ui/Button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function EditTodoPage() {
  // Next.js hooks: useRouter untuk navigation, useParams untuk route params
  const router = useRouter();
  const params = useParams(); // Get { id: "123" } dari URL

  // Auth & data hooks
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { todos, updateTodoItem } = useTodos();

  // useMemo: Optimize - hanya recalculate jika params.id atau todos berubah
  // Lebih efisien dari useState + useEffect karena tidak trigger re-render
  const todo = useMemo(() => {
    if (params.id && todos.length > 0) {
      return todos.find((t) => t.id === params.id); // Find todo by id dari URL
    }
    return undefined;
  }, [params.id, todos]); // Dependencies: Recalculate jika ini berubah

  // Protected route + validation: Redirect jika tidak auth atau todo tidak ditemukan
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    // Redirect jika todo tidak ditemukan (invalid id)
    if (!authLoading && params.id && todos.length > 0 && !todo) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router, params.id, todos.length, todo]);

  // Form submission: Update todo lalu redirect ke dashboard
  const handleSubmit = async (data: CreateTodoRequest) => {
    if (todo) {
      const success = await updateTodoItem(todo.id, data);
      if (success) {
        router.push("/dashboard"); // Navigate back setelah update
      }
    }
  };

  // Loading state: Show spinner saat check auth atau todo belum loaded
  if (authLoading || !todo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            ← Back
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Todo</h1>
          <TodoForm todo={todo} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
