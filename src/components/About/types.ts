import { LucideIcon } from 'lucide-react';

export interface Tab {
  icon: LucideIcon;
  title: string;
  content: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface MissionPoint {
  text: string;
  id: string;
}

export interface CompanyValue {
  icon: LucideIcon;
  title: string;
  description: string;
}