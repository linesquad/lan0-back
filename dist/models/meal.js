"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Meal = new mongoose_1.default.Schema({
    age: { type: String },
    weight: { type: String },
    breed: { type: String },
    aroma: { type: String },
}, { timestamps: true });
const MealModel = mongoose_1.default.model("Meal", Meal);
exports.default = MealModel;
