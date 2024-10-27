"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SelfCare = new mongoose_1.default.Schema({
    age: { type: String },
    weight: { type: String },
    aroma: { type: String },
}, { timestamps: true });
const SelfCareModel = mongoose_1.default.model("SelfCare", SelfCare);
exports.default = SelfCareModel;
