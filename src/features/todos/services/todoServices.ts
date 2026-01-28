import { api } from "@/shared/lib/axios";
import {
  CreateTodoRequest,
  Todo,
  TodoFilters,
  UpdateTodoRequest,
} from "../types/todo";

export async function getTodos(filters?: TodoFilters): Promise<Todo[]> {
  const params = new URLSearchParams();

  if (filters?.completed !== undefined)
    params.append("completed", String(filters.completed));
  if (filters?.priority) params.append("priority", filters.priority);
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));
  if (filters?.order) params.append("order", filters.order);

  const response = await api.get(`/todos?${params.toString()}`);

  return response.data.data?.todos || [];
}

export async function createTodo(data: CreateTodoRequest): Promise<Todo> {
  const response = await api.post("/todos", data);
  return response.data.data;
}

// Update todo
export async function updateTodo(
  id: string,
  data: UpdateTodoRequest,
): Promise<Todo> {
  const response = await api.put(`/todos/${id}`, data);
  // API response: { success, message, data: { todo } }
  return response.data.data;
}

// Delete todo
export async function deleteTodo(id: string): Promise<Todo> {
  const response = await api.delete(`/todos/${id}`);
  // API response: { success, message, data: { todo } }
  return response.data.data;
}
