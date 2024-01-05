"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../modules/auth");
const user_1 = require("../modules/user");
const books_1 = require("../modules/books");
const transaction_1 = require("../modules/transaction");
const router = express_1.default.Router();
const defaultIRoute = [...auth_1.authRoute, ...user_1.userRoute, ...books_1.booksRoute, ...transaction_1.transactionRoute];
defaultIRoute.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
