"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
exports.default = (req, res) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return true;
    }
    return false;
};
