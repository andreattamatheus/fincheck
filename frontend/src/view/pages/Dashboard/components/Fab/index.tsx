import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { Income } from "../../../../components/icons/categories/income/Income";
import { Expense } from "../../../../components/icons/categories/expense/Expense";

export function Fab() {
  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="bg-teal-900 h-12 w-12 rounded-full flex items-center justify-center text-white">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item className="gap-2">
            <Expense />
            New expense
          </DropdownMenu.Item>
          <DropdownMenu.Item className="gap-2">
            <Income />
            New income
          </DropdownMenu.Item>
          <DropdownMenu.Item className="gap-2">
            <BankAccountIcon />
            New account
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
