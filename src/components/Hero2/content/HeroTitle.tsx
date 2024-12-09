import { cn } from '../../../lib/utils';

interface HeroTitleProps {
  isVisible: boolean;
}

export default function HeroTitle({ isVisible }: HeroTitleProps) {
  return (
    <div className="relative inline-block mb-12 mt-20">
      <h1 className="tracking-tight font-grotesk relative z-[1]">
        <span 
          className="block text-5xl md:text-7xl font-bold text-white mb-4 glitch-text"
          data-text="LINK LIGHT"
        >
          LINK LIGHT
        </span>
        <span 
          className={cn(
            "block text-5xl md:text-7xl font-bold",
            "bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400",
            "bg-clip-text text-transparent",
            "animate-gradient"
          )}
        >
          SOLUTIONS
        </span>
      </h1>
      
      {/* Glow Effects */}
      <div className={cn(
        "absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20",
        "blur-2xl transition-opacity duration-1000 z-0",
        isVisible ? "opacity-50" : "opacity-0"
      )} />
      
      {/* Animated Border */}
      <div className={cn(
        "absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500",
        "opacity-30 blur-sm animate-gradient z-0"
      )} />
    </div>
  );
}