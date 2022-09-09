import React, { useEffect } from 'react';
import { axiosPrivate } from '../api/axios.js';
import useRefreshToken from './useRefreshToken.jsx';
import useAuth from './useAuth.jsx';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['authorization']) {
          config.headers['authorization'] = auth.accessToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error)
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['authorization'] = newAccessToken;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [auth, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;