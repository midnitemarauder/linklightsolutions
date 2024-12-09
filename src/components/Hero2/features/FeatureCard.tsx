import { cn } from '../../../lib/utils';
import FeatureIcon from './FeatureIcon';
import FeatureContent from './FeatureContent';
import { FeatureCardProps } from '../types';

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "relative p-8 rounded-xl backdrop-blur-sm",
        "transition-all duration-500 transform hover:-translate-y-2",
        "group cursor-pointer overflow-hidden"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: 'fade-in-up 0.5s ease-out forwards',
        opacity: 0,
        transform: 'translateY(20px)',
        background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), rgba(255,255,255,0.05))',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <FeatureIcon icon={feature.icon} />
        <FeatureContent 
          title={feature.title} 
          description={feature.description} 
        />
      </div>

      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    </div>
  );
}