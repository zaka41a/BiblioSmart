import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth";
import { tenantIsolation } from "../middleware/tenantIsolation";
import { purchaseController } from "../controllers/purchaseController";

export const purchasesRouter = Router();

// Get all purchases (admin only, scoped to organization)
purchasesRouter.get("/", requireAuth, tenantIsolation, requireAdmin, purchaseController.getAllPurchases);

// Get purchases for a specific user (authenticated, scoped to organization)
purchasesRouter.get("/user/:userId", requireAuth, tenantIsolation, purchaseController.getUserPurchases);

// Create direct purchase (authenticated, scoped to organization)
purchasesRouter.post("/direct", requireAuth, tenantIsolation, purchaseController.createDirectPurchase);

// Get purchase statistics (admin only, scoped to organization)
purchasesRouter.get("/stats", requireAuth, tenantIsolation, requireAdmin, purchaseController.getPurchaseStats);
