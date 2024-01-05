import mongoose, { Model, Document } from "mongoose";
import { AccessAndRefreshTokens } from "../token/token.interfaces";
import { QueryResult } from "../paginate/paginate";

export enum roleType {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser {
  user_name: string;
  name: string;
  email: string;
  password: string;
  role: roleType;
  contact_number: string;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  isUserNameTaken(userName: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateUserBody = Partial<IUser>;

export type NewRegisteredUser = IUser;

export type NewCreatedUser = IUser;

export interface IUserWithTokens {
  user: IUserDoc;
  tokens: AccessAndRefreshTokens;
}
