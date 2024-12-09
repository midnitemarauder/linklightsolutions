import FeatureCard from './FeatureCard';
import { FEATURES } from './constants';

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {FEATURES.map((feature, index) => (
        <FeatureCard 
          key={feature.title} 
          {...feature} 
          delay={index * 100} 
        />
      ))}
    </div>
  );
}