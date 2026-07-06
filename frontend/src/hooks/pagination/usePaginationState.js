import { useState } from "react";

export const usePaginationState = (
  defaultPage = 1,
  defaultLimit = 10
) => {
  const [page, setPage] = useState(defaultPage);
  const [limit, setLimit] = useState(defaultLimit);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const reset = () => {
    setPage(defaultPage);
    setLimit(defaultLimit);
    setTotal(0);
    setTotalPages(0);
  };

  return {
    page,
    setPage,
    limit,
    setLimit,
    total,
    setTotal,
    totalPages,
    setTotalPages,
    reset,
  };
};
