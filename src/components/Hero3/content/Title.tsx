import { cn } from '../../../lib/utils';

interface TitleProps {
  isVisible: boolean;
}

export default function Title({ isVisible }: TitleProps) {
  return (
    <div className="relative inline-block mb-12">
      <h1 className="tracking-tight font-grotesk relative z-[1]">
        <span 
          className="block text-5xl md:text-[4.2rem] font-bold mb-4 title-text"
          data-text="LINK LIGHT"
        >
          LINK LIGHT
        </span>
        <span 
          className="block text-5xl md:text-[4.2rem] font-bold shimmer-text"
        >
          SOLUTIONS
        </span>
      </h1>
    </div>
  );
}