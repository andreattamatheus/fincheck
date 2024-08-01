import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "INCOME";

  return (
    <Modal
      title={isExpense ? "New income" : "New expense"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form action="">
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">
            Balance
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input type="text" name="accountName" placeholder="Account name" />
          <Select
            placeholder="Type"
            options={[
              { value: "INVESTIMENT", label: "Investiment" },
              { value: "CASH", label: "Money" },
              { value: "CHECKING", label: "Checking account" },
            ]}
          />
          <ColorsDropdownInput />
        </div>
      </form>
    </Modal>
  );
}
