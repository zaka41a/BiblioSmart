import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Button } from "../components/ui/Button";
import { api } from "../api/client";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setError("Invalid reset link");
        setIsChecking(false);
        return;
      }

      try {
        await api.get("/auth/reset-password/validate", {
          params: { token }
        });
        setIsValidToken(true);
      } catch (err: any) {
        const message = err?.response?.data?.message || "Invalid or expired reset link";
        setError(message);
        setIsValidToken(false);
      } finally {
        setIsChecking(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!token) {
      setError("Invalid or expired reset link");
      setIsLoading(false);
      return;
    }

    try {
      await api.post("/auth/reset-password", {
        token,
        newPassword
      });

      setIsSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      console.error("Error resetting password:", err);
      const message = err?.response?.data?.message || "Failed to reset password. Please try again.";
      setError(message);
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-slate-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-white px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl bg-white p-10 shadow-soft-xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <FiAlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="mb-3 text-2xl font-bold text-slate-900">Invalid Link</h1>
            <p className="mb-8 text-slate-600">{error}</p>
            <Link to="/forgot-password">
              <Button variant="primary" className="w-full">
                Request New Reset Link
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-white px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl bg-white p-10 shadow-soft-xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
              <FiCheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-3 text-2xl font-bold text-slate-900">Password Reset Successful!</h1>
            <p className="mb-8 text-slate-600">
              Your password has been updated successfully. Redirecting to login...
            </p>
            <Link to="/login">
              <Button variant="primary" className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl bg-white p-10 shadow-soft-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
              <FiLock className="h-7 w-7 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-slate-900">Reset Password</h1>
            <p className="text-slate-600">
              {email ? (
                <>Enter your new password for <strong className="text-emerald-600">{email}</strong></>
              ) : (
                "Enter your new password"
              )}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-red-50 border-2 border-red-200 p-4 text-center"
              >
                <p className="text-sm font-semibold text-red-800">{error}</p>
              </motion.div>
            )}

            <div>
              <label htmlFor="newPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                New Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FiLock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  minLength={6}
                  className="w-full rounded-xl border-2 border-slate-200 py-3 pl-12 pr-4 text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">Minimum 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FiLock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  minLength={6}
                  className="w-full rounded-xl border-2 border-slate-200 py-3 pl-12 pr-4 text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Resetting...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
