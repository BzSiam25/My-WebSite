<?php

namespace App\Services;

use App\Models\Backup;
use Illuminate\Pagination\LengthAwarePaginator;

class BackupService
{
    public function getPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Backup::orderBy('id', 'desc')->paginate($perPage);
    }

    public function createDatabaseDump(): Backup
    {
        $database = config('database.connections.mysql.database');
        $username = config('database.connections.mysql.username');
        $password = config('database.connections.mysql.password');
        $host = config('database.connections.mysql.host', '127.0.0.1');
        $port = config('database.connections.mysql.port', '3306');

        $filename = 'backup_' . date('Y-m-d_H-i-s') . '.sql';
        $relativePath = "backups/{$filename}";
        $fullPath = storage_path("app/public/{$relativePath}");

        if (!file_exists(dirname($fullPath))) {
            mkdir(dirname($fullPath), 0755, true);
        }

        $backupRecord = Backup::create([
            'filename' => $filename,
            'path' => $relativePath,
            'type' => 'database',
            'status' => 'in_progress',
            'notes' => 'Database SQL Export',
        ]);

        $mysqldump = 'mysqldump';
        if (file_exists('H:\wamp64\bin\mysql\mysql8.4.7\bin\mysqldump.exe')) {
            $mysqldump = 'H:\wamp64\bin\mysql\mysql8.4.7\bin\mysqldump.exe';
        }

        $pwdCmd = $password ? "-p\"{$password}\"" : '';
        $cmd = "\"{$mysqldump}\" --host={$host} --port={$port} --user={$username} {$pwdCmd} {$database} > \"{$fullPath}\"";

        exec($cmd, $output, $returnVar);

        if (file_exists($fullPath) && filesize($fullPath) > 0) {
            $backupRecord->update([
                'status' => 'completed',
                'size_bytes' => filesize($fullPath),
            ]);

            AuditLogger::log('created_backup', 'backups', $backupRecord->id, null, $backupRecord->toArray());

            return $backupRecord;
        }

        $backupRecord->update(['status' => 'failed', 'notes' => 'Empty export file']);
        throw new \RuntimeException('Database dump failed');
    }

    public function delete(int $id): bool
    {
        $backup = Backup::findOrFail($id);
        $fullPath = storage_path("app/public/{$backup->path}");

        if (file_exists($fullPath)) {
            @unlink($fullPath);
        }

        $result = $backup->delete();

        AuditLogger::log('deleted_backup', 'backups', $id, null, null);

        return $result;
    }
}
