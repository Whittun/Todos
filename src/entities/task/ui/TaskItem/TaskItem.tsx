import type { Task } from "../../model/types";
import styles from "./TaskItem.module.css";

type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <li className={styles.item}>
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
  );
};
