import { useRef } from 'react';
import { useNetworkAnimation } from './useNetworkAnimation';

export default function NetworkAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  useNetworkAnimation(containerRef);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden opacity-70"
      aria-hidden="true"
    />
  );
}