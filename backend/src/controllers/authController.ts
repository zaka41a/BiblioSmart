import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { z } from "zod";
import { emailService } from "../services/emailService";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional()
});

export const register = async (req: Request, res: Response) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Données invalides",
      errors: parsed.error.flatten()
    });
  }

  const { email, password, name = "" } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({
      success: false,
      error: "Un compte existe déjà pour cet email."
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name }
  });

  return res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  });
};

export const login = async (req: Request, res: Response) => {
  const parsed = authSchema.pick({ email: true, password: true }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Identifiants invalides"
    });
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({
      success: false,
      error: "Compte introuvable"
    });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({
      success: false,
      error: "Mot de passe incorrect"
    });
  }

  const accessToken = signAccessToken({ sub: user.id, role: user.role }, "45m");
  const refreshToken = signRefreshToken({ sub: user.id, role: user.role });

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 45
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 14
    });

  return res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      token: accessToken
    }
  });
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Déconnecté" });
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Refresh token manquant"
    });
  }

  try {
    const { verifyRefreshToken } = await import("../utils/jwt");
    const payload = verifyRefreshToken(token);

    // Generate new access token
    const newAccessToken = signAccessToken({ sub: payload.sub, role: payload.role }, "45m");

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 45
    });

    return res.json({
      success: true,
      data: { accessToken: newAccessToken }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Refresh token invalide ou expiré"
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Non authentifié"
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Erreur serveur"
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Non authentifié"
      });
    }

    const { name, email } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    return res.json({
      success: true,
      data: { user }
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Erreur lors de la mise à jour"
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Non authentifié"
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Ancien et nouveau mot de passe requis"
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Le nouveau mot de passe doit contenir au moins 8 caractères"
      });
    }

    // Get user and verify old password
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Utilisateur introuvable"
      });
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        error: "Ancien mot de passe incorrect"
      });
    }

    // Update password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    });

    return res.json({
      success: true,
      message: "Mot de passe changé avec succès"
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || "Erreur lors du changement de mot de passe"
    });
  }
};

/**
 * Forgot password - Request password reset
 * Generates reset token and returns EmailJS data for frontend to send email
 */
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email || !z.string().email().safeParse(email).success) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const resetToken = await emailService.createPasswordResetToken(email);

    // Don't reveal if email exists or not (security best practice)
    if (!resetToken) {
      return res.json({
        message: "If an account exists for this email, you will receive a password reset link.",
        emailData: null
      });
    }

    // Return EmailJS data for frontend to send
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const emailData = emailService.generatePasswordResetEmailData(email, resetToken, baseUrl);
    const serviceId = process.env.EMAILJS_SERVICE_ID ?? null;
    const templateId = process.env.EMAILJS_TEMPLATE_ID ?? null;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY ?? null;

    return res.json({
      message: "If an account exists for this email, you will receive a password reset link.",
      emailData: {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: emailData
      }
    });
  } catch (error: any) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Failed to send reset link. Please try again." });
  }
};

/**
 * Reset password - Verify token and update password
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Verify token and get user ID
    const userId = await emailService.verifyPasswordResetToken(token);

    if (!userId) {
      return res.status(400).json({
        message: "Invalid or expired token. Please request a new password reset link."
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    // Clear reset token
    await emailService.clearPasswordResetToken(userId);

    return res.json({ message: "Password reset successfully. You can now log in with your new password." });
  } catch (error: any) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ message: "Failed to reset password. Please try again." });
  }
};

/**
 * Validate password reset token without changing password
 */
export const validateResetToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        message: "Reset token is required",
        valid: false
      });
    }

    const userId = await emailService.verifyPasswordResetToken(token);

    if (!userId) {
      return res.status(400).json({
        message: "Invalid or expired token",
        valid: false
      });
    }

    return res.json({
      valid: true
    });
  } catch (error) {
    console.error("Error in validateResetToken:", error);
    return res.status(500).json({
      message: "Error validating token",
      valid: false
    });
  }
};
