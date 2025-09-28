import React, { useState, useEffect } from 'react';
import { FaUtensils, FaChartLine, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen flex items-center justify-center py-8 lg:py-0">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex justify-center mb-6 sm:mb-8"
            variants={iconVariants}
          >
            <div className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-3 sm:p-4 shadow-lg">
              <FaUtensils className="text-3xl sm:text-4xl text-white" />
            </div>
          </motion.div>

          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            variants={itemVariants}
          >
            Cook smarter and
            <br />
            <motion.strong 
              className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent bg-size-200 bg-pos-0 hover:bg-pos-100"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              enjoy
            </motion.strong> every moment
          </motion.h1>

          <motion.p 
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Plan meals effortlessly, reduce food waste, and keep track of every ingredient. 
            Cook smarter, eat healthier, and enjoy a stress-free kitchen.
          </motion.p>

          <motion.div 
            className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-3xl mx-auto"
            variants={containerVariants}
          >
            <motion.div 
              className="flex flex-col items-center text-center p-4"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="rounded-full bg-orange-100 p-3 mb-3">
                <FaUtensils className="text-xl sm:text-2xl text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg sm:text-xl">Organize Recipes</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-2">Keep all your favorite meals in one place.</p>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center text-center p-4"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="rounded-full bg-amber-100 p-3 mb-3">
                <FaChartLine className="text-xl sm:text-2xl text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg sm:text-xl">Meal Planning</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-2">Plan weekly menus and save precious time.</p>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center text-center p-4"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="rounded-full bg-orange-100 p-3 mb-3">
                <FaUsers className="text-xl sm:text-2xl text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg sm:text-xl">Share & Discover</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-2">Exchange recipes with food lovers worldwide.</p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
            variants={itemVariants}
          >
            <motion.a
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 sm:px-8 sm:py-4 font-medium text-white shadow-lg transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-xl text-base sm:text-lg"
              href={isLoggedIn ? "/profile" : "/register"}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUtensils className="mr-2 text-lg sm:text-xl" />
              {isLoggedIn ? "Go to Profile" : "Start Cooking Now"}
            </motion.a>

            <motion.a
              className="inline-flex items-center justify-center rounded-lg border border-orange-200 bg-white px-6 py-3 sm:px-8 sm:py-4 font-medium text-orange-700 shadow-sm transition-all hover:bg-orange-50 hover:border-orange-300 text-base sm:text-lg"
              href={isLoggedIn ? "/create-recipe" : "/about"}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoggedIn ? "Create Recipe" : "Learn More"}
            </motion.a>
          </motion.div>

          <motion.div 
            className="mt-8 sm:mt-12 flex justify-center gap-6 sm:gap-8 text-center"
            variants={containerVariants}
          >
            <motion.div
              variants={statsVariants}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2"
            >
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">10K+</div>
              <div className="text-sm sm:text-base text-gray-600">Recipes</div>
            </motion.div>
            <motion.div
              variants={statsVariants}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2"
            >
              <div className="text-2xl sm:text-3xl font-bold text-amber-600">5K+</div>
              <div className="text-sm sm:text-base text-gray-600">Happy Cooks</div>
            </motion.div>
            <motion.div
              variants={statsVariants}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2"
            >
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">100+</div>
              <div className="text-sm sm:text-base text-gray-600">Categories</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;