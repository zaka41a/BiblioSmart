import { Router } from "express";
import { login, logout, register, refreshToken, getProfile, updateProfile, changePassword, forgotPassword, resetPassword, validateResetToken } from "../controllers/authController";
import { requireAuth } from "../middleware/auth";
import { authLimiter, passwordResetLimiter } from "../middleware/rateLimiter";

export const authRouter = Router();

// Public routes with strict rate limiting
authRouter.post("/register", authLimiter, register);
authRouter.post("/login", authLimiter, login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refreshToken);

// Password reset routes (very strict rate limiting - 3 requests per hour)
authRouter.post("/forgot-password", passwordResetLimiter, forgotPassword);
authRouter.post("/reset-password", passwordResetLimiter, resetPassword);
authRouter.get("/reset-password/validate", passwordResetLimiter, validateResetToken);

// Protected routes (require authentication)
authRouter.get("/profile", requireAuth, getProfile);
authRouter.put("/profile", requireAuth, updateProfile);
authRouter.post("/change-password", requireAuth, changePassword);
