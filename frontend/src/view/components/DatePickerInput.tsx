import { useState } from "react";
import { FieldError } from "./FieldError";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  error?: string;
  className?: string;
}

export function DatePickerInput({ error, className }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
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
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </Popover.Content>
      </Popover.Root>
      {error && <FieldError error={error} />}
    </div>
  );
}
