import { getCityFromAddress } from './utils';
import type { Installation } from '../../types/installation';

interface MarkerInfoContentProps {
  installation: Installation;
}

export default function MarkerInfoContent({ installation }: MarkerInfoContentProps) {
  return (
    <div className="p-4 max-w-sm font-grotesk bg-gray-900 text-white rounded-lg border border-blue-500/20">
      <h3 className="text-lg font-semibold mb-2">
        {getCityFromAddress(installation.address)}
      </h3>
      <div className="space-y-2 text-sm">
        <p className="text-gray-400">
          Region: {installation.address.split(',')[1]?.trim() || 'N/A'}
        </p>
        <p className="text-gray-400">
          Project Type: {installation.projectType}
        </p>
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          installation.status === 'completed' 
            ? 'bg-blue-500/20 text-blue-300'
            : 'bg-amber-500/20 text-amber-300'
        }`}>
          {installation.status.charAt(0).toUpperCase() + installation.status.slice(1)}
        </div>
      </div>
    </div>
  );
}