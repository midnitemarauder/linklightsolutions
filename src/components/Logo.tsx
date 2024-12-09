import { useState, useEffect, useRef } from 'react';

export default function Logo() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      containerRef.current.style.transform = 
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = 
        'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    const element = containerRef.current;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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

          {/* Logo Image */}
          <img 
            src="/fotor_1707459877625.jpg"
            alt="Link Light Solutions"
            className={`
              h-full w-full object-contain
              transition-all duration-700 ease-out
              ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              ${isHovered ? 'brightness-125 saturate-150' : 'brightness-100 saturate-100'}
            `}
            style={{ 
              filter: `contrast(1.2) ${isHovered ? 'hue-rotate(15deg)' : 'hue-rotate(0deg)'}`,
              transformStyle: 'preserve-3d'
            }}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Loading State */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
                <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin-reverse" />
                <div className="absolute inset-2 w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin-slow" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}