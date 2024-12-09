import { useCallback, useEffect, useRef } from 'react';
import { ANIMATION_CONFIG } from '../constants';
import type { Node, Line } from '../types';

export function useNetworkAnimation(containerRef: React.RefObject<HTMLDivElement>) {
  const nodesRef = useRef<Node[]>([]);
  const linesRef = useRef<Line[]>([]);
  const animationRef = useRef<number>();

  const createNode = useCallback((): Node => {
    const element = document.createElement('div');
    element.className = 'absolute w-2 h-2 rounded-full bg-blue-500/30 transition-all duration-300';
    containerRef.current?.appendChild(element);
    
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      element
    };
  }, []);

  const createLine = useCallback((): Line => {
    const element = document.createElement('div');
    element.className = 'absolute h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform-gpu transition-opacity duration-500';
    containerRef.current?.appendChild(element);
    
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      angle: Math.random() * Math.PI * 2,
      length: ANIMATION_CONFIG.LINE_LENGTH.MIN + Math.random() * (ANIMATION_CONFIG.LINE_LENGTH.MAX - ANIMATION_CONFIG.LINE_LENGTH.MIN),
      element
    };
  }, []);

  const updatePositions = useCallback(() => {
    const time = Date.now() * ANIMATION_CONFIG.ANIMATION_SPEED;

    nodesRef.current.forEach((node, i) => {
      const offset = i * 0.5;
      const x = node.x + Math.sin(time + offset) * 2;
      const y = node.y + Math.cos(time + offset) * 2;
      
      node.element.style.left = `${x}%`;
      node.element.style.top = `${y}%`;
      node.element.style.transform = `scale(${1 + Math.sin(time + offset) * 0.2})`;
    });

    linesRef.current.forEach((line, i) => {
      const offset = i * 0.3;
      const progress = ((time + offset) % 3) / 3;
      line.element.style.opacity = Math.sin(progress * Math.PI).toString();
      line.element.style.width = `${line.length}px`;
      line.element.style.left = `${line.x}%`;
      line.element.style.top = `${line.y}%`;
      line.element.style.transform = `rotate(${line.angle}rad)`;
    });

    animationRef.current = requestAnimationFrame(updatePositions);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    nodesRef.current = Array.from(
      { length: ANIMATION_CONFIG.NODES_COUNT }, 
      createNode
    );
    
    linesRef.current = Array.from(
      { length: ANIMATION_CONFIG.LINES_COUNT }, 
      createLine
    );

    updatePositions();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      nodesRef.current.forEach(node => node.element.remove());
      linesRef.current.forEach(line => line.element.remove());
    };
  }, [createNode, createLine, updatePositions]);
}