import { Request, Response } from "express";
import { prisma } from "../prisma";
import { PaymentStatus } from "@prisma/client";

export const purchaseController = {
  // Get all purchases for a user
  getUserPurchases: async (req: Request, res: Response) => {
    const userId = req.params.userId || (req as any).user?.id;

    const purchases = await prisma.purchase.findMany({
      where: { userId },
      include: {
        book: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { purchaseDate: "desc" }
    });

    res.json(purchases);
  },

  // Get all purchases (admin only)
  getAllPurchases: async (_req: Request, res: Response) => {
    const purchases = await prisma.purchase.findMany({
      include: {
        book: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { purchaseDate: "desc" }
    });

    res.json(purchases);
  },

  // Create a direct purchase (free books or when Stripe is not configured)
  createDirectPurchase: async (req: Request, res: Response) => {
    const { userId, bookId } = req.body;

    // Check if book exists
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Check if already purchased
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId
        }
      }
    });

    if (existingPurchase) {
      return res.status(400).json({ error: "Book already purchased" });
    }

    // Create purchase
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        bookId,
        amount: book.price || 0,
        status: PaymentStatus.COMPLETED
      },
      include: {
        book: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(purchase);
  },

  // Get purchase statistics (admin only)
  getPurchaseStats: async (_req: Request, res: Response) => {
    const totalPurchases = await prisma.purchase.count();
    const totalRevenue = await prisma.purchase.aggregate({
      _sum: { amount: true },
      where: { status: PaymentStatus.COMPLETED }
    });

    const purchasesByStatus = await prisma.purchase.groupBy({
      by: ["status"],
      _count: true
    });

    res.json({
      totalPurchases,
      totalRevenue: totalRevenue._sum.amount || 0,
      byStatus: purchasesByStatus
    });
  }
};
