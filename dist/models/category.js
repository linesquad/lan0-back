"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Category = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    parentId: {
        type: mongoose_1.default.Schema.ObjectId,
        red: "Category",
        default: null,
    },
    subCategory: [{ type: mongoose_1.default.Schema.ObjectId, red: "Category" }],
    products: [{ type: mongoose_1.default.Schema.ObjectId, red: "Product" }],
}, { timestamps: true });
const CategoryModel = mongoose_1.default.model("Category", Category);
exports.default = CategoryModel;
