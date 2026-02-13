import { useRef } from 'react';
import * as THREE from 'three';

const FLOOR_SIZE = 30;
const FLOOR_COLOR = '#e8e8e8';

interface FloorProps {
  size?: number;
  color?: string;
}

export function Floor({ size = FLOOR_SIZE, color = FLOOR_COLOR }: FloorProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial
        color={color}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}
