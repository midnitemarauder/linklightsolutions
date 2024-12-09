import { useState, useEffect, RefObject } from 'react';
import { logoAnimations } from './animations';

export function useLogoEffects(containerRef: RefObject<HTMLDivElement>) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setImageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      containerRef.current.style.transform = logoAnimations.tilt(
        x, y, rect.width / 2, rect.height / 2
      );
    };

    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = logoAnimations.reset();
    };

    const element = containerRef.current;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return {
    imageLoaded,
    isHovered,
    setImageLoaded,
    setIsHovered
  };
}