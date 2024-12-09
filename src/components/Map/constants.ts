export const MAP_CONFIG = {
  containerStyle: {
    width: '100%',
    height: '600px',
    borderRadius: '0.75rem'
  },
  defaultZoom: 4,
  center: {
    lat: 39.8283,
    lng: -98.5795
  }
} as const;

export const MAP_STYLES = {
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
} as const;