import SimpleCounterControls from './SimpleCounterControls'
import SegmentedCounterControls from './SegmentedCounterControls'

interface CounterDetailProps {
    onBack: () => void
}

export default function CounterDetail({ onBack }: CounterDetailProps) {

    return (
        <div>
            <button onClick={onBack}>Back</button>
            <h2>Counter Name: Pushups</h2>
            <p>Created: Mar 16, 2026</p>
            <SimpleCounterControls />
            <SegmentedCounterControls />
        </div>
    )
}