import mongoose from "mongoose";
import { ToyDocs } from "../dto/toy";

const Toy = new mongoose.Schema(
  {
    size: { type: String },
    recommendedAge: { type: String },
    sound: { type: Boolean },
  },
  { timestamps: true }
);

const ToyModel = mongoose.model<ToyDocs>("Toy", Toy);

export default ToyModel;
