"use client"; // Client Component karena pakai hooks & form handling

import { useState, FormEvent, useEffect } from "react";
import type { CreateTodoRequest, Priority, Todo } from "../types/todo";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

type TodoFormProps = {
  todo?: Todo;
  onSubmit: (data: CreateTodoRequest) => Promise<void>;
  onCancel?: () => void;
};

export function TodoForm({ todo, onSubmit, onCancel }: TodoFormProps) {
  // Controlled form: State mengontrol semua input values
  const [formData, setFormData] = useState<CreateTodoRequest>({
    title: "",
    completed: false,
    date: new Date().toISOString().split("T")[0], // Default: hari ini
    priority: "MEDIUM",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect: Pre-fill form jika edit mode (todo prop ada)
  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        completed: todo.completed,
        date: todo.date.split("T")[0], // Convert ISO string ke date input format
        priority: todo.priority,
      });
    }
  }, [todo]); // Re-run jika todo berubah

  // Form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    setError(null);
    setIsSubmitting(true);

    try {
      // Data transformation: Convert date ke ISO string untuk API
      const submitData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };
      await onSubmit(submitData); // Call parent's onSubmit handler
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save todo");
    } finally {
      setIsSubmitting(false); // Always reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <Input
        type="text"
        label="Title"
        placeholder="Enter todo title"
        required
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        disabled={isSubmitting}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <Input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value as Priority })
          }
          disabled={isSubmitting}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="completed"
          checked={formData.completed}
          onChange={(e) =>
            setFormData({ ...formData, completed: e.target.checked })
          }
          disabled={isSubmitting}
          className="w-4 h-4"
        />
        <label htmlFor="completed" className="text-sm text-gray-700">
          Completed
        </label>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          className="flex-1"
        >
          {todo ? "Update Todo" : "Create Todo"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
