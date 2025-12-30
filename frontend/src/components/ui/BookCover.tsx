import { useState } from "react";
import { FiBookOpen } from "react-icons/fi";

interface BookCoverProps {
  coverUrl?: string;
  title: string;
  gradientClass?: string;
  height?: string;
  showAvailability?: boolean;
  isAvailable?: boolean;
}

export const BookCover = ({
  coverUrl,
  title,
  gradientClass = "from-emerald-500 via-teal-500 to-cyan-500",
  height = "h-72",
  showAvailability = false,
  isAvailable = true
}: BookCoverProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative ${height} overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100`}>
      {/* Image ou Fallback */}
      {!imageError && coverUrl ? (
        <img
          src={coverUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <>
          {/* Gradient de fallback */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-20`} />

          {/* Icône de livre */}
          <div className="absolute inset-0 flex items-center justify-center">
            <FiBookOpen className="h-24 w-24 text-white/60" />
          </div>
        </>
      )}

      {/* Badge de disponibilité */}
      {showAvailability && (
        <div className="absolute right-3 top-3 z-20">
          {isAvailable ? (
            <span className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Available
            </span>
          ) : (
            <span className="rounded-lg bg-slate-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
              Borrowed
            </span>
          )}
        </div>
      )}
    </div>
  );
};
