import { useEffect, useMemo, useState } from "react";
import { fetchTasks, TaskDetails, type Task } from "../../entities/task";
import { fetchUserById, UserCard, type User } from "../../entities/user";
import { TaskList } from "../../features/task-list";
import { Modal } from "../../shared/ui";
import styles from "./TodosPage.module.css";

type StatusFilter = "all" | "completed" | "uncompleted";

const SEARCH_DEBOUNCE_DELAY = 400;

export const TodosPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskUser, setSelectedTaskUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
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

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchQuery(searchValue);
    }, SEARCH_DEBOUNCE_DELAY);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue]);

  useEffect(() => {
    if (!selectedTask) {
      return;
    }

    let isActive = true;

    const loadUser = async () => {
      try {
        setSelectedTaskUser(null);
        setUserError(null);
        setIsUserLoading(true);

        const user = await fetchUserById(selectedTask.userId);

        if (isActive) {
          setSelectedTaskUser(user);
        }
      } catch {
        if (isActive) {
          setUserError("Не удалось загрузить пользователя");
        }
      } finally {
        if (isActive) {
          setIsUserLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      isActive = false;
    };
  }, [selectedTask]);

  const handleModalClose = () => {
    setSelectedTask(null);
    setSelectedTaskUser(null);
    setIsUserLoading(false);
    setUserError(null);
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
            <div className={styles.filters}>
              <input
                className={styles.searchInput}
                type="search"
                placeholder="Поиск по названию"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
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
            </div>

            <p className={styles.resultsCount}>
              Найдено: {filteredTasks.length}
            </p>

            {filteredTasks.length > 0 ? (
              <TaskList tasks={filteredTasks} onTaskClick={setSelectedTask} />
            ) : (
              <div className={styles.state}>Задачи не найдены</div>
            )}
          </>
        )}
      </section>

      {selectedTask && (
        <Modal title="Детали задачи" onClose={handleModalClose}>
          <div className={styles.modalContent}>
            <TaskDetails task={selectedTask} />
            <UserCard
              user={selectedTaskUser}
              isLoading={isUserLoading}
              error={userError}
            />
          </div>
        </Modal>
      )}
    </main>
  );
};
