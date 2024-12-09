import { cn } from '../../lib/utils';
import type { ServiceCardProps } from './types';

export default function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  index,
  isVisible 
}: ServiceCardProps) {
  return (
    <div 
      className={cn(
        "bg-white p-8 rounded-xl shadow-sm hover:shadow-xl",
        "transition-all duration-500 transform hover:-translate-y-2",
        "group relative overflow-hidden",
        "opacity-0 translate-y-4",
        isVisible && "animate-[fade-in-up_0.5s_ease-out_forwards]"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="group-hover:animate-float">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}