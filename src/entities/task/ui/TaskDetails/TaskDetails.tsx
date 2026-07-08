import type { Task } from "../../model/types";
import styles from "./TaskDetails.module.css";

type TaskDetailsProps = {
  task: Task;
};

export const TaskDetails = ({ task }: TaskDetailsProps) => {
  return (
    <section className={styles.details}>
      <div className={styles.summary}>
        <span
          className={`${styles.status} ${task.completed ? styles.completed : ""}`}
        >
          {task.completed ? "Выполнена" : "Не выполнена"}
        </span>
        <h3 className={styles.title}>{task.title}</h3>
      </div>

      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt>ID задачи</dt>
          <dd>{task.id}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>User ID</dt>
          <dd>{task.userId}</dd>
        </div>
      </dl>
    </section>
  );
};
