import { apiRequest } from './api';

export const certificateService = {
  getPublic: () => apiRequest('/certificates'),
  getAdmin: (params?: { page?: number; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.search) query.append('search', params.search);
    return apiRequest(`/admin/certificates?${query.toString()}`);
  },
  createAdmin: (data: any) => apiRequest('/admin/certificates', { method: 'POST', body: JSON.stringify(data) }),
  updateAdmin: (id: number, data: any) => apiRequest(`/admin/certificates/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdmin: (id: number) => apiRequest(`/admin/certificates/${id}`, { method: 'DELETE' }),
  toggleEnabled: (id: number) => apiRequest(`/admin/certificates/${id}/toggle-enabled`, { method: 'PATCH' }),
  reorder: (ids: number[]) => apiRequest('/admin/certificates/reorder', { method: 'POST', body: JSON.stringify({ ids }) }),
};
