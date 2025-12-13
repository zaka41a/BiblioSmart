# 🚀 Guide de Démarrage BiblioSmart

## ✅ Prérequis

- Node.js 18+ installé
- PostgreSQL installé et en cours d'exécution
- Les deux serveurs (backend + frontend) doivent être lancés

---

## 📝 Instructions de Démarrage

### 1️⃣ Démarrer PostgreSQL

```bash
# Vérifier si PostgreSQL est déjà en cours d'exécution
pg_isready -h localhost -p 5432

# Si non, démarrer PostgreSQL
# macOS (Homebrew):
brew services start postgresql@14
```

### 2️⃣ Démarrer le Backend

**Terminal 1 - Backend:**

```bash
# Aller dans le dossier backend
cd /Users/zakaria/Documents/AllProjects-react/BiblioSmart/backend

# Démarrer le serveur backend
npm run dev
```

Vous devriez voir:
```
API BiblioSmart en écoute sur http://localhost:5001
```

### 3️⃣ Démarrer le Frontend

**Terminal 2 - Frontend:**

```bash
# Aller dans le dossier frontend
cd /Users/zakaria/Documents/AllProjects-react/BiblioSmart/frontend

# Démarrer le serveur frontend
npm run dev
```

Vous devriez voir:
```
  VITE v5.4.21  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4️⃣ Ouvrir l'Application

Ouvrez votre navigateur et allez sur:
```
http://localhost:5173
```

---

## 🔐 Comptes par Défaut

### Administrateur
- **Email:** `admin@library.com`
- **Mot de passe:** `admin123`

**Accès Admin:**
- Gestion des livres
- Gestion des utilisateurs
- Statistiques et analytics
- Configuration système

---

## 📚 Livres Disponibles (6 livres avec images)

### Livres GRATUITS (3):
1. **Clean Code** - Robert C. Martin
2. **JavaScript: The Good Parts** - Douglas Crockford
3. **You Don't Know JS** - Kyle Simpson

### Livres PAYANTS (3):
1. **The Pragmatic Programmer** - $29.99
2. **Introduction to Algorithms** - $39.99
3. **Design Patterns** - $24.99

Tous les livres ont maintenant des **images de couverture** ! 📖✨

---

## 🌐 URLs Importantes

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5001
- **Health Check:** http://localhost:5001/api/health
- **API Books:** http://localhost:5001/api/books

---

## 🛠️ Commandes Utiles

### Backend

```bash
cd backend

# Démarrer en développement
npm run dev

# Rebuild de la base de données (⚠️ supprime les données)
npx prisma migrate reset
npm run seed

# Voir la base de données avec Prisma Studio
npx prisma studio
```

### Frontend

```bash
cd frontend

# Démarrer en développement
npm run dev

# Build pour production
npm run build

# Tester le build
npm run preview
```

---

## 🔍 Résolution des Problèmes

### Le frontend n'affiche pas les livres

1. **Nettoyer le localStorage:**
   - Ouvrir la console du navigateur (F12)
   - Aller dans "Application" → "Local Storage"
   - Supprimer `bibliosmart_books` (anciennes données)
   - Rafraîchir la page (Cmd+R ou Ctrl+R)

2. **Vérifier que le backend fonctionne:**
   ```bash
   curl http://localhost:5001/api/health
   ```

3. **Vérifier les livres dans l'API:**
   ```bash
   curl http://localhost:5001/api/books
   ```

### Le backend ne démarre pas

1. **Vérifier PostgreSQL:**
   ```bash
   pg_isready -h localhost -p 5432
   ```

2. **Re-générer Prisma Client:**
   ```bash
   cd backend
   npx prisma generate
   ```

3. **Vérifier le fichier .env:**
   ```bash
   cat backend/.env
   # DATABASE_URL doit être correct
   ```

### Port déjà utilisé

**Backend (port 5001):**
```bash
lsof -ti:5001 | xargs kill -9
```

**Frontend (port 5173):**
```bash
lsof -ti:5173 | xargs kill -9
```

---

## 📦 Structure du Projet

```
BiblioSmart/
├── backend/                 # API Node.js/Express
│   ├── src/
│   │   ├── controllers/    # Logique métier
│   │   ├── routes/         # Routes API
│   │   ├── services/       # Services (Stripe)
│   │   └── server.ts       # Point d'entrée
│   ├── prisma/
│   │   ├── schema.prisma   # Schéma DB
│   │   └── seed.ts         # Données initiales
│   └── .env                # Variables d'environnement
│
├── frontend/               # Application React
│   ├── src/
│   │   ├── pages/         # Pages de l'app
│   │   ├── components/    # Composants réutilisables
│   │   ├── context/       # State management
│   │   └── config/        # Configuration API
│   └── .env               # Variables d'environnement
│
├── ADMIN_SETUP_GUIDE.md   # Guide configuration admin
├── API_DOCUMENTATION.md   # Documentation API (backend/)
└── START_PROJECT.md       # Ce fichier!
```

---

## ✨ Fonctionnalités

### Pour les Utilisateurs:
- ✅ Parcourir le catalogue de livres avec images
- ✅ Recherche et filtres par catégorie
- ✅ Lire des livres gratuits (PDF dans le navigateur)
- ✅ Acheter des livres payants
- ✅ Télécharger des PDFs
- ✅ Tableau de bord personnel

### Pour les Admins:
- ✅ Ajouter/Modifier/Supprimer des livres
- ✅ Upload d'images de couverture (URLs)
- ✅ Gestion des utilisateurs
- ✅ Statistiques en temps réel
- ✅ Analytics avec graphiques
- ✅ Configuration EmailJS et Stripe

---

## 🎨 Technologies Utilisées

**Frontend:**
- React 18 + TypeScript
- Vite (Build tool)
- Framer Motion (Animations)
- react-pdf (Lecteur PDF)
- Recharts (Graphiques)
- Tailwind CSS

**Backend:**
- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT Authentication
- Stripe Payments
- TypeScript

---

## 📧 Support

Pour des questions ou problèmes:
1. Vérifier ce guide
2. Consulter `ADMIN_SETUP_GUIDE.md`
3. Consulter `backend/API_DOCUMENTATION.md`
4. Vérifier les logs dans les terminaux

---

## 🎉 Prêt à Commencer!

Suivez les étapes 1-4 ci-dessus et votre application sera en ligne!

**Enjoy BiblioSmart! 📚✨**

---

*Dernière mise à jour: Décembre 2025*
