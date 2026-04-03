import { useState } from "react";
import type { Category } from "../types";
interface AddCategoryFormProps {
    onAddCategory: (category: Category) => void
}

export default function AddCategoryForm({ onAddCategory }: AddCategoryFormProps) {
    const [name, setName] = useState("")

    function handleAddCategory(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (name.trim() === "") return
        onAddCategory({ id: crypto.randomUUID(), name: name.trim(), createdAt: new Date().toISOString() })
        setName("")
    }

    return (
        <div>
            <h2>Add Category</h2>
            <form onSubmit={handleAddCategory}>
                <input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit" disabled={name.trim() === ""}>Add Category</button>
            </form>
        </div>
    )
}