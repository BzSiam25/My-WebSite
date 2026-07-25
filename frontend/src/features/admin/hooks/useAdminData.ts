import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { currentFocusService } from '@/services/currentFocusService';
import { experienceService } from '@/services/experienceService';
import { projectService } from '@/services/projectService';
import { skillService } from '@/services/skillService';
import { educationService } from '@/services/educationService';
import { researchService } from '@/services/researchService';
import { certificateService } from '@/services/certificateService';
import { journeyService } from '@/services/journeyService';
import { mediaService } from '@/services/mediaService';
import { auditLogService } from '@/services/auditLogService';
import { backupService } from '@/services/backupService';

export function useAdminQuery(queryKey: string[], fetchFn: () => Promise<any>, options = {}) {
  return useQuery({
    queryKey,
    queryFn: fetchFn,
    ...options,
  });
}

export function useAdminMutation(mutationFn: (data: any) => Promise<any>, invalidateKeys: string[][]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });
}

export function useAdminProjects(params?: any) {
  return useQuery({
    queryKey: ['admin-projects', params],
    queryFn: () => projectService.getAdmin(params),
  });
}

export function useAdminCurrentFocus(params?: any) {
  return useQuery({
    queryKey: ['admin-current-focus', params],
    queryFn: () => currentFocusService.getAdmin(params),
  });
}

export function useAdminExperiences(params?: any) {
  return useQuery({
    queryKey: ['admin-experiences', params],
    queryFn: () => experienceService.getAdmin(params),
  });
}

export function useAdminSkills(params?: any) {
  return useQuery({
    queryKey: ['admin-skills', params],
    queryFn: () => skillService.getAdmin(params),
  });
}

export function useAdminEducation(params?: any) {
  return useQuery({
    queryKey: ['admin-education', params],
    queryFn: () => educationService.getAdmin(params),
  });
}

export function useAdminResearch(params?: any) {
  return useQuery({
    queryKey: ['admin-research', params],
    queryFn: () => researchService.getAdmin(params),
  });
}

export function useAdminCertificates(params?: any) {
  return useQuery({
    queryKey: ['admin-certificates', params],
    queryFn: () => certificateService.getAdmin(params),
  });
}

export function useAdminJourneys(params?: any) {
  return useQuery({
    queryKey: ['admin-journeys', params],
    queryFn: () => journeyService.getAdmin(params),
  });
}

export function useAdminMedia(params?: any) {
  return useQuery({
    queryKey: ['admin-media', params],
    queryFn: () => mediaService.getAdmin(params),
  });
}

export function useAdminAuditLogs(params?: any) {
  return useQuery({
    queryKey: ['admin-audit-logs', params],
    queryFn: () => auditLogService.getAdmin(params),
  });
}

export function useAdminBackups(params?: any) {
  return useQuery({
    queryKey: ['admin-backups', params],
    queryFn: () => backupService.getAdmin(params),
  });
}
