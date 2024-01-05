import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import * as booksService from "./books.service";
import ApiResponse from "../ApiMessage/ApiResponse";
import ApiMessage from "../ApiMessage/ApiMessage";
import httpStatus from "http-status";
import { ApiError } from "../errors";
import { IOptions } from "../paginate/paginate";
import pick from "../utils/pick";

export const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = await booksService.createBook(req.body);
  res.status(httpStatus.CREATED).send(ApiResponse(true, ApiMessage.Data.CREATED_SUCCESSFULLY, book));
});

export const getBooks = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "author", "status"]);
  const options: IOptions = pick(req.query, ["sortBy", "limit", "page", "projectBy"]);
  const result = await booksService.queryBooks(filter, options);
  res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.SUCCESS, result));
});

export const getBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const bookIdObj = new mongoose.Types.ObjectId(bookId);
  if (bookIdObj) {
    const book = await booksService.getBookById(bookIdObj);
    if (!book) {
      throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.NOT_FOUND);
    }
    res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.SUCCESS, book));
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.MISSING_PARAMETER);
  }
});

export const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const bookIdObj = new mongoose.Types.ObjectId(bookId);
  if (bookIdObj) {
    const book = await booksService.updateBookById(bookIdObj, req.body);
    if (!book) {
      throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.NOT_FOUND);
    }
    res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.UPDATED_SUCCESSFULLY, book));
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.MISSING_PARAMETER);
  }
});

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const bookIdObj = new mongoose.Types.ObjectId(bookId);
  if (bookIdObj) {
    await booksService.deleteBookById(bookIdObj);
    res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.DELETED_SUCCESSFULLY));
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.MISSING_PARAMETER);
  }
});

export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await booksService.queryAllBooks();
  res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.SUCCESS, result));
});

export const getMyBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await booksService.queryMyBooks(req.user);
  res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.SUCCESS, result));
});
