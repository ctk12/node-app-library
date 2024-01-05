import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { tokenService } from "../token";
import { userService } from "../user";
import * as authService from "./auth.service";
import ApiResponse from "../ApiMessage/ApiResponse";
import ApiMessage from "../ApiMessage/ApiMessage";

export const register = catchAsync(async (req: Request, res: Response) => {
  try {
    const user = await userService.registerUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send(ApiResponse(true, ApiMessage.Data.SUCCESS, { user, tokens }));
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).send(ApiResponse(false, error.message));
  }
});

export const login = catchAsync(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.SUCCESS, { user, tokens }));
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).send(ApiResponse(false, error.message));
  }
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  try {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.LOGOUT_SUCCESS));
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).send(ApiResponse(false, error.message));
  }
});

export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  try {
    const userWithTokens = await authService.refreshAuth(req.body.refreshToken);
    res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.SUCCESS, userWithTokens));
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).send(ApiResponse(false, error.message));
  }
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  try {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    res
      .status(httpStatus.OK)
      .send(ApiResponse(true, ApiMessage.Data.SUCCESS, { email: req.body.email, resetToken: resetPasswordToken }));
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).send(ApiResponse(false, error.message));
  }
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  try {
    await authService.resetPassword(String(req.query["token"]), req.body.password);
    res.status(httpStatus.OK).send(ApiResponse(true, ApiMessage.Data.PASSWORD_RESET_SUCCESS));
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).send(ApiResponse(false, error.message));
  }
});
