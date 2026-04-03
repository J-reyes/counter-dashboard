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

  const selectedCounterData = counters.find((c) => c.id === selectedCounter) ?? null;

  const selectedCategoryName =
    categories.find((c) => c.id === selectedCategory)?.name ?? "";

  function handleAddCounter(newCounter: Counter) {
    setCounters((prev) => [newCounter, ...prev]);
  }
  
  function handleDeleteCounter(id: string) {
    setCounters((prev) => prev.filter((c) => c.id !== id));
  }

  function handleAddCategory(newCategory: Category) {
    setCategories((prev) => [newCategory, ...prev]);
  }

  function handleDeleteCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setCounters((prev) => prev.filter((c) => c.categoryId !== id));
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

  function handleIncrement(counterId: string) {
    setCounters((prev) =>
      prev.map((c) =>
        c.id === counterId && c.mode === "simple"
          ? {
              ...c,
              count: c.count + 1,
            }
          : c,
      ),
    );
  }

  function handleDecrement(counterId: string) {
    setCounters((prev) =>
      prev.map((c) =>
        c.id === counterId && c.mode === "simple" && c.count > 0
          ? {
              ...c,
              count: c.count - 1,
            }
          : c,
      ),
    );
  }

  function handleAddSegment(counterId: string) {
    setCounters((prev) =>
      prev.map((c) =>
        c.id === counterId && c.mode === "segmented"
          ? {
              ...c,
              segments: [...c.segments, { id: crypto.randomUUID(), count: 0 }],
            }
          : c,
      ),
    );
  }

  function handleIncrementSegment(counterId: string, segmentId: string) {
    setCounters((prev) =>
      prev.map((c) =>
        c.id === counterId && c.mode === "segmented"
          ? {
              ...c,
              segments: c.segments.map((s) =>
                s.id === segmentId
                  ? {
                      ...s,
                      count: s.count + 1,
                    }
                  : s,
              ),
            }
          : c,
      ),
    );
  }

  function handleDecrementSegment(counterId: string, segmentId: string) {
    setCounters((prev) =>
      prev.map((c) =>
        c.id === counterId && c.mode === "segmented"
          ? {
              ...c,
              segments: c.segments.map((s) =>
                s.id === segmentId && s.count > 0
                  ? {
                      ...s,
                      count: s.count - 1,
                    }
                  : s,
              ),
            }
          : c,
      ),
    );
  }

  function handleDeleteSegment(counterId: string, segmentId: string) {
    setCounters((prev) =>
      prev.map((c) =>
        c.id === counterId && c.mode === "segmented"
          ? { ...c, segments: c.segments.filter((s) => s.id !== segmentId) }
          : c,
      ),
    );
  }

  return (
    <div className="app">
      <h1 className="app-title">Counter Dashboard</h1>

      {selectedCategory === null ? (
        <div className="view">
          <AddCategoryForm onAddCategory={handleAddCategory} />
          <CategoryList
            counters={counters}
            categories={categories}
            onSelectCategory={handleSelectCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        </div>
      ) : selectedCounter === null ? (
        <CategoryDetail
          onBack={handleBackToCategories}
          onSelectCounter={handleSelectCounter}
          onAddCounter={handleAddCounter}
          onDeleteCounter={handleDeleteCounter}
          counters={counters}
          selectedCategoryId={selectedCategory}
          categoryName={selectedCategoryName}
        />
      ) : (
        <CounterDetail
          onBack={handleBackToCategory}
          counter={selectedCounterData}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onAddSegment={handleAddSegment}
          onIncrementSegment={handleIncrementSegment}
          onDecrementSegment={handleDecrementSegment}
          onDeleteSegment={handleDeleteSegment}
        />
      )}
    </div>
  );
}

export default App;
