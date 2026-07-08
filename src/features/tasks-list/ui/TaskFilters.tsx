import type { ChangeEventHandler } from "react";
import type { StatusFilter } from "../model/types";
import styles from "./TaskFilters.module.css";

type TaskFiltersProps = {
  searchValue: string;
  statusFilter: StatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onReset: () => void;
};

export const TaskFilters = ({
  searchValue,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onReset,
}: TaskFiltersProps) => {
  const handleStatusChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onStatusChange(event.target.value as StatusFilter);
  };

  return (
    <div className={styles.filters}>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="Поиск по названию"
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <select
        className={styles.statusSelect}
        value={statusFilter}
        onChange={handleStatusChange}
      >
        <option value="all">Все</option>
        <option value="completed">Выполненные</option>
        <option value="uncompleted">Невыполненные</option>
      </select>
      <button className={styles.resetButton} type="button" onClick={onReset}>
        Сбросить
      </button>
    </div>
  );
};
