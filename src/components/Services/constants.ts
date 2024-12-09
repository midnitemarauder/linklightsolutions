import { Network, Server, Shield, Cloud, Settings, Users } from 'lucide-react';
import type { Service } from './types';

export const SERVICES: Service[] = [
  {
    icon: Network,
    title: "Network Design & Implementation",
    description: "Custom network solutions designed to meet your specific business requirements."
  },
  {
    icon: Server,
    title: "Infrastructure Management",
    description: "24/7 monitoring and management of your critical network infrastructure."
  },
  {
    icon: Shield,
    title: "Security Solutions",
    description: "Comprehensive security measures to protect your network from threats."
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Seamless integration of cloud services with your existing infrastructure."
  },
  {
    icon: Settings,
    title: "Network Optimization",
    description: "Performance tuning and optimization for maximum efficiency."
  },
  {
    icon: Users,
    title: "Consulting Services",
    description: "Expert guidance on network strategy and technology decisions."
  }
];