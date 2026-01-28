export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  priority: Priority;
};

export type CreateTodoRequest = {
  title: string;
  completed?: boolean;
  date: string;
  priority: Priority;
};

export type UpdateTodoRequest = Partial<CreateTodoRequest>;

export type TodoFilters = {
  completed?: boolean;
  priority?: Priority;
  dateGte?: string;
  dateLte?: string;
  page?: number;
  limit?: number;
  sort?: "id" | "title" | "completed" | "date" | "priority";
  order?: "asc" | "desc";
};

export type TodoListResponse = {
  data: Todo[];
  total?: number;
  page?: number;
  limit?: number;
};

export type ApiTodoListResponse = {
  success: boolean;
  message: string;
  data: {
    todos: Todo[];
    totalTodos: number;
    hasNextPage: boolean;
    nextPage?: number;
  };
};

export type ApiTodoResponse = {
  success: boolean;
  message: string;
  data: Todo;
};
