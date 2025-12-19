import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth";
import { tenantIsolation } from "../middleware/tenantIsolation";
import { createLimiter } from "../middleware/rateLimiter";
import { validateCreateBook, validateUpdateBook } from "../validators/bookValidators";
import { createBook, deleteBook, getBook, listBooks, updateBook } from "../controllers/booksController";

export const booksRouter = Router();

// Public route - anyone can browse available books
booksRouter.get("/", listBooks);

// Protected routes - require authentication and tenant isolation
booksRouter.get("/:id", requireAuth, tenantIsolation, getBook);
booksRouter.post("/", requireAuth, tenantIsolation, requireAdmin, createLimiter, validateCreateBook, createBook);
booksRouter.patch("/:id", requireAuth, tenantIsolation, requireAdmin, validateUpdateBook, updateBook);
booksRouter.put("/:id", requireAuth, tenantIsolation, requireAdmin, validateUpdateBook, updateBook);
booksRouter.delete("/:id", requireAuth, tenantIsolation, requireAdmin, deleteBook);
