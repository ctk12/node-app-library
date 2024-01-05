import express, { Router } from "express";
import { validate } from "../../modules/validate";
import { booksController, booksValidation } from "../../modules/books";
import { IRoute } from "../../routes";
import auth from "../../modules/auth/auth.middleware";

const router: Router = express.Router();
const router1: Router = express.Router();
const router2: Router = express.Router();

router
  .route("/")
  .post(auth(), validate(booksValidation.createBooks), booksController.createBook)
  .get(auth(), booksController.getBooks);

router
  .route("/:bookId")
  .get(auth(), validate(booksValidation.getBook), booksController.getBook)
  .patch(auth(), validate(booksValidation.updateBook), booksController.updateBook)
  .delete(auth(), validate(booksValidation.deleteBook), booksController.deleteBook);

router1.route("/").get(auth(), booksController.getAllBooks);

router2.route("/").get(auth(), booksController.getMyBooks);

const routeArray: IRoute[] = [
  {
    path: "/books",
    route: router,
  },
  {
    path: "/all-books",
    route: router1,
  },
  {
    path: "/my-books",
    route: router2,
  },
];

export default routeArray;
