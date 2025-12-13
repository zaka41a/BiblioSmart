# 📚 BiblioSmart - Guide Utilisateur

**Version**: Beta 1.0
**Public**: Bibliothécaires et administrateurs
**Durée de lecture**: 15 minutes

---

## 🎯 Bienvenue sur BiblioSmart!

BiblioSmart est votre assistant numérique pour gérer votre bibliothèque moderne:
- 📖 Catalogue en ligne accessible 24/7
- 🔍 Recherche rapide et intelligente
- 📊 Statistiques en temps réel
- 👥 Gestion simple des lecteurs
- 📱 Accessible sur mobile et ordinateur

---

## 🚀 Démarrage Rapide (5 minutes)

### 1️⃣ Première Connexion

**URL**: https://bibliosmart.app

1. Cliquer sur **"Connexion"**
2. Entrer votre email et mot de passe temporaire
3. Vous serez invité à changer votre mot de passe
4. Choisir un mot de passe sécurisé (min. 8 caractères)

✅ **Vous êtes connecté!**

### 2️⃣ Découvrir l'Interface

**En tant qu'Administrateur**, vous verrez:

```
┌─────────────────────────────────────────────┐
│  BiblioSmart          🔍 Rechercher    👤   │
├─────────────────────────────────────────────┤
│                                             │
│  📊 Tableau de Bord                         │
│  ├─ Livres dans la bibliothèque: 456       │
│  ├─ Lecteurs actifs: 124                   │
│  ├─ Emprunts en cours: 89                  │
│  └─ Nouveaux cette semaine: 12             │
│                                             │
│  🔥 Actions Rapides                        │
│  [+ Ajouter un livre]  [📋 Voir emprunts]  │
│                                             │
└─────────────────────────────────────────────┘

Menu latéral:
📊 Tableau de bord
📚 Gestion des livres
👥 Gestion des utilisateurs
📈 Analytics
⚙️  Paramètres
```

### 3️⃣ Votre Première Action: Ajouter un Livre

1. Cliquer sur **"Gestion des livres"** dans le menu
2. Cliquer sur **"+ Ajouter un livre"**
3. Remplir les informations:
   ```
   Titre*:        Clean Code
   Auteur*:       Robert C. Martin
   ISBN:          978-0132350884
   Catégorie*:    Programmation
   Année:         2008
   Prix:          29.99 (optionnel)
   Description:   Un guide pour...
   URL Couverture: https://... (optionnel)
   ```
4. Cliquer sur **"Enregistrer"**

🎉 **Votre premier livre est ajouté!**

---

## 📖 Gestion des Livres

### Ajouter des Livres

**Méthode 1: Un par un** (pour débuter)
- Bouton "+ Ajouter un livre"
- Remplir le formulaire
- Enregistrer

**Méthode 2: Import en masse** (recommandé)
- Préparer un fichier CSV avec vos livres
- Format du CSV:
  ```csv
  title,author,isbn,category,year,price,description,coverUrl
  "1984","George Orwell","9780451524935","Fiction",1949,15.99,"Dystopie...","https://..."
  "Le Petit Prince","Antoine de Saint-Exupéry","9782070408504","Jeunesse",1943,12.99,"Conte...","https://..."
  ```
- Aller dans **Paramètres > Import**
- Uploader votre CSV
- Vérifier et confirmer

### Modifier un Livre

1. Aller dans **"Gestion des livres"**
2. Chercher le livre à modifier
3. Cliquer sur **✏️ Modifier**
4. Changer les informations
5. **Enregistrer**

### Supprimer un Livre

1. Trouver le livre
2. Cliquer sur **🗑️ Supprimer**
3. Confirmer l'action

⚠️ **Attention**: Impossible de supprimer un livre actuellement emprunté!

### Gérer la Disponibilité

**Marquer un livre comme indisponible**:
- Utile si le livre est perdu, abîmé, en réparation
- Dans la fiche du livre: **Toggle "Disponible"**

**Rendre à nouveau disponible**:
- Même processus, réactiver "Disponible"

---

## 👥 Gestion des Utilisateurs

### Types d'Utilisateurs

**Administrateur** (vous):
- Gère les livres
- Gère les lecteurs
- Voit les statistiques
- Configure la bibliothèque

**Lecteur**:
- Parcourt le catalogue
- Emprunte des livres (si configuré)
- Voit son historique
- Reçoit des notifications

### Inviter un Collègue Administrateur

1. Aller dans **"Gestion des utilisateurs"**
2. Cliquer sur **"+ Inviter un utilisateur"**
3. Remplir:
   ```
   Email:     collegue@bibliotheque.fr
   Nom:       Marie Dupont
   Rôle:      Administrateur
   ```
4. Envoyer l'invitation

Votre collègue recevra un email avec ses accès!

### Ajouter un Lecteur

**Option 1: Inscription libre**
- Les lecteurs peuvent s'inscrire eux-mêmes via le site
- Vous validez leur compte (si configuré)

**Option 2: Invitation manuelle**
- Même processus que ci-dessus
- Choisir le rôle "Lecteur"

### Voir les Lecteurs Actifs

1. **Gestion des utilisateurs**
2. Filtrer par:
   - Rôle (Lecteur/Admin)
   - Status (Actif/Inactif)
   - Dernière connexion

### Suspendre un Lecteur

En cas de retard répété ou abus:
1. Trouver l'utilisateur
2. Cliquer sur **"Actions"** → **"Suspendre"**
3. Le lecteur ne peut plus emprunter (mais peut consulter)

---

## 📊 Tableau de Bord & Statistiques

### Vue d'Ensemble

Votre tableau de bord affiche:

**Métriques Principales**:
- 📚 **Total de livres**: Nombre de livres dans votre catalogue
- 👥 **Lecteurs actifs**: Lecteurs qui se sont connectés ce mois
- 📖 **Emprunts en cours**: Livres actuellement empruntés
- 🔄 **Retours attendus**: Livres à retourner cette semaine

**Graphiques**:
- 📈 Évolution des emprunts (30 derniers jours)
- 📊 Top 10 des catégories les plus empruntées
- 👑 Top 5 des livres les plus populaires

### Analytics Avancés

Pour aller plus loin (Menu **Analytics**):

**Catégories**:
- Quelle catégorie est la plus empruntée?
- Quelle catégorie a le plus de livres?
- Tendances par mois

**Lecteurs**:
- Lecteurs les plus actifs
- Nouveaux lecteurs par mois
- Taux de rétention

**Livres**:
- Livres jamais empruntés (à promouvoir!)
- Livres les plus populaires (à commander en double?)
- Durée moyenne d'emprunt

💡 **Astuce**: Exportez les données en CSV pour analyse externe (Excel)

---

## 🔍 Recherche & Catalogue

### Recherche Simple

La barre de recherche en haut:
```
🔍 Rechercher un livre, auteur, ISBN...
```

**Exemples**:
- "Orwell" → Trouve tous les livres de George Orwell
- "1984" → Trouve le livre "1984" et autres avec 1984 dans le titre
- "978-0451524935" → Recherche par ISBN

### Filtres Avancés

Sur la page **Catalogue**:

**Filtrer par**:
- 📂 Catégorie (Fiction, Science, Jeunesse...)
- 🗓️ Année de publication
- 💰 Prix (Gratuit / Payant)
- ✅ Disponibilité (Disponible / Emprunté)

**Trier par**:
- Date d'ajout (Plus récents)
- Titre (A-Z)
- Auteur (A-Z)
- Popularité (Plus empruntés)

### Vue Détaillée d'un Livre

Cliquer sur un livre pour voir:
- 🖼️ Couverture
- 📖 Titre, Auteur, ISBN
- 📝 Description complète
- ⭐ Nombre d'emprunts
- 👥 Lecteurs qui ont emprunté
- 📅 Historique des emprunts

---

## ⚙️ Paramètres de la Bibliothèque

### Informations Générales

**Paramètres > Organisation**:
- Nom de votre bibliothèque
- Adresse
- Email de contact
- Téléphone

### Gestion de l'Abonnement

**Paramètres > Abonnement**:

Voir:
- Plan actuel (Trial / Basic / Pro)
- Date de fin de période
- Utilisation (livres/limite, utilisateurs/limite)

Actions:
- Mettre à jour le plan
- Gérer le paiement (Stripe)
- Voir l'historique de facturation

### Notifications

**Paramètres > Notifications**:

Configurer:
- Email de retour imminent (3 jours avant)
- Email de retard
- Email de nouveau livre
- Fréquence des newsletters

### Intégrations

**Paramètres > Intégrations**:

Connecter:
- EmailJS (pour notifications email)
- Google Analytics (pour tracking)
- API externe (si nécessaire)

---

## 💡 Cas d'Usage Fréquents

### Scénario 1: Un Lecteur Veut Emprunter

**Si système d'emprunt physique**:
1. Le lecteur vous demande le livre
2. Vous cherchez le livre dans BiblioSmart
3. Vous marquez le livre comme "Emprunté" (toggle Disponible)
4. Le lecteur repart avec le livre physique
5. BiblioSmart envoie un rappel automatique avant la date de retour

**Si système numérique** (PDF):
1. Le lecteur achète l'accès (si payant)
2. BiblioSmart débloque le PDF
3. Le lecteur peut lire en ligne ou télécharger

### Scénario 2: Retour d'un Livre

1. Le lecteur vous rend le livre physique
2. Vous cherchez le livre dans BiblioSmart
3. Vous marquez comme "Disponible"
4. Le lecteur peut voir le livre dans son historique

### Scénario 3: Import Initial du Catalogue

**Vous avez 500+ livres à importer**:

1. **Créer le CSV**:
   - Ouvrir Excel/Google Sheets
   - Colonnes: title, author, isbn, category, year
   - Remplir ligne par ligne

2. **Sauvegarder en CSV**:
   - Fichier > Enregistrer sous
   - Format: CSV (UTF-8)

3. **Importer dans BiblioSmart**:
   - Paramètres > Import
   - Choisir le fichier
   - Mapper les colonnes (si différentes)
   - Vérifier les données
   - Importer

4. **Vérification**:
   - Voir les livres dans le catalogue
   - Corriger les erreurs éventuelles

### Scénario 4: Fin de Mois - Analyse

**Chaque fin de mois**:

1. Aller dans **Analytics**
2. Sélectionner période: "Ce mois"
3. Noter:
   - Nombre d'emprunts
   - Nouveaux lecteurs
   - Catégories populaires
4. Exporter le rapport (PDF/CSV)
5. Identifier les tendances:
   - Besoin de nouveaux livres dans une catégorie?
   - Campagne pour promouvoir une catégorie peu empruntée?

---

## 📱 Utilisation Mobile

BiblioSmart fonctionne parfaitement sur smartphone et tablette!

**Navigation mobile**:
```
☰ Menu hamburger (en haut à gauche)
├─ Tableau de bord
├─ Catalogue
├─ Gestion livres
├─ Gestion users
└─ Paramètres
```

**Avantages**:
- Ajouter un livre directement depuis votre smartphone (photo de la couverture)
- Marquer un retour pendant que vous êtes au comptoir
- Consulter les stats en déplacement

---

## ⌨️ Raccourcis Clavier (Ordinateur)

**Navigation**:
- `Ctrl + K` : Ouvrir la recherche rapide
- `Ctrl + /` : Afficher les raccourcis
- `Esc` : Fermer les modales

**Actions**:
- `Ctrl + N` : Nouveau livre (sur page Livres)
- `Ctrl + E` : Modifier (quand un livre est sélectionné)
- `Ctrl + S` : Enregistrer (dans les formulaires)

---

## 🆘 Aide & Support

### En Cas de Problème

**1. Consulter la FAQ**:
https://bibliosmart.app/faq

Questions fréquentes:
- Comment réinitialiser mon mot de passe?
- Comment supprimer un lecteur?
- Comment exporter mes données?
- Puis-je annuler mon abonnement?

**2. Tutoriels Vidéo**:
https://bibliosmart.app/videos

Vidéos courtes (2-5 min):
- Démarrage rapide
- Ajouter 100 livres en 10 minutes
- Configurer les notifications
- Lire les statistiques

**3. Contacter le Support**:

**Email**: support@bibliosmart.app
**Réponse**: < 4 heures (jours ouvrés)

**Slack** (Beta testeurs): #beta-support
**Réponse**: En temps réel

**Dans votre email, précisez**:
- Votre nom et organisation
- Le problème rencontré
- Screenshots (si applicable)
- Browser utilisé (Chrome, Safari, etc.)

---

## ✅ Checklist: Mes Premiers Jours

### Jour 1: Setup Initial
- [ ] Première connexion réussie
- [ ] Mot de passe changé
- [ ] Tour de l'interface (15 min)
- [ ] Ajout du premier livre manuellement

### Jour 2-3: Import Catalogue
- [ ] Création du CSV de votre catalogue
- [ ] Import du CSV dans BiblioSmart
- [ ] Vérification des livres importés
- [ ] Correction des erreurs éventuelles

### Jour 4-5: Configuration
- [ ] Inviter vos collègues administrateurs
- [ ] Configurer les informations de la bibliothèque
- [ ] Paramétrer les notifications email
- [ ] Tester l'inscription d'un lecteur

### Semaine 2: Utilisation Quotidienne
- [ ] Marquer des emprunts/retours
- [ ] Ajouter de nouveaux livres
- [ ] Consulter les statistiques
- [ ] Explorer les analytics

### Semaine 3-4: Optimisation
- [ ] Analyser les livres jamais empruntés
- [ ] Identifier les catégories populaires
- [ ] Former les autres membres de l'équipe
- [ ] Promouvoir le catalogue auprès des lecteurs

---

## 💰 Plans & Limites

### Votre Plan Actuel

Vérifier dans **Paramètres > Abonnement**:

**Plan TRIAL** (Beta testeurs):
- ✅ Livres illimités
- ✅ Utilisateurs illimités
- ✅ Toutes les fonctionnalités
- ✅ Support prioritaire
- ⏰ Durée: Beta + 3 mois gratuits

**Après la période gratuite**:

**Plan Basic - 29€/mois**:
- 1,000 livres max
- 3 administrateurs
- 10 GB stockage
- Support email

**Plan Pro - 79€/mois** (Recommandé):
- Livres illimités
- 10 administrateurs
- 50 GB stockage
- Support prioritaire
- Analytics avancés

### Que se passe-t-il si je dépasse les limites?

**Limites Soft** (Avertissement):
- Email à 80% de la limite
- Email à 95% de la limite

**Limites Hard** (Blocage):
- Impossible d'ajouter plus de livres
- Invitation à upgrader vers plan supérieur

---

## 🔐 Sécurité & Confidentialité

### Vos Données Sont Sécurisées

✅ **Chiffrement**: HTTPS partout (SSL 256-bit)
✅ **Authentification**: JWT avec bcrypt
✅ **Isolation**: Vos données sont isolées des autres bibliothèques
✅ **Backups**: Sauvegardes quotidiennes automatiques
✅ **RGPD**: Conformité totale (données hébergées en Europe)

### Bonnes Pratiques

**Mot de passe**:
- Minimum 8 caractères
- Mélange majuscules/minuscules/chiffres
- Unique (ne pas réutiliser)
- Changement tous les 6 mois

**Compte**:
- Ne jamais partager vos identifiants
- Déconnexion après utilisation (ordinateurs partagés)
- Signaler toute activité suspecte

### Export de Vos Données

**À tout moment** (Paramètres > Export):
- Exporter tout votre catalogue (CSV)
- Exporter la liste des lecteurs
- Exporter l'historique des emprunts
- **Vos données vous appartiennent!**

---

## 📞 Contact & Communauté

### Rester Connecté

**Site Web**: https://bibliosmart.app
**Email**: contact@bibliosmart.app
**Twitter**: @BiblioSmartApp
**LinkedIn**: BiblioSmart

### Communauté Beta Testeurs

**Slack**: #beta-bibliothèques
- Partager vos astuces
- Poser des questions
- Aider les autres
- Être informé des nouveautés en avant-première

### Newsletter

S'inscrire pour recevoir:
- Nouveautés produit (1x/mois)
- Meilleures pratiques bibliothèques
- Études de cas inspirantes
- Offres exclusives

---

## 🚀 Aller Plus Loin

### Ressources Avancées

**Blog BiblioSmart**:
- "10 astuces pour promouvoir votre catalogue"
- "Analyser vos données pour mieux servir vos lecteurs"
- "Créer des collections thématiques engageantes"

**Webinaires mensuels** (gratuits):
- Démonstrations de nouvelles features
- Sessions Q&A
- Invités experts en bibliothéconomie

### Devenir Ambassadeur

Vous adorez BiblioSmart?

**Programme Ambassadeur**:
- Parrainez d'autres bibliothèques
- Obtenez 1 mois gratuit par parrainage
- Badge spécial "Ambassadeur"
- Accès early access aux nouvelles features

---

## 📝 Donner Votre Feedback

Votre avis compte! 💙

**Formulaire de Feedback** (5 min):
https://forms.bibliosmart.app/feedback

**Qu'est-ce qui nous intéresse?**:
- Ce qui vous plaît ❤️
- Ce qui vous frustre 😤
- Les bugs rencontrés 🐛
- Les features que vous souhaitez ⭐

**Chaque feedback compte** pour améliorer BiblioSmart!

---

## 🎉 Bienvenue dans la Communauté BiblioSmart!

Vous avez maintenant toutes les clés pour transformer votre bibliothèque! 📚✨

**Besoin d'aide?** N'hésitez pas à nous contacter!

Bonne gestion,
L'équipe BiblioSmart 💙

---

**Guide mis à jour**: Décembre 2024
**Version**: Beta 1.0
**PDF disponible**: https://bibliosmart.app/guides/user-guide.pdf
