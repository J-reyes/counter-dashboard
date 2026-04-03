import type { Category } from '../types'

interface CategoryCardProps {
  category: Category
  counterCount: number
  onSelectCategory: (id: string) => void
  onDeleteCategory: (id: string) => void
}

export default function CategoryCard({ category, counterCount, onSelectCategory, onDeleteCategory }: CategoryCardProps) {
  return (
    <div className="card">
      <p className="card-name">{category.name}</p>
      <p className="card-meta">Created: {new Date(category.createdAt).toLocaleDateString()}</p>
      <p className="card-meta">{counterCount} {counterCount === 1 ? 'counter' : 'counters'}</p>
      <div className="card-actions">
        <button className="btn btn-secondary" onClick={() => onSelectCategory(category.id)}>Open</button>
        <button className="btn btn-danger" onClick={() => onDeleteCategory(category.id)}>Delete</button>
      </div>
    </div>
  )
}
