import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiClock,
  FiTrendingUp,
  FiHeart,
  FiCalendar,
  FiAward,
  FiBookmark,
  FiStar,
  FiCheckCircle,
  FiAlertCircle,
  FiDollarSign
} from "react-icons/fi";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { usePurchases } from "../context/PurchaseContext";
import { useBooks } from "../context/BookContext";

const getStats = (accessibleCount: number, purchasedCount: number) => [
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
    label: "Reading Hours",
    value: "142",
    icon: FiClock,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    bgColor: "from-emerald-50 via-teal-50 to-cyan-50"
  },
  {
    label: "Achievements",
    value: "8",
    icon: FiAward,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    bgColor: "from-emerald-50 via-teal-50 to-cyan-50"
  },
  {
    label: "Favorites",
    value: "12",
    icon: FiHeart,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    bgColor: "from-emerald-50 via-teal-50 to-cyan-50"
  }
];

const mockLoans = [
  {
    id: 1,
    title: "The Journey of a Thousand Pages",
    author: "Victor Rousseau",
    dueDate: "15/12/2025",
    progress: 65,
    status: "On Time",
    category: "Fiction"
  },
  {
    id: 2,
    title: "Digital Transformation in Libraries",
    author: "Marie Laurent",
    dueDate: "10/12/2025",
    progress: 30,
    status: "Overdue",
    category: "Essay"
  },
  {
    id: 3,
    title: "Modern Web Development",
    author: "Alex Chen",
    dueDate: "20/12/2025",
    progress: 80,
    status: "On Time",
    category: "Technical"
  }
];

const recommendations = [
  { id: 1, title: "The Art of Reading", author: "Sophie Martin", category: "Essay" },
  { id: 2, title: "Digital Libraries", author: "Jean Dupont", category: "Technical" },
  { id: 3, title: "Stories of Tomorrow", author: "Emma Wilson", category: "Fiction" }
];

export const UserDashboard = () => {
  const { user } = useAuth();
  const { getUserPurchases } = usePurchases();
  const { getBookById, books } = useBooks();
  const navigate = useNavigate();

  // Get purchased books
  const userPurchases = user ? getUserPurchases(user.id) : [];
  const purchasedBooksWithDetails = userPurchases.map(purchase => {
    const book = getBookById(purchase.bookId);
    return {
      purchase,
      book
    };
  }).filter(item => item.book !== undefined);

  // Get free books (accessible to all users)
  const freeBooks = books.filter(book => book.price === 0);

  // Combine purchased books and free books
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

  const handleReadBook = (bookId: string) => {
    navigate(`/read/${bookId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
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

        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-4 py-2 backdrop-blur-sm">
            <FiBookmark className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Your Library Space</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Welcome back, <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">{user?.name || "User"}</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Track your reading progress, manage loans, and discover personalized recommendations.
          </p>
        </div>
      </motion.header>

      {/* Stats Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {getStats(accessibleBooks.length, purchasedBooksWithDetails.length).map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-soft-lg transition-all hover:scale-105 hover:shadow-soft-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 transition-opacity group-hover:opacity-100`} />

              <div className="relative space-y-4">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-soft-md`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${stat.color} transition-all duration-500 group-hover:w-full`} />
            </motion.div>
          );
        })}
      </section>

      {/* My Library */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">My Library</h2>
            <p className="text-sm text-slate-600">Your accessible books - purchased and free</p>
          </div>
          <Link
            to="/catalogue"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-soft-lg transition-all hover:scale-105 hover:shadow-glow"
          >
            <FiBookOpen className="h-4 w-4 transition-transform group-hover:rotate-12" />
            <span>Explore Catalog</span>
          </Link>
        </div>

        {accessibleBooks.length === 0 ? (
          <div className="col-span-full rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
            <FiBookOpen className="mx-auto h-16 w-16 text-slate-300" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">No accessible books yet</h3>
            <p className="mt-2 text-sm text-slate-600">Start exploring our catalogue to read free books or purchase paid ones!</p>
            <Link to="/catalogue">
              <Button variant="primary" className="mt-6">
                Browse Catalogue
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {accessibleBooks.map((item, index) => {
              const { book, isPaid, purchaseDate } = item;

              return (
                <motion.article
                  key={`${book.id}-${isPaid}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group overflow-hidden rounded-3xl bg-white p-6 shadow-soft-lg transition-all hover:shadow-soft-xl"
                >
                  <div className="space-y-4">
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

                    <Button
                      variant="primary"
                      className="!w-full"
                      onClick={() => handleReadBook(book.id)}
                    >
                      <FiBookOpen className="inline h-4 w-4 mr-1" />
                      Read Now
                    </Button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </motion.section>

      {/* Recommendations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="overflow-hidden rounded-3xl bg-white p-8 shadow-soft-lg"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-soft-md">
              <FiStar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Personalized Recommendations</h2>
              <p className="text-sm text-slate-600">Books you might enjoy based on your reading history</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="group rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-emerald-500 hover:bg-emerald-50/50"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FiBookOpen className="h-5 w-5 text-emerald-600" />
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600">
                      {book.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-500">{book.author}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            View All Recommendations
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default UserDashboard;
