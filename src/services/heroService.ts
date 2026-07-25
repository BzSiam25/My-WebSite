import { apiRequest } from './api';

export const heroService = {
  getPublic: () => apiRequest('/hero'),
  getAdmin: () => apiRequest('/admin/hero'),
  updateAdmin: (data: any) => apiRequest('/admin/hero', { method: 'POST', body: JSON.stringify(data) }),
};
