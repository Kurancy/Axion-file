import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
