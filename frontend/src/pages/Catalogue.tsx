import { useMemo, useState } from "react";
import { MagnifyingGlassIcon, FunnelIcon, SparklesIcon, CheckCircleIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

const genres = [
  { name: "Fiction", color: "from-brand-primary to-brand-primary" },
  { name: "Science Fiction", color: "from-brand-primary to-brand-primary" },
  { name: "Essay", color: "from-brand-primary to-brand-primary" },
  { name: "Youth", color: "from-brand-primary to-brand-primary" },
  { name: "Comics", color: "from-brand-primary to-brand-primary" },
  { name: "Poetry", color: "from-brand-primary to-brand-primary" }
];

export const Catalogue = () => {
  const [searchInput, setSearchInput] = useState("");
  const query = useDebouncedValue(searchInput, 300);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [availabilityOnly, setAvailabilityOnly] = useState(false);

  const filtersSummary = useMemo(() => {
    const parts = [] as string[];
    if (query) parts.push(`Search: "${query}"`);
    if (selectedGenre) parts.push(`Genre: ${selectedGenre}`);
    if (availabilityOnly) parts.push("Available only");
    return parts.join(" · ") || "All books";
  }, [query, selectedGenre, availabilityOnly]);

  const mockBooks = Array.from({ length: 12 }).map((_, index) => ({
    id: index + 1,
    title: `The Journey of a Thousand Pages ${index + 1}`,
    author: "Victor Rousseau",
    category: genres[index % genres.length].name,
    year: 2020 + (index % 4),
    available: index % 3 !== 0,
    cover: genres[index % genres.length].color
  }));

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-brand-primary/5 p-10 shadow-soft-lg border border-white/20"
      >
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-primary/15 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-primary/15 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-1/2 left-1/2 h-48 w-48 rounded-full bg-brand-primary/10 blur-3xl" />

        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-2">
            <BookOpenIcon className="h-5 w-5 text-brand-primary" />
            <span className="text-sm font-semibold text-gradient">Complete Catalog</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Explore Our <span className="text-gradient">Collection</span>
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
            <MagnifyingGlassIcon className="pointer-events-none absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search by title, author, ISBN..."
              className="w-full rounded-2xl border-2 border-slate-200 bg-white/80 px-16 py-4 text-base text-slate-700 backdrop-blur-sm transition-all placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-slate-200 p-1 transition-all hover:bg-slate-300"
              >
                <svg className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Genre Filters */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <FunnelIcon className="h-4 w-4" />
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
                        : "border-2 border-slate-200 bg-white/60 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {active && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${genre.color}`} />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {active && <CheckCircleIcon className="h-4 w-4" />}
                      {genre.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Availability Filter */}
          <label className="flex w-fit cursor-pointer items-center gap-3 rounded-full border-2 border-slate-200 bg-white/60 px-5 py-3 transition-all hover:border-brand-primary hover:bg-white">
            <input
              type="checkbox"
              checked={availabilityOnly}
              onChange={(event) => setAvailabilityOnly(event.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
            <span className="text-sm font-medium text-slate-700">Show available books only</span>
          </label>

          {/* Active Filters Summary */}
          <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/30 px-4 py-3">
            <SparklesIcon className="h-5 w-5 text-brand-primary" />
            <span className="text-sm font-medium text-slate-700">{filtersSummary}</span>
          </div>
        </div>
      </motion.section>

      {/* Books Grid */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">
            <span className="text-2xl font-bold text-slate-900">{mockBooks.length}</span> results found
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockBooks.map((book, index) => (
            <motion.article
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group card-premium overflow-hidden transition-all hover:scale-105"
            >
              {/* Book Cover */}
              <div className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50">
                <div className={`absolute inset-0 bg-gradient-to-br ${book.cover} opacity-30`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpenIcon className="h-20 w-20 text-white/40" />
                </div>

                {/* Availability Badge */}
                <div className="absolute right-3 top-3">
                  {book.available ? (
                    <span className="flex items-center gap-1 rounded-full bg-green-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <CheckCircleIcon className="h-3 w-3" />
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
                  <h3 className="mb-1 line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-brand-primary">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-500">{book.author}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">{book.category}</span>
                  <span>·</span>
                  <span>{book.year}</span>
                </div>

                <Button variant="outline" className="!w-full !py-2.5">
                  View Details
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Catalogue;
