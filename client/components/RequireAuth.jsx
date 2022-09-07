import React from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return (
    auth?.validLogin ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace={true} />
  );
}

export default RequireAuth; 
