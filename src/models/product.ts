import mongoose from "mongoose";
import { ProductDocs } from "../dto/product";

const Product = new mongoose.Schema(
  {
    brand: { type: String },
    productType: { type: String },
    description: { type: String },
    title: { type: String },
    animalType: { type: String },
    price: { type: mongoose.Schema.Types.Decimal128 },
    catId: { type: String },
    discount: { type: Number },
    image: { type: String },
    mealDetails: {
      type: mongoose.Schema.ObjectId,
      ref: "Meal",
      default: null,
    },
    accessoryDetails: {
      type: mongoose.Schema.ObjectId,
      ref: "Accessory",
      default: null,
    },
    toyDetails: {
      type: mongoose.Schema.ObjectId,
      ref: "Toy",
      default: null,
    },
    selfCareDetails: {
      type: mongoose.Schema.ObjectId,
      ref: "SelfCare",
      default: null,
    },
    clickCount: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocs>("Product", Product);

export default ProductModel;
