import { BankAccount } from "../../../../../app/entities/BankAccount";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrecy";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useDashboard } from "../DashboardContext/useDashboard";
interface AccountCardProps {
  data: BankAccount;
  // id: string;
  // color: string;
  // name: string;
  // balance: number;
  // type: "CASH" | "CHECKING" | "INVESTMENT";
}

export function AccountCard({ data }: AccountCardProps) {
  const { areValuesVisible, openEditAccountModal } = useDashboard();
  const { color, name, initialBalance, type } = data;
  return (
    <div
      className="bg-white rounded-2xl p-4 h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="font-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>
      <div>
        <span
          className={cn(
            "text-gray-800 font-medium tracking-[-0.5px] block",
            !areValuesVisible && "blur-sm"
          )}
        >
          {formatCurrency(initialBalance)}
        </span>
        <small className="text-gray-600 text-sm ">Total balance</small>
      </div>
    </div>
  );
}
