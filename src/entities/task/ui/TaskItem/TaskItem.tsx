import type { Task } from "../../model/types";
import styles from "./TaskItem.module.css";

type TaskItemProps = {
  task: Task;
  onClick: (task: Task) => void;
};

export const TaskItem = ({ task, onClick }: TaskItemProps) => {
  return (
    <li>
      <button
        className={styles.item}
        type="button"
        onClick={() => onClick(task)}
      >
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
      </button>
    </li>
  );
};
