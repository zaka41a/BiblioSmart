import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { authRouter } from "./routes/auth";
import { booksRouter } from "./routes/books";
import { loansRouter } from "./routes/loans";
import { usersRouter } from "./routes/users";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);
app.use("/api/loans", loansRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

const port = Number(process.env.PORT ?? 5001);
app.listen(port, () => {
  console.log(`API BiblioSmart en écoute sur http://localhost:${port}`);
});
