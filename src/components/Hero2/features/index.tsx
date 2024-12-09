import { FEATURES } from '../constants';
import FeatureCard from './FeatureCard';

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {FEATURES.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          feature={feature}
          index={index}
        />
      ))}
    </div>
  );
}