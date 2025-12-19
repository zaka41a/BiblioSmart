import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma';

export interface TenantRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
  organizationId?: string;
  organization?: any;
}

/**
 * Middleware to extract and validate organization context
 * Must be used after requireAuth middleware
 */
export const tenantIsolation = async (
  req: TenantRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // User must be authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Authentification requise' });
    }

    // Get user with organization
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        organization: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    // User must belong to an organization
    if (!user.organizationId) {
      return res.status(403).json({ 
        message: 'Aucune organisation associée. Veuillez créer ou rejoindre une organisation.' 
      });
    }

    // Check organization status
    if (user.organization?.status === 'SUSPENDED') {
      return res.status(403).json({ 
        message: 'Votre organisation est suspendue. Veuillez contacter le support.' 
      });
    }

    if (user.organization?.status === 'CANCELLED') {
      return res.status(403).json({ 
        message: 'Votre organisation a été annulée.' 
      });
    }

    // Attach organization context to request
    req.organizationId = user.organizationId;
    req.organization = user.organization;

    next();
  } catch (error) {
    console.error('Tenant isolation error:', error);
    return res.status(500).json({ message: 'Erreur lors de la vérification de l\'organisation' });
  }
};

/**
 * Optional middleware - allows routes to work without organization
 * Useful for setup routes where user hasn't joined org yet
 */
export const optionalTenantIsolation = async (
  req: TenantRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next();
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        organization: true
      }
    });

    if (user?.organizationId) {
      req.organizationId = user.organizationId;
      req.organization = user.organization;
    }

    next();
  } catch (error) {
    console.error('Optional tenant isolation error:', error);
    next();
  }
};

/**
 * Helper function to scope Prisma queries to current organization
 * Usage in controllers:
 * 
 * const books = await prisma.book.findMany({
 *   where: tenantScope(req, { available: true })
 * });
 */
export const tenantScope = (req: TenantRequest, where: any = {}) => {
  if (!req.organizationId) {
    throw new Error('No organization context available');
  }

  return {
    ...where,
    organizationId: req.organizationId
  };
};

/**
 * Check if user has permission for a specific organization
 */
export const checkOrganizationPermission = async (
  userId: string,
  organizationId: string
): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      organizationId
    }
  });

  return !!user;
};
