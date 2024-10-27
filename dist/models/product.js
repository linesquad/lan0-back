"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Product = new mongoose_1.default.Schema({
    brand: { type: String },
    productType: { type: String },
    description: { type: String },
    title: { type: String },
    animalType: { type: String },
    price: { type: mongoose_1.default.Schema.Types.Decimal128 },
    breed: { type: String },
    imgUrl: { type: String, default: null },
    code: { type: String },
    catId: { type: String },
    discount: { type: Number },
    image: { type: String },
    mealDetails: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Meal",
        default: null,
    },
    accessoryDetails: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Accessory",
        default: null,
    },
    toyDetails: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Toy",
        default: null,
    },
    selfCareDetails: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "SelfCare",
        default: null,
    },
    clickCount: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },
}, { timestamps: true });
const ProductModel = mongoose_1.default.model("Product", Product);
exports.default = ProductModel;
