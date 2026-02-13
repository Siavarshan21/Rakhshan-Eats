import { useRef, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';

interface AnimationFrameOptions {
  enabled?: boolean;
  maxFps?: number;
}

export function useAnimationFrame(
  callback: (delta: number, elapsed: number) => void,
  options: AnimationFrameOptions = {},
) {
  const { enabled = true, maxFps } = options;
  const lastTimeRef = useRef(0);
  const minInterval = maxFps ? 1 / maxFps : 0;

  const stableCallback = useCallback(callback, [callback]);

  useFrame((state, delta) => {
    if (!enabled) return;

    if (maxFps) {
      const elapsed = state.clock.getElapsedTime();
      if (elapsed - lastTimeRef.current < minInterval) return;
      lastTimeRef.current = elapsed;
    }

    stableCallback(delta, state.clock.getElapsedTime());
  });
}
