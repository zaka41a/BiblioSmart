import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiHeart,
  FiShare2,
  FiClock,
  FiCheckCircle,
  FiStar,
  FiDownload,
  FiShoppingCart,
  FiAlertCircle
} from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "../components/ui/Button";
import { useBooks } from "../context/BookContext";
import { useAuth } from "../context/AuthContext";
import { usePurchases } from "../context/PurchaseContext";

export const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getBookById } = useBooks();
  const { purchases, purchaseBook } = usePurchases();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const book = getBookById(id || "");

  // Check if user already owns this book
  const hasPurchased = purchases.some(
    p => p.bookId === id && p.userId === user?.id
  );

  const isFree = !book?.price || book.price === 0;
  const canAccess = isFree || hasPurchased;

  const handlePurchase = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!book) return;

    setIsProcessing(true);
    setError("");

    try {
      // Load Stripe settings
      const stripeSettings = JSON.parse(
        localStorage.getItem("bibliosmart_stripe_settings") || "{}"
      );

      const { publicKey, enabled } = stripeSettings;

      // If Stripe is not enabled or configured, use direct purchase
      if (!enabled || !publicKey) {
        console.warn("Stripe not configured. Using direct purchase.");
        purchaseBook(user.id, book.id, book.price || 0);
        alert(`Successfully purchased "${book.title}"! You can now read it from your dashboard.`);
        setIsProcessing(false);
        return;
      }

      // Initialize Stripe
      const stripe = await loadStripe(publicKey);

      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      // In a real implementation, you would:
      // 1. Create a checkout session on your backend
      // 2. Get the session ID from your backend
      // 3. Redirect to Stripe Checkout

      // For this demo, we'll simulate the purchase
      console.log("Creating Stripe checkout session for:", {
        bookId: book.id,
        title: book.title,
        price: book.price,
        userId: user.id
      });

      // Simulate successful purchase after a delay
      setTimeout(() => {
        purchaseBook(user.id, book.id, book.price || 0);
        alert(`Successfully purchased "${book.title}"! You can now read it from your dashboard.`);
        setIsProcessing(false);
      }, 1500);

      // Real implementation would look like:
      /*
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: book.id,
          price: book.price,
          userId: user.id
        })
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
      */

    } catch (err: any) {
      console.error("Purchase error:", err);
      setError(err.message || "Failed to process purchase. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleReadBook = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (canAccess && book?.pdfUrl) {
      navigate(`/read/${book.id}`);
    } else if (!canAccess) {
      handlePurchase();
    }
  };

  const handleDownload = () => {
    if (!book?.pdfUrl) return;

    const link = document.createElement("a");
    link.href = book.pdfUrl;
    link.download = `${book.title}.pdf`;
    link.click();
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-500" />
          <p className="text-sm text-slate-500">Book not found...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Book Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-10 lg:grid-cols-[0.8fr,1.2fr]"
      >
        {/* Book Cover Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="group relative"
          >
            <div className="aspect-[3/4] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-soft-xl ring-2 ring-white/20">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiBookOpen className="h-32 w-32 text-white/40" />
                </div>
              )}
              {/* Animated Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              {/* Price Badge */}
              <div className="absolute left-4 top-4">
                <div className="rounded-2xl bg-white/95 backdrop-blur-sm px-4 py-2 shadow-soft-lg">
                  <p className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {isFree ? "Free" : `$${book.price?.toFixed(2)}`}
                  </p>
                </div>
              </div>

              {/* Availability Badge */}
              {book.available && (
                <div className="absolute right-4 top-4">
                  <div className="flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-soft-lg">
                    <FiCheckCircle className="h-4 w-4" />
                    Available
                  </div>
                </div>
              )}

              {/* Purchased Badge */}
              {hasPurchased && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/95 backdrop-blur-sm px-4 py-2 shadow-soft-lg">
                    <FiCheckCircle className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-600">You own this book</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 transition-all hover:border-red-500 hover:bg-red-50"
            >
              <FiHeart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-600"}`} />
              <span className="text-sm font-semibold text-slate-700">Favorite</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 transition-all hover:border-emerald-500 hover:bg-emerald-50">
              <FiShare2 className="h-5 w-5 text-slate-600" />
              <span className="text-sm font-semibold text-slate-700">Share</span>
            </button>
          </div>
        </div>

        {/* Book Details Section */}
        <motion.article
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-4 py-2 backdrop-blur-sm">
            <FiStar className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              {book.category}
            </span>
          </div>

          {/* Title & Author */}
          <div>
            <h1 className="mb-2 text-4xl font-bold text-slate-900 lg:text-5xl">
              {book.title}
            </h1>
            <p className="flex items-center gap-2 text-lg text-slate-600">
              by <span className="font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{book.author}</span>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-red-50 border-2 border-red-200 p-4 flex items-start gap-3"
            >
              <FiAlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </motion.div>
          )}

          {/* Description */}
          {book.description && (
            <div className="rounded-3xl bg-slate-50 p-6">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                <FiBookOpen className="h-4 w-4" />
                Description
              </h2>
              <p className="leading-relaxed text-slate-700">{book.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {canAccess ? (
              <>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleReadBook}
                  disabled={!book.pdfUrl}
                >
                  <FiBookOpen className="h-5 w-5" />
                  Read Now
                </Button>
                {book.pdfUrl && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleDownload}
                  >
                    <FiDownload className="h-5 w-5" />
                    Download PDF
                  </Button>
                )}
              </>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handlePurchase}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <FiShoppingCart className="h-5 w-5" />
                    Buy for ${book.price?.toFixed(2)}
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Book Info Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
              <dt className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <FiCheckCircle className="h-4 w-4" />
                Availability
              </dt>
              <dd className={`text-lg font-bold ${book.available ? "text-emerald-600" : "text-orange-600"}`}>
                {book.available ? "In Stock" : "Currently Borrowed"}
              </dd>
            </div>

            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
              <dt className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <FiClock className="h-4 w-4" />
                ISBN
              </dt>
              <dd className="text-lg font-bold text-slate-900">{book.isbn || "N/A"}</dd>
            </div>

            {book.year && (
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
                <dt className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <FiStar className="h-4 w-4" />
                  Year
                </dt>
                <dd className="text-lg font-bold text-slate-900">{book.year}</dd>
              </div>
            )}

            {book.totalPages && (
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
                <dt className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <FiBookOpen className="h-4 w-4" />
                  Pages
                </dt>
                <dd className="text-lg font-bold text-slate-900">{book.totalPages}</dd>
              </div>
            )}
          </div>

          {/* Purchase Info */}
          {!canAccess && (
            <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-2 border-emerald-200">
              <h3 className="font-semibold text-slate-900 mb-2">Purchase includes:</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="h-4 w-4 text-emerald-600" />
                  Lifetime access to this book
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="h-4 w-4 text-emerald-600" />
                  Read online or download PDF
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="h-4 w-4 text-emerald-600" />
                  Access from any device
                </li>
              </ul>
            </div>
          )}
        </motion.article>
      </motion.div>

      {/* Back to Catalogue */}
      <div className="text-center">
        <Link to="/catalogue">
          <Button variant="outline">
            ← Back to Catalogue
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookDetail;
