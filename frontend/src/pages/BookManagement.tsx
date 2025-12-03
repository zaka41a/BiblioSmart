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
  FiAlertCircle
} from "react-icons/fi";
import { useBooks } from "../context/BookContext";
import { Button } from "../components/ui/Button";

export const BookManagement = () => {
  const { books, addBook, updateBook, deleteBook } = useBooks();
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
    description: ""
  });

  const categories = ["Fiction", "Science Fiction", "Technical", "Essay", "Youth", "Comics", "Poetry", "History", "Biography"];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.isbn.includes(searchQuery)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      updateBook(editingBook, formData);
    } else {
      addBook(formData);
    }
    resetForm();
  };

  const handleEdit = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        year: book.year,
        isbn: book.isbn,
        available: book.available,
        price: book.price,
        description: book.description || ""
      });
      setEditingBook(bookId);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (bookId: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(bookId);
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
      description: ""
    });
    setEditingBook(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-10 shadow-soft-lg border border-emerald-200/30"
      >
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />

        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-4 py-2 backdrop-blur-sm">
            <FiBookOpen className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Book Management</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
                Manage <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Books</span>
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                Add, edit, or remove books from your library catalog
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 font-bold text-white shadow-soft-lg transition-all hover:shadow-glow"
            >
              <FiPlus className="h-5 w-5" />
              Add Book
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search by title, author, or ISBN..."
          className="w-full rounded-2xl border-2 border-slate-200 bg-white px-16 py-4 text-base text-slate-700 transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Title</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Author</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Category</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Year</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">ISBN</th>
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
                  <td className="py-4 text-sm font-medium text-slate-900">{book.title}</td>
                  <td className="py-4 text-sm text-slate-600">{book.author}</td>
                  <td className="py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {book.category}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-600">{book.year}</td>
                  <td className="py-4 text-sm font-mono text-slate-600">{book.isbn}</td>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-soft-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingBook ? "Edit Book" : "Add New Book"}
              </h2>
              <button
                onClick={resetForm}
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 font-mono text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Price (USD) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                    placeholder="0.00 (Free)"
                  />
                  <p className="mt-1 text-xs text-slate-500">Enter 0 for free books</p>
                </div>

                <div className="flex items-center gap-3">
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

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 font-bold text-white shadow-soft-lg transition-all hover:shadow-glow"
                >
                  <FiSave className="h-5 w-5" />
                  {editingBook ? "Update Book" : "Add Book"}
                </motion.button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border-2 border-slate-200 px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BookManagement;
