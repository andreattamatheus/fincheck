import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: "danger" | "ghost";
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "flex items-center justify-center bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl font-semibold text-white transition-all active:bg-teal-900",
        variant === "danger" && "bg-red-900 hover:bg-red-800 active:bg-red-900",
        variant === "ghost" &&
          "text-gray-800 bg-transparent border border-gray-800 hover:bg-gray-800/5 active:bg-gray-800/10",
        className
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h6" />}
    </button>
  );
}
