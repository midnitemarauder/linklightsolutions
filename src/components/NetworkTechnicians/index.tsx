import { useEffect, useRef, useState } from 'react';
import { Users } from 'lucide-react';
import { TECHNICIANS } from './constants';
import TechnicianCard from './TechnicianCard';
import type { NetworkTechniciansProps } from './types';

export default function NetworkTechnicians({ 
  title = "Our Network Experts",
  subtitle = "Meet our team of certified network professionals"
}: NetworkTechniciansProps) {
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
    <section 
      ref={sectionRef}
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-background opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-blue-500 mr-2" />
            <h2 className="text-3xl font-bold text-white">{title}</h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECHNICIANS.map((technician, index) => (
            <div
              key={technician.id}
              className={`transform transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <TechnicianCard technician={technician} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}