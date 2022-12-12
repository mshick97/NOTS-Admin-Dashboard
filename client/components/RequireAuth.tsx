import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LOGIN_ROUTE } from '../constants';

const RequireAuth = () => {
  const authentication = useAuth();
  if (!authentication) throw new Error('useAuth returning null');
  const { auth } = authentication;

  return auth.validLogin ? <Outlet /> : <Navigate to={LOGIN_ROUTE} replace={true} />;
};

export default RequireAuth;
