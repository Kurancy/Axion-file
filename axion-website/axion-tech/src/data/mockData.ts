import { CaseStudy, ServiceItem, IndustryItem, BlogPost, Dictionary } from "../types";

export const translations: Record<string, Dictionary> = {
  en: {
    navHome: "Home",
    navServices: "Services",
    navIndustries: "Industries",
    navSolutions: "Solutions",
    navPortfolio: "Portfolio",
    navCompany: "Company",
    navTimeline: "Future Vision",
    navContact: "Contact",
    navConsultation: "Book AI Consultation",
    heroTitle: "Transforming Businesses Through Intelligent Technology",
    heroSub: "Axion Technologies Ltd. helps organizations automate operations, optimize workflows, and accelerate growth through AI, ERP, software solutions, and digital transformation.",
    ctaConsultation: "Book AI Consultation",
    ctaExplore: "Explore Solutions",
    missionTitle: "Our Mission",
    missionDesc: "To empower businesses across Africa and beyond through cutting-edge AI automation, enterprise ERP systems, and bespoke digital transformation strategies that unlock measurable operational value.",
    visionTitle: "Our Vision",
    visionDesc: "To become Africa's most trusted enterprise technology partner — delivering world-class AI, SAP, and software solutions that rival any global technology firm.",
    coreValuesTitle: "Core Enterprise Values",
    coreValuesSub: "The fundamental pillars that guide our technology consulting practice and client partnerships."
  },
  fr: {
    navHome: "Accueil",
    navServices: "Services",
    navIndustries: "Secteurs",
    navSolutions: "Solutions",
    navPortfolio: "Portfolio",
    navCompany: "Entreprise",
    navTimeline: "Vision Future",
    navContact: "Contact",
    navConsultation: "Réserver une Consultation IA",
    heroTitle: "Transformer les Entreprises par la Technologie Intelligente",
    heroSub: "Axion Technologies Ltd. aide les organisations à automatiser leurs opérations, optimiser leurs flux de travail et accélérer leur croissance grâce à l'IA, l'ERP et la transformation numérique.",
    ctaConsultation: "Réserver une Consultation IA",
    ctaExplore: "Explorer les Solutions",
    missionTitle: "Notre Mission",
    missionDesc: "Autonomiser les entreprises africaines grâce à l'IA, à l'automatisation et à la transformation numérique, en apportant des architectures logicielles modernes pour déverrouiller le potentiel régional.",
    visionTitle: "Notre Vision",
    visionDesc: "Devenir le partenaire technologique d'entreprise le plus fiable d'Afrique, offrant des solutions IA, SAP et logicielles de classe mondiale.",
    coreValuesTitle: "Valeurs Fondamentales",
    coreValuesSub: "Les piliers fondamentaux du conseil technologique qui guident nos opérations et nos relations clients."
  },
  sw: {
    navHome: "Mwanzo",
    navServices: "Huduma",
    navIndustries: "Viwanda",
    navSolutions: "Suluhu",
    navPortfolio: "Kazi Zetu",
    navCompany: "Kuhusu Sisi",
    navTimeline: "Maono ya Baadaye",
    navContact: "Wasiliana",
    navConsultation: "Weka Miadi ya AI",
    heroTitle: "Kubadilisha Biashara Kupitia Teknolojia ya Akili",
    heroSub: "Axion Technologies Ltd. husaidia mashirika kuendesha kazi kiotomatiki, kuboresha michakato, na kuharakisha ukuaji kupitia AI, ERP, na mabadiliko ya kidijitali.",
    ctaConsultation: "Weka Miadi ya Ushauri wa AI",
    ctaExplore: "Chunguza Suluhu",
    missionTitle: "Lengo Letu",
    missionDesc: "Kuwezesha biashara za Kiafrika kupitia AI, Uendeshaji otomatiki, na Mabadiliko ya Kidijitali, na kuleta mifumo ya kisasa ya programu kufungua uwezo wa kikanda.",
    visionTitle: "Maono Yetu",
    visionDesc: "Kuwa mshirika wa teknolojia ya biashara wa kuaminika zaidi barani Afrika, ukitoa suluhu za AI, SAP, na programu za kiwango cha dunia.",
    coreValuesTitle: "Maadili Yetu ya Msingi",
    coreValuesSub: "Misingi yetu ya kiufundi inayotuongoza katika utendaji wetu na uhusiano wetu na wateja yetu."
  }
};

export const servicesData: ServiceItem[] = [
  {
    id: "ai-automation",
    title: "AI Automation & Intelligent Workflows",
    description: "Deploy enterprise-grade AI agents, cognitive document processors, and intelligent RPA workflows that eliminate manual bottlenecks and drive operational excellence.",
    icon: "Cpu",
    details: [
      "Enterprise AI Agents & Orchestration",
      "End-to-End Workflow Automation (RPA)",
      "Intelligent Document Processing (IDP)",
      "Cognitive AI Chatbots & Multilingual Assistants"
    ],
    metrics: "90% Reduction in Administrative Processing Time",
    tag: "Next-Gen AI"
  },
  {
    id: "erp-solutions",
    title: "ERP & SAP Integration Systems",
    description: "Align enterprise finance, human resources, and operations with fully compliant SAP Business One and Oracle system configurations tailored to African market requirements.",
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
    title: "Warehouse & Supply Chain Management (WMS)",
    description: "Seamlessly trace inventory throughput, distribution channels, and transport hubs with cloud-native WMS platforms built for the African logistics landscape.",
    icon: "Package",
    details: [
      "WMS Platform Architecture & Deployment",
      "Dynamic Barcode & IoT Sensor Tracking",
      "Supply Chain Intelligence Dashboards",
      "Cross-Border Distribution Automation"
    ],
    metrics: "35% Increase in Operational Storage Capacity",
    tag: "Logistics"
  },
  {
    id: "software-engineering",
    title: "Bespoke Enterprise Software Engineering",
    description: "Craft highly secure, scalable systems that deliver modern cloud, web, and mobile application performance at enterprise grade.",
    icon: "Code",
    details: [
      "High-Load Cloud Native Systems",
      "Robust API & Microservice Architectures",
      "Offline-First Web & Mobile Enterprise Apps",
      "Advanced Cyber Security Audits & Gateways"
    ],
    metrics: "99.99% Guaranteed Architecture Uptime",
    tag: "Engineering"
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation Consulting",
    description: "Formulate long-term technology roadmaps that optimize legacy cost structures and leverage state-of-the-art predictive business intelligence.",
    icon: "TrendingUp",
    details: [
      "Business Process Audits & Analysis",
      "Corporate IT Strategy & Roadmaps",
      "Advanced Big Data Analytics & BI",
      "Executive Financial Intelligence Dashboards"
    ],
    metrics: "+22% Year-Over-Year Margin Growth Target",
    tag: "Strategy"
  }
];

export const industriesData: IndustryItem[] = [
  {
    id: "manufacturing",
    title: "Manufacturing & Heavy Industry",
    description: "Revolutionizing factory floor productivity through automated supply chains and intelligent scheduling systems.",
    icon: "Factory",
    detailedCase: "Deployed custom SAP automation on factory floors of a regional cement manufacturer in East Africa, optimizing raw material intake workflows and production scheduling.",
    keyBenefits: [
      "Predictive machine maintenance logs",
      "Real-time material consumption forecasts",
      "Elimination of manual entry on scale-bridges"
    ],
    stats: "+28% Floor Productivity Increase",
    technologies: ["IoT Gateways", "SAP Connectors", "Node.js", "PostgreSQL"],
  },
  {
    id: "warehousing-industry",
    title: "Warehousing & Storage",
    description: "Optimizing multi-level inventory systems and storage efficiency with custom digital-twin tracking technology.",
    icon: "LayoutGrid",
    detailedCase: "Developed a distributed WMS featuring barcode integrations and dynamic storage allocation algorithms for a major logistics hub in Nigeria.",
    keyBenefits: [
      "Under-10-second stock lookups",
      "Automated stock reallocation",
      "Slashed dispatch delays by 65%"
    ],
    stats: "99.9% Stock Audit Alignment Accuracy",
    technologies: ["React Web", "Supabase", "Android Client", "GraphQL"],
  },
  {
    id: "logistics",
    title: "Logistics & Cross-Border Freight",
    description: "Automating tracking pipelines and multi-country regulatory customs compliance for African freight corridors.",
    icon: "Truck",
    detailedCase: "Designed a secure digital backplane tracking cross-border cargo transit along the Mombasa-Kigali corridor, optimizing customs clearance workflows.",
    keyBenefits: [
      "Instant multi-currency billing",
      "Automated SMS/Email client notifications",
      "AI Customs Document scanner"
    ],
    stats: "Reduced border transit delays by 36 hours",
    technologies: ["AI OCR Engine", "Express API", "Docker", "D3 Charts"],
  },
  {
    id: "education",
    title: "Higher Education & Institutions",
    description: "Consolidating fragmented data silos into modern student registries, billing systems, and academic portals.",
    icon: "GraduationCap",
    detailedCase: "Migrated a legacy university management system to a secure cloud structure supporting over 45,000 active students across multiple campuses.",
    keyBenefits: [
      "Automated online tuition processing",
      "Unified lecturer-student portals",
      "Interactive grade analysis tables"
    ],
    stats: "Saved 1,200 administrative hours per semester",
    technologies: ["React SPA", "PostgreSQL", "Redis", "Stripe API"],
  },
  {
    id: "healthcare",
    title: "Healthcare & Patient Networks",
    description: "Connecting remote clinics to central diagnostic and inventory pipelines for better patient outcomes.",
    icon: "Activity",
    detailedCase: "Engineered an offline-first inventory distribution network mapping vaccine supply states across 140 healthcare clinics in rural communities.",
    keyBenefits: [
      "Offline-first data sync",
      "Intelligent temperature drop alerts",
      "Automated clinic restock requests"
    ],
    stats: "Zero stock-outs recorded across all clinics",
    technologies: ["PWA Architecture", "SQLite Sync", "Twilio", "Tailwind UI"],
  },
  {
    id: "smes",
    title: "High-Growth SMEs & Aggregators",
    description: "Empowering fast-scaling retail and supply businesses with enterprise-grade operating systems at SME cost.",
    icon: "Rocket",
    detailedCase: "Delivered a pre-configured low-cost ERP system tailored to scale with retail chains moving from local shops to multi-branch operations.",
    keyBenefits: [
      "Dynamic centralized cloud POS",
      "Unified vendor payment channels",
      "Automated profit-loss reporting"
    ],
    stats: "+40% Operational Capacity for Retail Teams",
    technologies: ["Node.js API", "React Admin", "Supabase", "Recharts"],
  }
];

export const caseStudiesData: CaseStudy[] = [
  {
    id: "ai-invoice",
    title: "AI Invoice & Document Processing Engine",
    category: "AI Automation",
    client: "Zenith East Africa Distributors",
    problem: "Zenith's accounts payable division processed over 15,000 paper and PDF invoices monthly from multi-lingual suppliers manually, creating severe payment backlogs and ledger errors.",
    solution: "We engineered a secure document ingestion gateway integrating AI OCR models. The system automatically classifies document layouts, extracts line items, validates tax numbers, and pushes approved entries straight to SAP.",
    impact: "Processing latency cut from 4 days down to 4 minutes. Reduced ledger entry errors to absolute zero, cutting overall accounts admin costs by 62%.",
    technologies: ["AI OCR Engine", "Express.js Proxy", "SAP Business One", "React Client"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    statValue: "10x",
    statLabel: "Speed Multiplier"
  },
  {
    id: "wms-logistics",
    title: "Next-Gen Warehouse Management System",
    category: "Warehouse Solutions",
    client: "Safeland Freight Logistics",
    problem: "Outdated spreadsheet inventory management led to severe stock shrinkages, inaccurate distribution pipelines, and massive operational delays across Safeland's central hub.",
    solution: "Deployed a customized React & Node.js WMS with integrated handheld barcode scanners, dynamic shelf-weight IoT triggers, and AI-optimized batch picking pathways.",
    impact: "Eliminated annual stock shrinkage entirely. Increased order fulfillment accuracy to 99.96% and improved picker throughput rate by 45%.",
    technologies: ["React Core", "PostgreSQL", "IoT Sensors", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
    statValue: "+45%",
    statLabel: "Fulfillment Speed"
  },
  {
    id: "manufacturing-erp",
    title: "Cement Manufacturing ERP Digitization",
    category: "ERP Solutions",
    client: "AeroCement International",
    problem: "AeroCement's production output, bulk sales data, and raw material intake logs were stored in disjointed local systems, leaving leadership blind to daily unit economics.",
    solution: "Unified their entire operations into an advanced ERP backplane mapped to Oracle Cloud. Built tailored mobile interfaces for supervisors monitoring kiln temperature gauges.",
    impact: "Equipped executive leadership with real-time margin visibility per metric ton. Automated compliance filing with state authorities, saving 200 regulatory hours monthly.",
    technologies: ["Oracle Cloud API", "D3 Visualization", "React PWA", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    statValue: "$2.4M",
    statLabel: "Capital Saved Annually"
  },
  {
    id: "enterprise-ai-assistant",
    title: "Enterprise AI Knowledge Base & Assistant",
    category: "AI Automation",
    client: "Continental Banking Corporation",
    problem: "Over 8,000 branch officers struggled to find specific regulatory credit compliance guidelines across 400 separate PDF manuals, causing delays in customer service.",
    solution: "Created an offline-ready, lightning-fast Cognitive RAG search engine. Banking personnel ask questions in natural language and receive instant, compliance-cited answers.",
    impact: "Average compliance check resolution time dropped from 35 minutes to 1.5 seconds, drastically improving customer service performance.",
    technologies: ["AI Language Models", "Vector Databases", "Express.js", "React App"],
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
    statValue: "1.5s",
    statLabel: "Avg Search Resolution"
  }
];

export const timelineEvents = [
  {
    year: "2026",
    title: "Foundation & Enterprise Advisory",
    description: "Launch of Axion Technologies consulting branches in Lagos, Nairobi, and Johannesburg. Establishing core relationships with regional government networks, mid-market manufacturers, and logistics firms.",
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
    description: "Releasing Axion WMS Platform and Axion AI Document Engine as fully-managed Cloud SaaS systems, lowering capital entry barriers for high-growth African SMEs.",
    status: "Strategic Target",
    metrics: "Aiming for 500+ Active Installs"
  },
  {
    year: "2030",
    title: "Africa's Premier Technology Partner",
    description: "Serving as the chief digital transformation architecture designer for the African Continental Free Trade Area (AfCFTA) digital corridors, connecting sea ports to interior trade hubs with AI.",
    status: "Long-term Vision",
    metrics: "Estimated Impact: $10B+ GDP Friction Eliminated"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Integrating SAP with AI Document OCR: A Guide for African Executives",
    excerpt: "How regional logistics giants are using cognitive models to fully automate manual accounting entry backlogs safely and at scale.",
    date: "July 12, 2026",
    readTime: "6 min read",
    category: "ERP & AI",
    author: "Kwame Mensah, Chief Technology Officer",
    content: "The intersection of legacy enterprise resource planning (ERP) platforms like SAP with state-of-the-art Large Language Models represents the single highest margin multiplier of this decade..."
  },
  {
    id: "blog-2",
    title: "Overcoming Infrastructure Bottlenecks: Offline-First Mobile Architectures",
    excerpt: "Why enterprise software in Africa must be engineered to handle spotty connectivity natively while maintaining complete database integrity.",
    date: "June 28, 2026",
    readTime: "8 min read",
    category: "Software Engineering",
    author: "Grace Amadi, Principal Solutions Architect",
    content: "Designing web applications for Paris or San Francisco assumes persistent high-speed 5G. Designing for cross-border logistics routes from Mombasa to Kigali demands an entirely different playbook..."
  },
  {
    id: "blog-3",
    title: "The Future of Warehouse Logistics under AfCFTA",
    excerpt: "How automated Warehouse Management Systems will streamline cross-border trade friction and accelerate market growth across the continent.",
    date: "May 15, 2026",
    readTime: "5 min read",
    category: "Logistics & Supply Chain",
    author: "Themba Dlamini, Director of Logistics Consulting",
    content: "The African Continental Free Trade Area (AfCFTA) creates a singular market. However, administrative borders and inconsistent customs declarations represent massive physical bottlenecks..."
  }
];
