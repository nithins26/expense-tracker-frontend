import { r as reactExports } from "./worker-entry-DnpScg6Z.js";
const API = "http://localhost:5000";
const isBrowser = typeof window !== "undefined";
const getToken = () => {
  if (!isBrowser) return null;
  return localStorage.getItem("pet:token");
};
let state = {
  expenses: [],
  lending: []
};
const listeners = /* @__PURE__ */ new Set();
const emit = () => {
  listeners.forEach((l) => l());
};
const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.items)) return data.data.items;
  if (Array.isArray(data?.items)) return data.items;
  return [];
};
const fetchExpenses = async () => {
  const res = await fetch(`${API}/api/expenses`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
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
      Authorization: `Bearer ${getToken()}`
    }
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch borrow entries");
  }
  state = { ...state, lending: normalizeList(data) };
  emit();
};
const expenseService = {
  async list() {
    await fetchExpenses();
    return state.expenses;
  },
  async add(expense) {
    const payload = {
      amount: Number(expense.amount),
      category: expense.category,
      notes: expense.notes,
      date: expense.date
    };
    const res = await fetch(`${API}/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to add expense");
    }
    await fetchExpenses();
    return data;
  },
  async update(id, expense) {
    const payload = {
      amount: Number(expense.amount),
      category: expense.category,
      notes: expense.notes,
      date: expense.date
    };
    const res = await fetch(`${API}/api/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to update expense");
    }
    await fetchExpenses();
    return data;
  },
  async remove(id) {
    const res = await fetch(`${API}/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to remove expense");
    }
    await fetchExpenses();
  }
};
const borrowService = {
  async list() {
    await fetchBorrow();
    return state.lending;
  },
  async add(entry) {
    const payload = {
      personName: entry.name,
      type: entry.type === "I will receive" ? "RECEIVE" : "PAY",
      amount: Number(entry.amount),
      notes: entry.notes,
      date: entry.date
    };
    const res = await fetch(`${API}/api/borrow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });
    await fetchBorrow();
    return res.json();
  },
  async update(id, entry) {
    const payload = {
      personName: entry.personName ?? entry.name,
      type: entry.type === "I will receive" || entry.type === "RECEIVE" ? "RECEIVE" : "PAY",
      amount: Number(entry.amount),
      notes: entry.notes,
      status: entry.status,
      date: entry.date
    };
    const res = await fetch(`${API}/api/borrow/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });
    await fetchBorrow();
    return res.json();
  },
  async remove(id) {
    await fetch(`${API}/api/borrow/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    await fetchBorrow();
  }
};
const useStore = () => {
  return reactExports.useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => ({ expenses: [], lending: [] })
    // SSR safe
  );
};
export {
  borrowService as b,
  expenseService as e,
  useStore as u
};
