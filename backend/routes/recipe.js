import express from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipeByUserId,
  updateRecipe,
  deleteRecipe,
  saveRecipeById,
  getAllSavedRecipesById,
  unsaveRecipe
} from "../controllers/recipe.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/newRecipe", auth, createRecipe);
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.get("/user/:userId", getRecipeByUserId);
router.post("/save/:recipeId", auth, saveRecipeById);
router.get("/savedRecipes/:userId", auth, getAllSavedRecipesById);
router.put("/:id", auth, updateRecipe);
router.delete("/:id", auth, deleteRecipe);
router.delete("/save/:recipeId", auth, unsaveRecipe); 

export default router;