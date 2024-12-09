export default function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin-reverse" />
        <div className="absolute inset-2 w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin-slow" />
      </div>
    </div>
  );
}