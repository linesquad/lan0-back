import mongoose from "mongoose";

const Product = new mongoose.Schema(
  {
    brand: { type: String },
    type: { type: String },
    description: { type: String },
    title: { type: String },
    weight: { type: String },
    animalType: { type: String },
    price: { type: String },
    age: { type: String },
    breed: { type: String },
    catId: { type: String },
    discount: { type: Number },
    image: { type: String },
    aroma: { type: String },
    shippingDatails: {
      type: mongoose.Schema.ObjectId,
      red: "Shipping",
      default: null,
    },
    clickCount: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocs>("Product", Product);

export default ProductModel;
