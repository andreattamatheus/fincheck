import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { Transaction } from "../../../../../app/entities/Transaction";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { TrashIcon } from "../../../../components/icons/TrashIcon";

interface EditTransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function EditTransactionModal({
  transaction,
  open,
  onClose,
}: EditTransactionModalProps) {
  const {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteTransaction,
    isLoadingDelete,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === "EXPENSE";

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        title={isExpense ? "Delete expense" : "Delete income"}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTransaction}
        isLoading={isLoadingDelete}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? "Edit expense" : "Edit income"}
      open={open}
      onClose={onClose}
      action={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">
            Balance {isExpense ? "from expense" : "from income"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            error={errors.name?.message}
            {...register("name")}
            placeholder={isExpense ? "Expense name" : "Income name"}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Type"
                value={value}
                onChange={onChange}
                error={errors.categoryId?.message}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                onChange={onChange}
                error={errors.bankAccountId?.message}
                placeholder={isExpense ? "Pay with" : "Receive with"}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                error={errors.date?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
        <Button isLoading={isLoading} type="submit" className="w-full mt-6">
          {" "}
          Update{" "}
        </Button>
      </form>
    </Modal>
  );
}
