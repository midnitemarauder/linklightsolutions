interface StatsCardProps {
  value: string;
  label: string;
  delay: number;
  isVisible: boolean;
}

export default function StatsCard({ value, label, delay, isVisible }: StatsCardProps) {
  return (
    <div
      className={`transform transition-all duration-1000 delay-${delay} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
        <div className="text-4xl font-bold text-blue-400 mb-2">{value}</div>
        <div className="text-gray-400">this month's {label}</div>
      </div>
    </div>
  );
}