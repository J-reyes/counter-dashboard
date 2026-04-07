import { useState } from "react";
import type { Counter } from "../types";

interface AddCounterFormProps {
  onAddCounter: (counter: Counter) => void;
  selectedCategoryId: string;
}

export default function AddCounterForm({ onAddCounter, selectedCategoryId }: AddCounterFormProps) {
  const [form, setForm] = useState({
    label: "",
    mode: "simple" as "simple" | "segmented",
  });

  function handleChange(inputName: string, newValue: string) {
    setForm((prev) => ({ ...prev, [inputName]: newValue }));
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.label.trim() === "") return;
    const newCounter: Counter =
      form.mode === "simple"
        ? {
            id: crypto.randomUUID(),
            label: form.label,
            mode: "simple",
            count: 0,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            categoryId: selectedCategoryId,
          }
        : {
            id: crypto.randomUUID(),
            label: form.label,
            mode: "segmented",
            segments: [],
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            categoryId: selectedCategoryId,
          };
    onAddCounter(newCounter);
    setForm({ label: "", mode: "simple" });
  }

  return (
    <div className="form-section">
      <p className="form-section-title">Add Counter</p>
      <form onSubmit={handleSubmit} className="form-row">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            className="input"
            type="text"
            placeholder="Counter name"
            value={form.label}
            onChange={(e) => handleChange("label", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mode</label>
          <select
            className="select"
            value={form.mode}
            onChange={(e) => handleChange("mode", e.target.value)}
          >
            <option value="simple">Simple</option>
            <option value="segmented">Segmented</option>
          </select>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={form.label.trim() === ""}
        >
          Add
        </button>
      </form>
    </div>
  );
}
