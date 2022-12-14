import { axiosPublic } from './axios';
import { useMutation } from '@tanstack/react-query';

interface LoginCredsType {
  email: string;
  password: string;
}

async function loginAttempt(loginInfo: LoginCredsType) {
  // loginInfo should be an object with email and password keys / corresponding values
  const LOGIN_URL = '/api/auth';
  const loginResults = await axiosPublic.post(LOGIN_URL, loginInfo, { withCredentials: true });
  return loginResults.status === 200 ? loginResults.data : loginResults;
}

const useLogin = () => {
  const { mutateAsync, data, isLoading, isError, error } = useMutation({
    mutationFn: (loginArg: LoginCredsType) => loginAttempt(loginArg),
    retry: false,
  });

  return { mutateAsync, data, isLoading, isError, error };
};

export default useLogin;
