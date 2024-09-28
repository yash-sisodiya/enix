import { useRootNavigationState } from 'expo-router';
import { Fragment, ReactNode, useEffect } from 'react';

const AppProvider = ({ children }: { children: ReactNode }) => {
  const { key } = useRootNavigationState();

  useEffect(() => {
    if (!key) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return <Fragment>{children}</Fragment>;
};
export default AppProvider;
