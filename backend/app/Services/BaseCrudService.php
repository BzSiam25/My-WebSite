<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

abstract class BaseCrudService
{
    protected string $modelClass;
    protected string $moduleName;

    public function getPaginated(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        /** @var \Illuminate\Database\Eloquent\Builder $query */
        $query = ($this->modelClass)::query();

        if (!empty($filters['trashed'])) {
            $query->onlyTrashed();
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $this->applySearch($query, $search);
        }

        if (isset($filters['enabled'])) {
            $query->where('enabled', (bool) $filters['enabled']);
        }

        if (isset($filters['published'])) {
            $query->where('publish_status', $filters['published']);
        }

        if (isset($filters['featured'])) {
            $query->where('featured', (bool) $filters['featured']);
        }

        if (isset($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        $sortColumn = $filters['sort_by'] ?? ($this->hasColumn('sort_order') ? 'sort_order' : ($this->hasColumn('display_order') ? 'display_order' : 'id'));
        $sortOrder = $filters['sort_order'] ?? ($sortColumn === 'id' ? 'desc' : 'asc');

        return $query->orderBy($sortColumn, $sortOrder)->paginate($perPage);
    }

    public function create(array $data): Model
    {
        if ($this->hasColumn('slug') && empty($data['slug']) && !empty($data['name'] ?? $data['title'] ?? null)) {
            $title = $data['name'] ?? $data['title'];
            $data['slug'] = Str::slug($title);
        }

        /** @var Model $model */
        $model = ($this->modelClass)::create($data);

        AuditLogger::log('created', $this->moduleName, $model->id, null, $model->toArray());

        $this->clearCache();

        return $model;
    }

    public function findById(int $id, bool $withTrashed = true): Model
    {
        $query = ($this->modelClass)::query();
        if ($withTrashed && in_array('Illuminate\Database\Eloquent\SoftDeletes', class_uses_recursive($this->modelClass))) {
            $query->withTrashed();
        }

        return $query->findOrFail($id);
    }

    public function update(int $id, array $data): Model
    {
        $model = $this->findById($id);
        $old = $model->toArray();

        if ($this->hasColumn('slug') && empty($data['slug']) && !empty($data['name'] ?? $data['title'] ?? null)) {
            $title = $data['name'] ?? $data['title'];
            $data['slug'] = Str::slug($title);
        }

        $model->update($data);

        AuditLogger::log('updated', $this->moduleName, $model->id, $old, $model->toArray());

        $this->clearCache();

        return $model;
    }

    public function delete(int $id): bool
    {
        $model = $this->findById($id, false);
        $old = $model->toArray();

        $result = $model->delete();

        AuditLogger::log('deleted', $this->moduleName, $id, $old, null);

        $this->clearCache();

        return $result;
    }

    public function restore(int $id): Model
    {
        $model = ($this->modelClass)::onlyTrashed()->findOrFail($id);
        $model->restore();

        AuditLogger::log('restored', $this->moduleName, $id, null, $model->toArray());

        $this->clearCache();

        return $model;
    }

    public function toggleField(int $id, string $field): Model
    {
        $model = $this->findById($id);
        $old = $model->toArray();

        if ($field === 'publish_status') {
            $model->publish_status = ($model->publish_status === 'published') ? 'draft' : 'published';
        } else {
            $model->{$field} = !$model->{$field};
        }

        $model->save();

        AuditLogger::log("toggled_{$field}", $this->moduleName, $id, $old, $model->toArray());

        $this->clearCache();

        return $model;
    }

    public function reorder(array $ids): void
    {
        $orderColumn = $this->hasColumn('sort_order') ? 'sort_order' : 'display_order';

        foreach ($ids as $order => $id) {
            ($this->modelClass)::where('id', $id)->update([$orderColumn => $order + 1]);
        }

        AuditLogger::log('reordered', $this->moduleName, null, null, ['ids' => $ids]);

        $this->clearCache();
    }

    protected function applySearch($query, string $search): void
    {
        $columns = ['name', 'title', 'company', 'university', 'authors', 'description'];
        $query->where(function ($q) use ($search, $columns) {
            foreach ($columns as $col) {
                if ($this->hasColumn($col)) {
                    $q->orWhere($col, 'like', "%{$search}%");
                }
            }
        });
    }

    protected function hasColumn(string $column): bool
    {
        $model = new ($this->modelClass);
        return \Illuminate\Support\Facades\Schema::hasColumn($model->getTable(), $column);
    }

    protected function clearCache(): void
    {
        // Subclasses override if specific cache keys need invalidation
    }
}
