import { Network, Shield, Server } from 'lucide-react';
import type { Feature } from './types';

export const FEATURES: Feature[] = [
  {
    icon: Network,
    title: "Network Design",
    description: "Custom network architecture tailored to your business needs"
  },
  {
    icon: Server,
    title: "Infrastructure",
    description: "Robust and scalable infrastructure solutions"
  },
  {
    icon: Shield,
    title: "Security",
    description: "Advanced security measures to protect your network"
  }
];

export const HERO_TEXT = {
  title: "LINK LIGHT",
  subtitle: "SOLUTIONS",
  description: "Connecting your world through advanced network solutions and cutting-edge infrastructure"
} as const;

export const ANIMATION_CONFIG = {
  NODES_COUNT: 30,
  LINES_COUNT: 15,
  ANIMATION_SPEED: 0.001,
  LINE_LENGTH: {
    MIN: 100,
    MAX: 300
  }
} as const;