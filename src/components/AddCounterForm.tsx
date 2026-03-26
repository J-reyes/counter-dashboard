import { useState } from "react";
import type { Counter } from "../types";

interface AddCounterFormProps {
  onAddCounter: (counter: Counter) => void;
  selectedCategoryId: string;
}

export default function AddCounterForm({
  onAddCounter,
  selectedCategoryId,
}: AddCounterFormProps) {
  const [form, setForm] = useState({
    label: "",
    step: 1,
    mode: "simple" as "simple" | "segmented",
  });

  function handleAddCounterChange(inputName: string, newValue: string) {
    setForm((prev) => ({ ...prev, [inputName]: newValue }));
  }

  function handleAddCounter(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.label.trim() === "") return;
    const newCounter: Counter =
      form.mode === "simple"
        ? {
            id: crypto.randomUUID(),
            label: form.label,
            step: form.step,
            mode: "simple",
            count: 0,
            createdAt: new Date().toISOString(),
            categoryId: selectedCategoryId,
          }
        : {
            id: crypto.randomUUID(),
            label: form.label,
            step: form.step,
            mode: "segmented",
            segments: [],
            createdAt: new Date().toISOString(),
            categoryId: selectedCategoryId,
          };
    onAddCounter(newCounter);
    setForm({ label: "", step: 1, mode: "simple" as "simple" | "segmented" });
  }

  return (
    <div>
      <h2>Add Counter</h2>
      <form onSubmit={handleAddCounter}>
        <input
          type="text"
          placeholder="Counter Name"
          value={form.label}
          onChange={(e) => handleAddCounterChange("label", e.target.value)}
        />
        <input
          type="number"
          placeholder="Step"
          value={form.step}
          onChange={(e) => handleAddCounterChange("step", e.target.value)}
        />
        <select
          value={form.mode}
          onChange={(e) => handleAddCounterChange("mode", e.target.value)}
        >
          <option value="simple">Simple</option>
          <option value="segmented">Segmented</option>
        </select>
        <button type="submit">Add Counter</button>
      </form>
    </div>
  );
}
