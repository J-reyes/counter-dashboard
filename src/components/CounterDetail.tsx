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
    <div>
      <h2>Counter Detail</h2>
      <button onClick={onBack}>Back</button>
      <h2>{counter.label}</h2>
      <p>Created: {counter.createdAt}</p>
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
