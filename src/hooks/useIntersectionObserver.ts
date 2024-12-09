import { useState, useEffect, RefObject } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: Options = {}
): boolean {
  const [isVisible, setIsVisible] = useState(false);
  const { threshold = 0, rootMargin = '0px', triggerOnce = true } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        // If triggerOnce is true and element is visible, disconnect observer
        if (triggerOnce && isIntersecting && ref.current) {
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, threshold, rootMargin, triggerOnce]);

  return isVisible;
}