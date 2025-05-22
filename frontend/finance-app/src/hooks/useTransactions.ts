import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import type { TransactionDTO } from "@/types";

const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data } = await apiClient.get<TransactionDTO[]>(
        "/transactions/all"
      );
      return data;
    },
  });
};

export default useTransactions;
