import { cn } from '../../../lib/utils';

interface GridOverlayProps {
  isVisible: boolean;
}

export default function GridOverlay({ isVisible }: GridOverlayProps) {
  return (
    <>
      {/* Base Grid */}
      <div className={cn(
        "absolute inset-0 grid-background",
        "transition-opacity duration-1000",
        isVisible ? "opacity-30" : "opacity-0"
      )} />
      
      {/* Animated Grid Lines */}
      <div className={cn(
        "absolute inset-0 overflow-hidden",
        "transition-opacity duration-1000",
        isVisible ? "opacity-30" : "opacity-0"
      )}>
        {/* Vertical Scan Line */}
        <div 
          className="absolute inset-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-grid-scan"
          style={{ 
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
            filter: 'blur(1px)'
          }} 
        />
        
        {/* Horizontal Scan Line */}
        <div 
          className="absolute inset-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-grid-scan"
          style={{ 
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
            filter: 'blur(1px)',
            animationDelay: '2s'
          }} 
        />
      </div>

      {/* Grid Intersection Points */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-pulse"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${15 + Math.random() * 70}%`,
              animationDelay: `${i * 0.7}s`,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
            }}
          />
        ))}
      </div>
    </>
  );
}