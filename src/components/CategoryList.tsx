import CategoryCard from './CategoryCard'
import type { Category } from '../types'

interface CategoryListProps {
    categories: Category[]
}


export default function CategoryList({ categories }: CategoryListProps) {
    return (
        <div>
            <h2>Category List</h2>
            {
               categories.length > 0 ? categories.map(category => (
                <CategoryCard key={category.id} category={category} />
               )) : (
                <p>No categories yet</p>
               )
            }
        </div>
    )
}