import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import { type TransactionDTO } from "@/types";
import { type NewTransactionDTO } from "@/schemas/transaction";
import useCreateCategory from "./useCreateCategory";

const useAddFormTransaction = () => {
  const qc = useQueryClient();
  const createCategory = useCreateCategory();

  return useMutation<TransactionDTO, Error, NewTransactionDTO>({
    mutationKey: ["addFormTransaction"],
    mutationFn: async (dto) => {
      let category_id = dto.category_id;

      if (category_id === null && dto.newCategoryName) {
        const newCat = await createCategory.mutateAsync({
          name: dto.newCategoryName,
        });
        category_id = newCat.id;
      }

      const { data } = await apiClient.post<TransactionDTO>("/transactions", {
        description: dto.description,
        amount: dto.amount,
        type: dto.type,
        category_id,
      });

      return data;
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["summary"] });
    },
  });
};

export default useAddFormTransaction;
