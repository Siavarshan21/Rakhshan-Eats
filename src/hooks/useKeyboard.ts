import { useEffect, useCallback } from 'react';

export function useKeyPress(key: string, callback: (event: KeyboardEvent) => void): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        callback(event);
      }
    },
    [key, callback],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
