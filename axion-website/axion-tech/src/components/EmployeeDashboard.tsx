import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MessageSquare,
  UserCheck,
  CheckCircle2,
  Clock,
  User,
  Lock,
  Save,
  AlertCircle,
  Inbox,
  Send,
  LogOut,
  Bot,
  RefreshCw,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  Shield
} from "lucide-react";
import { Conversation, UserProfile } from "../types";
import AxionLogo from "./AxionLogo";

interface EmployeeDashboardProps {
  currentUser: UserProfile;
  conversations: Conversation[];
  selectedConvId: string | null;
  onSelectConversation: (conv: Conversation) => void;
  onSendReply: (text: string) => Promise<void>;
  onUpdateProfile: (name: string, password?: string) => Promise<void>;
  onLogout: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onExitAdmin?: () => void;
}

export default function EmployeeDashboard({
  currentUser,
  conversations,
  selectedConvId,
  onSelectConversation,
  onSendReply,
  onUpdateProfile,
  onLogout,
  onRefresh,
  isRefreshing,
  onExitAdmin
}: EmployeeDashboardProps) {
  const [activeTab, setActiveTab] = useState<"assigned" | "profile">("assigned");

  // Sidebar layout state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Profile Form State
  const [nameInput, setNameInput] = useState(currentUser.name);
  const [passwordInput, setPasswordInput] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Reply State
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const activeConv = conversations.find(c => c.id === selectedConvId) || (conversations.length > 0 ? conversations[0] : null);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess("");
    setProfileError("");
    setIsSavingProfile(true);

    try {
      await onUpdateProfile(nameInput.trim(), passwordInput.trim() || undefined);
      setProfileSuccess("Profile updated successfully.");
      setPasswordInput("");
    } catch (err: any) {
      setProfileError(err.message || "Failed to update profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!replyText.trim() || sendingReply) return;

    const text = replyText.trim();
    setReplyText("");
    setSendingReply(true);

    try {
      await onSendReply(text);
    } catch (err) {
      console.error("Error sending reply:", err);
    } finally {
      setSendingReply(false);
    }
  };

  const openCount = conversations.filter(c => c.unread).length;
  const totalCount = conversations.length;

  return (
    <div className="h-screen w-screen bg-[#070e1c] text-slate-100 flex overflow-hidden font-sans select-none-text">
      
      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* FIXED LEFT SIDEBAR */}
      <aside
        className={`h-screen flex flex-col flex-shrink-0 bg-[#081226] border-r border-blue-950/80 transition-all duration-300 z-50 fixed md:static top-0 left-0 ${
          isMobileSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
        } ${isSidebarCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-blue-950/70 shrink-0 bg-[#060c1a]/90">
          <div className="flex items-center gap-3 overflow-hidden">
            <AxionLogo logoSize={32} isDarkMode={true} />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <div className="flex flex-col">
                <span className="font-display font-black text-sm text-white tracking-wide leading-tight">
                  AXION
                </span>
                <span className="text-[9px] font-mono text-emerald-400 leading-tight font-bold">
                  STAFF AGENT
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className={`p-3 border-b border-blue-950/50 bg-slate-950/40 shrink-0 ${isSidebarCollapsed ? "text-center" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 mx-auto md:mx-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-extrabold flex items-center justify-center text-xs shadow-md border border-emerald-400/30">
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
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                    Agent
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">Support Queue</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
          <div className={`text-[10px] font-mono font-bold uppercase text-slate-500 px-3 py-1.5 ${isSidebarCollapsed ? "text-center text-[8px]" : ""}`}>
            Navigation
          </div>

          <button
            type="button"
            onClick={() => { setActiveTab("assigned"); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold font-sans transition-all group relative ${
              activeTab === "assigned"
                ? "bg-gradient-to-r from-emerald-600/30 to-teal-600/10 text-white border-l-4 border-l-emerald-400 shadow-md font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <MessageSquare className={`w-4 h-4 shrink-0 ${activeTab === "assigned" ? "text-emerald-400" : "text-slate-400"}`} />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate flex-1 text-left">Support Queue</span>
            )}
            {openCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-bold">
                {openCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab("profile"); setIsMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold font-sans transition-all group relative ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-emerald-600/30 to-teal-600/10 text-white border-l-4 border-l-emerald-400 shadow-md font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <User className={`w-4 h-4 shrink-0 ${activeTab === "profile" ? "text-emerald-400" : "text-slate-400"}`} />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate flex-1 text-left">My Profile</span>
            )}
          </button>
        </nav>

        {/* Pinned Footer */}
        <div className="p-3 border-t border-blue-950/70 bg-[#060c1a]/95 space-y-2 shrink-0">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[10px] font-mono text-emerald-400 ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}>
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate font-semibold">Live 3s Sync</span>
            )}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-colors cursor-pointer ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate">Refresh</span>
            )}
          </button>

          {onExitAdmin && (
            <button
              type="button"
              onClick={onExitAdmin}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-800/50 text-blue-300 text-xs font-semibold transition-colors cursor-pointer ${
                isSidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              {(!isSidebarCollapsed || isMobileSidebarOpen) && (
                <span className="truncate">Public Website</span>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onLogout}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 text-xs font-semibold transition-colors cursor-pointer ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="truncate">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen flex flex-col overflow-hidden min-w-0 bg-[#070e1c]">
        <header className="h-16 border-b border-blue-950/70 px-4 sm:px-6 bg-[#081226]/90 backdrop-blur-xl flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base font-bold font-display text-white tracking-tight">
                {activeTab === "assigned" ? "Assigned Support Queue" : "Agent Profile Settings"}
              </h1>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Near Real-Time Synchronized Support Portal
              </span>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-[10px] font-mono text-emerald-300 font-bold">
            <UserCheck className="w-3 h-3 text-emerald-400" />
            Agent Workspace
          </span>
        </header>

        <div className="flex-1 overflow-hidden relative">
          {activeTab === "assigned" ? (
            <div className="h-full flex flex-col md:flex-row p-4 sm:p-6 gap-6 overflow-hidden">
              {/* Queue List (Scrolls independently) */}
              <div className="w-full md:w-80 h-full flex flex-col bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-xl shrink-0">
                <div className="p-4 border-b border-slate-800 bg-slate-900/95 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold font-display text-white">Incoming Queue</h3>
                  </div>
                  {openCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold font-mono">
                      {openCount} Open
                    </span>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 scrollbar-thin scrollbar-thumb-slate-800">
                  {conversations.map((c) => {
                    const isSelected = activeConv?.id === c.id;
                    const lastMsg = c.messages[c.messages.length - 1];

                    return (
                      <div
                        key={c.id}
                        onClick={() => onSelectConversation(c)}
                        className={`p-3.5 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-950/60 border-l-4 border-l-emerald-400"
                            : "hover:bg-slate-800/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold font-display text-white">{c.visitorName}</span>
                          <span className="text-[9px] font-mono text-slate-400">{lastMsg?.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-slate-950 border border-slate-800 text-emerald-300">
                            {c.topic}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-mono text-slate-400 bg-slate-950 border border-slate-800">
                            {c.visitorId}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{lastMsg?.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Thread detail (Scrolls independently) */}
              <div className="flex-1 h-full flex flex-col bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-xl">
                {activeConv ? (
                  <>
                    <div className="p-4 border-b border-slate-800 bg-slate-900/95 flex items-center justify-between shrink-0">
                      <div>
                        <h3 className="text-sm font-bold font-display text-white">{activeConv.visitorName}</h3>
                        <span className="text-[10px] text-slate-400 font-mono">Topic: {activeConv.topic}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        Assigned to {currentUser.name}
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
                      {activeConv.messages.map((m) => {
                        const isAdmin = m.sender === "admin";
                        return (
                          <div
                            key={m.id}
                            className={`flex items-start gap-2.5 ${isAdmin ? "justify-end" : "justify-start"}`}
                          >
                            {!isAdmin && (
                              <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-xs text-slate-300">
                                {m.sender === "AI" ? <Bot className="w-3.5 h-3.5 text-blue-400" /> : <User className="w-3.5 h-3.5" />}
                              </div>
                            )}

                            <div className="max-w-[80%]">
                              <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                                isAdmin
                                  ? "bg-emerald-600 text-white rounded-tr-xs shadow-md"
                                  : "bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-xs"
                              }`}>
                                <div className="flex items-center justify-between mb-1 text-[9px] font-mono opacity-80 pb-0.5 border-b border-white/10">
                                  <span className="font-bold">{m.senderName}</span>
                                  <span>{m.timestamp}</span>
                                </div>
                                <p className="whitespace-pre-wrap">{m.text}</p>
                              </div>
                            </div>

                            {isAdmin && (
                              <div className="w-7 h-7 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs text-white">
                                <User className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <form onSubmit={handleReplySubmit} className="p-3 border-t border-slate-800 bg-slate-900/95 flex gap-2 shrink-0">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type agent reply to visitor..."
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        disabled={!replyText.trim() || sendingReply}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400">
                    Select a support conversation to view thread.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
              <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold font-display text-white">Employee Profile Settings</h3>
                </div>

                {profileSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{profileSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">Your Display Name *</label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">Corporate Email (Read-Only)</label>
                    <input
                      type="text"
                      disabled
                      value={currentUser.email}
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950/50 border border-slate-800/60 text-slate-500 font-mono cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">Update Password (Optional)</label>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter new password to change..."
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:from-emerald-500 hover:to-teal-500 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
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
