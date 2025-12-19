import { Router } from 'express';
import { z } from 'zod';
import {
  createPurchase,
  getUserPurchases,
  getAllPurchases,
  getPurchaseStats,
} from '../controllers/purchaseController';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

// Validation schemas
const createPurchaseSchema = z.object({
  bookId: z.string().uuid('Invalid book ID'),
});

// Protected user routes
router.post('/', authenticate, validate(createPurchaseSchema), createPurchase);
router.get('/my-purchases', authenticate, getUserPurchases);

// Protected admin routes
router.get('/', authenticate, authorizeAdmin, getAllPurchases);
router.get('/stats', authenticate, authorizeAdmin, getPurchaseStats);

export default router;
