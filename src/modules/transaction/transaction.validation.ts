import Joi from "joi";
import { objectId } from "../validate/custom.validation";
import { NewCreatedTransactions } from "./transaction.interfaces";

const createTransactionsBody: Record<keyof NewCreatedTransactions, any> = {
  user_name: Joi.string().required(),
  book_name: Joi.string().required(),
  due_date: Joi.string().required(),
  transaction_type: Joi.string().required(),
};

export const createTransactions = {
  body: Joi.object().keys(createTransactionsBody),
};

export const getTransactions = {
  query: Joi.object().keys({
    user_name: Joi.string(),
    book_name: Joi.string(),
    due_date: Joi.string(),
    transaction_type: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.required().custom(objectId),
  }),
};

export const updateTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      user_name: Joi.string(),
      book_name: Joi.string(),
      due_date: Joi.string(),
      transaction_type: Joi.string(),
    })
    .min(1),
};

export const deleteTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.required().custom(objectId),
  }),
};
