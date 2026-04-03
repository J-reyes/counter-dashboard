import CounterSummaryCard from './CounterSummaryCard'
import type { Counter } from '../types'

interface CounterListProps {
  counters: Counter[]
  onSelectCounter: (id: string) => void
  onDeleteCounter: (id: string) => void
}

export default function CounterList({ counters, onSelectCounter, onDeleteCounter }: CounterListProps) {
  return (
    <div className="list-section">
      <p className="list-title">Counters</p>
      {counters.length > 0 ? (
        counters.map(counter => (
          <CounterSummaryCard
            key={counter.id}
            counter={counter}
            onSelectCounter={onSelectCounter}
            onDeleteCounter={onDeleteCounter}
          />
        ))
      ) : (
        <p className="empty-state">No counters yet — add one above.</p>
      )}
    </div>
  )
}
