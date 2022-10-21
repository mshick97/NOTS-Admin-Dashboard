import React from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LOGIN_ROUTE } from '../constants';

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return auth?.validLogin ? <Outlet /> : <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace={true} />;
};

export default RequireAuth;
