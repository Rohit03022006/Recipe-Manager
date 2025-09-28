import React, { useState, useEffect } from 'react'
import { FaUtensils, FaPlus, FaTrash, FaArrowLeft } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditRecipe = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    ingredients: [{ name: '', quantity: '', optional: false }],
    instructions: '',
    image: ''
  })
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchRecipe()
  }, [id])

  const fetchRecipe = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${url}/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const recipe = response.data.recipe
      setFormData({
        title: recipe.title || '',
        ingredients: recipe.ingredients && recipe.ingredients.length > 0 
          ? recipe.ingredients 
          : [{ name: '', quantity: '', optional: false }],
        instructions: recipe.instructions || '',
        image: recipe.image || ''
      })
    } catch (error) {
      console.error('Error fetching recipe:', error)
      alert('Error loading recipe')
      navigate('/profile')
    } finally {
      setFetchLoading(false)
    }
  }

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '', optional: false }]
    })
  }

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index)
    setFormData({ ...formData, ingredients: newIngredients })
  }

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = formData.ingredients.map((ingredient, i) => 
      i === index ? { ...ingredient, [field]: value } : ingredient
    )
    setFormData({ ...formData, ingredients: newIngredients })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const token = localStorage.getItem('token')
      
      const response = await axios.put(`${url}/api/recipes/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        alert('Recipe updated successfully!')
        navigate('/profile')
      }
    } catch (error) {
      console.error('Error updating recipe:', error)
      alert('Error updating recipe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500"
            >
              <FaArrowLeft />
              Back to Profile
            </button>
            <div className="text-center">
              <div className="bg-orange-500 rounded-full p-3 inline-block mb-4">
                <FaUtensils className="text-2xl text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Recipe</h1>
            </div>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Recipe Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Classic Chocolate Chip Cookies"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Ingredients *</label>
              <div className="space-y-3">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <input
                      type="text"
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Quantity"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      required
                    />
                    <label className="flex items-center gap-2 px-4 py-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={ingredient.optional}
                        onChange={(e) => handleIngredientChange(index, 'optional', e.target.checked)}
                        className="rounded text-orange-500"
                      />
                      <span className="text-sm text-gray-600">Optional</span>
                    </label>
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-2 mt-4 text-orange-500 hover:text-orange-600 font-medium"
              >
                <FaPlus />
                Add Another Ingredient
              </button>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Instructions *</label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Step-by-step instructions..."
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-vertical"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Recipe Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/recipe-image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                Paste a link to your recipe image (optional)
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:bg-orange-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating Recipe...' : 'Update Recipe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditRecipe;