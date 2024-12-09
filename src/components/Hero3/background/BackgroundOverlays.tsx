export default function BackgroundOverlays() {
  return (
    <div className="absolute inset-0">
      {/* Blue Network Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-blue-900/20" />
      
      {/* Depth Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent opacity-50" />
      
      {/* Side Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1E]/80 via-transparent to-[#0A0F1E]/80" />
      
      {/* Ambient Light Points */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
}