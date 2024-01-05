import mongoose, { Model, Document } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export enum statusType {
  available = "available",
  unavailable = "unavailable",
}

export interface IBooks {
  name: string;
  author: string;
  status: statusType;
}

export interface IBooksDoc extends IBooks, Document {}

export interface IBooksModel extends Model<IBooksDoc> {
  isNameTaken(name: string, excludeBookId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateBooksBody = Partial<IBooks>;

export type NewCreatedBooks = IBooks;
