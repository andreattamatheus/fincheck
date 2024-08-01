import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { DatePickerInput } from "../../../../components/DatePickerInput";
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

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      title={isExpense ? "New expense" : "New income"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form action="">
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">
            Balance {isExpense ? "from expense" : "from income"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="accountName"
            placeholder={isExpense ? "Expense name" : "Income name"}
          />
          <Select
            placeholder="Type"
            options={[
              { value: "INVESTIMENT", label: "Investiment" },
              { value: "CASH", label: "Money" },
              { value: "CHECKING", label: "Checking account" },
            ]}
          />
          <Select
            placeholder={isExpense ? "Pay with" : "Receive with"}
            options={[
              { value: "INVESTIMENT", label: "Investiment" },
              { value: "CASH", label: "Money" },
              { value: "CHECKING", label: "Checking account" },
            ]}
          />
          <DatePickerInput />
        </div>
        <Button type="submit" className="w-full mt-6">
          {" "}
          Create{" "}
        </Button>
      </form>
    </Modal>
  );
}
