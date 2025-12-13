import { z } from 'zod';
import { Plan, OrgStatus } from '@prisma/client';

export const createOrganizationSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  slug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .max(50, 'Slug must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  
  plan: z.nativeEnum(Plan).optional(),
  
  trialDays: z.number()
    .int()
    .min(0)
    .max(90)
    .optional()
    .default(14)
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/).optional(),
  plan: z.nativeEnum(Plan).optional(),
  status: z.nativeEnum(OrgStatus).optional()
});

export const addUserSchema = z.object({
  userId: z.string().min(1, 'User ID is required')
});

export const validateCreateOrganization = (req: any, res: any, next: any) => {
  try {
    const validated = createOrganizationSchema.parse(req.body);
    req.body = validated;
    next();
  } catch (error: any) {
    return res.status(400).json({ error: 'Validation failed', details: error.errors });
  }
};

export const validateUpdateOrganization = (req: any, res: any, next: any) => {
  try {
    const validated = updateOrganizationSchema.parse(req.body);
    req.body = validated;
    next();
  } catch (error: any) {
    return res.status(400).json({ error: 'Validation failed', details: error.errors });
  }
};

export const validateAddUser = (req: any, res: any, next: any) => {
  try {
    const validated = addUserSchema.parse(req.body);
    req.body = validated;
    next();
  } catch (error: any) {
    return res.status(400).json({ error: 'Validation failed', details: error.errors });
  }
};
