import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useErrorRedirect from '../hooks/useErrorRedirect';
import { AxiosError } from 'axios';

const useFindUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  async function findUser(e: React.ChangeEvent<HTMLInputElement>) {
    const FIND_USER_URL = '/api/users/find_user';
    const data = { email: e.target.value };
    const user = await axiosPrivate.post(FIND_USER_URL, data);
    return user.data.foundUser;
  }

  const { mutateAsync, data, isLoading } = useMutation({
    mutationFn: (event: React.ChangeEvent<HTMLInputElement>) => findUser(event),
    retry: false,
    onError: (err: AxiosError | any) => {
      return redirect(err);
    },
  });

  return { mutateAsync, data, isLoading };
};

export default useFindUser;
