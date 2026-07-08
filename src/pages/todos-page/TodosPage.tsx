import { useEffect, useMemo, useState } from "react";
import { fetchTasks, TaskDetails, type Task } from "../../entities/task";
import { fetchUserById, UserCard, type User } from "../../entities/user";
import {
  filterTasks,
  TaskFilters,
  TaskList,
  useTaskFilters,
} from "../../features/tasks-list";
import { Modal } from "../../shared/ui";
import styles from "./TodosPage.module.css";

export const TodosPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskUser, setSelectedTaskUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    searchValue,
    searchQuery,
    sortOrder,
    statusFilter,
    setSearchValue,
    setSortOrder,
    setStatusFilter,
    resetFilters,
  } = useTaskFilters();

  const filteredTasks = useMemo(
    () => filterTasks({ tasks, searchQuery, sortOrder, statusFilter }),
    [searchQuery, sortOrder, statusFilter, tasks],
  );

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
            <TaskFilters
              searchValue={searchValue}
              sortOrder={sortOrder}
              statusFilter={statusFilter}
              onSearchChange={setSearchValue}
              onSortChange={setSortOrder}
              onStatusChange={setStatusFilter}
              onReset={resetFilters}
            />

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
