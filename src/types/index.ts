// Global types yang digunakan di seluruh aplikasi

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type SortParams = {
  sort?: string;
  order?: 'asc' | 'desc';
};
