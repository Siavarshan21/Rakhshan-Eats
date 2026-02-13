import { useState, useRef, useEffect } from 'react';
import { cn } from '../../../utils/helpers/classNames';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  fallbackSrc?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

const DEFAULT_FALLBACK =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2UyZThlYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = DEFAULT_FALLBACK,
  objectFit = 'cover',
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          img.src = error ? fallbackSrc : src;
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, [src, fallbackSrc, error]);

  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  }[objectFit];

  return (
    <div className={cn('relative overflow-hidden', className)} style={{ width, height }}>
      {/* Skeleton placeholder */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-xl bg-surface-200 dark:bg-surface-700" />
      )}

      <img
        ref={imgRef}
        alt={alt}
        className={cn(
          'h-full w-full transition-opacity duration-300',
          objectFitClass,
          loaded ? 'opacity-100' : 'opacity-0',
        )}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!error) {
            setError(true);
            if (imgRef.current) {
              imgRef.current.src = fallbackSrc;
            }
          }
          setLoaded(true);
        }}
        loading="lazy"
      />
    </div>
  );
}
