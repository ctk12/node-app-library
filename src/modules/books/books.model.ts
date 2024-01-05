import mongoose from "mongoose";
import toJSON from "../toJSON/toJSON";
import { IBooksDoc, IBooksModel, statusType } from "./books.interfaces";
import { dbCollections } from "../../config/constants";
import paginate from "../paginate/paginate";

const booksSchema = new mongoose.Schema<IBooksDoc, IBooksModel>(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: statusType,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
booksSchema.plugin(toJSON);
booksSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The book's name
 * @param {ObjectId} [excludeBookId] - The id of the book to be excluded
 * @returns {Promise<boolean>}
 */
booksSchema.static("isNameTaken", async function (name: string, excludeBookId: mongoose.ObjectId): Promise<boolean> {
  const book = await this.findOne({ name, _id: { $ne: excludeBookId } });
  return !!book;
});

const Books = mongoose.model<IBooksDoc, IBooksModel>(dbCollections.books, booksSchema);

export default Books;
