import { AxiosError } from 'axios';
import { AppError, CustomError } from '@/common/interface';
import { useToast } from '@/components/Molecules/Toast';

export const useCustomError = () => {
  const { toast } = useToast();

  const handleError = (error: AppError, onCloseHandler?: () => void) => {
    if (isAxiosError(error)) {
      handleAxiosError(error);
    } else if (isFirebaseError(error)) {
      handleFirebaseError(error);
    } else if (error.message === 'Sign in action cancelled') {
      console.error('Sign in action cancelled:', error.message);
      toast('Sign in action was cancelled. Please try again.', 'destructive');
      return true;
    } else {
      toast(error.message, 'destructive');
      console.error('Unknown Error:', error.message);
    }
  };

  const handleAxiosError = (error: AxiosError<CustomError>) => {
    if (error.response) {
      const statusCode = error.response.status;
      switch (statusCode) {
        case 400:
          console.error('Bad Request Error:', error.response.data);
          toast(error.response.data.message || 'Bad Request', 'destructive');
          break;
        case 401:
          toast('Unauthorized. Please login again to continue.', 'destructive');
          console.error('Unauthorized Error:', error.response.data);
          break;
        case 404:
          toast(error.response.data?.message || 'Not Found', 'destructive');
          console.error('Not Found Error:', error.response.data);
          break;
        case 409:
          toast(
            error.response.data?.message || 'Conflict Error',
            'destructive',
          );
          console.error('Conflict Error:', error.response.data);
          break;
        case 500:
          toast('Internal Server Error', 'destructive');
          console.error('Internal Server Error:', error.response.data);
          break;
        default:
          console.error('Unhandled Status Code:', error.response);
          toast(
            `${error.response?.status} : ${error.response?.data?.message}` ||
              'Unhandled Status Code',
            'destructive',
          );
          break;
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
      toast('No response received', 'destructive');
    } else {
      console.error('Error:', error.message);
    }
  };

  const handleFirebaseError = (error: AppError) => {
    if (isFirebaseTooManyRequestsError(error)) {
      console.error('Firebase Too Many Requests Error:', error.message);
      toast('Too many requests. Please try again later.', 'destructive');
    } else if (isFirebaseAuthError(error)) {
      console.error('Firebase Authentication Error:', error.message);
      toast('Please check your credentials and try again.', 'destructive');
    } else {
      console.error('Firebase Error:', error.message);
      toast(
        'An error occurred with Firebase. Please try again.',
        'destructive',
      );
    }
  };

  // Type guard to check if the error is an AxiosError
  const isAxiosError = (error: AppError): error is AxiosError<CustomError> => {
    return 'isAxiosError' in error && error.isAxiosError === true;
  };

  // Type guard to check if the error is a Firebase error
  const isFirebaseError = (error: AppError): boolean => {
    return 'code' in error;
  };

  const isFirebaseTooManyRequestsError = (error: AppError): boolean => {
    return isFirebaseError(error) && error.code === 'auth/too-many-requests';
  };

  const isFirebaseAuthError = (error: AppError): boolean => {
    return isFirebaseError(error) && error.code.startsWith('auth/');
  };

  return {
    handleError,
  };
};
