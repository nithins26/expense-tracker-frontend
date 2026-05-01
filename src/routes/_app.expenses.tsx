import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, PlusCircle, Pencil, Search, Plus } from "lucide-react";
import { toast } from "sonner";
import { expenseService } from "@/services/expenseService";

export const Route = createFileRoute("/_app/expenses")({
  component: AddExpensePage,
});

const todayISO = () => new Date().toISOString().slice(0, 10);
const ADD_NEW = "__add_new__";
const DEFAULT_CATEGORIES = ["EMI", "Investment", "Food", "Medical", "Travel", "Other"];
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

type ExpenseCategory = string;
type Expense = {
  id?: string;
  _id?: string;
  date: string;
  category: ExpenseCategory;
  amount: number;
  notes?: string;
};

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

function AddExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] =
    useState<ExpenseCategory[]>(DEFAULT_CATEGORIES);

  const [date, setDate] = useState(todayISO);
  const [category, setCategory] = useState<ExpenseCategory>(
    categories[0] ?? "Food",
  );
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  // New-category dialog (for the add form)
  const [newCatOpen, setNewCatOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  // Filters for the list
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | ExpenseCategory>(
    "all",
  );
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Edit dialog state
  const [editing, setEditing] = useState<Expense | null>(null);

  const loadExpenses = useCallback(async () => {
    const data = await expenseService.list();
    setExpenses(data);
    setCategories((current) =>
      Array.from(
        new Set([
          ...current,
          ...data.map((expense) => expense.category).filter(Boolean),
        ]),
      ),
    );
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      if (selectedMonth && e.date?.slice(0, 7) !== selectedMonth) return false;
      if (filterFrom && e.date < filterFrom) return false;
      if (filterTo && e.date > filterTo) return false;
      if (filterCategory !== "all" && e.category !== filterCategory)
        return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !e.category.toLowerCase().includes(q) &&
          !(e.notes ?? "").toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [expenses, selectedMonth, filterFrom, filterTo, filterCategory, search]);

  const filteredTotal = filtered.reduce((s, e) => s + e.amount, 0);

  const handleCategoryChange = (v: string) => {
    if (v === ADD_NEW) {
      setNewCatName("");
      setNewCatOpen(true);
      return;
    }
    setCategory(v);
  };

  const confirmNewCategory = () => {
    const created = newCatName.trim();
    if (!created) {
      toast.error("Enter a category name");
      return;
    }
    setCategories((current) =>
      current.includes(created) ? current : [...current, created],
    );
    setCategory(created);
    setNewCatOpen(false);
    toast.success(`Added category "${created}"`);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      await expenseService.add({
        date,
        category,
        amount: amt,
        notes: notes.trim() || undefined,
      });
      await loadExpenses();
      toast.success("Expense added");
      setAmount("");
      setNotes("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to add expense");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
            <p className="text-sm text-muted-foreground">
              Log, edit and review your spending
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
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card
          className="lg:col-span-2"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <CardHeader>
            <CardTitle>New entry</CardTitle>
            <CardDescription>
              All fields except notes are required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                    <SelectSeparator />
                    <SelectItem value={ADD_NEW}>
                      <span className="flex items-center gap-2 text-primary">
                        <Plus className="h-3.5 w-3.5" /> Add new category
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Lunch with team"
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full">
                <PlusCircle className="h-4 w-4" />
                Add expense
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card
          className="lg:col-span-3"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <CardHeader>
            <div className="flex flex-col gap-1">
              <CardTitle>All expenses</CardTitle>
              <CardDescription>
                {filtered.length} entries · {formatCurrency(filteredTotal)}{" "}
                total
              </CardDescription>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <Label className="text-xs">From</Label>
                <Input
                  type="date"
                  value={filterFrom}
                  onChange={(e) => setFilterFrom(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">To</Label>
                <Input
                  type="date"
                  value={filterTo}
                  onChange={(e) => setFilterTo(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Category</Label>
                <Select
                  value={filterCategory}
                  onValueChange={(v) =>
                    setFilterCategory(v as typeof filterCategory)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Search</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-8"
                    placeholder="Notes or category"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No expenses match these filters.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-20" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((e) => (
                    <TableRow key={e.id ?? e._id}>
                      <TableCell className="text-sm">
                        {new Date(e.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{e.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {e.notes || "—"}
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        {formatCurrency(e.amount)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditing(e)}
                            aria-label="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete"
                            onClick={async () => {
                              const id = e.id ?? e._id;
                              if (!id) {
                                toast.error("Unable to remove expense");
                                return;
                              }
                              try {
                                await expenseService.remove(id);
                                await loadExpenses();
                                toast.success("Removed");
                              } catch (err) {
                                toast.error(
                                  err instanceof Error
                                    ? err.message
                                    : "Unable to remove expense",
                                );
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* New category dialog */}
      <Dialog open={newCatOpen} onOpenChange={setNewCatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
            <DialogDescription>
              Create a custom category for your expenses.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="new-cat">Category name</Label>
            <Input
              id="new-cat"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g., Subscriptions"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewCatOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmNewCategory}>Add category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit expense dialog */}
      <EditExpenseDialog
        expense={editing}
        categories={categories}
        onClose={() => setEditing(null)}
        onSaved={loadExpenses}
        onAddCategory={(name) => {
          const created = name.trim();
          if (!created) return null;
          setCategories((current) =>
            current.includes(created) ? current : [...current, created],
          );
          return created;
        }}
      />
    </div>
  );
}

function EditExpenseDialog({
  expense,
  categories,
  onClose,
  onSaved,
  onAddCategory,
}: {
  expense: Expense | null;
  categories: string[];
  onClose: () => void;
  onSaved: () => Promise<void>;
  onAddCategory: (name: string) => string | null;
}) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [newCatOpen, setNewCatOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    if (expense) {
      setDate(expense.date.slice(0, 10));
      setCategory(expense.category);
      setAmount(String(expense.amount));
      setNotes(expense.notes ?? "");
    }
  }, [expense]);

  if (!expense) return null;

  const save = async () => {
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    const id = expense.id ?? expense._id;
    if (!id) {
      toast.error("Unable to update expense");
      return;
    }
    try {
      await expenseService.update(id, {
        date,
        category,
        amount: amt,
        notes: notes.trim() || undefined,
      });
      await onSaved();
      toast.success("Expense updated");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to update expense");
    }
  };

  return (
    <>
      <Dialog open={!!expense} onOpenChange={(o) => (!o ? onClose() : null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit expense</DialogTitle>
            <DialogDescription>
              Update the details below and save.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={category}
                onValueChange={(v) => {
                  if (v === ADD_NEW) {
                    setNewCatName("");
                    setNewCatOpen(true);
                    return;
                  }
                  setCategory(v);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                  <SelectSeparator />
                  <SelectItem value={ADD_NEW}>
                    <span className="flex items-center gap-2 text-primary">
                      <Plus className="h-3.5 w-3.5" /> Add new category
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={save}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={newCatOpen} onOpenChange={setNewCatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Category name</Label>
            <Input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewCatOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const created = onAddCategory(newCatName);
                if (!created) {
                  toast.error("Enter a category name");
                  return;
                }
                setCategory(created);
                setNewCatOpen(false);
                toast.success(`Added category "${created}"`);
              }}
            >
              Add category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
