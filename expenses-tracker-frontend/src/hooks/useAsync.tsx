import { DependencyList, useEffect } from 'react';

import { useAsyncAction } from './useAsyncAction';

export function useAsync<T>(
  action: () => Promise<T>,
  dependencies: DependencyList,
) {
  const { trigger, data, loading, error } = useAsyncAction(action, {
    loading: true,
  });

  useEffect(trigger, [...dependencies, trigger]);

  return { data, loading, error, reload: trigger };
}
