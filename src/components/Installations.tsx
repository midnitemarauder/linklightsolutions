import { useEffect, useRef, useState } from 'react';
import { MapPin, Wifi, CheckCircle, Clock } from 'lucide-react';
import MapComponent from './Map';
import { useInstallations } from '../hooks/useInstallations';

export default function Installations() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { installations, loading, error, isAuthenticated } = useInstallations();

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

  const stats = {
    completed: installations.filter(i => i.status === 'completed').length,
    ongoing: installations.filter(i => i.status === 'ongoing').length,
    total: installations.length
  };

  return (
    <section id="installations" className="py-20 bg-gray-900" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-8 w-8 text-blue-500 mr-2" />
            <h2 className="text-3xl font-bold text-white">Our Installations</h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Serving hospitality networks across the Americas and beyond with excellence
          </p>
        </div>

        <div className="mb-12">
          <MapComponent 
            installations={installations}
            error={error}
            isAuthenticated={isAuthenticated}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              icon: CheckCircle, 
              title: "Completed Projects", 
              desc: "Successfully deployed solutions",
              count: stats.completed
            },
            { 
              icon: Clock, 
              title: "Ongoing Projects", 
              desc: "Current installations in progress",
              count: stats.ongoing
            },
            { 
              icon: Wifi, 
              title: "Total Installations", 
              desc: "Network solutions deployed",
              count: `${stats.total}+`
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 transition-all duration-300 hover:bg-white/10"
            >
              <item.icon className="h-6 w-6 text-blue-400 mb-2" />
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-2xl font-bold text-blue-400 my-2">{item.count}</p>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}