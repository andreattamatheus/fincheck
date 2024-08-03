import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactions";

export function useTransactions() {
  const { data, isFetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionsService.getAll,
  });

  return {
    transactions: data ?? [],
    isFetching,
  };
}
