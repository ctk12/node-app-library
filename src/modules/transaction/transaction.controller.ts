import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import * as TransactionsService from "./transaction.service";
import ApiResponse from "../ApiMessage/ApiResponse";
import ApiMessage from "../ApiMessage/ApiMessage";
import httpStatus from "http-status";
import { ApiError } from "../errors";
import { IOptions } from "../paginate/paginate";
import pick from "../utils/pick";

export const createTransaction = catchAsync(async (req: Request, res: Response) => {
  const transaction = await TransactionsService.createTransaction(req.body);
  res.status(httpStatus.CREATED).send(ApiResponse(true, ApiMessage.Data.CREATED_SUCCESSFULLY, transaction));
});

export const getTransactions = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["user_name", "book_name", "due_date", "transaction_type"]);
  const options: IOptions = pick(req.query, ["sortBy", "limit", "page", "projectBy"]);
  const result = await TransactionsService.queryTransactions(filter, options, req.user);
  res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.SUCCESS, result));
});

export const getTransaction = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const transactionIdObj = new mongoose.Types.ObjectId(transactionId);
  if (transactionIdObj) {
    const transaction = await TransactionsService.getTransactionById(transactionIdObj);
    if (!transaction) {
      throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.NOT_FOUND);
    }
    res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.SUCCESS, transaction));
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.MISSING_PARAMETER);
  }
});

export const updateTransaction = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const transactionIdObj = new mongoose.Types.ObjectId(transactionId);
  if (transactionIdObj) {
    const transaction = await TransactionsService.updateTransactionById(transactionIdObj, req.body);
    if (!transaction) {
      throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.NOT_FOUND);
    }
    res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.UPDATED_SUCCESSFULLY, transaction));
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.MISSING_PARAMETER);
  }
});

export const deleteTransaction = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const transactionIdObj = new mongoose.Types.ObjectId(transactionId);
  if (transactionIdObj) {
    await TransactionsService.deleteTransactionById(transactionIdObj);
    res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.DELETED_SUCCESSFULLY));
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.MISSING_PARAMETER);
  }
});
