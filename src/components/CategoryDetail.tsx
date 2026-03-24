import AddCounterForm from './AddCounterForm'
import CounterList from './CounterList'

export default function CategoryDetail() {
    return (
        <div>
            <button>Back</button>
            <h2>Category Name: Gym</h2>
            <AddCounterForm />
            <CounterList />
        </div>
    )
}