import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiBookOpen,
  FiUser,
  FiSettings,
  FiZap,
  FiLogIn,
  FiLogOut,
  FiMail,
  FiFileText,
  FiShield,
  FiTrendingUp
} from "react-icons/fi";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

type NavItem = {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: ("admin" | "user")[];
};

const navItems: NavItem[] = [
  { path: "/", label: "Home", icon: FiHome },
  { path: "/catalogue", label: "Catalog", icon: FiBookOpen },
  { path: "/contact", label: "Contact", icon: FiMail },
  { path: "/legal-notice", label: "Legal Notice", icon: FiFileText },
  { path: "/privacy-policy", label: "Privacy", icon: FiShield },
  { path: "/utilisateur", label: "My Books", icon: FiBookOpen, roles: ["user"] },
  { path: "/profile-settings", label: "Profile Settings", icon: FiUser, roles: ["user"] },
  { path: "/admin/books", label: "Books", icon: FiBookOpen, roles: ["admin"] },
  { path: "/admin/users", label: "Users", icon: FiUser, roles: ["admin"] },
  { path: "/admin/analytics", label: "Analytics", icon: FiTrendingUp, roles: ["admin"] },
  { path: "/admin/settings", label: "Settings", icon: FiSettings, roles: ["admin"] }
];

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  // Determine logo link based on user role
  const logoLink = !isAuthenticated
    ? "/"
    : user?.role === "admin"
      ? "/admin"
      : "/utilisateur";

  // Filter navigation items based on user role
  const visibleNavItems = navItems.filter(item => {
    // Home - only show when NOT logged in
    if (item.path === "/") {
      return !isAuthenticated;
    }

    // Catalog - show only for users and non-authenticated, hide for admin
    if (item.path === "/catalogue") {
      if (!isAuthenticated) return true;
      return user?.role !== "admin";
    }

    // Public pages (Contact, Legal Notice, Privacy Policy) - only show when NOT logged in
    if (["/contact", "/legal-notice", "/privacy-policy"].includes(item.path)) {
      return !isAuthenticated;
    }

    // For role-restricted items (My Library, Admin)
    if (!isAuthenticated || !user) {
      return false; // Hide if not logged in
    }

    // Show if user's role matches any required role
    if (item.roles) {
      return item.roles.includes(user.role as "admin" | "user");
    }

    return false;
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl shadow-2xl"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* Logo Section */}
        <Link to={logoLink} className="group flex items-center gap-4" aria-label="BiblioSmart">
          <div className="relative">
            {/* Glow Effect - Changed to green */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />

            {/* Logo Image */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={logo}
                alt="BiblioSmart Logo"
                className="relative h-14 w-14 rounded-xl shadow-soft-md transition-shadow group-hover:shadow-glow"
              />
            </motion.div>
          </div>

          {/* Text Logo */}
          <div className="hidden text-left md:block">
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent">
              BiblioSmart
            </span>
            <p className="text-sm font-semibold text-slate-400">
              Smart Library Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "text-emerald-400"
                      : "text-slate-400 hover:text-emerald-400"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 shadow-inner-soft"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    <Icon className={`relative z-10 h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? "text-emerald-400" : ""}`} />
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* CTA Section */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* User Info */}
              <div className="hidden items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2 border border-slate-700 md:flex">
                <FiUser className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold text-slate-200">{user?.name}</span>
                {user?.role === "admin" && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                    Admin
                  </span>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="group flex items-center gap-2 rounded-full bg-slate-800/80 border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400"
              >
                <FiLogOut className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Link
                to="/login"
                className="group flex items-center gap-2 rounded-full bg-slate-800/80 border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-emerald-400"
              >
                <FiLogIn className="h-4 w-4" />
                <span className="hidden md:inline">Login</span>
              </Link>

              {/* Explore Button */}
              <Link
                to="/catalogue"
                className="group relative hidden overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-soft-lg transition-all hover:scale-105 hover:shadow-glow md:inline-flex"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiZap className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  Explore
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </>
          )}

          {/* Mobile Menu Button (optional) */}
          <button className="rounded-full bg-slate-800/80 border border-slate-700 p-2.5 text-slate-300 transition-all hover:bg-slate-700 hover:text-emerald-400 md:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
};
