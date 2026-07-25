import { apiRequest } from './api';

export const skillService = {
  getPublic: () => apiRequest('/skills'),
  getAdmin: (params?: { page?: number; search?: string; category?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.search) query.append('search', params.search);
    if (params?.category) query.append('category', params.category);
    return apiRequest(`/admin/skills?${query.toString()}`);
  },
  createAdmin: (data: any) => apiRequest('/admin/skills', { method: 'POST', body: JSON.stringify(data) }),
  updateAdmin: (id: number, data: any) => apiRequest(`/admin/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdmin: (id: number) => apiRequest(`/admin/skills/${id}`, { method: 'DELETE' }),
  toggleEnabled: (id: number) => apiRequest(`/admin/skills/${id}/toggle-enabled`, { method: 'PATCH' }),
  reorder: (ids: number[]) => apiRequest('/admin/skills/reorder', { method: 'POST', body: JSON.stringify({ ids }) }),
};
