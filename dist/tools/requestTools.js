"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IOTools {
    handlerQuery(req, query) {
        const fullUrl = new URL(`http://localhost:5173${req.url}`);
        return fullUrl.searchParams.get(query) || null;
    }
    handleResponse(res, statusCode = 200, data) {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data, null, 2));
    }
}
exports.default = IOTools;
