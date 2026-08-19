export type CampaignCategory = 
  | 'Medical'
  | 'Emergency Relief'
  | 'Education'
  | 'Environment'
  | 'Community'
  | 'Disaster';

export type CampaignStatus = 'Active' | 'Completed' | 'Urgent' | 'Draft' | 'Archived';

export interface BankAccount {
  accountName: string;
  accountNumber: string;
  bankName: string;
  swiftCode?: string;
  qrCodeUrl?: string;
}

export interface CryptoWallet {
  network: string; // e.g., 'TRON (TRC20)', 'Ethereum (ERC20)', 'Bitcoin'
  address: string;
  qrCodeUrl?: string;
}

export interface CampaignUpdate {
  id: string;
  campaignId: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface ApprovedSupporter {
  id: string;
  campaignId: string;
  donorName: string; // or "Anonymous"
  amount: number;
  currency: string;
  message?: string;
  approvedAt: string;
  isAnonymous: boolean;
}

export interface DonorSubmission {
  id: string;
  campaignId: string;
  campaignTitle: string;
  donorName: string;
  donorEmail?: string;
  amount: number;
  currency: string;
  paymentMethod: 'Bank Transfer' | 'Crypto (TRC20)' | 'Crypto (Other)';
  transactionId?: string;
  proofScreenshotUrl?: string;
  message?: string;
  isAnonymous: boolean;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
  reviewedAt?: string;
  adminNotes?: string;
}

export interface Campaign {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: CampaignCategory;
  coverImage: string;
  galleryImages: string[];
  targetAmount: number;
  currentAmount: number;
  currency: string;
  location: string;
  beneficiaryName: string;
  beneficiaryType: 'Individual' | 'NGO / Organization' | 'Community Project';
  bankAccount: BankAccount;
  cryptoWallet: CryptoWallet;
  status: CampaignStatus;
  featured: boolean;
  startDate: string;
  endDate: string;
  viewsCount: number;
  sharesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MediaFile {
  id: string;
  filename: string;
  url: string;
  size: string;
  mimeType: string;
  uploadedAt: string;
}

export interface ActivityLog {
  id: string;
  adminEmail: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface PlatformAnalytics {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalDonationsAmount: number;
  totalVisitors: number;
  totalShares: number;
  pendingProofCount: number;
  donationGrowth: { date: string; amount: number; count: number }[];
  categoryBreakdown: { category: string; amount: number }[];
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'Super Admin' | 'Campaign Manager';
}

export type Language = 'en' | 'es' | 'fr' | 'ar';
