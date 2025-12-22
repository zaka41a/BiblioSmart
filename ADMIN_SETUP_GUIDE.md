# BiblioSmart Admin Setup Guide

This guide will help you configure the BiblioSmart platform for production use, including email notifications and payment processing.

## Table of Contents

1. [EmailJS Configuration](#emailjs-configuration)
2. [Stripe Payment Configuration](#stripe-payment-configuration)
3. [General System Settings](#general-system-settings)
4. [Testing Your Configuration](#testing-your-configuration)

---

## EmailJS Configuration

EmailJS enables the password reset functionality by sending reset links via email.

### Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. **Save your Service ID** (e.g., `service_abc123`)

### Step 3: Create an Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: Password Reset Request for BiblioSmart

Hi {{to_name}},

We received a request to reset your password for your BiblioSmart account.

Click the link below to reset your password:
{{reset_link}}

This link will expire in 1 hour for security reasons.

If you didn't request a password reset, please ignore this email.

Best regards,
{{from_name}}
BiblioSmart Team
```

4. **Save your Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcXYZ123`)
3. Keep this safe - you'll need it for the admin settings

### Step 5: Configure in BiblioSmart

1. Log in to BiblioSmart as **admin** (`admin@BiblioSmart.com` / `qwertz@@`)
2. Go to **Admin Dashboard** → **System Settings**
3. Click on the **Email Configuration** tab
4. Enter your EmailJS credentials:
   - **Service ID**: Your EmailJS service ID
   - **Template ID**: Your password reset template ID
   - **Public Key**: Your EmailJS public key
   - **From Name**: "BiblioSmart" (or your library name)
   - **From Email**: The email address you connected to EmailJS
5. Click **Save Email Settings**

### Testing Email Configuration

1. Log out of your admin account
2. Go to the login page and click **Forgot password?**
3. Enter a valid user email address
4. Check if the email arrives in the inbox
5. Click the reset link and verify it works

---

## Stripe Payment Configuration

Stripe handles all payment processing for paid books.

### Step 1: Create a Stripe Account

1. Go to [Stripe.com](https://stripe.com/)
2. Click **Sign Up** and create an account
3. Complete the business verification process (required for live payments)

### Step 2: Get Your API Keys

1. Log in to your Stripe Dashboard
2. Go to **Developers** → **API keys**
3. You'll see two types of keys:

   **Test Mode Keys** (for development):
   - Publishable key: `pk_test_...`
   - Secret key: `sk_test_...`

   **Live Mode Keys** (for production):
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`

4. **Keep your secret keys safe** - never share them publicly!

### Step 3: Configure Webhook (Optional for Future Enhancement)

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Save the **Webhook Secret** (starts with `whsec_`)

### Step 4: Configure in BiblioSmart

1. Log in to BiblioSmart as **admin**
2. Go to **Admin Dashboard** → **System Settings**
3. Click on the **Payment Configuration** tab
4. Enter your Stripe credentials:
   - **Publishable Key**: Your Stripe publishable key (`pk_test_...` or `pk_live_...`)
   - **Secret Key**: Your Stripe secret key (`sk_test_...` or `sk_live_...`)
   - **Webhook Secret**: Your webhook signing secret (optional)
   - **Currency**: USD (or your preferred currency)
   - **Enable Stripe Payments**: Toggle ON
5. Click **Save Payment Settings**

### Important Notes

- **Test Mode**: Use test keys during development. Stripe provides test card numbers:
  - Success: `4242 4242 4242 4242`
  - Decline: `4000 0000 0000 0002`
  - Any future expiry date and any 3-digit CVC

- **Live Mode**: Switch to live keys only when you're ready to accept real payments
- **PCI Compliance**: Stripe handles all card data - you never touch sensitive information
- **Fees**: Stripe charges 2.9% + $0.30 per successful transaction

### Current Implementation Status

**✅ Implemented:**
- Stripe SDK integration
- Payment settings configuration
- Purchase flow with Stripe detection
- Fallback to direct purchase if Stripe not configured

**⚠️ Requires Backend Implementation:**
The current frontend is ready for Stripe, but for production you need to:

1. **Create a backend API** to handle Stripe checkout sessions
2. **Implement webhook handler** to receive payment confirmations
3. **Update the purchase flow** to use the backend API

**Example Backend Setup (Node.js/Express):**

```javascript
// Create checkout session endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  const { bookId, price, userId } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: bookTitle,
          description: bookDescription,
        },
        unit_amount: price * 100, // Stripe uses cents
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/catalogue`,
    metadata: { bookId, userId }
  });

  res.json({ id: session.id });
});

// Webhook handler
app.post('/api/stripe/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Grant user access to the book
    await grantBookAccess(session.metadata.userId, session.metadata.bookId);
  }

  res.json({ received: true });
});
```

---

## General System Settings

### Site Configuration

1. **Site Name**: Your library or platform name (e.g., "BiblioSmart")
2. **Site URL**: Your production domain (e.g., "https://bibliosmart.com")
3. **Allow Registration**: Toggle to enable/disable new user signups
4. **Require Email Verification**: Enable to require email verification (requires EmailJS)

---

## Testing Your Configuration

### Test Checklist

#### Email Configuration
- [ ] Send a test password reset email
- [ ] Verify email arrives in inbox (check spam folder)
- [ ] Click reset link and confirm it works
- [ ] Verify link expires after 1 hour

#### Payment Configuration (Test Mode)
- [ ] Enable Stripe with test keys
- [ ] Create a paid book in Book Management
- [ ] Attempt to purchase using test card `4242 4242 4242 4242`
- [ ] Verify purchase appears in user's library
- [ ] Test with declined card `4000 0000 0000 0002`
- [ ] Verify proper error handling

#### General Flow
- [ ] User can browse free books
- [ ] User can access free books without payment
- [ ] User must purchase paid books
- [ ] Purchased books appear in User Dashboard
- [ ] User can read and download owned books

---

## Default Admin Credentials

**Username:** `admin@library.com`
**Password:** `admin123`

⚠️ **IMPORTANT**: Change these credentials immediately in production!

---

## Troubleshooting

### Email Not Sending

1. **Check EmailJS Service Status**: Visit EmailJS dashboard
2. **Verify Template Variables**: Ensure template uses correct variable names
3. **Check Console Logs**: Open browser DevTools and check for errors
4. **Test Email Service**: Send a test email from EmailJS dashboard
5. **Spam Folder**: Check if emails are going to spam

### Payment Not Working

1. **Verify API Keys**: Ensure you're using the correct test/live keys
2. **Check Stripe Dashboard**: Look for errors in Stripe logs
3. **Test with Test Cards**: Use Stripe's test card numbers
4. **Console Errors**: Check browser console for Stripe initialization errors
5. **Currency Mismatch**: Ensure currency matches your Stripe account settings

### Settings Not Saving

1. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. **Check LocalStorage**: Open DevTools → Application → Local Storage
3. **Verify Admin Permissions**: Ensure you're logged in as admin
4. **Browser Compatibility**: Use a modern browser (Chrome, Firefox, Edge, Safari)

---

## Production Deployment Checklist

- [ ] Switch EmailJS to production email service
- [ ] Switch Stripe from test to live keys
- [ ] Set up backend API for Stripe checkout
- [ ] Implement Stripe webhook handler
- [ ] Change default admin credentials
- [ ] Configure SSL/HTTPS for your domain
- [ ] Set up proper error logging
- [ ] Configure email delivery monitoring
- [ ] Set up Stripe webhook monitoring
- [ ] Test complete purchase flow end-to-end
- [ ] Enable Stripe webhook signatures
- [ ] Configure backup email service (optional)

---

## Support Resources

### EmailJS
- Documentation: https://www.emailjs.com/docs/
- Support: https://www.emailjs.com/support/
- Status: https://status.emailjs.com/

### Stripe
- Documentation: https://stripe.com/docs
- Dashboard: https://dashboard.stripe.com/
- Support: https://support.stripe.com/
- Status: https://status.stripe.com/

---

## Security Best Practices

1. **Never commit API keys to Git**: Use environment variables
2. **Use webhook signatures**: Verify all webhook requests
3. **Implement rate limiting**: Prevent abuse of payment endpoints
4. **Enable 2FA**: On both EmailJS and Stripe accounts
5. **Monitor transactions**: Set up alerts for unusual activity
6. **Regular backups**: Back up user data and purchase records
7. **HTTPS only**: Never handle payments over HTTP
8. **Keep dependencies updated**: Regular security updates

---

## Need Help?

For technical support or questions about BiblioSmart configuration:

1. Check this documentation first
2. Review console logs for error messages
3. Test with the provider's test/sandbox environments
4. Consult EmailJS and Stripe documentation
5. Check for known issues in the GitHub repository

---

*Last Updated: December 2025*
*BiblioSmart Version: 1.0*
