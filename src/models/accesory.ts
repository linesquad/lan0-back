import mongoose from "mongoose";
import { AccessoryDocs } from "../dto/accessory";

const Accessory = new mongoose.Schema(
  {
    size: { type: String },
    color: { type: String },
    age: { type: String },
  },
  { timestamps: true }
);

const AccessoryModel = mongoose.model<AccessoryDocs>("Accessory", Accessory);

export default AccessoryModel;
