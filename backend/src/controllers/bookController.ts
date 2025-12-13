import { Response } from 'express';
import { AuthRequest } from '../types';
import { prisma } from '../config/database';

export const getAllBooks = async (req: AuthRequest, res: Response) => {
  try {
    const { category, search, available } = req.query;

    const where: any = {};

    if (category && category !== 'all') {
      where.category = category as string;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { author: { contains: search as string, mode: 'insensitive' } },
        { isbn: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (available !== undefined) {
      where.available = available === 'true';
    }

    const books = await prisma.book.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: { books },
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch books',
    });
  }
};

export const getBookById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found',
      });
    }

    res.json({
      success: true,
      data: { book },
    });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch book',
    });
  }
};

export const createBook = async (req: AuthRequest, res: Response) => {
  try {
    const { title, author, isbn, category, year, price, description, coverUrl, pdfUrl } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        category,
        year: parseInt(year),
        price: parseFloat(price),
        description,
        coverUrl,
        pdfUrl,
        available: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: { book },
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create book',
    });
  }
};

export const updateBook = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, category, year, price, description, coverUrl, pdfUrl, available } = req.body;

    const book = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        isbn,
        category,
        year: year ? parseInt(year) : undefined,
        price: price ? parseFloat(price) : undefined,
        description,
        coverUrl,
        pdfUrl,
        available,
      },
    });

    res.json({
      success: true,
      message: 'Book updated successfully',
      data: { book },
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update book',
    });
  }
};

export const deleteBook = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.book.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Book deleted successfully',
    });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete book',
    });
  }
};

export const getBookStats = async (req: AuthRequest, res: Response) => {
  try {
    const [total, availableCount, categories, recentBooks] = await Promise.all([
      prisma.book.count(),
      prisma.book.count({ where: { available: true } }),
      prisma.book.groupBy({
        by: ['category'],
        _count: { category: true },
      }),
      prisma.book.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.json({
      success: true,
      data: {
        total,
        available: availableCount,
        unavailable: total - availableCount,
        genres: categories.length,
        categories: categories.map((c) => ({
          name: c.category,
          count: c._count.category,
        })),
        recentBooks,
      },
    });
  } catch (error) {
    console.error('Get book stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch book statistics',
    });
  }
};
