import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import toJSON from "../toJSON/toJSON";
import { IUserDoc, IUserModel, roleType } from "./user.interfaces";
import ApiMessage from "../ApiMessage/ApiMessage";
import { dbCollections } from "../../config/constants";
import paginate from "../paginate/paginate";

const userSchema = new mongoose.Schema<IUserDoc, IUserModel>(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error(ApiMessage.Error.INVALID_EMAIL);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(ApiMessage.Error.PASSWORD_REQUIRMENTS);
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roleType,
      default: roleType.USER,
    },
    contact_number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static("isEmailTaken", async function (email: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
});

/**
 * Check if username is taken
 * @param {string} userName - The user's username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static("isUserNameTaken", async function (userName: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
  const user = await this.findOne({
    user_name: userName,
    _id: { $ne: excludeUserId },
  });
  return !!user;
});

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.method("isPasswordMatch", async function (password: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user?.password);
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUserDoc, IUserModel>(dbCollections.users, userSchema);

export default User;
