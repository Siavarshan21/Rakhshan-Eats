import { useRef } from 'react';
import type { Mesh } from 'three';
import { CEILING_MATERIAL } from '../config/materials.config';

interface CeilingProps {
  size?: number;
  height?: number;
  opacity?: number;
}

const DEFAULT_SIZE = 30;
const DEFAULT_HEIGHT = 8;
const DEFAULT_OPACITY = 0.85;

export function Ceiling({
  size = DEFAULT_SIZE,
  height = DEFAULT_HEIGHT,
  opacity = DEFAULT_OPACITY,
}: CeilingProps) {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, height, 0]}
    >
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial
        {...CEILING_MATERIAL}
        transparent
        opacity={opacity}
        side={2}
      />
    </mesh>
  );
}
