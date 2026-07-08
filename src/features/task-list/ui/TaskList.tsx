import type { Task } from "../../../entities/task";
import styles from "./TaskList.module.css";

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li className={styles.item} key={task.id}>
          <p className={styles.title}>{task.title}</p>
          <div className={styles.meta}>
            <span className={styles.userId}>User ID: {task.userId}</span>
            <span
              className={`${styles.status} ${
                task.completed ? styles.completed : ""
              }`}
            >
              {task.completed ? "Выполнена" : "Не выполнена"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
