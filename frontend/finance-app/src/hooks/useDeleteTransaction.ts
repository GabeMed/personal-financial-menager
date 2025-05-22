import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";

export default function useDeleteTransaction() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/transactions/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["summary"] });
    },
  });
}
