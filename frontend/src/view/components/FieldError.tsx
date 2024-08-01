import { CrossCircledIcon } from "@radix-ui/react-icons";

interface FieldErrorProps {
  error?: string;
}

export function FieldError({ error }: FieldErrorProps) {
  return (
    <div className="mt-2 flex gap-2 items-center text-red-900">
      <CrossCircledIcon />
      <span className="text-xs">{error}</span>
    </div>
  );
}
