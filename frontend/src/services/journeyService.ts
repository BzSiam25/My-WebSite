import { apiRequest } from './api';

export const journeyService = {
  getPublic: () => apiRequest('/journeys'),
  getAdmin: (params?: { page?: number; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.search) query.append('search', params.search);
    return apiRequest(`/admin/journeys?${query.toString()}`);
  },
  createAdmin: (data: any) => apiRequest('/admin/journeys', { method: 'POST', body: JSON.stringify(data) }),
  updateAdmin: (id: number, data: any) => apiRequest(`/admin/journeys/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdmin: (id: number) => apiRequest(`/admin/journeys/${id}`, { method: 'DELETE' }),
  toggleEnabled: (id: number) => apiRequest(`/admin/journeys/${id}/toggle-enabled`, { method: 'PATCH' }),
  reorder: (ids: number[]) => apiRequest('/admin/journeys/reorder', { method: 'POST', body: JSON.stringify({ ids }) }),
};
