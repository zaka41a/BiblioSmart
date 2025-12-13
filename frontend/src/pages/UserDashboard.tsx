import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiCheckCircle,
  FiDollarSign,
  FiStar,
  FiCalendar,
  FiTrash2
} from "react-icons/fi";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { usePurchases } from "../context/PurchaseContext";
import { useBooks } from "../context/BookContext";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ui/Toast";

const getStats = (accessibleCount: number, purchasedCount: number, freeCount: number) => [
  {
    label: "Accessible Books",
    value: accessibleCount.toString(),
    icon: FiBookOpen,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    bgColor: "from-emerald-50 via-teal-50 to-cyan-50"
  },
  {
    label: "Purchased Books",
    value: purchasedCount.toString(),
    icon: FiDollarSign,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    bgColor: "from-emerald-50 via-teal-50 to-cyan-50"
  },
  {
    label: "Free Books",
    value: freeCount.toString(),
    icon: FiCheckCircle,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    bgColor: "from-emerald-50 via-teal-50 to-cyan-50"
  }
];

export const UserDashboard = () => {
  const { user } = useAuth();
  const { purchases, removePurchase } = usePurchases();
  const { books } = useBooks();
  const navigate = useNavigate();
  const { toasts, removeToast, success, error } = useToast();

  // Get purchased books
  const purchasedBooksWithDetails = purchases
    .filter(p => p.userId === user?.id)
    .map(purchase => ({
      purchase,
      book: books.find(b => b.id === purchase.bookId)
    }))
    .filter(item => item.book !== undefined);

  // Get IDs of purchased books
  const purchasedBookIds = purchasedBooksWithDetails.map(item => item.book!.id);

  // Get free books (accessible to all users) - excluding already purchased ones
  const freeBooks = books.filter(book =>
    (!book.price || book.price === 0) && !purchasedBookIds.includes(book.id)
  );

  const accessibleBooks = [
    ...purchasedBooksWithDetails.map(item => ({
      book: item.book!,
      isPaid: true,
      purchaseDate: item.purchase.purchaseDate
    })),
    ...freeBooks.map(book => ({
      book,
      isPaid: false,
      purchaseDate: null
    }))
  ];

  const freeCount = freeBooks.length;
  const purchasedCount = purchasedBooksWithDetails.length;

  // Generate real recommendations: books user doesn't have access to yet
  const accessibleBookIds = accessibleBooks.map(item => item.book.id);
  const recommendations = books
    .filter(book => !accessibleBookIds.includes(book.id))
    .slice(0, 3);

  const handleReadBook = (bookId: string) => {
    navigate(`/read/${bookId}`);
  };

  const handleRemoveBook = (bookId: string, isPaid: boolean) => {
    if (!user) return;

    if (isPaid) {
      // Remove purchased book
      if (window.confirm("Are you sure you want to remove this book from your library? You will need to purchase it again to access it.")) {
        removePurchase(user.id, bookId);
        success("Book removed from your library");
      }
    } else {
      // For free books, we can't really remove them as they're accessible to all
      // But we could add a "hide" feature in the future
      error("Free books cannot be removed from your library");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const stats = getStats(accessibleBooks.length, purchasedCount, freeCount);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8 shadow-lg border border-emerald-200">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-4 py-2">
            <FiBookOpen className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-600">
              Personal Library
            </span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Welcome back, <span className="text-emerald-600">{user?.name}</span>
          </h2>
          <p className="text-base text-slate-600">
            Manage your library and discover new books
          </p>
        </div>
      </header>

      {/* My Library */}
      <section className="overflow-hidden rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600">
            <FiBookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">My Library</h2>
            <p className="text-sm text-slate-600">Your accessible books collection</p>
          </div>
        </div>

        {accessibleBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-16 text-center">
            <FiBookOpen className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Books Yet</h3>
            <p className="text-slate-600 mb-6 max-w-md">
              Start building your library by exploring our catalog and discovering amazing books.
            </p>
            <Link to="/catalogue">
              <Button variant="primary">Explore Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {accessibleBooks.map((item) => {
              const { book, isPaid, purchaseDate } = item;

              return (
                <article
                  key={`${book.id}-${isPaid}`}
                  className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
                >
                      {/* Book Cover Image */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                        {book.coverUrl ? (
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const gradient = document.createElement('div');
                                gradient.className = 'absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30';
                                parent.appendChild(gradient);
                                const icon = document.createElement('div');
                                icon.className = 'absolute inset-0 flex items-center justify-center';
                                icon.innerHTML = '<svg class="h-16 w-16 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>';
                                parent.appendChild(icon);
                              }
                            }}
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FiBookOpen className="h-16 w-16 text-white/40" />
                            </div>
                          </>
                        )}
                      </div>

                      <div className="space-y-4 p-6">
                        {/* Status Badge */}
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {book.category}
                          </span>
                          {isPaid ? (
                            <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                              <FiDollarSign className="h-3 w-3" />
                              Purchased
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                              <FiCheckCircle className="h-3 w-3" />
                              Free
                            </span>
                          )}
                        </div>

                        {/* Book Info */}
                        <div>
                          <h3 className="mb-1 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
                            {book.title}
                          </h3>
                          <p className="text-sm text-slate-500">{book.author}</p>
                        </div>

                        {/* Purchase Date */}
                        {isPaid && purchaseDate && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <FiCalendar className="h-4 w-4" />
                            <span>Purchased: {formatDate(purchaseDate)}</span>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="primary"
                            className="!flex-1"
                            onClick={() => handleReadBook(book.id)}
                          >
                            <FiBookOpen className="inline h-4 w-4 mr-1" />
                            Read Now
                          </Button>
                          {isPaid && (
                            <button
                              onClick={() => handleRemoveBook(book.id, isPaid)}
                              className="group flex items-center justify-center gap-2 rounded-xl bg-red-50 border-2 border-red-200 px-4 py-3 font-semibold text-red-600 transition-all hover:bg-red-500 hover:border-red-500 hover:text-white hover:shadow-lg"
                              title="Remove from library"
                            >
                              <FiTrash2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Recommendations */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8 shadow-lg border border-emerald-200">
        {/* Simple Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl" />
        </div>

        <div className="relative space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600">
              <FiStar className="h-7 w-7 text-white" />
            </div>
            <h2 className="mb-2 text-3xl font-black text-emerald-600">
              Personalized Recommendations
            </h2>
            <p className="text-base font-semibold text-slate-600">
              Books you might enjoy
            </p>
          </div>

          {recommendations.length > 0 ? (
            <>
              {/* Books Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                {recommendations.map((book) => (
                  <div
                    key={book.id}
                    className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl cursor-pointer border border-white"
                    onClick={() => navigate(`/livres/${book.id}`)}
                  >

                        {/* Book Cover */}
                        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                          {/* Recommended Badge */}
                          <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1.5 shadow-soft-lg">
                            <FiStar className="h-3.5 w-3.5 text-white" />
                            <span className="text-xs font-black text-white">RECOMMENDED</span>
                          </div>

                          {book.coverUrl ? (
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  const gradient = document.createElement('div');
                                  gradient.className = 'absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30';
                                  parent.appendChild(gradient);
                                  const icon = document.createElement('div');
                                  icon.className = 'absolute inset-0 flex items-center justify-center';
                                  icon.innerHTML = '<svg class="h-16 w-16 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>';
                                  parent.appendChild(icon);
                                }
                              }}
                            />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <FiBookOpen className="h-16 w-16 text-white/40" />
                              </div>
                            </>
                          )}

                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>

                        {/* Book Info */}
                        <div className="relative space-y-3 p-5">
                          {/* Category Badge */}
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-700">
                              {book.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-black text-slate-900 transition-colors group-hover:text-emerald-600 line-clamp-2 leading-tight">
                            {book.title}
                          </h3>

                          {/* Author */}
                          <p className="text-sm font-semibold text-slate-500">{book.author}</p>

                          {/* Price */}
                          {book.price && book.price > 0 ? (
                            <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 px-4 py-2 w-fit shadow-soft-sm">
                              <FiDollarSign className="h-4 w-4 text-amber-700" />
                              <span className="text-sm font-black text-amber-800">${book.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 px-4 py-2 w-fit shadow-soft-sm">
                              <FiCheckCircle className="h-4 w-4 text-emerald-700" />
                              <span className="text-sm font-black text-emerald-800">Free</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

              {/* View All Button */}
              <div className="pt-4 text-center">
                <Link to="/catalogue">
                  <button className="rounded-xl bg-emerald-600 px-10 py-4 font-bold text-white shadow-lg transition-all hover:shadow-xl inline-flex items-center gap-2">
                    <FiBookOpen className="h-5 w-5" />
                    Explore All Books
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center rounded-xl bg-white/60 backdrop-blur-sm border-2 border-dashed border-emerald-300 py-12">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-100 mb-3">
                <FiCheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Amazing!</h3>
              <p className="text-base font-semibold text-slate-600">You have access to all books in our library!</p>
            </div>
          )}
        </div>
      </section>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default UserDashboard;
