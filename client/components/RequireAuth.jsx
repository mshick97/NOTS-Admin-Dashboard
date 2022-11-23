import React, { useEffect } from 'react';
import { useLocation, useOutlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LOGIN_ROUTE } from '../constants';

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();
  const outlet = useOutlet();
  const navigate = useNavigate();

  useEffect(() => {
    auth?.validLogin ? outlet : navigate(LOGIN_ROUTE, { state: { from: location }, replace: true });
  }, [auth, location.pathname]);

  return outlet;
};

export default RequireAuth;
