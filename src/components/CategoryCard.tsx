import type { Category } from '../types'

interface CategoryCardProps {
    category: Category
    counterCount: number
    onSelectCategory: (id: string) => void
    onDeleteCategory: (id: string) => void
}

export default function CategoryCard({ category, counterCount, onSelectCategory, onDeleteCategory }: CategoryCardProps) {
    return (
        <div>
            <span><p>{category.name}</p></span>
            <span> Created At: {category.createdAt} </span>
            <span>{counterCount} counters</span>
            <button onClick={() => onSelectCategory(category.id)}>Open</button>
            <button onClick={() => onDeleteCategory(category.id)}>Delete</button>
        </div>
    )
}