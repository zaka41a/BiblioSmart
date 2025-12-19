import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { AuthenticatedRequest } from "../middleware/auth";

/**
 * Get all users (Admin only)
 */
export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.json({
      success: true,
      data: { users }
    });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des utilisateurs"
    });
  }
};

/**
 * Get a single user by ID (Admin only)
 */
export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Utilisateur introuvable"
      });
    }

    return res.json({
      success: true,
      data: { user }
    });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération de l'utilisateur"
    });
  }
};

/**
 * Update user (Admin only)
 */
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        error: "Utilisateur introuvable"
      });
    }

    // Check if email is already taken by another user
    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({ where: { email } });
      if (emailExists) {
        return res.status(409).json({
          success: false,
          error: "Cet email est déjà utilisé"
        });
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role && (role === 'USER' || role === 'ADMIN')) updateData.role = role;
    if (password && password.length >= 8) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return res.json({
      success: true,
      data: { user: updatedUser },
      message: "Utilisateur mis à jour avec succès"
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la mise à jour de l'utilisateur"
    });
  }
};

/**
 * Delete user (Admin only)
 */
export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user?.id;

    // Prevent self-deletion
    if (id === currentUserId) {
      return res.status(400).json({
        success: false,
        error: "Vous ne pouvez pas supprimer votre propre compte"
      });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Utilisateur introuvable"
      });
    }

    // Delete user
    await prisma.user.delete({ where: { id } });

    return res.json({
      success: true,
      message: "Utilisateur supprimé avec succès"
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la suppression de l'utilisateur"
    });
  }
};

/**
 * Toggle user role (Admin only)
 */
export const toggleUserRole = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user?.id;

    // Prevent changing own role
    if (id === currentUserId) {
      return res.status(400).json({
        success: false,
        error: "Vous ne pouvez pas modifier votre propre rôle"
      });
    }

    // Get current user
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Utilisateur introuvable"
      });
    }

    // Toggle role
    const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role: newRole },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return res.json({
      success: true,
      data: { user: updatedUser },
      message: `Rôle changé en ${newRole}`
    });
  } catch (error: any) {
    console.error("Error toggling user role:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur lors du changement de rôle"
    });
  }
};
