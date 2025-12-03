import { Request, Response } from "express";
import { prisma } from "../prisma";

export const listBooks = async (req: Request, res: Response) => {
  const { page = "1", pageSize = "12", query = "", genre = "", available = "false" } = req.query;
  const take = Number(pageSize);
  const skip = (Number(page) - 1) * take;

  const where = {
    AND: [
      query
        ? {
            OR: [
              { title: { contains: query as string, mode: "insensitive" } },
              { author: { contains: query as string, mode: "insensitive" } },
              { category: { contains: query as string, mode: "insensitive" } }
            ]
          }
        : {},
      genre ? { category: { equals: genre as string, mode: "insensitive" } } : {},
      available === "true" ? { available: { gt: 0 } } : {}
    ]
  };

  const [items, total] = await Promise.all([
    prisma.book.findMany({ where, skip, take, orderBy: { createdAt: "desc" } }),
    prisma.book.count({ where })
  ]);

  return res.json({ items, total, page: Number(page), pageSize: take });
};

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) {
    return res.status(404).json({ message: "Livre introuvable" });
  }
  return res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const book = await prisma.book.create({ data: req.body });
  return res.status(201).json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await prisma.book.update({ where: { id }, data: req.body });
  return res.json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.book.delete({ where: { id } });
  return res.status(204).send();
};
