import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { useFiltersModals } from "./useFiltersModal";
import { cn } from "../../../../../../app/utils/cn";

interface FiltersModalProps {
  open: boolean;
  onClose?(): void;
}

const mockedBankAccounts = [
  {
    id: "1",
    name: "XP Investimentos",
  },
  {
    id: "2",
    name: "Nubank",
  },
  {
    id: "3",
    name: "Cash",
  },
];

export function FiltersModal({ open, onClose }: FiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectedBankAccount,
    selectedYear,
    handleChangeYear,
  } = useFiltersModals();
  return (
    <Modal open={open} title="Filter" onClose={onClose}>
      <div className="">
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Account
        </span>
        <div className="space-y-2 mt-2">
          {mockedBankAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => handleSelectedBankAccount(account.id)}
              className={cn(
                "p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors",
                account.id === selectedBankAccountId ? "!bg-gray-200" : ""
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold ">Year</span>
        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            onClick={() => handleChangeYear(-1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center">
            <span className="font-medium tracking-[-0.5px] text-sm">
              {selectedYear}
            </span>
          </div>
          <button
            onClick={() => handleChangeYear(1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <Button className="mt-10 w-full">Apply filters</Button>
    </Modal>
  );
}
