import { Router } from 'express';
import {
  getUserPurchases,
  getAllPurchases,
  checkPurchase,
  createPurchase,
  deletePurchase,
  getPurchaseStats
} from '../controllers/purchasesController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// User routes
router.get('/my-purchases', getUserPurchases);
router.get('/check/:bookId', checkPurchase);
router.post('/direct', createPurchase);

// Admin routes
router.get('/all', authorizeAdmin, getAllPurchases);
router.get('/stats', authorizeAdmin, getPurchaseStats);
router.delete('/:id', deletePurchase); // Can delete own purchase or admin can delete any

export default router;
