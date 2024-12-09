import { SERVICES } from './constants';
import ServiceCard from './ServiceCard';

interface ServicesGridProps {
  isVisible: boolean;
}

export default function ServicesGrid({ isVisible }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {SERVICES.map((service, index) => (
        <ServiceCard
          key={service.title}
          {...service}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
}