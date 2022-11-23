import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../constants';

const ErrorResponse = () => {
  const { setAuth, auth } = useAuth();
  // If there is an error with the async request and refresh token has expired, navigate user to login but persist their state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth.validLogin === false) navigate(LOGIN_ROUTE, { state: { from: location }, replace: true });
  }, [auth]);

  return (err) => {
    if (err?.response?.status === 403 || err?.response?.status === 401) {
      setAuth({ firstName: 'Admin', lastName: 'Admin', accessToken: null, validLogin: false });
    }
  };
};

export default ErrorResponse;
