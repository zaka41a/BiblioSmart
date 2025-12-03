# BiblioSmart API

API RESTful construite avec Express & Prisma pour alimenter la plateforme BiblioSmart.

## Scripts

```bash
npm install        # depuis le dossier backend/
npx prisma migrate dev
npm run seed
npm run dev        # démarre l'API sur http://localhost:5001
```

## Routes principales

- `POST /api/auth/register` — inscription (email, mot de passe)
- `POST /api/auth/login` — authentification (renvoie cookies JWT)
- `POST /api/auth/logout` — suppression des cookies
- `GET /api/books` — liste paginée + filtres (`query`, `genre`, `available`)
- `GET /api/books/:id` — fiche détaillée
- `POST /api/books` — création (admin / bibliothécaire)
- `PATCH /api/books/:id` — mise à jour
- `DELETE /api/books/:id` — suppression
- `POST /api/loans` — emprunter un livre (corps : `bookId`, `dueDate`)
- `POST /api/loans/:loanId/return` — enregistrer un retour
- `GET /api/users/:id` — profil utilisateur (protégé)
- `GET /api/users/:id/recommendations` — recommandations basées sur favoris/emprunts

## Schéma Prisma (extrait)

```prisma
model Book {
  id        String @id @default(cuid())
  title     String
  author    String
  category  String
  copies    Int    @default(1)
  available Int    @default(1)
  tags      String[]
}
```

Les migrations et la seed incluent 12 ouvrages de démonstration.
