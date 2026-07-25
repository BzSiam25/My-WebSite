import { apiRequest } from './api';

export const auditLogService = {
  getAdmin: (params?: { page?: number; search?: string; module?: string; action?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.search) query.append('search', params.search);
    if (params?.module) query.append('module', params.module);
    if (params?.action) query.append('action', params.action);
    return apiRequest(`/admin/audit-logs?${query.toString()}`);
  },
};
