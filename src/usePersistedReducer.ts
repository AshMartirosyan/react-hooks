import { Dispatch, useCallback, useEffect, useReducer } from 'react';
import useLocalStorageValue from './useLocalStorageValue';

type Action<D> = { type: string; payload?: D };
type ReducerFunction<S, D> = (state: S, action: Action<D>) => S;

const usePersistedReducer = <S, A>(
  key: string,
  reducer: ReducerFunction<S, A>,
  initialState: S,
  persist?: boolean,
): [S, Dispatch<Action<A>>] => {
  const { item, setItem, removeItem } = useLocalStorageValue<S>(key);
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...item });

  useEffect(() => {
    removeItem();
  }, [removeItem]);

  const onBlue = useCallback(() => {
    setItem(state);
  }, [setItem, state]);

  useEffect(() => {
    if (persist) {
      window.addEventListener('beforeunload', onBlue);
    }

    return () => {
      if (persist) {
        window.removeEventListener('beforeunload', onBlue);
      }
    };
  }, [onBlue, persist]);

  return [state, dispatch];
};

export default usePersistedReducer;
