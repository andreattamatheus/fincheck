export function currenctStringToNumber(value: string) {
  const sanitizedString = value.replace(/\./g, "").replace(",", ".");
  return Number(sanitizedString);
}
