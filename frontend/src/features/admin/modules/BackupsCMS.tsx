import React, { useState } from 'react';
import { useAdminBackups } from '../hooks/useAdminData';
import { backupService } from '@/services/backupService';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Download, Trash2, Database } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const BackupsCMS: React.FC = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: fetching, refetch } = useAdminBackups({ page });

  const backups = data?.data || [];
  const total = data?.pagination?.total || backups.length;
  const lastPage = data?.pagination?.last_page || 1;

  const handleCreateBackup = async () => {
    setIsLoading(true);
    try {
      await backupService.createDatabaseBackup();
      queryClient.invalidateQueries({ queryKey: ['admin-backups'] });
    } catch (err: any) {
      alert(err.message || 'Backup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsLoading(true);
    try {
      await backupService.deleteAdmin(deleteId);
      queryClient.invalidateQueries({ queryKey: ['admin-backups'] });
      setDeleteId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting backup');
    } finally {
      setIsLoading(false);
    }
  };

  const columns: Column<any>[] = [
    {
      key: 'filename',
      header: 'Backup File',
      render: (item) => (
        <div className="font-bold text-foreground">{item.filename}</div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => <StatusBadge status={item.status} label={item.status} />,
    },
    {
      key: 'size_bytes',
      header: 'Size',
      render: (item) => (
        <span className="text-muted-foreground">{item.size_bytes ? `${(item.size_bytes / 1024 / 1024).toFixed(2)} MB` : 'N/A'}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-7 w-7 p-0"
          >
            <a href={`http://127.0.0.1:8000/api/admin/backups/${item.id}/download`} target="_blank" rel="noreferrer">
              <Download className="w-3.5 h-3.5" />
            </a>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteId(item.id)}
            className="h-7 w-7 p-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleCreateBackup} disabled={isLoading} className="rounded-full gap-2">
          <Database className="w-4 h-4" />
          <span>{isLoading ? 'Creating Backup...' : 'Create Database Backup'}</span>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={backups}
        total={total}
        currentPage={page}
        lastPage={lastPage}
        onPageChange={setPage}
        isLoading={fetching}
        onRefresh={refetch}
      />

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Backup"
        message="Are you sure you want to delete this backup file?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isLoading}
      />
    </div>
  );
};
