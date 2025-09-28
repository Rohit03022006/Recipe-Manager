import React, { useState } from 'react'
import { FaUtensils, FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)

  const url = import.meta.env.VITE_API_URL;
  console.log("API URL:", url);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${url}/api/users/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      }, {
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.status === 201) {
        alert('Registration successful! Please login.')
        navigate('/login')
      }
    } catch (error) {
      console.error('Registration error:', error)
      if (error.response?.status === 400) {
        alert('User already exists with this email')
      } else {
        alert('Registration failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="bg-orange-500 rounded-full p-3 inline-block">
            <FaUtensils className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Create Account</h1>
          <p className="text-gray-600 mt-2">Join RecipeManager today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="password" 
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
                minLength="6"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:bg-orange-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register