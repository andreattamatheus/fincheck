import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactions";

export function useTransactions() {
  const { data, isFetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      transactionsService.getAll({
        month: 7,
        year: 2024,
      }),
  });

  return {
    transactions: data ?? [],
    isFetching,
  };
}
