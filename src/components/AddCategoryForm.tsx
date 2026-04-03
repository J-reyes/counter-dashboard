import { useState } from "react";
import type { Category } from "../types";

interface AddCategoryFormProps {
  onAddCategory: (category: Category) => void;
}

export default function AddCategoryForm({ onAddCategory }: AddCategoryFormProps) {
  const [name, setName] = useState("");

  function handleAddCategory(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim() === "") return;
    onAddCategory({ id: crypto.randomUUID(), name: name.trim(), createdAt: new Date().toISOString() });
    setName("");
  }

  return (
    <div className="form-section">
      <p className="form-section-title">Add Category</p>
      <form onSubmit={handleAddCategory} className="form-row">
        <input
          className="input"
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary" type="submit" disabled={name.trim() === ""}>
          Add
        </button>
      </form>
    </div>
  );
}
