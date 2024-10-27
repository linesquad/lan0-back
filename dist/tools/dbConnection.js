"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
const connectToDb = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (retries = 2, delay = 5000) {
    const uri = config_1.default.mongoUri || "";
    const options = {
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 10000,
    };
    while (retries > 0) {
        try {
            yield (0, mongoose_1.connect)(uri, options);
            console.log("Connected to MongoDB");
            return;
        }
        catch (error) {
            retries -= 1;
            console.error(`Database connection failed. Retrying... (${retries} attempts left)`);
            if (retries === 0) {
                throw new Error("Database connection failed.");
            }
            yield new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
});
exports.connectToDb = connectToDb;
