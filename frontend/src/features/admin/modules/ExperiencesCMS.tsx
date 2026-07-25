import React, { useState } from 'react';
import { useAdminExperiences } from '../hooks/useAdminData';
import { experienceService } from '@/services/experienceService';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const ExperiencesCMS: React.FC = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: fetching, refetch } = useAdminExperiences({ page, search });

  const items = data?.data || [];
  const total = data?.pagination?.total || items.length;
  const lastPage = data?.pagination?.last_page || 1;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingItem.id) {
        await experienceService.updateAdmin(editingItem.id, editingItem);
      } else {
        await experienceService.createAdmin(editingItem);
      }
      queryClient.invalidateQueries({ queryKey: ['admin-experiences'] });
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err: any) {
      alert(err.message || 'Error saving experience');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsLoading(true);
    try {
      await experienceService.deleteAdmin(deleteId);
      queryClient.invalidateQueries({ queryKey: ['admin-experiences'] });
      setDeleteId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting experience');
    } finally {
      setIsLoading(false);
    }
  };

  const columns: Column<any>[] = [
    {
      key: 'role',
      header: 'Role & Company',
      render: (item) => (
        <div>
          <div className="font-bold text-foreground">{item.role}</div>
          <div className="text-[11px] text-muted-foreground">{item.company} • {item.start_date}</div>
        </div>
      ),
    },
    {
      key: 'current_position',
      header: 'Current',
      render: (item) => <StatusBadge status={item.current_position} label={item.current_position ? 'Current' : 'Past'} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEditingItem(item);
              setIsModalOpen(true);
            }}
            className="h-7 w-7 p-0"
          >
            <Edit2 className="w-3.5 h-3.5" />
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
          setEditingItem({ company: '', role: '', start_date: new Date().toISOString().substring(0, 10), current_position: true, description: '' });
          setIsModalOpen(true);
        }}
        addNewLabel="New Experience"
        isLoading={fetching}
        onRefresh={refetch}
      />

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-heading font-bold text-foreground">
              {editingItem.id ? 'Edit Experience' : 'Create Experience'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Role</label>
                <input
                  type="text"
                  required
                  value={editingItem.role || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                  className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Company</label>
                <input
                  type="text"
                  required
                  value={editingItem.company || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                  className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Description</label>
                <textarea
                  required
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Experience'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Experience"
        message="Are you sure you want to delete this experience record?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isLoading}
      />
    </div>
  );
};
