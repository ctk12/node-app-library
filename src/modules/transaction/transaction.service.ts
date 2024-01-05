import mongoose from "mongoose";
import Transactions from "./transaction.model";
import { NewCreatedTransactions, UpdateTransactionsBody, ITransactionsDoc } from "./transaction.interfaces";
import ApiMessage from "../ApiMessage/ApiMessage";
import { ApiError } from "../errors";
import httpStatus from "http-status";
import { IOptions, QueryResult } from "../paginate/paginate";
import { IUser, roleType } from "../user/user.interfaces";

/**
 * Create a Transaction
 * @param {NewCreatedTransactions} transactionBody
 * @returns {Promise<ITransactionsDoc>}
 */
export const createTransaction = async (transactionBody: NewCreatedTransactions): Promise<ITransactionsDoc> => {
  const { user_name, book_name, due_date, transaction_type } = transactionBody;
  if (await Transactions.findOne({ user_name, book_name, due_date, transaction_type })) {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.TRANSACTION_EXITS);
  }
  return Transactions.create(transactionBody);
};

/**
 * Get Transactions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {IUser} user - check is admin
 * @returns {Promise<QueryResult>}
 */
export const queryTransactions = async (
  filter: Record<string, any>,
  options: IOptions,
  user: IUser,
): Promise<QueryResult> => {
  let transactions;
  if (user.role === roleType.ADMIN) {
    transactions = await Transactions.paginate(filter, options);
  } else {
    filter.user_name = user.user_name;
    transactions = await Transactions.paginate(filter, options);
  }
  return transactions;
};

/**
 * Get Transaction by id
 * @param {mongoose.Types.ObjectId} transactionId
 * @returns {Promise<IUserDocCustomer | null>}
 */
export const getTransactionById = async (transactionId: mongoose.Types.ObjectId): Promise<ITransactionsDoc | null> =>
  Transactions.findById(transactionId);

/**
 * Update Transaction by id
 * @param {mongoose.Types.ObjectId} transactionId
 * @param {UpdateTransactionsBody} updateBody
 * @returns {Promise<ITransactionsDoc | null>}
 */
export const updateTransactionById = async (
  transactionId: mongoose.Types.ObjectId,
  updateBody: UpdateTransactionsBody,
): Promise<ITransactionsDoc | null> => {
  const transaction = await getTransactionById(transactionId);
  if (!transaction) {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.NOT_FOUND);
  }
  Object.assign(transaction, updateBody);
  await transaction.save();
  return transaction;
};

/**
 * Delete Transaction by id
 * @param {mongoose.Types.ObjectId} transactionId
 * @returns {Promise<ITransactionsDoc | null>}
 */
export const deleteTransactionById = async (transactionId: mongoose.Types.ObjectId): Promise<ITransactionsDoc | null> => {
  const transaction = await getTransactionById(transactionId);
  if (!transaction) {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.NOT_FOUND);
  }
  await transaction.deleteOne();
  return transaction;
};
