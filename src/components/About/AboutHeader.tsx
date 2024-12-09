interface AboutHeaderProps {
  isVisible: boolean;
}

export default function AboutHeader({ isVisible }: AboutHeaderProps) {
  return (
    <div className={`text-center mb-16 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <h2 className="text-3xl font-bold text-white mb-4">
        Transforming Network Infrastructure
      </h2>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto">
        Pioneering the future of hospitality networking with over two decades of combined expertise
      </p>
    </div>
  );
}