import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import type { CategoryDTO } from "@/types";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await apiClient.get<CategoryDTO[]>("/categories");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useCategories;
