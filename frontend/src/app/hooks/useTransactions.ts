import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactions";
import { TransactionsFilters } from "../services/transactions/getAll";

export function useTransactions(filters: TransactionsFilters) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionsService.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransaction: refetch,
  };
}
