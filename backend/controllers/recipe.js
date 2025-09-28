import { Recipe } from "../models/recipe.js";
import { SavedRecipe } from "../models/SavedRecipe.js";

// createRecipe
export const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, image } = req.body;
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res
        .status(400)
        .json({ message: "Ingredients must be a non-empty array" });
    }
    for (let ingredient of ingredients) {
      if (!ingredient.name || !ingredient.quantity) {
        return res.status(400).json({
          message: "Each ingredient must have name and quantity",
        });
      }
    }

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      image,
      user: req.userId
    });

    await newRecipe.save();
    res.status(201).json({
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Error creating recipe" });
  }
};

// getAllRecipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "username email");
    res.status(200).json({ recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

// getRecipeById
export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate("user", "username email");
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ recipe });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Error fetching recipe" });
  }
};

// getRecipeByUserId
export const getRecipeByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const recipes = await Recipe.find({ user: userId }).populate("user", "username email");
    res.status(200).json(recipes); 
  } catch (error) {
    console.error("Error fetching recipes by user ID:", error);
    res.status(500).json({ message: "Error fetching recipes by user ID" });
  }
};
// saveRecipeByUserId 
export const saveRecipeByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const { recipeId } = req.body;

        // Check if recipe already saved
        const existingSavedRecipe = await SavedRecipe.findOne({
            user: userId,
            recipe: recipeId,
        });
        if (existingSavedRecipe) {
            return res.status(400).json({ message: "Recipe already saved" });
        }

        const savedRecipe = new SavedRecipe({
            user: userId,
            recipe: recipeId,
        });

        await savedRecipe.save();
        res.status(201).json({ message: "Recipe saved successfully", savedRecipe });
    } catch (error) {
        console.error("Error saving recipe:", error);
        res.status(500).json({ message: "Error saving recipe" });
    }
};  

// saveRecipeById 
export const saveRecipeById = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const userId = req.userId;

        // Check if recipe already saved
        const existingSavedRecipe = await SavedRecipe.findOne({
            user: userId,
            recipe: recipeId,
        });
        if (existingSavedRecipe) {
            return res.status(400).json({ message: "Recipe already saved" });
        }

        const savedRecipe = new SavedRecipe({
            user: userId,
            recipe: recipeId,
        });
        
        await savedRecipe.save();
        res.status(201).json({ message: "Recipe saved successfully", savedRecipe });
    } catch (error) {
        console.error("Error saving recipe:", error);
        res.status(500).json({ message: "Error saving recipe" });
    }
};

// getAllSavedRecipesById
export const getAllSavedRecipesById = async (req, res) => {
  try {
    const { userId } = req.params;  
    const savedRecipes = await SavedRecipe.find({ user: userId }).populate('recipe');
    res.status(200).json({ savedRecipes });
    } catch (error) {
    console.error("Error fetching saved recipes:", error);
    res.status(500).json({ message: "Error fetching saved recipes" });
  }
};

// updateRecipe
export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions, image } = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, ingredients, instructions, image },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Error updating recipe" });
  }
};

// deleteRecipe
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Error deleting recipe" });
  }
};

// Add this new function for unsaving recipes
export const unsaveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.userId;

    const result = await SavedRecipe.findOneAndDelete({
      user: userId,
      recipe: recipeId
    });

    if (!result) {
      return res.status(404).json({ message: 'Saved recipe not found' });
    }

    res.status(200).json({ message: 'Recipe removed from saved recipes' });
  } catch (error) {
    console.error('Error unsaving recipe:', error);
    res.status(500).json({ message: 'Error removing recipe' });
  }
};