import express, { Router } from "express";
import { authRoute } from "../modules/auth";
import { userRoute } from "../modules/user";
import { booksRoute } from "../modules/books";
import { transactionRoute } from "../modules/transaction";

const router = express.Router();

export interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [...authRoute, ...userRoute, ...booksRoute, ...transactionRoute];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
