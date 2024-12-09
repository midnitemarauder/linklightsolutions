import { Network, Shield, Server } from 'lucide-react';

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

export default function HeroFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {FEATURES.map((feature, index) => (
        <div 
          key={feature.title}
          className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
        >
          <feature.icon className="h-8 w-8 text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
          <p className="text-blue-100">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}