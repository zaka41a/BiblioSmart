import { Router } from "express";
import { getProfile, getRecommendations } from "../controllers/usersController";
import { requireAuth } from "../middleware/auth";

export const usersRouter = Router();

usersRouter.get("/:id", requireAuth, getProfile);
usersRouter.get("/:id/recommendations", requireAuth, getRecommendations);
