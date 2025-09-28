import React, { useState, useEffect } from "react";
import { FaUtensils, FaBars, FaTimes, FaPlus } from "react-icons/fa";
import Avatar from "react-avatar";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      await fetchUserData();
    }
    setLoading(false);
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = import.meta.env.VITE_API_URL;

      const response = await fetch(`${url}/api/users/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setIsMobileMenuOpen(false);
    window.location.href = "/";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <header className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <FaUtensils className="text-2xl text-orange-500" />
            <span className="text-xl font-bold text-gray-800">
              RecipeManager
            </span>
          </a>
          <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-br from-orange-50 to-amber-50 shadow-md">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <FaUtensils className="text-2xl sm:text-3xl text-orange-500" />
            <span className="text-xl sm:text-2xl font-bold text-gray-800">
              RecipeManager
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {isLoggedIn ? (
              <>
                <a
                  href="/create-recipe"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium"
                >
                  <FaPlus className="text-sm" />
                  Create Recipe
                </a>

                <div className="flex items-center gap-4">
                  <a
                    href="/profile"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <Avatar
                      name={user?.username || "User"}
                      size="40"
                      round={true}
                      color="#f97316"
                      className="border-2 border-orange-200"
                    />
                    <span className="text-gray-700 font-medium">
                      {user?.username || "User"}
                    </span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-500 transition-colors text-sm font-medium"
                    title="Logout"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-4">
                <a
                  href="/login"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-orange-500 transition-colors font-medium text-sm sm:text-base"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm sm:text-base"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>

          <button
            className="md:hidden text-2xl text-gray-700 hover:text-orange-500 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto p-4 space-y-4">
            {isLoggedIn ? (
              <>
                <a
                  href="/create-recipe"
                  className="flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaPlus
                    className="text-sm border-2 border-orange-200 bg-orange-100 rounded-full p-2"
                    color="#f97316"
                    size="32"
                  />
                  Create Recipe
                </a>

                <a
                  href="/profile"
                  className="flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Avatar
                    name={user?.username || "User"}
                    size="32"
                    round={true}
                    color="#f97316"
                    className="border-2 border-orange-200"
                  />
                  <span>Profile</span>
                </a>

                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:text-red-700 transition-colors font-medium py-2 border-t border-gray-200 pt-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-3">
                <a
                  href="/login"
                  className="block w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 hover:text-orange-500 transition-colors font-medium text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="block w-full bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
