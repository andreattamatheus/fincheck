import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "../../app/utils/cn";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ModalContentProps {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  title: string;
  action?: React.ReactNode;
  onClose?(): void;
}

export function Modal({
  open,
  children,
  className,
  title,
  action,
  onClose,
}: ModalContentProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 bg-black/80 backdrop-blur-sm z-50",
            "data-[state=open]:animate-overlay-show"
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]",
            "w-full max-w-[400px] outline-none",
            "z-[51] data-[state=open]:animate-content-show",
            className
          )}
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button
              onClick={onClose}
              className="h-12 w-12 flex items-center justify-center outline-none"
            >
              <Cross2Icon className="w-6 h-6" />
            </button>

            <span className="text-lg tracking-[-1px] font-bold">{title}</span>

            <button className="h-12 w-12 flex items-center justify-center outline-none">
              {action}
            </button>
          </header>
          <div className="">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
