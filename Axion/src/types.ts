export type ActivePage =
  | "home"
  | "services"
  | "industries"
  | "portfolio"
  | "company"
  | "timeline"
  | "contact"
  | "consultation-hub";

export type Language = "en" | "fr" | "sw";

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  client: string;
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
  image: string;
  statValue: string;
  statLabel: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  metrics: string;
  tag: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  detailedCase: string;
  keyBenefits: string[];
  stats: string;
  technologies: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  content: string;
}

export interface Dictionary {
  navHome: string;
  navServices: string;
  navIndustries: string;
  navPortfolio: string;
  navCompany: string;
  navTimeline: string;
  navContact: string;
  navConsultation: string;

  heroTitle: string;
  heroSub: string;
  ctaConsultation: string;
  ctaExplore: string;

  missionTitle: string;
  missionDesc: string;
  visionTitle: string;
  visionDesc: string;

  coreValuesTitle: string;
  coreValuesSub: string;
}
