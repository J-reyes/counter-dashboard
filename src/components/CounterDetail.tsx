import SimpleCounterControls from "./SimpleCounterControls";
import SegmentedCounterControls from "./SegmentedCounterControls";
import type { Counter } from "../types";

interface CounterDetailProps {
  onBack: () => void;
  counter: Counter | null;
  onIncrement: (counterId: string) => void;
  onDecrement: (counterId: string) => void;
  onAddSegment: (counterId: string) => void;
  onIncrementSegment: (counterId: string, segmentId: string) => void;
  onDecrementSegment: (counterId: string, segmentId: string) => void;
  onDeleteSegment: (counterId: string, segmentId: string) => void;
}

export default function CounterDetail({
  onBack,
  counter,
  onIncrement,
  onDecrement,
  onAddSegment,
  onIncrementSegment,
  onDecrementSegment,
  onDeleteSegment,
}: CounterDetailProps) {
  if (!counter) return null;

  return (
    <div className="view">
      <div className="view-header">
        <button className="btn btn-back" onClick={onBack}>
          ←
        </button>
        <h2 className="view-title">{counter.label}</h2>
      </div>
      <p className="card-meta">
        {counter.mode === "simple" ? "Simple" : "Segmented"} · Created:{" "}
        {new Date(counter.createdAt).toLocaleDateString()}
      </p>
      <p className="card-meta">
        Last modified: {new Date(counter.lastModified).toLocaleDateString()}
      </p>
      {counter.mode === "simple" ? (
        <SimpleCounterControls
          counter={counter}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ) : (
        <SegmentedCounterControls
          counter={counter}
          onAddSegment={onAddSegment}
          onIncrementSegment={onIncrementSegment}
          onDecrementSegment={onDecrementSegment}
          onDeleteSegment={onDeleteSegment}
        />
      )}
    </div>
  );
}
