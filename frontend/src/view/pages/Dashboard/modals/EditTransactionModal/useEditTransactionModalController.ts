import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactions";
import toast from "react-hot-toast";
import { currenctStringToNumber } from "../../../../../app/utils/currenctStringToNumber";

const schema = z.object({
  value: z.union([z.string().nonempty("Value is required"), z.number()]),
  name: z.string().nonempty("Name is required"),
  categoryId: z.string().nonempty("Category is required"),
  bankAccountId: z.string().nonempty("Bank account is required"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    },
  });

  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type
    );
  }, [categoriesList, transaction?.type]);

  const { isLoading, mutateAsync: updateTransaction } = useMutation(
    transactionsService.update
  );

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        value: currenctStringToNumber(data.value),
        id: transaction!.id,
        type: transaction!.type,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.error("Transactin was updated with success", {
        icon: "✔",
        style: {
          borderRadius: "10px",
          background: "rgb(42 201 42)",
          color: "#fff",
        },
      });
      onClose();
    } catch (error) {
      toast.error("Error trying to update transaction", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "rgb(201 42 42)",
          color: "#fff",
        },
      });
    }
  });

  const { isLoading: isLoadingDelete, mutateAsync: removeAccount } =
    useMutation(transactionsService.remove);

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteTransaction() {
    try {
      await removeAccount(transaction!.id);
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.error("Transaction was deleted with success", {
        icon: "✔",
        style: {
          borderRadius: "10px",
          background: "rgb(42 201 42)",
          color: "#fff",
        },
      });
      onClose();
    } catch (error) {
      toast.error("Error trying to delete transaction", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "rgb(201 42 42)",
          color: "#fff",
        },
      });
    }
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    isLoadingDelete,
  };
}
