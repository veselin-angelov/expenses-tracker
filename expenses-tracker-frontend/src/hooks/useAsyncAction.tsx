import { useCallback, useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface UseAsyncActionResult<TArgs extends any[], T> {
  loading: boolean;
  error: unknown;
  data: T | undefined;
  trigger: (...args: TArgs) => void;
  perform: (...args: TArgs) => Promise<T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAsyncAction<TArgs extends any[], T>(
  action: (...args: TArgs) => Promise<T>,
  initialState: { data?: T; loading?: boolean } = {},
): UseAsyncActionResult<TArgs, T> {
  const [loading, setLoading] = useState(initialState.loading ?? false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<T | undefined>(initialState.data);

  const lastAction = useRef(action);
  lastAction.current = action;

  const requestId = useRef(0);
  const perform = useCallback(async (...args: TArgs): Promise<T> => {
    requestId.current += 1;
    const myRequestId = requestId.current;

    setLoading(true);

    try {
      const result = await lastAction.current(...args);

      if (requestId.current === myRequestId) {
        setError(undefined);
        setData(result);
        setLoading(false);
      }

      return result;
    } catch (err) {
      if (requestId.current === myRequestId) {
        setLoading(false);
        setError(err);
      }
      throw err;
    }
  }, []);

  const trigger = useCallback(
    (...args: TArgs) => {
      perform(...args).catch(() => {});
    },
    [perform],
  );
  useEffect(() => {
    return () => {
      requestId.current += 1;
    };
  }, []);

  return {
    loading,
    error,
    data,
    trigger,
    perform,
  };
}
