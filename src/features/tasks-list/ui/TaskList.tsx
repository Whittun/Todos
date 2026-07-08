import { TaskItem, type Task } from "../../../entities/task";
import styles from "./TaskList.module.css";

type TaskListProps = {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
};

export const TaskList = ({ tasks, onTaskClick }: TaskListProps) => {
  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} onClick={onTaskClick} />
      ))}
    </ul>
  );
};
