import { Campaign, ActivityLog, PlatformAnalytics } from '../types';

export const initialCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Emergency Pediatric Cardiac Surgery Unit',
    shortDescription: 'Funding urgent life-saving open-heart surgeries and specialized ICU equipment for critically ill children.',
    fullDescription: `Every year, hundreds of children are born with complex congenital heart defects that require immediate surgical intervention. Our regional pediatric cardiology unit is facing a severe shortage of critical bypass oxygenators and ICU monitoring systems.

Your direct donation funds surgery kits, post-operative medication, and specialized nursing support for children whose families cannot afford private medical care. 100% of funds are directly transferred to Saint Mary's Children Foundation medical account with zero administrative deductions.`,
    category: 'Medical',
    coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
    ],
    targetAmount: 75000,
    currentAmount: 52400,
    currency: 'USD',
    location: 'Nairobi, Kenya',
    beneficiaryName: 'St. Mary Pediatric Care Trust',
    beneficiaryType: 'NGO / Organization',
    bankAccount: {
      accountName: 'St Mary Pediatric Care Trust',
      accountNumber: '9082-1142-8809-3312',
      bankName: 'First International Bank of Africa',
      swiftCode: 'FIBANAKN'
    },
    cryptoWallet: {
      network: 'TRON (TRC20)',
      address: 'TYu8a9PzKm42x9LQp71VxN98kXmZp1Q3a7'
    },
    status: 'Urgent',
    featured: true,
    startDate: '2026-07-01',
    endDate: '2026-08-30',
    viewsCount: 3420,
    sharesCount: 890,
    createdAt: '2026-07-01T10:00:00Z',
    updatedAt: '2026-08-05T14:30:00Z'
  },
  {
    id: 'camp-2',
    title: 'Clean Solar Water Well Infrastructure',
    shortDescription: 'Constructing solar-powered deep aquifer water filtration wells serving 4 rural drought-stricken villages.',
    fullDescription: `In drought-prone arid regions, women and young girls walk over 8 kilometers every day to fetch untreated river water. This campaign funds the drilling of 120-meter deep aquifers equipped with solar-powered pumps, filtration tanks, and clean water distribution taps.

Each well provides continuous clean drinking water to over 2,500 villagers, drastically lowering waterborne diseases and enabling young girls to attend school regularly.`,
    category: 'Environment',
    coverImage: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?auto=format&fit=crop&w=800&q=80'
    ],
    targetAmount: 42000,
    currentAmount: 38900,
    currency: 'USD',
    location: 'Turkana County, Kenya',
    beneficiaryName: 'AquaVita Water Foundation',
    beneficiaryType: 'Community Project',
    bankAccount: {
      accountName: 'AquaVita Water Foundation',
      accountNumber: '4401-9923-1182-0045',
      bankName: 'Global Commercial Bank',
      swiftCode: 'GCBKUS33'
    },
    cryptoWallet: {
      network: 'TRON (TRC20)',
      address: 'TQw9xL2pNm81kPQz77XvY124mZaR4B9c99'
    },
    status: 'Active',
    featured: true,
    startDate: '2026-06-15',
    endDate: '2026-09-01',
    viewsCount: 2150,
    sharesCount: 520,
    createdAt: '2026-06-15T08:00:00Z',
    updatedAt: '2026-08-06T09:12:00Z'
  },
  {
    id: 'camp-3',
    title: 'Emergency Flood Relief & Shelter Kits',
    shortDescription: 'Providing immediate food packs, water purification tablets, and heavy-duty shelter materials to displaced families.',
    fullDescription: `Severe monsoon flash floods have inundated over 35 villages, destroying homes and washing away food reserves. Thousands of displaced families are living under temporary plastic tarps without clean drinking water or warm clothing.

Your donation directly funds emergency response packs containing high-protein ration packs, water purification kits, thermal blankets, and waterproof family tent modules.`,
    category: 'Emergency Relief',
    coverImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=800&q=80'
    ],
    targetAmount: 100000,
    currentAmount: 84300,
    currency: 'USD',
    location: 'Chittagong Region, Bangladesh',
    beneficiaryName: 'Disaster Rapid Relief Alliance',
    beneficiaryType: 'NGO / Organization',
    bankAccount: {
      accountName: 'Disaster Rapid Relief Alliance',
      accountNumber: '1102-7744-9002-8831',
      bankName: 'Standard Chartered Bank',
      swiftCode: 'SCBLBDDH'
    },
    cryptoWallet: {
      network: 'TRON (TRC20)',
      address: 'TRa77xLp99Kq21MN34Xz90PqR112Za34Bb'
    },
    status: 'Urgent',
    featured: true,
    startDate: '2026-07-20',
    endDate: '2026-08-25',
    viewsCount: 4890,
    sharesCount: 1420,
    createdAt: '2026-07-20T11:00:00Z',
    updatedAt: '2026-08-06T18:00:00Z'
  },
  {
    id: 'camp-4',
    title: 'STEM Tech Lab & Digital Scholarships',
    shortDescription: 'Equipping low-income high schools with solar computers, starlink satellite internet, and coding bootcamps.',
    fullDescription: `Digital literacy is the gateway to global economic opportunities. However, rural schools often lack computers, electricity stability, and internet connectivity.

This initiative builds 10 off-grid solar-powered computer labs fitted with refurbished workstations, Starlink broadband connections, and provides 1-year coding scholarships for 250 talented students.`,
    category: 'Education',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    ],
    targetAmount: 30000,
    currentAmount: 30000,
    currency: 'USD',
    location: 'Accra, Ghana',
    beneficiaryName: 'Future Coders Foundation',
    beneficiaryType: 'NGO / Organization',
    bankAccount: {
      accountName: 'Future Coders Foundation',
      accountNumber: '3310-8821-4409-1190',
      bankName: 'Ecobank Ghana Ltd',
      swiftCode: 'ECOCGHAC'
    },
    cryptoWallet: {
      network: 'TRON (TRC20)',
      address: 'TZx99Pq88Mm11KK33Qq9021ZZa9911Xy88'
    },
    status: 'Completed',
    featured: false,
    startDate: '2026-05-01',
    endDate: '2026-07-15',
    viewsCount: 1890,
    sharesCount: 310,
    createdAt: '2026-05-01T09:00:00Z',
    updatedAt: '2026-07-16T12:00:00Z'
  }
];

export const initialAnalytics: PlatformAnalytics = {
  totalCampaigns: 4,
  activeCampaigns: 3,
  completedCampaigns: 1,
  totalDonationsAmount: 205600,
  totalVisitors: 12350,
  totalShares: 3140,
  pendingProofCount: 2,
  donationGrowth: [
    { date: 'Jul 01', amount: 15400, count: 28 },
    { date: 'Jul 08', amount: 32100, count: 54 },
    { date: 'Jul 15', amount: 68900, count: 112 },
    { date: 'Jul 22', amount: 112000, count: 184 },
    { date: 'Jul 29', amount: 158400, count: 240 },
    { date: 'Aug 05', amount: 205600, count: 310 }
  ],
  categoryBreakdown: [
    { category: 'Medical', amount: 52400 },
    { category: 'Environment', amount: 38900 },
    { category: 'Emergency Relief', amount: 84300 },
    { category: 'Education', amount: 30000 }
  ]
};

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    adminEmail: 'admin@axiondonate.org',
    action: 'Proof Approved',
    details: 'Approved $2,500 bank transfer proof from Elena Rostova for Pediatric Surgery Unit',
    timestamp: '2026-08-06T14:12:00Z'
  },
  {
    id: 'log-2',
    adminEmail: 'admin@axiondonate.org',
    action: 'Campaign Updated',
    details: 'Posted progress update on Emergency Flood Relief campaign',
    timestamp: '2026-08-05T09:30:00Z'
  }
];
