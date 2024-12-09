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
] as const;