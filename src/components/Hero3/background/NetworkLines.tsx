import { useCallback, useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';

interface NetworkLinesProps {
  isVisible: boolean;
}

export default function NetworkLines({ isVisible }: NetworkLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const animationRef = useRef<number>();

  const createNode = useCallback(() => ({
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80
  }), []);

  const createLine = useCallback(() => ({
    angle: Math.random() * Math.PI * 2,
    length: 100 + Math.random() * 200,
    x: Math.random() * 100,
    y: Math.random() * 100
  }), []);

  const updateNetwork = useCallback(() => {
    nodesRef.current.forEach((node, i) => {
      if (!node) return;
      const time = Date.now() * 0.001;
      const offset = i * 0.5;
      const x = parseFloat(node.style.left) + Math.sin(time + offset) * 0.1;
      const y = parseFloat(node.style.top) + Math.cos(time + offset) * 0.1;
      node.style.left = `${x}%`;
      node.style.top = `${y}%`;
    });

    linesRef.current.forEach((line, i) => {
      if (!line) return;
      const time = Date.now() * 0.001;
      const offset = i * 0.3;
      const progress = ((time + offset) % 3) / 3;
      line.style.opacity = Math.sin(progress * Math.PI).toString();
    });

    animationRef.current = requestAnimationFrame(updateNetwork);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize nodes
    const nodes = Array.from({ length: 30 }, createNode);
    nodesRef.current = nodes.map((pos, i) => {
      const div = document.createElement('div');
      div.className = cn(
        'absolute w-2 h-2 rounded-full',
        'bg-blue-500/30 transition-all duration-300'
      );
      div.style.left = `${pos.x}%`;
      div.style.top = `${pos.y}%`;
      div.style.animationDelay = `${i * 0.1}s`;
      containerRef.current?.appendChild(div);
      return div;
    });

    // Initialize lines
    const lines = Array.from({ length: 15 }, createLine);
    linesRef.current = lines.map((line, i) => {
      const div = document.createElement('div');
      div.className = cn(
        'absolute h-px',
        'bg-gradient-to-r from-transparent via-blue-500/20 to-transparent',
        'transform-gpu transition-opacity duration-500'
      );
      div.style.left = `${line.x}%`;
      div.style.top = `${line.y}%`;
      div.style.width = `${line.length}px`;
      div.style.transform = `rotate(${line.angle}rad)`;
      div.style.animationDelay = `${i * 0.2}s`;
      containerRef.current?.appendChild(div);
      return div;
    });

    updateNetwork();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      nodesRef.current.forEach(node => node?.remove());
      linesRef.current.forEach(line => line?.remove());
    };
  }, [createNode, createLine, updateNetwork]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden",
        "transition-opacity duration-1000",
        isVisible ? "opacity-70" : "opacity-0"
      )}
    />
  );
}