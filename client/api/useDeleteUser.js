import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useErrorRedirect from '../hooks/useErrorRedirect';

const useDeleteUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const redirect = useErrorRedirect();

  const queryClient = useQueryClient();

  async function deleteUser(userId) {
    const DELETE_CUSTOMER_URL = `/api/users/${userId}`;
    const deletedUser = await axiosPrivate.delete(DELETE_CUSTOMER_URL);
    return deletedUser.data;
  }

  const { mutateAsync, data, isLoading } = useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerData'] });
    },
    retry: false,
    onError: (err) => {
      return redirect(err);
    },
  });

  return { mutateAsync, data, isLoading };
};

export default useDeleteUser;
