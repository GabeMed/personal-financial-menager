import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import type { TransactionDTO } from "@/types";
import type { NewTransactionDTO } from "@/schemas/transaction";

const useCreateTransaction = () => {
  const qc = useQueryClient();
  return useMutation<TransactionDTO, Error, NewTransactionDTO>({
    mutationKey: ["createTransaction"],
    mutationFn: async (dto) => {
      const { data } = await apiClient.post<TransactionDTO>(
        "/transactions",
        dto
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["summary"] });
    },
  });
};

export default useCreateTransaction;
