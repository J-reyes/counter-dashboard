import SimpleCounterControls from './SimpleCounterControls'
import SegmentedCounterControls from './SegmentedCounterControls'
import type { Counter } from '../types'

interface CounterDetailProps {
    onBack: () => void
    counter: Counter | null
}

export default function CounterDetail({ onBack, counter }: CounterDetailProps) {

    // Early return if no counter is selected
    if (!counter) return null;

    return (
        <div>
            <h2>Counter Detail</h2>
            <button onClick={onBack}>Back</button>
            <h2>{counter.label}</h2>
            <p>Created: {counter.createdAt}</p>
            {counter.mode === "simple" ? (
                <SimpleCounterControls/>
            ) : (
                <SegmentedCounterControls/>
            )}
    </div>
  );
}