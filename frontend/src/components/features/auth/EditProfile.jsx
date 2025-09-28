import React, { useState, useEffect } from 'react'
import { FaUser, FaEdit, FaSave, FaTimes, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa'

const EditProfile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    bio: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      const url = import.meta.env.VITE_API_URL;
      
      const response = await fetch(`${url}/api/users/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const userData = await response.json()
        setUserData({
          username: userData.username || '',
          email: userData.email || '',
          bio: userData.bio || ''
        })
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      alert('Error loading profile data')
    }
  }

  const handleSave = async () => {
    if (!userData.username.trim()) {
      alert('Username is required')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const url = import.meta.env.VITE_API_URL;
      
      const response = await fetch(`${url}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: userData.username,
          bio: userData.bio
        })
      })

      if (response.ok) {
        const result = await response.json()
        alert('Profile updated successfully!')
        setIsEditing(false)
      } else {
        const error = await response.json()
        alert(error.message || 'Error updating profile')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword) {
      alert('Current password is required')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters long')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const url = import.meta.env.VITE_API_URL;
      
      const response = await fetch(`${url}/api/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      if (response.ok) {
        alert('Password changed successfully!')
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        const error = await response.json()
        alert(error.message || 'Error changing password')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error changing password')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    fetchUserData()
    setIsEditing(false)
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <a 
            href="/profile" 
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <FaArrowLeft className="text-xs sm:text-sm" />
            Back to Profile
          </a>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Edit Profile</h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Update your personal information
              </p>
            </div>
            
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 justify-center sm:justify-start">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-green-500 text-white px-3 sm:px-4 py-2.5 rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-colors text-sm sm:text-base font-medium"
                  >
                    <FaSave className="text-xs sm:text-sm" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-gray-500 text-white px-3 sm:px-4 py-2.5 rounded-lg hover:bg-gray-600 disabled:bg-gray-300 transition-colors text-sm sm:text-base font-medium"
                  >
                    <FaTimes className="text-xs sm:text-sm" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-2 bg-orange-500 text-white px-3 sm:px-4 py-2.5 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base font-medium w-full xs:w-auto"
                >
                  <FaEdit className="text-xs sm:text-sm" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <form className="space-y-4 sm:space-y-6">
            {/* Avatar Section */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl font-bold">
                  {userData.username ? userData.username.substring(0, 2).toUpperCase() : 'US'}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                Username
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <input
                  type="text"
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                  maxLength={50}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>This will be displayed to other users</span>
                <span>{userData.username.length}/50</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <input
                  type="email"
                  value={userData.email}
                  disabled={true}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Email cannot be changed. Contact support if you need to update your email.
              </p>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                Bio
              </label>
              <textarea
                value={userData.bio}
                onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                disabled={!isEditing}
                rows="3"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical transition-colors"
                placeholder="Tell us about yourself, your cooking style, favorite cuisines..."
                maxLength={200}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Optional - Share something about yourself</span>
                <span>{userData.bio.length}/200</span>
              </div>
            </div>

            {isEditing && (
              <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  Change Password
                </h3>
                <div className="space-y-3 sm:space-y-4 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                      Current Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                      <input
                        type="password"
                        placeholder="Enter current password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                      New Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                      <input
                        type="password"
                        placeholder="Enter new password (min. 6 characters)"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                      <input
                        type="password"
                        placeholder="Confirm your new password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePasswordChange}
                    disabled={loading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors text-sm sm:text-base font-medium"
                  >
                    <FaLock className="text-xs sm:text-sm" />
                    {loading ? 'Changing Password...' : 'Change Password'}
                  </button>
                </div>
              </div>
            )}
          </form>
          <div className="mt-6 sm:mt-8 text-center hidden sm:block">
            <a 
              href="/profile" 
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium text-sm sm:text-base transition-colors"
            >
              <FaArrowLeft className="text-xs sm:text-sm" />
              Back to Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile