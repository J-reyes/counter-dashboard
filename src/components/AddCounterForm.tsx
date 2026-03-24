export default function AddCounterForm() {
    return (
        <div>
            <h2>Add Counter</h2>
            <form>
                <input type="text" placeholder="Counter Name" />
                <input type="number" placeholder="Step" />
                <select>
                    <option value="simple">Simple</option>
                    <option value="segmented">Segmented</option>
                </select>
                <button type="submit">Add Counter</button>
            </form>
        </div>
    )
}