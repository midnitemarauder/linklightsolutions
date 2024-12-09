import { useRef } from 'react';
import { useLogoEffects } from './useLogoEffects';
import LogoImage from './LogoImage';
import LoadingSpinner from './LoadingSpinner';

export default function Logo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { imageLoaded, isHovered, setImageLoaded, setIsHovered } = useLogoEffects(containerRef);

  return (
    <div 
      ref={containerRef}
      className="flex items-center transition-transform duration-200 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-16 w-48 group">
        {/* Ambient Glow */}
        <div className={`
          absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600
          opacity-75 blur group-hover:opacity-100 transition-opacity duration-500
          animate-borderGradient
        `} />
        
        {/* Inner Border */}
        <div className={`
          absolute -inset-[0.5px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500
          opacity-50 group-hover:opacity-100 transition-opacity duration-500
          animate-borderGradient
        `} />

        {/* Main Container */}
        <div className="relative h-full w-full bg-gray-900/90 backdrop-blur-sm rounded-sm overflow-hidden">
          {/* Dynamic Light Reflection */}
          <div className={`
            absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-white/10 to-purple-500/0
            translate-x-[-100%] group-hover:translate-x-[100%]
            transition-transform duration-1000 ease-in-out
          `} />

          {/* Scanning Line */}
          <div className={`
            absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent
            h-1/2 w-full animate-scan
            ${isHovered ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-300
          `} />

          <LogoImage 
            isLoaded={imageLoaded}
            isHovered={isHovered}
            onLoad={() => setImageLoaded(true)}
          />

          {!imageLoaded && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
}