export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  problem: string;
  solution: string;
  architecture: string[];
  impact: string[];
  techUsed: string[];
  roiMetrics: { label: string; value: string; suffix?: string }[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  iconName: string;
  description: string;
  bulletPoints: string[];
}

export interface IndustryShowcase {
  id: string;
  name: string;
  iconName: string;
  description: string;
  visualLabel: string;
  operationalSteps: string[];
}

export interface TechStackItem {
  category: string;
  tech: string;
  purpose: string;
}

export interface RoadmapPhase {
  title: string;
  duration: string;
  description: string;
  milestones: string[];
}

export interface ArchNode {
  id: string;
  label: string;
  type: 'source' | 'process' | 'gateway' | 'storage' | 'destination';
  description: string;
}

export interface RoiMetric {
  label: string;
  value: string;
  improvement: string;
  explanation: string;
}

export interface ArchitectReport {
  consultingSummary: string;
  roadmap: RoadmapPhase[];
  techStack: TechStackItem[];
  architectureDiagram: ArchNode[];
  roiMetrics: RoiMetric[];
  isLocalEngine: boolean;
}

export type Language = 'en' | 'fr' | 'sw';

export interface TranslationDictionary {
  brandName: string;
  headline: string;
  subheadline: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  ctaBook: string;
  ctaExplore: string;
  dashboardTitle: string;
  dashboardSub: string;
  servicesTitle: string;
  industriesTitle: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  timelineTitle: string;
  consultingTitle: string;
  consultingSubtitle: string;
  bookingFormTitle: string;
  loadingSystemOnline: string;
}
