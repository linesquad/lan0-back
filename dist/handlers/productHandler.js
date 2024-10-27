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
const requestTools_1 = __importDefault(require("../tools/requestTools"));
const productService_1 = __importDefault(require("../services/productService"));
const validateIncomingData_1 = __importDefault(require("../tools/validateIncomingData"));
const customErrors_1 = require("../tools/customErrors");
const ioTools = new requestTools_1.default();
const service = new productService_1.default();
const validate = new validateIncomingData_1.default();
const productHandler = {
    GET: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.includes("?")) {
                const query = req.url.split("?")[1];
                switch (query.split("=")[0]) {
                    case "catId":
                        const catId = query.split("=")[1].split("&")[0];
                        ioTools.handleResponse(res, 200, yield service.GetProductsByCatIdService(catId, Number(query.split("&")[1].split("=")[1])));
                        break;
                    case "productId":
                        ioTools.handleResponse(res, 200, yield service.GetProductById(query.split("=")[1]));
                        break;
                    case "popular":
                        ioTools.handleResponse(res, 200, yield service.GetPopularProducts());
                        break;
                    case "discount":
                        ioTools.handleResponse(res, 200, yield service.GetDiscountProducts());
                        break;
                    case "products":
                        ioTools.handleResponse(res, 200, yield service.GetProducts(Number(query.split("&")[1].split("=")[1])));
                        break;
                    case "searchTerm":
                        ioTools.handleResponse(res, 200, yield service.GetSearchedProductService(decodeURIComponent(query.split("=")[1])));
                        break;
                    case "minPrice":
                        const minPrice = query.split("&")[0].split("=")[1];
                        const maxPrice = query.split("&")[1].split("=")[1];
                        ioTools.handleResponse(res, 200, yield service.GetPriceRangedProductsService(minPrice, maxPrice));
                        break;
                }
            }
        }
        catch (error) {
            (0, customErrors_1.errorHandler)(error, res);
        }
    }),
    POST: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = JSON.parse(body);
                const { productType } = data;
                const validateBasucData = validate.validateBasicProduct(data);
                const validateProductDetails = validate.validateProductDetails(data, productType);
                if (validateProductDetails) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(validateProductDetails, null, 2));
                }
                else if (validateBasucData) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(validateBasucData, null, 2));
                }
                else {
                    ioTools.handleResponse(res, 201, yield service.CreateProductService(data));
                }
            }
            catch (error) {
                (0, customErrors_1.errorHandler)(error, res);
            }
        }));
        req.on("error", (error) => {
            (0, customErrors_1.errorHandler)(error, res);
        });
    }),
    PUT: (req, res) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const data = JSON.parse(body);
                    ioTools.handleResponse(res, 201, yield service.UpdateProductService(data));
                }
                catch (error) {
                    (0, customErrors_1.errorHandler)(error, res);
                }
            }));
            req.on("error", (error) => {
                (0, customErrors_1.errorHandler)(error, res);
            });
        }
        catch (error) {
            (0, customErrors_1.errorHandler)(error, res);
        }
    },
    DELETE: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = ioTools.handlerQuery(req, "productId");
            ioTools.handleResponse(res, 200, yield service.DeleteProductService(query || ""));
        }
        catch (error) {
            (0, customErrors_1.errorHandler)(error, res);
        }
    }),
};
exports.default = productHandler;
