import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// Import essential routes only
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import usersRoutes from "./routes/usersRoutes";
import purchasesRoutes from "./routes/purchasesRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { apiLimiter } from "./middleware/rateLimiter";

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting for API routes
app.use("/api/", apiLimiter);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  })
);

// Body parsing middleware
app.use(express.json());
app.use(cookieParser());

// Logging middleware
app.use(morgan("dev"));

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "BiblioSmart API"
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/purchases", purchasesRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const port = Number(process.env.PORT || 5001);
app.listen(port, () => {
  console.log(`\n🚀 BiblioSmart API running on http://localhost:${port}`);
  console.log(`📚 Health check: http://localhost:${port}/api/health\n`);
});
