import { Router } from "express";
import { borrowBook, returnBook } from "../controllers/loansController";
import { requireAuth } from "../middleware/auth";

export const loansRouter = Router();

loansRouter.post("/", requireAuth, borrowBook);
loansRouter.post("/:loanId/return", requireAuth, returnBook);
