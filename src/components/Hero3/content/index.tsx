import { cn } from '../../../lib/utils';
import Title from './Title';
import Description from './Description';
import Actions from './Actions';
import Features from './Features';
import { HeroContentProps } from '../types';

export default function Content({ isVisible }: HeroContentProps) {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={cn(
        "text-center transform transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <Title isVisible={isVisible} />
        <Description />
        <Actions />
        <Features />
      </div>
    </div>
  );
}