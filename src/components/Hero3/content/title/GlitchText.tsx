import { cn } from '../../../../lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span 
      className={cn(
        "relative block font-bold mb-4 glitch-text",
        "before:content-[attr(data-text)] before:absolute before:left-0 before:top-0",
        "after:content-[attr(data-text)] after:absolute after:left-0 after:top-0",
        className
      )}
      data-text={text}
    >
      {text}
    </span>
  );
}