import type { Installation } from '../../types/installation';

export interface InstallationStat {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  count: number | string;
}

export interface MapComponentProps {
  installations: Installation[];
  error?: string | null;
  isAuthenticated: boolean;
}

export interface StatsGridProps {
  installations: Installation[];
  isVisible: boolean;
}