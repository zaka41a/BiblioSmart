import { Router } from "express";
import { requireAdmin } from "../middleware/auth";
import { createBook, deleteBook, getBook, listBooks, updateBook } from "../controllers/booksController";

export const booksRouter = Router();

booksRouter.get("/", listBooks);
booksRouter.get("/:id", getBook);
booksRouter.post("/", requireAdmin, createBook);
booksRouter.patch("/:id", requireAdmin, updateBook);
booksRouter.delete("/:id", requireAdmin, deleteBook);
