import { useMemo } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { MAP_CONFIG, MAP_STYLES } from './constants';
import { createMarkerIcon, getCityFromAddress } from './utils';
import MarkerInfoContent from './MarkerInfoContent';
import type { Installation } from '../../types/installation';

interface MapViewProps {
  installations: Installation[];
  selectedMarker: Installation | null;
  onMarkerSelect: (installation: Installation | null) => void;
}

export default function MapView({ 
  installations, 
  selectedMarker, 
  onMarkerSelect 
}: MapViewProps) {
  // Sort installations to render completed markers first (underneath) and ongoing last (on top)
  const markers = useMemo(() => 
    [...installations].sort((a, b) => {
      if (a.status === 'completed' && b.status === 'ongoing') return -1;
      if (a.status === 'ongoing' && b.status === 'completed') return 1;
      return 0;
    }).map((installation, index) => ({
      ...installation,
      icon: createMarkerIcon(installation.status, index)
    })),
    [installations]
  );

  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <GoogleMap
        mapContainerStyle={MAP_CONFIG.containerStyle}
        zoom={MAP_CONFIG.defaultZoom}
        center={MAP_CONFIG.center}
        options={MAP_STYLES}
      >
        {markers.map((installation) => (
          <Marker
            key={installation.id}
            position={{ lat: installation.lat, lng: installation.lng }}
            onClick={() => onMarkerSelect(installation)}
            icon={installation.icon}
            label={installation.status === 'ongoing' ? {
              text: getCityFromAddress(installation.address),
              className: 'marker-label',
              color: '#ffffff',
            } : undefined}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => onMarkerSelect(null)}
          >
            <MarkerInfoContent installation={selectedMarker} />
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}