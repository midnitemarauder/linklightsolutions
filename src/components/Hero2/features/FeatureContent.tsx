interface FeatureContentProps {
  title: string;
  description: string;
}

export default function FeatureContent({ title, description }: FeatureContentProps) {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-100 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-blue-100/80 text-lg leading-relaxed group-hover:text-blue-50 transition-colors duration-300">
        {description}
      </p>
    </>
  );
}