import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiFilter,
  FiBookOpen,
  FiCheckCircle,
  FiX,
  FiStar,
  FiLock,
  FiDollarSign
} from "react-icons/fi";
import { Button } from "../components/ui/Button";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useBooks } from "../context/BookContext";
import { usePurchases } from "../context/PurchaseContext";
import { useAuth } from "../context/AuthContext";

const genres = [
  { name: "Fiction", color: "from-emerald-500 via-teal-500 to-cyan-500" },
  { name: "Science Fiction", color: "from-emerald-500 via-teal-500 to-cyan-500" },
  { name: "Essay", color: "from-emerald-500 via-teal-500 to-cyan-500" },
  { name: "Youth", color: "from-emerald-500 via-teal-500 to-cyan-500" },
  { name: "Comics", color: "from-emerald-500 via-teal-500 to-cyan-500" },
  { name: "Poetry", color: "from-emerald-500 via-teal-500 to-cyan-500" }
];

export const Catalogue = () => {
  const { books } = useBooks();
  const { canUserAccessBook, hasUserPurchased, purchaseBook } = usePurchases();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const query = useDebouncedValue(searchInput, 300);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  // Filter books based on search and filters
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = !query ||
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.isbn.includes(query);

      const matchesGenre = !selectedGenre || book.category === selectedGenre;
      const matchesAvailability = !availabilityOnly || book.available;

      return matchesSearch && matchesGenre && matchesAvailability;
    });
  }, [books, query, selectedGenre, availabilityOnly]);

  const filtersSummary = useMemo(() => {
    const parts = [] as string[];
    if (query) parts.push(`Search: "${query}"`);
    if (selectedGenre) parts.push(`Genre: ${selectedGenre}`);
    if (availabilityOnly) parts.push("Available only");
    return parts.join(" · ") || "All books";
  }, [query, selectedGenre, availabilityOnly]);

  const handleReadBook = (book: any) => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Check if user can access the book
    if (canUserAccessBook(user.id, book.id, book.price)) {
      navigate(`/read/${book.id}`);
    } else {
      // Show payment modal for paid books
      setSelectedBook(book);
      setShowPaymentModal(true);
    }
  };

  const handlePurchase = () => {
    if (!user || !selectedBook) return;

    purchaseBook(user.id, selectedBook.id, selectedBook.price);
    setShowPaymentModal(false);
    setSelectedBook(null);

    // Redirect to read the book
    navigate(`/read/${selectedBook.id}`);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-10 shadow-soft-lg border border-emerald-200/30"
      >
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-1/2 left-1/2 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-4 py-2 backdrop-blur-sm">
            <FiBookOpen className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Complete Catalog</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Explore Our <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Collection</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Search, filter, and discover over 12,500 books. Results update in real-time.
          </p>
        </div>
      </motion.header>

      {/* Search and Filters */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-glass p-8"
      >
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search by title, author, ISBN..."
              className="w-full rounded-2xl border-2 border-slate-200 bg-white/80 px-16 py-4 text-base text-slate-700 backdrop-blur-sm transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-slate-200 p-1.5 transition-all hover:bg-slate-300"
              >
                <FiX className="h-4 w-4 text-slate-600" />
              </button>
            )}
          </div>

          {/* Genre Filters */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <FiFilter className="h-4 w-4" />
              <span>Filter by genre</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => {
                const active = genre.name === selectedGenre;
                return (
                  <motion.button
                    key={genre.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGenre(active ? "" : genre.name)}
                    className={`group relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                      active
                        ? "text-white shadow-soft-md"
                        : "border-2 border-slate-200 bg-white/60 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/30"
                    }`}
                  >
                    {active && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${genre.color}`} />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {active && <FiCheckCircle className="h-4 w-4" />}
                      {genre.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Availability Filter */}
          <label className="flex w-fit cursor-pointer items-center gap-3 rounded-full border-2 border-slate-200 bg-white/60 px-5 py-3 transition-all hover:border-emerald-500 hover:bg-emerald-50/30">
            <input
              type="checkbox"
              checked={availabilityOnly}
              onChange={(event) => setAvailabilityOnly(event.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
            <span className="text-sm font-medium text-slate-700">Show available books only</span>
          </label>

          {/* Active Filters Summary */}
          <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-cyan-50/30 px-4 py-3">
            <FiStar className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-medium text-slate-700">{filtersSummary}</span>
          </div>
        </div>
      </motion.section>

      {/* Books Grid */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">
            <span className="text-2xl font-bold text-slate-900">{filteredBooks.length}</span> results found
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book, index) => (
            <motion.article
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group card-premium overflow-hidden transition-all hover:scale-105"
            >
              {/* Book Cover */}
              <div className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiBookOpen className="h-20 w-20 text-white/40" />
                </div>

                {/* Availability Badge */}
                <div className="absolute right-3 top-3">
                  {book.available ? (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <FiCheckCircle className="h-3 w-3" />
                      Available
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      Borrowed
                    </span>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              {/* Book Info */}
              <div className="space-y-3 p-5">
                <div>
                  <h3 className="mb-1 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-500">{book.author}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">{book.category}</span>
                  <span>·</span>
                  <span>{book.year}</span>
                </div>

                {/* Price Badge */}
                {book.price > 0 ? (
                  <div className="flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5">
                    <FiDollarSign className="h-3 w-3 text-amber-600" />
                    <span className="text-xs font-bold text-amber-700">${book.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5">
                    <FiCheckCircle className="h-3 w-3 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700">Free</span>
                  </div>
                )}

                {/* Action Button */}
                {!user ? (
                  <Button
                    variant="outline"
                    className="!w-full !py-2.5"
                    onClick={() => navigate("/login")}
                  >
                    Login to Read
                  </Button>
                ) : book.price === 0 ? (
                  <Button
                    variant="primary"
                    className="!w-full !py-2.5"
                    onClick={() => handleReadBook(book)}
                  >
                    <FiBookOpen className="inline h-4 w-4 mr-1" />
                    Read Free
                  </Button>
                ) : hasUserPurchased(user.id, book.id) ? (
                  <Button
                    variant="primary"
                    className="!w-full !py-2.5"
                    onClick={() => handleReadBook(book)}
                  >
                    <FiBookOpen className="inline h-4 w-4 mr-1" />
                    Read Now
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="!w-full !py-2.5 !border-amber-500 !text-amber-600 hover:!bg-amber-50"
                    onClick={() => handleReadBook(book)}
                  >
                    <FiLock className="inline h-4 w-4 mr-1" />
                    Buy ${book.price.toFixed(2)}
                  </Button>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft-xl"
          >
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500">
                  <FiLock className="h-8 w-8 text-white" />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-slate-900">Purchase Book</h2>
                <p className="mt-2 text-sm text-slate-600">
                  This is a paid book. Complete the purchase to read it.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="font-bold text-slate-900">{selectedBook.title}</h3>
                <p className="text-sm text-slate-600">{selectedBook.author}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Price:</span>
                  <span className="text-2xl font-bold text-amber-600">
                    ${selectedBook.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-slate-500 text-center">
                  In a real application, this would integrate with a payment gateway like Stripe or PayPal. For this demo, clicking "Complete Purchase" will simulate a successful payment.
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="!flex-1"
                    onClick={() => {
                      setShowPaymentModal(false);
                      setSelectedBook(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className="!flex-1"
                    onClick={handlePurchase}
                  >
                    <FiCheckCircle className="inline h-4 w-4 mr-1" />
                    Complete Purchase
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Catalogue;
