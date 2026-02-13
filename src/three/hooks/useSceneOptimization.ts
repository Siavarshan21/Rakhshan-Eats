import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useThreeStore } from '../../store/three.store';

const FPS_SAMPLE_COUNT = 60;
const LOW_FPS_THRESHOLD = 25;
const HIGH_FPS_THRESHOLD = 50;

export function useSceneOptimization() {
  const { gl } = useThree();
  const fpsHistory = useRef<number[]>([]);
  const setPerformanceLevel = useThreeStore((s) => s.setPerformanceLevel);

  useEffect(() => {
    let lastTime = performance.now();
    let frameId: number;

    const measureFps = () => {
      const now = performance.now();
      const fps = 1000 / (now - lastTime);
      lastTime = now;

      fpsHistory.current.push(fps);
      if (fpsHistory.current.length > FPS_SAMPLE_COUNT) {
        fpsHistory.current.shift();
      }

      if (fpsHistory.current.length === FPS_SAMPLE_COUNT) {
        const avgFps = fpsHistory.current.reduce((a, b) => a + b, 0) / FPS_SAMPLE_COUNT;
        if (avgFps < LOW_FPS_THRESHOLD) {
          setPerformanceLevel('low');
        } else if (avgFps > HIGH_FPS_THRESHOLD) {
          setPerformanceLevel('high');
        } else {
          setPerformanceLevel('medium');
        }
        fpsHistory.current = [];
      }

      frameId = requestAnimationFrame(measureFps);
    };

    frameId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(frameId);
  }, [gl, setPerformanceLevel]);
}
