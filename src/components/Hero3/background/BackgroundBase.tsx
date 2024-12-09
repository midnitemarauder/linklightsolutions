import { cn } from '../../../lib/utils';

interface BackgroundBaseProps {
  isVisible: boolean;
}

export default function BackgroundBase({ isVisible }: BackgroundBaseProps) {
  return (
    <>
      <div className="absolute inset-0 bg-[#0A0F1E]" />
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat",
          "transition-opacity duration-1000",
          isVisible ? "opacity-20" : "opacity-0"
        )}
        style={{
          backgroundImage: 'url("/background.webp")',
          filter: 'brightness(0.85) saturate(1.2)',
        }}
      />
    </>
  );
}