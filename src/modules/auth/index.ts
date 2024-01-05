import * as authController from "./auth.controller";
import * as authService from "./auth.service";
import * as authValidation from "./auth.validation";
import jwtStrategy from "./passport";
import authRoute from "./auth.route";

export { authController, authService, authValidation, jwtStrategy, authRoute };
