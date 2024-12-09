import { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import MapView from './MapView';
import MapError from './MapError';
import AuthPrompt from './AuthPrompt';
import LoadingState from '../shared/LoadingState';
import type { Installation } from '../../types/installation';

interface MapComponentProps {
  installations: Installation[];
  error?: string | null;
  isAuthenticated: boolean;
}

export default function MapComponent({ 
  installations, 
  error,
  isAuthenticated 
}: MapComponentProps) {
  const [selectedMarker, setSelectedMarker] = useState<Installation | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

  if (!isAuthenticated) {
    return <AuthPrompt />;
  }

  if (loadError || !apiKey) {
    return <MapError message="Unable to load Google Maps" />;
  }

  if (!isLoaded) {
    return <LoadingState message="Loading map..." className="h-[600px]" />;
  }

  if (error) {
    return <MapError message={error} />;
  }

  return (
    <MapView
      installations={installations}
      selectedMarker={selectedMarker}
      onMarkerSelect={setSelectedMarker}
    />
  );
}