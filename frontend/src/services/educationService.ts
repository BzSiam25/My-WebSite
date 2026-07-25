import { apiRequest } from './api';

export const educationService = {
  getPublic: () => apiRequest('/education'),
  getAdmin: (params?: { page?: number; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.search) query.append('search', params.search);
    return apiRequest(`/admin/education?${query.toString()}`);
  },
  createAdmin: (data: any) => apiRequest('/admin/education', { method: 'POST', body: JSON.stringify(data) }),
  updateAdmin: (id: number, data: any) => apiRequest(`/admin/education/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdmin: (id: number) => apiRequest(`/admin/education/${id}`, { method: 'DELETE' }),
  toggleEnabled: (id: number) => apiRequest(`/admin/education/${id}/toggle-enabled`, { method: 'PATCH' }),
  reorder: (ids: number[]) => apiRequest('/admin/education/reorder', { method: 'POST', body: JSON.stringify({ ids }) }),
};
