import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

/**
 * Authentication middleware
 * Verifies JWT token from cookies or Authorization header
 */
export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Authentification requise"
    });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Jeton invalide ou expiré"
    });
  }
};

/**
 * Admin authorization middleware
 * Must be used after authenticate middleware
 */
export const authorizeAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      error: "Accès administrateur requis"
    });
  }
  return next();
};

// Export aliases for backward compatibility
export const requireAuth = authenticate;
export const requireAdmin = authorizeAdmin;
