import { apiRequest } from './api';

export const mediaService = {
  getAdmin: (params?: { page?: number; search?: string; folder?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.search) query.append('search', params.search);
    if (params?.folder) query.append('folder', params.folder);
    return apiRequest(`/admin/media?${query.toString()}`);
  },
  upload: (file: File, folder: string = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return apiRequest('/admin/media', {
      method: 'POST',
      body: formData,
    });
  },
  deleteAdmin: (id: number) => apiRequest(`/admin/media/${id}`, { method: 'DELETE' }),
};
