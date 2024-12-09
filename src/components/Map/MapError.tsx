import { MapPin } from 'lucide-react';

interface MapErrorProps {
  message: string;
}

export default function MapError({ message }: MapErrorProps) {
  return (
    <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 text-center">
      <MapPin className="h-12 w-12 text-red-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Map Error</h3>
      <p className="text-gray-400">{message}</p>
    </div>
  );
}