import Joi from "joi";
import { password } from "../validate/custom.validation";
import { NewRegisteredUser } from "../user/user.interfaces";

const registerBody: Record<keyof NewRegisteredUser, any> = {
  user_name: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  role: Joi.string().required(),
  contact_number: Joi.string().required(),
};

export const register = {
  body: Joi.object().keys(registerBody),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

export const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};
