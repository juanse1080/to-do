import { useCallback, useEffect, useMemo, useState } from "react";
import { Pagination } from "../types";
import useFetch, { useFetchOptions } from "./useFetch";

export const defaultPagination: Pagination = {
  skip: 0,
  total: 0,
  limit: 20,
};

export type usePaginationFetchOptions<
  K extends string,
  T extends Record<string, any>
> = {
  initialPagination?: Partial<Pagination>;
} & useFetchOptions<Record<K, T[]> & Pagination>;

const usePaginationFetch = <K extends string, T extends Record<string, any>>(
  url: string,
  options?: usePaginationFetchOptions<K, T>
) => {
  const [pagination, setPagination] = useState<Pagination>({
    ...defaultPagination,
    ...options?.initialPagination,
  });

  const { fetchData, ...fetchValue } = useFetch<Record<K, T[]> & Pagination>(
    url,
    {
      ...options,
      lazy: true,
      initialData: options?.initialData,
    }
  );

  const count = useMemo(() => {
    if (!pagination) return 0;

    return Math.ceil(pagination.total / pagination.limit);
  }, [pagination?.total, pagination?.limit]);

  const page = useMemo(() => {
    if (!pagination) return 1;

    return Math.ceil(pagination.skip / pagination.limit) + 1;
  }, [pagination?.skip, pagination?.limit]);

  const handleFetch = useCallback(
    async (skip: number, limit: number) => {
      const response = await fetchData(`${url}?skip=${skip}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response) return;

      setPagination((before) => ({
        ...before,
        total: response.total,
      }));

      return response;
    },
    [fetchData]
  );

  const fetchPrevious = useCallback(async () => {
    const { skip, limit } = pagination;
    const newPagination = { ...pagination, skip: skip - limit };
    setPagination(newPagination);
  }, [pagination]);

  const fetchNext = useCallback(async () => {
    const { skip, limit } = pagination;
    const newPagination = { ...pagination, skip: skip + limit };
    setPagination(newPagination);
  }, [pagination]);

  const fetchFirst = useCallback(async () => {
    const newPagination = { ...pagination, skip: 0 };
    setPagination(newPagination);
  }, [pagination]);

  const fetchLast = useCallback(async () => {
    const { skip, limit } = pagination;
    const newPagination = { ...pagination, skip: skip - limit };
    setPagination(newPagination);
  }, [pagination]);

  const fetchToPage = useCallback(
    async (page: number) => {
      const newPagination = {
        ...pagination,
        skip: (page - 1) * pagination.limit,
      };
      setPagination(newPagination);
    },
    [pagination]
  );

  useEffect(() => {
    handleFetch(pagination.skip, pagination.limit);
  }, [pagination.skip, pagination.limit]);

  return {
    page,
    count,
    pagination,
    fetchPrevious,
    fetchNext,
    fetchFirst,
    fetchLast,
    fetchToPage,
    ...fetchValue,
  };
};

export default usePaginationFetch;
