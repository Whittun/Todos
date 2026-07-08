import { useEffect, useState } from "react";
import type { SortOrder, StatusFilter } from "./types";

const SEARCH_DEBOUNCE_DELAY = 400;

export const useTaskFilters = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchQuery(searchValue);
    }, SEARCH_DEBOUNCE_DELAY);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue]);

  const resetFilters = () => {
    setSearchValue("");
    setSearchQuery("");
    setStatusFilter("all");
    setSortOrder("default");
  };

  return {
    searchValue,
    searchQuery,
    sortOrder,
    statusFilter,
    setSearchValue,
    setSortOrder,
    setStatusFilter,
    resetFilters,
  };
};
