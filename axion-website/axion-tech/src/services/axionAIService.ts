/**
 * Axion AI Service Layer
 * 
 * Future-Ready Architecture:
 * - Decouples UI presentation from backend AI providers (Gemini, OpenAI, n8n, Supabase, Vector DB).
 * - Implements simulated streaming response generator for realistic token-by-token output.
 * - Readily extensible to production endpoints via standard fetch or SDK adapters.
 */

export interface AxionAIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
  suggestedActions?: { label: string; action: string }[];
  sources?: { title: string; url?: string }[];
  category?: string;
}

export interface AxionAISuggestion {
  id: string;
  title: string;
  category: string;
  iconName: string;
  prompt: string;
}

export const SUGGESTED_QUESTIONS: AxionAISuggestion[] = [
  {
    id: "about-axion",
    title: "Tell me about Axion Technologies",
    category: "Company",
    iconName: "Building2",
    prompt: "Tell me about Axion Technologies"
  },
  {
    id: "services-overview",
    title: "What services do you provide?",
    category: "Services",
    iconName: "Layers",
    prompt: "What services do you provide?"
  },
  {
    id: "wms-solution",
    title: "Warehouse Management System",
    category: "Solutions",
    iconName: "Package",
    prompt: "Tell me about your Warehouse Management System"
  },
  {
    id: "sap-solutions",
    title: "SAP Business One Solutions",
    category: "ERP",
    iconName: "Database",
    prompt: "What are your SAP Business One Solutions?"
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    category: "AI",
    iconName: "Cpu",
    prompt: "How does Axion AI Automation work?"
  },
  {
    id: "custom-software",
    title: "Enterprise Software Development",
    category: "Engineering",
    iconName: "Code",
    prompt: "Do you build custom software?"
  },
  {
    id: "digital-trans",
    title: "Digital Transformation",
    category: "Consulting",
    iconName: "TrendingUp",
    prompt: "How can Axion help with Digital Transformation?"
  },
  {
    id: "industries-serve",
    title: "Industries We Serve",
    category: "Sectors",
    iconName: "Globe",
    prompt: "What industries do you serve?"
  },
  {
    id: "book-consultation",
    title: "Book a Consultation",
    category: "Action",
    iconName: "Calendar",
    prompt: "Can I schedule a consultation?"
  },
  {
    id: "contact-sales",
    title: "Contact Sales",
    category: "Action",
    iconName: "Mail",
    prompt: "How can I contact sales?"
  }
];

// Embedded Enterprise Knowledge Base & Intelligent Matcher
const KNOWLEDGE_BASE: { keywords: string[]; answer: string; suggestedActions?: { label: string; action: string }[] }[] = [
  {
    keywords: ["tell me about axion", "about axion technologies", "who is axion", "what is axion"],
    answer: `Axion Technologies is an enterprise technology company focused on helping African businesses accelerate digital transformation through intelligent software and AI-driven automation.

Our expertise includes:
• **AI Automation**: Cognitive document extraction, OCR, and intelligent bot workflows.
• **ERP & SAP Solutions**: Official SAP Business One integration, customization, and cloud migration.
• **Warehouse Management Systems**: Real-time barcode inventory tracking, offline-first sync, and border logistics optimization.
• **Custom Software Development**: Enterprise-grade cloud platforms, microservices, and mobile applications tailored to complex workflows.
• **Enterprise Integrations**: Bi-directional API gateways bridging legacy software to cloud platforms.
• **Business Intelligence**: Real-time operational dashboards and predictive analytics.
• **Digital Transformation Consulting**: End-to-end technology auditing and strategic roadmap design.`,
    suggestedActions: [
      { label: "Book AI Consultation", action: "page:consultation-hub" },
      { label: "Explore Our Solutions", action: "page:solutions" }
    ]
  },
  {
    keywords: ["custom software", "build custom", "software development", "bespoke software", "engineering team"],
    answer: `Yes.

Our engineering team develops enterprise-grade software tailored to each organization's operations, integrating AI, ERP platforms, cloud infrastructure, and modern business workflows.

We specialize in:
• **Scalable Cloud Architectures**: Built with Node.js, Go, Python, React, and Kubernetes.
• **Offline-First Mobile & Desktop Systems**: Ensuring 100% operational uptime in remote manufacturing and warehouse environments.
• **High-Security Enterprise Standards**: Fully compliant with ISO 27001, NDPR, and SOC-2 standard practices.`,
    suggestedActions: [
      { label: "Schedule Engineering Audit", action: "page:consultation-hub" },
      { label: "View Portfolio Case Studies", action: "page:portfolio" }
    ]
  },
  {
    keywords: ["schedule a consultation", "book a consultation", "consultation", "book consultation", "speak to sales", "meeting"],
    answer: `Absolutely.

Our team can arrange a consultation to understand your business processes, evaluate your current systems, and recommend the most suitable technology solutions.

You can use our interactive **Axion AI Blueprint Engine** to generate an immediate system roadmap, or connect directly with an enterprise advisor.`,
    suggestedActions: [
      { label: "Launch Blueprint Engine", action: "page:consultation-hub" },
      { label: "Contact Sales Team", action: "page:contact" }
    ]
  },
  {
    keywords: ["services", "what services", "capabilities", "solutions matrix"],
    answer: `Axion Technologies provides end-to-end digital transformation capabilities tailored for African enterprises:

1. **AI & Cognitive Automation**: Automated invoice processing, intelligent OCR, customer automation agents.
2. **ERP & SAP Integration**: Full-lifecycle SAP Business One deployment, custom add-ons, database synchronization.
3. **Smart Warehouse Management Systems (WMS)**: Real-time stock audit, batch tracking, border freight optimization.
4. **Bespoke Enterprise Software**: High-load web applications, multi-tenant SaaS, internal administrative portals.
5. **Data Analytics & BI**: Executive dashboards, automated financial reporting, and predictive inventory forecasting.`,
    suggestedActions: [
      { label: "View Detailed Services", action: "page:services" }
    ]
  },
  {
    keywords: ["warehouse", "wms", "inventory", "stock", "supply chain"],
    answer: `Our **Warehouse Management System (WMS)** is engineered specifically for sub-Saharan supply chains and logistics friction:

Key Features:
• **Offline-First Mobile Scanners**: Conduct stock counts and dispatch verification without waiting for cellular connectivity.
• **Live SAP / ERP Sync**: Automatic reconciliation of goods received notes (GRN) and dispatch bills.
• **Shrinkage & Variance Detection**: AI alerts flag discrepancies before trucks clear loading bays.
• **Multi-Depot Control**: Centralized visibility across cross-border hubs in West and East Africa.`,
    suggestedActions: [
      { label: "Explore Logistics Solutions", action: "page:solutions" },
      { label: "Calculate WMS ROI", action: "page:services" }
    ]
  },
  {
    keywords: ["sap", "sap business one", "erp", "oracle", "enterprise resource planning"],
    answer: `Axion Technologies is an official **SAP Partner** with deep domain expertise in SAP Business One and enterprise ERP integrations.

What we deliver:
• Seamless integration of front-office custom software with back-office SAP ledgers.
• Custom SDK add-ons for localized tax compliance, e-invoicing, and regional banking protocols.
• Zero-downtime database migration to SAP HANA Cloud.`,
    suggestedActions: [
      { label: "Request SAP Integration Demo", action: "page:contact" }
    ]
  },
  {
    keywords: ["ai automation", "machine learning", "ocr", "ai agents", "llm"],
    answer: `Axion AI Automation enables enterprises to automate complex manual back-office tasks:

• **Document Intelligence**: Extract structured JSON data from handwritten delivery notes, invoices, and customs bills with 99.4% accuracy.
• **Automated Workflow Orchestration**: Connect email triggers directly into ERP ledgers and database updates.
• **Cognitive Customer Support**: Deploy intelligent assistants (like Axion AI) directly onto client portals and internal Slack/Teams channels.`,
    suggestedActions: [
      { label: "Try AI Consultation Hub", action: "page:consultation-hub" }
    ]
  },
  {
    keywords: ["industries", "sectors", "who do you serve", "verticals"],
    answer: `We serve enterprise clients across critical growth sectors in Africa:

• **Manufacturing & Heavy Industry**: Automated production tracking and downtime reduction.
• **Warehousing & Storage**: Smart barcode auditing and batch control.
• **Cross-Border Freight & Logistics**: Route optimization and customs clearance automation.
• **Higher Education**: Student portal modernization and administrative automation.
• **Healthcare & Pharma**: Secure supply chain tracking for pharmaceuticals.
• **Financial Services & Retail**: Enterprise web platforms and e-invoicing integrations.`,
    suggestedActions: [
      { label: "View Industry Showcase", action: "page:industries" }
    ]
  },
  {
    keywords: ["contact", "email", "phone", "office", "address", "location"],
    answer: `You can reach the Axion Technologies team through multiple channels:

• **Primary Email**: contact@axiontechnologies.com / sales@axiontechnologies.com
• **Regional Hubs**: Lagos (West Africa), Nairobi (East Africa), Johannesburg (Southern Africa).
• **Hours**: 24/7 Enterprise SLA Support for existing managed clients.`,
    suggestedActions: [
      { label: "Open Contact Page", action: "page:contact" }
    ]
  }
];

export class AxionAIService {
  /**
   * Search knowledge base or fallback to an intelligent digital consultant response
   */
  public static async queryAssistant(
    userPrompt: string,
    onChunk?: (partialText: string) => void
  ): Promise<AxionAIMessage> {
    const cleanPrompt = userPrompt.toLowerCase().trim();

    // Find best matching entry in Knowledge Base
    let match = KNOWLEDGE_BASE.find(entry =>
      entry.keywords.some(kw => cleanPrompt.includes(kw))
    );

    let fullAnswer: string;
    let actions = match?.suggestedActions;

    if (match) {
      fullAnswer = match.answer;
    } else {
      // Intelligent general response fallback representing Axion AI consultant
      fullAnswer = `Thank you for your inquiry regarding "${userPrompt}".

As Axion Technologies' Enterprise Digital Advisor, I can assist you with:
• Technical specs for **AI Automation** and document OCR workflows.
• **SAP Business One** & ERP database synchronization architectures.
• Smart **Warehouse Management System (WMS)** deployment strategies.
• **Custom Enterprise Software** development and cloud infrastructure.

Would you like me to connect you with an Axion solutions architect or launch our interactive AI Consultation Hub to generate a tailored implementation roadmap?`;
      actions = [
        { label: "Book Consultation", action: "page:consultation-hub" },
        { label: "View Services", action: "page:services" },
        { label: "Contact Sales", action: "page:contact" }
      ];
    }

    // Simulate real-time streaming response token by token
    let currentText = "";
    const words = fullAnswer.split(" ");
    const delayPerWord = 25; // ms per word

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? "" : " ") + words[i];
      if (onChunk) {
        onChunk(currentText);
      }
      await new Promise(resolve => setTimeout(resolve, delayPerWord));
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return {
      id: "msg-" + Date.now(),
      sender: "assistant",
      text: fullAnswer,
      timestamp,
      suggestedActions: actions,
      sources: [
        { title: "Axion Technologies Enterprise Architecture Docs v3.5" }
      ]
    };
  }
}
