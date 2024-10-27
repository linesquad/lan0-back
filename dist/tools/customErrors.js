"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.NotFoundError = exports.APiError = exports.BaseError = void 0;
exports.serviceLayerError = serviceLayerError;
exports.errorHandler = errorHandler;
class BaseError extends Error {
    constructor(name, statusCode, desc) {
        super(desc);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
class APiError extends BaseError {
    constructor(desc = "Server Interval Error") {
        super("ApiError", 500, desc);
    }
}
exports.APiError = APiError;
class NotFoundError extends BaseError {
    constructor(desc = "Not Found") {
        super("Not Found", 404, desc);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends BaseError {
    constructor(desc = "Bad Request") {
        super("Bad Request", 400, desc);
    }
}
exports.BadRequestError = BadRequestError;
function serviceLayerError(err) {
    if (err instanceof NotFoundError || err instanceof BadRequestError) {
        throw err;
    }
    else {
        throw new APiError("An unexpected error occurred while fetching categories.");
    }
}
function errorHandler(err, res) {
    if (err instanceof BaseError) {
        res.writeHead(err.statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: err.message }));
    }
    else {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
}
