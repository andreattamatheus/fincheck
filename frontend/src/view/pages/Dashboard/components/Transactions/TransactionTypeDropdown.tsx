import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";

interface TransactionTypeDropdownPros {
  onSelect(type: "INCOME" | "EXPENSE" | undefined): void;
  selectedType: "INCOME" | "EXPENSE" | undefined;
}

export function TransactionTypeDropdown({
  onSelect,
  selectedType,
}: TransactionTypeDropdownPros) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          {selectedType === "EXPENSE" && <ExpensesIcon />}
          {selectedType === "INCOME" && <IncomeIcon />}
          {!selectedType && <TransactionsIcon />}
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === "EXPENSE" && "Expenses"}
            {selectedType === "INCOME" && "Incomes"}
            {!selectedType && "Transactions"}
          </span>
          <ChevronDownIcon className="w-4 h-4 text-gray-800" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]">
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("INCOME")}
        >
          <IncomeIcon />
          Income
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("EXPENSE")}
        >
          <ExpensesIcon />
          Expense
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect(undefined)}
        >
          <TransactionsIcon />
          Transactions
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
