import AddCounterForm from './AddCounterForm'
import CounterList from './CounterList'

interface CategoryDetailProps {
    onBack: () => void
    onSelectCounter: (id: string) => void
}

export default function CategoryDetail({ onBack, onSelectCounter }: CategoryDetailProps) {

    return (
        <div>
            <button onClick={onBack}>Back</button>
            <h2>Category Name: Gym</h2>
            <AddCounterForm />
            <CounterList />
        </div>
    )
}