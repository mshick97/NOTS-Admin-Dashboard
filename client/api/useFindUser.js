import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useErrorRedirect from '../hooks/useErrorRedirect';

const useFindUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  async function findUser(e) {
    const FIND_USER_URL = '/api/users/find_user';
    const data = { email: e.target.value };

    try {
      const user = await axiosPrivate.post(FIND_USER_URL, data);
      return user.data.foundUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  const { mutateAsync, data, isLoading } = useMutation({
    mutationFn: (event) => findUser(event),
    retry: false,
    onError: (err) => {
      return redirect(err);
    },
  });

  return { mutateAsync, data, isLoading };
};

export default useFindUser;
