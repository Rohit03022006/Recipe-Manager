import React, { useState, useEffect } from 'react'
import { FaHeart, FaUtensils, FaUser, FaBookmark } from 'react-icons/fa'
import axios from 'axios'

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    if (user) {
      fetchSavedRecipes()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const response = await axios.get(`${url}/api/users/user`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
  }

  const fetchSavedRecipes = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${url}/api/recipes/savedRecipes/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const savedRecipeData = response.data.savedRecipes || []
      const recipesData = savedRecipeData.map(item => item.recipe).filter(recipe => recipe)
      setSavedRecipes(recipesData)
    } catch (error) {
      console.error('Error fetching saved recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const unsaveRecipe = async (recipeId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${url}/api/recipes/save/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      // Remove from local state
      setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeId))
      alert('Recipe removed from saved recipes')
    } catch (error) {
      console.error('Error unsaving recipe:', error)
      alert('Error removing recipe')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading saved recipes...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please login to view saved recipes</p>
          <a href="/login" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="bg-orange-500 rounded-full p-4 inline-block mb-4">
            <FaBookmark className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Saved Recipes</h1>
          <p className="text-gray-600 mt-2">Your collection of favorite recipes</p>
          <div className="mt-4 text-orange-500 font-medium">
            {savedRecipes.length} {savedRecipes.length === 1 ? 'recipe' : 'recipes'} saved
          </div>
        </div>
        {savedRecipes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No saved recipes yet</h2>
            <p className="text-gray-600 mb-6">Start exploring and save your favorite recipes!</p>
            <a 
              href="/recipes" 
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Browse Recipes
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRecipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-r from-orange-100 to-amber-100 relative">
                  {recipe.image ? (
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <FaUtensils className="text-4xl text-orange-400" />
                    </div>
                  )}
                  <button
                    onClick={() => unsaveRecipe(recipe._id)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    title="Remove from saved"
                  >
                    <FaHeart className="text-sm" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                    {recipe.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <FaUser className="text-sm mr-2" />
                    <span className="text-sm">By {recipe.user?.username || 'Unknown'}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{recipe.ingredients?.length || 0} ingredients</span>
                    <span>{recipe.instructions?.length > 100 ? 'Advanced' : 'Easy'}</span>
                  </div>

                  <div className="flex gap-2">
                    <a 
                      href={`/recipe/${recipe._id}`}
                      className="flex-1 bg-orange-500 text-white text-center py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      View Recipe
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default SavedRecipes