import { axiosPublic } from '../api/axios';
import { useMutation } from '@tanstack/react-query';

async function loginAttempt(loginInfo) {
  // loginInfo should be an object with email and password keys / corresponding values
  const LOGIN_URL = '/api/auth';

  try {
    const loginResults = await axiosPublic.post(LOGIN_URL, loginInfo, { withCredentials: true });
    return loginResults.status === 200 ? loginResults.data : loginResults;
  } catch (err) {
    throw new Error(err);
  }
}

const useLogin = () => {
  const { mutateAsync, data, isLoading, isError, error } = useMutation({
    mutationFn: (loginArg) => loginAttempt(loginArg),
    retry: false,
  });

  return { mutateAsync, data, isLoading, isError, error };
};

export default useLogin;
