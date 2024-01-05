import express, { Router } from "express";
import { validate } from "../../modules/validate";
import { userController, userValidation } from "../../modules/user";
import { IRoute } from "../../routes";
import auth from "../../modules/auth/auth.middleware";

const router: Router = express.Router();
const router1: Router = express.Router();

router
  .route("/")
  .post(auth(), validate(userValidation.createUser), userController.createUser)
  .get(auth(), userController.getUsers);

router
  .route("/:userId")
  .get(auth(), validate(userValidation.getUser), userController.getUser)
  .patch(auth(), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth(), validate(userValidation.deleteUser), userController.deleteUser);

router1.route("/").get(auth(), userController.getAllUsers);

const routeArray: IRoute[] = [
  {
    path: "/users",
    route: router,
  },
  {
    path: "/all-users",
    route: router1,
  },
];

export default routeArray;
