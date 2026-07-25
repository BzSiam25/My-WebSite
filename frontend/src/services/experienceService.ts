import { apiRequest } from './api';

export const experienceService = {
  getPublic: () => apiRequest('/experiences'),
  getAdmin: (params?: { page?: number; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.search) query.append('search', params.search);
    return apiRequest(`/admin/experiences?${query.toString()}`);
  },
  createAdmin: (data: any) => apiRequest('/admin/experiences', { method: 'POST', body: JSON.stringify(data) }),
  updateAdmin: (id: number, data: any) => apiRequest(`/admin/experiences/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdmin: (id: number) => apiRequest(`/admin/experiences/${id}`, { method: 'DELETE' }),
  toggleEnabled: (id: number) => apiRequest(`/admin/experiences/${id}/toggle-enabled`, { method: 'PATCH' }),
  reorder: (ids: number[]) => apiRequest('/admin/experiences/reorder', { method: 'POST', body: JSON.stringify({ ids }) }),
};
