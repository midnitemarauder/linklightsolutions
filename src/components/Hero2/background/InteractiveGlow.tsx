import { useEffect, useRef } from 'react';

export default function InteractiveGlow() {
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
    <div 
      ref={glowRef}
      className="absolute inset-0 transition-all duration-300 ease-out mix-blend-overlay"
    />
  );
}