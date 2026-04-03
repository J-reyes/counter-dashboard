import type { Counter } from "../types";

interface CounterSummaryCardProps {
  counter: Counter;
  onSelectCounter: (id: string) => void;
  onDeleteCounter: (id: string) => void;
}

export default function CounterSummaryCard({ counter, onSelectCounter, onDeleteCounter }: CounterSummaryCardProps) {
  const total =
    counter.mode === "simple"
      ? counter.count
      : counter.segments.reduce((acc, s) => acc + s.count, 0);

  return (
    <div className="card">
      <p className="card-name">{counter.label}</p>
      <p className="card-meta">
        {counter.mode === "simple" ? "Simple" : "Segmented"} · Total: {total}
      </p>
      <p className="card-meta">Created: {new Date(counter.createdAt).toLocaleDateString()}</p>
      <div className="card-actions">
        <button className="btn btn-secondary" onClick={() => onSelectCounter(counter.id)}>Open</button>
        <button className="btn btn-danger" onClick={() => onDeleteCounter(counter.id)}>Delete</button>
      </div>
    </div>
  );
}
