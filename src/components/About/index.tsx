import { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import AboutHeader from './AboutHeader';
import StatsSection from './StatsSection';
import TabSection from './TabSection';
import Mission from './Mission';
import CompanyValues from './CompanyValues';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section id="about" className="py-24 bg-gray-900 relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 grid-background opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900/50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <AboutHeader isVisible={isVisible} />
          <StatsSection isVisible={isVisible} />
          <TabSection />
          <Mission />
          <CompanyValues />
        </div>
      </div>
    </section>
  );
}