import { RefObject, useEffect } from 'react';

const useOutsideClickHandler = <T>(
  ref: RefObject<T>,
  onOutsideClick: CallableFunction,
  whitelist?: Array<string>,
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !(ref.current as any).contains(event.target) &&
        !whitelist?.includes((event.target as Element)?.id)
      ) {
        onOutsideClick();
      }
    }

    window?.addEventListener('mousedown', handleClickOutside);
    return () => {
      window?.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick, ref, whitelist]);
};

export default useOutsideClickHandler;
