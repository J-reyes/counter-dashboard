import type { SimpleCounter } from "../types";

interface SimpleCounterControlsProps {
  counter: SimpleCounter;
  onIncrement: (counterId: string) => void;
  onDecrement: (counterId: string) => void;
}

export default function SimpleCounterControls({ counter, onIncrement, onDecrement }: SimpleCounterControlsProps) {
  return (
    <div className="counter-controls">
      <button className="btn btn-control" onClick={() => onDecrement(counter.id)}>−</button>
      <span className="count-display">{counter.count}</span>
      <button className="btn btn-control" onClick={() => onIncrement(counter.id)}>+</button>
    </div>
  );
}
