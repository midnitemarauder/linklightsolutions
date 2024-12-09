import { useEffect, useRef } from 'react';

export default function BackgroundLayers() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      
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
    <>
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#111827]" />

      {/* Network Map Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: 'url("/hero-background.webp")',
          filter: 'brightness(0.7) saturate(1.2)',
        }}
      />
      
      {/* Interactive Gradient Overlay */}
      <div 
        ref={glowRef}
        className="absolute inset-0 transition-all duration-300 ease-out mix-blend-overlay"
      />

      {/* Additional Overlays */}
      <div className="absolute inset-0">
        {/* Blue Network Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-blue-900/20" />
        
        {/* Depth Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70" />
        
        {/* Side Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-gray-900/80" />
      </div>

      {/* Animated Light Points */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-background opacity-10" />
    </>
  );
}