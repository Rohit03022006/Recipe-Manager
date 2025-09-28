import React, { useState } from 'react'
import { FaUtensils, FaPlus, FaTrash } from 'react-icons/fa'

const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: [{ name: '', quantity: '', optional: false }],
    instructions: '',
    image: '' 
  })
  const [loading, setLoading] = useState(false)

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
      const url = import.meta.env.VITE_API_URL;
      
      const response = await fetch(`${url}/api/recipes/newRecipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        alert('Recipe created successfully!')
        setFormData({
          title: '',
          ingredients: [{ name: '', quantity: '', optional: false }],
          instructions: '',
          image: ''
        })
        window.location.href = '/profile'
      } else {
        const error = await response.json()
        alert(error.message || 'Error creating recipe')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error creating recipe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="bg-orange-500 rounded-full p-2 sm:p-3 inline-block mb-3 sm:mb-4">
              <FaUtensils className="text-2xl sm:text-3xl text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Create New Recipe</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Share your culinary masterpiece with the world</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Recipe Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Classic Chocolate Chip Cookies"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Ingredients *</label>
              <div className="space-y-2 sm:space-y-3">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start">
                    <div className="flex-1 w-full sm:w-auto">
                      <input
                        type="text"
                        placeholder="Ingredient name"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                    
                    <div className="w-full sm:w-32">
                      <input
                        type="text"
                        placeholder="Quantity"
                        value={ingredient.quantity}
                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                      <label className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={ingredient.optional}
                          onChange={(e) => handleIngredientChange(index, 'optional', e.target.checked)}
                          className="rounded text-orange-500 w-4 h-4"
                        />
                        <span className="text-xs sm:text-sm text-gray-600">Optional</span>
                      </label>
                      
                      {formData.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="p-2 sm:p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto sm:ml-0"
                          aria-label="Remove ingredient"
                        >
                          <FaTrash className="text-sm sm:text-base" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-2 mt-3 sm:mt-4 text-orange-500 hover:text-orange-600 font-medium text-sm sm:text-base"
              >
                <FaPlus className="text-xs sm:text-sm" />
                Add Another Ingredient
              </button>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Instructions *</label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Step-by-step instructions..."
                rows="4"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-vertical min-h-[120px] sm:min-h-[150px]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Recipe Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/recipe-image.jpg"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Paste a link to your recipe image (optional)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg mt-4 sm:mt-6 hover:from-orange-600 hover:to-amber-600 disabled:from-orange-300 disabled:to-amber-300 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Creating Recipe...' : 'Create Recipe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateRecipe;