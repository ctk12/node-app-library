import httpStatus from "http-status";
import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import ApiError from "../errors/ApiError";
import pick from "../utils/pick";
import { IOptions } from "../paginate/paginate";
import * as userService from "./user.service";
import ApiMessage from "../ApiMessage/ApiMessage";
import ApiResponse from "../ApiMessage/ApiResponse";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(ApiResponse(true, ApiMessage.Data.CREATED_SUCCESSFULLY, user));
});

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["user_name", "name", "email", "role"]);
  const options: IOptions = pick(req.query, ["sortBy", "limit", "page", "projectBy"]);
  const result = await userService.queryUsers(filter, options);
  res.send(ApiResponse(true, ApiMessage.Data.SUCCESS, result));
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userIdObj = new mongoose.Types.ObjectId(userId);
  if (userIdObj) {
    const user = await userService.getUserById(userIdObj);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.Error.NOT_FOUND);
    }
    res.send(ApiResponse(true, ApiMessage.Data.SUCCESS, user));
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.Error.MISSING_PARAMETER);
  }
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userIdObj = new mongoose.Types.ObjectId(userId);
  if (userIdObj) {
    const user = await userService.updateUserById(userIdObj, req.body);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.Error.NOT_FOUND);
    }
    res.send(ApiResponse(true, ApiMessage.Data.UPDATED_SUCCESSFULLY, user));
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.Error.MISSING_PARAMETER);
  }
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userIdObj = new mongoose.Types.ObjectId(userId);
  if (userId === req.user.id) {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.Error.NOT_ALLOWED);
  }
  if (userIdObj) {
    await userService.deleteUserById(userIdObj);
    res.status(httpStatus.NO_CONTENT).send(ApiResponse(true, ApiMessage.Data.DELETED_SUCCESSFULLY));
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, ApiMessage.Error.MISSING_PARAMETER);
  }
});

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.queryAllUsers();
  res.send(ApiResponse(true, ApiMessage.Data.SUCCESS, result));
});
