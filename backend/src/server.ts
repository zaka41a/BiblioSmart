import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { authRouter } from "./routes/auth";
import { booksRouter } from "./routes/books";
import { usersRouter } from "./routes/users";
import { purchasesRouter } from "./routes/purchases";
import { stripeRouter } from "./routes/stripe";
import { organizationsRouter } from "./routes/organizations";
import { errorHandler } from "./middleware/errorHandler";
import { apiLimiter } from "./middleware/rateLimiter";

const app = express();

app.use(helmet());

// Apply rate limiting to all API routes
app.use("/api/", apiLimiter);
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true
  })
);

// Stripe webhook needs raw body, so we parse it separately before the main json parser
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);
app.use("/api/purchases", purchasesRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/organizations", organizationsRouter);

app.use(errorHandler);

const port = Number(process.env.PORT ?? 5001);
app.listen(port, () => {
  console.log(`API BiblioSmart en écoute sur http://localhost:${port}`);
});
