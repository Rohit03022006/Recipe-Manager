import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
      optional: { type: Boolean, default: false },
    },
  ],
  instructions: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
