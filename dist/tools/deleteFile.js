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
const client_s3_1 = require("@aws-sdk/client-s3");
const customErrors_1 = require("./customErrors");
const requestTools_1 = __importDefault(require("./requestTools"));
const rootHandler_1 = require("../handlers/rootHandler");
// Initialize S3 client
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});
const ioTools = new requestTools_1.default();
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "DELETE") {
        const query = ioTools.handlerQuery(req, "fileName") || "";
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: query,
        };
        try {
            const command = new client_s3_1.DeleteObjectCommand(params);
            yield s3Client.send(command);
            res.writeHead(201, { "Content-type": "application/json" });
            res.end(JSON.stringify({ message: "Successfully removed: " + query }));
        }
        catch (error) {
            (0, customErrors_1.errorHandler)(error, res);
        }
    }
    else {
        (0, rootHandler_1.notFoundHandler)(req, res);
    }
});
