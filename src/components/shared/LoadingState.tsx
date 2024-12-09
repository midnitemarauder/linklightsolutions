import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingStateProps {
  className?: string;
  message?: string;
}

export default function LoadingState({ className, message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8",
      "bg-white/5 backdrop-blur-sm rounded-xl border border-white/10",
      className
    )}>
      <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
      <p className="text-blue-100">{message}</p>
    </div>
  );
}