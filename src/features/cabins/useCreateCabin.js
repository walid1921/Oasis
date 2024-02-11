import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient(); // ! The useQueryClient hook is used to access the query client instance.

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin, // the same as (id) => createCabin(id)
    onSuccess: () => {
      // Invalidate the cache to trigger a re-fetch
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
