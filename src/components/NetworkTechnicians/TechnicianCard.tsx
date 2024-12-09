import { Badge } from 'lucide-react';
import type { TechnicianCardProps } from './types';

export default function TechnicianCard({ technician }: TechnicianCardProps) {
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6">
        <div className="mb-4 relative">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-500">
            <img
              src={technician.image}
              alt={technician.name}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-blue-500/20 p-2 rounded-full group-hover:bg-blue-500/30 transition-colors duration-500">
            <Badge className="w-4 h-4 text-blue-300" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-1">{technician.name}</h3>
          <p className="text-blue-300 text-sm mb-3">{technician.role}</p>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {technician.certifications.map((cert, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}