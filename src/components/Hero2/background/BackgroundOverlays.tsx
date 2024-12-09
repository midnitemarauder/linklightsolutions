export default function BackgroundOverlays() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-blue-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1E]/80 via-transparent to-[#0A0F1E]/80" />
    </div>
  );
}