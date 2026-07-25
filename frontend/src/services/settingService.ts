import { apiRequest } from './api';

export const settingService = {
  getPublic: () => apiRequest('/settings'),
  getAdmin: () => apiRequest('/admin/settings'),
  updateAdmin: (data: any) => apiRequest('/admin/settings', { method: 'POST', body: JSON.stringify(data) }),
};
