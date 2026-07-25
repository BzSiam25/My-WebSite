import { apiRequest } from './api';

export const aiService = {
  getAdmin: () => apiRequest('/admin/ai-settings'),
  updateAdmin: (data: any) => apiRequest('/admin/ai-settings', { method: 'POST', body: JSON.stringify(data) }),
};
