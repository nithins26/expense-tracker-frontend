import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  expenseService,
  borrowService,
  useStore,
} from "@/services/expenseService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

const currentYear = new Date().getFullYear();
const currentMonth = `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
const monthOptions = Array.from({ length: 12 }, (_, i) => {
  const value = `${currentYear}-${String(i + 1).padStart(2, "0")}`;
  return {
    value,
    label: new Date(currentYear, i, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
  };
});

function Dashboard() {
  const { expenses, lending } = useStore();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // ---------- LOAD DATA ----------
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([expenseService.list(), borrowService.list()]);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };

    loadData();
  }, []);

  const monthlyExpenses = useMemo(
    () => expenses.filter((expense: any) => expense.date?.slice(0, 7) === selectedMonth),
    [expenses, selectedMonth],
  );

  const monthlyLending = useMemo(
    () => lending.filter((item: any) => item.date?.slice(0, 7) === selectedMonth),
    [lending, selectedMonth],
  );

  const selectedMonthLabel =
    monthOptions.find((month) => month.value === selectedMonth)?.label ??
    "Selected month";

  // 💰 Total Expenses
  const totalExpenses = monthlyExpenses.reduce(
    (sum: number, e: any) => sum + (e.amount || 0),
    0,
  );

  // 📥 To Receive
  const toReceive = monthlyLending
    .filter((item: any) => item.type === "RECEIVE" && item.status !== "SETTLED")
    .reduce((sum: number, item: any) => sum + (item.amount || 0), 0);

  // 📤 To Pay
  const toPay = monthlyLending
    .filter((item: any) => item.type === "PAY" && item.status !== "SETTLED")
    .reduce((sum: number, item: any) => sum + (item.amount || 0), 0);

  // ---------- UI ----------
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Monthly overview for {selectedMonthLabel}
          </p>
        </div>
        <div className="w-full sm:w-56">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Receive */}
        <div className="rounded-2xl border bg-card p-5 shadow">
          <h2 className="text-sm text-muted-foreground">To receive</h2>
          <p className="text-2xl font-bold text-green-600">₹{toReceive}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>

        {/* To Pay */}
        <div className="rounded-2xl border bg-card p-5 shadow">
          <h2 className="text-sm text-muted-foreground">To pay</h2>
          <p className="text-2xl font-bold text-red-500">₹{toPay}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>

        {/* Total Expenses */}
        <div className="rounded-2xl border bg-card p-5 shadow">
          <h2 className="text-sm text-muted-foreground">Total Expenses</h2>
          <p className="text-2xl font-bold text-blue-500">₹{totalExpenses}</p>
          <p className="text-sm text-muted-foreground">{selectedMonthLabel}</p>
        </div>
      </div>

      {/* RECENT ENTRIES */}
      <div className="rounded-2xl border bg-card p-5 shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Lending Entries</h2>

        {monthlyLending.length === 0 ? (
          <p className="text-muted-foreground">No entries found</p>
        ) : (
          <div className="space-y-3">
            {monthlyLending.slice(0, 5).map((item: any) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.personName}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      item.type === "RECEIVE"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    ₹{item.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
