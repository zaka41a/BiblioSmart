# BiblioSmart Backend

RESTful API backend for BiblioSmart library management platform, built with Node.js, Express, PostgreSQL, and Prisma.

## Features

- **Authentication & Authorization** - JWT-based auth with role-based access control
- **Book Management** - CRUD operations for books with PDF support
- **Purchase System** - Track book purchases with Stripe integration
- **Payment Processing** - Stripe checkout and webhook handling
- **Database** - PostgreSQL with Prisma ORM
- **Type Safety** - Full TypeScript support
- **Security** - Helmet, CORS, bcrypt password hashing

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Payments:** Stripe
- **Validation:** Zod
- **Language:** TypeScript

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Stripe account (for payments)

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up PostgreSQL

Ensure PostgreSQL is running:

```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# If not running, start it
# macOS (Homebrew):
brew services start postgresql@14

# Linux (systemd):
sudo systemctl start postgresql
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/bibliosmart"

# JWT Secrets (generate strong random strings)
JWT_ACCESS_SECRET="your-secure-access-secret-here"
JWT_REFRESH_SECRET="your-secure-refresh-secret-here"

# Server
PORT=5001
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"

# Stripe (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY="sk_test_your_key_here"
STRIPE_PUBLISHABLE_KEY="pk_test_your_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
```

### 4. Set Up Database

Create and migrate the database:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (for development)
npx prisma db push

# Or create a migration (for production)
npx prisma migrate dev --name init
```

### 5. Seed Database

Populate with initial data (admin user + sample books):

```bash
npm run seed
```

**Default Admin:**
- Email: `admin@library.com`
- Password: `admin123`

## Development

Start the development server with hot reload:

```bash
npm run dev
```

The API will be available at `http://localhost:5001`

## Scripts

```bash
# Development
npm run dev              # Start dev server with watch mode
npm run build            # Compile TypeScript to JavaScript
npm start               # Start production server

# Database
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run seed            # Seed database with initial data

# Code Quality
npm run lint            # Run ESLint
```

## Database Schema

### User
- id (String, CUID)
- email (String, unique)
- passwordHash (String)
- name (String)
- role (Enum: ADMIN, USER)
- purchases (Purchase[])
- favorites (Favorite[])
- notifications (Notification[])
- createdAt, updatedAt

### Book
- id (String, CUID)
- title (String)
- author (String)
- category (String)
- isbn (String, unique, optional)
- coverUrl (String, optional)
- description (String, optional)
- pdfUrl (String, optional)
- price (Float, default: 0)
- year (Int, optional)
- totalPages (Int, optional)
- available (Boolean, default: true)
- tags (String[])
- purchases (Purchase[])
- favorites (Favorite[])
- createdAt, updatedAt

### Purchase
- id (String, CUID)
- amount (Float)
- status (Enum: PENDING, COMPLETED, FAILED, REFUNDED)
- stripeSessionId (String, optional, unique)
- user (User)
- userId (String)
- book (Book)
- bookId (String)
- purchaseDate (DateTime)
- createdAt, updatedAt
- Unique constraint: (userId, bookId)

## API Endpoints

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

### Quick Reference

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

**Books:**
- `GET /api/books` - List books (with pagination & filters)
- `GET /api/books/:id` - Get book details
- `POST /api/books` - Create book (admin)
- `PUT /api/books/:id` - Update book (admin)
- `DELETE /api/books/:id` - Delete book (admin)

**Purchases:**
- `GET /api/purchases` - List all purchases (admin)
- `GET /api/purchases/user/:userId` - Get user purchases
- `POST /api/purchases/direct` - Create direct purchase
- `GET /api/purchases/stats` - Get statistics (admin)

**Stripe:**
- `POST /api/stripe/create-checkout-session` - Create payment session
- `POST /api/stripe/webhook` - Stripe webhook handler
- `GET /api/stripe/session/:sessionId` - Get session details

**Health:**
- `GET /api/health` - Health check

## Stripe Integration

### Setup

1. **Get API Keys:**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   - Copy test keys for development
   - Add to `.env` file

2. **Configure Webhook (Optional):**
   - Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
   - Add endpoint: `http://localhost:5001/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook secret to `.env`

### Payment Flow

1. Frontend calls `/api/stripe/create-checkout-session`
2. Backend creates Stripe session and returns `url`
3. Frontend redirects user to Stripe checkout
4. User completes payment
5. Stripe sends webhook to backend
6. Backend updates purchase status to COMPLETED
7. User can now access the book

### Testing Payments

Use Stripe test cards:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- Any future expiry date and any 3-digit CVC

## Database Management

### Prisma Studio

View and edit database with Prisma Studio:

```bash
npx prisma studio
```

Opens at `http://localhost:5555`

### Reset Database

⚠️ **This will delete all data!**

```bash
npx prisma migrate reset
npm run seed
```

### Backup Database

```bash
pg_dump bibliosmart > backup.sql
```

### Restore Database

```bash
psql bibliosmart < backup.sql
```

## Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` to git
   - Use strong random strings for JWT secrets
   - Rotate secrets regularly in production

2. **Passwords:**
   - Minimum 8 characters
   - Bcrypt hashing with salt rounds
   - Never store plain text passwords

3. **API Keys:**
   - Keep Stripe keys secret
   - Use test keys in development
   - Only switch to live keys in production

4. **CORS:**
   - Configure allowed origins in production
   - Don't use `*` wildcard in production

5. **Rate Limiting:**
   - Add rate limiting middleware for production
   - Prevent brute force attacks

## Production Deployment

### Checklist

- [ ] Use production environment variables
- [ ] Switch to Stripe live keys
- [ ] Configure proper CORS origins
- [ ] Enable HTTPS only
- [ ] Set up proper logging
- [ ] Add rate limiting
- [ ] Configure webhook signatures
- [ ] Set up database backups
- [ ] Use strong JWT secrets
- [ ] Enable monitoring

### Environment Variables

Update `.env` for production:

```env
NODE_ENV="production"
DATABASE_URL="postgresql://user:pass@production-host:5432/bibliosmart"
FRONTEND_URL="https://bibliosmart.com"
STRIPE_SECRET_KEY="sk_live_..."
```

### Database Migrations

Use `migrate deploy` in production:

```bash
npx prisma migrate deploy
```

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process on port 5001
lsof -ti:5001 | xargs kill -9
```

### Database Connection Failed

```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Check DATABASE_URL in .env
echo $DATABASE_URL
```

### Prisma Client Issues

```bash
# Regenerate Prisma Client
npx prisma generate
```

### Stripe Webhook Not Working

1. Check webhook secret in `.env`
2. Verify endpoint URL in Stripe Dashboard
3. Check server logs for errors
4. Use Stripe CLI to test locally:

```bash
stripe listen --forward-to localhost:5001/api/stripe/webhook
```

## Development Tools

- **Prisma Studio** - Database GUI
- **Postman/Insomnia** - API testing
- **Stripe CLI** - Local webhook testing
- **pgAdmin** - PostgreSQL administration

## Contributing

1. Create feature branch
2. Make changes
3. Add tests
4. Submit pull request

## License

MIT

---

**Need Help?**
- Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Review [../ADMIN_SETUP_GUIDE.md](../ADMIN_SETUP_GUIDE.md)
- Check Prisma logs: `npx prisma studio`
- Review server logs in terminal

---

*Last Updated: December 2025*
