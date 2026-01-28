import { Todo, TodoFilters } from "../types/todo";

export async function getTodos(filters?: TodoFilters): Promise<Todo[]> {
  const params = new URLSearchParams();

  if (filters?.completed !== undefined)
    params.append("completed", String(filters.completed));
  if (filters?.priority) params.append("priority", filters.priority);
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));
  if (filters?.order) params.append("order", filters.order);

  return;
}
