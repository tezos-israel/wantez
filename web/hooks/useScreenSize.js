import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lib/debounce';

export function useScreenSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onResizeDebounced = useCallback(debounce(onResize, 300), []);

  useEffect(() => {
    onResize();

    window.addEventListener('resize', onResizeDebounced);

    return () => {
      window.removeEventListener('resize', onResizeDebounced);
    };
  }, []);

  return { height, width };

  function onResize() {
    const body = document.body;
    setHeight(window.innerHeight);
    setWidth(body.clientWidth);
  }
}
