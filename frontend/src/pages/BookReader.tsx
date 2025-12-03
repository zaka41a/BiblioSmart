import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiBookmark,
  FiSettings,
  FiDownload
} from "react-icons/fi";
import { useBooks } from "../context/BookContext";
import { usePurchases } from "../context/PurchaseContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { useState } from "react";

export const BookReader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookById } = useBooks();
  const { canUserAccessBook } = usePurchases();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const book = id ? getBookById(id) : undefined;

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Book not found</h1>
          <Button variant="primary" onClick={() => navigate("/catalogue")} className="mt-4">
            Back to Catalogue
          </Button>
        </div>
      </div>
    );
  }

  if (!user || !canUserAccessBook(user.id, book.id, book.price)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Access Denied</h1>
          <p className="mt-2 text-slate-600">
            {book.price === 0
              ? "Please log in to read this book."
              : "You must purchase this book to read it."}
          </p>
          <Button variant="primary" onClick={() => navigate("/catalogue")} className="mt-4">
            Back to Catalogue
          </Button>
        </div>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    // In a real app, this would download the actual PDF file
    alert(`Downloading "${book.title}" as PDF...\n\nIn a real application, this would trigger a PDF download of the book.`);
  };

  const totalPages = 250; // Mock total pages

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-lg"
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/utilisateur")}
                className="flex items-center gap-2 text-slate-600 transition-colors hover:text-emerald-600"
              >
                <FiArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-600">
                Page <span className="font-bold text-slate-900">{currentPage}</span> of {totalPages}
              </div>
              <Button variant="outline" onClick={handleDownloadPDF}>
                <FiDownload className="inline h-4 w-4 mr-1" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Book Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border-b border-slate-200 bg-white/50 py-4"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
              <FiBookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">{book.title}</h1>
              <p className="text-sm text-slate-600">by {book.author}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reading Area */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-white p-12 shadow-soft-xl"
        >
          <div className="prose prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-slate-700">
              This is a demo reading experience for <span className="font-bold">{book.title}</span>.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              In a real implementation, this area would display the actual book content, with pagination,
              bookmarking, highlighting, and other reading features.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              {book.description || "The book's content would appear here with proper formatting, images, and interactive elements to enhance the reading experience."}
            </p>
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
              <p className="text-base text-slate-600">
                <strong>Book Information:</strong>
                <br />
                Category: {book.category} | Year: {book.year} | ISBN: {book.isbn}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-between"
        >
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <FiChevronLeft className="h-5 w-5" />
            Previous Page
          </Button>

          <div className="flex items-center gap-3">
            <button className="rounded-full bg-white p-3 shadow-soft-md transition-all hover:scale-105 hover:shadow-soft-lg">
              <FiBookmark className="h-5 w-5 text-slate-600" />
            </button>
            <button className="rounded-full bg-white p-3 shadow-soft-md transition-all hover:scale-105 hover:shadow-soft-lg">
              <FiSettings className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            Next Page
            <FiChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default BookReader;
