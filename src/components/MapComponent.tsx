import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

interface Installation {
  lat: number;
  lng: number;
  title: string;
  description: string;
}

const installations: Installation[] = [
  { lat: 40.7128, lng: -74.0060, title: "New York Office Building", description: "Complete network infrastructure upgrade" },
  { lat: 34.0522, lng: -118.2437, title: "LA Tech Center", description: "Wireless coverage optimization" },
  { lat: 41.8781, lng: -87.6298, title: "Chicago Data Center", description: "High-speed fiber installation" },
];

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
    }
  ],
  disableDefaultUI: true,
  zoomControl: true,
};

const markerIcon = {
  path: "M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0",
  fillColor: '#3B82F6',
  fillOpacity: 0.9,
  strokeWeight: 2,
  strokeColor: '#ffffff',
  scale: 1,
};

export default function MapComponent() {
  const [selectedMarker, setSelectedMarker] = useState<Installation | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const onMarkerClick = useCallback((installation: Installation) => {
    setSelectedMarker(installation);
  }, []);

  if (!apiKey) {
    return (
      <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 text-center">
        <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Map Unavailable</h3>
        <p className="text-gray-400">Please configure your Google Maps API key in the environment variables.</p>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4}
        center={center}
        options={mapOptions}
      >
        {installations.map((installation, index) => (
          <Marker
            key={index}
            position={{ lat: installation.lat, lng: installation.lng }}
            onClick={() => onMarkerClick(installation)}
            icon={markerIcon}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedMarker.title}</h3>
              <p className="text-gray-600">{selectedMarker.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}