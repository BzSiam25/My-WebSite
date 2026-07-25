import React from 'react';
import {
  FolderGit2,
  Briefcase,
  Cpu,
  History,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAdminProjects, useAdminExperiences, useAdminSkills, useAdminAuditLogs } from '../hooks/useAdminData';

export const DashboardOverview: React.FC = () => {
  const { data: projectsData } = useAdminProjects();
  const { data: experiencesData } = useAdminExperiences();
  const { data: skillsData } = useAdminSkills();
  const { data: auditData } = useAdminAuditLogs();

  const totalProjects = projectsData?.pagination?.total ?? (Array.isArray(projectsData?.data) ? projectsData.data.length : 0);
  const totalExperiences = experiencesData?.pagination?.total ?? (Array.isArray(experiencesData?.data) ? experiencesData.data.length : 0);
  const totalSkills = skillsData?.pagination?.total ?? (Array.isArray(skillsData?.data) ? skillsData.data.length : 0);
  const recentLogs = Array.isArray(auditData?.data) ? auditData.data.slice(0, 5) : [];

  const STAT_CARDS = [
    { title: 'Total Projects', value: totalProjects, icon: FolderGit2, color: 'text-blue-500' },
    { title: 'Experiences', value: totalExperiences, icon: Briefcase, color: 'text-purple-500' },
    { title: 'Technical Skills', value: totalSkills, icon: Cpu, color: 'text-emerald-500' },
    { title: 'System Status', value: 'Healthy', icon: ShieldCheck, color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-card border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-heading font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-card border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-heading font-bold text-foreground flex items-center gap-2">
            <History className="w-4 h-4 text-primary" />
            Recent Admin Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentLogs.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4">No recent activity logged.</p>
          ) : (
            <div className="divide-y divide-border/40">
              {recentLogs.map((log: any) => (
                <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-foreground capitalize">
                      {log.action}
                    </span>{' '}
                    <span className="text-muted-foreground">in module</span>{' '}
                    <span className="font-mono text-primary font-semibold">
                      {log.module}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-[10px]">
                    {log.created_at ? new Date(log.created_at).toLocaleString() : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
