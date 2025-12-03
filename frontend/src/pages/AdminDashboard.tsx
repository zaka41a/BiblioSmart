import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiUsers,
  FiTrendingUp,
  FiActivity,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiSettings,
  FiDownload,
  FiUpload,
  FiBarChart2,
  FiPieChart
} from "react-icons/fi";
import { Button } from "../components/ui/Button";
import { useBooks } from "../context/BookContext";

const recentActivities = [
  {
    id: 1,
    type: "loan",
    user: "Marie Laurent",
    book: "Digital Transformation in Libraries",
    time: "2 minutes ago",
    status: "completed"
  },
  {
    id: 2,
    type: "return",
    user: "Jean Dupont",
    book: "The Art of Reading",
    time: "15 minutes ago",
    status: "completed"
  },
  {
    id: 3,
    type: "overdue",
    user: "Sophie Martin",
    book: "Modern Web Development",
    time: "1 hour ago",
    status: "warning"
  },
  {
    id: 4,
    type: "registration",
    user: "Alex Chen",
    book: "New user registered",
    time: "2 hours ago",
    status: "completed"
  }
];

const quickActions = [
  { label: "Manage Books", icon: FiBookOpen, color: "emerald", link: "/admin/books" },
  { label: "Manage Users", icon: FiUsers, color: "teal", link: "/admin/users" },
  { label: "View Analytics", icon: FiBarChart2, color: "cyan", link: "/admin" },
  { label: "System Settings", icon: FiSettings, color: "emerald", link: "/admin" }
];

export const AdminDashboard = () => {
  const { books } = useBooks();
  const users = JSON.parse(localStorage.getItem("bibliosmart_registered_users") || "[]");

  // Calculate real stats
  const totalBooks = books.length;
  const activeUsers = users.length;
  const activeLoans = books.filter((b: any) => !b.available).length;
  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-10 shadow-soft-lg border border-emerald-200/30"
      >
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />

        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-4 py-2 backdrop-blur-sm">
            <FiPieChart className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Admin Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Library <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Management</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Monitor library health, manage operations, and orchestrate your entire platform.
          </p>
        </div>
      </motion.header>

      {/* Stats Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Books */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-soft-lg transition-all hover:scale-105 hover:shadow-soft-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-soft-md">
                <FiBookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{totalBooks}</p>
              <p className="text-sm font-medium text-slate-600">Total Books</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
        </motion.div>

        {/* Active Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-soft-lg transition-all hover:scale-105 hover:shadow-soft-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-soft-md">
                <FiUsers className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{activeUsers}</p>
              <p className="text-sm font-medium text-slate-600">Registered Users</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
        </motion.div>

        {/* Active Loans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-soft-lg transition-all hover:scale-105 hover:shadow-soft-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-soft-md">
                <FiActivity className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{activeLoans}</p>
              <p className="text-sm font-medium text-slate-600">Books Borrowed</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
        </motion.div>
      </section>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 overflow-hidden rounded-3xl bg-white p-8 shadow-soft-lg"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-soft-md">
                <FiActivity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Recent Activity</h2>
                <p className="text-sm text-slate-600">Live updates from your library system</p>
              </div>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-emerald-500 hover:bg-emerald-50/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {activity.status === "completed" ? (
                        <div className="rounded-full bg-emerald-100 p-2">
                          <FiCheckCircle className="h-4 w-4 text-emerald-600" />
                        </div>
                      ) : (
                        <div className="rounded-full bg-amber-100 p-2">
                          <FiAlertCircle className="h-4 w-4 text-amber-600" />
                        </div>
                      )}
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-900">{activity.user}</p>
                        <p className="text-sm text-slate-600">{activity.book}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <FiClock className="h-3 w-3" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 capitalize">
                      {activity.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Quick Actions Card */}
          <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-soft-lg">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
              <div className="grid gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.label}
                      to={action.link}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="group flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-4 text-left transition-all hover:border-emerald-500 hover:bg-emerald-50/50 cursor-pointer"
                      >
                        <div className="rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-2 shadow-soft-md">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-semibold text-slate-900 transition-colors group-hover:text-emerald-600">
                          {action.label}
                        </span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-6 shadow-soft-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/90">
                <FiCheckCircle className="h-5 w-5" />
                <span className="text-sm font-semibold">System Status</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">All Systems Operational</h3>
                <p className="text-sm text-white/80">
                  Database, API, and services running smoothly
                </p>
              </div>
              <div className="space-y-2 text-sm text-white/90">
                <div className="flex items-center justify-between">
                  <span>Uptime</span>
                  <span className="font-semibold">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Response Time</span>
                  <span className="font-semibold">124ms</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AdminDashboard;
