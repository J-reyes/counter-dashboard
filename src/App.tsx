import { useState } from "react";

import "./App.css";
import AddCategoryForm from "./components/AddCategoryForm";
import CategoryList from "./components/CategoryList";
import CategoryDetail from "./components/CategoryDetail";
import CounterDetail from "./components/CounterDetail";

import type { Category } from "./types";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCounter, setSelectedCounter] = useState<string | null>(null);

  function handleAddCategory(category: Category) {
    setCategories((prev) => [category, ...prev]);
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
        <CategoryDetail onBack={handleBackToCategories} onSelectCounter={handleSelectCounter} />
      ) : (
        <CounterDetail onBack={handleBackToCategory}/>
      )}
    </div>
  );
}

export default App;
