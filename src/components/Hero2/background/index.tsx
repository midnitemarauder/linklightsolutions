import BackgroundBase from './BackgroundBase';
import BackgroundOverlays from './BackgroundOverlays';
import InteractiveGlow from './InteractiveGlow';
import AnimatedLights from './AnimatedLights';
import GridOverlay from './GridOverlay';
import NetworkAnimation from './NetworkAnimation';
import { HeroBackgroundProps } from '../types';

export default function Background({ isVisible }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0">
      <BackgroundBase isVisible={isVisible} />
      <InteractiveGlow />
      <BackgroundOverlays />
      <AnimatedLights />
      <NetworkAnimation />
      <GridOverlay isVisible={isVisible} />
    </div>
  );
}