import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "./DropdownMenu";
import { useAuth } from "../../app/hooks/useAuth";

export function UserMenu() {
  const { signout, user } = useAuth();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-0 rounded-full w-12 h-12 flex items-center justify-center border-teal-400">
          <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
            {user?.name.slice(0, 2).toLocaleUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={signout}
        >
          Logout
          <ExitIcon className="w-6 h-6" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
