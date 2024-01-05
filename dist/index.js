"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
let server;
mongoose_1.default.connect(config_1.default.mongoose.url).then(() => {
    console.info("Connected to MongoDB");
    server = app_1.default.listen(config_1.default.port, () => {
        console.info(`Listening to port ${config_1.default.port} info ${server}`);
    });
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    console.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
