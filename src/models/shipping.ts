import mongoose from "mongoose";

const Shipping = new mongoose.Schema(
  {
    productId: { type: String },
    phone: { type: String },
    deliveryTime: {
      workingHrs: { type: String },
      weekendHrs: { type: String },
    },
  },
  { timestamps: true }
);

const ShippingModel = mongoose.model<ShippingDetailsDocs>("Shipping", Shipping);

export default ShippingModel;
