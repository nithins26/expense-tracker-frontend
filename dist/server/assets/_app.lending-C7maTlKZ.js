import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Cxirg5m8.js";
import { u as useStore, b as borrowService } from "./expenseService-Bh83fEw4.js";
import { B as Button } from "./button-_kaszSM2.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-BfU5L8LY.js";
import "./index-TyoOKPst.js";
function LendingPage() {
  const {
    lending
  } = useStore();
  const [form, setForm] = reactExports.useState({
    name: "",
    type: "I will receive",
    amount: "",
    date: "",
    notes: ""
  });
  const [loading, setLoading] = reactExports.useState(true);
  const visibleLending = reactExports.useMemo(() => lending, [lending]);
  reactExports.useEffect(() => {
    const load = async () => {
      await borrowService.list();
      setLoading(false);
    };
    load();
  }, []);
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.amount) {
      alert("Please fill required fields");
      return;
    }
    await borrowService.add(form);
    setForm({
      name: "",
      type: "I will receive",
      amount: "",
      date: "",
      notes: ""
    });
  };
  const handleDelete = async (id) => {
    await borrowService.remove(id);
  };
  const handleToggle = async (entry) => {
    await borrowService.update(entry._id, {
      ...entry,
      status: entry.status === "SETTLED" ? "PENDING" : "SETTLED"
    });
  };
  const toReceive = visibleLending.filter((x) => x.type === "RECEIVE" && x.status !== "SETTLED").reduce((sum, x) => sum + x.amount, 0);
  const toPay = visibleLending.filter((x) => x.type === "PAY" && x.status !== "SETTLED").reduce((sum, x) => sum + x.amount, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-4", children: "Borrow / Lending" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/2 rounded border border-green-500/20 bg-green-500/10 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "To Receive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold", children: [
          "₹",
          toReceive
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/2 rounded border border-red-500/20 bg-red-500/10 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "To Pay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold", children: [
          "₹",
          toPay
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mb-6 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "name", placeholder: "Person name", value: form.name, onChange: handleChange, className: "w-full border bg-background p-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "type", value: form.type, onChange: handleChange, className: "w-full border bg-background p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "I will receive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "I will pay" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "amount", type: "number", placeholder: "Amount", value: form.amount, onChange: handleChange, className: "w-full border bg-background p-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "date", type: "date", value: form.date, onChange: handleChange, className: "w-full border bg-background p-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "notes", placeholder: "Notes", value: form.notes, onChange: handleChange, className: "w-full border bg-background p-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cursor-pointer rounded bg-blue-500 px-4 py-2 text-white", children: "Add Entry" })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2", children: "Person" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: visibleLending.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: item.personName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: item.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2", children: [
          "₹",
          item.amount
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: item.date?.slice(0, 10) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: item.status === "SETTLED" ? "default" : "secondary", className: "cursor-pointer", onClick: () => handleToggle(item), children: item.status || "PENDING" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: "destructive", className: "cursor-pointer", onClick: () => handleDelete(item._id), children: "Delete" }) })
      ] }, item._id)) })
    ] })
  ] });
}
export {
  LendingPage as component
};
