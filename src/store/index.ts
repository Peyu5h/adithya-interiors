import { useQuery, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

type Updater<T> = T | ((current: T) => void);

interface StateOptions {
  persist?: boolean;
  key?: string;
}

export function createGlobalState<T extends object>(
  queryKey: string,
  initialData: T,
  options: StateOptions = {},
) {
  const storageKey = options.key || queryKey;

  return () => {
    const queryClient = useQueryClient();
    const queryKeyArray = [queryKey];

    const { data = initialData } = useQuery({
      queryKey: queryKeyArray,
      queryFn: () => {
        if (options.persist) {
          const stored = localStorage.getItem(storageKey);
          return stored ? (JSON.parse(stored) as T) : initialData;
        }
        return initialData;
      },
      staleTime: Infinity,
    });

    const setData = (updater: Updater<T>) => {
      const newState =
        typeof updater === "function"
          ? produce(data, updater as (draft: T) => void)
          : updater;

      queryClient.setQueryData(queryKeyArray, newState);

      if (options.persist) {
        localStorage.setItem(storageKey, JSON.stringify(newState));
      }
    };

    return { data, setData } as const;
  };
}

export function createDerivedState<T extends object, R>(
  useSource: () => { data: T },
  selector: (state: T) => R,
) {
  return () => selector(useSource().data);
}