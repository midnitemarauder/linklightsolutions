import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface HeroBackgroundProps {
  isVisible: boolean;
}

export interface HeroContentProps {
  isVisible: boolean;
}

export interface FeatureCardProps {
  feature: Feature;
  index: number;
}