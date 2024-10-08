import mongoose from "mongoose";
import { SelfCareDocs } from "../dto/selfcare";

const SelfCare = new mongoose.Schema(
  {
    age: { type: String },
    weight: { type: String },
    aroma: { type: String },
  },
  { timestamps: true }
);

const SelfCareModel = mongoose.model<SelfCareDocs>("SelfCare", SelfCare);

export default SelfCareModel;
