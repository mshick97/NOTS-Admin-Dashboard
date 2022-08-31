import React from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom';

const RequireAuth = ({ validLogin }) => {
  const location = useLocation();

  return (
    validLogin ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth; 
