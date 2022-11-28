import useAuth from './useAuth';

const ErrorResponse = () => {
  const { setAuth } = useAuth();

  return (err) => {
    if (err?.response?.status === 403 || err?.response?.status === 401) {
      return setAuth({ firstName: 'Admin', lastName: 'Admin', accessToken: null, validLogin: false });
    }
  };
};

export default ErrorResponse;
