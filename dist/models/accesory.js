"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Accessory = new mongoose_1.default.Schema({
    size: { type: String },
    color: { type: String },
    age: { type: String },
}, { timestamps: true });
const AccessoryModel = mongoose_1.default.model("Accessory", Accessory);
exports.default = AccessoryModel;
