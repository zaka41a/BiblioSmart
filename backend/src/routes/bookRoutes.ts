import { Router } from 'express';
import { z } from 'zod';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookStats,
} from '../controllers/bookController';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

// Validation schemas
const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  year: z.number().int().min(1000).max(9999),
  price: z.number().min(0),
  description: z.string().optional(),
  coverUrl: z.string().url().optional(),
  pdfUrl: z.string().url().optional(),
});

const updateBookSchema = z.object({
  title: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  isbn: z.string().optional(),
  category: z.string().min(1).optional(),
  year: z.number().int().min(1000).max(9999).optional(),
  price: z.number().min(0).optional(),
  description: z.string().optional(),
  coverUrl: z.string().url().optional(),
  pdfUrl: z.string().url().optional(),
  available: z.boolean().optional(),
});

// Public routes
router.get('/', getAllBooks);
router.get('/stats', getBookStats);
router.get('/:id', getBookById);

// Protected admin routes
router.post('/', authenticate, authorizeAdmin, validate(createBookSchema), createBook);
router.put('/:id', authenticate, authorizeAdmin, validate(updateBookSchema), updateBook);
router.delete('/:id', authenticate, authorizeAdmin, deleteBook);

export default router;
