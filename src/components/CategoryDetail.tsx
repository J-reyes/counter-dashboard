import type { Counter } from "../types";
import AddCounterForm from "./AddCounterForm";
import CounterList from "./CounterList";

interface CategoryDetailProps {
  onBack: () => void;
  onSelectCounter: (id: string) => void;
  onAddCounter: (counter: Counter) => void;
  selectedCategoryId: string;
}

export default function CategoryDetail({
  onBack,
  onSelectCounter,
  onAddCounter,
  selectedCategoryId,
}: CategoryDetailProps) {
  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>Category Name: Gym</h2>
      <AddCounterForm
        onAddCounter={onAddCounter}
        selectedCategoryId={selectedCategoryId}
      />
      <CounterList />
    </div>
  );
}
