import { axiosPublic } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPublic.get('/api/refresh', {
      withCredentials: true,
    });

    const newAccessTokenObj = {
      accessToken: response.data.accessToken || null,
    };

    setAuth((prevState) => {
      return Object.assign({}, prevState, newAccessTokenObj);
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
