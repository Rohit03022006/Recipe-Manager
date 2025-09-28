import React, { useState } from 'react'
import { FaUtensils, FaEnvelope, FaLock } from 'react-icons/fa'
import axios from 'axios'

const Login = () => {
  const url = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const email = e.target.email.value
    const password = e.target.password.value
    
    try {
      const response = await axios.post(`${url}/api/users/login`, {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        window.location.href = '/profile'
      }
    } catch (error) {
      console.error('Error logging in:', error)
      if (error.response?.status === 400) {
        alert(error.response.data.message || 'Login failed')
      } else {
        alert('Login failed. Please check your credentials.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-orange-500 rounded-full p-2 sm:p-3 inline-block">
            <FaUtensils className="text-2xl sm:text-3xl text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3 sm:mt-4">Welcome Back</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2 px-2">
            Sign in to your RecipeManager account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email"
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
              <input 
                type="password" 
                name="password"
                placeholder="Enter your password"
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2.5 sm:py-3 rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors font-medium disabled:bg-orange-300 disabled:cursor-not-allowed text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : 'Sign In'}
          </button>

          <div className="text-center pt-2 sm:pt-4">
            <p className="text-xs sm:text-sm text-gray-600">
              Don't have an account?{' '}
              <a 
                href="/register" 
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors focus:outline-none focus:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login