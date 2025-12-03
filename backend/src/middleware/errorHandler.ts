import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Error]", error);
  return res.status(500).json({ message: "Une erreur inattendue est survenue." });
};
