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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreSignedUrl = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_2 = require("@aws-sdk/client-s3");
const customErrors_1 = require("./customErrors");
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});
const getPreSignedUrl = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
    };
    try {
        const command = new client_s3_2.GetObjectCommand(params);
        const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, {
            expiresIn: 36000,
        });
        return signedUrl;
    }
    catch (error) {
        throw new customErrors_1.BadRequestError("File is not available.");
    }
});
exports.getPreSignedUrl = getPreSignedUrl;
