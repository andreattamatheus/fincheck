import { useState } from "react";
import { FieldError } from "./FieldError";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?(date: Date): void;
}

export function DatePickerInput({
  error,
  className,
  value,
  onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "bg-white rounded-lg w-full border border-gray-500 px-3 h-[52px] text-gray-700 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none",
              "relative pt-4 text-left",
              error && "!border-red-900",
              className
            )}
          >
            <span className="absolute text-gray-700 text-xs  left-[13px] top-2 pointer-events-none ">
              Date
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>
        <Popover.Content className="z-[90] text-gray-700">
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>
      {error && <FieldError error={error} />}
    </div>
  );
}
