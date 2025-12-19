import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, firstName: true, lastName: true, role: true, favorites: true }
  });
  if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
  return res.json(user);
};

export const getRecommendations = async (req: Request, res: Response) => {
  const { id } = req.params;
  const favorites = await prisma.favorite.findMany({ where: { userId: id }, take: 5, include: { book: true } });
  const categories = favorites.map((fav) => fav.book.category);
  const suggestions = await prisma.book.findMany({
    where: { category: { in: categories.length ? categories : undefined } },
    take: 6
  });
  return res.json({ suggestions });
};
