# 🚀 BiblioSmart - Guide de Déploiement en Production

**Objectif**: Déployer BiblioSmart en production (Vercel + Railway) pour lancement beta
**Durée estimée**: 4-6 heures
**Coût mensuel**: ~15€ - 50€ selon usage

---

## 📋 Plan de Déploiement

### Phase 1: Backend sur Railway (2h)
### Phase 2: Database PostgreSQL (1h)
### Phase 3: Frontend sur Vercel (1h)
### Phase 4: Stripe Production (1h)
### Phase 5: DNS & SSL (30min)
### Phase 6: Tests & Monitoring (1h)

---

## 🎯 PHASE 1: Déploiement Backend sur Railway

### 1.1 Créer un compte Railway

1. Aller sur https://railway.app
2. S'inscrire avec GitHub
3. Connecter votre repository BiblioSmart

### 1.2 Créer un nouveau projet

```bash
# Dans Railway Dashboard:
1. Cliquer "New Project"
2. Sélectionner "Deploy from GitHub repo"
3. Choisir votre repo BiblioSmart
4. Sélectionner le dossier "backend"
```

### 1.3 Configurer les variables d'environnement

Dans Railway > Variables, ajouter:

```env
# Database (sera fournie par Railway)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Server
NODE_ENV=production
PORT=5001
FRONTEND_URL=https://votre-domaine.vercel.app

# JWT Secrets (GÉNÉRER DE NOUVEAUX!)
JWT_SECRET=<générer avec: openssl rand -base64 32>
JWT_REFRESH_SECRET=<générer avec: openssl rand -base64 32>
JWT_EXPIRES_IN=45m
JWT_REFRESH_EXPIRES_IN=14d

# Stripe Production
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_BASIC_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...

# EmailJS (ou remplacer par SendGrid)
EMAILJS_SERVICE_ID=service_...
EMAILJS_TEMPLATE_ID=template_...
EMAILJS_PUBLIC_KEY=...

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_MAX=5

# Feature Flags
ENABLE_MULTI_TENANCY=true
ENABLE_STRIPE_PAYMENTS=true
ENABLE_EMAIL_NOTIFICATIONS=true

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

### 1.4 Configurer le build

Créer `railway.json` dans `/backend`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npx prisma generate && npm run build"
  },
  "deploy": {
    "startCommand": "npx prisma migrate deploy && npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 1.5 Configurer package.json pour production

Vérifier dans `/backend/package.json`:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate deploy"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 🗄️ PHASE 2: Database PostgreSQL

### Option A: Railway Postgres (Recommandé - Simple)

```bash
# Dans Railway Dashboard:
1. Cliquer "New" → "Database" → "Add PostgreSQL"
2. Railway génère automatiquement DATABASE_URL
3. La variable ${{Postgres.DATABASE_URL}} est auto-liée
```

**Coût**: $5/mois (500 MB) → $10/mois (5 GB)

### Option B: Supabase (Recommandé - Features++)

```bash
# 1. Créer compte sur https://supabase.com
# 2. Créer nouveau projet
# 3. Copier la Database URL (Settings → Database)
# 4. Ajouter dans Railway Variables:

DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
```

**Avantages**:
- Free tier généreux (500 MB)
- Backups automatiques
- Dashboard SQL
- API REST auto-générée

**Coût**: Free → $25/mois (Pro)

### 2.3 Migrer la database

```bash
# Railway exécutera automatiquement:
npx prisma migrate deploy

# Ou manuellement:
cd backend
DATABASE_URL="votre-url-production" npx prisma migrate deploy
```

### 2.4 Seed des données initiales (optionnel)

```bash
# Créer un script de seed production
# backend/prisma/seed-production.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Créer organisation demo
  const demoOrg = await prisma.organization.create({
    data: {
      name: 'BiblioSmart Demo',
      slug: 'demo',
      plan: 'PRO',
      status: 'ACTIVE'
    }
  });

  // Créer admin
  await prisma.user.create({
    data: {
      email: 'admin@bibliosmart.com',
      passwordHash: await bcrypt.hash('ChangeThisPassword123!', 10),
      name: 'Admin BiblioSmart',
      role: 'ADMIN',
      organizationId: demoOrg.id
    }
  });

  console.log('✅ Production seed completed');
}

main();
```

---

## 🎨 PHASE 3: Déploiement Frontend sur Vercel

### 3.1 Créer compte Vercel

1. Aller sur https://vercel.com
2. S'inscrire avec GitHub
3. Importer votre repository BiblioSmart

### 3.2 Configurer le projet

```bash
# Dans Vercel Dashboard:
1. Cliquer "Add New" → "Project"
2. Importer BiblioSmart repo
3. Framework Preset: Vite
4. Root Directory: frontend
5. Build Command: npm run build
6. Output Directory: dist
7. Install Command: npm install
```

### 3.3 Variables d'environnement Vercel

```env
# API Backend
VITE_API_URL=https://votre-backend.up.railway.app

# Stripe Public Key
VITE_STRIPE_PUBLIC_KEY=pk_live_...

# EmailJS (si utilisé côté frontend)
VITE_EMAILJS_SERVICE_ID=service_...
VITE_EMAILJS_TEMPLATE_ID=template_...
VITE_EMAILJS_PUBLIC_KEY=...
```

### 3.4 Créer fichier de config Vercel

Créer `vercel.json` dans `/frontend`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 3.5 Optimiser le build frontend

Mettre à jour `/frontend/vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', '@headlessui/react', '@heroicons/react'],
          'chart-vendor': ['recharts'],
          'pdf-vendor': ['react-pdf', 'pdfjs-dist']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### 3.6 Déployer

```bash
# Option 1: Depuis Vercel Dashboard
Cliquer "Deploy"

# Option 2: CLI
npm i -g vercel
cd frontend
vercel --prod
```

---

## 💳 PHASE 4: Configuration Stripe Production

### 4.1 Activer le compte Stripe

1. Aller sur https://dashboard.stripe.com
2. Compléter "Activate your account"
3. Fournir informations légales/fiscales
4. Vérifier votre identité

### 4.2 Créer les produits

```bash
# Dans Stripe Dashboard → Products:

1. Créer "BiblioSmart Basic"
   - Prix: 29€/mois (recurring)
   - Copier le Price ID: price_xxxBasic

2. Créer "BiblioSmart Pro"
   - Prix: 79€/mois (recurring)
   - Copier le Price ID: price_xxxPro

3. Créer "BiblioSmart Enterprise"
   - Prix: Sur devis
   - Copier le Price ID: price_xxxEnterprise
```

### 4.3 Configurer les webhooks

```bash
# Dans Stripe Dashboard → Developers → Webhooks:

1. Cliquer "Add endpoint"
2. Endpoint URL: https://votre-backend.up.railway.app/api/stripe/webhook
3. Sélectionner les événements:
   ✅ checkout.session.completed
   ✅ customer.subscription.created
   ✅ customer.subscription.updated
   ✅ customer.subscription.deleted
   ✅ invoice.payment_succeeded
   ✅ invoice.payment_failed

4. Copier le "Signing secret": whsec_xxx
5. Ajouter dans Railway Variables: STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### 4.4 Obtenir les clés de production

```bash
# Dans Stripe Dashboard → Developers → API keys:

1. Copier "Publishable key": pk_live_xxx
2. Révéler "Secret key": sk_live_xxx
3. Ajouter dans Railway + Vercel variables
```

### 4.5 Tester le webhook localement d'abord

```bash
# Installer Stripe CLI
brew install stripe/stripe-brew/stripe

# Login
stripe login

# Écouter les webhooks en local
stripe listen --forward-to localhost:5001/api/stripe/webhook

# Dans un autre terminal, tester:
stripe trigger checkout.session.completed
```

---

## 🌐 PHASE 5: DNS & Domaine Personnalisé

### 5.1 Acheter un domaine

**Recommandations**:
- Namecheap (8-12€/an)
- Cloudflare Registrar (prix coûtant)
- OVH (français)

**Suggestion de noms**:
- bibliosmart.app
- bibliosmart.io
- monbibliosmart.fr
- getbibliosmart.com

### 5.2 Configurer DNS pour Vercel (Frontend)

```bash
# Dans votre registrar DNS:

# Pour domaine racine (bibliosmart.app):
A     @     76.76.21.21

# Pour www:
CNAME www   cname.vercel-dns.com

# Dans Vercel Dashboard:
1. Settings → Domains
2. Ajouter "bibliosmart.app"
3. Vérifier le domaine
```

### 5.3 Configurer DNS pour Railway (Backend)

```bash
# Option A: Sous-domaine (Recommandé)
CNAME api   [votre-projet].up.railway.app

# Dans Railway Dashboard:
1. Settings → Domains
2. Ajouter "api.bibliosmart.app"

# Résultat:
Frontend: https://bibliosmart.app
Backend:  https://api.bibliosmart.app
```

### 5.4 Configurer SSL

**Vercel**: SSL automatique (Let's Encrypt)
**Railway**: SSL automatique (Let's Encrypt)

Rien à faire! 🎉

### 5.5 Mettre à jour CORS Backend

```typescript
// backend/src/server.ts
app.use(
  cors({
    origin: [
      'https://bibliosmart.app',
      'https://www.bibliosmart.app',
      process.env.FRONTEND_URL || 'http://localhost:5173'
    ],
    credentials: true
  })
);
```

---

## 🧪 PHASE 6: Tests & Monitoring

### 6.1 Tests de santé

```bash
# Backend health check
curl https://api.bibliosmart.app/api/health

# Frontend
curl https://bibliosmart.app

# Stripe webhook
# (Utiliser Stripe CLI pour tester)
stripe listen --forward-to https://api.bibliosmart.app/api/stripe/webhook
stripe trigger checkout.session.completed
```

### 6.2 Configurer Sentry (Error Tracking)

```bash
# 1. Créer compte sur https://sentry.io
# 2. Créer nouveau projet "bibliosmart-backend"
# 3. Copier DSN

# Backend:
npm install @sentry/node

# backend/src/server.ts
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1
});

app.use(Sentry.Handlers.errorHandler());
```

### 6.3 Configurer Uptime Monitoring

**Option 1: UptimeRobot (Gratuit)**
```bash
1. Créer compte sur https://uptimerobot.com
2. Ajouter monitor:
   - Type: HTTP(s)
   - URL: https://api.bibliosmart.app/api/health
   - Interval: 5 minutes
   - Alert: Email
```

**Option 2: BetterUptime (Professionnel)**
```bash
# https://betteruptime.com
- Monitoring multi-régions
- Status page publique
- Intégration Slack
- Coût: Free → $19/mois
```

### 6.4 Analytics & Métriques

**PostHog (Gratuit pour start)**
```bash
# Frontend analytics
npm install posthog-js

# frontend/src/main.tsx
import posthog from 'posthog-js';

posthog.init('phc_xxx', {
  api_host: 'https://app.posthog.com'
});
```

---

## 📊 CHECKLIST PRÉ-LANCEMENT

### Infrastructure ✅
- [ ] Backend déployé sur Railway
- [ ] Database PostgreSQL configurée
- [ ] Frontend déployé sur Vercel
- [ ] Domaine personnalisé configuré
- [ ] SSL activé (HTTPS)
- [ ] CORS configuré correctement

### Stripe ✅
- [ ] Compte activé (mode production)
- [ ] Produits créés (Basic, Pro, Enterprise)
- [ ] Webhooks configurés
- [ ] Clés de production dans variables env
- [ ] Test d'un paiement complet

### Sécurité ✅
- [ ] Nouveaux JWT secrets générés
- [ ] Variables sensibles jamais commitées
- [ ] Rate limiting actif
- [ ] Headers de sécurité (Helmet)
- [ ] HTTPS forcé partout

### Monitoring ✅
- [ ] Sentry configuré (erreurs)
- [ ] Uptime monitoring actif
- [ ] Health checks fonctionnels
- [ ] Logs centralisés

### Documentation ✅
- [ ] README à jour
- [ ] Guide utilisateur
- [ ] Guide admin
- [ ] FAQ

---

## 💰 Coûts Mensuels Estimés

### Configuration Minimale (Start)
```
Vercel (Frontend):        0€     (Hobby plan)
Railway (Backend):        5€     (Starter)
Railway (Postgres):       5€     (500 MB)
Domaine:                  1€     (12€/an)
Stripe:                   0€     (commission seulement)
Sentry:                   0€     (Free tier)
UptimeRobot:              0€     (Free)
-----------------------------------------
TOTAL:                   ~11€/mois
```

### Configuration Recommandée (Growth)
```
Vercel (Pro):            20€
Railway (Backend):       20€     (2GB RAM)
Supabase (Pro):          25€     (8GB DB)
Domaine:                  1€
Stripe:                   0€
Sentry (Team):           26€
BetterUptime:            19€
-----------------------------------------
TOTAL:                  ~111€/mois
```

**ROI**: Avec 10 clients Basic (29€), vous couvrez les coûts! 🎯

---

## 🚨 Troubleshooting

### Backend ne démarre pas
```bash
# Vérifier les logs Railway
railway logs

# Vérifier Prisma
DATABASE_URL=xxx npx prisma migrate status

# Vérifier variables env
railway variables
```

### Frontend 404
```bash
# Vérifier vercel.json (rewrites)
# Vérifier VITE_API_URL
# Vérifier build logs
vercel logs
```

### Stripe webhook fail
```bash
# Vérifier signature
# Vérifier STRIPE_WEBHOOK_SECRET
# Tester avec Stripe CLI
stripe listen --forward-to https://api.bibliosmart.app/api/stripe/webhook
```

---

## 📚 Ressources

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Prisma Deployment**: https://www.prisma.io/docs/guides/deployment

---

## 🎉 FÉLICITATIONS!

Votre application BiblioSmart est maintenant en production! 🚀

**Prochaines étapes**:
1. Lancer le beta test (voir BETA_TEST_PLAN.md)
2. Collecter feedback utilisateurs
3. Itérer rapidement

**URL de production**:
- 🌐 Frontend: https://bibliosmart.app
- 🔌 API: https://api.bibliosmart.app
- 📊 Status: https://status.bibliosmart.app (si BetterUptime)

---

**Créé par**: Claude Code
**Date**: Décembre 2024
**Version**: 1.0
