import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  ShieldCheck,
  Search,
  MessageSquare,
  Send,
  User,
  CheckCircle2,
  Clock,
  RefreshCw,
  LogOut,
  Sparkles,
  Inbox,
  Filter,
  Tag,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Bell,
  CheckCheck,
  Bot,
  AlertCircle,
  AlertTriangle,
  Users,
  Shield,
  UserCheck,
  Eye,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Globe2,
  ExternalLink,
  Menu,
  X
} from "lucide-react";
import { Conversation, ChatMessage, UserProfile, UserRole } from "../types";
import AxionLogo from "./AxionLogo";
import UserManagementView from "./UserManagementView";
import EmployeeDashboard from "./EmployeeDashboard";

interface AdminPortalProps {
  isDarkMode?: boolean;
  onExitAdmin?: () => void;
}

const QUICK_RESPONSES = [
  "Thank you for reaching out to Axion Technologies. An enterprise advisor is reviewing your request.",
  "We would be delighted to schedule a 30-minute technical architecture call with your team. What time works best?",
  "Our AI invoice processing microservice integrates directly with SAP Business One and S/4HANA. I can share our compliance documentation.",
  "We have forwarded your logistics requirements to our East Africa delivery node in Nairobi."
];

export default function AdminPortal({ isDarkMode = true, onExitAdmin }: AdminPortalProps) {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessCodeInput, setAccessCodeInput] = useState<string>("");
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isConnectionError, setIsConnectionError] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"code" | "credentials">("code");

  // Current Logged-In User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: "u_admin_1",
    name: "Alex Vance (System Lead)",
    email: "admin@axion.ng",
    role: "admin",
    status: "active",
    lastActive: "Just now"
  });

  // Sidebar Layout State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Active Admin View Tab: "conversations" | "users" | "profile"
  const [adminTab, setAdminTab] = useState<"conversations" | "users" | "profile">("conversations");

  // Users List State (Admin Management)
  const [usersList, setUsersList] = useState<UserProfile[]>([]);

  // Dashboard Data State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [topicFilter, setTopicFilter] = useState<string>("All");
  const [unreadFilter, setUnreadFilter] = useState<boolean>(false);

  // Reply Composer State
  const [replyText, setReplyText] = useState<string>("");
  const [sendingReply, setSendingReply] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Self Profile Form State
  const [selfName, setSelfName] = useState("");
  const [selfPassword, setSelfPassword] = useState("");
  const [profileMsg, setProfileMsg] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check saved session token & user profile on mount
  useEffect(() => {
    const token = localStorage.getItem("axion_admin_token");
    const savedUser = localStorage.getItem("axion_current_user");
    if (token) {
      setIsAuthenticated(true);
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setCurrentUser(parsed);
          setSelfName(parsed.name);
        } catch (e) {}
      }
    }
  }, []);

  // Fetch all conversations from shared backend
  const fetchConversations = async (silent = true) => {
    if (!silent) setIsRefreshing(true);
    try {
      const res = await fetch("/api/conversations");
      if (res.ok) {
        const data: Conversation[] = await res.json();
        setConversations(data);
        if (!selectedConvId && data.length > 0) {
          setSelectedConvId(data[0].id);
        }
      }
    } catch (err) {
      console.error("Error fetching conversations in Admin:", err);
    } finally {
      if (!silent) setIsRefreshing(false);
    }
  };

  // Fetch all staff users (Admin only)
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsersList(data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // REAL-TIME SYNC: Poll conversations every 3 SECONDS (3000ms) for near real-time sync with public site
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchConversations(true);
    if (currentUser.role === "admin") fetchUsers();

    const THREE_SECONDS_MS = 3000;
    const interval = setInterval(() => {
      fetchConversations(true);
    }, THREE_SECONDS_MS);

    return () => clearInterval(interval);
  }, [isAuthenticated, currentUser.role]);

  // Scroll to thread bottom when selected conversation changes
  const activeConversation = conversations.find(c => c.id === selectedConvId) || null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages?.length, selectedConvId]);

  // Mark conversation as read
  const handleSelectConversation = async (conv: Conversation) => {
    setSelectedConvId(conv.id);
    if (conv.unread) {
      try {
        await fetch(`/api/conversations/${conv.id}/read`, { method: "PATCH" });
        setConversations(prev =>
          prev.map(c => (c.id === conv.id ? { ...c, unread: false } : c))
        );
      } catch (err) {
        console.error("Error marking read:", err);
      }
    }
  };

  // Admin Login Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsConnectionError(false);
    setAuthLoading(true);

    const isCodeMatch = accessCodeInput && (accessCodeInput.trim() === "axion2026" || accessCodeInput.trim() === "admin");
    const isCredsMatch = usernameInput && passwordInput && (usernameInput.trim().toLowerCase() === "admin" && (passwordInput === "axion123" || passwordInput === "axion2026"));
    const isValidCredential = authMode === "code" ? isCodeMatch : isCredsMatch;

    try {
      const body = authMode === "code" 
        ? { accessCode: accessCodeInput }
        : { username: usernameInput, password: passwordInput };

      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const userObj: UserProfile = data.user || {
            id: "u_admin_1",
            name: "Alex Vance (System Lead)",
            email: "admin@axion.ng",
            role: "admin",
            status: "active",
            lastActive: "Just now"
          };
          localStorage.setItem("axion_admin_token", data.token);
          localStorage.setItem("axion_current_user", JSON.stringify(userObj));
          setCurrentUser(userObj);
          setSelfName(userObj.name);
          setIsAuthenticated(true);
          fetchConversations(false);
          return;
        } else {
          setAuthError(data.error || "Incorrect credentials. Try access code: axion2026");
          setIsConnectionError(false);
          return;
        }
      } else if (res.status === 401) {
        const data = await res.json().catch(() => ({}));
        setAuthError(data.error || "Incorrect credentials. Try access code: axion2026");
        setIsConnectionError(false);
        return;
      }

      // Offline / standalone fallback
      if (isValidCredential) {
        const fallbackAdmin: UserProfile = {
          id: "u_admin_1",
          name: "Alex Vance (System Lead)",
          email: "admin@axion.ng",
          role: "admin",
          status: "active",
          lastActive: "Just now"
        };
        localStorage.setItem("axion_admin_token", "axion_admin_token_" + Date.now());
        localStorage.setItem("axion_current_user", JSON.stringify(fallbackAdmin));
        setCurrentUser(fallbackAdmin);
        setSelfName(fallbackAdmin.name);
        setIsAuthenticated(true);
        fetchConversations(false);
        return;
      } else {
        setAuthError("Failed to connect to authentication backend.");
        setIsConnectionError(true);
      }
    } catch (err) {
      if (isValidCredential) {
        const fallbackAdmin: UserProfile = {
          id: "u_admin_1",
          name: "Alex Vance (System Lead)",
          email: "admin@axion.ng",
          role: "admin",
          status: "active",
          lastActive: "Just now"
        };
        localStorage.setItem("axion_admin_token", "axion_admin_token_" + Date.now());
        localStorage.setItem("axion_current_user", JSON.stringify(fallbackAdmin));
        setCurrentUser(fallbackAdmin);
        setSelfName(fallbackAdmin.name);
        setIsAuthenticated(true);
        fetchConversations(false);
        return;
      } else {
        setAuthError("Failed to connect to authentication backend.");
        setIsConnectionError(true);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("axion_admin_token");
    localStorage.removeItem("axion_current_user");
    setIsAuthenticated(false);
  };

  // Send Admin/Agent Reply
  const handleSendReply = async (textToSend?: string) => {
    const text = textToSend || replyText;
    if (!text || !text.trim() || !selectedConvId || sendingReply) return;

    // Viewers cannot send replies
    if (currentUser.role === "viewer") {
      alert("Viewer accounts have read-only access and cannot send replies.");
      return;
    }

    const messageText = text.trim();
    if (!textToSend) setReplyText("");
    setSendingReply(true);

    try {
      const res = await fetch(`/api/conversations/${selectedConvId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: messageText,
          senderName: currentUser.name
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.conversation) {
          setConversations(prev =>
            prev.map(c => (c.id === selectedConvId ? data.conversation : c))
          );
        }
      }
    } catch (err) {
      console.error("Failed to send reply:", err);
    } finally {
      setSendingReply(false);
    }
  };

  // User Management Actions (Admin Only)
  const handleSaveUser = async (userData: Partial<UserProfile> & { password?: string }) => {
    const isEdit = !!userData.id;
    const url = isEdit ? `/api/users/${userData.id}` : "/api/users";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Failed to save user.");
    }

    fetchUsers();
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this staff user?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchUsers();
    }
  };

  // Self Profile Update (User can update own name & password, but NOT role)
  const handleUpdateSelfProfile = async (name: string, password?: string) => {
    const res = await fetch(`/api/users/${currentUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password })
    });

    if (res.ok) {
      const updated = { ...currentUser, name };
      setCurrentUser(updated);
      localStorage.setItem("axion_current_user", JSON.stringify(updated));
      setProfileMsg("Profile updated successfully!");
    } else {
      throw new Error("Failed to update profile.");
    }
  };

  // Delete Conversation
  const handleDeleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentUser.role !== "admin") {
      alert("Only Administrators can delete conversations.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this conversation thread?")) return;

    try {
      const res = await fetch(`/api/conversations/${id}`, { method: "DELETE" });
      if (res.ok) {
        setConversations(prev => prev.filter(c => c.id !== id));
        if (selectedConvId === id) {
          const remaining = conversations.filter(c => c.id !== id);
          setSelectedConvId(remaining.length > 0 ? remaining[0].id : null);
        }
      }
    } catch (err) {
      console.error("Failed to delete conversation:", err);
    }
  };

  // Filter conversations
  const filteredConversations = conversations.filter(c => {
    const matchesSearch =
      c.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.messages.some(m => m.text.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTopic = topicFilter === "All" || c.topic === topicFilter;
    const matchesUnread = !unreadFilter || c.unread;

    return matchesSearch && matchesTopic && matchesUnread;
  });

  const totalUnread = conversations.filter(c => c.unread).length;

  // ----------------------------------------------------
  // SCREEN 1: GATED LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070e1c] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex justify-center mb-4">
              <AxionLogo logoSize={48} isDarkMode={true} glow={true} />
            </div>
            <h1 className="text-2xl font-extrabold font-display text-white tracking-tight">
              Axion Staff & Admin Portal
            </h1>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Gated Role-Based Access • Shared Backend Real-Time Sync
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-slate-900/90 border border-blue-500/25 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
              <button
                type="button"
                onClick={() => { setAuthMode("code"); setAuthError(""); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg font-mono transition-all ${
                  authMode === "code"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Access Code
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode("credentials"); setAuthError(""); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg font-mono transition-all ${
                  authMode === "credentials"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                User & Password
              </button>
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-5 p-3.5 rounded-xl border text-xs flex items-center gap-3 shadow-lg ${
                  isConnectionError
                    ? "bg-[#380b0b] border-red-600 text-red-400"
                    : "bg-amber-950/40 border-amber-500/40 text-amber-300"
                }`}
              >
                {isConnectionError ? (
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="font-semibold">{authError}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {authMode === "code" ? (
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                    Administrator Access Code *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <input
                      type="password"
                      required
                      value={accessCodeInput}
                      onChange={(e) => setAccessCodeInput(e.target.value)}
                      placeholder="Enter Access Code (Default: axion2026)"
                      className="w-full pl-9 pr-3 py-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 transition-colors font-mono tracking-widest"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                      Email / Username *
                    </label>
                    <input
                      type="text"
                      required
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="e.g. admin@axion.ng or fatima@axion.ng"
                      className="w-full px-3 py-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter password (e.g. axion123)"
                      className="w-full px-3 py-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold font-sans hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25 cursor-pointer flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize Portal Access</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 font-mono">
                Hint: Access Code is <strong className="text-blue-400">axion2026</strong>
              </span>
              {onExitAdmin && (
                <button
                  type="button"
                  onClick={onExitAdmin}
                  className="mt-3 block text-xs text-slate-400 hover:text-white mx-auto underline cursor-pointer"
                >
                  Return to Public Website
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // EMPLOYEE ROLE HANDLING
  if (currentUser.role === "employee") {
    return (
      <EmployeeDashboard
        currentUser={currentUser}
        conversations={conversations}
        selectedConvId={selectedConvId}
        onSelectConversation={handleSelectConversation}
        onSendReply={async (text) => handleSendReply(text)}
        onUpdateProfile={handleUpdateSelfProfile}
        onLogout={handleLogout}
        onRefresh={() => fetchConversations(false)}
        isRefreshing={isRefreshing}
        onExitAdmin={onExitAdmin}
      />
    );
  }

  // ----------------------------------------------------
  // SCREEN 2: REDESIGNED ADMIN DASHBOARD WITH FIXED SIDEBAR
  // ----------------------------------------------------
  return (
    <div className="h-screen w-screen bg-[#070e1c] text-slate-100 flex overflow-hidden font-sans select-none-text">
      
      {/* ── MOBILE OVERLAY FOR BACKDROP ── */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* ----------------------------------------------------
          FIXED LEFT SIDEBAR (STICKY / IMMOVABLE)
          ---------------------------------------------------- */}
      <aside
        className={`h-screen flex flex-col flex-shrink-0 bg-[#081226] border-r border-blue-950/80 transition-all duration-300 z-50 fixed md:static top-0 left-0 ${
          isMobileSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
        } ${isSidebarCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        {/* ── SIDEBAR HEADER ── */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-blue-950/70 shrink-0 bg-[#060c1a]/90">
          <div className="flex items-center gap-3 overflow-hidden">
            <AxionLogo logoSize={32} isDarkMode={true} />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <div className="flex flex-col">
                <span className="font-display font-black text-sm text-white tracking-wide leading-tight">
                  AXION
                </span>
                <span className="text-[9px] font-mono text-blue-400 leading-tight font-bold">
                  ADMIN SYSTEM
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle Button */}
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── USER INFO CARD ── */}
        <div className={`p-3 border-b border-blue-950/50 bg-slate-950/40 shrink-0 ${isSidebarCollapsed ? "text-center" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 mx-auto md:mx-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-500 text-white font-extrabold flex items-center justify-center text-xs shadow-md border border-purple-400/30">
                {currentUser.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#081226]" />
            </div>

            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-white font-display truncate">
                  {currentUser.name}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                    {currentUser.role}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">System Controller</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── SIDEBAR NAVIGATION LINKS ── */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
          <div className={`text-[10px] font-mono font-bold uppercase text-slate-500 px-3 py-1.5 ${isSidebarCollapsed ? "text-center text-[8px]" : ""}`}>
            {isSidebarCollapsed ? "NAV" : "Main Navigation"}
          </div>

          {/* Tab 1: Inbox */}
          <button
            type="button"
            onClick={() => { setAdminTab("conversations"); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold font-sans transition-all group relative ${
              adminTab === "conversations"
                ? "bg-gradient-to-r from-blue-600/30 to-cyan-600/10 text-white border-l-4 border-l-blue-400 shadow-md font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
            title="Inbox & Support Threads"
          >
            <MessageSquare className={`w-4 h-4 shrink-0 ${adminTab === "conversations" ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200"}`} />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate flex-1 text-left">Inbox & Messages</span>
            )}
            {totalUnread > 0 && (
              <span className={`px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-mono font-extrabold shadow-sm ${
                isSidebarCollapsed && !isMobileSidebarOpen ? "absolute top-1 right-1 px-1 py-0 text-[8px]" : "shrink-0"
              }`}>
                {totalUnread}
              </span>
            )}
          </button>

          {/* Tab 2: User Management (Admin Only) */}
          {currentUser.role === "admin" && (
            <button
              type="button"
              onClick={() => { setAdminTab("users"); fetchUsers(); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold font-sans transition-all group relative ${
                adminTab === "users"
                  ? "bg-gradient-to-r from-blue-600/30 to-cyan-600/10 text-white border-l-4 border-l-blue-400 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
              title="User Management & Access Control"
            >
              <Users className={`w-4 h-4 shrink-0 ${adminTab === "users" ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200"}`} />
              {(!isSidebarCollapsed || isMobileSidebarOpen) && (
                <span className="truncate flex-1 text-left">User Management</span>
              )}
            </button>
          )}

          {/* Tab 3: My Profile */}
          <button
            type="button"
            onClick={() => { setAdminTab("profile"); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold font-sans transition-all group relative ${
              adminTab === "profile"
                ? "bg-gradient-to-r from-blue-600/30 to-cyan-600/10 text-white border-l-4 border-l-blue-400 shadow-md font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
            title="Account Profile & Settings"
          >
            <User className={`w-4 h-4 shrink-0 ${adminTab === "profile" ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200"}`} />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate flex-1 text-left">My Profile</span>
            )}
          </button>
        </nav>

        {/* ── PINNED SIDEBAR FOOTER (STATUS & ACTIONS) ── */}
        <div className="p-3 border-t border-blue-950/70 bg-[#060c1a]/95 space-y-2 shrink-0">
          {/* Live Sync Status Indicator */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[10px] font-mono text-emerald-400 ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}>
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate font-semibold">Live 3s Sync Active</span>
            )}
          </div>

          {/* Manual Refresh Button */}
          <button
            type="button"
            onClick={() => fetchConversations(false)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-colors cursor-pointer ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
            title="Refresh conversations immediately"
          >
            <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${isRefreshing ? "animate-spin text-blue-400" : ""}`} />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate">Refresh Data</span>
            )}
          </button>

          {/* Public Site Link */}
          {onExitAdmin && (
            <button
              type="button"
              onClick={onExitAdmin}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-800/50 text-blue-300 text-xs font-semibold transition-colors cursor-pointer ${
                isSidebarCollapsed ? "justify-center" : ""
              }`}
              title="Return to Public Website"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              {(!isSidebarCollapsed || isMobileSidebarOpen) && (
                <span className="truncate">Public Website</span>
              )}
            </button>
          )}

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 text-xs font-semibold transition-colors cursor-pointer ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
            title="Logout of Admin Portal"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* ----------------------------------------------------
          MAIN CONTENT PANEL (FLEX-1, INDEPENDENT SCROLLING)
          ---------------------------------------------------- */}
      <main className="flex-1 h-screen flex flex-col overflow-hidden min-w-0 bg-[#070e1c]">
        
        {/* ── TOP FIXED SECTION HEADER ── */}
        <header className="h-16 border-b border-blue-950/70 px-4 sm:px-6 bg-[#081226]/90 backdrop-blur-xl flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base font-bold font-display text-white tracking-tight flex items-center gap-2">
                {adminTab === "conversations" && "Support Inbox & Live Messaging"}
                {adminTab === "users" && "User Management & System Access"}
                {adminTab === "profile" && "Administrator Account Profile"}
              </h1>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Shared Backend Single Source of Truth • Real-Time Polling Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-[10px] font-mono text-blue-300 font-bold">
              <Shield className="w-3 h-3 text-blue-400" />
              Role: {currentUser.role.toUpperCase()}
            </span>
          </div>
        </header>

        {/* ── BODY CONTENT CONTAINER ── */}
        <div className="flex-1 overflow-hidden relative">

          {/* TAB 1: CONVERSATIONS / INBOX VIEW */}
          {adminTab === "conversations" && (
            <div className="h-full flex flex-col md:flex-row p-4 sm:p-6 gap-6 overflow-hidden">
              
              {/* Left Conversations List (Independent Scroll) */}
              <div className="w-full md:w-80 lg:w-96 h-full flex flex-col bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-xl shrink-0">
                <div className="p-4 border-b border-slate-800/80 space-y-3 bg-slate-900/95 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-blue-400" />
                      <h2 className="text-sm font-bold font-display text-white">Conversations</h2>
                    </div>
                    {totalUnread > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold font-mono animate-pulse">
                        {totalUnread} Unread
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Filter by visitor, topic, text..."
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 font-sans"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setUnreadFilter(!unreadFilter)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-colors border ${
                        unreadFilter
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      Unread Only
                    </button>

                    <select
                      value={topicFilter}
                      onChange={(e) => setTopicFilter(e.target.value)}
                      className="px-2 py-1 rounded-lg text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-300 outline-none"
                    >
                      <option value="All">All Topics</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="ERP / SAP Integration">ERP / SAP</option>
                      <option value="WMS & Logistics">WMS Logistics</option>
                      <option value="Custom Software">Custom Software</option>
                      <option value="General Inquiry">General</option>
                    </select>
                  </div>
                </div>

                {/* List Body (Scrolls Independently) */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 scrollbar-thin scrollbar-thumb-slate-800">
                  {filteredConversations.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500 font-mono">
                      No conversations found matching filter.
                    </div>
                  ) : (
                    filteredConversations.map((conv) => {
                      const isSelected = conv.id === selectedConvId;
                      const lastMsg = conv.messages && conv.messages.length > 0
                        ? conv.messages[conv.messages.length - 1]
                        : null;

                      return (
                        <div
                          key={conv.id}
                          onClick={() => handleSelectConversation(conv)}
                          className={`p-4 transition-all cursor-pointer relative group ${
                            isSelected
                              ? "bg-blue-950/70 border-l-4 border-l-blue-400"
                              : "hover:bg-slate-800/40"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${
                                conv.unread ? "bg-blue-400 animate-pulse" : "bg-slate-600"
                              }`} />
                              <span className={`text-xs font-bold font-display ${
                                conv.unread ? "text-white" : "text-slate-200"
                              }`}>
                                {conv.visitorName}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">
                              {lastMsg ? lastMsg.timestamp : ""}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-slate-950 border border-slate-800 text-blue-300">
                              {conv.topic}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono text-slate-400 bg-slate-950 border border-slate-800">
                              {conv.visitorId}
                            </span>
                            {conv.unread && (
                              <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-blue-500 text-white uppercase">
                                New
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {lastMsg ? `${lastMsg.senderName}: ${lastMsg.text}` : "No messages"}
                          </p>

                          {currentUser.role === "admin" && (
                            <button
                              onClick={(e) => handleDeleteConversation(conv.id, e)}
                              title="Delete thread"
                              className="absolute right-3 bottom-3 p-1.5 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Thread Detail View (Independent Scroll) */}
              <div className="flex-1 h-full flex flex-col bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-xl">
                {activeConversation ? (
                  <>
                    <div className="p-4 border-b border-slate-800 bg-slate-900/95 flex items-center justify-between shrink-0">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-bold font-display text-white">
                            {activeConversation.visitorName}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-blue-950 border border-blue-800 text-blue-300">
                            {activeConversation.topic}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                          Visitor ID: {activeConversation.visitorId} • Active Thread
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Live Real-Time Sync
                        </span>
                      </div>
                    </div>

                    {/* Messages Body (Scrolls Independently) */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
                      {activeConversation.messages.map((msg) => {
                        const isVisitor = msg.sender === "visitor";
                        const isAdmin = msg.sender === "admin";
                        const isAI = msg.sender === "AI";

                        return (
                          <div
                            key={msg.id}
                            className={`flex items-start gap-3 ${isAdmin ? "justify-end" : "justify-start"}`}
                          >
                            {!isAdmin && (
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-white ${
                                isAI
                                  ? "bg-gradient-to-tr from-blue-700 to-cyan-500 border border-blue-400/40"
                                  : "bg-slate-800 border border-slate-700"
                              }`}>
                                {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4 text-slate-300" />}
                              </div>
                            )}

                            <div className="max-w-[80%]">
                              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                                isAdmin
                                  ? "bg-gradient-to-r from-emerald-700 to-teal-700 text-white rounded-tr-xs shadow-lg border border-emerald-500/40"
                                  : isAI
                                  ? "bg-slate-900 border border-blue-500/30 text-slate-200 rounded-tl-xs border-l-4 border-l-blue-500"
                                  : "bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-xs border-l-4 border-l-blue-400"
                              }`}>
                                <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-white/10 text-[10px] font-mono opacity-80">
                                  <span className="font-bold">{msg.senderName}</span>
                                  <span>{msg.timestamp}</span>
                                </div>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                              </div>
                            </div>

                            {isAdmin && (
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5 text-white shadow-md">
                                <User className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Reply Form / Viewer Mode Notice */}
                    {currentUser.role !== "viewer" ? (
                      <div className="p-4 border-t border-slate-800 bg-slate-900/95 space-y-3 shrink-0">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1.5">
                            Quick Templates:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {QUICK_RESPONSES.map((tmpl, idx) => (
                              <button
                                key={idx}
                                onClick={() => setReplyText(tmpl)}
                                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-blue-950 border border-slate-800 hover:border-blue-500/40 text-[11px] text-slate-300 hover:text-blue-200 transition-all text-left line-clamp-1 cursor-pointer"
                              >
                                &ldquo;{tmpl.substring(0, 45)}...&rdquo;
                              </button>
                            ))}
                          </div>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); handleSendReply(); }} className="flex items-end gap-2 pt-1">
                          <textarea
                            rows={2}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type official response (synced live with public site)..."
                            className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm outline-none focus:border-emerald-500 resize-none font-sans"
                          />
                          <button
                            type="submit"
                            disabled={!replyText.trim() || sendingReply}
                            className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 transition-all shrink-0 cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                          >
                            <Send className="w-4 h-4" />
                            <span>Send Reply</span>
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="p-4 border-t border-slate-800 bg-slate-950 text-center text-xs text-slate-400 font-mono shrink-0">
                        Viewer Mode: You have read-only access to conversation threads.
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400">
                    Select a conversation thread on the left.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: USER MANAGEMENT (ADMIN ONLY) */}
          {adminTab === "users" && currentUser.role === "admin" && (
            <div className="h-full overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-slate-800">
              <UserManagementView
                users={usersList}
                currentUser={currentUser}
                onRefreshUsers={fetchUsers}
                onSaveUser={handleSaveUser}
                onDeleteUser={handleDeleteUser}
              />
            </div>
          )}

          {/* TAB 3: SELF PROFILE */}
          {adminTab === "profile" && (
            <div className="h-full overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
              <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl space-y-4 shadow-2xl">
                <h3 className="text-base font-bold font-display text-white">Administrator Profile</h3>
                {profileMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                    {profileMsg}
                  </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); handleUpdateSelfProfile(selfName, selfPassword); }} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={selfName}
                      onChange={(e) => setSelfName(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">Email (Read-Only)</label>
                    <input
                      type="text"
                      disabled
                      value={currentUser.email}
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950/50 border border-slate-800/60 text-slate-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">Change Password</label>
                    <input
                      type="password"
                      value={selfPassword}
                      onChange={(e) => setSelfPassword(e.target.value)}
                      placeholder="Enter new password..."
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/20 cursor-pointer"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
