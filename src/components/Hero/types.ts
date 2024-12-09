import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface HeroContentProps {
  isVisible: boolean;
  children: React.ReactNode;
}

export interface HeroTitleProps {
  isVisible: boolean;
  mainText: string;
  subText: string;
}

export interface HeroDescriptionProps {
  text: string;
}

export interface HeroActionsProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export interface NetworkAnimationProps {
  nodeCount?: number;
  lineCount?: number;
  animationSpeed?: number;
}

export interface Node {
  x: number;
  y: number;
  element: HTMLDivElement;
}

export interface Line {
  x: number;
  y: number;
  angle: number;
  length: number;
  element: HTMLDivElement;
}