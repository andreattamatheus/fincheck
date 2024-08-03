import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";
import { currenctStringToNumber } from "../../../../../app/utils/currenctStringToNumber";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Initial balance is required"),
    z.number(),
  ]),
  name: z.string().nonempty("Account name is required"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z.string().nonempty("Color is required"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdit } =
    useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdit?.color,
      name: accountBeingEdit?.name,
      type: accountBeingEdit?.type,
      initialBalance: accountBeingEdit?.initialBalance,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: updateAccount } = useMutation(
    bankAccountsService.update
  );
  const { isLoading: isLoadingDelete, mutateAsync: removeAccount } =
    useMutation(bankAccountsService.remove);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currenctStringToNumber(data.initialBalance),
        id: accountBeingEdit!.id,
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.error("Account was updated with success", {
        icon: "✔",
        style: {
          borderRadius: "10px",
          background: "rgb(42 201 42)",
          color: "#fff",
        },
      });
      closeEditAccountModal();
    } catch (error) {
      toast.error("Error trying to update account", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "rgb(201 42 42)",
          color: "#fff",
        },
      });
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdit!.id);
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.error("Account was deleted with success", {
        icon: "✔",
        style: {
          borderRadius: "10px",
          background: "rgb(42 201 42)",
          color: "#fff",
        },
      });
      closeEditAccountModal();
    } catch (error) {
      toast.error("Error trying to delete account", {
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
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete,
  };
}
