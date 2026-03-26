import CategoryCard from './CategoryCard'
import type { Category } from '../types'

interface CategoryListProps {
    categories: Category[]
    onSelectCategory: (id: string) => void
}


export default function CategoryList({ categories, onSelectCategory }: CategoryListProps) {


    return (
        <div>
            <h2>Category List</h2>
            {
               categories.length > 0 ? categories.map(category => (
                <CategoryCard key={category.id} category={category} onSelectCategory={onSelectCategory}/>
               )) : (
                <p>No categories yet</p>
               )
            }
        </div>
    )
}