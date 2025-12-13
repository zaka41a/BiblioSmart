import Stripe from 'stripe';
import { prisma } from '../prisma';
import { Plan } from '@prisma/client';

// Initialize Stripe
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  console.warn('⚠️  Stripe is not configured. Set STRIPE_SECRET_KEY in .env file.');
}

export const stripe = stripeKey ? new Stripe(stripeKey, {
  apiVersion: '2024-11-20.acacia'
}) : null;

// Stripe Price IDs from environment
const STRIPE_PRICES = {
  BASIC: process.env.STRIPE_BASIC_PRICE_ID || '',
  PRO: process.env.STRIPE_PRO_PRICE_ID || '',
  ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID || ''
};

export class StripeService {
  /**
   * Create a checkout session for subscription
   */
  async createCheckoutSession(params: {
    organizationId: string;
    plan: 'BASIC' | 'PRO' | 'ENTERPRISE';
    successUrl: string;
    cancelUrl: string;
  }) {
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }

    const { organizationId, plan, successUrl, cancelUrl } = params;

    // Get organization
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId }
    });

    if (!organization) {
      throw new Error('Organization not found');
    }

    // Get or create Stripe customer
    let customerId = organization.subscription?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: {
          organizationId: organization.id,
          organizationName: organization.name
        }
      });
      customerId = customer.id;
    }

    // Get price ID for plan
    const priceId = STRIPE_PRICES[plan];
    if (!priceId) {
      throw new Error(`Price ID not configured for plan: ${plan}`);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        organizationId: organization.id,
        plan
      }
    });

    return {
      sessionId: session.id,
      url: session.url
    };
  }

  /**
   * Create a billing portal session
   */
  async createPortalSession(params: {
    organizationId: string;
    returnUrl: string;
  }) {
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }

    const { organizationId, returnUrl } = params;

    // Get subscription
    const subscription = await prisma.subscription.findFirst({
      where: { organizationId }
    });

    if (!subscription?.stripeCustomerId) {
      throw new Error('No Stripe customer found');
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: returnUrl
    });

    return {
      url: session.url
    };
  }

  /**
   * Handle Stripe webhook events
   */
  async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  /**
   * Handle checkout session completed
   */
  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const organizationId = session.metadata?.organizationId;
    const plan = session.metadata?.plan as Plan;

    if (!organizationId || !plan) {
      console.error('Missing metadata in checkout session');
      return;
    }

    // Get subscription
    const stripeSubscription = await stripe?.subscriptions.retrieve(
      session.subscription as string
    );

    if (!stripeSubscription) return;

    // Create or update subscription in database
    await prisma.subscription.upsert({
      where: { organizationId },
      create: {
        organizationId,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: stripeSubscription.id,
        stripePriceId: stripeSubscription.items.data[0].price.id,
        plan: plan,
        status: 'ACTIVE',
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000)
      },
      update: {
        stripeSubscriptionId: stripeSubscription.id,
        stripePriceId: stripeSubscription.items.data[0].price.id,
        plan: plan,
        status: 'ACTIVE',
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000)
      }
    });

    // Update organization plan
    await prisma.organization.update({
      where: { id: organizationId },
      data: {
        plan: plan as Plan,
        status: 'ACTIVE'
      }
    });

    console.log(`✅ Subscription created for organization ${organizationId}`);
  }

  /**
   * Handle subscription update
   */
  private async handleSubscriptionUpdate(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;

    // Find subscription by Stripe customer ID
    const dbSubscription = await prisma.subscription.findFirst({
      where: { stripeCustomerId: customerId }
    });

    if (!dbSubscription) {
      console.error(`Subscription not found for customer ${customerId}`);
      return;
    }

    // Determine status
    let status: 'ACTIVE' | 'PAST_DUE' | 'CANCELLED' | 'UNPAID' = 'ACTIVE';
    if (subscription.status === 'past_due') status = 'PAST_DUE';
    if (subscription.status === 'canceled') status = 'CANCELLED';
    if (subscription.status === 'unpaid') status = 'UNPAID';

    // Update subscription
    await prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: {
        status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end
      }
    });

    console.log(`✅ Subscription updated: ${subscription.id}`);
  }

  /**
   * Handle subscription deletion
   */
  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;

    const dbSubscription = await prisma.subscription.findFirst({
      where: { stripeCustomerId: customerId },
      include: { organization: true }
    });

    if (!dbSubscription) return;

    // Update subscription status
    await prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: { status: 'CANCELLED' }
    });

    // Downgrade organization to TRIAL
    await prisma.organization.update({
      where: { id: dbSubscription.organizationId },
      data: {
        plan: 'TRIAL',
        status: 'ACTIVE'
      }
    });

    console.log(`✅ Subscription cancelled for organization ${dbSubscription.organizationId}`);
  }

  /**
   * Handle successful payment
   */
  private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    console.log(`✅ Payment succeeded: ${invoice.id}`);
    // Could send email confirmation here
  }

  /**
   * Handle failed payment
   */
  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    const customerId = invoice.customer as string;

    const subscription = await prisma.subscription.findFirst({
      where: { stripeCustomerId: customerId }
    });

    if (subscription) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: 'PAST_DUE' }
      });
    }

    console.log(`⚠️  Payment failed: ${invoice.id}`);
    // Could send email notification here
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(organizationId: string) {
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }

    const subscription = await prisma.subscription.findFirst({
      where: { organizationId }
    });

    if (!subscription?.stripeSubscriptionId) {
      throw new Error('No active subscription found');
    }

    // Cancel at period end
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true
    });

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: true }
    });

    return { success: true };
  }

  /**
   * Reactivate subscription
   */
  async reactivateSubscription(organizationId: string) {
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }

    const subscription = await prisma.subscription.findFirst({
      where: { organizationId }
    });

    if (!subscription?.stripeSubscriptionId) {
      throw new Error('No subscription found');
    }

    // Remove cancellation
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: false
    });

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: false }
    });

    return { success: true };
  }
}

export const stripeService = new StripeService();

// Export prisma for use in routes
export { prisma } from '../prisma';
