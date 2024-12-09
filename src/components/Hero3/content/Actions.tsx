import { scrollToSection } from '../../../lib/scroll';
import { cn } from '../../../lib/utils';

export default function Actions() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      <button 
        onClick={() => scrollToSection('contact')}
        className={cn(
          "group relative px-8 py-3 rounded-lg overflow-hidden",
          "transition-all duration-300 transform hover:-translate-y-0.5",
          "hover:shadow-lg hover:shadow-blue-500/25",
          "shimmer-border"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient" />
        <span className="relative text-white font-medium flex items-center">
          Get Started
          <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
        </span>
      </button>
      
      <button 
        onClick={() => scrollToSection('services')}
        className={cn(
          "px-8 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white",
          "hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-0.5",
          "border border-white/20 hover:border-white/40",
          "hover-shimmer"
        )}
      >
        <span className="font-medium flex items-center">
          Learn More
          <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
        </span>
      </button>
    </div>
  );
}