interface LogoImageProps {
  isLoaded: boolean;
  isHovered: boolean;
  onLoad: () => void;
}

export default function LogoImage({ isLoaded, isHovered, onLoad }: LogoImageProps) {
  return (
    <img 
      src="/fotor_1707459877625.jpg"
      alt="Link Light Solutions"
      className={`
        h-full w-full object-contain
        transition-all duration-700 ease-out
        ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        ${isHovered ? 'brightness-125 saturate-150' : 'brightness-100 saturate-100'}
      `}
      style={{ 
        filter: `contrast(1.2) ${isHovered ? 'hue-rotate(15deg)' : 'hue-rotate(0deg)'}`,
        transformStyle: 'preserve-3d'
      }}
      onLoad={onLoad}
    />
  );
}