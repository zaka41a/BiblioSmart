import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { optionalTenantIsolation, tenantIsolation } from '../middleware/tenantIsolation';
import { createLimiter } from '../middleware/rateLimiter';
import {
  validateCreateOrganization,
  validateUpdateOrganization,
  validateAddUser
} from '../validators/organizationValidators';
import {
  createOrganization,
  getOrganization,
  getCurrentOrganization,
  updateOrganization,
  deleteOrganization,
  getAllOrganizations,
  getOrganizationStats,
  checkOrganizationLimits,
  addUserToOrganization,
  removeUserFromOrganization
} from '../controllers/organizationController';

export const organizationsRouter = Router();

// Get all organizations (super admin only)
organizationsRouter.get('/', requireAuth, requireAdmin, getAllOrganizations);

// Get current user's organization
organizationsRouter.get('/current', requireAuth, optionalTenantIsolation, getCurrentOrganization);

// Create organization (authenticated users can create)
organizationsRouter.post('/', requireAuth, createLimiter, validateCreateOrganization, createOrganization);

// Get specific organization
organizationsRouter.get('/:id', requireAuth, getOrganization);

// Update organization
organizationsRouter.patch('/:id', requireAuth, tenantIsolation, validateUpdateOrganization, updateOrganization);

// Delete organization (super admin only)
organizationsRouter.delete('/:id', requireAuth, requireAdmin, deleteOrganization);

// Get organization statistics
organizationsRouter.get('/:id/stats', requireAuth, tenantIsolation, getOrganizationStats);

// Check organization limits
organizationsRouter.get('/:id/limits', requireAuth, tenantIsolation, checkOrganizationLimits);

// User management
organizationsRouter.post('/:id/users', requireAuth, tenantIsolation, validateAddUser, addUserToOrganization);
organizationsRouter.delete('/:id/users/:userId', requireAuth, tenantIsolation, removeUserFromOrganization);
