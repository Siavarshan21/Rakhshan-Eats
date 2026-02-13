import { useState, useEffect, RefObject } from 'react';

interface UseIntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersection(
  ref: RefObject<Element | null>,
  options?: UseIntersectionOptions,
): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsIntersecting(entry.isIntersecting);
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '0px',
        threshold: options?.threshold ?? 0,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options?.root, options?.rootMargin, options?.threshold]);

  return isIntersecting;
}
