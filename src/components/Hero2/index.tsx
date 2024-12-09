import { useState, useEffect } from 'react';
import Background from './background';
import Content from './content';

export default function Hero2() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Background isVisible={isVisible} />
      <Content isVisible={isVisible} />
    </section>
  );
}