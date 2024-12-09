import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface NetworkTechniciansImageProps {
  className?: string;
}

export default function NetworkTechniciansImage({ className }: NetworkTechniciansImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/networktechnicians.png';
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className={cn(
      'relative rounded-xl overflow-hidden group h-[400px]',
      'transform transition-transform duration-500',
      'hover:shadow-xl hover:shadow-blue-500/20',
      className
    )}>
      {/* Main Image */}
      <img
        src="/networktechnicians.png"
        alt="Network Technicians at Work"
        className={cn(
          'w-full h-full object-cover rounded-xl',
          'transform transition-all duration-700',
          'group-hover:scale-105',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
      />
      
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
      
      {/* Interactive Overlay */}
      <div className={cn(
        'absolute inset-0',
        'bg-gradient-to-r from-blue-500/20 to-purple-500/20',
        'opacity-0 group-hover:opacity-100',
        'transition-opacity duration-500'
      )} />
      
      {/* Scanning Line Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          'absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-transparent',
          'h-1/2 w-full',
          'animate-scan'
        )} />
      </div>
      
      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
        <div className="space-y-2">
          <h4 className="text-xl font-semibold text-white">
            Expert Network Infrastructure
          </h4>
          <p className="text-blue-200/90 text-sm">
            Our team of certified professionals ensures reliable and secure network solutions
          </p>
        </div>
      </div>
    </div>
  );
}