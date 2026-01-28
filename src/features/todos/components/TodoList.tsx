"use client"; // Client Component karena pakai hooks & state

import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoCard } from "./TodoCard";
import { TodoForm } from "./TodoForm";
import { Button } from "@/shared/components/ui/Button";
import type { Todo, Priority } from "../types/todo";

type TodoListProps = {
  onEditTodo?: (todo: Todo) => void;
};

export function TodoList({ onEditTodo }: TodoListProps) {
  // Custom hook: Ambil todos state & CRUD functions
  const {
    todos,
    isLoading,
    error,
    filters,
    setFilters,
    addTodo,
    updateTodoItem,
    removeTodo,
  } = useTodos();

  // Local UI state: Control form visibility & filter inputs
  const [showForm, setShowForm] = useState(false);
  const [filterCompleted, setFilterCompleted] = useState<boolean | undefined>(
    undefined,
  );
  const [filterPriority, setFilterPriority] = useState<Priority | undefined>(
    undefined,
  );

  // Event handlers: Transform user actions ke state updates

  // Apply filters: Update filters di hook, trigger re-fetch
  const handleFilterChange = () => {
    setFilters({
      ...filters,
      completed: filterCompleted,
      priority: filterPriority,
      page: 1, // Reset ke page 1 saat filter berubah
    });
  };

  // Toggle todo completion status
  const handleToggle = async (id: string, completed: boolean) => {
    await updateTodoItem(id, { completed });
  };

  // Pagination: Update page number, trigger re-fetch
  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
        <Button onClick={() => setShowForm(!showForm)} variant="primary">
          {showForm ? "Cancel" : "+ Add Todo"}
        </Button>
      </div>

      {/* Conditional Rendering: Show form hanya jika showForm = true */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Todo</h2>
          <TodoForm
            onSubmit={async (data) => {
              const success = await addTodo(data);
              if (success) {
                setShowForm(false); // Close form setelah success
              }
            }}
            onCancel={() => setShowForm(false)} // Close form on cancel
          />
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={
                filterCompleted === undefined ? "" : String(filterCompleted)
              }
              onChange={(e) =>
                setFilterCompleted(
                  e.target.value === "" ? undefined : e.target.value === "true",
                )
              }
            >
              <option value="">All</option>
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterPriority || ""}
              onChange={(e) =>
                setFilterPriority(
                  e.target.value === ""
                    ? undefined
                    : (e.target.value as Priority),
                )
              }
            >
              <option value="">All</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleFilterChange}
              variant="primary"
              className="w-full"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading todos...</span>
        </div>
      )}

      {/* Conditional Rendering: Show list hanya jika tidak loading & tidak error */}
      {!isLoading && !error && (
        <>
          {/* Empty State: Show jika tidak ada todos */}
          {todos.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-500 text-lg">No todos found</p>
              <p className="text-gray-400 text-sm mt-2">
                Create your first todo to get started!
              </p>
            </div>
          ) : (
            /* List Rendering: Map todos ke TodoCard components */
            <div className="space-y-3">
              {todos.map((todo) => (
                <TodoCard
                  key={todo.id} // Key prop: Required untuk React list rendering
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={removeTodo}
                  onEdit={onEditTodo}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {todos.length > 0 && (
            <div className="flex items-center justify-between bg-white rounded-lg shadow p-4">
              <Button
                variant="outline"
                onClick={() => handlePageChange((filters.page || 1) - 1)}
                disabled={(filters.page || 1) <= 1}
              >
                Previous
              </Button>
              <span className="text-gray-600">Page {filters.page || 1}</span>
              <Button
                variant="outline"
                onClick={() => handlePageChange((filters.page || 1) + 1)}
                disabled={todos.length < (filters.limit || 10)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
