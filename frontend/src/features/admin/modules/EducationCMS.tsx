import React, { useState } from 'react';
import { useAdminEducation } from '../hooks/useAdminData';
import { educationService } from '@/services/educationService';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const EducationCMS: React.FC = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: fetching, refetch } = useAdminEducation({ page, search });

  const items = data?.data || [];
  const total = data?.pagination?.total || items.length;
  const lastPage = data?.pagination?.last_page || 1;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingItem.id) {
        await educationService.updateAdmin(editingItem.id, editingItem);
      } else {
        await educationService.createAdmin(editingItem);
      }
      queryClient.invalidateQueries({ queryKey: ['admin-education'] });
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err: any) {
      alert(err.message || 'Error saving education');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsLoading(true);
    try {
      await educationService.deleteAdmin(deleteId);
      queryClient.invalidateQueries({ queryKey: ['admin-education'] });
      setDeleteId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting education');
    } finally {
      setIsLoading(false);
    }
  };

  const columns: Column<any>[] = [
    {
      key: 'degree',
      header: 'Degree & University',
      render: (item) => (
        <div>
          <div className="font-bold text-foreground">{item.degree}</div>
          <div className="text-[11px] text-muted-foreground">{item.university} • {item.duration}</div>
        </div>
      ),
    },
    {
      key: 'cgpa',
      header: 'CGPA',
      render: (item) => <span className="font-mono">{item.cgpa}</span>,
    },
    {
      key: 'enabled',
      header: 'Enabled',
      render: (item) => <StatusBadge status={item.enabled} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="h-7 w-7 p-0">
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setDeleteId(item.id)} className="h-7 w-7 p-0">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={items}
        total={total}
        currentPage={page}
        lastPage={lastPage}
        onPageChange={setPage}
        search={search}
        onSearchChange={setSearch}
        onAddNew={() => {
          setEditingItem({ degree: '', university: '', department: 'Computer Science', cgpa: '3.80', duration: '2020 - 2024', enabled: true });
          setIsModalOpen(true);
        }}
        addNewLabel="New Education Record"
        isLoading={fetching}
        onRefresh={refetch}
      />

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-heading font-bold text-foreground">
              {editingItem.id ? 'Edit Education' : 'Create Education'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Degree</label>
                <input
                  type="text"
                  required
                  value={editingItem.degree || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                  className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">University</label>
                <input
                  type="text"
                  required
                  value={editingItem.university || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, university: e.target.value })}
                  className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground">CGPA</label>
                  <input
                    type="text"
                    required
                    value={editingItem.cgpa || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, cgpa: e.target.value })}
                    className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground">Duration</label>
                  <input
                    type="text"
                    required
                    value={editingItem.duration || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                    className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Record'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Record"
        message="Are you sure you want to delete this education record?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isLoading}
      />
    </div>
  );
};
