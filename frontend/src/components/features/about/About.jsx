import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaUsers, FaHeart, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
 
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    hover: { y: -5, scale: 1.02, transition: { type: "spring", stiffness: 400 } },
  };

  const statsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100, delay: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div className="text-center mb-12" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div
            className="bg-orange-500 rounded-full p-4 inline-block mb-4"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaUtensils className="text-4xl text-white" />
          </motion.div>

          <motion.h1 className="text-4xl font-bold text-gray-800 mb-4" variants={itemVariants}>
            About RecipeManager
          </motion.h1>

          <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" variants={itemVariants}>
            Your ultimate companion for organizing, discovering, and sharing delicious recipes with food lovers worldwide.
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At RecipeManager, we believe that cooking should be enjoyable, organized, and accessible to everyone. Our platform helps home cooks and professional chefs alike to manage their recipes, discover new dishes, and share their culinary creations with a vibrant community of food enthusiasts.
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-8 mb-12" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="bg-white rounded-2xl shadow-lg p-6" variants={cardVariants} whileHover="hover">
            <motion.div className="bg-orange-100 rounded-full p-3 inline-block mb-4" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <FaUtensils className="text-2xl text-orange-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Organize Recipes</h3>
            <p className="text-gray-600">Keep all your favorite recipes in one place. Categorize, tag, and search through your collection effortlessly.</p>
          </motion.div>

          <motion.div className="bg-white rounded-2xl shadow-lg p-6" variants={cardVariants} whileHover="hover">
            <motion.div className="bg-amber-100 rounded-full p-3 inline-block mb-4" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <FaUsers className="text-2xl text-amber-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Share & Connect</h3>
            <p className="text-gray-600">Share your culinary creations with friends and discover new recipes from our growing community.</p>
          </motion.div>

          <motion.div className="bg-white rounded-2xl shadow-lg p-6" variants={cardVariants} whileHover="hover">
            <motion.div className="bg-orange-100 rounded-full p-3 inline-block mb-4" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <FaHeart className="text-2xl text-orange-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Save Favorites</h3>
            <p className="text-gray-600">Never lose a recipe again. Save your favorite dishes and access them anytime, anywhere.</p>
          </motion.div>

          <motion.div className="bg-white rounded-2xl shadow-lg p-6" variants={cardVariants} whileHover="hover">
            <motion.div className="bg-amber-100 rounded-full p-3 inline-block mb-4" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <FaRocket className="text-2xl text-amber-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Easy to Use</h3>
            <p className="text-gray-600">Simple, intuitive interface designed to make recipe management a breeze for cooks of all levels.</p>
          </motion.div>
        </motion.div>

        <motion.div className="bg-white rounded-2xl shadow-lg p-8" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h2 className="text-2xl font-bold text-gray-800 mb-6 text-center" variants={itemVariants}>
            Why Choose RecipeManager?
          </motion.h2>
          <motion.div className="grid md:grid-cols-3 gap-6 text-center" variants={containerVariants}>
            <motion.div variants={statsVariants} whileHover={{ scale: 1.1 }}>
              <div className="text-3xl font-bold text-orange-500 mb-2">10K+</div>
              <div className="text-gray-600">Recipes Shared</div>
            </motion.div>

            <motion.div variants={statsVariants} whileHover={{ scale: 1.1 }}>
              <div className="text-3xl font-bold text-amber-500 mb-2">5K+</div>
              <div className="text-gray-600">Active Users</div>
            </motion.div>

            <motion.div variants={statsVariants} whileHover={{ scale: 1.1 }}>
              <div className="text-3xl font-bold text-orange-500 mb-2">100+</div>
              <div className="text-gray-600">Categories</div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
