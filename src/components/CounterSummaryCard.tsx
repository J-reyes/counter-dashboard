import type { Counter } from "../types";

interface CounterSummaryCardProps {
  counter: Counter;
  onSelectCounter: (id: string) => void;
  onDeleteCounter: (id: string) => void;
}

export default function CounterSummaryCard({
  counter,
  onSelectCounter,
  onDeleteCounter,
}: CounterSummaryCardProps) {
  return (
    <div>
      <span>Counter Label: {counter.label}</span>
      <span>Created At: {counter.createdAt}</span>
      <span>Mode: {counter.mode}</span>
      <span>
        Total:{" "}
        {counter.mode === "simple"
          ? counter.count
          : counter.segments.reduce((acc, segment) => acc + segment.count, 0)}
      </span>
      <button onClick={() => onSelectCounter(counter.id)}>Open</button>
      <button onClick={() => onDeleteCounter(counter.id)}>Delete</button>
    </div>
  );
}
