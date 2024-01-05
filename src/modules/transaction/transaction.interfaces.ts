import { Model, Document } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export enum TransactionType {
  borrowed = "borrowed",
  returned = "returned",
}

export interface ITransactions {
  user_name: string;
  book_name: string;
  due_date: string;
  transaction_type: TransactionType;
}

export interface ITransactionsDoc extends ITransactions, Document {}

export interface ITransactionsModel extends Model<ITransactionsDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateTransactionsBody = Partial<ITransactions>;

export type NewCreatedTransactions = ITransactions;
