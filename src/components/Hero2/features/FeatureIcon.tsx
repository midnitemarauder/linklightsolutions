import { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface FeatureIconProps {
  icon: LucideIcon;
}

export default function FeatureIcon({ icon: Icon }: FeatureIconProps) {
  return (
    <Icon className={cn(
      "h-10 w-10 text-blue-400 mb-6",
      "transition-transform duration-300",
      "group-hover:scale-110 animate-float"
    )} />
  );
}