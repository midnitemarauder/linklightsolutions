import { Network, Shield, Server } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Network Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("dist/background.webp")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/95"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,0.7),rgba(17,24,39,0.9))]"></div>
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-background"></div>

      {/* Animated Overlay */}
      <div className="absolute inset-0">
        {/* Network Nodes */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="network-node animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.7
            }}
          />
        ))}
        
        {/* Network Lines */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute h-px w-40 bg-gradient-to-r from-blue-400/40 to-purple-400/40 animate-network-flow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block">
            <h1 className="mb-6 tracking-tight font-grotesk">
              <span className="block text-6xl md:text-8xl font-bold text-white cyberpunk-glitch select-none" data-text="LINK LIGHT">
                LINK LIGHT
              </span>
              <span 
                className="block text-6xl md:text-8xl font-bold cyber-gradient select-none"
                data-text="SOLUTIONS"
              >
                SOLUTIONS
              </span>
            </h1>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-2xl animate-pulse"></div>
          </div>

          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto cyberpunk-text">
            Connecting your world through advanced network solutions and cutting-edge infrastructure
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#contact" 
              className="group relative px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient"></div>
              <span className="relative text-white font-medium">
                Get Started
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
              </span>
            </a>
            <a 
              href="#solutions" 
              className="group bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20"
            >
              Learn More
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </a>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
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
          ].map((item, index) => (
            <div 
              key={index} 
              className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <item.icon className="h-8 w-8 text-blue-400 mb-4 group-hover:text-blue-300 transition-colors duration-300" />
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-blue-100">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
