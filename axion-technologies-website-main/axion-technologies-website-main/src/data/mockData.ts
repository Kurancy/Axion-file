import { CaseStudy, ServiceItem, IndustryItem, BlogPost, Dictionary } from "../types";

export const translations: Record<string, Dictionary> = {
  en: {
    navHome: "Home",
    navServices: "Services",
    navIndustries: "Industries",
    navPortfolio: "Portfolio",
    navCompany: "Company",
    navTimeline: "Future Vision",
    navContact: "Contact Us",
    navConsultation: "AI Blueprint Hub",
    navContainerTelemetry: "Sovereign Cloud Engine",
    heroTitle: "Transforming African Businesses Through AI & Enterprise Technology",
    heroSub: "We design intelligent systems that automate operations, optimize complex workflows, and accelerate business growth across the continent.",
    ctaConsultation: "Book AI Consultation",
    ctaExplore: "Explore Solutions",
    missionTitle: "Our Mission",
    missionDesc: "Empowering African businesses through AI, Automation, and Digital Transformation, bringing modern software architectures to unlock regional potential.",
    visionTitle: "Our Vision",
    visionDesc: "To become Africa's leading digital transformation and enterprise automation company, serving as a trusted advisor to multi-national operations.",
    coreValuesTitle: "Core Enterprise Values",
    coreValuesSub: "The fundamental pillars of technology consulting that guide our operations and client relationships."
  },
  fr: {
    navHome: "Accueil",
    navServices: "Services",
    navIndustries: "Secteurs",
    navPortfolio: "Portfolio",
    navCompany: "Entreprise",
    navTimeline: "Vision Future",
    navContact: "Contactez-nous",
    navConsultation: "Plan d'IA",
    navContainerTelemetry: "Contrôleur de Cloud Souverain",
    heroTitle: "Transformer les Entreprises Africaines par l'IA et les Technologies d'Entreprise",
    heroSub: "Nous concevons des systèmes intelligents qui automatisent les opérations, optimisent les flux de travail complexes et accélèrent la croissance commerciale à travers le continent.",
    ctaConsultation: "Réserver une Consultation IA",
    ctaExplore: "Explorer les Solutions",
    missionTitle: "Notre Mission",
    missionDesc: "Autonomiser les entreprises africaines grâce à l'IA, à l'automatisation et à la transformation numérique, en apportant des architectures logicielles modernes.",
    visionTitle: "Notre Vision",
    visionDesc: "Devenir le leader de la transformation numérique et de l'automatisation d'entreprise en Afrique, en tant que conseiller de confiance des opérations multinationales.",
    coreValuesTitle: "Valeurs Fondamentales de l'Entreprise",
    coreValuesSub: "Les piliers fondamentaux du conseil technologique qui guident nos opérations et nos relations clients."
  },
  sw: {
    navHome: "Mwanzo",
    navServices: "Huduma",
    navIndustries: "Viwanda",
    navPortfolio: "Kazi Zetu",
    navCompany: "Kuhusu Sisi",
    navTimeline: "Maono ya Baadaye",
    navContact: "Wasiliana nasi",
    navConsultation: "Kitovu cha AI",
    navContainerTelemetry: "Kidhibiti cha Wingu",
    heroTitle: "Kubadilisha Biashara za Afrika Kupitia AI na Teknolojia ya Biashara",
    heroSub: "Tunatengeneza mifumo ya kisasa inayojiendesha yenyewe, kurahisisha michakato migumu, na kuharakisha ukuaji wa biashara kote barani.",
    ctaConsultation: "Weka Miadi ya Ushauri wa AI",
    ctaExplore: "Chunguza Suluhu",
    missionTitle: "Lengo Letu",
    missionDesc: "Kuwezesha biashara za Kiafrika kupitia AI, Uendeshaji otomatiki, na Mabadiliko ya Kidijitali, na kuleta mifumo ya kisasa ya programu.",
    visionTitle: "Maono Yetu",
    visionDesc: "Kuwa kampuni inayoongoza barani Afrika kwa mabadiliko ya kidijitali na mifumo otomatiki ya biashara, tukihudumu kama mshauri wa kuaminika.",
    coreValuesTitle: "Maadili Yetu ya Msingi",
    coreValuesSub: "Misingi yetu ya kiufundi inayotuongoza katika utendaji wetu na uhusiano wetu na wateja yetu."
  }
};

export const servicesData: ServiceItem[] = [
  {
    id: "ai-automation",
    title: "AI Automation & Cognitive Workflows",
    description: "Harness localized machine learning model architectures, intelligent data pipelines, and workflow bots to eliminate system repetition.",
    icon: "Cpu",
    details: [
      "Enterprise AI Agents & Orchestration",
      "End-to-End Workflow Automation (RPA)",
      "Intelligent Document Processing (IDP)",
      "Cognitive AI Chatbots & Multilingual Assistants"
    ],
    metrics: "90% Reduction in Administrative Processing Time",
    tag: "Next-Gen Tech"
  },
  {
    id: "erp-solutions",
    title: "ERP & SAP Integration Systems",
    description: "Align core corporate finance, human resources, and sales operations with fully compliant SAP and Oracle system configurations.",
    icon: "Database",
    details: [
      "SAP Business One Implementations",
      "Process Reengineering & Compliance",
      "Cloud ERP Legacy Migrations",
      "Unified Enterprise Integrations (API-First)"
    ],
    metrics: "100% Real-time Transaction Tracking Accuracy",
    tag: "Enterprise Core"
  },
  {
    id: "warehouse-management",
    title: "Warehouse & Supply Chain Logistics (WMS)",
    description: "Seamlessly trace inventory throughput, distribution tracks, and transport hubs with cloud-native tracking solutions.",
    icon: "Package",
    details: [
      "WMS Platform Architectures",
      "Dynamic Barcode & IoT Sensor Tracking",
      "Supply Chain Visual Intelligence Dashboards",
      "Cross-Border Distribution Automation"
    ],
    metrics: "35% Increase in Operational Warehouse Storage Capacity",
    tag: "Logistics Peak"
  },
  {
    id: "software-engineering",
    title: "Bespoke Enterprise Software Engineering",
    description: "Craft highly secure, redundant systems that execute modern cloud, web, and mobile app performance at scale.",
    icon: "Code",
    details: [
      "High-Load Cloud Native Systems",
      "Robust API & Backplane System Architectures",
      "Offline-First Web & Mobile Enterprise Apps",
      "Advanced Cyber Security Audits & Gateways"
    ],
    metrics: "99.99% Guaranteed Architecture Schedulability",
    tag: "Engineering Power"
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation Consulting",
    description: "Formulate long-term technology roadmaps that optimize legacy cost structures and leverage state-of-the-art predictive data.",
    icon: "TrendingUp",
    details: [
      "Business Process Audits & Analysis",
      "Corporate IT Roadmaps & Strategy",
      "Advanced Big Data Analytics & BI",
      "Executive Financial Dashboards"
    ],
    metrics: "+22% Year-Over-Year Margin Growth Target",
    tag: "Executive Advisory"
  }
];

export const industriesData: IndustryItem[] = [
  {
    id: "manufacturing",
    title: "Manufacturing & Heavy Industry",
    description: "Revolutionizing factory floor productivity through automated supply chains and intelligent scheduling.",
    icon: "Factory",
    detailedCase: "Deployed custom SAP business automation integration on the factory floors of a regional cement manufacturer in East Africa, optimizing raw material intake workflows.",
    keyBenefits: [
      "Predictive machine maintenance logs",
      "Real-time material consumption forecasts",
      "Elimination of manual entry points on scale-bridges"
    ],
    stats: "+28% Floor Productivity Increase",
    technologies: ["IoT Gateways", "SAP Connectors", "Node.js Core", "PostgreSQL"],
  },
  {
    id: "warehousing-industry",
    title: "Warehousing & Storage",
    description: "Optimizing multi-level inventory setups and storage efficiency with custom digital-twin tracking.",
    icon: "LayoutGrid",
    detailedCase: "Developed a distributed Warehouse Management System featuring barcode integrations and dynamic storage allocation algorithms for a major logistics hub in Nigeria.",
    keyBenefits: [
      "Under-10-second stock lookups",
      "Automated stock reallocation",
      "Slashed dispatch delays"
    ],
    stats: "99.9% Stock Audit Alignment Accuracy",
    technologies: ["React Web", "Supabase Backend", "Android Handheld Client", "GraphQL"],
  },
  {
    id: "logistics",
    title: "Logistics & Cross-Border Freight",
    description: "Automating tracking pipelines and multi-country regulatory custom compliance files.",
    icon: "Truck",
    detailedCase: "Designed a secure digital backplane tracking cross-border cargo transit along the Mombasa-Kigali transport corridor, optimizing customs file clearance.",
    keyBenefits: [
      "Instant multi-currency billing integration",
      "Automated SMS/Email client notifications",
      "AI Customs Document scanner and extractor"
    ],
    stats: "Reduced border transit delays by 36 hours",
    technologies: ["Gemini OCR Engine", "Express API", "Docker Containers", "D3 Charts"],
  },
  {
    id: "education",
    title: "Higher Education & Institutions",
    description: "Consolidating fragmented database silos into modern student registries and billing systems.",
    icon: "GraduationCap",
    detailedCase: "Migrated a legacy university management system to a secure cloud database structure supporting over 45,000 active students.",
    keyBenefits: [
      "Automated online tuition fee processing",
      "Unified lecturer-student portals",
      "Interactive grade analysis tables"
    ],
    stats: "Saved 1,200 administrative hours per semester",
    technologies: ["React SPA", "PostgreSQL Clusters", "Redis Caching", "Stripe API"],
  },
  {
    id: "healthcare",
    title: "Healthcare & Patient Networks",
    description: "Connecting remote clinics to central state-of-the-art diagnostic and inventory pipelines.",
    icon: "Activity",
    detailedCase: "Engineered an offline-first inventory distribution network mapping vaccine supply states across 140 healthcare clinics.",
    keyBenefits: [
      "Offline-first data sync backbones",
      "Intelligent temperature drop warnings",
      "Automated clinic restock requests"
    ],
    stats: "Zero stock-outs recorded across clinics",
    technologies: ["PWA Architecture", "SQLite Sync", "Twilio Gateway", "Tailwind UI"],
  },
  {
    id: "smes",
    title: "High-Growth SMEs & Aggregators",
    description: "Empowering fast-scaling retail and supply startups with enterprise-grade operating cores.",
    icon: "Rocket",
    detailedCase: "Delivered a pre-configured low-cost ERP system tailored to scale with retail chains moving from local shops to multi-branch operations.",
    keyBenefits: [
      "Dynamic centralized cloud POS tracking",
      "Unified vendor payment channels",
      "Automated profit-loss balances"
    ],
    stats: "+40% Operational Capacity for Retail Teams",
    technologies: ["Node.js API", "React Admin Portal", "Supabase", "Recharts Graphs"],
  }
];

export const caseStudiesData: CaseStudy[] = [
  {
    id: "ai-invoice",
    title: "AI Invoice & Document Processing Engine",
    category: "AI Automation",
    client: "Zenith East Africa Distributors",
    problem: "Zenith's accounts payable division processed over 15,000 paper and PDF invoices monthly from multi-lingual suppliers manually, creating severe payment backlogs.",
    solution: "We engineered a secure document ingestion gateway integrating Gemini OCR models. The system automatically classifies document layouts, extracts crucial line items, validates tax numbers, and pushes approved entries straight to SAP.",
    impact: "Processing latency cut from 4 days down to 4 minutes. Reduced ledger manual entry errors to absolute zero, cutting overall accounts admin costs by 62%.",
    technologies: ["Gemini AI OCR", "Express.js Proxy", "SAP Business One", "React Client"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    statValue: "10x",
    statLabel: "Speed Multiplier"
  },
  {
    id: "wms-logistics",
    title: "Next-Gen Warehouse Management System",
    category: "Warehouse Solutions",
    client: "Safeland Freight Logistics",
    problem: "Outdated spreadsheet inventory management led to severe stock shrinkages, inaccurate distribution pipelines, and massive forklift traffic jams across Safeland's central hub.",
    solution: "Deployed a customized, high-density React & Node.js WMS. Leveraged integrated handheld barcode scanners, dynamic shelf-weight IoT triggers, and AI-optimized batch picking pathways.",
    impact: "Eliminated annual stock shrinkage entirely. Increased order fulfillment accuracy to 99.96% and improved picker throughput rate by 45%.",
    technologies: ["React Core", "PostgreSQL Database", "IoT Sensor Integrations", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
    statValue: "+45%",
    statLabel: "Fulfillment Speed"
  },
  {
    id: "manufacturing-erp",
    title: "Cement Manufacturing ERP Digitization",
    category: "ERP Solutions",
    client: "AeroCement International",
    problem: "AeroCement's production output, bulk sales data, and raw material intake logs were stored in disjointed localized system networks, leaving leadership blind to daily unit economics.",
    solution: "Unified their entire operations into an advanced custom ERP backplane mapped to Oracle Cloud. Built tailored mobile interfaces for supervisors monitoring kiln temperature gauges.",
    impact: "Equipped executive leadership with real-time margin visibility per metric ton produced. Automated compliance filing with state authorities, saving 200 regulatory hours.",
    technologies: ["Oracle Cloud API", "D3 Visualization Framework", "React PWA", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    statValue: "$2.4M",
    statLabel: "Capital Saved Annually"
  },
  {
    id: "enterprise-ai-assistant",
    title: "Enterprise AI Knowledge Base & Assistant",
    category: "AI Automation",
    client: "Continent-Wide Banking Corporation",
    problem: "Over 8,000 branch officers struggled to search and find specific regulatory credit compliance guidelines across 400 separate PDF manuals.",
    solution: "Created an offline-ready, lightning-fast Cognitive RAG search engine. Banking personnel ask questions in natural language and receive instant, compliance-cited answers.",
    impact: "Average compliance check resolution time dropped from 35 minutes to 1.5 seconds, drastically increasing customer service performance.",
    technologies: ["Gemini 3.1 Pro", "Vector Databases", "Express.js", "React App"],
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
    statValue: "1.5s",
    statLabel: "Avg Search Resolution"
  }
];

export const timelineEvents = [
  {
    year: "2026",
    title: "Foundation & Enterprise Advisory",
    description: "Launch of Synapse Enterprise consulting branches in Lagos Lagos, Nairobi, and Johannesburg. Establishing core relationships with regional government networks, mid-market manufacturing distributors, and logistics firms.",
    status: "Active",
    metrics: "Targeting 15 Enterprise Accounts"
  },
  {
    year: "2027",
    title: "Sub-Regional Scale & ERP Dominance",
    description: "Opening fully staffed support hubs in Abidjan, Accra, and Kigali. Expanding our accredited SAP and Oracle integration practice to cover West and East African banking systems and major state warehouses.",
    status: "Upcoming",
    metrics: "Projected 120% Developer Growth"
  },
  {
    year: "2028",
    title: "Proprietary SaaS Platform Launches",
    description: "Releasing **SynapseFlow WMS** and **SynapseAgent OCR** as fully-managed Cloud SaaS systems, lowering capital entry barriers for high-growth African SMEs.",
    status: "Strategic Target",
    metrics: "Aiming for 500+ Active Installs"
  },
  {
    year: "2030",
    title: "Africa's Sovereign Technology Partner",
    description: "Aiming to serve as the chief digital transition architecture designer for the African Continental Free Trade Area (AfCFTA) digital corridors, connecting sea ports directly to interior dry-docks with AI.",
    status: "Long-term Vision",
    metrics: "Estimated Impact: $10B+ GDP Friction Eliminated"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Integrating SAP with AI Document OCR: A Guide for African Executives",
    excerpt: "How regional logistics giants are using cognitive models to fully automate manual accounting entry backlogs safely.",
    date: "July 12, 2026",
    readTime: "6 min read",
    category: "ERP & AI",
    author: "Kwame Mensah, Chief Technology Officer",
    content: "The intersection of legacy enterprise resource planning (ERP) platforms like SAP with state-of-the-art Large Language Models represents the single highest margin multiplier of this decade..."
  },
  {
    id: "blog-2",
    title: "Overcoming Infrastructure Bottlenecks: Offline-First Mobile Architectures",
    excerpt: "Why custom software in Africa must be engineered to handle spotty connectivity natively while maintaining complete database integrity.",
    date: "June 28, 2026",
    readTime: "8 min read",
    category: "Software Engineering",
    author: "Grace Amadi, Principal Solutions Architect",
    content: "Designing web applications for Paris or San Francisco assumes persistent high-speed 5G. Designing for cross-border logistics routes from Mombasa to Kigali demands an entirely different playbook..."
  },
  {
    id: "blog-3",
    title: "The Future of Warehouse Logistics under AfCFTA",
    excerpt: "How automated Warehouse Management Systems (WMS) will streamline cross-border trade friction and accelerate growth.",
    date: "May 15, 2026",
    readTime: "5 min read",
    category: "Logistics & Supply Chain",
    author: "Themba Dlamini, Director of Logistics Consulting",
    content: "The African Continental Free Trade Area (AfCFTA) creates a singular market. However, administrative borders and inconsistent custom declarations represent massive physical bottlenecks..."
  }
];
