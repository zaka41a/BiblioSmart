import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserRole
} from '../controllers/usersController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = Router();

// All routes require authentication and admin privileges
router.use(authenticate);
router.use(authorizeAdmin);

// GET all users
router.get('/', getAllUsers);

// GET single user by ID
router.get('/:id', getUserById);

// PUT update user
router.put('/:id', updateUser);

// DELETE user
router.delete('/:id', deleteUser);

// POST toggle user role
router.post('/:id/toggle-role', toggleUserRole);

export default router;
