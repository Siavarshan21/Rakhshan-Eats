import { Text } from '@react-three/drei';

interface CategorySignageProps {
  text: string;
  position: [number, number, number];
  color?: string;
}

const FONT_SIZE = 0.35;
const SIGN_HEIGHT = 0.5;
const SIGN_PADDING = 0.2;

export function CategorySignage({
  text,
  position,
  color = '#16a34a',
}: CategorySignageProps) {
  return (
    <group position={position}>
      {/* Background panel */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[text.length * 0.22 + SIGN_PADDING * 2, SIGN_HEIGHT]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Text */}
      <Text
        fontSize={FONT_SIZE}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {text}
      </Text>
    </group>
  );
}
