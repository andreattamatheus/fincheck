import { useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";

export function useTransactionController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const { transactions, isFetching } = useTransactions();

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: isFetching,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
}
