import { HeroBackgroundProps } from '../types';
import BackgroundBase from './BackgroundBase';
import BackgroundOverlays from './BackgroundOverlays';
import GridAnimation from './GridAnimation';
import NetworkLines from './NetworkLines';

export default function Background({ isVisible }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0">
      {/* Base Background Layer */}
      <div className="absolute inset-0 z-[1]">
        <BackgroundBase isVisible={isVisible} />
      </div>
      
      {/* Network Lines Layer */}
      <div className="absolute inset-0 z-[2] mix-blend-screen">
        <NetworkLines isVisible={isVisible} />
      </div>
      
      {/* Grid Layer */}
      <div className="absolute inset-0 z-[3] mix-blend-overlay">
        <GridAnimation isVisible={isVisible} />
      </div>
      
      {/* Overlays Layer */}
      <div className="absolute inset-0 z-[4]">
        <BackgroundOverlays />
      </div>
    </div>
  );
}