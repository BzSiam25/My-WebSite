import { apiRequest } from './api';

const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const API_BASE = RAW_API_URL.replace(/\/+$/, '');

export const backupService = {
  getAdmin: (params?: { page?: number }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    return apiRequest(`/admin/backups?${query.toString()}`);
  },
  createDatabaseBackup: () => apiRequest('/admin/backups/database', { method: 'POST' }),
  deleteAdmin: (id: number) => apiRequest(`/admin/backups/${id}`, { method: 'DELETE' }),
  getDownloadUrl: (id: number) => `${API_BASE}/admin/backups/${id}/download`,
};
