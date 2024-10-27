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
exports.rootHandler = void 0;
exports.notFoundHandler = notFoundHandler;
const categoryHandler_1 = __importDefault(require("./categoryHandler"));
const productHandler_1 = __importDefault(require("./productHandler"));
const requestTools_1 = __importDefault(require("../tools/requestTools"));
const orderService_1 = __importDefault(require("../services/orderService"));
const validateIncomingData_1 = __importDefault(require("../tools/validateIncomingData"));
const customErrors_1 = require("../tools/customErrors");
const uploadHandler_1 = __importDefault(require("../tools/uploadHandler"));
const deleteFile_1 = __importDefault(require("../tools/deleteFile"));
const ioTools = new requestTools_1.default();
const service = new orderService_1.default();
const validate = new validateIncomingData_1.default();
const rootHandler = {
    "/health-checker": (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello, World!");
    }),
    "/category": (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { method } = req;
        const handler = categoryHandler_1.default[method || "GET"];
        if (handler) {
            handler(req, res);
        }
        else {
            notFoundHandler(req, res, "Method");
        }
    }),
    "/product": (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { method } = req;
        const handler = productHandler_1.default[method || "GET"];
        if (handler) {
            handler(req, res);
        }
        else {
            notFoundHandler(req, res, "Method");
        }
    }),
    "/login": (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = JSON.parse(body);
                const validateData = validate.validateShipping(data);
                if (validateData) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(validateData, null, 2));
                }
                else {
                    ioTools.handleResponse(res, 201, yield service.LoginService(data));
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
    "/order": (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { productId } = JSON.parse(body);
                ioTools.handleResponse(res, 201, yield service.PlaceOrderService(productId));
            }
            catch (error) {
                (0, customErrors_1.errorHandler)(error, res);
            }
        }));
        req.on("error", (error) => {
            (0, customErrors_1.errorHandler)(error, res);
        });
    }),
    "/upload": (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, uploadHandler_1.default)(req, res);
        }
        catch (error) {
            (0, customErrors_1.errorHandler)(error, res);
        }
    }),
    "/delete-file": (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, deleteFile_1.default)(req, res);
        }
        catch (error) {
            (0, customErrors_1.errorHandler)(error, res);
        }
    }),
};
exports.rootHandler = rootHandler;
function notFoundHandler(req, res, target = "Route") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `${target} Not Found` }));
}
