export type ActivePage =
  | "home"
  | "services"
  | "industries"
  | "solutions"
  | "portfolio"
  | "company"
  | "timeline"
  | "contact"
  | "consultation-hub"
  | "admin";

export type UserRole = "admin" | "employee" | "viewer";
export type UserStatus = "active" | "suspended";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  assignedConversationsCount?: number;
}

export interface ChatMessage {
  id: string;
  sender: "visitor" | "admin" | "AI";
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  visitorId: string;
  visitorName: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  unread: boolean;
  messages: ChatMessage[];
}

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
  navSolutions: string;
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
