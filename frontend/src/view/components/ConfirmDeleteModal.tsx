import { Button } from "./Button";
import { TrashIcon } from "./icons/TrashIcon";
import { Modal } from "./Modal";

interface ConfirmDeleteModalProps {
  onConfirm?(): void;
  onClose?(): void;
  title: string;
  description?: string;
  isLoading?: boolean;
}

export function ConfirmDeleteModal({
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <Modal title={title} open onClose={onClose}>
      <div className="flex items-center text-center flex-col gap-6">
        <div className="w-[52px] h-[52px] rounded-full flex justify-center items-center">
          <TrashIcon className="w-12 h-12 text-red-900" />
        </div>
        <p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
          Are you sure you want to delete this account?
        </p>
        {description && (
          <p className="text-gray-800 tracking-[-0.5px]">{description}</p>
        )}
      </div>
      <div className="mt-10 space-y-4">
        <Button
          isLoading={isLoading}
          className="w-full"
          variant="danger"
          onClick={onConfirm}
        >
          Yes, delete account
        </Button>
        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
