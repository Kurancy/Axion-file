import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- PERSISTENT CONVERSATION DATA STORE ---
const DATA_FILE = path.join(__dirname, "conversations.json");
const USERS_FILE = path.join(__dirname, "users.json");

interface ChatMessage {
  id: string;
  sender: "visitor" | "admin" | "AI";
  senderName: string;
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  visitorId: string;
  visitorName: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  unread: boolean;
  messages: ChatMessage[];
}

export type UserRole = "admin" | "employee" | "viewer";
export type UserStatus = "active" | "suspended";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  password?: string;
  lastActive: string;
  createdAt: string;
}

const SEED_USERS: UserAccount[] = [
  {
    id: "u_admin_1",
    name: "Alex Vance (System Lead)",
    email: "admin@axion.ng",
    role: "admin",
    status: "active",
    password: "axion2026",
    lastActive: "Just now",
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString()
  },
  {
    id: "u_emp_1",
    name: "Fatima Bello (Senior Agent)",
    email: "fatima@axion.ng",
    role: "employee",
    status: "active",
    password: "axion123",
    lastActive: "15 mins ago",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: "u_emp_2",
    name: "Musa Ibrahim (Support Specialist)",
    email: "musa@axion.ng",
    role: "employee",
    status: "active",
    password: "axion123",
    lastActive: "1 hour ago",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "u_view_1",
    name: "Auditor Sarah (Compliance)",
    email: "auditor@axion.ng",
    role: "viewer",
    status: "active",
    password: "axion123",
    lastActive: " Yesterday",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

function loadUsers(): UserAccount[] {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading users.json, initializing default:", err);
  }
  saveUsers(SEED_USERS);
  return SEED_USERS;
}

function saveUsers(users: UserAccount[]) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving users.json:", err);
  }
}

let usersStore: UserAccount[] = loadUsers();

const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "conv_seed_1",
    visitorId: "v_musa_101",
    visitorName: "Musa Ibrahim",
    topic: "WMS & Logistics",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    unread: true,
    messages: [
      {
        id: "msg_s1_1",
        sender: "visitor",
        senderName: "Musa Ibrahim",
        text: "Hello Axion team, we are experiencing stock reconciliation lags at our Nairobi fulfillment depot. Can you help us connect our SAP system to an offline-first WMS?",
        timestamp: "08:30 AM"
      },
      {
        id: "msg_s1_2",
        sender: "AI",
        senderName: "Axion AI Assistant",
        text: "Hello Musa! Thank you for reaching out to Axion Technologies. Our Cognitive WMS solution integrates directly with SAP Business One and S/4HANA with offline synchronization. An enterprise advisor has been notified and will reply here shortly.",
        timestamp: "08:30 AM"
      }
    ]
  },
  {
    id: "conv_seed_2",
    visitorId: "v_fatima_202",
    visitorName: "Fatima Bello",
    topic: "AI Automation",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    unread: false,
    messages: [
      {
        id: "msg_s2_1",
        sender: "visitor",
        senderName: "Fatima Bello",
        text: "Good morning. We need an automated OCR invoice extraction tool for our cross-border logistics company in Lagos.",
        timestamp: "09:15 AM"
      },
      {
        id: "msg_s2_2",
        sender: "admin",
        senderName: "Axion Lead Architect",
        text: "Hi Fatima, we have pre-built document processing pipelines for West African port invoices. Would you be available for a 20-minute architecture review call today?",
        timestamp: "09:18 AM"
      }
    ]
  }
];

function loadConversations(): Conversation[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading conversations.json, initializing default:", err);
  }
  saveConversations(SEED_CONVERSATIONS);
  return SEED_CONVERSATIONS;
}

function saveConversations(conversations: Conversation[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(conversations, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving conversations.json:", err);
  }
}

let conversationsStore: Conversation[] = loadConversations();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  let aiClient: GoogleGenAI | null = null;

  if (apiKey) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini AI Client successfully initialized on backend.");
  } else {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI Consultation Assistant will fallback to offline mock responses.");
  }

  // --- API ENDPOINTS ---

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Admin / Staff Login Endpoint
  app.post("/api/admin/login", (req, res) => {
    const { accessCode, username, password } = req.body;

    // Check Access Code
    if (accessCode && (accessCode.trim() === "axion2026" || accessCode.trim() === "admin")) {
      const defaultAdmin = usersStore.find(u => u.role === "admin") || usersStore[0];
      defaultAdmin.lastActive = "Just now";
      saveUsers(usersStore);
      return res.json({
        success: true,
        token: "axion_admin_token_" + Date.now(),
        user: defaultAdmin
      });
    }

    // Check email/username & password against usersStore
    const loginInput = (username || "").trim().toLowerCase();
    const matchedUser = usersStore.find(
      u => u.email.toLowerCase() === loginInput || u.name.toLowerCase().includes(loginInput)
    );

    if (matchedUser && matchedUser.password === password) {
      if (matchedUser.status === "suspended") {
        return res.status(403).json({ success: false, error: "Your account has been suspended by an administrator." });
      }
      matchedUser.lastActive = "Just now";
      saveUsers(usersStore);
      return res.json({
        success: true,
        token: "axion_user_token_" + Date.now(),
        user: matchedUser
      });
    }

    return res.status(401).json({ success: false, error: "Invalid credentials. Try access code: axion2026" });
  });

  // --- USER MANAGEMENT ENDPOINTS ---

  // GET All Users
  app.get("/api/users", (req, res) => {
    res.json(usersStore);
  });

  // POST Create User
  app.post("/api/users", (req, res) => {
    const { name, email, role, password, status } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const existing = usersStore.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      return res.status(400).json({ error: "A user with this email address already exists." });
    }

    const newUser: UserAccount = {
      id: "u_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      name: name.trim(),
      email: email.trim(),
      role: role || "employee",
      status: status || "active",
      password: password || "axion123",
      lastActive: "Never",
      createdAt: new Date().toISOString()
    };

    usersStore.push(newUser);
    saveUsers(usersStore);
    res.json({ success: true, user: newUser });
  });

  // PUT Edit User
  app.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, role, password, status } = req.body;

    const user = usersStore.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (name) user.name = name.trim();
    if (email) user.email = email.trim();
    if (role) user.role = role;
    if (password) user.password = password;
    if (status) user.status = status;

    saveUsers(usersStore);
    res.json({ success: true, user });
  });

  // DELETE User
  app.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const index = usersStore.findIndex(u => u.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "User not found." });
    }
    usersStore.splice(index, 1);
    saveUsers(usersStore);
    res.json({ success: true, message: "User deleted successfully." });
  });

  // GET All Conversations (For Admin Dashboard)
  app.get("/api/conversations", (req, res) => {
    // Return sorted by latest activity
    const sorted = [...conversationsStore].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    res.json(sorted);
  });

  // GET Conversation by Visitor ID (For Public Chat Widget)
  app.get("/api/conversations/visitor/:visitorId", (req, res) => {
    const { visitorId } = req.params;
    const conv = conversationsStore.find(c => c.visitorId === visitorId);
    if (!conv) {
      return res.json(null);
    }
    res.json(conv);
  });

  // GET Single Conversation by ID
  app.get("/api/conversations/:id", (req, res) => {
    const conv = conversationsStore.find(c => c.id === req.params.id);
    if (!conv) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json(conv);
  });

  // POST Visitor Message / Create or Update Conversation (Public Site)
  app.post("/api/conversations", async (req, res) => {
    const { visitorId, visitorName, topic, text } = req.body;
    if (!visitorId || !text) {
      return res.status(400).json({ error: "visitorId and text are required" });
    }

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let conv = conversationsStore.find(c => c.visitorId === visitorId);

    const visitorMessage: ChatMessage = {
      id: "msg_v_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      sender: "visitor",
      senderName: visitorName || (conv ? conv.visitorName : "Anonymous Visitor"),
      text: text.trim(),
      timestamp: timeFormatted
    };

    if (conv) {
      if (visitorName) conv.visitorName = visitorName;
      if (topic) conv.topic = topic;
      conv.updatedAt = now.toISOString();
      conv.unread = true; // Mark as unread for Admin
      conv.messages.push(visitorMessage);
    } else {
      conv = {
        id: "conv_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        visitorId,
        visitorName: visitorName || "Enterprise Visitor",
        topic: topic || "General Inquiry",
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        unread: true,
        messages: [visitorMessage]
      };
      conversationsStore.push(conv);
    }

    // Optional: If first message or explicitly asked, add an initial AI greeting if no admin reply yet
    if (conv.messages.length === 1) {
      const aiReply: ChatMessage = {
        id: "msg_ai_" + Date.now(),
        sender: "AI",
        senderName: "Axion AI Assistant",
        text: `Thank you for reaching out to Axion Technologies, ${conv.visitorName}! Your message regarding "${conv.topic}" has been logged into our central portal. An enterprise advisor will reply to you shortly.`,
        timestamp: timeFormatted
      };
      conv.messages.push(aiReply);
    }

    saveConversations(conversationsStore);
    res.json({ success: true, conversation: conv });
  });

  // POST Admin Reply (Admin Site)
  app.post("/api/conversations/:id/reply", (req, res) => {
    const { id } = req.params;
    const { text, senderName } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Reply text is required" });
    }

    const conv = conversationsStore.find(c => c.id === id);
    if (!conv) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const adminMessage: ChatMessage = {
      id: "msg_a_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      sender: "admin",
      senderName: senderName || "Axion Advisor",
      text: text.trim(),
      timestamp: timeFormatted
    };

    conv.messages.push(adminMessage);
    conv.updatedAt = now.toISOString();
    conv.unread = false; // Admin has read and replied

    saveConversations(conversationsStore);
    res.json({ success: true, conversation: conv });
  });

  // PATCH Mark Conversation as Read (Admin Site)
  app.patch("/api/conversations/:id/read", (req, res) => {
    const conv = conversationsStore.find(c => c.id === req.params.id);
    if (!conv) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    conv.unread = false;
    saveConversations(conversationsStore);
    res.json({ success: true, conversation: conv });
  });

  // DELETE Conversation (Admin Action)
  app.delete("/api/conversations/:id", (req, res) => {
    const index = conversationsStore.findIndex(c => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    conversationsStore.splice(index, 1);
    saveConversations(conversationsStore);
    res.json({ success: true, message: "Conversation deleted" });
  });

  // Enterprise Digital Transformation Consultant Powered by Gemini
  app.post("/api/consultation", async (req, res) => {
    try {
      const { businessName, industry, size, bottleneck, targetTech, language = "en" } = req.body;

      if (!industry || !bottleneck) {
        return res.status(400).json({ error: "Missing industry or core bottleneck parameters." });
      }

      const prompt = `
        You are an elite Digital Transformation & AI Solutions Architect at Axion Technologies Ltd., a world-class technology consulting firm styled as a hybrid of Accenture, SAP, Palantir, and IBM Consulting, operating across Africa.
        
        Generate an enterprise-grade Digital Transformation Blueprint for the following client:
        - Client Name: ${businessName || "Valued African Enterprise"}
        - Target Industry/Sector: ${industry}
        - Organization Size/Scale: ${size || "Mid-to-Large Enterprise"}
        - Current Core Operational Bottleneck: ${bottleneck}
        - Desired Strategic Technology Focus: ${targetTech || "AI Automation & Custom Enterprise Software"}
        - Output Language Preferred: ${language}

        Format the response professionally with a premium executive tone, including the following sections:
        1. EXECUTIVE SUMMARY: A visionary, high-level analysis of how digitizing their operations will unlock exponential scale.
        2. STRATEGIC DIAGNOSIS: Analysis of why their current bottleneck (${bottleneck}) is capping growth and the direct financial/efficiency risk.
        3. AXION SOLUTION ARCHITECTURE: A detailed technical architecture showing how we integrate systems (e.g. AI Agents, SAP/ERP connectors, intelligent WMS, or bespoke software engineering).
        4. ROADMAP & TIMELINE (2026-2027): A staggered phased implementation timeline.
        5. PROJECTED BUSINESS IMPACT & ROIs: Quantitative metrics showing expected cost reductions, error decreases, and throughput increases.

        Keep the response highly authoritative, practical, and tailored to the unique economic and logistics landscape of the African market (e.g., localized supply chain factors, multi-currency processing, offline-first architectures where needed). Use markdown for visual elegance.
      `;

      if (!aiClient) {
        // Fallback for safety/preview with no API key
        return res.json({
          fallback: true,
          roadmap: `### Fallback Digital Transformation Roadmap for **${businessName || "Enterprise Client"}**
  
*(Vanguard SDK Offline Mode: Custom AI Generation requires a configured Gemini API Key in Settings > Secrets)*

#### 1. EXECUTIVE SUMMARY
We have modeled a specialized digital transformation blueprint tailored to the **${industry}** sector. For an enterprise of scale **${size}**, automating manual bottlenecks is the single highest leverage path to achieving regional expansion.

#### 2. STRATEGIC DIAGNOSIS
Your primary operational friction point—**"${bottleneck}"**—restricts standard growth, locks up working capital, and introduces fatal manual compliance vulnerabilities. 

#### 3. TARGET SYSTEM ARCHITECTURE
We recommend deploying the **Axion Core Automation Layer**:
- **Cognitive WMS Connector**: Instant sync to central operational systems.
- **Enterprise AI Agent Core**: Intelligent document classification and automated workflow triggers.
- **Custom React Dashboard**: High-density analytics showing exact production throughput.

#### 4. IMPLEMENTATION TIMELINE
- **Phase 1 (Month 1-3)**: Infrastructure audit & database ingestion alignment.
- **Phase 2 (Month 4-6)**: Deployment of standard custom microservices and core ERP interfaces.
- **Phase 3 (Month 7+)**: Continuous integration and AI Agent optimization cycles.

#### 5. TARGET METRICS & ROI
- **Workflow Efficiency**: +45% operational speed improvement.
- **Data Integrity**: Reduction of transactional error rate to < 0.2%.
- **Cost Reduction**: Projecting over 30% saving on administrative logistics within 12 months.`
        });
      }

      console.log(`Querying gemini-3.5-flash for ${industry} blueprint...`);
      const response = await aiClient.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        },
      });

      const text = response.text || "Failed to generate digital transformation roadmap text.";
      res.json({ success: true, roadmap: text });

    } catch (error: any) {
      console.error("Gemini Consultation Generation Error:", error);
      res.status(500).json({ error: "Internal Server Error during roadmap synthesis.", details: error.message });
    }
  });


  // --- VITE MIDDLEWARE OR STATIC SERVING ---

  if (process.env.NODE_ENV !== "production") {
    console.log("Running in DEVELOPMENT mode. Initializing Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Running in PRODUCTION mode. Serving pre-compiled static files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Start listener
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("CRITICAL: Failed to start server:", err);
});
