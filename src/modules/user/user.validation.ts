import Joi from "joi";
import { password, objectId } from "../validate/custom.validation";
import { NewCreatedUser } from "./user.interfaces";

const createUserBody: Record<keyof NewCreatedUser, any> = {
  user_name: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().optional().custom(password),
  role: Joi.string().required(),
  contact_number: Joi.string().required(),
};

export const createUser = {
  body: Joi.object().keys(createUserBody),
};

export const getUsers = {
  query: Joi.object().keys({
    user_name: Joi.string(),
    name: Joi.string(),
    email: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
};

export const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      user_name: Joi.string().required(),
      name: Joi.string().required(),
      contact_number: Joi.string().required(),
    })
    .min(1),
};

export const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
};
