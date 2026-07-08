import type { Task } from "../model/types";

const TASKS_LIMIT = 15;
const TODOS_URL = `https://jsonplaceholder.typicode.com/todos?_limit=${TASKS_LIMIT}`;

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(TODOS_URL);

  if (!response.ok) {
    throw new Error("Failed to load tasks");
  }

  return (await response.json()) as Task[];
};
