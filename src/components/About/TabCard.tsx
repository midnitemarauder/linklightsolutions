import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TabCardProps {
  icon: LucideIcon;
  title: string;
  content: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TabCard({ icon: Icon, title, content, isActive, onClick }: TabCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8",
        "transition-all duration-500 hover:bg-white/10 transform hover:-translate-y-1",
        "relative overflow-hidden",
        isActive && "ring-2 ring-blue-500/50"
      )}
    >
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        <Icon className="h-8 w-8 text-blue-400 mb-4 transition-transform duration-300 group-hover:scale-110" />
        <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {content}
        </p>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      )}
    </div>
  );
}