import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiFilter,
  FiBookOpen,
  FiCheckCircle,
  FiX,
  FiStar,
  FiLock,
  FiDollarSign,
  FiUser,
  FiCalendar,
  FiTrendingUp,
  FiZap,
  FiHeart
} from "react-icons/fi";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useBooks } from "../context/BookContext";
import { usePurchases } from "../context/PurchaseContext";
import { useAuth } from "../context/AuthContext";

const genres = [
  { name: "Fiction", color: "from-violet-500 via-purple-500 to-fuchsia-500", bgColor: "bg-violet-50", iconColor: "text-violet-600" },
  { name: "Science Fiction", color: "from-blue-500 via-cyan-500 to-teal-500", bgColor: "bg-blue-50", iconColor: "text-blue-600" },
  { name: "Essay", color: "from-amber-500 via-orange-500 to-red-500", bgColor: "bg-amber-50", iconColor: "text-amber-600" },
  { name: "Youth", color: "from-pink-500 via-rose-500 to-red-500", bgColor: "bg-pink-50", iconColor: "text-pink-600" },
  { name: "Comics", color: "from-emerald-500 via-green-500 to-teal-500", bgColor: "bg-emerald-50", iconColor: "text-emerald-600" },
  { name: "Poetry", color: "from-indigo-500 via-purple-500 to-pink-500", bgColor: "bg-indigo-50", iconColor: "text-indigo-600" },
  { name: "Technology", color: "from-cyan-500 via-sky-500 to-blue-500", bgColor: "bg-cyan-50", iconColor: "text-cyan-600" },
  { name: "Programming", color: "from-green-500 via-emerald-500 to-teal-500", bgColor: "bg-green-50", iconColor: "text-green-600" },
  { name: "Computer Science", color: "from-blue-600 via-indigo-600 to-violet-600", bgColor: "bg-blue-50", iconColor: "text-blue-700" },
  { name: "Software Engineering", color: "from-teal-500 via-cyan-500 to-sky-500", bgColor: "bg-teal-50", iconColor: "text-teal-600" }
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
        (book.isbn || "").toLowerCase().includes(query.toLowerCase());

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

  // Stats
  const stats = useMemo(() => {
    const availableCount = books.filter(b => b.available).length;
    const freeCount = books.filter(b => !b.price || b.price === 0).length;
    return {
      total: books.length,
      available: availableCount,
      free: freeCount,
      genres: new Set(books.map(b => b.category)).size
    };
  }, [books]);

  const handleReadBook = (book: any) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (canUserAccessBook(book.id, book.price)) {
      navigate(`/read/${book.id}`);
    } else {
      setSelectedBook(book);
      setShowPaymentModal(true);
    }
  };

  const handlePurchase = async () => {
    if (!user || !selectedBook) return;

    const purchased = await purchaseBook(selectedBook.id);
    if (purchased) {
      setShowPaymentModal(false);
      const targetId = selectedBook.id;
      setSelectedBook(null);
      navigate(`/read/${targetId}`);
    }
  };

  return (
    <div className="relative space-y-12">
      {/* Hero Section */}
      <header className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-10 shadow-lg">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

        <div className="relative space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-4xl font-black text-white md:text-5xl leading-tight mb-3">
              Explore Our <span className="text-lime-200">Collection</span>
            </h1>

            <p className="max-w-2xl text-lg text-white/90 font-medium leading-relaxed">
              Search and discover {stats.total} books across {stats.genres} genres
            </p>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-md">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search by title, author, ISBN..."
              className="w-full rounded-lg border border-slate-300 bg-white px-12 py-3 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-200 p-1 text-slate-600 hover:bg-slate-300"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Genre Filters */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FiFilter className="h-4 w-4 text-emerald-600" />
              <p className="text-sm font-semibold text-slate-700">Filter By Genre</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => {
                const active = genre.name === selectedGenre;
                return (
                  <button
                    key={genre.name}
                    onClick={() => setSelectedGenre(active ? "" : genre.name)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-emerald-600 text-white"
                        : "border border-slate-300 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {active && <FiCheckCircle className="inline h-4 w-4 mr-1" />}
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability Toggle */}
          <label className="flex w-fit cursor-pointer items-center gap-3 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2">
            <input
              type="checkbox"
              checked={availabilityOnly}
              onChange={(event) => setAvailabilityOnly(event.target.checked)}
              className="h-5 w-5 rounded border-emerald-500 text-emerald-600 focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
            />
            <span className="text-sm font-semibold text-emerald-900">Show Available Only</span>
          </label>

          {/* Active Filters Summary */}
          <div className="flex items-center gap-3 rounded-lg bg-slate-100 border border-slate-200 px-4 py-3">
            <FiTrendingUp className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-xs font-semibold text-slate-600">Active Filters</p>
              <p className="text-sm font-bold text-slate-900">{filtersSummary}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600 shadow-lg">
            <FiBookOpen className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-600">Search Results</p>
            <p className="text-3xl font-bold text-slate-900">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'Book' : 'Books'}
            </p>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBooks.map((book) => {
          const genreInfo = genres.find(g => g.name === book.category) || genres[0];

          return (
            <article
              key={book.id}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl border border-slate-200 transition-all"
            >
              {/* Book Cover Section */}
              <div className="relative h-72 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                {/* Cover Image */}
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const gradient = document.createElement('div');
                          gradient.className = `absolute inset-0 bg-gradient-to-br ${genreInfo.color} opacity-20`;
                          parent.appendChild(gradient);
                          const icon = document.createElement('div');
                          icon.className = 'absolute inset-0 flex items-center justify-center z-10';
                          icon.innerHTML = '<svg class="h-24 w-24 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>';
                          parent.appendChild(icon);
                        }
                    }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-slate-100" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiBookOpen className="h-20 w-20 text-slate-300" />
                    </div>
                  </>
                )}

                {/* Availability Badge */}
                <div className="absolute right-3 top-3 z-20">
                  {book.available ? (
                    <span className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
                      <FiCheckCircle className="h-3.5 w-3.5" />
                      Available
                    </span>
                  ) : (
                    <span className="rounded-lg bg-slate-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
                      Borrowed
                    </span>
                  )}
                </div>
              </div>

              {/* Book Info Section */}
              <div className="space-y-3 p-5">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 border border-slate-200">
                  <FiStar className="h-3.5 w-3.5 text-slate-600" />
                  <span className="text-xs font-semibold text-slate-700">{book.category}</span>
                </div>

                {/* Title & Author */}
                <div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                    <FiUser className="h-3.5 w-3.5" />
                    {book.author}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                    <FiCalendar className="h-3.5 w-3.5" />
                    {book.year}
                  </span>

                  {book.price && book.price > 0 ? (
                    <span className="flex items-center gap-1.5 rounded-lg bg-amber-100 px-3 py-1.5 border border-amber-200">
                      <FiDollarSign className="h-3.5 w-3.5 text-amber-700" />
                      <span className="text-xs font-semibold text-amber-900">${book.price.toFixed(2)}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1.5 border border-emerald-200">
                      <FiCheckCircle className="h-3.5 w-3.5 text-emerald-700" />
                      <span className="text-xs font-semibold text-emerald-900">Free</span>
                    </span>
                  )}
                </div>

                {/* Action Button */}
                {!user ? (
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full rounded-lg border border-emerald-600 bg-white py-3 font-semibold text-emerald-700 shadow-sm transition-all hover:bg-emerald-50 hover:shadow-md"
                  >
                    <FiLock className="inline h-4 w-4 mr-1.5" />
                    Login to Read
                  </button>
                ) : !book.price || book.price === 0 ? (
                  <button
                    onClick={() => handleReadBook(book)}
                    className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md"
                  >
                    <FiBookOpen className="inline h-4 w-4 mr-1.5" />
                    Read Free
                  </button>
                ) : hasUserPurchased(book.id) ? (
                  <button
                    onClick={() => handleReadBook(book)}
                    className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md"
                  >
                    <FiBookOpen className="inline h-4 w-4 mr-1.5" />
                    Read Now
                  </button>
                ) : (
                  <button
                    onClick={() => handleReadBook(book)}
                    className="w-full rounded-lg bg-amber-600 py-3 font-semibold text-white shadow-sm transition-all hover:bg-amber-700 hover:shadow-md"
                  >
                    <FiDollarSign className="inline h-4 w-4 mr-1.5" />
                    Buy for ${book.price ? book.price.toFixed(2) : '0.00'}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center rounded-[3rem] bg-gradient-to-br from-slate-50 to-slate-100 border-3 border-dashed border-slate-300 py-24"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiBookOpen className="h-24 w-24 mx-auto mb-6 text-slate-300" />
          </motion.div>
          <h3 className="text-3xl font-black text-slate-900 mb-3">No Books Found</h3>
          <p className="text-lg font-semibold text-slate-600 mb-8 max-w-md mx-auto">
            We couldn't find any books matching your criteria. Try adjusting your filters or search query.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchInput("");
              setSelectedGenre("");
              setAvailabilityOnly(false);
            }}
            className="rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-8 py-4 font-black text-white shadow-soft-xl hover:shadow-soft-2xl"
          >
            <FiX className="inline h-5 w-5 mr-2" />
            Clear All Filters
          </motion.button>
        </motion.div>
      )}

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md rounded-3xl bg-white p-10 shadow-soft-2xl border-3 border-slate-200"
            >
              <div className="space-y-8">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-soft-xl"
                  >
                    <FiLock className="h-10 w-10 text-white" />
                  </motion.div>
                  <h2 className="mt-6 text-3xl font-black text-slate-900">Purchase Book</h2>
                  <p className="mt-3 text-base font-semibold text-slate-600">
                    This is a paid book. Complete the purchase to read it.
                  </p>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 p-6 shadow-soft-md">
                  <h3 className="text-xl font-black text-slate-900 mb-2">{selectedBook.title}</h3>
                  <p className="text-sm font-semibold text-slate-600 mb-4">{selectedBook.author}</p>
                  <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200">
                    <span className="text-sm font-bold text-slate-600">Price:</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      ${selectedBook.price ? selectedBook.price.toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-slate-500 text-center font-medium leading-relaxed">
                    In a real application, this would integrate with a payment gateway like Stripe or PayPal. For this demo, clicking "Complete Purchase" will simulate a successful payment.
                  </p>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowPaymentModal(false);
                        setSelectedBook(null);
                      }}
                      className="flex-1 rounded-2xl border-3 border-slate-300 bg-white py-4 font-black text-slate-700 shadow-soft-md transition-all hover:border-slate-400 hover:shadow-soft-lg"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePurchase}
                      className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-4 font-black text-white shadow-soft-lg transition-all hover:shadow-soft-xl"
                    >
                      <FiCheckCircle className="inline h-5 w-5 mr-2" />
                      Complete Purchase
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalogue;
