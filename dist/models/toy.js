"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Toy = new mongoose_1.default.Schema({
    size: { type: String },
    recommendedAge: { type: String },
    sound: { type: Boolean },
}, { timestamps: true });
const ToyModel = mongoose_1.default.model("Toy", Toy);
exports.default = ToyModel;
