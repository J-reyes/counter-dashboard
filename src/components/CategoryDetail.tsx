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
    <div className="view">
      <div className="view-header">
        <button className="btn btn-back" onClick={onBack}>←</button>
        <h2 className="view-title">{categoryName}</h2>
      </div>
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
