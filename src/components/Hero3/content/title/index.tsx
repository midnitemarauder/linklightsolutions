import { cn } from '../../../../lib/utils';
import GlitchText from './GlitchText';
import ShimmerText from './ShimmerText';

interface TitleProps {
  isVisible: boolean;
}

export default function Title({ isVisible }: TitleProps) {
  return (
    <div className="relative inline-block mb-12">
      <h1 className="tracking-tight font-grotesk relative z-[1]">
        <GlitchText 
          text="LINK LIGHT"
          className="text-5xl md:text-[4.2rem]"
        />
        <ShimmerText 
          text="SOLUTIONS"
          className="text-5xl md:text-[4.2rem]"
        />
      </h1>
    </div>
  );
}