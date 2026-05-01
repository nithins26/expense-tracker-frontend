import { useSyncExternalStore } from "react";

const API = import.meta.env.VITE_API_URL;
const isBrowser = typeof window !== "undefined";

// ---------- TOKEN ----------
const getToken = () => {
  if (!isBrowser) return null;
  return localStorage.getItem("pet:token");
};

// ---------- INTERNAL STORE ----------
let state = {
  expenses: [] as any[],
  lending: [] as any[],
};

const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((l) => l());
};

const normalizeList = (data: any) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.items)) return data.data.items;
  if (Array.isArray(data?.items)) return data.items;
  return [];
};

// ---------- FETCH HELPERS ----------
const fetchExpenses = async () => {
  const res = await fetch(`${API}/api/expenses`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch expenses");
  }
  state = { ...state, expenses: normalizeList(data) };
  emit();
};

const fetchBorrow = async () => {
  const res = await fetch(`${API}/api/borrow`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch borrow entries");
  }
  state = { ...state, lending: normalizeList(data) };
  emit();
};

// ---------- EXPENSE SERVICE ----------
export const expenseService = {
  async list() {
    await fetchExpenses();
    return state.expenses;
  },

  async add(expense: any) {
    const payload = {
      amount: Number(expense.amount),
      category: expense.category,
      notes: expense.notes,
      date: expense.date,
    };

    const res = await fetch(`${API}/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to add expense");
    }

    await fetchExpenses();
    return data;
  },

  async update(id: string, expense: any) {
    const payload = {
      amount: Number(expense.amount),
      category: expense.category,
      notes: expense.notes,
      date: expense.date,
    };

    const res = await fetch(`${API}/api/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to update expense");
    }

    await fetchExpenses();
    return data;
  },

  async remove(id: string) {
    const res = await fetch(`${API}/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to remove expense");
    }

    await fetchExpenses();
  },
};

// ---------- BORROW / LENDING SERVICE ----------
export const borrowService = {
  async list() {
    await fetchBorrow();
    return state.lending;
  },

  async add(entry: any) {
    const payload = {
      personName: entry.name,
      type: entry.type === "I will receive" ? "RECEIVE" : "PAY",
      amount: Number(entry.amount),
      notes: entry.notes,
      date: entry.date,
    };

    const res = await fetch(`${API}/api/borrow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    await fetchBorrow();
    return res.json();
  },

  async update(id: string, entry: any) {
    const payload = {
      personName: entry.personName ?? entry.name,
      type:
        entry.type === "I will receive" || entry.type === "RECEIVE"
          ? "RECEIVE"
          : "PAY",
      amount: Number(entry.amount),
      notes: entry.notes,
      status: entry.status,
      date: entry.date,
    };

    const res = await fetch(`${API}/api/borrow/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    await fetchBorrow();
    return res.json();
  },

  async remove(id: string) {
    await fetch(`${API}/api/borrow/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    await fetchBorrow();
  },
};

// ---------- HOOK ----------
export const useStore = () => {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => ({ expenses: [], lending: [] }), // SSR safe
  );
};
