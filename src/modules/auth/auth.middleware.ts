import { Request, Response, NextFunction } from "express";
import passport from "passport";
import httpStatus from "http-status";
import ApiError from "../errors/ApiError";
import { IUserDoc, roleType } from "../user/user.interfaces";
import ApiMessage from "../ApiMessage/ApiMessage";

const verifyCallback = (req: Request, resolve: any, reject: any) => async (err: Error, user: IUserDoc, info: string) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, ApiMessage.Error.UNAUTHORIZED));
  }
  req.user = user;
  const requiredRight: any = {
    books: "books",
    users: "users",
    transactions: "transactions",
  }[req.baseUrl.split("/")[2] ? req.baseUrl.split("/")[2]!.replace(/-/g, "_") : "NO"];

  const requiredRightRole: any = {
    GET: "isRead",
    POST: "isCreate",
    PATCH: "isEdit",
    DELETE: "isDelete",
  }[req.method];

  if (user?.role === roleType.USER) {
    if (requiredRight === "users") {
      const { userId } = req.params;
      if (!userId || userId !== req?.user?.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, ApiMessage.Error.FORBIDDEN));
      }
    }
    if (requiredRight === "books") {
      if (requiredRightRole !== "isRead") {
        return reject(new ApiError(httpStatus.FORBIDDEN, ApiMessage.Error.FORBIDDEN));
      }
    }
  }

  resolve();
};

const auth = () => async (req: Request, res: Response, next: NextFunction) =>
  new Promise<void>((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));

export default auth;
