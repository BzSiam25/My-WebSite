import { apiRequest } from './api';

export const researchService = {
  getPublic: () => apiRequest('/research'),
  getAdmin: (params?: { page?: number; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.search) query.append('search', params.search);
    return apiRequest(`/admin/research?${query.toString()}`);
  },
  createAdmin: (data: any) => apiRequest('/admin/research', { method: 'POST', body: JSON.stringify(data) }),
  updateAdmin: (id: number, data: any) => apiRequest(`/admin/research/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdmin: (id: number) => apiRequest(`/admin/research/${id}`, { method: 'DELETE' }),
  togglePublish: (id: number) => apiRequest(`/admin/research/${id}/toggle-publish`, { method: 'PATCH' }),
  toggleFeatured: (id: number) => apiRequest(`/admin/research/${id}/toggle-featured`, { method: 'PATCH' }),
  toggleEnabled: (id: number) => apiRequest(`/admin/research/${id}/toggle-enabled`, { method: 'PATCH' }),
};
