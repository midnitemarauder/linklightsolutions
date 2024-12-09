import { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useInstallations } from '../../hooks/useInstallations';
import MapComponent from '../Map';
import StatsGrid from './StatsGrid';

export default function Installations() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const { installations, loading, error, isAuthenticated } = useInstallations();

  return (
    <section 
      id="installations" 
      className="py-20 bg-gray-900 scroll-mt-20" 
      ref={sectionRef}
    >
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

        <StatsGrid 
          installations={installations}
          isVisible={isVisible}
        />
      </div>
    </section>
  );
}