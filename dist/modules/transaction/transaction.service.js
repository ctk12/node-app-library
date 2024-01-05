"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionById = exports.updateTransactionById = exports.getTransactionById = exports.queryTransactions = exports.createTransaction = void 0;
const transaction_model_1 = __importDefault(require("./transaction.model"));
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const errors_1 = require("../errors");
const http_status_1 = __importDefault(require("http-status"));
/**
 * Create a Transaction
 * @param {NewCreatedTransactions} transactionBody
 * @returns {Promise<ITransactionsDoc>}
 */
const createTransaction = async (transactionBody) => {
    return transaction_model_1.default.create(transactionBody);
};
exports.createTransaction = createTransaction;
/**
 * Get Transactions
 * @returns {Promise<QueryResult>}
 */
const queryTransactions = async (filter, options) => {
    const transactions = await transaction_model_1.default.paginate(filter, options);
    return transactions;
};
exports.queryTransactions = queryTransactions;
/**
 * Get Transaction by id
 * @param {mongoose.Types.ObjectId} transactionId
 * @returns {Promise<IUserDocCustomer | null>}
 */
const getTransactionById = async (transactionId) => transaction_model_1.default.findById(transactionId);
exports.getTransactionById = getTransactionById;
/**
 * Update Transaction by id
 * @param {mongoose.Types.ObjectId} transactionId
 * @param {UpdateTransactionsBody} updateBody
 * @returns {Promise<ITransactionsDoc | null>}
 */
const updateTransactionById = async (transactionId, updateBody) => {
    const transaction = await (0, exports.getTransactionById)(transactionId);
    if (!transaction) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NOT_FOUND);
    }
    if (updateBody.user_details) {
        const user_details = updateBody.user_details;
        updateBody.user_name = user_details.user_name;
    }
    if (updateBody.book_details) {
        const book_details = updateBody.book_details;
        updateBody.book_name = book_details.name;
    }
    Object.assign(transaction, updateBody);
    await transaction.save();
    return transaction;
};
exports.updateTransactionById = updateTransactionById;
/**
 * Delete Transaction by id
 * @param {mongoose.Types.ObjectId} transactionId
 * @returns {Promise<ITransactionsDoc | null>}
 */
const deleteTransactionById = async (transactionId) => {
    const transaction = await (0, exports.getTransactionById)(transactionId);
    if (!transaction) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NOT_FOUND);
    }
    await transaction.deleteOne();
    return transaction;
};
exports.deleteTransactionById = deleteTransactionById;
