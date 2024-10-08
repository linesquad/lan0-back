import mongoose from "mongoose";
import { MealDocs } from "../dto/meal";

const Meal = new mongoose.Schema(
  {
    age: { type: String },
    weight: { type: String },
    breed: { type: String },
    aroma: { type: String },
  },
  { timestamps: true }
);

const MealModel = mongoose.model<MealDocs>("Meal", Meal);

export default MealModel;
