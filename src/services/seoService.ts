import { apiRequest } from './api';

export const seoService = {
  getPublic: () => apiRequest('/seo'),
  getAdmin: () => apiRequest('/admin/seo'),
  updateAdmin: (data: any) => apiRequest('/admin/seo', { method: 'POST', body: JSON.stringify(data) }),
};
