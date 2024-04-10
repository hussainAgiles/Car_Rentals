import { useEffect, useRef } from 'react';

const useIsMounted = () => {
  const isMountedRef = useRef(true);

  useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    [],
  );

  return () => isMountedRef.current;
};

export default useIsMounted;
