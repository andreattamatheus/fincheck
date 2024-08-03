import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { transactionsService } from "../../../../../app/services/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { currenctStringToNumber } from "../../../../../app/utils/currenctStringToNumber";

const schema = z.object({
  value: z.string().nonempty("Value is required"),
  name: z.string().nonempty("Name is required"),
  categoryId: z.string().nonempty("Category is required"),
  bankAccountId: z.string().nonempty("Bank account is required"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const queryClient = useQueryClient();

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { isLoading, mutateAsync } = useMutation(transactionsService.create);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currenctStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.error(
        `${newTransactionType?.toLocaleLowerCase()} created with success`,
        {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "rgb(42 201 42)",
            color: "#fff",
          },
        }
      );
      closeNewTransactionModal();
      reset();
    } catch (error) {
      toast.error(
        `Error trying to create new ${newTransactionType?.toLocaleLowerCase()}`,
        {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "rgb(201 42 42)",
            color: "#fff",
          },
        }
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType
    );
  }, [categoriesList, newTransactionType]);

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
  };
}
