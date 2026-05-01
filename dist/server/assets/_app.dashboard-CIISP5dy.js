import { r as reactExports, W as jsxRuntimeExports } from "./worker-entry-DnpScg6Z.js";
import { u as useStore, e as expenseService, b as borrowService } from "./expenseService-D62cz1jr.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-vyPhWnJo.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-CVpIV_2u.js";
import "./index-CjMsxLpG.js";
import "./index-C5ln1CE0.js";
import "./createLucideIcon-DPB0GyB5.js";
const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
const currentMonth = `${currentYear}-${String((/* @__PURE__ */ new Date()).getMonth() + 1).padStart(2, "0")}`;
const monthOptions = Array.from({
  length: 12
}, (_, i) => {
  const value = `${currentYear}-${String(i + 1).padStart(2, "0")}`;
  return {
    value,
    label: new Date(currentYear, i, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    })
  };
});
function Dashboard() {
  const {
    expenses,
    lending
  } = useStore();
  const [selectedMonth, setSelectedMonth] = reactExports.useState(currentMonth);
  reactExports.useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([expenseService.list(), borrowService.list()]);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };
    loadData();
  }, []);
  const monthlyExpenses = reactExports.useMemo(() => expenses.filter((expense) => expense.date?.slice(0, 7) === selectedMonth), [expenses, selectedMonth]);
  const monthlyLending = reactExports.useMemo(() => lending.filter((item) => item.date?.slice(0, 7) === selectedMonth), [lending, selectedMonth]);
  const selectedMonthLabel = monthOptions.find((month) => month.value === selectedMonth)?.label ?? "Selected month";
  const totalExpenses = monthlyExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const toReceive = monthlyLending.filter((item) => item.type === "RECEIVE" && item.status !== "SETTLED").reduce((sum, item) => sum + (item.amount || 0), 0);
  const toPay = monthlyLending.filter((item) => item.type === "PAY" && item.status !== "SETTLED").reduce((sum, item) => sum + (item.amount || 0), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Monthly overview for ",
          selectedMonthLabel
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full sm:w-56", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedMonth, onValueChange: setSelectedMonth, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: monthOptions.map((month) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: month.value, children: month.label }, month.value)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-5 shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm text-muted-foreground", children: "To receive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-green-600", children: [
          "₹",
          toReceive
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Pending" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-5 shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm text-muted-foreground", children: "To pay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-red-500", children: [
          "₹",
          toPay
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Pending" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-5 shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm text-muted-foreground", children: "Total Expenses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-blue-500", children: [
          "₹",
          totalExpenses
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: selectedMonthLabel })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-5 shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-4", children: "Recent Lending Entries" }),
      monthlyLending.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No entries found" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: monthlyLending.slice(0, 5).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-b pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: item.personName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: new Date(item.date).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `font-semibold ${item.type === "RECEIVE" ? "text-green-600" : "text-red-500"}`, children: [
            "₹",
            item.amount
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.status })
        ] })
      ] }, item._id)) })
    ] })
  ] });
}
export {
  Dashboard as component
};
