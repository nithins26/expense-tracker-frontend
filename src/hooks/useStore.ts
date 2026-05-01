import { useSyncExternalStore } from "react";
import {
  expenseService,
  lendingService,
  categoryService,
  type Expense,
  type LendingEntry,
} from "@/services/expenseService";

let expensesSnapshot: Expense[] = [];
let expensesKey = "";
function getExpensesSnapshot(): Expense[] {
  const list = expenseService.list();
  // Include fields that can change so edits trigger a re-render.
  const key =
    list
      .map(
        (e) =>
          `${e.id}:${e.amount}:${e.category}:${e.date}:${e.notes ?? ""}:${e.updatedAt ?? ""}`,
      )
      .join("|") +
    ":" +
    list.length;
  if (key !== expensesKey) {
    expensesKey = key;
    expensesSnapshot = list;
  }
  return expensesSnapshot;
}

let lendingSnapshot: LendingEntry[] = [];
let lendingKey = "";
function getLendingSnapshot(): LendingEntry[] {
  const list = lendingService.list();
  const key = list.map((e) => e.id + e.status).join("|") + ":" + list.length;
  if (key !== lendingKey) {
    lendingKey = key;
    lendingSnapshot = list;
  }
  return lendingSnapshot;
}

let categoriesSnapshot: string[] = [];
let categoriesKey = "";
function getCategoriesSnapshot(): string[] {
  const list = categoryService.list();
  const key = list.join("|");
  if (key !== categoriesKey) {
    categoriesKey = key;
    categoriesSnapshot = list;
  }
  return categoriesSnapshot;
}

const emptyExpenses: Expense[] = [];
const emptyLending: LendingEntry[] = [];
const emptyCategories: string[] = [];

export function useExpenses(): Expense[] {
  return useSyncExternalStore(
    (cb) => expenseService.subscribe(cb),
    getExpensesSnapshot,
    () => emptyExpenses,
  );
}

export function useLending(): LendingEntry[] {
  return useSyncExternalStore(
    (cb) => lendingService.subscribe(cb),
    getLendingSnapshot,
    () => emptyLending,
  );
}

export function useCategories(): string[] {
  return useSyncExternalStore(
    (cb) => categoryService.subscribe(cb),
    getCategoriesSnapshot,
    () => emptyCategories,
  );
}

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
