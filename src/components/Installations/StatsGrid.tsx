import { CheckCircle, Clock, Wifi } from 'lucide-react';
import StatCard from './StatCard';
import type { StatsGridProps } from './types';

export default function StatsGrid({ installations, isVisible }: StatsGridProps) {
  const stats = {
    completed: installations.filter(i => i.status === 'completed').length,
    ongoing: installations.filter(i => i.status === 'ongoing').length,
    total: installations.length
  };

  const statCards = [
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
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statCards.map((stat, index) => (
        <StatCard 
          key={stat.title}
          {...stat}
          isVisible={isVisible}
          delay={index * 100}
        />
      ))}
    </div>
  );
}