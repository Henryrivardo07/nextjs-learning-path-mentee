"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { TodoList } from "@/features/todos/components/TodoList";
import { Todo } from "@/features/todos/types/todo";
import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, token, logout } = useAuth();

  const handleEditTodo = (todo: Todo) => {
    router.push(`/dashboard/todos/${todo.id}/edit`); // Dynamic route
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login"); // Programmatic navigation
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || (isAuthenticated && !token)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              {user && (
                <p className="text-sm text-gray-600">Welcome, {user.name}!</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/rendering-examples"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Rendering Examples
              </Link>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TodoList onEditTodo={handleEditTodo} />
      </main>
    </div>
  );
}
