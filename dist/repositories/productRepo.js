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
const mongoose_1 = __importDefault(require("mongoose"));
const accesory_1 = __importDefault(require("../models/accesory"));
const meal_1 = __importDefault(require("../models/meal"));
const product_1 = __importDefault(require("../models/product"));
const selfCare_1 = __importDefault(require("../models/selfCare"));
const toy_1 = __importDefault(require("../models/toy"));
class ProductRepository {
    CreateProduct(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mealDetails, accessoryDetails, toyDetails, selfCareDetails } = input;
            let productData = null;
            if (mealDetails) {
                const meal = yield meal_1.default.create(mealDetails);
                if (!meal)
                    throw new Error("Meal creation failed.");
                productData = Object.assign(Object.assign({}, input), { mealDetails: meal._id });
            }
            else if (accessoryDetails) {
                const accessory = yield accesory_1.default.create(accessoryDetails);
                if (!accessory)
                    throw new Error("Accessory creation failed.");
                productData = Object.assign(Object.assign({}, input), { accessoryDetails: accessory._id });
            }
            else if (toyDetails) {
                const toy = yield toy_1.default.create(toyDetails);
                if (!toy)
                    throw new Error("Toy creation failed.");
                productData = Object.assign(Object.assign({}, input), { toyDetails: toy._id });
            }
            else if (selfCareDetails) {
                const selfCare = yield selfCare_1.default.create(selfCareDetails);
                if (!selfCare)
                    throw new Error("Self-care creation failed.");
                productData = Object.assign(Object.assign({}, input), { selfCareDetails: selfCare._id });
            }
            else {
                throw new Error("No product details provided.");
            }
            // Create the final product using the productData
            const entireProduct = yield product_1.default.create(productData);
            if (!entireProduct)
                throw new Error("Product creation failed.");
            return entireProduct;
        });
    }
    GetProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_1.default.findById(productId)
                .populate({
                path: "mealDetails",
                model: "Meal",
            })
                .populate({
                path: "accessoryDetails",
                model: "Accessory",
            })
                .populate({
                path: "toyDetails",
                model: "Toy",
            })
                .populate({
                path: "selfCareDetails",
                model: "SelfCare",
            })
                .lean();
        });
    }
    GetProducts() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 16) {
            const skip = (page - 1) * limit;
            const products = yield product_1.default.find()
                .skip(skip)
                .limit(limit)
                .populate({
                path: "mealDetails",
                model: "Meal",
            })
                .populate({
                path: "accessoryDetails",
                model: "Accessory",
            })
                .populate({
                path: "toyDetails",
                model: "Toy",
            })
                .populate({
                path: "selfCareDetails",
                model: "SelfCare",
            })
                .lean();
            const lenBtns = Math.ceil((yield product_1.default.countDocuments()) / limit);
            return {
                products,
                page,
                lenBtns: lenBtns >= 1 ? lenBtns : null,
            };
        });
    }
    GetProductsBasedOnCatId(catId_1, page_1) {
        return __awaiter(this, arguments, void 0, function* (catId, page, limit = 16) {
            const skip = (page - 1) * limit;
            const products = yield product_1.default.find({ catId })
                .skip(skip)
                .limit(limit)
                .populate({
                path: "mealDetails",
                model: "Meal",
            })
                .populate({
                path: "accessoryDetails",
                model: "Accessory",
            })
                .populate({
                path: "toyDetails",
                model: "Toy",
            })
                .populate({
                path: "selfCareDetails",
                model: "SelfCare",
            })
                .lean();
            const lenBtns = Math.ceil((yield product_1.default.countDocuments({ catId })) / limit);
            return {
                products,
                page,
                lenBtns: lenBtns >= 1 ? lenBtns : null,
            };
        });
    }
    IncrementClickByOne(productId, target) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetField = target === "clickCount" ? "clickCount" : "orderCount";
            return yield product_1.default.findByIdAndUpdate(productId, { $inc: { [targetField]: 1 } }, { new: true });
        });
    }
    UpdateProduct(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_1.default.findByIdAndUpdate(input._id, input, {
                new: true,
            });
        });
    }
    DeleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_1.default.findByIdAndDelete(productId);
        });
    }
    AddShoppingId(shoppingId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.default.findById(productId);
            if (!product)
                throw new Error();
            product.shippingDatails = shoppingId;
            return yield product.save();
        });
    }
    GetPopularProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.default.aggregate([
                {
                    $addFields: {
                        score: {
                            $add: [
                                { $multiply: ["$clickCount", 0.3] },
                                { $multiply: ["$orderCount", 0.7] },
                            ],
                        },
                    },
                },
                { $sort: { score: -1 } },
                { $limit: 10 },
            ]);
            const populatedProducts = yield product_1.default.populate(products, [
                { path: "mealDetails", model: "Meal" },
                { path: "accessoryDetails", model: "Accessory" },
                { path: "toyDetails", model: "Toy" },
                { path: "selfCareDetails", model: "SelfCare" },
            ]);
            return populatedProducts;
        });
    }
    GetDiscountProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_1.default.find({ discount: { $gt: 0 } })
                .populate({
                path: "mealDetails",
                model: "Meal",
            })
                .populate({
                path: "accessoryDetails",
                model: "Accessory",
            })
                .populate({
                path: "toyDetails",
                model: "Toy",
            })
                .populate({
                path: "selfCareDetails",
                model: "SelfCare",
            })
                .lean();
        });
    }
    GetSearchedProduct(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_1.default.find({
                title: { $regex: searchTerm, $options: "i" },
            })
                .select("_id image title price discount")
                .lean();
        });
    }
    GetPriceRangedProducts(minPrice, maxPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            const minPriceDecimal = mongoose_1.default.Types.Decimal128.fromString(minPrice.toString());
            const maxPriceDecimal = mongoose_1.default.Types.Decimal128.fromString(maxPrice.toString());
            return yield product_1.default.find({
                price: { $gte: minPriceDecimal, $lte: maxPriceDecimal },
            })
                .select("_id image title price brand discount productType animalType")
                .lean();
        });
    }
}
exports.default = ProductRepository;
