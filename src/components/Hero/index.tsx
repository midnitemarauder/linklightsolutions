import { useState, useEffect } from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      <HeroContent isVisible={isVisible} />
    </section>
  );
}