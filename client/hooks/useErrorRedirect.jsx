import React from "react";
import useAuth from './useAuth.jsx';
import { useNavigate, useLocation } from "react-router-dom";

const ErrorResponse = () => {
  const { setAuth } = useAuth();
  // If there is an error with the async request and refresh token has expired, navigate user to login but persist their state
  const navigate = useNavigate();
  const location = useLocation();

  return (err) => {
    if (err.response.status === 403) {
      setAuth({ firstName: 'Admin', lastName: 'Admin' });
      navigate('/login', { state: { from: location }, replace: true });
    };
  }
}

export default ErrorResponse;