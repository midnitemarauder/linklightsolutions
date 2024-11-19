import { useState } from 'react';

export default function Logo() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex items-center group">
      <div className="h-16 w-auto relative overflow-hidden">
        <img 
          src="/dsit/squaredlogowname.webp"
          alt="Link Light Solutions"
          className={`h-full w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 mix-blend-overlay"></div>
        
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-blue-400/10 group-hover:bg-blue-400/20 blur-xl transition-all duration-300"></div>
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
