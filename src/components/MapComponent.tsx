import { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import type { Installation } from '../types/installation';

interface MapComponentProps {
  installations: Installation[];
}

const mapContainerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.75rem'
};

const center = {
  lat: 39.8283,
  lng: -98.5795
};

const mapOptions = {
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }]
    },
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#242f3e" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }]
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }]
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#3B82F6", weight: 1 }]
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [{ color: "#3B82F6" }]
    }
  ],
  disableDefaultUI: true,
  zoomControl: true,
  minZoom: 3,
  maxZoom: 12,
  backgroundColor: '#242f3e',
  restriction: {
    latLngBounds: {
      north: 85,
      south: -85,
      west: -180,
      east: 180
    }
  }
};

const createMarkerIcon = (status: 'completed' | 'ongoing', index: number) => ({
  path: "M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0",
  fillColor: status === 'completed' ? '#3B82F6' : '#F59E0B',
  fillOpacity: 0.9,
  strokeWeight: 2,
  strokeColor: '#ffffff',
  scale: 1,
  animation: window.google?.maps.Animation.NONE,
  className: 'map-marker',
  style: {
    animation: `marker-flicker 1.5s ease-in-out ${index * 0.1}s infinite, marker-glow 2s ease-in-out ${index * 0.2}s infinite`
  }
});

const getCityFromAddress = (address: string) => {
  const parts = address.split(',');
  return parts[0].trim();
};

export default function MapComponent({ installations }: MapComponentProps) {
  const [selectedMarker, setSelectedMarker] = useState<Installation | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

  const onMarkerClick = useCallback((installation: Installation) => {
    setSelectedMarker(installation);
  }, []);

  const markers = useMemo(() => 
    installations.map((installation, index) => ({
      ...installation,
      icon: createMarkerIcon(installation.status, index)
    })),
    [installations]
  );

  if (loadError || !apiKey) {
    return (
      <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 text-center">
        <MapPin className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Map Error</h3>
        <p className="text-gray-400">Unable to load Google Maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 text-center">
        <div className="h-12 w-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4}
        center={center}
        options={mapOptions}
      >
        {markers.map((installation) => (
          <Marker
            key={installation.id}
            position={{ lat: installation.lat, lng: installation.lng }}
            onClick={() => onMarkerClick(installation)}
            icon={installation.icon}
            label={{
              text: getCityFromAddress(installation.address),
              className: 'marker-label',
              color: '#ffffff',
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-4 max-w-sm font-grotesk bg-gray-900 text-white rounded-lg border border-blue-500/20">
              <h3 className="text-lg font-semibold mb-2">{getCityFromAddress(selectedMarker.address)}</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">Region: {selectedMarker.address.split(',')[1]?.trim() || 'N/A'}</p>
                <p className="text-gray-400">Project Type: {selectedMarker.projectType}</p>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedMarker.status === 'completed' 
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {selectedMarker.status.charAt(0).toUpperCase() + selectedMarker.status.slice(1)}
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}