import React, { useState } from 'react';
import { useAdminAuditLogs } from '../hooks/useAdminData';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';

export const AuditLogsCMS: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading: fetching, refetch } = useAdminAuditLogs({ page, search });

  const logs = data?.data || [];
  const total = data?.pagination?.total || logs.length;
  const lastPage = data?.pagination?.last_page || 1;

  const columns: Column<any>[] = [
    {
      key: 'user',
      header: 'Admin User',
      render: (item) => item.user ? item.user.name : 'System Admin',
    },
    {
      key: 'action',
      header: 'Action',
      render: (item) => (
        <span className="font-semibold capitalize text-foreground">{item.action}</span>
      ),
    },
    {
      key: 'module',
      header: 'Module',
      render: (item) => (
        <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
          {item.module}
        </span>
      ),
    },
    {
      key: 'created_at',
      header: 'Timestamp',
      render: (item) => (
        <span className="text-muted-foreground text-[11px]">
          {item.created_at ? new Date(item.created_at).toLocaleString() : ''}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={logs}
        total={total}
        currentPage={page}
        lastPage={lastPage}
        onPageChange={setPage}
        search={search}
        onSearchChange={setSearch}
        isLoading={fetching}
        onRefresh={refetch}
      />
    </div>
  );
};
