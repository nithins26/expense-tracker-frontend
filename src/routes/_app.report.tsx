import { createFileRoute } from "@tanstack/react-router";
import { expenseService } from "@/services/expenseService";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/_app/report")({
  component: ReportPage,
});

type ExpenseCategory = string;

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

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

function ReportPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const EXPENSE_CATEGORIES = useMemo(
    () =>
      Array.from(
        new Set(expenses.map((expense) => expense.category).filter(Boolean)),
      ),
    [expenses],
  );
  const [category, setCategory] = useState<"all" | ExpenseCategory>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useEffect(() => {
    const load = async () => {
      const data = await expenseService.list();
      setExpenses(data);
    };

    load();
  }, []);

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      if (selectedMonth && e.date?.slice(0, 7) !== selectedMonth) return false;
      if (category !== "all" && e.category !== category) return false;
      if (from && e.date < from) return false;
      if (to && e.date > to) return false;
      if (
        search &&
        !(e.notes || "").toLowerCase().includes(search.toLowerCase()) &&
        !e.category.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [expenses, selectedMonth, category, from, to, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const e of filtered) {
      const k = e.date.slice(0, 7);
      const arr = map.get(k) ?? [];
      arr.push(e);
      map.set(k, arr);
    }
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const c of EXPENSE_CATEGORIES) totals[c] = 0;
    for (const e of filtered)
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    return EXPENSE_CATEGORIES.map((c, i) => ({
      category: c,
      total: totals[c],
      fill: `var(--color-chart-${(i % 6) + 1})`,
    }));
  }, [filtered]);

  const grandTotal = filtered.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Monthly report</h1>
          <p className="text-sm text-muted-foreground">
            Analyze your spending across categories
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

      <Card style={{ boxShadow: "var(--shadow-card)" }}>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as typeof category)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {EXPENSE_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>From</Label>
              <Input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>To</Label>
              <Input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Notes or category"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card
          className="lg:col-span-3"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <CardHeader>
            <CardTitle>Spend by category</CardTitle>
            <CardDescription>
              Total: {formatCurrency(grandTotal)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryTotals}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="category"
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      color: "var(--color-popover-foreground)",
                    }}
                    formatter={(v: number) => formatCurrency(v)}
                  />
                  <Bar dataKey="total" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card
          className="lg:col-span-2"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <CardHeader>
            <CardTitle>By category</CardTitle>
            <CardDescription>
              Breakdown across the filtered range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {categoryTotals.map((c) => (
                <li
                  key={c.category}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-sm"
                      style={{ background: c.fill }}
                    />
                    <span>{c.category}</span>
                  </div>
                  <span className="font-mono font-medium">
                    {formatCurrency(c.total)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {grouped.map(([month, items]) => {
        const mTotal = items.reduce((s, e) => s + e.amount, 0);
        return (
          <Card key={month} style={{ boxShadow: "var(--shadow-card)" }}>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>
                  {new Date(month + "-01").toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </CardTitle>
                <CardDescription>{items.length} transactions</CardDescription>
              </div>
              <Badge variant="secondary" className="font-mono">
                {formatCurrency(mTotal)}
              </Badge>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="text-sm">
                        {new Date(e.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{e.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {e.notes || "—"}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(e.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}

      {grouped.length === 0 && (
        <Card style={{ boxShadow: "var(--shadow-card)" }}>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            No expenses match these filters.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
