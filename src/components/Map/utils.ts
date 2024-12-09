export const createMarkerIcon = (status: 'completed' | 'ongoing', index: number) => ({
  path: "M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0",
  fillColor: status === 'completed' ? '#3B82F6' : '#F59E0B',
  fillOpacity: status === 'completed' ? 0.4 : 0.9,
  strokeWeight: status === 'completed' ? 1 : 2,
  strokeColor: status === 'completed' ? 'rgba(255,255,255,0.5)' : '#ffffff',
  scale: status === 'completed' ? 0.7 : 1,
  animation: window.google?.maps.Animation.NONE,
  className: 'map-marker',
  style: status === 'ongoing' ? {
    animation: `marker-flicker 1.5s ease-in-out ${index * 0.1}s infinite, marker-glow 2s ease-in-out ${index * 0.2}s infinite`
  } : undefined
});

export const getCityFromAddress = (address: string) => {
  const parts = address.split(',');
  return parts[0].trim();
};