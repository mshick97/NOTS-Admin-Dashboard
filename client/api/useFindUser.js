import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useErrorRedirect from '../hooks/useErrorRedirect';

const useFindUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  async function findUser(e) {
    const FIND_USER_URL = '/api/users/find_user';
    const data = { email: e.target.value };

    const user = await axiosPrivate.post(FIND_USER_URL, data);
    return user.data.foundUser;
  }

  const { mutateAsync, data, isLoading, isError, error } = useMutation({
    mutationFn: (event) => findUser(event),
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      redirect(error);
    }
  }, [isError]);

  return { mutateAsync, data, isLoading };
};

export default useFindUser;
