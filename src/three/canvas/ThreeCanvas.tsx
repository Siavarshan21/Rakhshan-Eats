import { Suspense, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { PERFORMANCE_CONFIGS, detectPerformanceLevel } from '../config/performance.config';

interface ThreeCanvasProps {
  children: ReactNode;
  className?: string;
}

export function ThreeCanvas({ children, className }: ThreeCanvasProps) {
  const level = detectPerformanceLevel();
  const config = PERFORMANCE_CONFIGS[level];

  return (
    <Canvas
      className={className}
      camera={{ position: [0, 8, 15], fov: 60, near: 0.1, far: 1000 }}
      shadows={config.enableShadows}
      dpr={[1, config.pixelRatio]}
      gl={{
        antialias: config.antialias,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{ background: '#f8fafc' }}
    >
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
