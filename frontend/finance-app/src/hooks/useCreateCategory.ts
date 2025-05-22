import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import type { CategoryDTO } from "@/types";
import type { NewCategoryDTO } from "@/schemas/category";

const useCreateCategory = () => {
  const qc = useQueryClient();
  return useMutation<CategoryDTO, Error, NewCategoryDTO>({
    mutationKey: ["createCategory"],
    mutationFn: async (dto) => {
      const { data } = await apiClient.post<CategoryDTO>("/categories", dto);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
};

export default useCreateCategory;
