import Joi from "joi";
import { objectId } from "../validate/custom.validation";
import { NewCreatedBooks } from "./books.interfaces";

const createBooksBody: Record<keyof NewCreatedBooks, any> = {
  name: Joi.string().required(),
  author: Joi.string().required(),
  status: Joi.string().required(),
};

export const createBooks = {
  body: Joi.object().keys(createBooksBody),
};

export const getBookAll = {
  params: Joi.object().keys({
    bookId: Joi.string().optional(),
  }),
};

export const getBook = {
  params: Joi.object().keys({
    bookId: Joi.custom(objectId),
  }),
};

export const updateBook = {
  params: Joi.object().keys({
    bookId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      author: Joi.string(),
      status: Joi.string(),
    })
    .min(1),
};

export const deleteBook = {
  params: Joi.object().keys({
    bookId: Joi.required().custom(objectId),
  }),
};
