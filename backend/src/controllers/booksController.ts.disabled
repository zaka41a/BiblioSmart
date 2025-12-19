import { Request, Response } from "express";
import { prisma } from "../prisma";
import { TenantRequest, tenantScope } from "../middleware/tenantIsolation";

export const listBooks = async (req: Request, res: Response) => {
  const { page = "1", pageSize = "12", query = "", genre = "", available = "false" } = req.query;
  const take = Number(pageSize);
  const skip = (Number(page) - 1) * take;

  const where = {
    AND: [
      query
        ? {
            OR: [
              { title: { contains: query as string, mode: "insensitive" } },
              { author: { contains: query as string, mode: "insensitive" } },
              { category: { contains: query as string, mode: "insensitive" } }
            ]
          }
        : {},
      genre ? { category: { equals: genre as string, mode: "insensitive" } } : {},
      available === "true" ? { available: true } : {}
    ]
  };

  const [items, total] = await Promise.all([
    prisma.book.findMany({ where, skip, take, orderBy: { createdAt: "desc" } }),
    prisma.book.count({ where })
  ]);

  return res.json({ items, total, page: Number(page), pageSize: take });
};

export const getBook = async (req: TenantRequest, res: Response) => {
  const { id } = req.params;

  // Scope to current organization
  const book = await prisma.book.findFirst({
    where: tenantScope(req, { id })
  });

  if (!book) {
    return res.status(404).json({ message: "Livre introuvable" });
  }
  return res.json(book);
};

export const createBook = async (req: TenantRequest, res: Response) => {
  try {
    if (!req.organizationId) {
      return res.status(403).json({ error: "No organization context" });
    }

    // Check organization limits before creating
    const bookCount = await prisma.book.count({
      where: { organizationId: req.organizationId }
    });

    // Check limits based on plan (simplified for now)
    const org = await prisma.organization.findUnique({
      where: { id: req.organizationId }
    });

    if (org && org.plan === 'TRIAL' && bookCount >= 100) {
      return res.status(403).json({
        error: "Book limit reached for your plan. Please upgrade.",
        upgrade: true
      });
    }

    if (org && org.plan === 'BASIC' && bookCount >= 1000) {
      return res.status(403).json({
        error: "Book limit reached for your plan. Please upgrade.",
        upgrade: true
      });
    }

    // Create book with organizationId
    const book = await prisma.book.create({
      data: {
        ...req.body,
        organizationId: req.organizationId
      }
    });

    return res.status(201).json(book);
  } catch (error: any) {
    console.error("Error creating book:", error);
    return res.status(500).json({ error: "Failed to create book" });
  }
};

export const updateBook = async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Check if book exists in current organization
    const existingBook = await prisma.book.findFirst({
      where: tenantScope(req, { id })
    });

    if (!existingBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Update book (Prisma will maintain organizationId)
    const book = await prisma.book.update({
      where: { id },
      data: req.body
    });

    return res.json(book);
  } catch (error: any) {
    console.error("Error updating book:", error);

    // Handle Prisma-specific errors
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.status(500).json({ error: "Failed to update book" });
  }
};

export const deleteBook = async (req: TenantRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Check if book exists in current organization
    const book = await prisma.book.findFirst({
      where: tenantScope(req, { id })
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    await prisma.book.delete({ where: { id } });
    return res.status(204).send();
  } catch (error: any) {
    console.error("Error deleting book:", error);

    // Handle Prisma-specific errors
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.status(500).json({ error: "Failed to delete book" });
  }
};
