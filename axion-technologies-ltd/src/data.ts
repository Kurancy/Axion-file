import { CaseStudy, ServiceDetail, IndustryShowcase, TranslationDictionary, Language } from "./types";

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brandName: "AXION TECHNOLOGIES",
    headline: "Transforming African Businesses Through Intelligent Technology",
    subheadline: "We design and deploy intelligent systems that automate operations, optimize complex workflows, and accelerate enterprise growth across Africa.",
    missionTitle: "Our Mission",
    missionText: "Empowering African businesses through AI, Automation, and Digital Transformation, securing their position in the global digital economy.",
    visionTitle: "Our Vision",
    visionText: "To become Africa's leading enterprise technology and digital transformation company, setting standards for trust and scalable capabilities.",
    ctaBook: "Book Consultation",
    ctaExplore: "Explore Solutions",
    dashboardTitle: "Enterprise Decision Intelligence Console",
    dashboardSub: "Real-time telemetry and continuous process intelligence of active operations across Pan-African nodes.",
    servicesTitle: "Strategic Capabilities",
    industriesTitle: "Sectors We Modernize",
    portfolioTitle: "Enterprise Case Studies",
    portfolioSubtitle: "Explore real-world deployments proving massive operational efficiency and accelerated return on investment.",
    timelineTitle: "Strategic Expansion Roadmap",
    consultingTitle: "AI Enterprise Consulting Engine",
    consultingSubtitle: "Input your organization's parameters below to let our automated systems design a high-fidelity modernization roadmap.",
    bookingFormTitle: "Schedule Executive Briefing",
    loadingSystemOnline: "AXION CORE SYSTEMS ONLINE..."
  },
  fr: {
    brandName: "AXION TECHNOLOGIES",
    headline: "Transformer les Entreprises Africaines par la Technologie Intelligente",
    subheadline: "Nous concevons et déployons des systèmes intelligents qui automatisent les opérations, optimisent les flux de travail complexes et accélèrent la croissance en Afrique.",
    missionTitle: "Notre Mission",
    missionText: "Autonomiser les entreprises africaines grâce à l'IA, l'automatisation et la transformation numérique pour assurer leur compétitivité mondiale.",
    visionTitle: "Notre Vision",
    visionText: "Devenir le leader de la technologie d'entreprise et de la transformation numérique en Afrique, en établissant des normes de confiance et d'échelle.",
    ctaBook: "Prendre Rendez-vous",
    ctaExplore: "Explorer les Solutions",
    dashboardTitle: "Console d'Intelligence Décisionnelle",
    dashboardSub: "Télémesure en temps réel et intelligence continue des processus sur l'ensemble de nos nœuds panafricains.",
    servicesTitle: "Capacités Stratégiques",
    industriesTitle: "Secteurs Que Nous Modernisons",
    portfolioTitle: "Études de Cas de l'Entreprise",
    portfolioSubtitle: "Découvrez des déploiements réels prouvant une efficacité opérationnelle massive et un retour sur investissement accéléré.",
    timelineTitle: "Feuille de Route d'Expansion",
    consultingTitle: "Moteur de Conseil IA Axion",
    consultingSubtitle: "Saisissez les paramètres de votre organisation pour générer une feuille de route de modernisation de haute fidélité.",
    bookingFormTitle: "Planifier un Briefing Exécutif",
    loadingSystemOnline: "SYSTÈMES DE BASE AXION EN LIGNE..."
  },
  sw: {
    brandName: "AXION TECHNOLOGIES",
    headline: "Kubadilisha Biashara za Afrika Kupitia Teknolojia ya Kisasa",
    subheadline: "Tunaunda na kusambaza mifumo ya kiakili inayojiendesha yenyewe, kuboresha utendaji kazi changamano, na kuharakisha ukuaji wa biashara kote Afrika.",
    missionTitle: "Lengo Letu",
    missionText: "Kuziwezesha biashara za Kiafrika kupitia AI, Uendeshaji otomatiki, na Mabadiliko ya Kidijitali, na kulinda nafasi yao katika uchumi wa kidijitali wa kimataifa.",
    visionTitle: "Maono Yetu",
    visionText: "Kuwa kampuni inayoongoza barani Afrika katika teknolojia ya biashara na mabadiliko ya kidijitali, tukiweka viwango vya uaminifu na uwezo mkubwa.",
    ctaBook: "Agiza Ushauri",
    ctaExplore: "Chunguza Suluhu",
    dashboardTitle: "Koni ya Uamuzi ya Kujifunza ya Biashara",
    dashboardSub: "Vipimo vya wakati halisi vya utendaji na akili endelevu ya mchakato katika nodes zinazofanya kazi kote Afrika.",
    servicesTitle: "Uwezo wa Kimkakati",
    industriesTitle: "Sekta Tunazoboresha",
    portfolioTitle: "Mifano ya Kazi Yetu",
    portfolioSubtitle: "Gundua utekelezaji halisi unaothibitisha ufanisi mkubwa wa kiutendaji na urejeshaji wa haraka wa uwekezaji.",
    timelineTitle: "Ramani ya Upanuzi wa Kimkakati",
    consultingTitle: "Injini ya Ushauri ya AI ya Axion",
    consultingSubtitle: "Weka vigezo vya shirika lako hapa chini ili mifumo yetu iunde ramani ya kisasa ya uboreshaji wa hali ya juu.",
    bookingFormTitle: "Ratiba Mkutano wa Mtendaji",
    loadingSystemOnline: "MIFUMO YA AXION IMEANZA..."
  }
};

export const services: ServiceDetail[] = [
  {
    id: "ai-automation",
    title: "AI Automation & Document Processing",
    iconName: "BrainCircuit",
    description: "Empower your workflows with advanced AI. We deploy custom agentic solutions that process complex records, eliminate data entry friction, and unlock predictive operational insights.",
    bulletPoints: [
      "Autonomous Intelligent Document Processing (IDP) with 99.8% field accuracy",
      "Custom cognitive AI Agents trained on proprietary operational ledgers",
      "Automated robotic workflow orchestration for clerical or financial actions",
      "Natural language business query engines for executives"
    ]
  },
  {
    id: "erp-solutions",
    title: "Enterprise ERP & SAP Modernization",
    iconName: "Database",
    description: "Replace siloed databases with unified, high-performing corporate ledgers. Our enterprise architects specialize in seamless SAP, Oracle, and Microsoft system engineering.",
    bulletPoints: [
      "SAP Business One & SAP S/4HANA design, custom integration, and deployment",
      "Relational data pipeline alignment and real-time ledger synchronization",
      "Process re-engineering to comply with international accounting and trade audits",
      "Robust REST/gRPC API bridges connecting legacy terminals with cloud systems"
    ]
  },
  {
    id: "warehouse-tech",
    title: "Intelligent Warehouse & Supply Chain",
    iconName: "Box",
    description: "Gain complete visibility over complex logistics routes. Our customized WMS suites integrate physical tracking technology with predictive inventory routing engines.",
    bulletPoints: [
      "Custom multi-depot Warehouse Management Systems with sub-second sync",
      "Barcode, QR, and RFID physical integration pipelines",
      "Predictive demand forecasting and automated order fulfillment algorithms",
      "Real-time fleet, freight, and cargo transit tracing arrays"
    ]
  },
  {
    id: "software-engineering",
    title: "Full-Scale Software Engineering",
    iconName: "Cpu",
    description: "High-density enterprise platforms engineered for modern network architectures. We build highly scalable, modular backends with fast, beautiful web and mobile portals.",
    bulletPoints: [
      "Fault-tolerant, high-concurrency Node.js, Go, or Python backend clusters",
      "Native Android (Kotlin) and high-fidelity React portals for terminal users",
      "Secure payment processing, escrow integration, and multi-currency billing engines",
      "Cloud native deployments using container ingress and isolated VPCs"
    ]
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation Consulting",
    iconName: "LineChart",
    description: "We don't just write code. Our consultants embed with your executive teams to analyze process bottlenecks, outline risk registers, and design target-state IT architectures.",
    bulletPoints: [
      "Process mapping, productivity scoring, and operational friction assessments",
      "Comprehensive cloud migration strategy (AWS, GCP, Azure, and private cloud)",
      "High-density executive dashboard design and telemetry engineering",
      "Change management programs and professional developer training cycles"
    ]
  }
];

export const industries: IndustryShowcase[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    iconName: "Factory",
    description: "Synchronize factory output and raw materials directly with corporate finance records to reduce processing lag.",
    visualLabel: "Raw Intake → Production Logging → ERP Sync → Asset Analytics",
    operationalSteps: [
      "Machine telemetry parsing to calculate Overall Equipment Effectiveness (OEE)",
      "Automatic ledger update when batches exit production lines",
      "Predictive component wear alerts to avoid catastrophic downtime"
    ]
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    iconName: "Truck",
    description: "Secure terminal cargo transfers with digital manifests and route tracking across regional borders.",
    visualLabel: "Port Transit → Border Gateway → Hub Unloading → Client Receipt",
    operationalSteps: [
      "Cross-border clearance synchronization with real-time customs ledgers",
      "Autonomous delivery verification with photo/signature encrypted records",
      "Dynamically rerouted delivery fleet pathways based on transit bottlenecks"
    ]
  },
  {
    id: "warehousing",
    name: "Warehousing & Storage",
    iconName: "Warehouse",
    description: "Eliminate stock shrinkage and improve picking speed through intelligent localized inventory ledgers.",
    visualLabel: "Receiving Dock → Bin Assignment → QR Scanning → Automated Stock Audit",
    operationalSteps: [
      "Spatial mapping to suggest optimal container placing based on exit velocity",
      "Real-time handheld barcode terminal state synchronization",
      "Automated stock level reorder triggers connecting directly to vendor APIs"
    ]
  },
  {
    id: "education",
    name: "Higher Education",
    iconName: "GraduationCap",
    description: "Modern student information systems designed to handle thousands of enrollment streams flawlessly.",
    visualLabel: "Applicant Portal → Academic Matrix → Tuition Escrow → Graduation Registry",
    operationalSteps: [
      "Cloud-native registrar databases supporting sub-second transaction speed",
      "Secure tuition portal integration with offline mobile money payment buffers",
      "Modular dashboard for dean and bursar reporting"
    ]
  },
  {
    id: "smes",
    name: "High-Growth SMEs",
    iconName: "Layers",
    description: "Transform growing businesses into agile digital operators with custom lightweight ERP suites.",
    visualLabel: "Client Purchase → Automated Invoice → Inventory Update → Cash Flow Alert",
    operationalSteps: [
      "Simplified centralized databases replacement of massive, fragile Excel sheets",
      "Integrated regional banking APIs to reconcile payments daily",
      "Automated marketing pipelines triggered by client buying cycles"
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare Systems",
    iconName: "HeartPulse",
    description: "Digitize patient records with strict privacy standards and enable real-time clinical workflows.",
    visualLabel: "Triage Log → EHR Encryption → Prescription Gateway → Billing Sync",
    operationalSteps: [
      "Encrypted cloud electronic health records (EHR) compliant with HIPAA",
      "Automated insurance claims indexing and dispatch pipelines",
      "Real-time pharmaceutical dispensary stock management systems"
    ]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: "ai-invoice-processing",
    title: "Pan-African AI Invoice Processing System",
    industry: "Logistics & Manufacturing",
    problem: "A multinational conglomerate operating in Nigeria, Kenya, and Ghana was processing over 45,000 monthly paper and PDF invoices manually. High typing delays, human transcription errors, and missing metadata resulted in severe payment friction, vendor disputes, and multi-week ledger delays.",
    solution: "Axion Technologies deployed a server-side Intelligent Document Processing (IDP) suite fueled by custom-finetuned Gemini vision models. Invoices arriving in regional shared mailboxes are automatically fetched, parsed, structured, and routed into SAP Business One within 15 seconds.",
    architecture: [
      "1. Regional Multi-Format Mailbox listener (polling IMAP/REST)",
      "2. Secure AWS S3 Object Bucket with virus scanning",
      "3. Automated Axion Python parsing microservice using Gemini OCR & Metadata parsing",
      "4. Node.js ERP sync Gateway implementing circuit-breakers",
      "5. SAP Business One HANA API integration register"
    ],
    impact: [
      "Invoice processing cycle reduced from 9 days down to 45 seconds average",
      "Manual transcription errors decreased by 99.4%",
      "Enabled complete tax compliance across Kenya Revenue Authority and Nigeria's FIRS automatically"
    ],
    techUsed: ["React", "Express Backend", "Python Vision Engine", "Gemini 3.5 AI", "SAP HANA Gateway"],
    roiMetrics: [
      { label: "Processing Speedup", value: "12x", suffix: " Faster" },
      { label: "Friction Cost Savings", value: "$180,000", suffix: " Annually" },
      { label: "Data Quality Rate", value: "99.8%", suffix: " Accuracy" }
    ]
  },
  {
    id: "warehouse-management",
    title: "Nairobi Regional Warehouse Tracking & Supply Chain System",
    industry: "Warehousing & FMCG",
    problem: "A major East African fast-moving consumer goods (FMCG) distributor with three major hubs in Nairobi faced serious inventory leakages, untracked stock movements, and zero real-time visibility over container counts, leading to stockouts and expired goods.",
    solution: "We designed and deployed the Axion Warehouse Management System (WMS), linking local handheld QR code scanner nodes with a centralized low-latency Postgres database, complete with a supervisor dashboard mapping bin levels in real-time.",
    architecture: [
      "1. Local Android scanner terminals (Kotlin Native)",
      "2. Local server-level sqlite caches to support offline operation during cellular drops",
      "3. Centralized Postgres relational core hosted in secure region VPC",
      "4. Redis cache updating the live tracking dashboard in under 200ms",
      "5. Autonomous reorder dispatch pipelines connecting directly to manufacturer APIs"
    ],
    impact: [
      "Stock shrinkage rates dropped from 8.2% down to 0.15% within 90 days",
      "Order picking duration reduced by 45% via optimal picking-path algorithms",
      "Zero manual ledger discrepancies reported in annual stakeholder audit"
    ],
    techUsed: ["React Portal", "Kotlin Android App", "Node.js Server", "PostgreSQL", "Redis cache"],
    roiMetrics: [
      { label: "Shrinkage Rate", value: "0.15%", suffix: " Active" },
      { label: "Picking Speedup", value: "1.8x", suffix: " Faster" },
      { label: "Inventory Turnover", value: "+28%", suffix: " Increase" }
    ]
  },
  {
    id: "manufacturing-erp",
    title: "Integrated Production & ERP Synchronizer",
    industry: "Heavy Manufacturing",
    problem: "A major steel manufacturer in South Africa had severe disconnects between their physical furnace lines and corporate financial statements. Machine delays, fuel usage, and output yields were calculated post-hoc via manual shifts reporting sheets, preventing timely executive decision-making.",
    solution: "Axion Technologies implemented specialized manufacturing sync gateways. We mapped physical equipment relays to custom Express and SAP server listeners, establishing a high-fidelity 'Digital Twin' of the factory flooring.",
    architecture: [
      "1. OPC-UA industrial machine data collectors",
      "2. Axion Edge Gateway caching furnace temperature and output logs",
      "3. Node.js Express high-throughput ingest pipeline with automatic scaling",
      "4. SAP Business One SDK writing to core materials logs",
      "5. Interactive React live telemetry wallboard"
    ],
    impact: [
      "Real-time view of cost-of-goods-sold (COGS) visible to executive committee instantly",
      "Furnace maintenance predictions avoided two massive catastrophic shutdowns",
      "Fuel waste decreased by 18.5% via optimal burn scheduling"
    ],
    techUsed: ["Node.js Edge Client", "Express API Cluster", "SAP Business One SDK", "React Canvas Charts", "D3.js"],
    roiMetrics: [
      { label: "COGS Log Latency", value: "<15s", suffix: " Realtime" },
      { label: "Downtime Prevented", value: "48", suffix: " Hours / Year" },
      { label: "Fuel Efficiency", value: "+18.5%", suffix: " Saving" }
    ]
  }
];

export const teamMembers = [
  {
    name: "Dr. Kwesi Amonoo",
    role: "Chief Executive Officer",
    background: "Ex-Accenture Partner, PhD in Digital Systems (UCT)",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop"
  },
  {
    name: "Chinara Adebayo",
    role: "Chief Technology Officer",
    background: "Ex-Google Staff Engineer, Enterprise Database Specialist",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&fit=crop"
  },
  {
    name: "Francois Naidoo",
    role: "VP of Enterprise Solutions",
    background: "Ex-SAP Lead Architect, ERP & SAP HANA Authority",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop"
  }
];

export const coreValues = [
  {
    title: "Innovation (Intelligent Design)",
    desc: "We do not deploy basic templates. We engineer high-performance systems incorporating cutting-edge AI and reliable data engines."
  },
  {
    title: "Integrity & Trust",
    desc: "As an enterprise partner, we hold ourselves to rigorous audit, data protection, and operational reliability standards."
  },
  {
    title: "African Partnership",
    desc: "We are deeply committed to elevating African commerce, aligning local trade workflows with global tech benchmarks."
  }
];

export const timelineSteps = [
  {
    year: "2026",
    title: "Enterprise Foundation & Local Core Dev",
    desc: "Establish primary operation hubs in Nairobi, Lagos, and Johannesburg. Consolidate ERP integration framework."
  },
  {
    year: "2027",
    title: "East & West African Expansion",
    desc: "Scale the Intelligent Document Processing (IDP) and Logistics platforms to 150+ regional enterprise operators."
  },
  {
    year: "2028",
    title: "Proprietary SaaS Ecosystems Launch",
    desc: "Release containerized, modular WMS and Billing cloud platforms designed for rapid mid-market deployment."
  },
  {
    year: "2030",
    title: "Africa's Enterprise Technology Leader",
    desc: "Establish Axion as the definitive digital transformation partner across the continent, handling thousands of corporate systems."
  }
];
