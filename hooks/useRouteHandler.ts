import { useMutation } from '@tanstack/react-query';

import { UserState } from '@/common/interface';
import { getFirebaseToken } from '@/services/api';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { useCustomError } from './useCustomError';
enum Auth {
  'AUTHENTICATED',
  'UNAUTHENTICATED',
}

export const useRouteHandler = () => {
  const { handleError } = useCustomError();
  const { myProfileData } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const handleRoutes = async () => {
    try {
      const token = await getFirebaseToken();
      if (!token) return Auth.UNAUTHENTICATED;
      return token;
    } catch (error) {
      console.log(error);
      return Auth.UNAUTHENTICATED;
    }
  };

  const {
    isPending,
    data: authData,
    isError,
    mutate: authFunction,
    isSuccess,
  } = useMutation({
    mutationFn: handleRoutes,
    onSuccess(data) {
      if (data === Auth.UNAUTHENTICATED) {
        router.replace('/public/login');
        return;
      }
      if (myProfileData?.dateOfBirth && myProfileData?.enable2FA === false) {
        router.replace('/auth/(tabs)');
      } else if (
        myProfileData?.dateOfBirth &&
        myProfileData?.enable2FA === null
      ) {
        router.replace('/public/two_factor_auth');
      } else if (myProfileData?.enable2FA) {
        router.replace('/public/two_factor_verify');
      } else {
        router.replace('/public/registration');
      }
    },
    onError(error) {
      console.log({ error });
      handleError(error);
    },
  });

  return { authData, authFunction, isPending, isError, isSuccess };
};
