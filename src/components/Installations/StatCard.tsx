import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  count: number | string;
  isVisible: boolean;
  delay: number;
}

export default function StatCard({ 
  icon: Icon, 
  title, 
  desc, 
  count,
  isVisible,
  delay 
}: StatCardProps) {
  return (
    <div 
      className={cn(
        "bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10",
        "transition-all duration-500 hover:bg-white/10 transform hover:-translate-y-1",
        "opacity-0 translate-y-4",
        isVisible && "animate-[fade-in-up_0.5s_ease-out_forwards]"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="h-6 w-6 text-blue-400 mb-2" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-2xl font-bold text-blue-400 my-2">{count}</p>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}