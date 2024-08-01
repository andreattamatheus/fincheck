import { NumericFormat } from "react-number-format";

export function InputCurrency() {
  return (
    <NumericFormat
      className="w-full text-[32px] font-bold tracking-[1px] outline-none text-gray-800"
      thousandSeparator="."
      decimalSeparator=","
      defaultValue="0"
    />
  );
}
