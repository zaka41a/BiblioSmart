import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiZap,
  FiShield,
  FiDatabase,
  FiTrendingUp
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      {/* Main Content */}
      <div className="relative w-full max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 border border-emerald-300 px-5 py-2 mb-6">
            <FiShield className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-600 tracking-wide">Admin Control Panel</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-emerald-600">
            Welcome Back
          </h1>

          <p className="text-xl font-semibold text-slate-600 max-w-3xl mx-auto mb-3">
            {user?.name}
          </p>

          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            Use the navigation menu above to manage your library system
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: FiBookOpen,
              label: "Books"
            },
            {
              icon: FiUsers,
              label: "Users"
            },
            {
              icon: FiBarChart2,
              label: "Analytics"
            },
            {
              icon: FiSettings,
              label: "Settings"
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-xl bg-emerald-50 p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-emerald-200"
              >
                {/* Content */}
                <div className="relative">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600 mb-3">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-lg font-bold text-slate-900">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: FiZap,
              title: "Lightning Fast",
              description: "Optimized performance for seamless management",
            },
            {
              icon: FiDatabase,
              title: "Centralized Data",
              description: "All your library data in one secure place",
            },
            {
              icon: FiTrendingUp,
              title: "Real-time Insights",
              description: "Track metrics and make informed decisions",
            },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-xl bg-white border border-emerald-200 p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-sm font-medium text-slate-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Welcome Message Card */}
        <div className="mt-12 relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-10 shadow-lg">
          {/* Simple Background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
          </div>

          <div className="relative text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              You're in Control
            </h2>
            <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto">
              Navigate using the menu above to manage books, users, view analytics, or configure system settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
