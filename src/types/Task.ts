import { Pagination } from "./Pagination";

export interface Task {
  id: number;
  todo: string;
  completed: boolean;
}

export interface PaginationTask extends Pagination {
  todos: Task[];
}
