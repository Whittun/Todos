import type { Task } from "../../../entities/task";
import type { SortOrder, StatusFilter } from "../model/types";

type FilterTasksParams = {
  tasks: Task[];
  searchQuery: string;
  sortOrder: SortOrder;
  statusFilter: StatusFilter;
};

export const filterTasks = ({
  tasks,
  searchQuery,
  sortOrder,
  statusFilter,
}: FilterTasksParams) => {
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(normalizedSearchQuery) &&
      (statusFilter === "all" ||
        (statusFilter === "completed" && task.completed) ||
        (statusFilter === "uncompleted" && !task.completed)),
  );

  if (sortOrder === "default") {
    return filteredTasks;
  }

  return [...filteredTasks].sort((firstTask, secondTask) => {
    const comparison = firstTask.title.localeCompare(secondTask.title);

    return sortOrder === "asc" ? comparison : -comparison;
  });
};
