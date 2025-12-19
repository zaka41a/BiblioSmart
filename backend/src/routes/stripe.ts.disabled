import { Router, Request, Response } from "express";
import Stripe from "stripe";
import { requireAuth } from "../middleware/auth";
import { tenantIsolation } from "../middleware/tenantIsolation";
import { stripeService, stripe, prisma } from "../services/stripeService";

export const stripeRouter = Router();

/**
 * Create subscription checkout session
 * POST /api/stripe/create-subscription-checkout
 */
stripeRouter.post("/create-subscription-checkout", requireAuth, tenantIsolation, async (req: any, res: Response) => {
  try {
    const { plan, successUrl, cancelUrl } = req.body;

    if (!plan || !successUrl || !cancelUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!req.organizationId) {
      return res.status(403).json({ error: "No organization context" });
    }

    const session = await stripeService.createCheckoutSession({
      organizationId: req.organizationId,
      plan,
      successUrl,
      cancelUrl
    });

    res.json(session);
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message || "Failed to create checkout session" });
  }
});

/**
 * Create billing portal session
 * POST /api/stripe/create-portal-session
 */
stripeRouter.post("/create-portal-session", requireAuth, tenantIsolation, async (req: any, res: Response) => {
  try {
    const { returnUrl } = req.body;

    if (!returnUrl) {
      return res.status(400).json({ error: "Return URL is required" });
    }

    if (!req.organizationId) {
      return res.status(403).json({ error: "No organization context" });
    }

    const session = await stripeService.createPortalSession({
      organizationId: req.organizationId,
      returnUrl
    });

    res.json(session);
  } catch (error: any) {
    console.error("Error creating portal session:", error);
    res.status(500).json({ error: error.message || "Failed to create portal session" });
  }
});

/**
 * Get subscription status
 * GET /api/stripe/subscription-status
 */
stripeRouter.get("/subscription-status", requireAuth, tenantIsolation, async (req: any, res: Response) => {
  try {
    if (!req.organizationId) {
      return res.status(403).json({ error: "No organization context" });
    }

    const subscription = await prisma.subscription.findFirst({
      where: { organizationId: req.organizationId }
    });

    if (!subscription) {
      return res.json({ hasSubscription: false });
    }

    res.json({
      hasSubscription: true,
      plan: subscription.plan,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd
    });
  } catch (error: any) {
    console.error("Error getting subscription status:", error);
    res.status(500).json({ error: "Failed to get subscription status" });
  }
});

/**
 * Cancel subscription
 * POST /api/stripe/cancel-subscription
 */
stripeRouter.post("/cancel-subscription", requireAuth, tenantIsolation, async (req: any, res: Response) => {
  try {
    if (!req.organizationId) {
      return res.status(403).json({ error: "No organization context" });
    }

    await stripeService.cancelSubscription(req.organizationId);
    res.json({ success: true });
  } catch (error: any) {
    console.error("Error cancelling subscription:", error);
    res.status(500).json({ error: error.message || "Failed to cancel subscription" });
  }
});

/**
 * Reactivate subscription
 * POST /api/stripe/reactivate-subscription
 */
stripeRouter.post("/reactivate-subscription", requireAuth, tenantIsolation, async (req: any, res: Response) => {
  try {
    if (!req.organizationId) {
      return res.status(403).json({ error: "No organization context" });
    }

    await stripeService.reactivateSubscription(req.organizationId);
    res.json({ success: true });
  } catch (error: any) {
    console.error("Error reactivating subscription:", error);
    res.status(500).json({ error: error.message || "Failed to reactivate subscription" });
  }
});

/**
 * Stripe webhook endpoint (must be BEFORE json middleware in server.ts)
 * POST /api/stripe/webhook
 */
stripeRouter.post("/webhook", async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  if (!webhookSecret) {
    console.warn("⚠️  Stripe webhook secret not configured");
    return res.status(400).json({ error: "Webhook secret not configured" });
  }

  if (!stripe) {
    return res.status(503).json({ error: "Stripe not configured" });
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle the event
  try {
    await stripeService.handleWebhook(event);
    res.json({ received: true });
  } catch (error: any) {
    console.error("Error handling webhook:", error);
    res.status(500).json({ error: "Webhook handler failed" });
  }
});
