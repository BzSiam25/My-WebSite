import React from 'react';
import { Search, Plus, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from './EmptyState';
import { Pagination } from './Pagination';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  total?: number;
  currentPage?: number;
  lastPage?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
  search?: string;
  onSearchChange?: (search: string) => void;
  onAddNew?: () => void;
  addNewLabel?: string;
  isLoading?: boolean;
  selectedIds?: number[];
  onSelectAll?: (checked: boolean) => void;
  onSelectItem?: (id: number, checked: boolean) => void;
  onBulkDelete?: () => void;
  onRefresh?: () => void;
}

export function DataTable<T extends { id: number }>({
  columns,
  data,
  total = 0,
  currentPage = 1,
  lastPage = 1,
  perPage = 15,
  onPageChange,
  search,
  onSearchChange,
  onAddNew,
  addNewLabel = 'Add New',
  isLoading = false,
  selectedIds = [],
  onSelectAll,
  onSelectItem,
  onBulkDelete,
  onRefresh,
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;

  return (
    <div className="space-y-4">
      {/* Table Actions Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onSearchChange !== undefined && (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                aria-label="Search records"
                placeholder="Search..."
                value={search || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-card border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              aria-label="Refresh data table"
              className="h-8 w-8 p-0"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {selectedIds.length > 0 && onBulkDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onBulkDelete}
              aria-label={`Delete ${selectedIds.length} selected items`}
              className="rounded-full gap-1.5 text-xs h-8"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete ({selectedIds.length})</span>
            </Button>
          )}

          {onAddNew && (
            <Button onClick={onAddNew} size="sm" aria-label={addNewLabel} className="rounded-full gap-1.5 text-xs h-8">
              <Plus className="w-3.5 h-3.5" />
              <span>{addNewLabel}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-border/60 rounded-2xl bg-card overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Loading data...
          </div>
        ) : data.length === 0 ? (
          <EmptyState onAction={onAddNew} actionLabel={addNewLabel} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-muted/30 text-muted-foreground uppercase tracking-wider font-semibold">
                  {onSelectAll && (
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        aria-label="Select all rows"
                        checked={allSelected}
                        onChange={(e) => onSelectAll(e.target.checked)}
                        className="rounded border-border"
                      />
                    </th>
                  )}
                  {columns.map((col) => (
                    <th key={col.key} className="p-3">
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {data.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-muted/20 transition-colors ${
                        isSelected ? 'bg-primary/5' : ''
                      }`}
                    >
                      {onSelectItem && (
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            aria-label={`Select row ${item.id}`}
                            checked={isSelected}
                            onChange={(e) => onSelectItem(item.id, e.target.checked)}
                            className="rounded border-border"
                          />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td key={col.key} className="p-3 text-foreground font-medium">
                          {col.render ? col.render(item) : (item as any)[col.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {onPageChange && (
          <div className="p-3 bg-muted/10 border-t border-border/40">
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              total={total}
              perPage={perPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
