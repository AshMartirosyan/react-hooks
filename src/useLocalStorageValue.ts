import { useCallback, useSyncExternalStore } from 'react';

const subscribe = (listener: any) => {
  window?.addEventListener('storageChanged', listener);

  return () => window?.removeEventListener('storageChanged', listener);
};

const getSnapshot = (name: string) => () => localStorage.getItem(name);
const getServerSnapshot = () => '';

const useLocalStorageValue = <T>(name: string) => {
  const value = useSyncExternalStore(subscribe, getSnapshot(name), getServerSnapshot);

  const setItem = useCallback(
    (item: T) => {
      localStorage.setItem(name, JSON.stringify(item));
      window.dispatchEvent(new StorageEvent('storageChanged'));
    },
    [name],
  );

  const removeItem = useCallback(() => {
    localStorage.removeItem(name);
    window.dispatchEvent(new StorageEvent('storageChanged'));
  }, [name]);

  return { item: value ? (JSON.parse(value) as T) : null, setItem, removeItem };
};

export default useLocalStorageValue;
