import axios from 'axios';
import { axiosPublic } from '../api/axios';
import useAuth from './useAuth.jsx';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('https://us-central1-nots-admin-dashboard.cloudfunctions.net/server/refresh', {
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