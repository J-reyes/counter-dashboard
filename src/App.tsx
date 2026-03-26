import { useState } from "react";

import "./App.css";
import AddCategoryForm from "./components/AddCategoryForm";
import CategoryList from "./components/CategoryList";
import CategoryDetail from "./components/CategoryDetail";
import CounterDetail from "./components/CounterDetail";

import type { Category, Counter } from "./types";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [counters, setCounters] = useState<Counter[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCounter, setSelectedCounter] = useState<string | null>(null);

  function handleAddCounter(newCounter: Counter) {
    setCounters((prev) => [newCounter, ...prev]);
  }


  function handleAddCategory(newCategory: Category) {
    setCategories((prev) => [newCategory, ...prev]);
  }

  function handleSelectCategory(id: string) {
    setSelectedCategory(id);
    setSelectedCounter(null);
  }

  function handleSelectCounter(id: string) {
    setSelectedCounter(id);
  }

  function handleBackToCategories() {
    setSelectedCategory(null);
    setSelectedCounter(null);
  }

  function handleBackToCategory() {
    setSelectedCounter(null);
  }

  return (
    <div>
      <h1>Counter Dashboard</h1>

      {selectedCategory === null ? (
        <>
          <AddCategoryForm onAddCategory={handleAddCategory} />
          <CategoryList
            categories={categories}
            onSelectCategory={handleSelectCategory}
          />
        </>
      ) : selectedCounter === null ? (
        <CategoryDetail onBack={handleBackToCategories} onSelectCounter={handleSelectCounter} onAddCounter={handleAddCounter} selectedCategoryId={selectedCategory}/>
      ) : (
        <CounterDetail onBack={handleBackToCategory}/>
      )}
    </div>
  );
}

export default App;
