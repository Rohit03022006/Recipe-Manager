import React, { useState, useEffect } from "react";
import { FaUser, FaEdit, FaUtensils, FaHeart, FaSignOutAlt, FaTrash, FaEye, FaSearch, FaSort, FaInfoCircle, FaTimes, FaBars } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("myRecipes");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deletingRecipeId, setDeletingRecipeId] = useState(null);

  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserRecipes();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await axios.get(`${url}/api/users/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
  };

  const fetchUserRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url}/api/recipes/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecipes(response.data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url}/api/recipes/savedRecipes/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const savedRecipeData = response.data.savedRecipes || [];
      const recipesData = savedRecipeData.map(item => item.recipe).filter(recipe => recipe);
      setSavedRecipes(recipesData);
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    }
  };

  const getFilteredAndSortedRecipes = () => {
    let filteredRecipes = activeTab === 'myRecipes' ? recipes : savedRecipes;
    
    if (searchTerm) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients?.some(ingredient => 
          ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    switch (sortBy) {
      case 'newest':
        filteredRecipes = [...filteredRecipes].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case 'oldest':
        filteredRecipes = [...filteredRecipes].sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case 'title-asc':
        filteredRecipes = [...filteredRecipes].sort((a, b) => 
          a.title.localeCompare(b.title)
        );
        break;
      case 'title-desc':
        filteredRecipes = [...filteredRecipes].sort((a, b) => 
          b.title.localeCompare(a.title)
        );
        break;
      case 'ingredients-asc':
        filteredRecipes = [...filteredRecipes].sort((a, b) => 
          (a.ingredients?.length || 0) - (b.ingredients?.length || 0)
        );
        break;
      case 'ingredients-desc':
        filteredRecipes = [...filteredRecipes].sort((a, b) => 
          (b.ingredients?.length || 0) - (a.ingredients?.length || 0)
        );
        break;
      default:
        break;
    }
    
    return filteredRecipes;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm(""); 
    setMobileMenuOpen(false);
    if (tab === 'savedRecipes' && user) {
      fetchSavedRecipes();
    }
  };

  const handleViewRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleEditRecipe = (recipeId) => {
    navigate(`/edit-recipe/${recipeId}`);
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return;
    }

    setDeletingRecipeId(recipeId);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${url}/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.status === 200) {
        // Remove recipe from local state immediately
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
        
        // Also remove from saved recipes if it exists there
        setSavedRecipes(prevSaved => prevSaved.filter(recipe => recipe._id !== recipeId));
        
        alert('Recipe deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      
      if (error.response?.status === 404) {
        alert('Recipe not found. It may have already been deleted.');
        // Refresh the recipes list to sync with backend
        fetchUserRecipes();
      } else if (error.response?.status === 403) {
        alert('You are not authorized to delete this recipe.');
      } else {
        alert('Error deleting recipe. Please try again.');
      }
    } finally {
      setDeletingRecipeId(null);
    }
  };

  const handleUnsaveRecipe = async (recipeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${url}/api/recipes/save/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.status === 200) {
        // Remove recipe from saved recipes immediately
        setSavedRecipes(prevSaved => prevSaved.filter(recipe => recipe._id !== recipeId));
        alert('Recipe removed from saved recipes');
      }
    } catch (error) {
      console.error('Error unsaving recipe:', error);
      
      if (error.response?.status === 404) {
        alert('Recipe not found in your saved recipes.');
        // Refresh the saved recipes list to sync with backend
        fetchSavedRecipes();
      } else {
        alert('Error removing recipe. Please try again.');
      }
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const displayRecipes = getFilteredAndSortedRecipes();
  const totalRecipes = activeTab === 'myRecipes' ? recipes.length : savedRecipes.length;
  const filteredCount = displayRecipes.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">Please login to view your profile</p>
          <a href="/login" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl font-bold">
                {user.username?.substring(0, 2).toUpperCase() || 'US'}
              </div>
              <button
                onClick={() => navigate('/edit-profile')}
                className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-orange-600 transition-colors text-xs sm:text-sm"
              >
                <FaEdit />
              </button>
            </div>

            {/* User Info */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 break-words">
                {user.username}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 break-words">{user.email}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto lg:mx-0">
                {user.bio || "Food enthusiast & home chef"}
              </p>

              {/* Stats */}
              <div className="flex gap-4 sm:gap-6 mt-3 sm:mt-4 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="font-bold text-orange-500 text-sm sm:text-base">{recipes.length}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Recipes</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-orange-500 text-sm sm:text-base">{savedRecipes.length}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Saved</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-orange-500 text-sm sm:text-base">0</div>
                  <div className="text-xs sm:text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleAboutClick}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <FaInfoCircle className="text-xs sm:text-sm" />
                <span className="hidden xs:inline">About</span>
              </button>
              <button
                onClick={() => navigate('/create-recipe')}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <FaUtensils className="text-xs sm:text-sm" />
                New Recipe
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          {/* Mobile Menu Button */}
          <div className="lg:hidden border-b">
            <button
              onClick={toggleMobileMenu}
              className="w-full flex items-center justify-between p-4 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">
                {activeTab === 'myRecipes' ? 'My Recipes' : 'Saved Recipes'}
              </span>
              <FaBars className="text-gray-400" />
            </button>
          </div>

          {/* Tabs */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:flex border-b`}>
            <button 
              onClick={() => handleTabChange('myRecipes')}
              className={`w-full lg:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 lg:py-4 border-b-2 lg:border-b-2 font-medium transition-colors ${
                activeTab === 'myRecipes' 
                  ? 'border-orange-500 text-orange-500 bg-orange-50 lg:bg-transparent' 
                  : 'border-transparent text-gray-600 hover:text-orange-500 hover:bg-gray-50 lg:hover:bg-transparent'
              }`}
            >
              <FaUtensils className="text-sm" />
              My Recipes
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                {recipes.length}
              </span>
            </button>
            <button 
              onClick={() => handleTabChange('savedRecipes')}
              className={`w-full lg:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 lg:py-4 border-b-2 lg:border-b-2 font-medium transition-colors ${
                activeTab === 'savedRecipes' 
                  ? 'border-orange-500 text-orange-500 bg-orange-50 lg:bg-transparent' 
                  : 'border-transparent text-gray-600 hover:text-orange-500 hover:bg-gray-50 lg:hover:bg-transparent'
              }`}
            >
              <FaHeart className="text-sm" />
              Saved Recipes
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                {savedRecipes.length}
              </span>
            </button>
          </div>

          {/* Search and Filter Section */}
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'myRecipes' ? 'my recipes' : 'saved recipes'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                />
              </div>
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 min-w-[200px]">
                <FaSort className="text-gray-400 hidden sm:block" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                  <option value="ingredients-asc">Fewest Ingredients</option>
                  <option value="ingredients-desc">Most Ingredients</option>
                </select>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-2 text-xs sm:text-sm text-gray-600">
              Showing {filteredCount} of {totalRecipes} recipes
              {searchTerm && ` for "${searchTerm}"`}
            </div>
          </div>

          {/* Recipes Grid */}
          <div className="p-4 sm:p-6">
            {displayRecipes.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <FaUtensils className="text-4xl sm:text-6xl text-gray-200 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-500 text-base sm:text-lg mb-2 px-4">
                  {searchTerm 
                    ? `No ${activeTab === 'myRecipes' ? 'my recipes' : 'saved recipes'} found for "${searchTerm}"`
                    : activeTab === 'myRecipes' 
                      ? "You haven't created any recipes yet." 
                      : "You haven't saved any recipes yet."
                  }
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => navigate(activeTab === 'myRecipes' ? "/create-recipe" : "/recipes")}
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mt-3 sm:mt-4 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <FaUtensils />
                    {activeTab === 'myRecipes' ? "Create your first recipe" : "Browse recipes"}
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {displayRecipes.map((recipe) => (
                  <div key={recipe._id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-300 bg-white group">
                    {/* Recipe Image */}
                    <div 
                      className="h-28 sm:h-32 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg mb-3 flex items-center justify-center cursor-pointer overflow-hidden group-hover:shadow-sm transition-shadow"
                      onClick={() => handleViewRecipe(recipe._id)}
                    >
                      {recipe.image ? (
                        <img 
                          src={recipe.image} 
                          alt={recipe.title}
                          className="h-full w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <FaUtensils className="text-3xl sm:text-4xl text-orange-400" />
                      )}
                    </div>

                    {/* Recipe Info */}
                    <div className="cursor-pointer" onClick={() => handleViewRecipe(recipe._id)}>
                      <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1 line-clamp-1 break-words">
                        {recipe.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">
                        {recipe.ingredients?.length || 0} ingredients • {recipe.difficulty || 'Easy'}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="truncate mr-2">By {recipe.user?.username || 'Unknown'}</span>
                        <span className="flex-shrink-0">{new Date(recipe.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-3 sm:mt-4 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleViewRecipe(recipe._id)}
                        className="flex items-center gap-1 text-orange-500 hover:text-orange-600 text-xs sm:text-sm font-medium transition-colors"
                      >
                        <FaEye className="text-xs sm:text-sm" />
                        View
                      </button>
                      
                      {activeTab === 'myRecipes' ? (
                        <div className="flex gap-2 sm:gap-3">
                          <button
                            onClick={() => handleEditRecipe(recipe._id)}
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-xs sm:text-sm transition-colors"
                          >
                            <FaEdit className="text-xs sm:text-sm" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRecipe(recipe._id)}
                            disabled={deletingRecipeId === recipe._id}
                            className="flex items-center gap-1 text-red-500 hover:text-red-600 disabled:text-red-300 disabled:cursor-not-allowed text-xs sm:text-sm transition-colors"
                          >
                            {deletingRecipeId === recipe._id ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-1 border-red-500 border-2 mr-1"></div>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <FaTrash className="text-xs sm:text-sm" />
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleUnsaveRecipe(recipe._id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-600 text-xs sm:text-sm font-medium transition-colors"
                        >
                          <FaHeart className="fill-current text-xs sm:text-sm" />
                          Unsave
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center mt-4 sm:mt-6">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 mx-auto px-4 sm:px-6 py-2 text-gray-600 hover:text-red-500 transition-colors duration-200 text-sm sm:text-base"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;