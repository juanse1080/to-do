import { useCallback, useEffect, useState } from "react";

export type useFetchOptions<T> = {
  lazy?: boolean;
  initialData?: T;
} & RequestInit;

const useFetch = <T>(url: string, options?: useFetchOptions<T>) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(options?.initialData);
  const [error, setError] = useState();

  const fetchData = useCallback(async (url: string, options?: RequestInit) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${url}`,
        options
      );
      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();
      setData(json);
      setLoading(false);
      return json as T;
    } catch (error) {
      setLoading(false);
      setError(error as any);
    }
  }, []);

  useEffect(() => {
    if (!options?.lazy) fetchData(url, options);
  }, []);

  return { data, error, loading, fetchData, setData };
};

export default useFetch;
