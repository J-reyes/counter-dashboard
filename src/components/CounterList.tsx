import CounterSummaryCard from './CounterSummaryCard'
import type { Counter } from '../types'

interface CounterListProps {
    counters: Counter[],
    onSelectCounter: (id: string) => void
}

export default function CounterList({ counters, onSelectCounter }: CounterListProps) {
    return (
        <div>
            <h2>Counter List</h2>
            {
                counters.length > 0 ? counters.map(counter => (
                    <CounterSummaryCard key={counter.id} counter={counter} onSelectCounter={onSelectCounter} />
                )) : (
                    <p>No counters yet</p>
                )
            }
        </div>
    )
}