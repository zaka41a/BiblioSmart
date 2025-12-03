# BiblioSmart Front-end

React + Vite + Tailwind CSS interface pour la plateforme BiblioSmart.

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Pages livrées

- **Accueil** (`/`) : slogan, CTA, statistiques, modules, étapes.
- **Catalogue** (`/catalogue`) : recherche en temps réel, filtres, aperçu des cartes livres.
- **Fiche livre** (`/livres/:id`) : gabarit détaillé (synopsis, métadonnées, actions d’emprunt).
- **Espace utilisateur** (`/utilisateur`) : emprunts, recommandations.
- **Dashboard admin** (`/admin`) : KPIs, cartes CRUD.

Le thème clair/sombre est géré via `zustand` et Tailwind. Remplacez `src/assets/bibliosmart-logo.png` par votre logo officiel pour une marque parfaite.
