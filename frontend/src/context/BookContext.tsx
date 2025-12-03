import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  isbn: string;
  available: boolean;
  price: number; // 0 = free, >0 = paid (in euros/dollars)
  coverUrl?: string;
  description?: string;
}

interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, "id">) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  getBookById: (id: string) => Book | undefined;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  // Load books from localStorage on mount
  useEffect(() => {
    const storedBooks = localStorage.getItem("bibliosmart_books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      // Initialize with some sample books
      const initialBooks: Book[] = [
        {
          id: "book-1",
          title: "The Art of Computer Programming",
          author: "Donald Knuth",
          category: "Technical",
          year: 1968,
          isbn: "978-0-201-03801-3",
          available: true,
          price: 29.99, // Paid book
          description: "A comprehensive monograph written by computer scientist Donald Knuth."
        },
        {
          id: "book-2",
          title: "Clean Code",
          author: "Robert C. Martin",
          category: "Technical",
          year: 2008,
          isbn: "978-0-132-35088-4",
          available: true,
          price: 0, // Free book
          description: "A Handbook of Agile Software Craftsmanship."
        },
        {
          id: "book-3",
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          category: "Fiction",
          year: 1960,
          isbn: "978-0-061-12008-4",
          available: true,
          price: 15.50, // Paid book
          description: "A novel about racial injustice in the American South."
        }
      ];
      setBooks(initialBooks);
      localStorage.setItem("bibliosmart_books", JSON.stringify(initialBooks));
    }
  }, []);

  // Save books to localStorage whenever they change
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem("bibliosmart_books", JSON.stringify(books));
    }
  }, [books]);

  const addBook = (book: Omit<Book, "id">) => {
    const newBook: Book = {
      ...book,
      id: `book-${Date.now()}`
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = (id: string, updatedBook: Partial<Book>) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
    );
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const getBookById = (id: string) => {
    return books.find((book) => book.id === id);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        updateBook,
        deleteBook,
        getBookById
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
