import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, type, onClose, duration = 4000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <FiCheckCircle className="h-5 w-5" />,
    error: <FiAlertCircle className="h-5 w-5" />,
    info: <FiInfo className="h-5 w-5" />,
    warning: <FiAlertCircle className="h-5 w-5" />
  };

  const styles = {
    success: "bg-emerald-50 border-emerald-500 text-emerald-900",
    error: "bg-red-50 border-red-500 text-red-900",
    info: "bg-blue-50 border-blue-500 text-blue-900",
    warning: "bg-amber-50 border-amber-500 text-amber-900"
  };

  const iconColors = {
    success: "text-emerald-600",
    error: "text-red-600",
    info: "text-blue-600",
    warning: "text-amber-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`flex items-center gap-3 rounded-2xl border-2 ${styles[type]} px-6 py-4 shadow-soft-lg backdrop-blur-sm min-w-[320px] max-w-md`}
    >
      <div className={iconColors[type]}>{icons[type]}</div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="rounded-full p-1 transition-colors hover:bg-black/5"
      >
        <FiX className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  onRemove: (id: string) => void;
}

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => onRemove(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
