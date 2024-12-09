import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  onClick,
  className 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "group relative px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5",
        variant === 'primary' && [
          "relative",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-blue-500 before:animate-gradient",
          "hover:shadow-lg hover:shadow-blue-500/25"
        ],
        variant === 'secondary' && [
          "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20"
        ],
        className
      )}
    >
      <span className="relative text-white font-medium flex items-center justify-center">
        {children}
        <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">
          →
        </span>
      </span>
    </button>
  );
}