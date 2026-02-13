import { useRef } from 'react';
import type { Mesh } from 'three';
import { PILLAR_MATERIAL } from '../config/materials.config';

interface PillarProps {
  position: [number, number, number];
  radius?: number;
  height?: number;
  segments?: number;
  color?: string;
}

const DEFAULT_RADIUS = 0.3;
const DEFAULT_HEIGHT = 8;
const DEFAULT_SEGMENTS = 16;
const CAP_OVERHANG = 0.1;
const CAP_HEIGHT = 0.15;

export function Pillar({
  position,
  radius = DEFAULT_RADIUS,
  height = DEFAULT_HEIGHT,
  segments = DEFAULT_SEGMENTS,
  color,
}: PillarProps) {
  const meshRef = useRef<Mesh>(null);

  const materialProps = color
    ? { ...PILLAR_MATERIAL, color }
    : PILLAR_MATERIAL;

  return (
    <group position={position}>
      {/* Main pillar body */}
      <mesh ref={meshRef} position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, segments]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Base cap */}
      <mesh position={[0, CAP_HEIGHT / 2, 0]}>
        <cylinderGeometry args={[radius + CAP_OVERHANG, radius + CAP_OVERHANG, CAP_HEIGHT, segments]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, height - CAP_HEIGHT / 2, 0]}>
        <cylinderGeometry args={[radius + CAP_OVERHANG, radius + CAP_OVERHANG, CAP_HEIGHT, segments]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

interface PillarGroupProps {
  storeWidth?: number;
  storeDepth?: number;
  pillarHeight?: number;
  inset?: number;
}

export function PillarGroup({
  storeWidth = 30,
  storeDepth = 30,
  pillarHeight = 8,
  inset = 3,
}: PillarGroupProps) {
  const halfW = storeWidth / 2 - inset;
  const halfD = storeDepth / 2 - inset;

  const positions: [number, number, number][] = [
    [-halfW, 0, -halfD],
    [halfW, 0, -halfD],
    [-halfW, 0, halfD],
    [halfW, 0, halfD],
  ];

  return (
    <group>
      {positions.map((pos, i) => (
        <Pillar key={i} position={pos} height={pillarHeight} />
      ))}
    </group>
  );
}
