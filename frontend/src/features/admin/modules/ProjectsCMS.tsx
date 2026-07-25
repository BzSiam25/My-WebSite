import React, { useState } from 'react';
import { useAdminProjects } from '../hooks/useAdminData';
import { projectService } from '@/services/projectService';
import { DataTable } from '../components/DataTable';
import type { Column } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ImageUploader } from '../components/ImageUploader';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export const ProjectsCMS: React.FC = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: fetching, refetch } = useAdminProjects({ page, search });

  const projects = data?.data || [];
  const total = data?.pagination?.total || projects.length;
  const lastPage = data?.pagination?.last_page || 1;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingItem.id) {
        await projectService.updateAdmin(editingItem.id, editingItem);
      } else {
        await projectService.createAdmin(editingItem);
      }
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err: any) {
      alert(err.message || 'Error saving project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsLoading(true);
    try {
      await projectService.deleteAdmin(deleteId);
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setDeleteId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePublish = async (id: number) => {
    await projectService.togglePublish(id);
    queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
  };

  const handleToggleFeatured = async (id: number) => {
    await projectService.toggleFeatured(id);
    queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
  };

  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Project Name',
      render: (item) => (
        <div>
          <div className="font-bold text-foreground">{item.name}</div>
          <div className="text-[11px] text-muted-foreground">{item.category} • {item.year}</div>
        </div>
      ),
    },
    {
      key: 'publish_status',
      header: 'Publish Status',
      render: (item) => (
        <div onClick={() => handleTogglePublish(item.id)} className="cursor-pointer">
          <StatusBadge status={item.publish_status} label={item.publish_status} />
        </div>
      ),
    },
    {
      key: 'featured',
      header: 'Featured',
      render: (item) => (
        <ToggleSwitch
          checked={!!item.featured}
          onChange={() => handleToggleFeatured(item.id)}
        />
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
        data={projects}
        total={total}
        currentPage={page}
        lastPage={lastPage}
        onPageChange={setPage}
        search={search}
        onSearchChange={setSearch}
        onAddNew={() => {
          setEditingItem({
            name: '',
            category: 'Web Application',
            year: new Date().getFullYear(),
            description: '',
            full_description: '',
            problem_statement: '',
            solution: '',
            tech_stack: [],
            github_url: '',
            live_url: '',
            research_url: '',
            featured: false,
            publish_status: 'published',
            enabled: true,
          });
          setIsModalOpen(true);
        }}
        addNewLabel="New Project"
        isLoading={fetching}
        onRefresh={refetch}
      />

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card border border-border rounded-2xl shadow-xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-heading font-bold text-foreground">
              {editingItem.id ? 'Edit Project' : 'Create New Project'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground">Project Name</label>
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
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground">GitHub URL</label>
                  <input
                    type="text"
                    value={editingItem.github_url || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, github_url: e.target.value })}
                    className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground">Live Demo URL</label>
                  <input
                    type="text"
                    value={editingItem.live_url || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, live_url: e.target.value })}
                    className="w-full mt-1 p-2 text-xs bg-background border border-border rounded-xl"
                  />
                </div>
              </div>

              <ImageUploader
                value={editingItem.cover_image}
                onChange={(url) => setEditingItem({ ...editingItem, cover_image: url })}
                folder="projects"
                label="Cover Image"
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Project"
        message="Are you sure you want to soft-delete this project? It can be restored later."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isLoading}
      />
    </div>
  );
};
