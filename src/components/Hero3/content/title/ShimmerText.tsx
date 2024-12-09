import { cn } from '../../../../lib/utils';

interface ShimmerTextProps {
  text: string;
  className?: string;
}

export default function ShimmerText({ text, className }: ShimmerTextProps) {
  return (
    <span 
      className={cn(
        "block font-bold shimmer-text",
        className
      )}
    >
      {text}
    </span>
  );
}