import React, { useState } from 'react';
import { useAdminSkills } from '../hooks/useAdminData';
import { skillService } from '@/services/skillService';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const SkillsCMS: React.FC = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: fetching, refetch } = useAdminSkills({ page, search });

  const items = data?.data || [];
  const total = data?.pagination?.total || items.length;
  const lastPage = data?.pagination?.last_page || 1;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingItem.id) {
        await skillService.updateAdmin(editingItem.id, editingItem);
      } else {
        await skillService.createAdmin(editingItem);
      }
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err: any) {
      alert(err.message || 'Error saving skill');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsLoading(true);
    try {
      await skillService.deleteAdmin(deleteId);
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
      setDeleteId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting skill');
    } finally {
      setIsLoading(false);
    }
  };

  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Skill Name',
      render: (item) => (
        <div className="font-bold text-foreground">{item.name}</div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (item) => (
        <span className="px-2 py-0.5 rounded-full text-xs bg-muted border border-border">{item.category}</span>
      ),
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
          setEditingItem({ name: '', category: 'Frontend', enabled: true });
          setIsModalOpen(true);
        }}
        addNewLabel="New Skill"
        isLoading={fetching}
        onRefresh={refetch}
      />

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-heading font-bold text-foreground">
              {editingItem.id ? 'Edit Skill' : 'Create Skill'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Category</label>
                <input
                  type="text"
                  required
                  value={editingItem.category || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Skill'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Skill"
        message="Are you sure you want to delete this skill?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isLoading}
      />
    </div>
  );
};
