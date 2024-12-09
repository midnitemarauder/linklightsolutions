import { ReactNode, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../lib/utils';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  threshold?: number;
  rootMargin?: string;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 1000,
  threshold = 0.1,
  rootMargin
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold, rootMargin });

  const directionClasses = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: '-translate-x-10',
    right: 'translate-x-10'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0',
        !isVisible && directionClasses[direction],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}