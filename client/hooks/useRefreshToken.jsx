import { axiosPublic } from '../api/axios.js';
import useAuth from './useAuth.jsx';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPublic.get('/api/refresh', {
      withCredentials: true
    });

    setAuth(prev => {
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  }

  return refresh;
}

export default useRefreshToken;