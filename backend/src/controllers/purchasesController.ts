import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthenticatedRequest } from "../middleware/auth";

/**
 * Get all purchases for the authenticated user
 */
export const getUserPurchases = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Non authentifié"
      });
    }

    const purchases = await prisma.purchase.findMany({
      where: { userId },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            coverUrl: true,
            price: true
          }
        }
      },
      orderBy: {
        purchaseDate: 'desc'
      }
    });

    return res.json({
      success: true,
      data: { purchases }
    });
  } catch (error: any) {
    console.error("Error fetching user purchases:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des achats"
    });
  }
};

/**
 * Get all purchases (Admin only)
 */
export const getAllPurchases = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            price: true
          }
        }
      },
      orderBy: {
        purchaseDate: 'desc'
      }
    });

    return res.json({
      success: true,
      data: { purchases }
    });
  } catch (error: any) {
    console.error("Error fetching all purchases:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des achats"
    });
  }
};

/**
 * Check if user has purchased a book
 */
export const checkPurchase = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { bookId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Non authentifié"
      });
    }

    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId
        }
      }
    });

    return res.json({
      success: true,
      data: {
        hasPurchased: !!purchase,
        purchase: purchase || null
      }
    });
  } catch (error: any) {
    console.error("Error checking purchase:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la vérification de l'achat"
    });
  }
};

/**
 * Create a new purchase (direct purchase without Stripe)
 */
export const createPurchase = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { bookId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Non authentifié"
      });
    }

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Livre introuvable"
      });
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
      return res.status(400).json({
        success: false,
        error: "Vous avez déjà acheté ce livre"
      });
    }

    // Create purchase
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        bookId,
        price: book.price || 0,
        purchaseDate: new Date()
      },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            coverUrl: true,
            price: true
          }
        }
      }
    });

    return res.status(201).json({
      success: true,
      data: { purchase },
      message: "Achat effectué avec succès"
    });
  } catch (error: any) {
    console.error("Error creating purchase:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la création de l'achat"
    });
  }
};

/**
 * Delete a purchase (Admin only or own purchase)
 */
export const deletePurchase = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Non authentifié"
      });
    }

    // Find purchase
    const purchase = await prisma.purchase.findUnique({
      where: { id }
    });

    if (!purchase) {
      return res.status(404).json({
        success: false,
        error: "Achat introuvable"
      });
    }

    // Only allow deletion if admin or own purchase
    if (userRole !== "ADMIN" && purchase.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: "Accès refusé"
      });
    }

    await prisma.purchase.delete({
      where: { id }
    });

    return res.json({
      success: true,
      message: "Achat supprimé avec succès"
    });
  } catch (error: any) {
    console.error("Error deleting purchase:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la suppression de l'achat"
    });
  }
};

/**
 * Get purchase statistics (Admin only)
 */
export const getPurchaseStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const totalPurchases = await prisma.purchase.count();

    const totalRevenue = await prisma.purchase.aggregate({
      _sum: {
        price: true
      }
    });

    const recentPurchases = await prisma.purchase.findMany({
      take: 10,
      orderBy: {
        purchaseDate: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        book: {
          select: {
            title: true,
            author: true
          }
        }
      }
    });

    return res.json({
      success: true,
      data: {
        totalPurchases,
        totalRevenue: totalRevenue._sum.price || 0,
        recentPurchases
      }
    });
  } catch (error: any) {
    console.error("Error fetching purchase stats:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des statistiques"
    });
  }
};
