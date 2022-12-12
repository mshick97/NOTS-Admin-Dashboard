import useAuth from './useAuth';
import { AxiosError } from 'axios';

const ErrorResponse = () => {
  const authentication = useAuth();
  if (!authentication) throw new Error('useAuth returning null');
  const { setAuth } = authentication;

  return (err: AxiosError | any) => {
    if (err?.response?.status === 403 || err?.response?.status === 401) {
      return setAuth({ firstName: 'Admin', lastName: 'Admin', accessToken: null, validLogin: false });
    }
  };
};

export default ErrorResponse;
