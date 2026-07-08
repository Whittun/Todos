import { useEffect, useMemo, useState, type SubmitEventHandler } from "react";
import { fetchTasks, TaskDetails, type Task } from "../../entities/task";
import { TaskList } from "../../features/task-list";
import { Modal } from "../../shared/ui";
import styles from "./TodosPage.module.css";

type StatusFilter = "all" | "completed" | "uncompleted";

export const TodosPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(normalizedSearchQuery) &&
        (statusFilter === "all" ||
          (statusFilter === "completed" && task.completed) ||
          (statusFilter === "uncompleted" && !task.completed)),
    );
  }, [searchQuery, statusFilter, tasks]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const loadedTasks = await fetchTasks();

        setTasks(loadedTasks);
      } catch {
        setError("Не удалось загрузить задачи");
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleSearchSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    setSearchQuery(searchValue);
  };

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Список задач</h1>
        </header>

        {isLoading && <div className={styles.state}>Загрузка задач...</div>}
        {error && (
          <div className={`${styles.state} ${styles.error}`}>{error}</div>
        )}
        {!isLoading && !error && (
          <>
            <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
              <input
                className={styles.searchInput}
                type="search"
                placeholder="Поиск по названию"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <button className={styles.searchButton} type="submit">
                Найти
              </button>
              <select
                className={styles.statusSelect}
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as StatusFilter)
                }
              >
                <option value="all">Все</option>
                <option value="completed">Выполненные</option>
                <option value="uncompleted">Невыполненные</option>
              </select>
            </form>

            {filteredTasks.length > 0 ? (
              <TaskList tasks={filteredTasks} onTaskClick={setSelectedTask} />
            ) : (
              <div className={styles.state}>Задачи не найдены</div>
            )}
          </>
        )}
      </section>

      {selectedTask && (
        <Modal title="Детали задачи" onClose={() => setSelectedTask(null)}>
          <TaskDetails task={selectedTask} />
        </Modal>
      )}
    </main>
  );
};
