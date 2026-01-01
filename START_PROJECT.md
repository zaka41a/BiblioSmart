# 🚀 BiblioSmart Getting Started Guide

## ✅ Prerequisites

- Node.js 18+ installed
- PostgreSQL installed and running
- Both servers (backend + frontend) must be running

---

## 📝 Startup Instructions

### 1️⃣ Start PostgreSQL

```bash
# Check if PostgreSQL is already running
pg_isready -h localhost -p 5432

# If not, start PostgreSQL
# macOS (Homebrew):
brew services start postgresql@14
```

### 2️⃣ Start the Backend

**Terminal 1 - Backend:**

```bash
# Go to the backend folder
cd /Users/zakaria/Documents/AllProjects-react/BiblioSmart/backend

# Start the backend server
npm run dev
```

You should see:
```
BiblioSmart API listening on http://localhost:5001
```

### 3️⃣ Start the Frontend

**Terminal 2 - Frontend:**

```bash
# Go to the frontend folder
cd /Users/zakaria/Documents/AllProjects-react/BiblioSmart/frontend

# Start the frontend server
npm run dev
```

You should see:
```
  VITE v5.4.21  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4️⃣ Open the Application

Open your browser and go to:
```
http://localhost:5173
```

---

## 🔐 Default Accounts

### Administrator
- **Email:** `admin@library.com`
- **Password:** `admin123`

**Admin Access:**
- Book management
- User management
- Statistics and analytics
- System configuration

---

## 📚 Available Books (6 books with images)

### FREE Books (3):
1. **Clean Code** - Robert C. Martin
2. **JavaScript: The Good Parts** - Douglas Crockford
3. **You Don't Know JS** - Kyle Simpson

### PAID Books (3):
1. **The Pragmatic Programmer** - $29.99
2. **Introduction to Algorithms** - $39.99
3. **Design Patterns** - $24.99

All books now have **cover images**! 📖✨

---

## 🌐 Important URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5001
- **Health Check:** http://localhost:5001/api/health
- **API Books:** http://localhost:5001/api/books

---

## 🛠️ Useful Commands

### Backend

```bash
cd backend

# Start in development
npm run dev

# Rebuild the database (⚠️ deletes data)
npx prisma migrate reset
npm run seed

# View the database with Prisma Studio
npx prisma studio
```

### Frontend

```bash
cd frontend

# Start in development
npm run dev

# Build for production
npm run build

# Test the build
npm run preview
```

---

## 🔍 Troubleshooting

### Frontend doesn't display books

1. **Clear localStorage:**
   - Open the browser console (F12)
   - Go to "Application" → "Local Storage"
   - Delete `bibliosmart_books` (old data)
   - Refresh the page (Cmd+R or Ctrl+R)

2. **Check that the backend is running:**
   ```bash
   curl http://localhost:5001/api/health
   ```

3. **Check books in the API:**
   ```bash
   curl http://localhost:5001/api/books
   ```

### Backend won't start

1. **Check PostgreSQL:**
   ```bash
   pg_isready -h localhost -p 5432
   ```

2. **Regenerate Prisma Client:**
   ```bash
   cd backend
   npx prisma generate
   ```

3. **Check the .env file:**
   ```bash
   cat backend/.env
   # DATABASE_URL must be correct
   ```

### Port already in use

**Backend (port 5001):**
```bash
lsof -ti:5001 | xargs kill -9
```

**Frontend (port 5173):**
```bash
lsof -ti:5173 | xargs kill -9
```

---

## 📦 Project Structure

```
BiblioSmart/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API routes
│   │   ├── services/       # Services (Stripe)
│   │   └── server.ts       # Entry point
│   ├── prisma/
│   │   ├── schema.prisma   # DB schema
│   │   └── seed.ts         # Initial data
│   └── .env                # Environment variables
│
├── frontend/               # React application
│   ├── src/
│   │   ├── pages/         # App pages
│   │   ├── components/    # Reusable components
│   │   ├── context/       # State management
│   │   └── config/        # API configuration
│   └── .env               # Environment variables
│
├── ADMIN_SETUP_GUIDE.md   # Admin configuration guide
├── API_DOCUMENTATION.md   # API documentation (backend/)
└── START_PROJECT.md       # This file!
```

---

## ✨ Features

### For Users:
- ✅ Browse book catalog with images
- ✅ Search and filter by category
- ✅ Read free books (PDF in browser)
- ✅ Purchase paid books
- ✅ Download PDFs
- ✅ Personal dashboard

### For Admins:
- ✅ Add/Edit/Delete books
- ✅ Upload cover images (URLs)
- ✅ User management
- ✅ Real-time statistics
- ✅ Analytics with charts
- ✅ EmailJS and Stripe configuration

---

## 🎨 Technologies Used

**Frontend:**
- React 18 + TypeScript
- Vite (Build tool)
- Framer Motion (Animations)
- react-pdf (PDF Reader)
- Recharts (Charts)
- Tailwind CSS

**Backend:**
- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT Authentication
- Stripe Payments
- TypeScript

---

## 📧 Support

For questions or problems:
1. Check this guide
2. Consult `ADMIN_SETUP_GUIDE.md`
3. Consult `backend/API_DOCUMENTATION.md`
4. Check the logs in the terminals

---

## 🎉 Ready to Start!

Follow steps 1-4 above and your application will be online!

**Enjoy BiblioSmart! 📚✨**

---

*Last updated: December 2025*
