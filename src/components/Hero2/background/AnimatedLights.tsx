export default function AnimatedLights() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  );
}