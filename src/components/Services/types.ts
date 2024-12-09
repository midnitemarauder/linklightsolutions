import { LucideIcon } from 'lucide-react';

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}