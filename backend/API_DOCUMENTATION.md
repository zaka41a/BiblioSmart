# BiblioSmart Backend API Documentation

## Base URL
```
http://localhost:5001/api
```

## Table of Contents
1. [Authentication](#authentication)
2. [Books](#books)
3. [Users](#users)
4. [Purchases](#purchases)
5. [Stripe Payments](#stripe-payments)

---

## Authentication

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "id": "clxxx...",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "createdAt": "2025-12-06T19:03:21.021Z"
}
```

### Login
**POST** `/auth/login`

Authenticate user and receive JWT tokens.

**Request Body:**
```json
{
  "email": "admin@library.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "user": {
    "id": "clxxx...",
    "email": "admin@library.com",
    "name": "Admin",
    "role": "ADMIN"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### Logout
**POST** `/auth/logout`

Invalidate user session.

---

## Books

### List All Books
**GET** `/books`

Get paginated list of books with optional filters.

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `pageSize` (number, default: 12) - Items per page
- `query` (string) - Search term for title, author, or category
- `genre` (string) - Filter by category
- `available` (boolean) - Filter by availability

**Example:**
```
GET /books?page=1&pageSize=10&query=JavaScript&available=true
```

**Response:**
```json
{
  "items": [
    {
      "id": "cmiunvzjx000334z2c5zfwmn9",
      "title": "JavaScript: The Good Parts",
      "author": "Douglas Crockford",
      "category": "Programming",
      "isbn": "9780596517748",
      "coverUrl": null,
      "description": "A deep dive into the beautiful and elegant parts of JavaScript.",
      "pdfUrl": "https://example.com/javascript.pdf",
      "price": 0,
      "year": 2008,
      "totalPages": 176,
      "available": true,
      "tags": ["JavaScript", "Web Development"],
      "createdAt": "2025-12-06T19:03:21.021Z",
      "updatedAt": "2025-12-06T19:03:21.021Z"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 10
}
```

### Get Book by ID
**GET** `/books/:id`

Get detailed information about a specific book.

**Response:**
```json
{
  "id": "cmiunvzjx000334z2c5zfwmn9",
  "title": "JavaScript: The Good Parts",
  "author": "Douglas Crockford",
  "category": "Programming",
  "isbn": "9780596517748",
  "coverUrl": null,
  "description": "A deep dive into the beautiful and elegant parts of JavaScript.",
  "pdfUrl": "https://example.com/javascript.pdf",
  "price": 0,
  "year": 2008,
  "totalPages": 176,
  "available": true,
  "tags": ["JavaScript", "Web Development"],
  "createdAt": "2025-12-06T19:03:21.021Z",
  "updatedAt": "2025-12-06T19:03:21.021Z"
}
```

### Create Book (Admin Only)
**POST** `/books`

Add a new book to the library.

**Request Body:**
```json
{
  "title": "Clean Architecture",
  "author": "Robert C. Martin",
  "category": "Software Engineering",
  "isbn": "9780134494166",
  "description": "A craftsman's guide to software structure and design.",
  "pdfUrl": "https://example.com/clean-architecture.pdf",
  "price": 34.99,
  "year": 2017,
  "totalPages": 432,
  "available": true,
  "tags": ["Architecture", "Design"]
}
```

**Response:**
```json
{
  "id": "clxxx...",
  "title": "Clean Architecture",
  "author": "Robert C. Martin",
  ...
}
```

### Update Book (Admin Only)
**PUT** `/books/:id`

Update book information.

**Request Body:** (same as Create Book)

### Delete Book (Admin Only)
**DELETE** `/books/:id`

Remove a book from the library.

**Response:** `204 No Content`

---

## Users

### List All Users (Admin Only)
**GET** `/users`

Get list of all registered users.

**Response:**
```json
[
  {
    "id": "clxxx...",
    "email": "admin@library.com",
    "name": "Admin",
    "role": "ADMIN",
    "createdAt": "2025-12-06T19:03:21.021Z",
    "updatedAt": "2025-12-06T19:03:21.021Z"
  }
]
```

### Get User by ID
**GET** `/users/:id`

Get user information by ID.

### Update User
**PUT** `/users/:id`

Update user information.

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

### Delete User (Admin Only)
**DELETE** `/users/:id`

Remove a user account.

---

## Purchases

### Get All Purchases (Admin Only)
**GET** `/purchases`

Get list of all purchases in the system.

**Response:**
```json
[
  {
    "id": "clxxx...",
    "userId": "clxxx...",
    "bookId": "clxxx...",
    "amount": 29.99,
    "status": "COMPLETED",
    "stripeSessionId": "cs_test_xxx",
    "purchaseDate": "2025-12-06T19:03:21.021Z",
    "createdAt": "2025-12-06T19:03:21.021Z",
    "updatedAt": "2025-12-06T19:03:21.021Z",
    "book": {
      "id": "clxxx...",
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt & David Thomas",
      "price": 29.99
    },
    "user": {
      "id": "clxxx...",
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
]
```

### Get User Purchases
**GET** `/purchases/user/:userId`

Get all purchases for a specific user.

**Response:** Same as above, filtered by userId

### Create Direct Purchase
**POST** `/purchases/direct`

Create a purchase directly (for free books or when Stripe is not configured).

**Request Body:**
```json
{
  "userId": "clxxx...",
  "bookId": "clxxx..."
}
```

**Response:**
```json
{
  "id": "clxxx...",
  "userId": "clxxx...",
  "bookId": "clxxx...",
  "amount": 0,
  "status": "COMPLETED",
  "purchaseDate": "2025-12-06T19:03:21.021Z",
  "book": { ... },
  "user": { ... }
}
```

### Get Purchase Statistics (Admin Only)
**GET** `/purchases/stats`

Get aggregated purchase statistics.

**Response:**
```json
{
  "totalPurchases": 42,
  "totalRevenue": 1250.75,
  "byStatus": [
    {
      "status": "COMPLETED",
      "_count": 38
    },
    {
      "status": "PENDING",
      "_count": 3
    },
    {
      "status": "FAILED",
      "_count": 1
    }
  ]
}
```

---

## Stripe Payments

### Create Checkout Session
**POST** `/stripe/create-checkout-session`

Create a Stripe checkout session for purchasing a book.

**Request Body:**
```json
{
  "userId": "clxxx...",
  "bookId": "clxxx..."
}
```

**Response:**
```json
{
  "sessionId": "cs_test_xxx",
  "url": "https://checkout.stripe.com/c/pay/cs_test_xxx..."
}
```

**Flow:**
1. Frontend calls this endpoint to create checkout session
2. Frontend redirects user to `url` for payment
3. User completes payment on Stripe
4. Stripe redirects to success_url with session_id
5. Stripe sends webhook to backend
6. Backend marks purchase as COMPLETED

### Stripe Webhook
**POST** `/stripe/webhook`

Webhook endpoint for Stripe events (handled automatically).

**Supported Events:**
- `checkout.session.completed` - Updates purchase status to COMPLETED
- `payment_intent.succeeded` - Logs successful payment
- `payment_intent.payment_failed` - Updates purchase status to FAILED

**Note:** This endpoint requires Stripe signature verification.

### Get Checkout Session
**GET** `/stripe/session/:sessionId`

Retrieve Stripe checkout session details.

**Response:**
```json
{
  "id": "cs_test_xxx",
  "amount_total": 2999,
  "currency": "usd",
  "payment_status": "paid",
  "metadata": {
    "userId": "clxxx...",
    "bookId": "clxxx...",
    "purchaseId": "clxxx..."
  }
}
```

---

## Error Responses

All endpoints may return these error responses:

**400 Bad Request**
```json
{
  "error": "Validation error message"
}
```

**401 Unauthorized**
```json
{
  "error": "Authentication required"
}
```

**403 Forbidden**
```json
{
  "error": "Insufficient permissions"
}
```

**404 Not Found**
```json
{
  "error": "Resource not found",
  "message": "Livre introuvable"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

---

## Authentication

Most endpoints require authentication using JWT tokens.

Include the access token in the request headers:

```
Authorization: Bearer eyJhbGc...
```

Or include it in cookies (if using cookie-based auth):

```
Cookie: accessToken=eyJhbGc...
```

---

## Payment Status

Purchase status values:
- `PENDING` - Payment initiated but not completed
- `COMPLETED` - Payment successful
- `FAILED` - Payment failed
- `REFUNDED` - Payment refunded

---

## User Roles

- `ADMIN` - Full access to all endpoints
- `USER` - Limited access to their own data

---

## Testing

### Health Check
**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-06T19:08:24.798Z"
}
```

### Test with cURL

```bash
# List books
curl http://localhost:5001/api/books

# Get specific book
curl http://localhost:5001/api/books/cmiunvzjx000334z2c5zfwmn9

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@library.com","password":"admin123"}'
```

---

## Default Admin Credentials

**Email:** `admin@library.com`
**Password:** `admin123`

⚠️ **Change these credentials in production!**

---

*Last Updated: December 2025*
