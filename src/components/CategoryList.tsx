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
    <div className="list-section">
      <p className="list-title">Categories</p>
      {categories.length > 0 ? (
        categories.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
            counterCount={counters.filter(c => c.categoryId === category.id).length}
            onSelectCategory={onSelectCategory}
            onDeleteCategory={onDeleteCategory}
          />
        ))
      ) : (
        <p className="empty-state">No categories yet — add one above.</p>
      )}
    </div>
  )
}
