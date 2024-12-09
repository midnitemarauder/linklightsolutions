import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "relative p-6 rounded-xl bg-white/5 backdrop-blur-sm",
        "hover:bg-white/10 transition-all duration-500",
        "transform hover:-translate-y-2 group cursor-pointer",
        "overflow-hidden border border-white/10",
        "opacity-0 translate-y-4",
        "animate-[fade-in-up_0.5s_ease-out_forwards]"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Icon className="h-8 w-8 text-blue-400 mb-4 group-hover:text-blue-300 transition-colors duration-300 animate-float" />
      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-100 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-blue-100 group-hover:text-blue-50 transition-colors duration-300">
        {description}
      </p>
    </div>
  );
}