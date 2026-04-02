import type { SimpleCounter } from "../types";

interface SimpleCounterControlsProps {
    counter: SimpleCounter;
    onIncrement: (counterId: string) => void;
    onDecrement: (counterId: string) => void;
}
export default function SimpleCounterControls({ counter, onIncrement, onDecrement }: SimpleCounterControlsProps) {
    return (
        <div>
            <button onClick={() => onDecrement(counter.id)}>Decrement -</button>
            <span>{counter.count}</span>
            <button onClick={() => onIncrement(counter.id)}>Increment +</button>
        </div>
    )
}