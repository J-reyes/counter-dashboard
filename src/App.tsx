import { useState } from 'react'

import './App.css'
import AddCategoryForm from './components/AddCategoryForm'
import CategoryList from './components/CategoryList'
import type { Category } from './types'


function App() {
  const [categories, setCategories] = useState<Category[]>([])


  function handleAddCategory(category: Category) {
    setCategories(prev => [category, ...prev])
  }


  return (
    <div>
      <h1>Counter Dashboard</h1>
      <AddCategoryForm  onAddCategory={handleAddCategory}/>
      <CategoryList categories={categories} />
    </div>
  )
}

export default App
