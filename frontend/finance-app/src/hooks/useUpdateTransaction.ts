import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import type { TransactionDTO } from "@/types";

export default function useUpdateTransaction() {
  const qc = useQueryClient();
  return useMutation<
    TransactionDTO,
    Error,
    { id: number; body: Partial<TransactionDTO> }
  >({
    mutationFn: async ({ id, body }) => {
      const { data } = await apiClient.patch<TransactionDTO>(
        `/transactions/${id}`,
        body
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["summary"] });
    },
  });
}
