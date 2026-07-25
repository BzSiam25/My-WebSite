import { apiRequest } from './api';

export const aboutService = {
  getPublic: () => apiRequest('/about'),
  getAdmin: () => apiRequest('/admin/about'),
  updateAdmin: (data: any) => apiRequest('/admin/about', { method: 'POST', body: JSON.stringify(data) }),
};
