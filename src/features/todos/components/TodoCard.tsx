"use client"; // Client Component karena pakai hooks & event handlers

import { useState } from "react";
import type { Todo, Priority } from "../types/todo";
import { Button } from "@/shared/components/ui/Button";

type TodoCardProps = {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit?: (todo: Todo) => void;
};

const priorityColors: Record<Priority, string> = {
  HIGH: "bg-red-100 text-red-800 border-red-300",
  MEDIUM: "bg-yellow-100 text-yellow-800 border-yellow-300",
  LOW: "bg-green-100 text-green-800 border-green-300",
};

export function TodoCard({ todo, onToggle, onDelete, onEdit }: TodoCardProps) {
  // Local UI state: Track loading state untuk delete action
  const [isDeleting, setIsDeleting] = useState(false);

  // Event handlers: Call parent callbacks dengan data yang diperlukan

  // Delete: Confirmation dialog → call parent's onDelete
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      setIsDeleting(true);
      await onDelete(todo.id); // Call parent callback
      setIsDeleting(false);
    }
  };

  // Toggle: Call parent's onToggle dengan new completed status
  const handleToggle = () => {
    onToggle(todo.id, !todo.completed);
  };

  return (
    <div
      className={`p-4 border rounded-lg transition-all ${
        todo.completed
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="mt-1 w-5 h-5 cursor-pointer"
        />

        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium ${
              todo.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {todo.title}
          </h3>

          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <span
              className={`px-2 py-1 rounded text-xs font-medium border ${priorityColors[todo.priority]}`}
            >
              {todo.priority}
            </span>

            <span className="text-xs text-gray-500">
              {new Date(todo.date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(todo)}
              disabled={isDeleting}
            >
              Edit
            </Button>
          )}
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
