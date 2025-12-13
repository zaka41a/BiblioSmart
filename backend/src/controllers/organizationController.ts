import { Response } from 'express';
import { TenantRequest } from '../middleware/tenantIsolation';
import { organizationService } from '../services/organizationService';
import { Plan, OrgStatus } from '@prisma/client';

/**
 * Create a new organization
 * POST /api/organizations
 */
export const createOrganization = async (req: TenantRequest, res: Response) => {
  try {
    const { name, slug, plan, trialDays } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' });
    }

    const organization = await organizationService.create({
      name,
      slug,
      plan: plan as Plan,
      trialDays
    });

    return res.status(201).json(organization);
  } catch (error: any) {
    if (error.message.includes('déjà pris')) {
      return res.status(409).json({ error: error.message });
    }
    console.error('Error creating organization:', error);
    return res.status(500).json({ error: 'Failed to create organization' });
  }
};

/**
 * Get organization by ID
 * GET /api/organizations/:id
 */
export const getOrganization = async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;
    const organization = await organizationService.getById(id);
    return res.json(organization);
  } catch (error: any) {
    if (error.message.includes('introuvable')) {
      return res.status(404).json({ error: error.message });
    }
    console.error('Error fetching organization:', error);
    return res.status(500).json({ error: 'Failed to fetch organization' });
  }
};

/**
 * Get current user's organization
 * GET /api/organizations/current
 */
export const getCurrentOrganization = async (req: TenantRequest, res: Response) => {
  try {
    if (!req.organizationId) {
      return res.status(404).json({ error: 'No organization found' });
    }

    const organization = await organizationService.getById(req.organizationId);
    return res.json(organization);
  } catch (error: any) {
    console.error('Error fetching current organization:', error);
    return res.status(500).json({ error: 'Failed to fetch organization' });
  }
};

/**
 * Update organization
 * PATCH /api/organizations/:id
 */
export const updateOrganization = async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Verify user belongs to this organization
    if (req.organizationId !== id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const organization = await organizationService.update(id, req.body);
    return res.json(organization);
  } catch (error: any) {
    if (error.message.includes('déjà pris')) {
      return res.status(409).json({ error: error.message });
    }
    console.error('Error updating organization:', error);
    return res.status(500).json({ error: 'Failed to update organization' });
  }
};

/**
 * Delete organization
 * DELETE /api/organizations/:id
 */
export const deleteOrganization = async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Only super admin can delete (add permission check)
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }

    await organizationService.delete(id);
    return res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting organization:', error);
    return res.status(500).json({ error: 'Failed to delete organization' });
  }
};

/**
 * Get all organizations (admin only)
 * GET /api/organizations
 */
export const getAllOrganizations = async (req: TenantRequest, res: Response) => {
  try {
    const { plan, status } = req.query;

    const organizations = await organizationService.getAll({
      plan: plan as Plan,
      status: status as OrgStatus
    });

    return res.json(organizations);
  } catch (error: any) {
    console.error('Error fetching organizations:', error);
    return res.status(500).json({ error: 'Failed to fetch organizations' });
  }
};

/**
 * Get organization statistics
 * GET /api/organizations/:id/stats
 */
export const getOrganizationStats = async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Verify user belongs to this organization or is admin
    if (req.organizationId !== id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const stats = await organizationService.getStats(id);
    return res.json(stats);
  } catch (error: any) {
    console.error('Error fetching organization stats:', error);
    return res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

/**
 * Check organization limits
 * GET /api/organizations/:id/limits
 */
export const checkOrganizationLimits = async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Verify user belongs to this organization
    if (req.organizationId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const limits = await organizationService.checkLimits(id);
    return res.json(limits);
  } catch (error: any) {
    console.error('Error checking limits:', error);
    return res.status(500).json({ error: 'Failed to check limits' });
  }
};

/**
 * Add user to organization
 * POST /api/organizations/:id/users
 */
export const addUserToOrganization = async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Verify user is admin of this organization
    if (req.organizationId !== id || req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = await organizationService.addUser(id, userId);
    return res.json(user);
  } catch (error: any) {
    if (error.message.includes('limite')) {
      return res.status(403).json({ error: error.message, upgrade: true });
    }
    console.error('Error adding user to organization:', error);
    return res.status(500).json({ error: 'Failed to add user' });
  }
};

/**
 * Remove user from organization
 * DELETE /api/organizations/:id/users/:userId
 */
export const removeUserFromOrganization = async (req: TenantRequest, res: Response) => {
  try {
    const { id, userId } = req.params;

    // Verify user is admin of this organization
    if (req.organizationId !== id || req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = await organizationService.removeUser(id, userId);
    return res.json(user);
  } catch (error: any) {
    console.error('Error removing user from organization:', error);
    return res.status(500).json({ error: 'Failed to remove user' });
  }
};
