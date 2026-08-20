import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  UserPlus,
  Shield,
  UserCheck,
  Eye,
  Edit2,
  Trash2,
  Lock,
  Search,
  CheckCircle2,
  XCircle,
  X,
  Save,
  AlertCircle
} from "lucide-react";
import { UserProfile, UserRole, UserStatus } from "../types";

interface UserManagementViewProps {
  users: UserProfile[];
  currentUser: UserProfile;
  onRefreshUsers: () => void;
  onSaveUser: (userData: Partial<UserProfile> & { password?: string }) => Promise<void>;
  onDeleteUser: (id: string) => Promise<void>;
}

export default function UserManagementView({
  users,
  currentUser,
  onRefreshUsers,
  onSaveUser,
  onDeleteUser
}: UserManagementViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState<UserRole>("employee");
  const [formStatus, setFormStatus] = useState<UserStatus>("active");
  const [formPassword, setFormPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const openCreateModal = () => {
    setEditingUser(null);
    setFormName("");
    setFormEmail("");
    setFormRole("employee");
    setFormStatus("active");
    setFormPassword("");
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserProfile) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
    setFormStatus(user.status);
    setFormPassword(""); // Leave blank unless changing
    setFormError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      setFormError("Name and Email are required.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      await onSaveUser({
        id: editingUser ? editingUser.id : undefined,
        name: formName.trim(),
        email: formEmail.trim(),
        role: formRole,
        status: formStatus,
        password: formPassword.trim() || undefined
      });
      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || "Failed to save user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const countAdmins = users.filter(u => u.role === "admin").length;
  const countEmployees = users.filter(u => u.role === "employee").length;
  const countViewers = users.filter(u => u.role === "viewer").length;

  return (
    <div className="space-y-6 font-sans">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Total Staff Users</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl font-extrabold font-display text-white">{users.length}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Admins (Full Control)</span>
            <Shield className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl font-extrabold font-display text-purple-300">{countAdmins}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Employees / Agents</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold font-display text-emerald-300">{countEmployees}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Viewers (Read-only)</span>
            <Eye className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-2xl font-extrabold font-display text-slate-300">{countViewers}</span>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-300 outline-none"
          >
            <option value="All">All Roles</option>
            <option value="admin">Admin Only</option>
            <option value="employee">Employee / Agent</option>
            <option value="viewer">Viewer Only</option>
          </select>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Create New User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role & Permissions</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((u) => {
                const isSelf = u.id === currentUser.id;

                return (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md">
                          {u.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white font-display flex items-center gap-1.5">
                            <span>{u.name}</span>
                            {isSelf && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {u.role === "admin" && (
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center gap-1 w-max">
                          <Shield className="w-3 h-3 text-purple-400" />
                          Admin (Full Control)
                        </span>
                      )}
                      {u.role === "employee" && (
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1 w-max">
                          <UserCheck className="w-3 h-3 text-emerald-400" />
                          Employee / Agent
                        </span>
                      )}
                      {u.role === "viewer" && (
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1 w-max">
                          <Eye className="w-3 h-3 text-slate-400" />
                          Viewer (Read-Only)
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {u.status === "active" ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold flex items-center gap-1 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono font-semibold flex items-center gap-1 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          Suspended
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                      {u.lastActive}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(u)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit User"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {!isSelf && (
                          <button
                            type="button"
                            onClick={() => onDeleteUser(u.id)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT USER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold font-display text-white">
                {editingUser ? `Edit User: ${editingUser.name}` : "Create New Staff User"}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Fatima Bello"
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="e.g. fatima@axion.ng"
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                  Assigned Role & Permissions *
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 font-mono"
                >
                  <option value="admin">Admin (Full Control, User Management & System Settings)</option>
                  <option value="employee">Employee / Agent (View & Reply Conversations)</option>
                  <option value="viewer">Viewer (Read-only Access to Conversations)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                  Account Status *
                </label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as UserStatus)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 font-mono"
                >
                  <option value="active">Active (Access Granted)</option>
                  <option value="suspended">Suspended (Access Blocked)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                  {editingUser ? "New Password (leave blank to keep current)" : "Initial Password *"}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  placeholder={editingUser ? "••••••••" : "Enter password (e.g. axion123)"}
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold hover:from-blue-500 hover:to-cyan-500 flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingUser ? "Update User" : "Create User"}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
