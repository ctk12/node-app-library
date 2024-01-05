import express, { Router } from "express";
import { validate } from "../../modules/validate";
import { authController, authValidation } from "../../modules/auth";
import { IRoute } from "../../routes";

const router: Router = express.Router();

router.post("/register", validate(authValidation.register), authController.register);
router.post("/login", validate(authValidation.login), authController.login);
router.post("/logout", validate(authValidation.logout), authController.logout);
router.post("/refresh-tokens", validate(authValidation.refreshTokens), authController.refreshTokens);
router.post("/forgot-password", validate(authValidation.forgotPassword), authController.forgotPassword);
router.post("/reset-password", validate(authValidation.resetPassword), authController.resetPassword);

const routeArray: IRoute[] = [
  {
    path: "/auth",
    route: router,
  },
];

export default routeArray;
