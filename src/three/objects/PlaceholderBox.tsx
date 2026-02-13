import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

interface PlaceholderBoxProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
  hovered?: boolean;
}

const HOVER_SCALE_FACTOR = 1.05;
const DEFAULT_COLOR = '#94a3b8';

export function PlaceholderBox({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  color = DEFAULT_COLOR,
  hovered = false,
}: PlaceholderBoxProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    const targetScale = hovered ? HOVER_SCALE_FACTOR : 1;
    meshRef.current.scale.lerp(
      { x: targetScale * scale[0], y: targetScale * scale[1], z: targetScale * scale[2] } as any,
      0.1,
    );
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
    </mesh>
  );
}
