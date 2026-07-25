import { apiRequest } from './api';

export const projectService = {
  getPublic: () => apiRequest('/projects'),
  getAdmin: (params?: { page?: number; search?: string; category?: string; trashed?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.search) query.append('search', params.search);
    if (params?.category) query.append('category', params.category);
    if (params?.trashed) query.append('trashed', '1');
    return apiRequest(`/admin/projects?${query.toString()}`);
  },
  getAdminById: (id: number) => apiRequest(`/admin/projects/${id}`),
  createAdmin: (data: any) => apiRequest('/admin/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateAdmin: (id: number, data: any) => apiRequest(`/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdmin: (id: number) => apiRequest(`/admin/projects/${id}`, { method: 'DELETE' }),
  restoreAdmin: (id: number) => apiRequest(`/admin/projects/${id}/restore`, { method: 'POST' }),
  togglePublish: (id: number) => apiRequest(`/admin/projects/${id}/toggle-publish`, { method: 'PATCH' }),
  toggleFeatured: (id: number) => apiRequest(`/admin/projects/${id}/toggle-featured`, { method: 'PATCH' }),
  toggleEnabled: (id: number) => apiRequest(`/admin/projects/${id}/toggle-enabled`, { method: 'PATCH' }),
  reorder: (ids: number[]) => apiRequest('/admin/projects/reorder', { method: 'POST', body: JSON.stringify({ ids }) }),
};
