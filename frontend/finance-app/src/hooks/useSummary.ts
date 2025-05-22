import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import type { SummaryDTO } from "@/types";

const useSummary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const { data } = await apiClient.get<SummaryDTO>("/transactions/summary");
      return data;
    },
  });
};

export default useSummary;
