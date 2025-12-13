# 📚 BiblioSmart PDF Storage

## Comment ajouter vos propres livres PDF

### 1️⃣ **Méthode 1 : Ajouter des PDFs locaux**

1. **Placez vos fichiers PDF** dans ce dossier (`public/pdfs/`)
   ```
   frontend/
   └── public/
       └── pdfs/
           ├── mon-livre-1.pdf
           ├── mon-livre-2.pdf
           └── mon-livre-3.pdf
   ```

2. **Ajoutez le livre via l'interface admin** (`/admin/books`)
   - Titre, Auteur, Catégorie, etc.
   - **PDF URL** : `/pdfs/mon-livre-1.pdf`
   - Sauvegardez

3. **Le livre est maintenant disponible** pour lecture et téléchargement !

---

### 2️⃣ **Méthode 2 : Utiliser des URLs externes**

Vous pouvez aussi utiliser des PDFs hébergés en ligne :

**Dans l'interface admin :**
- **PDF URL** : `https://example.com/mon-livre.pdf`

**⚠️ Attention :** Assurez-vous que l'URL :
- Est accessible publiquement
- Supporte CORS (Cross-Origin Resource Sharing)
- Est en HTTPS (recommandé)

---

### 3️⃣ **Méthode 3 : Upload via serveur (À implémenter)**

Pour un système de production, il est recommandé d'implémenter :

```typescript
// Backend endpoint pour upload
POST /api/books/:id/upload-pdf
Content-Type: multipart/form-data

// Stockage recommandé :
- AWS S3
- Google Cloud Storage
- Azure Blob Storage
- Serveur local avec Express
```

---

## 📖 Livres PDF gratuits et légaux

### Domaine public (libre de droits)
- **Project Gutenberg** : https://www.gutenberg.org/
- **Internet Archive** : https://archive.org/details/texts
- **Standard Ebooks** : https://standardebooks.org/

### Livres techniques gratuits
- **Free Programming Books** : https://github.com/EbookFoundation/free-programming-books
- **O'Reilly Open Books** : https://www.oreilly.com/openbook/

---

## 🔧 Configuration technique

### Structure d'un livre avec PDF

```typescript
{
  id: "book-7",
  title: "Mon Livre",
  author: "Auteur",
  category: "Fiction",
  year: 2024,
  isbn: "978-X-XXX-XXXXX-X",
  available: true,
  price: 0, // 0 = gratuit, >0 = payant
  description: "Description du livre...",
  pdfUrl: "/pdfs/mon-livre.pdf", // Chemin local
  totalPages: 150 // Optionnel
}
```

### Formats supportés
- ✅ **PDF** (recommandé)
- ✅ URLs HTTP/HTTPS
- ✅ Chemins relatifs `/pdfs/...`

---

## 🚀 Fonctionnalités du lecteur

- 📖 **Lecture page par page**
- 🔍 **Zoom** (50% - 300%)
- ⬇️ **Téléchargement** direct
- 🖥️ **Mode plein écran**
- 📱 **Responsive** (mobile, tablet, desktop)
- 🔢 **Navigation** directe par numéro de page

---

## 📝 Notes importantes

1. **Taille des fichiers** : Les PDFs volumineux (>10 MB) peuvent ralentir le chargement
2. **Droits d'auteur** : Assurez-vous d'avoir les droits pour distribuer les PDFs
3. **Performance** : Pour de gros catalogues, envisagez un CDN
4. **Sécurité** : Ne stockez pas de PDFs sensibles dans `public/`

---

## 🆘 Dépannage

### Le PDF ne se charge pas
- ✅ Vérifiez que le fichier existe dans `public/pdfs/`
- ✅ Vérifiez l'URL dans la base de données
- ✅ Ouvrez la console (F12) pour voir les erreurs
- ✅ Testez l'URL directement : `http://localhost:5173/pdfs/votre-fichier.pdf`

### Erreur CORS avec URLs externes
```javascript
// Le serveur distant doit envoyer ces headers :
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
```

### Le téléchargement ne fonctionne pas
- ✅ Vérifiez que `pdfUrl` est défini
- ✅ Pour URLs externes, CORS peut bloquer le téléchargement
- ✅ Solution : utilisez des PDFs locaux pour le téléchargement

---

## 📚 Exemple complet

**1. Ajoutez `livre-exemple.pdf` dans ce dossier**

**2. Via l'interface admin (`/admin/books`) :**
- Titre : "Mon Premier Livre"
- Auteur : "Jean Dupont"
- Catégorie : "Fiction"
- Année : 2024
- ISBN : "978-X-XXX-XXXXX-X"
- Prix : 0 (gratuit)
- Description : "Un livre d'exemple"
- **PDF URL** : `/pdfs/livre-exemple.pdf`

**3. Testez :**
- Allez sur `/catalogue`
- Cliquez sur "Read Free" ou "Read Now"
- Le lecteur PDF s'ouvre !

---

Créé avec ❤️ par BiblioSmart
