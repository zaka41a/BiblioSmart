import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiX, FiTrash2, FiBook } from "react-icons/fi";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookTitle: string;
  isDeleting?: boolean;
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  bookTitle,
  isDeleting = false,
}: DeleteConfirmationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
          >
            {/* Header with gradient */}
            <div className="relative bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
                    <FiAlertTriangle className="h-8 w-8 text-white animate-pulse" />
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      Delete Book?
                    </h3>
                    <p className="text-red-50 text-sm">
                      This action cannot be undone
                    </p>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  disabled={isDeleting}
                  className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              {/* Decorative circles */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Book Info Card */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-5 border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg bg-gradient-to-br from-red-500 to-rose-500 p-2">
                    <FiBook className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-slate-600">
                    Book to be deleted:
                  </p>
                </div>
                <p className="text-lg font-bold text-slate-900 pl-2 border-l-4 border-red-500">
                  {bookTitle}
                </p>
              </div>

              {/* Warning Message */}
              <div className="rounded-xl bg-amber-50 border-2 border-amber-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-amber-100 p-2 flex-shrink-0">
                    <FiAlertTriangle className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="text-sm text-amber-900">
                    <p className="font-semibold mb-1">Warning:</p>
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-amber-600" />
                        The book will be permanently removed from your library
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-amber-600" />
                        All associated data (purchases, loans) may be affected
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-amber-600" />
                        This action cannot be reversed
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {/* Cancel Button */}
                <button
                  onClick={onClose}
                  disabled={isDeleting}
                  className="flex-1 rounded-xl border-2 border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>

                {/* Delete Button */}
                <button
                  onClick={onConfirm}
                  disabled={isDeleting}
                  className="flex-1 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 px-6 py-3.5 font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <FiTrash2 className="h-5 w-5" />
                      <span>Delete Book</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
