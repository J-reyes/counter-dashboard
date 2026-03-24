import SimpleCounterControls from './SimpleCounterControls'
import SegmentedCounterControls from './SegmentedCounterControls'

export default function CounterDetail() {
    return (
        <div>
            <button>Back</button>
            <h2>Counter Name: Pushups</h2>
            <p>Created: Mar 16, 2026</p>
            <SimpleCounterControls />
            <SegmentedCounterControls />
        </div>
    )
}