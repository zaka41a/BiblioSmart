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
  FiX,
  FiSave,
  FiLock
} from "react-icons/fi";

export const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("bibliosmart_registered_users") || "[]");
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" as "user" | "admin"
  });

  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      password: user.password || "",
      role: user.role
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;

    const updatedUsers = users.map((user: any) => {
      if (user.id === editingUser.id) {
        return {
          ...user,
          name: editFormData.name,
          email: editFormData.email,
          password: editFormData.password,
          role: editFormData.role
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem("bibliosmart_registered_users", JSON.stringify(updatedUsers));
    resetEditForm();
  };

  const resetEditForm = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
    setEditFormData({
      name: "",
      email: "",
      password: "",
      role: "user"
    });
  };

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
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="rounded-lg bg-white p-4 shadow-md border border-slate-200">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name or email..."
            className="w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 py-2 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users List */}
      <div className="rounded-lg bg-white shadow-md border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
          <h2 className="font-semibold text-slate-900">
            All Users ({filteredUsers.length})
          </h2>
        </div>

        <div className="divide-y divide-slate-200">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user: any) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Avatar */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{user.name}</h3>
                      {user.role === "admin" ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                          <FiShield className="h-3 w-3" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                          <FiUser className="h-3 w-3" />
                          User
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiMail className="h-4 w-4" />
                      {user.email}
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      ID: {user.id}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    title="Edit User"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleRole(user.id)}
                    className="rounded-md bg-amber-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
                    title={user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                  >
                    <FiShield className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                    title="Delete User"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500">
              <FiUsers className="mx-auto mb-3 h-12 w-12 opacity-30" />
              <p className="font-medium">No users found</p>
              <p className="text-sm">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
          onClick={resetEditForm}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-lg bg-white shadow-xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Edit User</h2>
                <p className="text-sm text-slate-600">Update user information and role</p>
              </div>
              <button
                onClick={resetEditForm}
                className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 p-6 max-h-[70vh] overflow-y-auto">
              {/* Name Field */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FiUser className="h-4 w-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FiMail className="h-4 w-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter email address"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FiLock className="h-4 w-4" />
                  New Password
                </label>
                <input
                  type="password"
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter new password (optional)"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Leave empty to keep current password
                </p>
              </div>

              {/* Role Selection */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FiShield className="h-4 w-4" />
                  User Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEditFormData({ ...editFormData, role: "user" })}
                    className={`flex items-center justify-center gap-2 rounded-md border-2 p-3 font-medium transition-all ${
                      editFormData.role === "user"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <FiUser className="h-5 w-5" />
                    Regular User
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditFormData({ ...editFormData, role: "admin" })}
                    className={`flex items-center justify-center gap-2 rounded-md border-2 p-3 font-medium transition-all ${
                      editFormData.role === "admin"
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <FiShield className="h-5 w-5" />
                    Administrator
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                onClick={resetEditForm}
                className="flex-1 rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              >
                <FiSave className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
