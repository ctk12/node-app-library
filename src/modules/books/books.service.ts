import mongoose from "mongoose";
import Books from "./books.model";
import { NewCreatedBooks, UpdateBooksBody, IBooksDoc, IBooks } from "./books.interfaces";
import ApiMessage from "../ApiMessage/ApiMessage";
import { ApiError } from "../errors";
import httpStatus from "http-status";
import { IOptions, QueryResult } from "../paginate/paginate";
import { IUser } from "../user/user.interfaces";
import { queryTransactions } from "../transaction/transaction.service";

/**
 * Create a book
 * @param {NewCreatedBooks} bookBody
 * @returns {Promise<IBooksDoc>}
 */
export const createBook = async (bookBody: NewCreatedBooks): Promise<IBooksDoc> => {
  if (await Books.isNameTaken(bookBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.NAME_TAKEN);
  }
  return Books.create(bookBody);
};

/**
 * Get Books
 * @returns {Promise<QueryResult>}
 */
export const queryBooks = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const books = await Books.paginate(filter, options);
  return books;
};

/**
 * Get Books
 * @param {IUser} user
 * @returns {Promise<Books[]>}
 */
export const queryMyBooks = async (user: IUser): Promise<IBooks[]> => {
  const allMyTransactions = await queryTransactions({}, {}, user);
  const myTransactions = allMyTransactions.results.map((data: any) => data.book_name);
  const books = await Books.find();
  const bookData = books.filter((data: any) => myTransactions.includes(data.name));
  return bookData;
};

/**
 * Get all Books
 * @returns {Promise<IBooks[]>}
 */
export const queryAllBooks = async (): Promise<IBooks[]> => {
  const books = await Books.find();
  return books;
};

/**
 * Get Book by id
 * @param {mongoose.Types.ObjectId} BookId
 * @returns {Promise<IUserDocCustomer | null>}
 */
export const getBookById = async (BookId: mongoose.Types.ObjectId): Promise<IBooksDoc | null> => Books.findById(BookId);

/**
 * Update Book by id
 * @param {mongoose.Types.ObjectId} BookId
 * @param {UpdateBooksBody} updateBody
 * @returns {Promise<IBooksDoc | null>}
 */
export const updateBookById = async (
  BookId: mongoose.Types.ObjectId,
  updateBody: UpdateBooksBody,
): Promise<IBooksDoc | null> => {
  const book = await getBookById(BookId);
  if (!book) {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.NOT_FOUND);
  }
  if (updateBody.name && (await Books.isNameTaken(updateBody.name, BookId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.NAME_TAKEN);
  }
  Object.assign(book, updateBody);
  await book.save();
  return book;
};

/**
 * Delete Book by id
 * @param {mongoose.Types.ObjectId} BookId
 * @returns {Promise<IBooksDoc | null>}
 */
export const deleteBookById = async (BookId: mongoose.Types.ObjectId): Promise<IBooksDoc | null> => {
  const book = await getBookById(BookId);
  if (!book) {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.NOT_FOUND);
  }
  await book.deleteOne();
  return book;
};
