import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  category: z.string().min(1).max(100),
  isbn: z.string().optional().or(z.literal('')),
  coverUrl: z.string().url().optional().or(z.literal('')),
  description: z.string().max(5000).optional().or(z.literal('')),
  pdfUrl: z.string().url().optional().or(z.literal('')),
  price: z.number().min(0).max(10000).optional(),
  year: z.number().int().min(1000).max(new Date().getFullYear() + 1).optional(),
  totalPages: z.number().int().min(1).max(100000).optional(),
  available: z.boolean().optional().default(true),
  tags: z.array(z.string()).max(20).optional().default([])
});

export const updateBookSchema = createBookSchema.partial();

export const validateCreateBook = (req: any, res: any, next: any) => {
  try {
    const validated = createBookSchema.parse(req.body);
    req.body = validated;
    next();
  } catch (error: any) {
    return res.status(400).json({ error: 'Validation failed', details: error.errors });
  }
};

export const validateUpdateBook = (req: any, res: any, next: any) => {
  try {
    const validated = updateBookSchema.parse(req.body);
    req.body = validated;
    next();
  } catch (error: any) {
    return res.status(400).json({ error: 'Validation failed', details: error.errors });
  }
};
