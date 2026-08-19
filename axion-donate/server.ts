import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import QRCode from 'qrcode';
import { createServer as createViteServer } from 'vite';
import { initialCampaigns, initialAnalytics, initialActivityLogs } from './src/data/initialData';
import { Campaign, DonorSubmission, CampaignUpdate, ApprovedSupporter, ActivityLog, MediaFile } from './src/types';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'axion-donate-jwt-secret-key-2026';

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// File DB Path
const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

interface DatabaseSchema {
  campaigns: Campaign[];
  submissions: DonorSubmission[];
  updates: CampaignUpdate[];
  supporters: ApprovedSupporter[];
  media: MediaFile[];
  activityLogs: ActivityLog[];
  analytics: {
    totalVisitors: number;
    totalShares: number;
  };
}

// Ensure DB directory & file exist
function initDatabase(): DatabaseSchema {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const defaultData: DatabaseSchema = {
      campaigns: initialCampaigns,
      submissions: [
        {
          id: 'sub-101',
          campaignId: 'camp-1',
          campaignTitle: 'Emergency Pediatric Cardiac Surgery Unit',
          donorName: 'Elena Rostova',
          donorEmail: 'elena@example.com',
          amount: 2500,
          currency: 'USD',
          paymentMethod: 'Bank Transfer',
          transactionId: 'FT2026080599182',
          proofScreenshotUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
          message: 'Praying for a full and speedy recovery for all the little ones.',
          isAnonymous: false,
          status: 'Approved',
          submittedAt: '2026-08-05T12:00:00Z',
          reviewedAt: '2026-08-05T14:12:00Z'
        },
        {
          id: 'sub-102',
          campaignId: 'camp-2',
          campaignTitle: 'Clean Solar Water Well Infrastructure',
          donorName: 'Marcus Vance',
          donorEmail: 'marcus@example.com',
          amount: 1000,
          currency: 'USD',
          paymentMethod: 'Crypto (TRC20)',
          transactionId: '0x8f99a012b456...trc20',
          proofScreenshotUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
          message: 'Water is life. Keep up the transparent work!',
          isAnonymous: false,
          status: 'Pending',
          submittedAt: '2026-08-06T17:45:00Z'
        }
      ],
      updates: [
        {
          id: 'up-1',
          campaignId: 'camp-1',
          title: 'First Bypass Oxygenator Kit Delivered',
          content: 'Thanks to your generous donations, we successfully delivered the first batch of pediatric oxygenators to Saint Mary ICU today!',
          imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
          createdAt: '2026-08-04T10:00:00Z'
        }
      ],
      supporters: [
        {
          id: 'sup-1',
          campaignId: 'camp-1',
          donorName: 'Elena Rostova',
          amount: 2500,
          currency: 'USD',
          message: 'Praying for a full and speedy recovery for all the little ones.',
          approvedAt: '2026-08-05T14:12:00Z',
          isAnonymous: false
        },
        {
          id: 'sup-2',
          campaignId: 'camp-1',
          donorName: 'Anonymous Donor',
          amount: 5000,
          currency: 'USD',
          message: 'For the children.',
          approvedAt: '2026-08-03T09:00:00Z',
          isAnonymous: true
        }
      ],
      media: [
        {
          id: 'med-1',
          filename: 'icu_delivery_receipt.jpg',
          url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
          size: '1.2 MB',
          mimeType: 'image/jpeg',
          uploadedAt: '2026-08-04T10:00:00Z'
        }
      ],
      activityLogs: initialActivityLogs,
      analytics: {
        totalVisitors: 12350,
        totalShares: 3140
      }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf8');
    return defaultData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB file, re-initializing...', err);
    const fallback = {
      campaigns: initialCampaigns,
      submissions: [],
      updates: [],
      supporters: [],
      media: [],
      activityLogs: initialActivityLogs,
      analytics: { totalVisitors: 12350, totalShares: 3140 }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(fallback, null, 2), 'utf8');
    return fallback;
  }
}

function saveDatabase(data: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save DB file:', err);
  }
}

// Auth Middleware for Admin Routes
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Admin token missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    (req as any).admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
}

// ---------------- API ROUTES ----------------

// Admin Auth
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  // Default admin credentials: admin@axiondonate.org / admin123
  if (email === 'admin@axiondonate.org' && (password === 'admin123' || password === 'admin')) {
    const token = jwt.sign(
      { email, name: 'Senior Platform Administrator', role: 'Super Admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.json({
      token,
      user: {
        id: 'adm-001',
        email: 'admin@axiondonate.org',
        name: 'Senior Platform Administrator',
        role: 'Super Admin'
      }
    });
  }

  return res.status(401).json({ error: 'Invalid admin credentials' });
});

app.get('/api/admin/me', requireAdmin, (req: Request, res: Response) => {
  const admin = (req as any).admin;
  res.json({
    id: 'adm-001',
    email: admin.email,
    name: admin.name || 'Senior Platform Administrator',
    role: admin.role || 'Super Admin'
  });
});

// Dynamic QR Code Generator Endpoint
app.get('/api/qrcode', async (req: Request, res: Response) => {
  const text = (req.query.text as string) || 'Axion Donate Platform';
  try {
    const qrDataUrl = await QRCode.toDataURL(text, {
      margin: 2,
      width: 320,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });
    res.json({ qrDataUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Public Campaigns GET
app.get('/api/campaigns', (req: Request, res: Response) => {
  const db = initDatabase();

  let results = [...db.campaigns];
  const { category, search, status } = req.query;

  if (category && category !== 'All') {
    results = results.filter(c => c.category.toLowerCase() === (category as string).toLowerCase());
  }

  if (status && status !== 'All') {
    results = results.filter(c => c.status.toLowerCase() === (status as string).toLowerCase());
  }

  if (search) {
    const q = (search as string).toLowerCase();
    results = results.filter(
      c =>
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.beneficiaryName.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

// Public Campaign Details GET
app.get('/api/campaigns/:id', (req: Request, res: Response) => {
  const db = initDatabase();
  const campaign = db.campaigns.find(c => c.id === req.params.id);

  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  res.json(campaign);
});

// Campaign Updates
app.get('/api/campaigns/:id/updates', (req: Request, res: Response) => {
  const db = initDatabase();
  const updates = db.updates.filter(u => u.campaignId === req.params.id);
  res.json(updates);
});

// Campaign Approved Supporters
app.get('/api/campaigns/:id/supporters', (req: Request, res: Response) => {
  const db = initDatabase();
  const supporters = db.supporters.filter(s => s.campaignId === req.params.id);
  res.json(supporters);
});

// Submit Donation Proof (Public)
app.post('/api/donations/submit', (req: Request, res: Response) => {
  const {
    campaignId,
    donorName,
    donorEmail,
    amount,
    currency,
    paymentMethod,
    transactionId,
    proofScreenshotUrl,
    message,
    isAnonymous
  } = req.body;

  if (!campaignId || !amount || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Campaign ID and valid amount are required' });
  }

  const db = initDatabase();
  const campaign = db.campaigns.find(c => c.id === campaignId);

  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const newSubmission: DonorSubmission = {
    id: 'sub-' + Date.now(),
    campaignId,
    campaignTitle: campaign.title,
    donorName: isAnonymous ? 'Anonymous Donor' : (donorName || 'Generous Donor'),
    donorEmail: donorEmail || '',
    amount: Number(amount),
    currency: currency || campaign.currency || 'USD',
    paymentMethod: paymentMethod || 'Bank Transfer',
    transactionId: transactionId || '',
    proofScreenshotUrl: proofScreenshotUrl || '',
    message: message || '',
    isAnonymous: Boolean(isAnonymous),
    status: 'Pending',
    submittedAt: new Date().toISOString()
  };

  db.submissions.unshift(newSubmission);
  saveDatabase(db);

  res.json({ success: true, submission: newSubmission });
});

// Public Share Counter
app.post('/api/campaigns/:id/share', (req: Request, res: Response) => {
  const db = initDatabase();
  const campaign = db.campaigns.find(c => c.id === req.params.id);
  if (campaign) {
    campaign.sharesCount += 1;
    db.analytics.totalShares += 1;
    saveDatabase(db);
  }
  res.json({ success: true });
});

// Public Platform Statistics & Analytics
app.get('/api/analytics', (req: Request, res: Response) => {
  const db = initDatabase();

  const totalCampaigns = db.campaigns.length;
  const activeCampaigns = db.campaigns.filter(c => c.status === 'Active' || c.status === 'Urgent').length;
  const completedCampaigns = db.campaigns.filter(c => c.status === 'Completed').length;
  const totalDonationsAmount = db.campaigns.reduce((sum, c) => sum + c.currentAmount, 0);
  const pendingProofCount = db.submissions.filter(s => s.status === 'Pending').length;

  // Category Breakdown
  const categoryMap: Record<string, number> = {};
  db.campaigns.forEach(c => {
    categoryMap[c.category] = (categoryMap[c.category] || 0) + c.currentAmount;
  });

  const categoryBreakdown = Object.entries(categoryMap).map(([category, amount]) => ({
    category,
    amount
  }));

  res.json({
    totalCampaigns,
    activeCampaigns,
    completedCampaigns,
    totalDonationsAmount,
    totalVisitors: db.analytics.totalVisitors,
    totalShares: db.analytics.totalShares,
    pendingProofCount,
    donationGrowth: initialAnalytics.donationGrowth,
    categoryBreakdown
  });
});

// ---------------- ADMIN PROTECTED ROUTES ----------------

// Create Campaign
app.post('/api/admin/campaigns', requireAdmin, (req: Request, res: Response) => {
  const db = initDatabase();
  const body = req.body;

  const newCampaign: Campaign = {
    id: 'camp-' + Date.now(),
    title: body.title || 'Untitled Campaign',
    shortDescription: body.shortDescription || '',
    fullDescription: body.fullDescription || '',
    category: body.category || 'Medical',
    coverImage: body.coverImage || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=1200&q=80',
    galleryImages: body.galleryImages || [],
    targetAmount: Number(body.targetAmount) || 10000,
    currentAmount: Number(body.currentAmount) || 0,
    currency: body.currency || 'USD',
    location: body.location || 'Global',
    beneficiaryName: body.beneficiaryName || 'Beneficiary',
    beneficiaryType: body.beneficiaryType || 'NGO / Organization',
    bankAccount: body.bankAccount || { accountName: '', accountNumber: '', bankName: '' },
    cryptoWallet: body.cryptoWallet || { network: 'TRON (TRC20)', address: '' },
    status: body.status || 'Active',
    featured: Boolean(body.featured),
    startDate: body.startDate || new Date().toISOString().split('T')[0],
    endDate: body.endDate || '2026-12-31',
    viewsCount: 0,
    sharesCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.campaigns.unshift(newCampaign);

  // Add Log
  db.activityLogs.unshift({
    id: 'log-' + Date.now(),
    adminEmail: (req as any).admin.email,
    action: 'Campaign Created',
    details: `Created new campaign "${newCampaign.title}" (Target: $${newCampaign.targetAmount})`,
    timestamp: new Date().toISOString()
  });

  saveDatabase(db);
  res.json(newCampaign);
});

// Edit Campaign
app.put('/api/admin/campaigns/:id', requireAdmin, (req: Request, res: Response) => {
  const db = initDatabase();
  const index = db.campaigns.findIndex(c => c.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const existing = db.campaigns[index];
  const updated: Campaign = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  db.campaigns[index] = updated;

  db.activityLogs.unshift({
    id: 'log-' + Date.now(),
    adminEmail: (req as any).admin.email,
    action: 'Campaign Updated',
    details: `Updated campaign details for "${updated.title}"`,
    timestamp: new Date().toISOString()
  });

  saveDatabase(db);
  res.json(updated);
});

// Delete Campaign
app.delete('/api/admin/campaigns/:id', requireAdmin, (req: Request, res: Response) => {
  const db = initDatabase();
  const campaign = db.campaigns.find(c => c.id === req.params.id);

  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  db.campaigns = db.campaigns.filter(c => c.id !== req.params.id);

  db.activityLogs.unshift({
    id: 'log-' + Date.now(),
    adminEmail: (req as any).admin.email,
    action: 'Campaign Deleted',
    details: `Deleted campaign "${campaign.title}"`,
    timestamp: new Date().toISOString()
  });

  saveDatabase(db);
  res.json({ success: true });
});

// Get All Proof Submissions
app.get('/api/admin/submissions', requireAdmin, (req: Request, res: Response) => {
  const db = initDatabase();
  res.json(db.submissions);
});

// Approve Proof Submission
app.post('/api/admin/submissions/:id/approve', requireAdmin, (req: Request, res: Response) => {
  const db = initDatabase();
  const submission = db.submissions.find(s => s.id === req.params.id);

  if (!submission) {
    return res.status(404).json({ error: 'Proof submission not found' });
  }

  submission.status = 'Approved';
  submission.reviewedAt = new Date().toISOString();

  // Find Campaign and increase amount raised
  const campaign = db.campaigns.find(c => c.id === submission.campaignId);
  if (campaign) {
    campaign.currentAmount += submission.amount;
    if (campaign.currentAmount >= campaign.targetAmount) {
      campaign.status = 'Completed';
    }
  }

  // Add to Public Approved Supporters
  const newSupporter: ApprovedSupporter = {
    id: 'sup-' + Date.now(),
    campaignId: submission.campaignId,
    donorName: submission.isAnonymous ? 'Anonymous Donor' : submission.donorName,
    amount: submission.amount,
    currency: submission.currency,
    message: submission.message,
    approvedAt: new Date().toISOString(),
    isAnonymous: submission.isAnonymous
  };
  db.supporters.unshift(newSupporter);

  // Add Log
  db.activityLogs.unshift({
    id: 'log-' + Date.now(),
    adminEmail: (req as any).admin.email,
    action: 'Proof Approved',
    details: `Approved $${submission.amount} donation proof from ${submission.donorName} for ${submission.campaignTitle}`,
    timestamp: new Date().toISOString()
  });

  saveDatabase(db);
  res.json({ success: true, submission, supporter: newSupporter });
});

// Reject Proof Submission
app.post('/api/admin/submissions/:id/reject', requireAdmin, (req: Request, res: Response) => {
  const { notes } = req.body;
  const db = initDatabase();
  const submission = db.submissions.find(s => s.id === req.params.id);

  if (!submission) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  submission.status = 'Rejected';
  submission.reviewedAt = new Date().toISOString();
  submission.adminNotes = notes || 'Unverified proof details';

  db.activityLogs.unshift({
    id: 'log-' + Date.now(),
    adminEmail: (req as any).admin.email,
    action: 'Proof Rejected',
    details: `Rejected submission for ${submission.campaignTitle}`,
    timestamp: new Date().toISOString()
  });

  saveDatabase(db);
  res.json({ success: true, submission });
});

// Post Campaign Update
app.post('/api/admin/updates', requireAdmin, (req: Request, res: Response) => {
  const { campaignId, title, content, imageUrl } = req.body;
  const db = initDatabase();

  const newUpdate: CampaignUpdate = {
    id: 'up-' + Date.now(),
    campaignId,
    title,
    content,
    imageUrl: imageUrl || '',
    createdAt: new Date().toISOString()
  };

  db.updates.unshift(newUpdate);

  db.activityLogs.unshift({
    id: 'log-' + Date.now(),
    adminEmail: (req as any).admin.email,
    action: 'Campaign Update Published',
    details: `Published update "${title}" for campaign ID ${campaignId}`,
    timestamp: new Date().toISOString()
  });

  saveDatabase(db);
  res.json(newUpdate);
});

// Get Media Manager Files
app.get('/api/admin/media', requireAdmin, (req: Request, res: Response) => {
  const db = initDatabase();
  res.json(db.media);
});

// Upload Media File
app.post('/api/admin/media', requireAdmin, (req: Request, res: Response) => {
  const { filename, url, size, mimeType } = req.body;
  const db = initDatabase();

  const newFile: MediaFile = {
    id: 'med-' + Date.now(),
    filename: filename || 'file_' + Date.now() + '.png',
    url: url || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=800&q=80',
    size: size || '512 KB',
    mimeType: mimeType || 'image/png',
    uploadedAt: new Date().toISOString()
  };

  db.media.unshift(newFile);
  saveDatabase(db);
  res.json(newFile);
});

// Delete Media File
app.delete('/api/admin/media/:id', requireAdmin, (req: Request, res: Response) => {
  const db = initDatabase();
  db.media = db.media.filter(m => m.id !== req.params.id);
  saveDatabase(db);
  res.json({ success: true });
});

// Activity Logs
app.get('/api/admin/logs', requireAdmin, (req: Request, res: Response) => {
  const db = initDatabase();
  res.json(db.activityLogs);
});

// ---------------- VITE & EXPRESS BOOT ----------------

async function startServer() {
  initDatabase();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Axion Donate enterprise server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
