import { useEffect, useState, useCallback, useRef } from 'react';
import { Network, Shield, Server } from 'lucide-react';

const NETWORK_NODES_COUNT = 30;
const NETWORK_LINES_COUNT = 15;

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const animationRef = useRef<number>();

  const createNode = useCallback(() => {
    const x = 10 + Math.random() * 80;
    const y = 10 + Math.random() * 80;
    return { x, y };
  }, []);

  const createLine = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const length = 100 + Math.random() * 200;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    return { x, y, angle, length };
  }, []);

  const updateNetwork = useCallback(() => {
    // Update nodes with subtle movements
    nodesRef.current.forEach((node, i) => {
      if (!node) return;
      const time = Date.now() * 0.001;
      const offset = i * 0.5;
      const x = parseFloat(node.style.left) + Math.sin(time + offset) * 0.1;
      const y = parseFloat(node.style.top) + Math.cos(time + offset) * 0.1;
      node.style.left = `${x}%`;
      node.style.top = `${y}%`;
    });

    // Update lines with flowing effect
    linesRef.current.forEach((line, i) => {
      if (!line) return;
      const time = Date.now() * 0.001;
      const offset = i * 0.3;
      const progress = ((time + offset) % 3) / 3;
      line.style.opacity = Math.sin(progress * Math.PI).toString();
    });

    animationRef.current = requestAnimationFrame(updateNetwork);
  }, []);

  useEffect(() => {
    setIsVisible(true);

    // Initialize nodes
    const nodes = Array.from({ length: NETWORK_NODES_COUNT }, createNode);
    nodesRef.current = nodes.map((pos, i) => {
      const div = document.createElement('div');
      div.className = 'network-node';
      div.style.left = `${pos.x}%`;
      div.style.top = `${pos.y}%`;
      div.style.animationDelay = `${i * 0.1}s`;
      containerRef.current?.appendChild(div);
      return div;
    });

    // Initialize lines
    const lines = Array.from({ length: NETWORK_LINES_COUNT }, createLine);
    linesRef.current = lines.map((line, i) => {
      const div = document.createElement('div');
      div.className = 'network-line';
      div.style.left = `${line.x}%`;
      div.style.top = `${line.y}%`;
      div.style.width = `${line.length}px`;
      div.style.transform = `rotate(${line.angle}rad)`;
      div.style.animationDelay = `${i * 0.2}s`;
      containerRef.current?.appendChild(div);
      return div;
    });

    // Start animation
    updateNetwork();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      nodesRef.current.forEach(node => node?.remove());
      linesRef.current.forEach(line => line?.remove());
    };
  }, [createNode, createLine, updateNetwork]);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/hero-background.webp")',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,0.85),rgba(17,24,39,0.95))]"></div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-30"></div>

      {/* Network Animation Container */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block">
            <h1 className="mb-6 tracking-tight font-grotesk">
              <span className="block text-6xl md:text-8xl font-bold text-white cyberpunk-glitch" data-text="LINK LIGHT">
                LINK LIGHT
              </span>
              <span className="block text-6xl md:text-8xl font-bold cyber-gradient" data-text="SOLUTIONS">
                SOLUTIONS
              </span>
            </h1>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-2xl animate-pulse"></div>
          </div>

          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
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