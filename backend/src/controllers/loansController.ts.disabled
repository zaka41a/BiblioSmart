import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { prisma } from "../prisma";

export const borrowBook = async (req: AuthenticatedRequest, res: Response) => {
  const { bookId, dueDate } = req.body as { bookId: string; dueDate: string };
  if (!req.user) return res.status(401).json({ message: "Authentification requise" });

  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book || book.available < 1) {
    return res.status(400).json({ message: "Livre indisponible" });
  }

  const loan = await prisma.$transaction(async (tx) => {
    await tx.book.update({ where: { id: bookId }, data: { available: { decrement: 1 } } });
    return tx.loan.create({
      data: {
        bookId,
        userId: req.user!.id,
        dueDate: new Date(dueDate)
      }
    });
  });

  return res.status(201).json(loan);
};

export const returnBook = async (req: AuthenticatedRequest, res: Response) => {
  const { loanId } = req.params;
  const loan = await prisma.loan.findUnique({ where: { id: loanId } });
  if (!loan) return res.status(404).json({ message: "Emprunt introuvable" });

  await prisma.$transaction(async (tx) => {
    await tx.loan.update({
      where: { id: loanId },
      data: { status: "RETURNED", returnedAt: new Date() }
    });
    await tx.book.update({ where: { id: loan.bookId }, data: { available: { increment: 1 } } });
  });

  return res.status(200).json({ message: "Livre rendu" });
};
