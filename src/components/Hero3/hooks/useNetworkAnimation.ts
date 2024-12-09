import { useCallback, useRef } from 'react';

export function useNetworkAnimation() {
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

  return {
    nodesRef,
    linesRef,
    animationRef,
    createNode,
    createLine,
    updateNetwork
  };
}