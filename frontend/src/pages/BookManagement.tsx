import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiX,
  FiSave,
  FiCheckCircle,
  FiAlertCircle,
  FiDollarSign,
  FiDownload,
  FiFileText,
  FiInfo,
  FiImage
} from "react-icons/fi";
import { useBooks } from "../context/BookContext";
import { Button } from "../components/ui/Button";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ui/Toast";

export const BookManagement = () => {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const { toasts, removeToast, success, error, warning } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    year: new Date().getFullYear(),
    isbn: "",
    available: true,
    price: 0,
    description: "",
    pdfUrl: "",
    coverUrl: "",
    totalPages: 0
  });

  const categories = ["Fiction", "Science Fiction", "Technical", "Essay", "Youth", "Comics", "Poetry", "History", "Biography"];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.isbn || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      warning("Please enter a book title");
      return;
    }
    if (!formData.author.trim()) {
      warning("Please enter an author name");
      return;
    }
    if (!formData.category) {
      warning("Please select a category");
      return;
    }

    try {
      if (editingBook) {
        await updateBook(editingBook, formData);
        success(`"${formData.title}" has been updated successfully!`);
      } else {
        await addBook(formData);
        success(`"${formData.title}" has been added to the library!`);
      }
      resetForm();
    } catch (err: any) {
      console.error("Save book error:", err);
      error(`Failed to save book: ${err.message || "Unknown error"}`);
    }
  };

  const handleEdit = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        year: book.year || new Date().getFullYear(),
        isbn: book.isbn || "",
        available: book.available,
        price: book.price || 0,
        description: book.description || "",
        pdfUrl: book.pdfUrl || "",
        coverUrl: book.coverUrl || "",
        totalPages: book.totalPages || 0
      });
      setEditingBook(bookId);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    const bookTitle = book ? book.title : "this book";

    if (window.confirm(`Are you sure you want to delete "${bookTitle}"?\n\nThis action cannot be undone.`)) {
      try {
        await deleteBook(bookId);
        success(`"${bookTitle}" has been deleted successfully!`);
      } catch (err: any) {
        console.error("Delete book error:", err);
        error(`Failed to delete book: ${err.message || "Unknown error"}`);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      category: "",
      year: new Date().getFullYear(),
      isbn: "",
      available: true,
      price: 0,
      description: "",
      pdfUrl: "",
      coverUrl: "",
      totalPages: 0
    });
    setEditingBook(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                <FiBookOpen className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Book Management</h1>
            </div>
            <p className="text-green-100">
              Manage your library books ({books.length} total)
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-green-600 transition-all hover:bg-green-50 shadow-md"
          >
            <FiPlus className="h-5 w-5" />
            Add Book
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-lg bg-white p-4 shadow-md border border-slate-200">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by title, author, or ISBN..."
            className="w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 py-2 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Books Table */}
      <div className="rounded-3xl bg-white p-6 shadow-soft-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">All Books ({filteredBooks.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Book</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Author</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Category</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Price</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Resources</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="pb-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <motion.tr
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {/* Book Cover Thumbnail */}
                      <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-md">
                        {book.coverUrl ? (
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`flex h-full w-full items-center justify-center ${book.coverUrl ? 'hidden' : ''}`}>
                          <FiBookOpen className="h-6 w-6 text-white/60" />
                        </div>
                      </div>

                      {/* Book Info */}
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{book.title}</p>
                        <p className="text-xs text-slate-500">{book.isbn || "No ISBN"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-slate-600">{book.author}</td>
                  <td className="py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {book.category}
                    </span>
                  </td>
                  <td className="py-4">
                    {!book.price || book.price === 0 ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <FiCheckCircle className="h-4 w-4" />
                        Free
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                        <FiDollarSign className="h-4 w-4" />
                        ${book.price.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col gap-1">
                      {/* PDF Status */}
                      {book.pdfUrl ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-teal-600">
                          <FiFileText className="h-3 w-3" />
                          PDF
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                          <FiAlertCircle className="h-3 w-3" />
                          No PDF
                        </span>
                      )}

                      {/* Cover Status */}
                      {book.coverUrl ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-purple-600">
                          <FiCheckCircle className="h-3 w-3" />
                          Cover
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                          <FiAlertCircle className="h-3 w-3" />
                          No Cover
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4">
                    {book.available ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <FiCheckCircle className="h-4 w-4" />
                        Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                        <FiAlertCircle className="h-4 w-4" />
                        Borrowed
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(book.id)}
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl rounded-3xl bg-white shadow-soft-xl my-8 max-h-[90vh] flex flex-col"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-white rounded-t-3xl border-b border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {editingBook ? "Edit Book" : "Add New PDF Book"}
                  </h2>
                  <p className="text-sm text-slate-600">Fill in the book details and PDF link</p>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Form Content */}
            <form id="book-form" onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
              {/* Basic Information */}
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <FiBookOpen className="h-5 w-5 text-emerald-600" />
                  Basic Information
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="The Great Gatsby"
                      className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Author *</label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="F. Scott Fitzgerald"
                      className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Category *</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Year *</label>
                    <input
                      type="number"
                      required
                      min="1000"
                      max={new Date().getFullYear()}
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">ISBN *</label>
                    <input
                      type="text"
                      required
                      value={formData.isbn}
                      onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                      placeholder="978-3-16-148410-0"
                      className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-mono text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="available"
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                      className="h-5 w-5 rounded border-slate-300 text-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <label htmlFor="available" className="text-sm font-semibold text-slate-700">
                      Available for reading
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="A brief description of the book..."
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-5 border-2 border-amber-200">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <FiDollarSign className="h-5 w-5 text-amber-600" />
                  Pricing
                </h3>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-xl border-2 border-amber-200 px-4 py-3 text-slate-700 transition-all focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
                    placeholder="0.00"
                  />
                  <div className="mt-2 flex items-start gap-2 rounded-xl bg-white/50 p-2.5">
                    <FiInfo className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <p className="font-semibold">Pricing Guide:</p>
                      <p>• $0.00 = <strong className="text-emerald-600">FREE</strong> • &gt;$0 = <strong className="text-amber-600">PAID</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF Configuration */}
              <div className="rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50 p-5 border-2 border-teal-200">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <FiFileText className="h-5 w-5 text-teal-600" />
                  PDF File Configuration
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      PDF URL
                    </label>
                    <input
                      type="text"
                      value={formData.pdfUrl}
                      onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                      placeholder="https://www.africau.edu/images/default/sample.pdf"
                      className="w-full rounded-xl border-2 border-teal-200 px-4 py-3 text-slate-700 transition-all focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10"
                    />
                    <p className="mt-1 text-xs text-slate-500">Leave empty if no PDF is available yet</p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Total Pages (Optional)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.totalPages}
                      onChange={(e) => setFormData({ ...formData, totalPages: parseInt(e.target.value) || 0 })}
                      placeholder="Auto-detected from PDF"
                      className="w-full rounded-xl border-2 border-teal-200 px-4 py-3 text-slate-700 transition-all focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10"
                    />
                  </div>

                  <div className="rounded-xl bg-white/50 p-3 space-y-2.5">
                    <div className="flex items-start gap-2">
                      <FiDownload className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-slate-700">
                        <p className="font-semibold mb-1">Free PDF Resources:</p>
                        <p className="text-[11px] leading-relaxed">
                          Project Gutenberg • Internet Archive • Open Library • Google Books
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-2 border-t border-teal-200">
                      <FiInfo className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-slate-700">
                        <p className="font-semibold">How to add PDF:</p>
                        <p className="text-[11px] leading-relaxed">Copy direct PDF URL (.pdf) and paste above</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image Configuration */}
              <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-5 border-2 border-purple-200">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <FiImage className="h-5 w-5 text-purple-600" />
                  Book Cover Image
                </h3>

                <div className="space-y-4">
                  {/* Cover URL Input */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Cover Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.coverUrl}
                      onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                      placeholder="https://m.media-amazon.com/images/I/book-cover.jpg"
                      className="w-full rounded-xl border-2 border-purple-200 px-4 py-3 text-slate-700 transition-all focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10"
                    />
                    <p className="mt-1 text-xs text-slate-500">Add a direct URL to the book cover image</p>
                  </div>

                  {/* Image Preview */}
                  {formData.coverUrl && (
                    <div className="rounded-xl bg-white/50 p-4 border border-purple-200">
                      <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <FiCheckCircle className="h-4 w-4 text-purple-600" />
                        Live Preview:
                      </p>
                      <div className="flex justify-center">
                        <div className="relative group">
                          <div className="h-48 w-32 overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-purple-100 to-pink-100">
                            <img
                              src={formData.coverUrl}
                              alt="Cover preview"
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<div class="flex h-full w-full items-center justify-center"><div class="text-center"><svg class="h-12 w-12 mx-auto text-red-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><p class="text-xs text-red-600 font-semibold">Invalid Image</p><p class="text-[10px] text-red-500 mt-1">Check URL</p></div></div>';
                                }
                              }}
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white rounded-full p-1.5 shadow-lg">
                            <FiCheckCircle className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Helper Text */}
                  <div className="rounded-xl bg-white/50 p-3 space-y-2.5">
                    <div className="flex items-start gap-2">
                      <FiImage className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-slate-700">
                        <p className="font-semibold mb-1">Where to find book covers:</p>
                        <p className="text-[11px] leading-relaxed">
                          Amazon Books • Google Books • Goodreads • Open Library
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-2 border-t border-purple-200">
                      <FiInfo className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-slate-700">
                        <p className="font-semibold mb-1">How to add cover:</p>
                        <p className="text-[11px] leading-relaxed">
                          Right-click on the book cover image → "Copy Image Address" → Paste above
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </form>

            {/* Sticky Footer with Buttons */}
            <div className="sticky bottom-0 z-10 bg-white rounded-b-3xl border-t border-slate-200 p-6">
              <div className="flex gap-3">
                <button
                  type="submit"
                  form="book-form"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-4 font-bold text-white shadow-soft-lg transition-all hover:shadow-glow"
                >
                  <FiSave className="h-5 w-5" />
                  {editingBook ? "Update Book" : "Add Book"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border-2 border-slate-200 px-6 py-4 font-semibold text-slate-700 transition-all hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default BookManagement;
