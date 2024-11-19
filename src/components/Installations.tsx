import { useEffect, useRef, useState } from 'react';
import { MapPin, Wifi } from 'lucide-react';
import MapComponent from './MapComponent';

export default function Installations() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="installations" className="py-20 bg-gray-900" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-8 w-8 text-blue-500 mr-2" />
            <h2 className="text-3xl font-bold text-white">Our Installations</h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our network of successful installations across the country
          </p>
        </div>

        <div className="relative">
          <MapComponent />

          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20">
            <div className="flex items-center space-x-4">
              <Wifi className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-sm text-gray-300">Active Installations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: MapPin, title: "Custom Solutions", desc: "Tailored network installations" },
            { icon: Wifi, title: "Coverage", desc: "Optimized wireless coverage" },
            { icon: MapPin, title: "Support", desc: "24/7 maintenance and support" }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 transition-all duration-300 hover:bg-white/10"
            >
              <item.icon className="h-6 w-6 text-blue-400 mb-2" />
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}