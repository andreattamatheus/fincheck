export function currenctStringToNumber(value: string | number) {
  if (typeof value === "number") return value;
  const sanitizedString = value.replace(/\./g, "").replace(",", ".");

  return Number(sanitizedString);
}
