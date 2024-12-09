import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import ServicesGrid from './ServicesGrid';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section 
      id="services" 
      className="py-20 bg-gray-50 scroll-mt-20" 
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive network solutions to power your business growth
          </p>
        </div>

        <ServicesGrid isVisible={isVisible} />
      </div>
    </section>
  );
}