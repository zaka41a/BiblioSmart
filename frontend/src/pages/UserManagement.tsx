import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiUser,
  FiMail,
  FiCalendar
} from "react-icons/fi";

export const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("bibliosmart_registered_users") || "[]");
  });

  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleRole = (userId: string) => {
    const updatedUsers = users.map((user: any) => {
      if (user.id === userId) {
        return { ...user, role: user.role === "admin" ? "user" : "admin" };
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem("bibliosmart_registered_users", JSON.stringify(updatedUsers));
  };

  const handleDelete = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user: any) => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem("bibliosmart_registered_users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-10 shadow-soft-lg border border-emerald-200/30"
      >
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />

        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-4 py-2 backdrop-blur-sm">
            <FiUsers className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">User Management</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Manage <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Users</span>
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            View and manage all registered users in your system
          </p>
        </div>
      </motion.header>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-white p-6 shadow-soft-lg"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-4">
              <FiUsers className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{users.length}</p>
              <p className="text-sm font-medium text-slate-600">Total Users</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-white p-6 shadow-soft-lg"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 p-4">
              <FiUser className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">
                {users.filter((u: any) => u.role === "user").length}
              </p>
              <p className="text-sm font-medium text-slate-600">Regular Users</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl bg-white p-6 shadow-soft-lg"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-4">
              <FiShield className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">
                {users.filter((u: any) => u.role === "admin").length}
              </p>
              <p className="text-sm font-medium text-slate-600">Administrators</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search by name or email..."
          className="w-full rounded-2xl border-2 border-slate-200 bg-white px-16 py-4 text-base text-slate-700 transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="rounded-3xl bg-white p-6 shadow-soft-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">All Users ({filteredUsers.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Name</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Email</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">Role</th>
                <th className="pb-4 text-left text-sm font-semibold text-slate-700">User ID</th>
                <th className="pb-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: any, index: number) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiMail className="h-4 w-4" />
                      {user.email}
                    </div>
                  </td>
                  <td className="py-4">
                    {user.role === "admin" ? (
                      <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        <FiShield className="h-3 w-3" />
                        Admin
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        <FiUser className="h-3 w-3" />
                        User
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-sm font-mono text-slate-600">{user.id}</td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleRole(user.id)}
                        className="rounded-lg bg-amber-50 p-2 text-amber-600 transition-colors hover:bg-amber-100"
                        title={user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                      >
                        <FiShield className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100"
                        title="Delete User"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
