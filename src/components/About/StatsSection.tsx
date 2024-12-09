import { STATS } from './constants';
import StatsCard from './StatsCard';
import StatsImage from './StatsImage';

interface StatsSectionProps {
  isVisible: boolean;
}

export default function StatsSection({ isVisible }: StatsSectionProps) {
  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <StatsImage 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
          alt="Network Infrastructure"
        />

        <div className="grid grid-cols-1 gap-8 place-content-center">
          {STATS.map((stat, index) => (
            <StatsCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={index * 200}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
}