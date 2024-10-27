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
const productRepo_1 = __importDefault(require("../repositories/productRepo"));
const customErrors_1 = require("../tools/customErrors");
const getFile_1 = require("../tools/getFile");
class ProductService {
    constructor() {
        this.repository = new productRepo_1.default();
    }
    CreateProductService(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = yield this.repository.CreateProduct(input);
                if (!newProduct)
                    throw new customErrors_1.BadRequestError("Something went wrong during creating product.");
                return newProduct;
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    GetProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.repository.GetProductById(productId);
                if (!product)
                    throw new customErrors_1.NotFoundError("Product not found provided ID.");
                yield this.repository.IncrementClickByOne(productId, "clickCount");
                const preSignedUrl = yield (0, getFile_1.getPreSignedUrl)(product.image);
                return Object.assign(Object.assign({}, product), { imgUrl: preSignedUrl });
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    GetProducts(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.repository.GetProducts(page);
                if (!products || products.products.length === 0) {
                    throw new customErrors_1.NotFoundError("Products not found");
                }
                const { lenBtns } = products;
                const enhancedProducts = yield Promise.all(products.products.map((p) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const preSignedUrl = yield (0, getFile_1.getPreSignedUrl)(p.image);
                        return Object.assign(Object.assign({}, p), { imgUrl: preSignedUrl });
                    }
                    catch (error) {
                        return Object.assign(Object.assign({}, p), { imgUrl: null });
                    }
                })));
                return { products: enhancedProducts, lenBtns, page };
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    GetProductsByCatIdService(catId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.repository.GetProductsBasedOnCatId(catId, page);
                if (!products)
                    throw new customErrors_1.NotFoundError("Products not found by provided category ID.");
                const { lenBtns } = products;
                const enhancedProducts = yield Promise.all(products.products.map((p) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const preSignedUrl = yield (0, getFile_1.getPreSignedUrl)(p.image);
                        return Object.assign(Object.assign({}, p), { imgUrl: preSignedUrl });
                    }
                    catch (error) {
                        return Object.assign(Object.assign({}, p), { imgUrl: null });
                    }
                })));
                return { products: enhancedProducts, lenBtns, page };
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    UpdateProductService(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProduct = yield this.repository.UpdateProduct(input);
                if (!updatedProduct)
                    throw new customErrors_1.BadRequestError("Error while product updated process.");
                const preSignedUrl = yield (0, getFile_1.getPreSignedUrl)(updatedProduct.image);
                return Object.assign(Object.assign({}, updatedProduct), { imgUrl: preSignedUrl });
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    DeleteProductService(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removedProduct = yield this.repository.DeleteProduct(productId);
                if (!removedProduct)
                    throw new customErrors_1.NotFoundError("Product not found by provided ID");
                return true;
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    GetPopularProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.repository.GetPopularProducts();
                return yield Promise.all(products.map((p) => __awaiter(this, void 0, void 0, function* () {
                    const preSignedUrl = yield (0, getFile_1.getPreSignedUrl)(p.image);
                    return Object.assign(Object.assign({}, p), { imgUrl: preSignedUrl });
                })));
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    GetDiscountProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.repository.GetDiscountProducts();
                return yield Promise.all(products.map((p) => __awaiter(this, void 0, void 0, function* () {
                    const preSignedUrl = yield (0, getFile_1.getPreSignedUrl)(p.image);
                    return Object.assign(Object.assign({}, p), { imgUrl: preSignedUrl });
                })));
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    GetSearchedProductService(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.repository.GetSearchedProduct(searchTerm);
                return yield Promise.all(products.map((p) => __awaiter(this, void 0, void 0, function* () {
                    const preSignedUrl = yield (0, getFile_1.getPreSignedUrl)(p.image);
                    return Object.assign(Object.assign({}, p), { imgUrl: preSignedUrl });
                })));
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
    GetPriceRangedProductsService(minPrice, maxPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.repository.GetPriceRangedProducts(Number(minPrice), Number(maxPrice));
                return yield Promise.all(products.map((p) => __awaiter(this, void 0, void 0, function* () {
                    const preSignedUrl = yield (0, getFile_1.getPreSignedUrl)(p.image);
                    return Object.assign(Object.assign({}, p), { imgUrl: preSignedUrl });
                })));
            }
            catch (error) {
                (0, customErrors_1.serviceLayerError)(error);
            }
        });
    }
}
exports.default = ProductService;
