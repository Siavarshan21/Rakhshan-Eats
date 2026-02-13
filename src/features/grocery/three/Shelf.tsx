const SIDE_THICKNESS = 0.05;
const SHELF_THICKNESS = 0.04;
const DEFAULT_COLOR = '#78716c';

interface ShelfProps {
  position?: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
  tierCount?: number;
  color?: string;
}

export function Shelf({
  position = [0, 0, 0],
  width = 2,
  height = 2.5,
  depth = 0.6,
  tierCount = 4,
  color = DEFAULT_COLOR,
}: ShelfProps) {
  const shelfSpacing = height / tierCount;

  return (
    <group position={position}>
      {/* Left side */}
      <mesh position={[-width / 2, height / 2, 0]} castShadow>
        <boxGeometry args={[SIDE_THICKNESS, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Right side */}
      <mesh position={[width / 2, height / 2, 0]} castShadow>
        <boxGeometry args={[SIDE_THICKNESS, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Back panel */}
      <mesh position={[0, height / 2, -depth / 2 + 0.01]} castShadow>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial color="#e7e5e4" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Shelf tiers */}
      {Array.from({ length: tierCount + 1 }).map((_, i) => (
        <mesh key={i} position={[0, i * shelfSpacing, 0]} receiveShadow castShadow>
          <boxGeometry args={[width, SHELF_THICKNESS, depth]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
