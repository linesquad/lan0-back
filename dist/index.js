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
const dbConnection_1 = require("./tools/dbConnection");
const server_1 = __importDefault(require("./tools/server"));
const config_1 = __importDefault(require("./config"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, dbConnection_1.connectToDb)();
            server_1.default.listen(config_1.default.port, () => {
                console.log(`Server is running on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.log("Failed to connect to MongoDB:", error.message);
            process.exit(1);
        }
    });
}
startServer();
