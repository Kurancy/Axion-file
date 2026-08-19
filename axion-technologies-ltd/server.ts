import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient() {
  if (aiInstance) return aiInstance;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    return aiInstance;
  }
  return null;
}

// Fallback high-fidelity consulting data generator
function getLocalArchitectReport(companyName: string, industry: string, challenges: string, size: string) {
  const normIndustry = (industry || "").toLowerCase();
  
  let roadmap = [
    {
      title: "Phase 1: Operational Audit & Foundation",
      duration: "1 - 2 Months",
      description: "Map current workflows, audit database silos, and establish cloud architecture ready for integration.",
      milestones: ["Document all inventory & supply chain touchpoints", "Deploy base secure database schema", "Establish API middleware framework"]
    },
    {
      title: "Phase 2: Core System Modernization",
      duration: "3 - 5 Months",
      description: "Implement custom ERP connectors, modernize inventory tracking, and replace manual processing structures.",
      milestones: ["Deploy Axion custom WMS module", "Connect SAP ERP/custom data interfaces", "Automate invoice extraction & categorization"]
    },
    {
      title: "Phase 3: AI Agents & Automated Intelligence",
      duration: "6 - 8 Months",
      description: "Train intelligence layer on historical records, activate automated document parsers, and deploy executive analytics.",
      milestones: ["Deploy Axion AI Document Parser", "Launch autonomous customer & supplier status agents", "Integrate automated dashboard alerts"]
    }
  ];

  let techStack = [
    { category: "Enterprise ERP", tech: "SAP Business One / Custom Axion Core Sync", purpose: "Centralized financial and operational database master." },
    { category: "Warehouse & Inventory", tech: "Axion Intelligent WMS (React/Node.js/Postgres)", purpose: "Real-time stock ledger with barcode scanning." },
    { category: "AI & Document Automation", tech: "Gemini 3.5 AI Engine + Python Microservices", purpose: "Autonomous parsing of unstructured invoices, purchase orders." },
    { category: "Executive Dashboards", tech: "Recharts & Tailwind-powered High-Density Analytics", purpose: "Real-time decision intelligence console for stakeholders." }
  ];

  let architectureDiagram = [
    { id: "1", label: "Operations (Input)", type: "source", description: "Invoices, warehouse scanner feeds, legacy files" },
    { id: "2", label: "Axion API Gateway", type: "gateway", description: "Secures & validates incoming multi-region traffic" },
    { id: "3", label: "AI Parsing & Extraction Engine", type: "process", description: "Processes unstructured text and checks metadata" },
    { id: "4", label: "SAP / Axion Core ERP Sync", type: "storage", description: "Synchronizes financial ledgers and stock levels" },
    { id: "5", label: "Executive Live Dashboard", type: "destination", description: "Aggregates real-time KPIs and system alerts" }
  ];

  let roiMetrics = [
    { label: "Operational Efficiency Gain", value: "35% - 48%", improvement: "Increase", explanation: "Calculated via automation of administrative document indexing & order routing." },
    { label: "Stock Discrepancy Reduction", value: "99.2%", improvement: "Decrease", explanation: "Targeted through QR barcode tagging and automated real-time storage checks." },
    { label: "Document Processing Speed", value: "12x Faster", improvement: "Increase", explanation: "AI invoice parsing eliminates manual typing, finishing in under 3 seconds per file." },
    { label: "Annual Cost Savings", value: "Est. $120,000+", improvement: "Saving", explanation: "Direct reduction in labor waste, lost stock, and double-billing errors." }
  ];

  let consultingSummary = `Based on a comprehensive review of ${companyName || "the organization"} operating in the ${industry || "Enterprise"} sector, we recommend deploying the Axion Intelligent Modernization (AIM) suite. The core issues highlighted—namely ${challenges || "workflow manual friction and system disjointedness"}—are typical for mid-to-large scale African enterprises undergoing rapid expansion. Our suggested approach integrates an AI Automation processing layer directly with robust database structures and localized WMS apps, delivering maximum traceability and accelerating growth securely.`;

  // Customizations based on user selection
  if (normIndustry.includes("logistics") || normIndustry.includes("warehouse")) {
    roadmap[1].title = "Phase 2: Real-time WMS & Barcode Systems";
    roadmap[1].description = "Deploy physical barcode tagging mechanisms, activate custom WMS controllers, and align logistics hubs.";
    techStack[1].tech = "Axion Logistics Suite & Rust Scanner SDK";
    roiMetrics[1].value = "99.8% Accuracy";
    roiMetrics[1].explanation = "Continuous scanning verifies freight items against electronic shipping manifests automatically.";
  } else if (normIndustry.includes("manufactur")) {
    roadmap[1].title = "Phase 2: Manufacturing ERP & Line Automation";
    roadmap[1].description = "Integrate shop-floor production metrics directly into SAP ERP database registers for end-to-end auditability.";
    techStack[0].tech = "SAP Business One HANA Integration + Custom OPC-UA Connectors";
    roiMetrics[0].value = "+42% Machine Output";
  }

  return {
    roadmap,
    techStack,
    architectureDiagram,
    roiMetrics,
    consultingSummary,
    isLocalEngine: true
  };
}

// Enterprise Architect Consulting Endpoint
app.post("/api/architect", async (req, res) => {
  const { companyName, industry, size, challenges, country } = req.body;

  const ai = getGeminiClient();

  if (!ai) {
    // Return high-fidelity local consulting report
    console.log("No Gemini API key configured. Generating local deterministic report.");
    const report = getLocalArchitectReport(companyName, industry, challenges, size);
    return res.json(report);
  }

  try {
    const prompt = `You are the Lead Enterprise Architect and Brand Strategist at Axion Technologies Ltd., Africa's leading digital transformation consulting firm.
Analyze the following company profile and generate a comprehensive, highly professional enterprise modernization strategy.

COMPANY INFO:
- Name: "${companyName || "The Enterprise Client"}"
- Industry: "${industry || "Logistics & Supply Chain"}"
- Scale/Size: "${size || "Medium-to-Large Enterprise"}"
- Core Challenges: "${challenges || "Manual invoice processing, stock inventory leakages, and lack of real-time operational dashboard visibility."}"
- Operating Country: "${country || "Pan-African"}"

You must respond with a JSON object containing exactly the following keys. Do not return any Markdown wrapping (no \`\`\`json blocks), just pure JSON.

JSON Structure requested:
{
  "consultingSummary": "A highly detailed, professional consulting assessment of why these challenges occur in the context of African business operations and how our technical solutions address them.",
  "roadmap": [
    {
      "title": "Phase 1: ...",
      "duration": "Duration (e.g. 1-2 Months)",
      "description": "Short explanation",
      "milestones": ["Milestone 1", "Milestone 2"]
    }
  ], // (provide exactly 3 detailed sequential phases)
  "techStack": [
    {
      "category": "ERP / AI / Analytics / Core Platform",
      "tech": "Specific software (e.g. SAP Business One, custom Node.js system, etc.)",
      "purpose": "A direct reason why this fits the business size and country"
    }
  ], // (provide exactly 4 distinct technology layers)
  "architectureDiagram": [
    { "id": "1", "label": "Label of Node", "type": "source | process | gateway | storage | destination", "description": "What happens here" }
  ], // (provide exactly 5 sequential architecture nodes)
  "roiMetrics": [
    {
      "label": "Name of metric (e.g., Inventory Discrepancies, Process Time)",
      "value": "Metric value (e.g., -95%, 4.5x Faster)",
      "improvement": "Increase | Decrease | Saving | Efficiency",
      "explanation": "How the business model earns back its capital investment"
    }
  ] // (provide exactly 4 distinct calculated ROI metrics)
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
        systemInstruction: "You are a world-class IT strategist from Palantir, SAP, and Accenture. You speak with high operational authority, using precise business analysis. Always return the response as a single valid JSON object."
      }
    });

    const textOutput = response.text || "";
    const parsedData = JSON.parse(textOutput.trim());
    return res.json({
      ...parsedData,
      isLocalEngine: false
    });
  } catch (error: any) {
    console.error("Gemini API Architect generation failed:", error);
    // Graceful fallback to deterministic local engine so service never fails
    const report = getLocalArchitectReport(companyName, industry, challenges, size);
    return res.json({
      ...report,
      errorOccurred: true,
      errorMsg: error.message || "Engine timeout"
    });
  }
});

// Setup dev/prod servers
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production files from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Axion Technologies server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
