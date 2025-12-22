import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiZoomOut,
  FiDownload,
  FiMaximize,
  FiMinimize
} from "react-icons/fi";
import { useBooks } from "../context/BookContext";
import { usePurchases } from "../context/PurchaseContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const BookReader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookById } = useBooks();
  const { canUserAccessBook } = usePurchases();
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (!user || !canUserAccessBook(book.id, book.price || 0)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Access Denied</h1>
          <p className="mt-2 text-slate-600">
            {!book.price || book.price === 0
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
    if (book.pdfUrl) {
      const link = document.createElement('a');
      link.href = book.pdfUrl;
      link.download = `${book.title}.pdf`;
      link.click();
    } else {
      alert(`PDF file not available for "${book.title}"`);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    console.log(`PDF loaded successfully: ${numPages} pages`);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setLoading(false);
    setError(`Failed to load PDF: ${error.message}. This might be due to CORS restrictions or an invalid PDF URL.`);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(numPages || 1, prev + 1));
  };

  // Show demo content if no PDF URL
  if (!book.pdfUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
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
            </div>
          </div>
        </motion.header>

        <div className="mx-auto max-w-4xl px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-12 shadow-soft-xl text-center"
          >
            <FiBookOpen className="h-16 w-16 mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">PDF Not Available</h2>
            <p className="text-slate-600 mb-6">
              This book doesn't have a PDF file associated yet. Please add a PDF URL in the book management section.
            </p>
            <Button variant="primary" onClick={() => navigate("/catalogue")}>
              Back to Catalogue
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
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
              <div className="hidden md:block text-lg font-bold text-slate-900">{book.title}</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-600">
                Page <span className="font-bold text-slate-900">{currentPage}</span> / {numPages || '...'}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 transition-colors"
                  title="Zoom Out"
                >
                  <FiZoomOut className="h-4 w-4" />
                </button>
                <span className="text-sm text-slate-600 min-w-[50px] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 transition-colors"
                  title="Zoom In"
                >
                  <FiZoomIn className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <FiMinimize className="h-4 w-4" /> : <FiMaximize className="h-4 w-4" />}
              </button>
              <Button variant="outline" onClick={handleDownloadPDF}>
                <FiDownload className="inline h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* PDF Viewer */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          {error && (
            <div className="rounded-3xl bg-red-50 border-2 border-red-200 p-8 max-w-2xl text-center">
              <div className="text-red-600 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-900 mb-2">Error Loading PDF</h3>
              <p className="text-sm text-red-700 mb-4">{error}</p>
              <div className="text-xs text-red-600 bg-red-100 rounded-lg p-3 mb-4">
                <p className="font-semibold mb-1">PDF URL:</p>
                <p className="break-all">{book.pdfUrl}</p>
              </div>
              <Button variant="primary" onClick={() => {
                setError(null);
                setLoading(true);
                window.location.reload();
              }}>
                Try Again
              </Button>
            </div>
          )}

          {!error && (
            <div className="shadow-2xl rounded-lg overflow-hidden bg-white">
              <Document
                file={book.pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
                    <p className="text-sm text-slate-600">Loading PDF...</p>
                    <p className="text-xs text-slate-400 mt-2">This may take a few moments</p>
                  </div>
                }
                error={
                  <div className="rounded-lg bg-red-50 p-8 max-w-md text-center">
                    <p className="text-red-600">Error rendering PDF</p>
                  </div>
                }
              >
                <Page
                  pageNumber={currentPage}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  loading={
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    </div>
                  }
                />
              </Document>
            </div>
          )}

          {/* Navigation Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <Button
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <FiChevronLeft className="h-5 w-5" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={numPages || 1}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= (numPages || 1)) {
                    setCurrentPage(page);
                  }
                }}
                className="w-16 px-2 py-1 text-center border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
              <span className="text-slate-600">/ {numPages || '...'}</span>
            </div>

            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === numPages}
              className="flex items-center gap-2"
            >
              Next
              <FiChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookReader;
