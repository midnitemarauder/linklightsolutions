import { Network, Shield, Server } from 'lucide-react';
import { cn } from '../../../lib/utils';

const FEATURES = [
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

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {FEATURES.map((feature, index) => (
        <div 
          key={feature.title}
          className={cn(
            "relative p-6 rounded-xl bg-white/5 backdrop-blur-sm",
            "hover:bg-white/10 transition-all duration-500",
            "transform hover:-translate-y-2 group cursor-pointer",
            "overflow-hidden border border-white/10 hover-shimmer",
            "opacity-0 translate-y-4",
            "animate-[fade-in-up_0.5s_ease-out_forwards]"
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <feature.icon className="h-8 w-8 text-blue-400 mb-4 transition-transform duration-300 group-hover:scale-110 animate-float" />
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-100 transition-colors duration-300 shimmer-text">
            {feature.title}
          </h3>
          <p className="text-blue-100 group-hover:text-blue-50 transition-colors duration-300">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}