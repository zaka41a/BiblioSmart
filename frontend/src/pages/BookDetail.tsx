import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  HeartIcon,
  ShareIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { fetchBook } from "../api/client";

interface BookResponse {
  id: string;
  title: string;
  author: string;
  category: string;
  synopsis: string;
  coverUrl?: string;
  available: boolean;
  tags: string[];
}

export const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState<BookResponse | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchBook(id)
      .then(setBook)
      .catch(() => {
        setBook({
          id,
          title: "The Journey of a Thousand Wonders",
          author: "Sophie Laurent",
          category: "Contemporary Fiction",
          synopsis:
            "A captivating story that takes us around the world through the eyes of a young explorer searching for meaning. Between adventure, philosophy, and self-discovery, this novel explores the universal themes of identity and belonging. A vibrant narrative celebrating cultural diversity and the importance of following your dreams.",
          coverUrl: undefined,
          available: true,
          tags: ["Adventure", "Philosophy", "Travel", "Discovery"]
        });
      });
  }, [id]);

  if (!book) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-brand-primary/20 border-t-brand-primary" />
          <p className="text-sm text-slate-500">Loading book...</p>
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
            <div className="aspect-[3/4] w-full overflow-hidden rounded-3xl bg-brand-primary/20 shadow-soft-xl ring-2 ring-white/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpenIcon className="h-32 w-32 text-white/40" />
              </div>
              {/* Animated Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              {book.available && (
                <div className="absolute right-4 top-4">
                  <Badge variant="success" size="lg">
                    <CheckCircleIcon className="h-4 w-4" />
                    Available
                  </Badge>
                </div>
              )}
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {book.tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Badge variant="primary">{tag}</Badge>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Book Details Section */}
        <motion.article
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Title & Author */}
          <div>
            <Badge variant="info" className="mb-3">
              {book.category}
            </Badge>
            <h1 className="mb-2 text-4xl font-bold text-slate-900 lg:text-5xl">
              {book.title}
            </h1>
            <p className="flex items-center gap-2 text-lg text-slate-600">
              par <span className="font-semibold text-brand-primary">{book.author}</span>
            </p>
          </div>

          {/* Synopsis */}
          <div className="card-premium p-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
              <SparklesIcon className="h-4 w-4" />
              Synopsis
            </h2>
            <p className="leading-relaxed text-slate-700">{book.synopsis}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="gradient" size="lg">
              <BookOpenIcon className="h-5 w-5" />
              {book.available ? "Borrow Now" : "Reserve"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? (
                <HeartSolidIcon className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
              Favorite
            </Button>
            <Button variant="ghost" size="lg">
              <ShareIcon className="h-5 w-5" />
              Share
            </Button>
          </div>

          {/* Book Info Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card-premium p-5">
              <dt className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <CheckCircleIcon className="h-4 w-4" />
                Availability
              </dt>
              <dd className={`text-lg font-bold ${book.available ? "text-green-600" : "text-orange-600"}`}>
                {book.available ? "In Stock" : "Borrowed · Expected return 12/15"}
              </dd>
            </div>

            <div className="card-premium p-5">
              <dt className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <ClockIcon className="h-4 w-4" />
                Loan Period
              </dt>
              <dd className="text-lg font-bold text-slate-900">21 days</dd>
            </div>
          </div>
        </motion.article>
      </motion.div>

      {/* Recommendations Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card-glass p-8"
      >
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          You Might Also Like
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="group card-premium overflow-hidden p-4 transition-all hover:scale-105"
            >
              <div className="mb-3 aspect-[3/4] rounded-xl bg-gradient-to-br from-slate-200 to-slate-100" />
              <h3 className="mb-1 text-sm font-bold text-slate-900 group-hover:text-brand-primary">
                Similar Book {index + 1}
              </h3>
              <p className="text-xs text-slate-500">Recommended Author</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Connect API <code className="rounded bg-slate-100 px-2 py-1 text-xs">/users/:id/recommendations</code> for personalized suggestions
        </p>
      </motion.section>
    </div>
  );
};

export default BookDetail;
