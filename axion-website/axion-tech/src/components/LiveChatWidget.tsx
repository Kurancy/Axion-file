import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Send,
  X,
  Minus,
  Sparkles,
  User,
  ShieldCheck,
  Tag,
  Clock,
  CheckCircle2,
  RefreshCw,
  Headphones,
  Bot
} from "lucide-react";
import { Conversation, ChatMessage } from "../types";
import AxionLogo from "./AxionLogo";
import { getOrCreateVisitorSession, updateVisitorName } from "../utils/visitorSession";

interface LiveChatWidgetProps {
  isDarkMode?: boolean;
}

const TOPICS = [
  "AI Automation",
  "ERP / SAP Integration",
  "WMS & Logistics",
  "Custom Software",
  "General Inquiry"
];

export default function LiveChatWidget({ isDarkMode = true }: LiveChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Visitor Session Identification
  const [visitorId, setVisitorId] = useState<string>("");
  const [visitorName, setVisitorName] = useState<string>("");
  const [topic, setTopic] = useState<string>("AI Automation");
  const [isNameSet, setIsNameSet] = useState<boolean>(false);

  // Chat Data & Message State
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const [unreadRepliesCount, setUnreadRepliesCount] = useState<number>(0);
  const lastMessageCountRef = useRef<number>(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Setup Visitor ID & Load initial session
  useEffect(() => {
    const session = getOrCreateVisitorSession();
    setVisitorId(session.visitorId);

    const savedName = localStorage.getItem("axion_visitor_name");
    if (savedName) {
      setVisitorName(savedName);
      setIsNameSet(true);
    } else {
      setVisitorName(session.visitorName);
    }

    const savedTopic = localStorage.getItem("axion_visitor_topic");
    if (savedTopic) {
      setTopic(savedTopic);
    }
  }, []);

  // Poll Conversation from Shared Backend
  const fetchConversation = async () => {
    if (!visitorId) return;
    try {
      const res = await fetch(`/api/conversations/visitor/${visitorId}`);
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setConversation(data);
          
          // Check for new admin replies when widget is closed or minimized
          const msgCount = data.messages ? data.messages.length : 0;
          if (msgCount > lastMessageCountRef.current) {
            const lastMsg = data.messages[msgCount - 1];
            if (lastMsg && lastMsg.sender === "admin" && (!isOpen || isMinimized)) {
              setUnreadRepliesCount(prev => prev + 1);
            }
            lastMessageCountRef.current = msgCount;
          }
        }
      }
    } catch (err) {
      console.error("Error polling conversation:", err);
    }
  };

  useEffect(() => {
    if (!visitorId) return;
    fetchConversation();
    const interval = setInterval(fetchConversation, 3000); // 3-second live polling
    return () => clearInterval(interval);
  }, [visitorId, isOpen, isMinimized]);

  // Scroll to bottom when conversation updates
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation?.messages, isOpen, isMinimized]);

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!visitorName.trim()) return;
    updateVisitorName(visitorName.trim());
    localStorage.setItem("axion_visitor_topic", topic);
    setIsNameSet(true);
  };

  const handleSendMessage = async (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!inputText.trim() || !visitorId || sending) return;

    const messageText = inputText.trim();
    setInputText("");
    setSending(true);

    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          visitorName: visitorName || "Enterprise Visitor",
          topic,
          text: messageText
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.conversation) {
          setConversation(data.conversation);
          lastMessageCountRef.current = data.conversation.messages.length;
        }
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const openWidget = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadRepliesCount(0);
  };

  return (
    <>
      {/* ----------------------------------------------------
          FLOATING ACTION TRIGGER BUTTON (BOTTOM RIGHT)
          ---------------------------------------------------- */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openWidget();
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            className="relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.45)] border border-blue-300/40 cursor-pointer flex items-center justify-center select-none"
            aria-label="Open Axion Live Chat"
          >
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md group-hover:bg-blue-400/40 transition-all duration-300" />
            
            <div className="relative z-10 flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

              {/* Unread Reply Notification Badge */}
              {unreadRepliesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-slate-950 animate-bounce shadow-lg">
                  {unreadRepliesCount}
                </span>
              )}
            </div>

            {/* Hover Tooltip Label */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-950/95 border border-blue-500/30 text-white shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 flex flex-col text-left whitespace-nowrap">
              <span className="text-[11px] font-bold font-display text-white leading-tight">
                Live Support Chat
              </span>
              <span className="text-[9px] font-mono text-blue-300 leading-tight">
                Connected to Admin Portal
              </span>
            </div>
          </motion.button>
        </div>
      )}

      {/* MINIMIZED DOCK BAR */}
      {isOpen && isMinimized && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#081226]/95 border border-blue-500/30 text-white backdrop-blur-xl shadow-2xl cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center border border-blue-400/30">
            <Headphones className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-display text-white">Live Support</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Connected to Axion Backend</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="ml-2 p-1 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* ----------------------------------------------------
          MAIN CHAT MODAL WINDOW
          ---------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[calc(100vh-3rem)] rounded-3xl border border-blue-500/30 bg-[#070e1c]/95 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* ── HEADER ── */}
            <div className="relative z-10 px-5 py-3.5 border-b border-blue-500/20 bg-slate-900/70 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 border border-blue-300/30 shadow-md">
                    <Headphones className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#070e1c]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-extrabold text-sm text-white tracking-wide">
                      Axion Live Support
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold uppercase">
                      Live Sync
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block font-sans">
                    Connected to Shared Admin Backend
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Minimize"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── CHAT BODY / FORM ── */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 font-sans scrollbar-thin scrollbar-thumb-slate-800">
              {!isNameSet ? (
                /* STEP 1: INITIAL VISITOR PROFILE REGISTRATION */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col justify-center space-y-5 p-2"
                >
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold font-display text-white">Start Live Support Chat</h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                      Please enter your name and select the primary topic for your inquiry to connect with an Axion Advisor.
                    </p>
                  </div>

                  <form onSubmit={handleStartChat} className="space-y-4 pt-2">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        Your Full Name / Corporate Title *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={visitorName}
                          onChange={(e) => setVisitorName(e.target.value)}
                          placeholder="e.g. Musa Ibrahim (CTO)"
                          className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        Inquiry Topic Tag *
                      </label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500 transition-colors"
                      >
                        {TOPICS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white text-xs font-bold font-sans hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Join Live Session</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Backend Sync active (Visitor ID: {visitorId.substring(0, 8)}...)</span>
                  </div>
                </motion.div>
              ) : (
                /* STEP 2: ACTIVE CONVERSATION THREAD */
                <div className="space-y-4">
                  {/* Visitor Session Info Banner */}
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-950 text-[11px] flex items-center justify-between text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-white">{visitorName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        {topic}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsNameSet(false);
                        }}
                        className="text-slate-400 hover:text-white underline text-[9px]"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Empty state or message list */}
                  {(!conversation || conversation.messages.length === 0) ? (
                    <div className="text-center py-10 space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-blue-400 flex items-center justify-center mx-auto border border-slate-800">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-400">No messages sent yet in this session.</p>
                      <p className="text-[11px] text-slate-500">Type a message below to start chatting live with our team.</p>
                    </div>
                  ) : (
                    conversation.messages.map((msg) => {
                      const isVisitor = msg.sender === "visitor";
                      const isAdmin = msg.sender === "admin";
                      const isAI = msg.sender === "AI";

                      return (
                        <div
                          key={msg.id}
                          className={`flex items-start gap-2.5 ${isVisitor ? "justify-end" : "justify-start"}`}
                        >
                          {!isVisitor && (
                            <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs text-white ${
                              isAdmin
                                ? "bg-gradient-to-tr from-emerald-600 to-teal-500 border border-emerald-400/40"
                                : "bg-gradient-to-tr from-blue-700 to-cyan-500 border border-blue-400/40"
                            }`}>
                              {isAdmin ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                            </div>
                          )}

                          <div className={`max-w-[82%] text-left`}>
                            <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                              isVisitor
                                ? "bg-blue-600 text-white rounded-tr-xs shadow-md shadow-blue-600/20"
                                : isAdmin
                                ? "bg-slate-900 border border-emerald-500/30 text-slate-100 rounded-tl-xs shadow-md border-l-4 border-l-emerald-500"
                                : "bg-slate-900 border border-blue-500/30 text-slate-200 rounded-tl-xs shadow-md border-l-4 border-l-blue-500"
                            }`}>
                              <div className="flex items-center justify-between mb-1 pb-0.5 border-b border-white/10 text-[9px] font-mono opacity-80">
                                <span className="font-bold">{msg.senderName}</span>
                                <span>{msg.timestamp}</span>
                              </div>
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                          </div>

                          {isVisitor && (
                            <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-xs text-slate-300">
                              <User className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* ── FOOTER INPUT BAR ── */}
            {isNameSet && (
              <form onSubmit={handleSendMessage} className="relative z-10 p-3 border-t border-blue-500/20 bg-slate-900/90 backdrop-blur-xl">
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 focus-within:border-blue-500 transition-colors">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message to Axion team..."
                    className="flex-1 bg-transparent border-none outline-none text-white text-xs px-3 py-1.5 placeholder-slate-500 font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || sending}
                    className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-blue-500 hover:to-cyan-400 transition-all shadow-md shadow-blue-500/20 shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[9px] text-slate-500 font-mono px-1">
                  <span>Synced in real-time with Admin Dashboard</span>
                  <span>Polling every 3s</span>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
