import { Logo } from "../../components/Logo";
import { UserMenu } from "../../components/UserMenu";
import { Accounts } from "./components/Accounts";
import {
  DashboardContext,
  DashboardProvider,
} from "./components/DashboardContext";
import { Fab } from "./components/Fab";
import { Transactions } from "./components/Transactions";
import { EditAccountModal } from "./modals/EditAccountModal";
import { NewAccountModal } from "./modals/NewAccountModal";
import { NewTransactionModal } from "./modals/NewTransactionModal";

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdit }) => (
          <div className="h-full w-full p-4 md:px-8 md:pb-20 md:pt-6 flex-col gap-4">
            <header className="h-8 flex justify-between items-center">
              <Logo className="h-6 text-teal-900" />
              <UserMenu />
            </header>

            <main className="h-full flex-1 flex flex-col md:flex-row gap-4 max-h-full mt-4">
              <div className="w-full md:w-1/2">
                <Accounts />
              </div>
              <div className="w-full md:w-1/2">
                <Transactions />
              </div>
            </main>
            <Fab />
            <NewAccountModal />
            <NewTransactionModal />
            {accountBeingEdit && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
