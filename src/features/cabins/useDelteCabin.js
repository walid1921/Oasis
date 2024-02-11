import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";



export function useDeleteCabin() {
  const queryClient = useQueryClient(); // ! The useQueryClient hook is used to access the query client instance.

  // ! The useMutation hook is used to mutate data on the server and update the cache using React Query.
  const { isLoading: isDeleting, mutate : deleteCabin } = useMutation({
    mutationFn: deleteCabinApi, // the same as (id) => deleteCabin(id)
    onSuccess: () => {
      // Invalidate the cache to trigger a re-fetch
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

    return { isDeleting, deleteCabin };
}
