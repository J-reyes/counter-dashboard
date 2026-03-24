import type { Category } from '../types'

interface CategoryCardProps {
    category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <div>
            <span>{category.name}</span>
            <span>Created At: {category.createdAt}</span>
            <span>Counters: 0</span>
            <button>Open</button>
            <button>Delete</button>
        </div>
    )
}