import { apiRequest } from './api';

export const currentFocusService = {
  getPublic: () => apiRequest('/current-focus'),
  getAdmin: (params?: { page?: number; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.search) query.append('search', params.search);
    return apiRequest(`/admin/current-focus?${query.toString()}`);
  },
  createAdmin: (data: any) => apiRequest('/admin/current-focus', { method: 'POST', body: JSON.stringify(data) }),
  updateAdmin: (id: number, data: any) => apiRequest(`/admin/current-focus/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdmin: (id: number) => apiRequest(`/admin/current-focus/${id}`, { method: 'DELETE' }),
  toggleEnabled: (id: number) => apiRequest(`/admin/current-focus/${id}/toggle-enabled`, { method: 'PATCH' }),
  reorder: (ids: number[]) => apiRequest('/admin/current-focus/reorder', { method: 'POST', body: JSON.stringify({ ids }) }),
};
