# 💳 Guide de Configuration Stripe - BiblioSmart

**Durée estimée**: 30 minutes  
**Prérequis**: Compte Stripe (gratuit)

---

## 📋 Étape 1: Créer un Compte Stripe

1. Aller sur https://stripe.com
2. Cliquer sur "Start now" / "S'inscrire"
3. Créer un compte avec email
4. Activer le mode TEST (pour développement)

---

## 🔑 Étape 2: Obtenir les Clés API

1. Dans le Dashboard Stripe, aller dans **Developers > API keys**
2. Copier les clés suivantes:
   - **Publishable key** (commence par `pk_test_...`)
   - **Secret key** (commence par `sk_test_...`)

3. Ajouter dans `/backend/.env`:
```bash
STRIPE_SECRET_KEY=sk_test_votre_clé_secrète_ici
STRIPE_PUBLISHABLE_KEY=pk_test_votre_clé_publique_ici
```

---

## 💰 Étape 3: Créer les Produits et Prix

### Produit 1: BiblioSmart BASIC

1. Dans Stripe Dashboard, aller dans **Products > Add product**
2. Remplir:
   - Name: `BiblioSmart BASIC`
   - Description: `Plan Basic - 1000 livres, 3 utilisateurs`
   - Price: `29.00 EUR`
   - Billing period: `Monthly`
   - Type: `Recurring`

3. Copier le **Price ID** (commence par `price_...`)
4. Ajouter dans `.env`:
```bash
STRIPE_BASIC_PRICE_ID=price_votre_price_id_basic
```

### Produit 2: BiblioSmart PRO

1. Créer un nouveau produit
2. Remplir:
   - Name: `BiblioSmart PRO`
   - Description: `Plan Pro - Livres illimités, 10 utilisateurs`
   - Price: `79.00 EUR`
   - Billing period: `Monthly`
   - Type: `Recurring`

3. Copier le **Price ID**
4. Ajouter dans `.env`:
```bash
STRIPE_PRO_PRICE_ID=price_votre_price_id_pro
```

### Produit 3: BiblioSmart ENTERPRISE

1. Créer un nouveau produit
2. Remplir:
   - Name: `BiblioSmart ENTERPRISE`
   - Description: `Plan Enterprise - Tout illimité, support dédié`
   - Price: `200.00 EUR` (ou sur devis)
   - Billing period: `Monthly`
   - Type: `Recurring`

3. Copier le **Price ID**
4. Ajouter dans `.env`:
```bash
STRIPE_ENTERPRISE_PRICE_ID=price_votre_price_id_enterprise
```

---

## 🔔 Étape 4: Configurer les Webhooks

### 4.1 Installer Stripe CLI (pour tests locaux)

#### macOS:
```bash
brew install stripe/stripe-cli/stripe
```

#### Windows:
Télécharger depuis https://github.com/stripe/stripe-cli/releases

#### Linux:
```bash
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.4/stripe_1.19.4_linux_x86_64.tar.gz
tar -xvf stripe_1.19.4_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin
```

### 4.2 Configurer Webhook Local

1. **Login Stripe CLI**:
```bash
stripe login
```

2. **Forward webhooks vers localhost**:
```bash
stripe listen --forward-to localhost:5001/api/stripe/webhook
```

3. **Copier le webhook secret** affiché (commence par `whsec_...`)

4. **Ajouter dans `.env`**:
```bash
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret
```

### 4.3 Configurer Webhook en Production

1. Dans Stripe Dashboard, aller dans **Developers > Webhooks**
2. Cliquer sur **Add endpoint**
3. Remplir:
   - Endpoint URL: `https://votre-domaine.com/api/stripe/webhook`
   - Events to send:
     - ✅ `checkout.session.completed`
     - ✅ `customer.subscription.created`
     - ✅ `customer.subscription.updated`
     - ✅ `customer.subscription.deleted`
     - ✅ `invoice.payment_succeeded`
     - ✅ `invoice.payment_failed`

4. Copier le **Signing secret**
5. Ajouter dans `.env` production:
```bash
STRIPE_WEBHOOK_SECRET=whsec_votre_secret_production
```

---

## 🧪 Étape 5: Tester l'Intégration

### Test 1: Créer une Session de Checkout

```bash
curl -X POST http://localhost:5001/api/stripe/create-subscription-checkout \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=votre_token" \
  -d '{
    "plan": "BASIC",
    "successUrl": "http://localhost:5173/success",
    "cancelUrl": "http://localhost:5173/cancel"
  }'
```

**Résultat attendu**:
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

### Test 2: Carte de Test

Utiliser ces cartes de test Stripe:
```
Succès:           4242 4242 4242 4242
Échec:            4000 0000 0000 0002
3D Secure requis: 4000 0025 0000 3155

CVV:  Tout 3 chiffres
Date: N'importe quelle date future
```

### Test 3: Simuler un Webhook

```bash
# Terminal 1: Listen to webhooks
stripe listen --forward-to localhost:5001/api/stripe/webhook

# Terminal 2: Trigger test event
stripe trigger checkout.session.completed
```

**Vérifier**:
- ✅ Webhook reçu dans le terminal
- ✅ Subscription créée en DB
- ✅ Organization.plan mis à jour

---

## 🎨 Étape 6: Intégration Frontend

### Installer Stripe.js

```bash
cd frontend
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Composant Checkout

```typescript
// frontend/src/components/SubscriptionCheckout.tsx
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const SubscriptionCheckout = ({ plan }: { plan: 'BASIC' | 'PRO' | 'ENTERPRISE' }) => {
  const handleCheckout = async () => {
    const response = await fetch('/api/stripe/create-subscription-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        plan,
        successUrl: `${window.location.origin}/subscription/success`,
        cancelUrl: `${window.location.origin}/subscription/cancel`
      })
    });

    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <button onClick={handleCheckout}>
      Subscribe to {plan}
    </button>
  );
};
```

### Billing Portal

```typescript
// frontend/src/components/BillingPortal.tsx
export const BillingPortal = () => {
  const handleManage = async () => {
    const response = await fetch('/api/stripe/create-portal-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        returnUrl: window.location.href
      })
    });

    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <button onClick={handleManage}>
      Manage Subscription
    </button>
  );
};
```

---

## ✅ Checklist de Vérification

### Configuration
- [ ] Compte Stripe créé
- [ ] Mode TEST activé
- [ ] API keys copiées dans .env
- [ ] 3 produits créés (BASIC, PRO, ENTERPRISE)
- [ ] 3 Price IDs copiés dans .env
- [ ] Stripe CLI installé
- [ ] Webhook secret configuré

### Tests
- [ ] Backend démarre sans erreur
- [ ] Checkout session se crée
- [ ] Redirection vers Stripe fonctionne
- [ ] Paiement test réussit
- [ ] Webhook reçu et traité
- [ ] Subscription créée en DB
- [ ] Organization.plan mis à jour

### Production (Plus tard)
- [ ] Compte Stripe activé (KYC complété)
- [ ] Mode LIVE activé
- [ ] Clés de production dans .env
- [ ] Webhook production configuré
- [ ] URLs de production mises à jour
- [ ] Tests en production effectués

---

## 🐛 Troubleshooting

### Erreur: "Stripe is not configured"

**Solution**: Vérifier que `STRIPE_SECRET_KEY` est dans `.env` et que le serveur a redémarré.

### Erreur: "Webhook signature verification failed"

**Solution**: 
1. Vérifier que `STRIPE_WEBHOOK_SECRET` est correct
2. S'assurer que Stripe CLI est en cours d'exécution
3. Vérifier que le endpoint est `/api/stripe/webhook`

### Erreur: "Price ID not configured for plan"

**Solution**: Vérifier que les Price IDs sont dans `.env`:
```bash
STRIPE_BASIC_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...
```

### Subscription pas créée en DB

**Solution**:
1. Vérifier les logs du webhook
2. Vérifier que les métadonnées sont présentes
3. Vérifier que l'organizationId existe
4. Check database connection

---

## 📚 Ressources

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe CLI**: https://stripe.com/docs/stripe-cli
- **Test Cards**: https://stripe.com/docs/testing
- **Webhooks Guide**: https://stripe.com/docs/webhooks
- **Checkout Sessions**: https://stripe.com/docs/payments/checkout

---

## 🎉 C'est Prêt!

Une fois configuré, vous aurez:
- ✅ Paiements sécurisés Stripe
- ✅ Abonnements mensuels automatiques
- ✅ Billing portal self-service
- ✅ Webhooks synchronisés
- ✅ Gestion complète des subscriptions

**Prochaine étape**: Tester avec de vrais utilisateurs! 🚀

---

**Besoin d'aide?** Consulter la documentation Stripe ou le FINAL_IMPLEMENTATION_REPORT.md
