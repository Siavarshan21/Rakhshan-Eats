import { useState, useEffect } from 'react';

interface WindowDimensions {
  width: number;
  height: number;
}

function getWindowDimensions(): WindowDimensions {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useResize(): WindowDimensions {
  const [dimensions, setDimensions] = useState<WindowDimensions>(getWindowDimensions);

  useEffect(() => {
    function handleResize() {
      setDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}
