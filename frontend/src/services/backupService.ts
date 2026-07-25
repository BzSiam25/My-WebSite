import { apiRequest } from './api';

export const backupService = {
  getAdmin: (params?: { page?: number }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    return apiRequest(`/admin/backups?${query.toString()}`);
  },
  createDatabaseBackup: () => apiRequest('/admin/backups/database', { method: 'POST' }),
  deleteAdmin: (id: number) => apiRequest(`/admin/backups/${id}`, { method: 'DELETE' }),
};
