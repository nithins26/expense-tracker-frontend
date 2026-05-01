import { r as reactExports, W as jsxRuntimeExports } from "./worker-entry-DnpScg6Z.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, L as Label } from "./label-CDofCh1M.js";
import { I as Input } from "./input-BiKinH5j.js";
import { B as Button } from "./button-DU89Ij3r.js";
import { c as cn } from "./index-C5ln1CE0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as SelectSeparator } from "./select-vyPhWnJo.js";
import { S as Search, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, B as Badge } from "./badge-BWatkTp3.js";
import { R as Root, P as Portal, C as Content, a as Close, X, T as Title, D as Description, O as Overlay, c as CirclePlus } from "./index-Cywbx7Wg.js";
import { t as toast } from "./index-BgcQGXnU.js";
import { e as expenseService } from "./expenseService-D62cz1jr.js";
import { c as createLucideIcon } from "./createLucideIcon-DPB0GyB5.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-CVpIV_2u.js";
import "./index-aqGtvQ_T.js";
import "./index-CjMsxLpG.js";
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const todayISO = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
const ADD_NEW = "__add_new__";
const DEFAULT_CATEGORIES = ["EMI", "Investment", "Food", "Medical", "Travel", "Other"];
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
const formatCurrency = (n) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}).format(n);
function AddExpensePage() {
  const [expenses, setExpenses] = reactExports.useState([]);
  const [categories, setCategories] = reactExports.useState(DEFAULT_CATEGORIES);
  const [date, setDate] = reactExports.useState(todayISO);
  const [category, setCategory] = reactExports.useState(categories[0] ?? "Food");
  const [amount, setAmount] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [newCatOpen, setNewCatOpen] = reactExports.useState(false);
  const [newCatName, setNewCatName] = reactExports.useState("");
  const [filterFrom, setFilterFrom] = reactExports.useState("");
  const [filterTo, setFilterTo] = reactExports.useState("");
  const [filterCategory, setFilterCategory] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [selectedMonth, setSelectedMonth] = reactExports.useState(currentMonth);
  const [editing, setEditing] = reactExports.useState(null);
  const loadExpenses = reactExports.useCallback(async () => {
    const data = await expenseService.list();
    setExpenses(data);
    setCategories((current) => Array.from(/* @__PURE__ */ new Set([...current, ...data.map((expense) => expense.category).filter(Boolean)])));
  }, []);
  reactExports.useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);
  const filtered = reactExports.useMemo(() => {
    return expenses.filter((e) => {
      if (selectedMonth && e.date?.slice(0, 7) !== selectedMonth) return false;
      if (filterFrom && e.date < filterFrom) return false;
      if (filterTo && e.date > filterTo) return false;
      if (filterCategory !== "all" && e.category !== filterCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!e.category.toLowerCase().includes(q) && !(e.notes ?? "").toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [expenses, selectedMonth, filterFrom, filterTo, filterCategory, search]);
  const filteredTotal = filtered.reduce((s, e) => s + e.amount, 0);
  const handleCategoryChange = (v) => {
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
    setCategories((current) => current.includes(created) ? current : [...current, created]);
    setCategory(created);
    setNewCatOpen(false);
    toast.success(`Added category "${created}"`);
  };
  const onSubmit = async (e) => {
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
        notes: notes.trim() || void 0
      });
      await loadExpenses();
      toast.success("Expense added");
      setAmount("");
      setNotes("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to add expense");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Expenses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Log, edit and review your spending" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full sm:w-56", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedMonth, onValueChange: setSelectedMonth, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: monthOptions.map((month) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: month.value, children: month.label }, month.value)) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", style: {
        boxShadow: "var(--shadow-card)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "New entry" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "All fields except notes are required" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "date", type: "date", required: true, value: date, onChange: (e) => setDate(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: handleCategoryChange, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a category" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectSeparator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ADD_NEW, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-primary", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                  " Add new category"
                ] }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "amount", type: "number", inputMode: "decimal", min: "0", step: "0.01", required: true, value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "0.00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", children: "Notes (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "notes", value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "e.g., Lunch with team", rows: 3 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4" }),
            "Add expense"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-3", style: {
        boxShadow: "var(--shadow-card)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "All expenses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
              filtered.length,
              " entries · ",
              formatCurrency(filteredTotal),
              " ",
              "total"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "From" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: filterFrom, onChange: (e) => setFilterFrom(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "To" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: filterTo, onChange: (e) => setFilterTo(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterCategory, onValueChange: (v) => setFilterCategory(v), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All" }),
                  categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c))
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Search" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "pl-8", placeholder: "Notes or category", value: search, onChange: (e) => setSearch(e.target.value) })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center text-sm text-muted-foreground", children: "No expenses match these filters." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-20" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: new Date(e.date).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: e.category }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: e.notes || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono font-medium", children: formatCurrency(e.amount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => setEditing(e), "aria-label": "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Delete", onClick: async () => {
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
                  toast.error(err instanceof Error ? err.message : "Unable to remove expense");
                }
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
            ] }) })
          ] }, e.id ?? e._id)) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: newCatOpen, onOpenChange: setNewCatOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add new category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a custom category for your expenses." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-cat", children: "Category name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "new-cat", value: newCatName, onChange: (e) => setNewCatName(e.target.value), placeholder: "e.g., Subscriptions", autoFocus: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setNewCatOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: confirmNewCategory, children: "Add category" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditExpenseDialog, { expense: editing, categories, onClose: () => setEditing(null), onSaved: loadExpenses, onAddCategory: (name) => {
      const created = name.trim();
      if (!created) return null;
      setCategories((current) => current.includes(created) ? current : [...current, created]);
      return created;
    } })
  ] });
}
function EditExpenseDialog({
  expense,
  categories,
  onClose,
  onSaved,
  onAddCategory
}) {
  const [date, setDate] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [newCatOpen, setNewCatOpen] = reactExports.useState(false);
  const [newCatName, setNewCatName] = reactExports.useState("");
  reactExports.useEffect(() => {
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
        notes: notes.trim() || void 0
      });
      await onSaved();
      toast.success("Expense updated");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to update expense");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!expense, onOpenChange: (o) => !o ? onClose() : null, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit expense" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update the details below and save." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: (v) => {
            if (v === ADD_NEW) {
              setNewCatName("");
              setNewCatOpen(true);
              return;
            }
            setCategory(v);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectSeparator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ADD_NEW, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                " Add new category"
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", step: "0.01", value: amount, onChange: (e) => setAmount(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), rows: 3 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClose, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, children: "Save changes" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: newCatOpen, onOpenChange: setNewCatOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add new category" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newCatName, onChange: (e) => setNewCatName(e.target.value), autoFocus: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setNewCatOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
          const created = onAddCategory(newCatName);
          if (!created) {
            toast.error("Enter a category name");
            return;
          }
          setCategory(created);
          setNewCatOpen(false);
          toast.success(`Added category "${created}"`);
        }, children: "Add category" })
      ] })
    ] }) })
  ] });
}
export {
  AddExpensePage as component
};
