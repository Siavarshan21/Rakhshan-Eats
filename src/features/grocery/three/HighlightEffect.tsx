import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

const PULSE_SPEED = 2;
const MIN_OPACITY = 0.1;
const MAX_OPACITY = 0.35;

interface HighlightEffectProps {
  position: [number, number, number];
  scale?: [number, number, number];
  color?: string;
  visible?: boolean;
}

export function HighlightEffect({
  position,
  scale = [0.4, 0.5, 0.35],
  color = '#fbbf24',
  visible = true,
}: HighlightEffectProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !visible) return;
    const t = state.clock.getElapsedTime();
    const opacity = MIN_OPACITY + (MAX_OPACITY - MIN_OPACITY) * (0.5 + 0.5 * Math.sin(t * PULSE_SPEED));
    const material = meshRef.current.material;
    if ('opacity' in material) {
      (material as { opacity: number }).opacity = opacity;
    }
  });

  if (!visible) return null;

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} depthWrite={false} />
    </mesh>
  );
}
