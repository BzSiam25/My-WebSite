import { apiRequest } from './api';

export const contactService = {
  getPublic: () => apiRequest('/contact'),
  getAdmin: () => apiRequest('/admin/contact'),
  updateAdmin: (data: any) => apiRequest('/admin/contact', { method: 'POST', body: JSON.stringify(data) }),
};
