import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function useOnRouteChange(onRouteChange) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', onRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', onRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
