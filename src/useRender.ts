import { useCallback, useState } from 'react';

const useRender = () => {
  const [count, setCount] = useState(0);

  const reRender = useCallback(() => {
    setCount(prev => prev++);
  }, []);

  return { count, reRender };
};

export default useRender;
