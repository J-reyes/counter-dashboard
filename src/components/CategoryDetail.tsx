import type { Counter } from "../types";
import AddCounterForm from "./AddCounterForm";
import CounterList from "./CounterList";

interface CategoryDetailProps {
  onBack: () => void;
  onSelectCounter: (id: string) => void;
  onAddCounter: (counter: Counter) => void;
  onDeleteCounter: (id: string) => void;
  selectedCategoryId: string;
  counters: Counter[];
  categoryName: string;
}

export default function CategoryDetail({
  onBack,
  onSelectCounter,
  onAddCounter,
  onDeleteCounter,
  selectedCategoryId,
  counters,
  categoryName,
}: CategoryDetailProps) {
  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>Category Name: {categoryName}</h2>
      <AddCounterForm
        onAddCounter={onAddCounter}
        selectedCategoryId={selectedCategoryId}
      />
      <CounterList
        counters={counters.filter((c) => c.categoryId === selectedCategoryId)}
        onSelectCounter={onSelectCounter}
        onDeleteCounter={onDeleteCounter}
      />
    </div>
  );
}
