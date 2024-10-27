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
const orderRepo_1 = __importDefault(require("../repositories/orderRepo"));
const productRepo_1 = __importDefault(require("../repositories/productRepo"));
const customErrors_1 = require("../tools/customErrors");
class OrderService {
    constructor() {
        this.repository = new orderRepo_1.default();
        this.productRepo = new productRepo_1.default();
    }
    LoginService(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = "Lano2024";
                const password = "Lano123456";
                if (username === input.username && password === input.password) {
                    return true;
                }
                return false;
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    PlaceOrderService(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shoppingInfo = yield this.repository.GetShopping();
                if (!shoppingInfo)
                    throw new customErrors_1.APiError("Something went wrong.");
                yield this.productRepo.IncrementClickByOne(productId, "orderCount");
                return shoppingInfo[0];
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
}
exports.default = OrderService;
