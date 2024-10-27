"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const rootHandler_1 = require("../handlers/rootHandler");
const handleCors_1 = __importDefault(require("./handleCors"));
const server = (0, http_1.createServer)((req, res) => {
    const isOptionsHandled = (0, handleCors_1.default)(req, res);
    // If CORS handler finished the request (for OPTIONS), do nothing further
    if (isOptionsHandled) {
        return;
    }
    const fullUrl = new URL(`http://localhost:5173${req.url}`);
    const { pathname } = fullUrl;
    const handler = rootHandler_1.rootHandler[pathname];
    if (handler) {
        handler(req, res);
    }
    else {
        (0, rootHandler_1.notFoundHandler)(req, res);
    }
});
exports.default = server;
