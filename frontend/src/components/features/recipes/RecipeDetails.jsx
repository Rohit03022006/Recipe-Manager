import React, { useState, useEffect } from 'react'
import { FaUtensils, FaUser, FaClock, FaHeart, FaBookmark, FaArrowLeft, FaLeaf, FaFire } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RecipeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('ingredients')

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchRecipe()
    fetchUserData()
  }, [id])

  useEffect(() => {
    if (user) {
      checkIfSaved()
    }
  }, [user, recipe])

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${url}/api/recipes/${id}`)
      setRecipe(response.data.recipe)
    } catch (error) {
      console.error('Error fetching recipe:', error)
      alert('Error loading recipe')
      navigate('/recipes')
    } finally {
      setLoading(false)
    }
  }

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const response = await axios.get(`${url}/api/users/user`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(response.data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const checkIfSaved = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token && user) {
        const response = await axios.get(`${url}/api/recipes/savedRecipes/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const savedRecipes = response.data.savedRecipes || []
        const isRecipeSaved = savedRecipes.some(saved => saved.recipe?._id === id)
        setIsSaved(isRecipeSaved)
      }
    } catch (error) {
      console.error('Error checking saved status:', error)
    }
  }

  const handleSaveRecipe = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please login to save recipes')
        navigate('/login')
        return
      }

      if (isSaved) {
        // Unsave recipe
        await axios.delete(`${url}/api/recipes/save/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setIsSaved(false)
        alert('Recipe removed from saved recipes')
      } else {
        // Save recipe
        await axios.post(`${url}/api/recipes/save/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setIsSaved(true)
        alert('Recipe saved successfully!')
      }
    } catch (error) {
      console.error('Error saving recipe:', error)
      alert('Error saving recipe')
    }
  }

  const calculateCookingTime = (instructions) => {
    if (!instructions) return 'Unknown'
    const wordCount = instructions.split(' ').length
    const estimatedMinutes = Math.ceil(wordCount / 20) * 5 
    return estimatedMinutes < 60 ? `${estimatedMinutes} mins` : `${Math.ceil(estimatedMinutes / 60)} hours`
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Recipe not found</p>
          <button 
            onClick={() => navigate('/recipes')}
            className="inline-flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <FaArrowLeft />
            Back to Recipes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-4 sm:mb-6 transition-colors px-3 py-2 rounded-lg hover:bg-orange-50 text-sm sm:text-base"
        >
          <FaArrowLeft className="text-xs sm:text-sm" />
          Back
        </button>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div className="relative">
            {recipe.image ? (
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-48 sm:h-64 lg:h-80 object-cover"
              />
            ) : (
              <div className="w-full h-48 sm:h-64 lg:h-80 bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                <FaUtensils className="text-4xl sm:text-6xl text-orange-400" />
              </div>
            )}

            <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
              <button
                onClick={handleSaveRecipe}
                className={`p-2 sm:p-3 rounded-full ${
                  isSaved 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-white/90 text-gray-600 backdrop-blur-sm'
                } hover:scale-105 transition-all duration-200 shadow-md`}
                title={isSaved ? 'Remove from saved' : 'Save recipe'}
              >
                {isSaved ? <FaBookmark className="text-sm sm:text-base" /> : <FaHeart className="text-sm sm:text-base" />}
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                {recipe.title}
              </h1>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                <div className="flex flex-col items-center text-center p-3 bg-orange-50 rounded-lg">
                  <FaUser className="text-orange-500 mb-1 text-sm sm:text-base" />
                  <span className="text-xs sm:text-sm text-gray-600">Author</span>
                  <span className="font-medium text-gray-800 text-sm sm:text-base truncate w-full">
                    {recipe.user?.username || 'Unknown'}
                  </span>
                </div>
                
                <div className="flex flex-col items-center text-center p-3 bg-orange-50 rounded-lg">
                  <FaClock className="text-orange-500 mb-1 text-sm sm:text-base" />
                  <span className="text-xs sm:text-sm text-gray-600">Time</span>
                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                    {calculateCookingTime(recipe.instructions)}
                  </span>
                </div>
                
                <div className="flex flex-col items-center text-center p-3 bg-orange-50 rounded-lg">
                  <FaUtensils className="text-orange-500 mb-1 text-sm sm:text-base" />
                  <span className="text-xs sm:text-sm text-gray-600">Ingredients</span>
                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                    {recipe.ingredients?.length || 0}
                  </span>
                </div>
              </div>

              {recipe.description && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:hidden mb-4 sm:mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`flex-1 py-3 text-center font-medium text-sm sm:text-base border-b-2 transition-colors ${
                    activeTab === 'ingredients' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-600 hover:text-orange-500'
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('instructions')}
                  className={`flex-1 py-3 text-center font-medium text-sm sm:text-base border-b-2 transition-colors ${
                    activeTab === 'instructions' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-600 hover:text-orange-500'
                  }`}
                >
                  Instructions
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className={`lg:w-2/5 ${
                activeTab === 'ingredients' || window.innerWidth >= 1024 ? 'block' : 'hidden lg:block'
              }`}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaLeaf className="text-green-500" />
                  Ingredients
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({recipe.ingredients?.length || 0})
                  </span>
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        ingredient.optional ? 'bg-yellow-400' : 'bg-orange-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <span className="text-gray-800 text-sm sm:text-base break-words">
                          {ingredient.name}
                        </span>
                        {ingredient.quantity && (
                          <span className="block text-orange-600 font-medium text-sm sm:text-base mt-1">
                            {ingredient.quantity}
                          </span>
                        )}
                      </div>
                      {ingredient.optional && (
                        <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full flex-shrink-0">
                          Optional
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className={`lg:w-3/5 ${
                activeTab === 'instructions' || window.innerWidth >= 1024 ? 'block' : 'hidden lg:block'
              }`}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaFire className="text-orange-500" />
                  Instructions
                </h2>
                <div className="prose max-w-none">
                  {recipe.instructions?.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex gap-3 sm:gap-4">
                          <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed flex-1">
                            {paragraph}
                          </p>
                        </div>
                        {index < recipe.instructions.split('\n').filter(p => p.trim()).length - 1 && (
                          <div className="ml-9 sm:ml-10 my-3 border-l-2 border-orange-200 h-4"></div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Created Date and Tags */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-xs sm:text-sm text-gray-500">
                  Created on {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                
                {/* Tags */}
                {recipe.tags && recipe.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails