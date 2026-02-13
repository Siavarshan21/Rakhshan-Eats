import { useMemo } from 'react';
import { WALL_MATERIAL } from '../config/materials.config';

interface WallProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  color?: string;
}

const DEFAULT_WALL_WIDTH = 30;
const DEFAULT_WALL_HEIGHT = 8;
const WALL_THICKNESS = 0.2;

export function Wall({
  position,
  rotation = [0, 0, 0],
  width = DEFAULT_WALL_WIDTH,
  height = DEFAULT_WALL_HEIGHT,
  color,
}: WallProps) {
  const materialProps = useMemo(
    () => ({
      ...WALL_MATERIAL,
      ...(color ? { color } : {}),
    }),
    [color],
  );

  return (
    <mesh
      position={position}
      rotation={rotation}
      receiveShadow
    >
      <boxGeometry args={[width, height, WALL_THICKNESS]} />
      <meshStandardMaterial {...materialProps} />
    </mesh>
  );
}

interface WallSegmentGroupProps {
  storeWidth?: number;
  storeDepth?: number;
  wallHeight?: number;
  color?: string;
}

export function WallSegmentGroup({
  storeWidth = DEFAULT_WALL_WIDTH,
  storeDepth = DEFAULT_WALL_WIDTH,
  wallHeight = DEFAULT_WALL_HEIGHT,
  color,
}: WallSegmentGroupProps) {
  const halfWidth = storeWidth / 2;
  const halfDepth = storeDepth / 2;
  const halfHeight = wallHeight / 2;

  return (
    <group>
      {/* Back wall */}
      <Wall
        position={[0, halfHeight, -halfDepth]}
        width={storeWidth}
        height={wallHeight}
        color={color}
      />
      {/* Left wall */}
      <Wall
        position={[-halfWidth, halfHeight, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={storeDepth}
        height={wallHeight}
        color={color}
      />
      {/* Right wall */}
      <Wall
        position={[halfWidth, halfHeight, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={storeDepth}
        height={wallHeight}
        color={color}
      />
    </group>
  );
}
