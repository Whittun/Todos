import { TaskItem, type Task } from "../../../entities/task";
import styles from "./TaskList.module.css";

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </ul>
  );
};
