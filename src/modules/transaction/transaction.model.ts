import mongoose from "mongoose";
import toJSON from "../toJSON/toJSON";
import { ITransactionsDoc, ITransactionsModel, TransactionType } from "./transaction.interfaces";
import { dbCollections } from "../../config/constants";
import paginate from "../paginate/paginate";

const transactionsSchema = new mongoose.Schema<ITransactionsDoc, ITransactionsModel>(
  {
    user_name: {
      type: String,
      required: true,
    },
    book_name: {
      type: String,
      required: true,
    },
    due_date: {
      type: String,
      required: true,
    },
    transaction_type: {
      type: String,
      enum: TransactionType,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
transactionsSchema.plugin(toJSON);
transactionsSchema.plugin(paginate);

const Transactions = mongoose.model<ITransactionsDoc, ITransactionsModel>(dbCollections.transactions, transactionsSchema);

export default Transactions;
