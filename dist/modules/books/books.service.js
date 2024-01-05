"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.queryBooks = exports.createBook = void 0;
const books_model_1 = __importDefault(require("./books.model"));
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const errors_1 = require("../errors");
const http_status_1 = __importDefault(require("http-status"));
/**
 * Create a book
 * @param {NewCreatedBooks} bookBody
 * @returns {Promise<IBooksDoc>}
 */
const createBook = async (bookBody) => {
    if (await books_model_1.default.isNameTaken(bookBody.name)) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NAME_TAKEN);
    }
    return books_model_1.default.create(bookBody);
};
exports.createBook = createBook;
/**
 * Get Books
 * @returns {Promise<QueryResult>}
 */
const queryBooks = async (filter, options) => {
    const books = await books_model_1.default.paginate(filter, options);
    return books;
};
exports.queryBooks = queryBooks;
/**
 * Get Book by id
 * @param {mongoose.Types.ObjectId} BookId
 * @returns {Promise<IUserDocCustomer | null>}
 */
const getBookById = async (BookId) => books_model_1.default.findById(BookId);
exports.getBookById = getBookById;
/**
 * Update Book by id
 * @param {mongoose.Types.ObjectId} BookId
 * @param {UpdateBooksBody} updateBody
 * @returns {Promise<IBooksDoc | null>}
 */
const updateBookById = async (BookId, updateBody) => {
    const book = await (0, exports.getBookById)(BookId);
    if (!book) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NOT_FOUND);
    }
    if (updateBody.name && (await books_model_1.default.isNameTaken(updateBody.name, BookId))) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NAME_TAKEN);
    }
    Object.assign(book, updateBody);
    await book.save();
    return book;
};
exports.updateBookById = updateBookById;
/**
 * Delete Book by id
 * @param {mongoose.Types.ObjectId} BookId
 * @returns {Promise<IBooksDoc | null>}
 */
const deleteBookById = async (BookId) => {
    const book = await (0, exports.getBookById)(BookId);
    if (!book) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NOT_FOUND);
    }
    await book.deleteOne();
    return book;
};
exports.deleteBookById = deleteBookById;
