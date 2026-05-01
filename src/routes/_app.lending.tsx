import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { borrowService, useStore } from "@/services/expenseService";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/lending")({
  component: LendingPage,
});

function LendingPage() {
  const { lending } = useStore();

  const [form, setForm] = useState({
    name: "",
    type: "I will receive",
    amount: "",
    date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);

  const visibleLending = useMemo(() => lending, [lending]);

  // ---------- LOAD DATA ----------
  useEffect(() => {
    const load = async () => {
      await borrowService.list();
      setLoading(false);
    };
    load();
  }, []);

  // ---------- HANDLE INPUT ----------
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------- ADD ENTRY ----------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.amount) {
      alert("Please fill required fields");
      return;
    }

    await borrowService.add(form);

    // reset form
    setForm({
      name: "",
      type: "I will receive",
      amount: "",
      date: "",
      notes: "",
    });
  };

  // ---------- DELETE ----------
  const handleDelete = async (id: string) => {
    await borrowService.remove(id);
  };

  // ---------- TOGGLE SETTLED ----------
  const handleToggle = async (entry: any) => {
    await borrowService.update(entry._id, {
      ...entry,
      status: entry.status === "SETTLED" ? "PENDING" : "SETTLED",
    });
  };

  // ---------- CALCULATIONS ----------
  const toReceive = visibleLending
    .filter((x) => x.type === "RECEIVE" && x.status !== "SETTLED")
    .reduce((sum, x) => sum + x.amount, 0);

  const toPay = visibleLending
    .filter((x) => x.type === "PAY" && x.status !== "SETTLED")
    .reduce((sum, x) => sum + x.amount, 0);

  // ---------- UI ----------
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Borrow / Lending</h1>

      {/* SUMMARY */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/2 rounded border border-green-500/20 bg-green-500/10 p-4">
          <h3>To Receive</h3>
          <p className="text-xl font-bold">₹{toReceive}</p>
        </div>

        <div className="w-1/2 rounded border border-red-500/20 bg-red-500/10 p-4">
          <h3>To Pay</h3>
          <p className="text-xl font-bold">₹{toPay}</p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          name="name"
          placeholder="Person name"
          value={form.name}
          onChange={handleChange}
          className="w-full border bg-background p-2"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border bg-background p-2"
        >
          <option>I will receive</option>
          <option>I will pay</option>
        </select>

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border bg-background p-2"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border bg-background p-2"
        />

        <input
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full border bg-background p-2"
        />

        <button className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white">
          Add Entry
        </button>
      </form>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
          <tr className="bg-muted">
              <th className="p-2">Person</th>
              <th className="p-2">Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {visibleLending.map((item: any) => (
              <tr key={item._id} className="border-t">
                <td className="p-2">{item.personName}</td>
                <td className="p-2">{item.type}</td>
                <td className="p-2">₹{item.amount}</td>
                <td className="p-2">{item.date?.slice(0, 10)}</td>

                <td className="p-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={item.status === "SETTLED" ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => handleToggle(item)}
                  >
                    {item.status || "PENDING"}
                  </Button>
                </td>

                <td className="p-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
