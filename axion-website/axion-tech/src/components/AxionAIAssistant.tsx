import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  X,
  Minus,
  Maximize2,
  Minimize2,
  Send,
  Paperclip,
  Mic,
  MicOff,
  Building2,
  Layers,
  Package,
  Database,
  Cpu,
  Code,
  TrendingUp,
  Globe,
  Calendar,
  Mail,
  Copy,
  Check,
  Bot,
  User,
  ArrowUpRight,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { AxionLogo } from "./AxionLogo";
import { ActivePage } from "../types";
import {
  AxionAIService,
  AxionAIMessage,
  SUGGESTED_QUESTIONS,
  AxionAISuggestion
} from "../services/axionAIService";
import { getOrCreateVisitorSession } from "../utils/visitorSession";

interface AxionAIAssistantProps {
  setActivePage?: (page: ActivePage) => void;
  isDarkMode?: boolean;
}

export default function AxionAIAssistant({
  setActivePage,
  isDarkMode = true
}: AxionAIAssistantProps) {
  // Assistant Modal States
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasHoveredTrigger, setHasHoveredTrigger] = useState(false);

  // Chat State
  const [messages, setMessages] = useState<AxionAIMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Adjust textarea height automatically
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  // Icon mapping helper for suggested question pills
  const getSuggestionIcon = (iconName: string) => {
    switch (iconName) {
      case "Building2": return <Building2 className="w-4 h-4 text-blue-400" />;
      case "Layers": return <Layers className="w-4 h-4 text-cyan-400" />;
      case "Package": return <Package className="w-4 h-4 text-amber-400" />;
      case "Database": return <Database className="w-4 h-4 text-indigo-400" />;
      case "Cpu": return <Cpu className="w-4 h-4 text-emerald-400" />;
      case "Code": return <Code className="w-4 h-4 text-purple-400" />;
      case "TrendingUp": return <TrendingUp className="w-4 h-4 text-blue-300" />;
      case "Globe": return <Globe className="w-4 h-4 text-teal-400" />;
      case "Calendar": return <Calendar className="w-4 h-4 text-rose-400" />;
      case "Mail": return <Mail className="w-4 h-4 text-sky-400" />;
      default: return <Sparkles className="w-4 h-4 text-blue-400" />;
    }
  };

  // Submit User Message
  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputValue.trim();
    if (!messageText && attachedFiles.length === 0) return;

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Combine file names into display text if any attached
    let formattedUserText = messageText;
    if (attachedFiles.length > 0) {
      formattedUserText += `\n\n📎 Attached files: ${attachedFiles.join(", ")}`;
    }

    const userMsg: AxionAIMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: formattedUserText,
      timestamp: userTimestamp
    };

    // Update state with user message
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setAttachedFiles([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Sync with Admin Portal backend store
    const session = getOrCreateVisitorSession();
    fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: session.visitorId,
        visitorName: session.visitorName,
        topic: "Enterprise AI Query",
        text: formattedUserText
      })
    }).catch(() => {});

    // Show Typing Indicator
    setIsTyping(true);

    // Placeholder message for assistant streaming
    const assistantMsgId = "assistant-" + Date.now();
    const initialAssistantMsg: AxionAIMessage = {
      id: assistantMsgId,
      sender: "assistant",
      text: "",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true
    };

    // Wait short delay before streaming to mimic network / LLM thinking time
    setTimeout(async () => {
      setMessages(prev => [...prev, initialAssistantMsg]);
      setIsTyping(false);

      // Call Axion AI Service streaming query
      const result = await AxionAIService.queryAssistant(
        messageText,
        (partialText) => {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMsgId
                ? { ...msg, text: partialText }
                : msg
            )
          );
        }
      );

      // Finalize assistant message with metadata and actions
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                text: result.text,
                isStreaming: false,
                suggestedActions: result.suggestedActions,
                sources: result.sources
              }
            : msg
        )
      );
    }, 600);
  };

  // Keyboard handlers: Enter sends, Shift+Enter creates newline
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSendMessage();
    }
  };

  // Attachment simulation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f: File) => f.name);
      setAttachedFiles(prev => [...prev, ...names]);
    }
  };

  // Mic toggle simulation
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulate speech recognition result after 2.5s
      setTimeout(() => {
        setInputValue("What are Axion's custom enterprise AI solutions?");
        setIsRecording(false);
      }, 2500);
    }
  };

  // Action button click (e.g. page navigation)
  const handleActionClick = (action: string) => {
    if (action.startsWith("page:") && setActivePage) {
      const pageKey = action.replace("page:", "") as ActivePage;
      setActivePage(pageKey);
    }
  };

  // Copy message text
  const copyMessageText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reset Conversation
  const resetChat = () => {
    setMessages([]);
    setInputValue("");
  };

  // Markdown renderer for assistant messages
  const renderMessageContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
        const bulletContent = trimmed.substring(1).trim();
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-slate-200 text-[13px] leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
            <span>{parseFormattedInlineText(bulletContent)}</span>
          </div>
        );
      }

      if (trimmed.length > 0 && /^\d+\./.test(trimmed)) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-slate-200 text-[13px] leading-relaxed font-medium">
            <span>{parseFormattedInlineText(trimmed)}</span>
          </div>
        );
      }

      if (trimmed.length > 0) {
        return (
          <p key={idx} className="my-1 leading-relaxed text-slate-200 text-[13px]">
            {parseFormattedInlineText(trimmed)}
          </p>
        );
      }

      return <div key={idx} className="h-1" />;
    });
  };

  const parseFormattedInlineText = (text: string) => {
    const parts = text.split("**");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <strong key={index} className="text-white font-semibold font-display">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />

      {/* =========================================================
          FLOATING BUTTON (BOTTOM RIGHT)
          ========================================================= */}
      {/* =========================================================
          FLOATING BUTTON (BOTTOM RIGHT) - UNIFIED SINGLE ELEMENT
          ========================================================= */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
              setIsMinimized(false);
            }}
            onMouseEnter={() => setHasHoveredTrigger(true)}
            onMouseLeave={() => setHasHoveredTrigger(false)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              y: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.45)] border border-blue-300/40 cursor-pointer flex items-center justify-center select-none"
            aria-label="Open Axion AI Assistant"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md group-hover:bg-blue-400/40 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Spark Icon + Online Badge */}
            <div className="relative z-10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#070e1c]" />
              </span>
            </div>

            {/* Hover Tooltip Label (Attached to the single launcher element) */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-950/95 border border-blue-500/30 text-white shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 flex flex-col text-left whitespace-nowrap">
              <span className="text-[11px] font-bold font-display text-white leading-tight">
                Axion AI
              </span>
              <span className="text-[9px] font-mono text-blue-300 leading-tight">
                Enterprise Assistant
              </span>
            </div>
          </motion.button>
        </div>
      )}

      {/* Minimized Dock Bar (When minimized) */}
      {isOpen && isMinimized && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#081226]/95 border border-blue-500/30 text-white backdrop-blur-xl shadow-2xl shadow-blue-500/30 cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-display text-white">AXION AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Click to expand chat</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="ml-2 p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* =========================================================
          MAIN CHAT WINDOW (FLOATING / EXPANDED MODAL)
          ========================================================= */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 25 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className={`fixed z-50 flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-blue-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300 ${
              isExpanded
                ? "inset-3 sm:inset-6 md:inset-10 w-auto h-auto max-w-none max-h-none rounded-2xl bg-[#060c19]/95"
                : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] h-[550px] sm:h-[570px] max-h-[calc(100vh-3rem)] bg-[#070e1c]/95"
            }`}
          >
            {/* Dynamic Glassmorphism Background Accent Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-blue-600/5 pointer-events-none" />

            {/* ----------------------------------------------------
                HEADER
                ---------------------------------------------------- */}
            <div className="relative z-10 px-4 py-3 border-b border-blue-500/20 bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
              {/* Left Logo + Title + Status */}
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="p-1.5 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 border border-blue-300/30 shadow-md shadow-blue-500/20">
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#070e1c] shadow-[0_0_6px_#10b981]" />
                </div>

                <div className="flex flex-col text-left select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-xs tracking-wider text-white">
                      AXION AI
                    </span>
                    <span className="text-[8px] font-mono px-1.5 py-0.2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold uppercase tracking-widest">
                      Copilot
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-sans">
                      Enterprise Advisor
                    </span>
                    <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Action Controls (Minimize, Maximize, Reset, Close) */}
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      resetChat();
                    }}
                    title="New Chat"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                  title="Minimize"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  title={isExpanded ? "Restore" : "Expand"}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  title="Close"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ----------------------------------------------------
                BODY / CHAT & WELCOME AREA
                ---------------------------------------------------- */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans scrollbar-thin scrollbar-thumb-slate-800">
              
              {/* WELCOME SCREEN (Shown when no messages yet) */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 py-1"
                >
                  {/* Compact Greeting Card */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900/90 via-[#0a162e]/90 to-slate-900/90 border border-blue-500/25 shadow-md backdrop-blur-md relative overflow-hidden">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <AxionLogo showText={false} logoSize={22} />
                        <h2 className="text-base font-bold font-display text-white tracking-tight">
                          Hello 👋
                        </h2>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-[9px] font-mono font-bold uppercase tracking-wider">
                        Enterprise AI Core
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-snug">
                      Hi, I&apos;m <strong className="text-white font-semibold">Axion AI</strong> — ask me about our enterprise solutions &amp; services.
                    </p>

                    <div className="mt-2 pt-2 border-t border-blue-500/20 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <ShieldCheck className="w-3 h-3" /> ISO 27001 Secured
                      </span>
                      <span className="text-slate-500">v3.5 Enterprise</span>
                    </div>
                  </div>

                  {/* SUGGESTED INQUIRIES HEADER & CARDS */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2 px-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Suggested Inquiries
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SUGGESTED_QUESTIONS.slice(0, 6).map((sug, idx) => (
                        <motion.button
                          key={sug.id}
                          type="button"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03, duration: 0.2 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSendMessage(sug.prompt);
                          }}
                          whileHover={{ scale: 1.01, x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-2.5 py-2 rounded-xl bg-slate-900/80 hover:bg-blue-950/70 border border-slate-800 hover:border-blue-500/40 text-left transition-all duration-200 group flex items-center gap-2 cursor-pointer shadow-xs"
                        >
                          <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-blue-500/40 group-hover:bg-blue-900/30 transition-colors shrink-0">
                            {getSuggestionIcon(sug.iconName)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[11px] font-semibold text-white group-hover:text-blue-200 transition-colors block truncate leading-tight">
                              {sug.title}
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono block truncate">
                              {sug.category}
                            </span>
                          </div>
                          <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* MESSAGES LIST */}
              {messages.map((msg) => {
                const isAssistant = msg.sender === "assistant";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-3 ${
                      isAssistant ? "justify-start" : "justify-end"
                    }`}
                  >
                    {/* Assistant Avatar */}
                    {isAssistant && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 border border-blue-400/40 flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}

                    {/* Message Bubble Box */}
                    <div className={`max-w-[85%] sm:max-w-[82%] ${isAssistant ? "text-left" : "text-right"}`}>
                      <div
                        className={`p-3 rounded-xl relative shadow-lg ${
                          isAssistant
                            ? "bg-slate-900/85 border border-blue-500/25 text-slate-100 backdrop-blur-md rounded-tl-xs shadow-blue-950/40 border-l-4 border-l-blue-500"
                            : "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-xs shadow-blue-600/20 border border-blue-400/30"
                        }`}
                      >
                        {/* Header info / copy button */}
                        {isAssistant && (
                          <div className="flex items-center justify-between mb-1.5 pb-0.5 border-b border-slate-800/60 text-[9px] text-slate-400 font-mono">
                            <span className="font-bold text-blue-400">AXION AI</span>
                            <div className="flex items-center gap-2">
                              <span>{msg.timestamp}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  copyMessageText(msg.id, msg.text);
                                }}
                                title="Copy response"
                                className="p-0.5 hover:text-white transition-colors"
                              >
                                {copiedId === msg.id ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Content text */}
                        <div className="font-sans">
                          {isAssistant ? (
                            renderMessageContent(msg.text)
                          ) : (
                            <p className="text-[13px] leading-relaxed text-white whitespace-pre-wrap">
                              {msg.text}
                            </p>
                          )}

                          {/* Streaming dots if active */}
                          {msg.isStreaming && !msg.text && (
                            <div className="flex items-center gap-1 py-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-150" />
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-300" />
                            </div>
                          )}
                        </div>

                        {/* Suggested Action Buttons (e.g. Navigation CTAs) */}
                        {isAssistant && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                            {msg.suggestedActions.map((act, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleActionClick(act.action);
                                }}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-blue-300 bg-blue-950/60 hover:bg-blue-900 border border-blue-500/30 transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <span>{act.label}</span>
                                <ArrowUpRight className="w-3 h-3 text-blue-400" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Timestamp for user messages */}
                      {!isAssistant && (
                        <span className="text-[9px] text-slate-500 font-mono mt-0.5 inline-block pr-1">
                          {msg.timestamp}
                        </span>
                      )}
                    </div>

                    {/* User Avatar */}
                    {!isAssistant && (
                      <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5 text-slate-300" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* TYPING INDICATOR */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-xs bg-slate-900/85 border border-blue-500/25 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    <span className="text-xs text-slate-400 font-mono ml-2">Axion AI is analyzing...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ----------------------------------------------------
                INPUT AREA
                ---------------------------------------------------- */}
            <div className="relative z-10 p-4 border-t border-blue-500/20 bg-slate-900/90 backdrop-blur-xl">
              {/* Attached file badges preview */}
              {attachedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {attachedFiles.map((fname, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-blue-950 border border-blue-500/40 text-blue-300 flex items-center gap-1.5"
                    >
                      <Paperclip className="w-3 h-3 text-blue-400" />
                      <span className="max-w-[120px] truncate">{fname}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setAttachedFiles(attachedFiles.filter((_, idx) => idx !== i));
                        }}
                        className="hover:text-white"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Voice active recording overlay */}
              {isRecording && (
                <div className="mb-2 p-2 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-between text-xs text-blue-300 animate-pulse">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-red-400 animate-ping" />
                    <span className="font-mono">Listening for voice prompt...</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleRecording();
                    }}
                    className="text-[10px] font-mono text-slate-400 hover:text-white uppercase"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Input Form Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSendMessage();
                }}
                className="flex items-end gap-2 p-2 rounded-2xl bg-slate-950 border border-slate-800 focus-within:border-blue-500/60 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all"
              >
                {/* File Attachment Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach Documents / Images"
                  className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors shrink-0 cursor-pointer"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={toggleRecording}
                  title="Voice Input (UI)"
                  className={`p-2.5 rounded-xl transition-colors shrink-0 cursor-pointer ${
                    isRecording
                      ? "text-red-400 bg-red-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask Axion AI about our solutions..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-xs sm:text-sm placeholder-slate-500 resize-none max-h-32 py-2 px-1 font-sans"
                />

                {/* Send Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim() && attachedFiles.length === 0}
                  className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>

              {/* Sub-text footer */}
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono px-1">
                <span>Press Enter to send • Shift + Enter for new line</span>
                <span>Powered by Axion AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
