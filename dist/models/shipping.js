"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Shipping = new mongoose_1.default.Schema({
    productId: { type: String },
    phone: { type: String },
    deliveryTime: {
        workingHrs: { type: String },
        weekendHrs: { type: String },
    },
}, { timestamps: true });
const ShippingModel = mongoose_1.default.model("Shipping", Shipping);
exports.default = ShippingModel;
