import type { Task } from "../../../entities/task";
import type { StatusFilter } from "../model/types";

type FilterTasksParams = {
  tasks: Task[];
  searchQuery: string;
  statusFilter: StatusFilter;
};

export const filterTasks = ({
  tasks,
  searchQuery,
  statusFilter,
}: FilterTasksParams) => {
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(normalizedSearchQuery) &&
      (statusFilter === "all" ||
        (statusFilter === "completed" && task.completed) ||
        (statusFilter === "uncompleted" && !task.completed)),
  );
};
