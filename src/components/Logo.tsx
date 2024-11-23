import { useState } from 'react';

export default function Logo() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex items-center group">
      <div className="h-16 w-48 relative overflow-hidden">
        {/* Main Logo */}
        <img 
          src="/public/squaredlogowname.webp"
          alt="Link Light Solutions"
          className={`h-full w-full object-contain transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onLoad={() => setImageLoaded(true)}
          style={{ filter: 'brightness(1.2) contrast(1.1)' }}
        />
        
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
        
        {/* Animated border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-gradient"></div>
        
        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}