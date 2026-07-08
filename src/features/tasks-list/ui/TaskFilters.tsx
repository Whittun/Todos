import type { ChangeEventHandler } from "react";
import type { SortOrder, StatusFilter } from "../model/types";
import styles from "./TaskFilters.module.css";

type TaskFiltersProps = {
  searchValue: string;
  sortOrder: SortOrder;
  statusFilter: StatusFilter;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortOrder) => void;
  onStatusChange: (value: StatusFilter) => void;
  onReset: () => void;
};

export const TaskFilters = ({
  searchValue,
  sortOrder,
  statusFilter,
  onSearchChange,
  onSortChange,
  onStatusChange,
  onReset,
}: TaskFiltersProps) => {
  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onSortChange(event.target.value as SortOrder);
  };

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
        className={styles.select}
        value={statusFilter}
        onChange={handleStatusChange}
      >
        <option value="all">Все</option>
        <option value="completed">Выполненные</option>
        <option value="uncompleted">Невыполненные</option>
      </select>
      <select
        className={styles.select}
        value={sortOrder}
        onChange={handleSortChange}
      >
        <option value="default">Без сортировки</option>
        <option value="asc">А-Я</option>
        <option value="desc">Я-А</option>
      </select>
      <button className={styles.resetButton} type="button" onClick={onReset}>
        Сбросить
      </button>
    </div>
  );
};
