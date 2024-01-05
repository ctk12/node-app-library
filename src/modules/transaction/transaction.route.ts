import express, { Router } from "express";
import { validate } from "../../modules/validate";
import { transactionController, transactionValidation } from "../../modules/transaction";
import { IRoute } from "../../routes";
import auth from "../../modules/auth/auth.middleware";

const router: Router = express.Router();

router
  .route("/")
  .post(auth(), validate(transactionValidation.createTransactions), transactionController.createTransaction)
  .get(auth(), transactionController.getTransactions);

router
  .route("/:transactionId")
  .get(auth(), validate(transactionValidation.getTransaction), transactionController.getTransaction)
  .patch(auth(), validate(transactionValidation.updateTransaction), transactionController.updateTransaction)
  .delete(auth(), validate(transactionValidation.deleteTransaction), transactionController.deleteTransaction);

const routeArray: IRoute[] = [
  {
    path: "/transactions",
    route: router,
  },
];

export default routeArray;
