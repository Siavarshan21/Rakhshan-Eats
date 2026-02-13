import { Text, Billboard } from '@react-three/drei';

interface SignageProps {
  text: string;
  position: [number, number, number];
  fontSize?: number;
  color?: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
  billboard?: boolean;
  maxWidth?: number;
  anchorX?: 'left' | 'center' | 'right';
  anchorY?: 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom';
}

const DEFAULT_FONT_SIZE = 0.8;
const DEFAULT_COLOR = '#22d3ee';
const DEFAULT_EMISSIVE_INTENSITY = 1.5;

export function Signage({
  text,
  position,
  fontSize = DEFAULT_FONT_SIZE,
  color = DEFAULT_COLOR,
  emissiveColor,
  emissiveIntensity = DEFAULT_EMISSIVE_INTENSITY,
  billboard = false,
  maxWidth = 10,
  anchorX = 'center',
  anchorY = 'middle',
}: SignageProps) {
  const emissive = emissiveColor ?? color;

  const textElement = (
    <Text
      position={billboard ? undefined : position}
      fontSize={fontSize}
      color={color}
      maxWidth={maxWidth}
      anchorX={anchorX}
      anchorY={anchorY}
      font="/fonts/inter-bold.woff"
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {text}
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        toneMapped={false}
      />
    </Text>
  );

  if (billboard) {
    return (
      <Billboard position={position} follow lockX={false} lockY={false} lockZ={false}>
        {textElement}
      </Billboard>
    );
  }

  return textElement;
}

interface CategorySignageProps {
  category: string;
  position: [number, number, number];
}

export function CategorySignage({ category, position }: CategorySignageProps) {
  return (
    <Signage
      text={category.toUpperCase()}
      position={position}
      fontSize={0.6}
      color="#22d3ee"
      emissiveIntensity={2.0}
      billboard
    />
  );
}
