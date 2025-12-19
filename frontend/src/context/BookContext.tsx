import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_ENDPOINTS, apiRequest } from "../config/api";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year?: number;
  isbn?: string;
  available: boolean;
  price?: number; // 0 or undefined = free, >0 = paid (in euros/dollars)
  coverUrl?: string;
  description?: string;
  pdfUrl?: string; // URL or path to the PDF file
  totalPages?: number; // Total number of pages in the book
  tags?: string[];
}

interface BooksResponse {
  items: Book[];
  total: number;
  page: number;
  pageSize: number;
}

interface BookContextType {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  addBook: (book: Omit<Book, "id">) => Promise<void>;
  updateBook: (id: string, book: Partial<Book>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  getBookById: (id: string) => Book | undefined;
  refreshBooks: () => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load books from API on mount
  const loadBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiRequest<{ books: Book[] } | BooksResponse>(API_ENDPOINTS.books);

      // Handle different response formats
      let booksData: Book[] = [];
      if ('books' in response) {
        // Backend format: { books: [...] }
        booksData = response.books;
      } else if ('items' in response) {
        // Paginated format: { items: [...], total, page, pageSize }
        booksData = response.items;
      } else if (Array.isArray(response)) {
        // Direct array format
        booksData = response;
      }

      setBooks(booksData);
    } catch (err: any) {
      console.error("Failed to load books from API:", err);
      setError(err.message || "Failed to load books");
      setBooks([]); // Clear books on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const addBook = async (book: Omit<Book, "id">) => {
    try {
      const newBook = await apiRequest<Book>(API_ENDPOINTS.books, {
        method: "POST",
        body: JSON.stringify(book),
      });
      setBooks((prev) => [...prev, newBook]);
      await loadBooks(); // Refresh to get latest data
    } catch (err: any) {
      console.error("Failed to add book:", err);
      const errorMessage = err.message || "Could not connect to server. Please check your connection.";
      throw new Error(errorMessage);
    }
  };

  const updateBook = async (id: string, updatedBook: Partial<Book>) => {
    try {
      const updated = await apiRequest<Book>(API_ENDPOINTS.bookById(id), {
        method: "PUT",
        body: JSON.stringify(updatedBook),
      });
      setBooks((prev) =>
        prev.map((book) => (book.id === id ? updated : book))
      );
      await loadBooks(); // Refresh to get latest data
    } catch (err: any) {
      console.error("Failed to update book:", err);
      const errorMessage = err.message || "Could not connect to server. Please check your connection.";
      throw new Error(errorMessage);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await apiRequest(API_ENDPOINTS.bookById(id), {
        method: "DELETE",
      });
      setBooks((prev) => prev.filter((book) => book.id !== id));
      await loadBooks(); // Refresh to get latest data
    } catch (err: any) {
      console.error("Failed to delete book:", err);
      const errorMessage = err.message || "Could not connect to server. Please check your connection.";
      throw new Error(errorMessage);
    }
  };

  const getBookById = (id: string) => {
    return books.find((book) => book.id === id);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        isLoading,
        error,
        addBook,
        updateBook,
        deleteBook,
        getBookById,
        refreshBooks: loadBooks
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};
