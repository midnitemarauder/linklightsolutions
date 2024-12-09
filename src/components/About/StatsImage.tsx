interface StatsImageProps {
  src: string;
  alt: string;
}

export default function StatsImage({ src, alt }: StatsImageProps) {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-[400px] object-cover rounded-xl"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
    </div>
  );
}