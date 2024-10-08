import mongoose from "mongoose";

const Category = new mongoose.Schema(
  {
    title: { type: String, required: true },
    parentId: {
      type: mongoose.Schema.ObjectId,
      red: "Category",
      default: null,
    },
    subCategory: [{ type: mongoose.Schema.ObjectId, red: "Category" }],
    products: [{ type: mongoose.Schema.ObjectId, red: "Product" }],
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model<CategoryDocs>("Category", Category);

export default CategoryModel;
