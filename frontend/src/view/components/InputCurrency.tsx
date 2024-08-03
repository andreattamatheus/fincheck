import { NumericFormat } from "react-number-format";
import { FieldError } from "./FieldError";
import { cn } from "../../app/utils/cn";

interface InputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "w-full text-[32px] font-bold tracking-[1px] outline-none ",
          error ? "text-red-900" : "text-gray-800"
        )}
        thousandSeparator="."
        decimalSeparator=","
        defaultValue="0"
      />
      {error && <FieldError error={error} />}
    </div>
  );
}
