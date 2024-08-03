import { httpClient } from "../httpClient";

export interface CreateTransactionParams {
  name: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE";
  bankAccountId: string;
  categoryId: string;
}

export async function create(params: CreateTransactionParams) {
  const { data } = await httpClient.post("/transactions", params);

  return data;
}
