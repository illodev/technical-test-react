"use client";

import * as React from "react";

type QueryKey = string[];
type MutationKey = string[];
type DataFetcher<TData, TResult> = () => Promise<TResult>;
type DataMutator<TData, TResult> = (...args: any[]) => Promise<TResult>;
type QueryOptions<TData, TResult> = {
  queryKey: QueryKey;
  queryFn: DataFetcher<TData, TResult>;
};
type UseQueryResult<TData> = {
  data: TData | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
};
type MutationOptions<TData, TResult> = {
  mutationKey: MutationKey;
  mutationFn: DataMutator<TData, TResult>;
  onSuccess?: (client: QueryClient, result: TResult) => void;
  onError?: (client: QueryClient, error: Error) => void;
};
type UseMutationResult<TData, TResult> = {
  mutate: (...args: any[]) => Promise<TResult>;
  isLoading: boolean;
  isError: boolean;
};
type PersistOptions<TData> = {
  key: QueryKey;
  data: TData;
};
type UseDataResult<TData> = {
  data: TData;
};

type QueryClient = {
  query: <TData, TResult>(
    key: QueryKey,
    fn: () => Promise<TResult>,
  ) => Promise<TResult>;
  mutate: <TData, TResult>(
    key: QueryKey,
    fn: () => Promise<TResult>,
  ) => Promise<TResult>;
  persist: <TData>(key: QueryKey, data: TData) => TData;
  getCache: (key: QueryKey) => any;
  setCache: (key: QueryKey, data: any) => void;
};

type QueryContextType = {
  queryClient: QueryClient;
};

const QueryContext = React.createContext<QueryContextType | undefined>(
  undefined,
);

interface QueryProviderProps {
  children: React.ReactNode;
  cacheKey?: string;
}

const QueryProvider = ({
  children,
  cacheKey = "query-cache",
}: QueryProviderProps) => {
  const [cache, setCache] = React.useState<Record<string, any>>(() => {
    if (typeof localStorage === "undefined") {
      return {};
    }

    const cache = localStorage.getItem(cacheKey);
    if (cache) {
      return JSON.parse(cache);
    }

    return {};
  });

  const queryClient = React.useMemo(() => {
    return {
      query: async <TData, TResult>(
        key: QueryKey,
        fn: () => Promise<TResult>,
      ) => {
        const cacheKey = key.join(":");

        const data = await fn();

        setCache((prev) => ({
          ...prev,
          [cacheKey]: data,
        }));

        return data;
      },
      mutate: async <TData, TResult>(
        key: MutationKey,
        fn: () => Promise<TResult>,
      ) => {
        return fn();
      },
      persist: <TData,>(key: QueryKey, data: TData) => {
        const cacheKey = key.join(":");

        setCache((prev) => ({
          ...prev,
          [cacheKey]: data,
        }));

        return data;
      },
      getCache: (key: QueryKey) => {
        const cacheKey = key.join(":");
        return cache[cacheKey];
      },
      setCache: (key: QueryKey, data: any) => {
        const cacheKey = key.join(":");

        setCache((prev) => ({
          ...prev,
          [cacheKey]: data,
        }));
      },
    };
  }, [cache]);

  React.useEffect(() => {
    const cache = localStorage.getItem(cacheKey);
    if (cache) {
      setCache(JSON.parse(cache));
    }
  }, [cacheKey]);

  React.useEffect(() => {
    try {
      localStorage.setItem(cacheKey, JSON.stringify(cache));
    } catch (error) {
      console.error("Failed to persist cache", error);
      localStorage.removeItem(cacheKey);
    }
  }, [cache, cacheKey]);

  return (
    <QueryContext.Provider value={{ queryClient }}>
      {children}
    </QueryContext.Provider>
  );
};

const useQuery = <TData, TResult>({
  queryKey,
  queryFn,
}: QueryOptions<TData, TResult>): UseQueryResult<TResult> => {
  const [data, setData] = React.useState<TResult | null>(null);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const context = React.useContext(QueryContext);

  if (!context) {
    throw new Error("useQuery must be used within a QueryProvider");
  }

  const { queryClient } = context;

  const cachedData = React.useMemo(() => {
    return queryClient.getCache(queryKey);
  }, [queryKey]);

  const fetchData = React.useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await queryClient.query(queryKey, queryFn);
      setData(data);
    } catch (error) {
      setIsError(true);
    }
    setIsFetching(false);
  }, [queryKey]);

  React.useEffect(() => {
    fetchData();
  }, []);

  return {
    data: data ?? cachedData ?? null,
    isFetching,
    isLoading: isFetching && !cachedData,
    isError,
    refetch: fetchData,
  };
};

const useMutation = <TData, TResult>({
  mutationKey,
  mutationFn,
  onSuccess,
  onError,
}: MutationOptions<TData, TResult>): UseMutationResult<TData, TResult> => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const context = React.useContext(QueryContext);

  if (!context) {
    throw new Error("useMutation must be used within a QueryProvider");
  }

  const { queryClient } = context;

  const mutate = async (...data: unknown[]) => {
    setIsLoading(true);

    console.log("mutate", mutationKey, data);
    try {
      const result = await queryClient.mutate<TData, TResult>(mutationKey, () =>
        mutationFn(...data),
      );
      onSuccess?.(queryClient, result);
      return result;
    } catch (error) {
      setIsError(true);
      onError?.(queryClient, error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    isError,
  };
};

const useData = <TData,>({
  key,
  data,
}: PersistOptions<TData>): UseDataResult<TData> => {
  const context = React.useContext(QueryContext);

  if (!context) {
    throw new Error("useData must be used within a QueryProvider");
  }

  const { queryClient } = context;

  React.useEffect(() => {
    queryClient.persist(key, data);
  }, [data]);

  return {
    data: queryClient.getCache(key) || data,
  };
};

export { QueryProvider, useData, useMutation, useQuery };
