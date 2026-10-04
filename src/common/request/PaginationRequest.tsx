export interface PaginationRequest<T> {
  request?: T;
  page?: number;
  limit?: number;
}
