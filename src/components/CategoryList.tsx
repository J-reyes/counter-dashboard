import CategoryCard from './CategoryCard'
import type { Category, Counter } from '../types'

interface CategoryListProps {
    categories: Category[]
    counters: Counter[]
    onSelectCategory: (id: string) => void
    onDeleteCategory: (id: string) => void
}


export default function CategoryList({ categories, counters, onSelectCategory, onDeleteCategory }: CategoryListProps) {


    return (
        <div>
            <h2>Category List</h2>
            {
               categories.length > 0 ? categories.map(category => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    counterCount={counters.filter(c => c.categoryId === category.id).length}
                    onSelectCategory={onSelectCategory}
                    onDeleteCategory={onDeleteCategory}
                />
               )) : (
                <p>No categories yet</p>
               )
            }
        </div>
    )
}