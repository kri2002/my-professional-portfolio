import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(
  rootElement: HTMLElement | null, 
  rootMargin = '-20% 0px -45% 0px' 
) {
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  
const observedElementsRef = useRef<Map<HTMLElement, boolean>>(new Map());

  useEffect(() => {
    if (!rootElement) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(callback, {
      root: rootElement,
      rootMargin: rootMargin,
      threshold: 0.1,
    });

    observedElementsRef.current.forEach((_, element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [rootElement, rootMargin]);

  const observe = (element: HTMLElement | null) => {
    if (element && !observedElementsRef.current.has(element)) {
      observedElementsRef.current.set(element, true);
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    }
  };

  return { activeSection, observe };
}