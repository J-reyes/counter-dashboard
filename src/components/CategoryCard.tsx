import type { Category } from '../types'

interface CategoryCardProps {
    category: Category
    onSelectCategory: (id: string) => void
}

export default function CategoryCard({ category, onSelectCategory }: CategoryCardProps) {

    return (
        <div>
            <span><p>{category.name}</p></span>
            <span> Created At: {category.createdAt} </span>
            <span>Counters: 0</span>
            <button onClick={() => onSelectCategory(category.id)}>Open</button>
            <button>Delete</button>
        </div>
    )
}