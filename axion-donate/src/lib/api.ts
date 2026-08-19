import { Campaign, DonorSubmission, CampaignUpdate, ApprovedSupporter, PlatformAnalytics, ActivityLog, MediaFile, AdminUser } from '../types';

const ADMIN_TOKEN_KEY = 'axion_admin_token';

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

// Fetch helper with auth header
async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(errorData.error || `HTTP error ${response.status}`);
  }

  return response.json();
}

// Public API
export async function getCampaigns(params?: { category?: string; search?: string; status?: string }): Promise<Campaign[]> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.status) query.append('status', params.status);

  return apiFetch<Campaign[]>(`/api/campaigns?${query.toString()}`);
}

export async function getCampaignById(id: string): Promise<Campaign> {
  return apiFetch<Campaign>(`/api/campaigns/${id}`);
}

export async function getCampaignUpdates(id: string): Promise<CampaignUpdate[]> {
  return apiFetch<CampaignUpdate[]>(`/api/campaigns/${id}/updates`);
}

export async function getCampaignSupporters(id: string): Promise<ApprovedSupporter[]> {
  return apiFetch<ApprovedSupporter[]>(`/api/campaigns/${id}/supporters`);
}

export async function submitDonationProof(data: Partial<DonorSubmission>): Promise<{ success: boolean; submission: DonorSubmission }> {
  return apiFetch<{ success: boolean; submission: DonorSubmission }>('/api/donations/submit', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function shareCampaign(id: string): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/api/campaigns/${id}/share`, {
    method: 'POST',
  });
}

export async function getAnalytics(): Promise<PlatformAnalytics> {
  return apiFetch<PlatformAnalytics>('/api/analytics');
}

export async function generateQrCode(text: string): Promise<string> {
  const res = await apiFetch<{ qrDataUrl: string }>(`/api/qrcode?text=${encodeURIComponent(text)}`);
  return res.qrDataUrl;
}

// Admin API
export async function adminLogin(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
  const res = await apiFetch<{ token: string; user: AdminUser }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setAdminToken(res.token);
  return res;
}

export async function getAdminMe(): Promise<AdminUser> {
  return apiFetch<AdminUser>('/api/admin/me');
}

export async function createCampaign(data: Partial<Campaign>): Promise<Campaign> {
  return apiFetch<Campaign>('/api/admin/campaigns', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCampaign(id: string, data: Partial<Campaign>): Promise<Campaign> {
  return apiFetch<Campaign>(`/api/admin/campaigns/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteCampaign(id: string): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/api/admin/campaigns/${id}`, {
    method: 'DELETE',
  });
}

export async function getSubmissions(): Promise<DonorSubmission[]> {
  return apiFetch<DonorSubmission[]>('/api/admin/submissions');
}

export async function approveSubmission(id: string): Promise<{ success: boolean; submission: DonorSubmission }> {
  return apiFetch<{ success: boolean; submission: DonorSubmission }>(`/api/admin/submissions/${id}/approve`, {
    method: 'POST',
  });
}

export async function rejectSubmission(id: string, notes?: string): Promise<{ success: boolean; submission: DonorSubmission }> {
  return apiFetch<{ success: boolean; submission: DonorSubmission }>(`/api/admin/submissions/${id}/reject`, {
    method: 'POST',
    body: JSON.stringify({ notes }),
  });
}

export async function postCampaignUpdate(campaignId: string, title: string, content: string, imageUrl?: string): Promise<CampaignUpdate> {
  return apiFetch<CampaignUpdate>('/api/admin/updates', {
    method: 'POST',
    body: JSON.stringify({ campaignId, title, content, imageUrl }),
  });
}

export async function getMediaFiles(): Promise<MediaFile[]> {
  return apiFetch<MediaFile[]>('/api/admin/media');
}

export async function uploadMediaFile(fileData: { filename: string; url: string; size?: string; mimeType?: string }): Promise<MediaFile> {
  return apiFetch<MediaFile>('/api/admin/media', {
    method: 'POST',
    body: JSON.stringify(fileData),
  });
}

export async function deleteMediaFile(id: string): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/api/admin/media/${id}`, {
    method: 'DELETE',
  });
}

export async function getActivityLogs(): Promise<ActivityLog[]> {
  return apiFetch<ActivityLog[]>('/api/admin/logs');
}
