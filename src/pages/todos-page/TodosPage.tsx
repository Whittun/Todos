import { useEffect, useMemo, useState, type SubmitEventHandler } from "react";
import { fetchTasks, type Task } from "../../entities/task";
import { TaskList } from "../../features/task-list";
import styles from "./TodosPage.module.css";

export const TodosPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    if (!normalizedSearchQuery) {
      return tasks;
    }

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(normalizedSearchQuery),
    );
  }, [searchQuery, tasks]);

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
            </form>

            {filteredTasks.length > 0 ? (
              <TaskList tasks={filteredTasks} />
            ) : (
              <div className={styles.state}>Задачи не найдены</div>
            )}
          </>
        )}
      </section>
    </main>
  );
};
