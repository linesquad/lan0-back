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
const categoryService_1 = __importDefault(require("../services/categoryService"));
const requestTools_1 = __importDefault(require("../tools/requestTools"));
const validateIncomingData_1 = __importDefault(require("../tools/validateIncomingData"));
const customErrors_1 = require("../tools/customErrors");
const service = new categoryService_1.default();
const ioTools = new requestTools_1.default();
const validate = new validateIncomingData_1.default();
const categoryHandler = {
    GET: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.includes("?")) {
                const productId = ioTools.handlerQuery(req, "id");
                ioTools.handleResponse(res, 200, yield service.GetCategoryByIdService(productId || ""));
            }
            else {
                ioTools.handleResponse(res, 200, yield service.GetAllCategoriesService());
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
                const category = JSON.parse(body);
                const validData = validate.validateCategory(category);
                if (validData) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(validData, null, 2));
                }
                else {
                    ioTools.handleResponse(res, 201, yield service.CreateCategoryService(category));
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
    PUT: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const category = JSON.parse(body);
                ioTools.handleResponse(res, 201, yield service.UpdateCategoryService(category));
            }
            catch (error) {
                (0, customErrors_1.errorHandler)(error, res);
            }
        }));
        req.on("error", (error) => {
            (0, customErrors_1.errorHandler)(error, res);
        });
    }),
    DELETE: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = ioTools.handlerQuery(req, "id");
            ioTools.handleResponse(res, 200, yield service.DeleteCategoryService(id || ""));
        }
        catch (error) {
            (0, customErrors_1.errorHandler)(error, res);
        }
    }),
};
exports.default = categoryHandler;
