import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";
import multer from "multer";
import { ApiError, errorConverter, errorHandler } from "./modules/errors";
import httpStatus from "http-status";
import ApiMessage from "./modules/ApiMessage/ApiMessage";
import jwtStrategy from "./modules/auth/passport";
import passport from "passport";
import helmet from "helmet";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";
import compression from "compression";

const app: Express = express();
const addMulter = multer();

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(ExpressMongoSanitize());

// gzip compression
app.use(compression());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Routes
app.use("/api", addMulter.fields([]), routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, ApiMessage.Error.NOT_FOUND));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
