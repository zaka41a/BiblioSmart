import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiSave,
  FiAlertCircle,
  FiShield,
  FiSettings,
  FiCheckCircle
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ui/Toast";

export const ProfileSettings = () => {
  const { user } = useAuth();
  const { toasts, removeToast, success, error } = useToast();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!profileForm.name.trim()) {
      error("Please enter your name");
      return;
    }
    if (!profileForm.email.trim()) {
      error("Please enter your email");
      return;
    }

    // If changing password
    if (profileForm.newPassword) {
      if (profileForm.newPassword !== profileForm.confirmPassword) {
        error("New passwords do not match");
        return;
      }
      if (profileForm.newPassword.length < 6) {
        error("Password must be at least 6 characters");
        return;
      }
    }

    // Get registered users
    const registeredUsers = JSON.parse(localStorage.getItem("bibliosmart_registered_users") || "[]");

    // Find and update current user
    const updatedUsers = registeredUsers.map((u: any) => {
      if (u.id === user?.id) {
        return {
          ...u,
          name: profileForm.name,
          email: profileForm.email,
          password: profileForm.newPassword || u.password
        };
      }
      return u;
    });

    // Save to localStorage
    localStorage.setItem("bibliosmart_registered_users", JSON.stringify(updatedUsers));

    // Update current user session
    const updatedUser = updatedUsers.find((u: any) => u.id === user?.id);
    if (updatedUser) {
      localStorage.setItem("bibliosmart_user", JSON.stringify({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }));
    }

    success("Profile updated successfully!");

    // Reset password fields
    setProfileForm({
      ...profileForm,
      newPassword: "",
      confirmPassword: ""
    });

    // Reload page to update user context
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="relative min-h-screen">
      {/* Decorative Background Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-teal-400/20 via-cyan-400/20 to-emerald-400/20 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute -bottom-40 right-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 via-emerald-400/20 to-teal-400/20 blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="relative mx-auto max-w-5xl space-y-8 px-6 py-12">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-12 shadow-soft-2xl"
        >
          {/* Animated Blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-lime-300/30 via-green-400/30 to-emerald-500/30 blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-300/30 via-teal-400/30 to-emerald-500/30 blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
          </div>

          {/* Sparkles */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            className="absolute top-10 right-20 h-3 w-3 rounded-full bg-white shadow-soft-lg"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-16 right-1/3 h-2 w-2 rounded-full bg-lime-200 shadow-soft-md"
          />
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute top-1/2 left-16 h-2.5 w-2.5 rounded-full bg-cyan-100 shadow-soft-lg"
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-xl shadow-soft-xl border border-white/30"
            >
              <FiSettings className="h-10 w-10 text-white" />
            </motion.div>

            <h1 className="mb-4 text-5xl font-black text-white lg:text-6xl">
              Profile Settings
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-medium text-lime-100/90">
              Manage your account information, update your details, and keep your profile secure
            </p>

            {/* User Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 px-6 py-3 shadow-soft-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30">
                <FiUser className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-lime-100/70">Logged in as</p>
                <p className="text-lg font-bold text-white">{user?.name}</p>
              </div>
              {user?.role === "admin" && (
                <span className="rounded-full bg-amber-400/30 border border-amber-300/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  ADMIN
                </span>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Settings Form */}
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-3xl border-2 border-emerald-200/50 bg-white shadow-soft-xl"
          >
            <div className="border-b-2 border-emerald-200/50 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 px-8 py-6">
              <h3 className="flex items-center gap-3 text-2xl font-black text-slate-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-soft-lg">
                  <FiUser className="h-6 w-6 text-white" />
                </div>
                Personal Information
              </h3>
              <p className="mt-2 text-sm font-semibold text-slate-600">Update your personal details and contact information</p>
            </div>

            <div className="space-y-6 p-8">
              {/* Name Field */}
              <div className="group">
                <label className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700">
                  <FiUser className="h-4 w-4 text-emerald-600" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full rounded-2xl border-3 border-emerald-200 bg-emerald-50/50 px-6 py-5 text-lg font-semibold text-slate-900 transition-all placeholder:text-slate-400 hover:border-emerald-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:shadow-soft-lg"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-focus-within:opacity-100">
                    <FiCheckCircle className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700">
                  <FiMail className="h-4 w-4 text-emerald-600" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full rounded-2xl border-3 border-emerald-200 bg-emerald-50/50 px-6 py-5 text-lg font-semibold text-slate-900 transition-all placeholder:text-slate-400 hover:border-emerald-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:shadow-soft-lg"
                    placeholder="your.email@example.com"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-focus-within:opacity-100">
                    <FiCheckCircle className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="overflow-hidden rounded-3xl border-2 border-purple-200/50 bg-white shadow-soft-xl"
          >
            <div className="border-b-2 border-purple-200/50 bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 px-8 py-6">
              <h3 className="flex items-center gap-3 text-2xl font-black text-slate-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 shadow-soft-lg">
                  <FiShield className="h-6 w-6 text-white" />
                </div>
                Security Settings
              </h3>
              <p className="mt-2 text-sm font-semibold text-slate-600">Change your password to keep your account secure</p>
            </div>

            <div className="space-y-6 p-8">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* New Password */}
                <div className="group">
                  <label className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700">
                    <FiLock className="h-4 w-4 text-purple-600" />
                    New Password
                  </label>
                  <input
                    type="password"
                    value={profileForm.newPassword}
                    onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                    className="w-full rounded-2xl border-3 border-purple-200 bg-purple-50/50 px-6 py-5 text-lg font-semibold text-slate-900 transition-all placeholder:text-slate-400 hover:border-purple-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:shadow-soft-lg"
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm Password */}
                <div className="group">
                  <label className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700">
                    <FiLock className="h-4 w-4 text-purple-600" />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={profileForm.confirmPassword}
                    onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                    className="w-full rounded-2xl border-3 border-purple-200 bg-purple-50/50 px-6 py-5 text-lg font-semibold text-slate-900 transition-all placeholder:text-slate-400 hover:border-purple-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:shadow-soft-lg"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              {/* Info Alert */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200 p-5 shadow-soft-md"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-400/30">
                  <FiAlertCircle className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <p className="font-bold text-amber-900 mb-1">Password Requirements</p>
                  <p className="text-sm font-medium text-amber-800">
                    Leave password fields empty if you don't want to change your password. New passwords must be at least 6 characters long.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center pt-4"
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-16 py-6 font-black text-white shadow-soft-2xl transition-all hover:shadow-glow"
            >
              <span className="relative z-10 flex items-center gap-3 text-xl">
                <FiSave className="h-6 w-6 transition-transform group-hover:scale-110" />
                Save All Changes
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 transition-opacity group-hover:opacity-100" />

              {/* Shine Effect */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </motion.button>
          </motion.div>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default ProfileSettings;
