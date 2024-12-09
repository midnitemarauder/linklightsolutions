import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface BackgroundEffectsProps {
  isVisible: boolean;
}

export default function BackgroundEffects({ isVisible }: BackgroundEffectsProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      glowRef.current.style.background = `
        radial-gradient(
          circle at ${x}% ${y}%,
          rgba(59, 130, 246, 0.15) 0%,
          rgba(147, 51, 234, 0.15) 25%,
          rgba(17, 24, 39, 0.5) 50%
        )
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Base Background */}
      <div className="absolute inset-0 bg-gray-900" />

      {/* Network Map Background */}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat",
          "transition-opacity duration-1000",
          isVisible ? "opacity-30" : "opacity-0"
        )}
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000")',
          filter: 'brightness(0.7) saturate(1.2)',
        }}
      />
      
      {/* Interactive Gradient Overlay */}
      <div 
        ref={glowRef}
        className={cn(
          "absolute inset-0 transition-all duration-300 ease-out mix-blend-overlay",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Animated Light Points */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-background opacity-10" />
    </div>
  );
}