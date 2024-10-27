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
const formidable_1 = __importDefault(require("formidable"));
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = (0, formidable_1.default)({
        maxFileSize: 100 * 1024 * 1024,
        multiples: false,
    });
    form.parse(req, (err, _fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error("Error parsing form:", err);
            res.writeHead(400, { "Content-type": "application/json" });
            res.end(JSON.stringify({ error: "Form parsing failed" }));
            return;
        }
        const file = files.image;
        if (!file) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "No file uploaded" }));
            return;
        }
        const fileToProcess = Array.isArray(file) ? file[0] : file;
        try {
            const fileStream = fs_1.default.createReadStream(fileToProcess.filepath);
            const fileName = `${(0, uuid_1.v4)()}-${fileToProcess.originalFilename}`;
            const upload = new lib_storage_1.Upload({
                client: s3Client,
                params: {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: fileName,
                    Body: fileStream,
                    ContentType: fileToProcess.mimetype || "application/octet-stream",
                },
            });
            const result = yield upload.done();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message: "File uploaded successfully",
                url: result.Location,
                fileName,
            }));
        }
        catch (uploadErr) {
            console.error("Error uploading to S3:", uploadErr);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "S3 upload failed", details: uploadErr }));
        }
    }));
});
